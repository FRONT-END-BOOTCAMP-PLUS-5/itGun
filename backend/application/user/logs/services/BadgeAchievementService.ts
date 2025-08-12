import { WorkoutData } from "@/backend/application/user/logs/dtos/CreateLogRequestDto"
import { Badge } from "@/backend/domain/entities/Badge"
import { UserBadge } from "@/backend/domain/entities/UserBadge"
import { UserRecord } from "@/backend/domain/entities/UserRecord"
import { BadgeRepository } from "@/backend/domain/repositories/BadgeRepository"
import { UserBadgeRepository } from "@/backend/domain/repositories/UserBadgeRepository"
import { UserRecordRepository } from "@/backend/domain/repositories/UserRecordRepository"
import { LogRepository } from "@/backend/domain/repositories/LogRepository"
import { 
  RECORD_EXERCISE_IDS, 
  RECORD_MINIMUMS, 
  BIG_THREE_BADGE_UNIT 
} from "@/backend/application/user/logs/constants/UserRecordConstants"

export class BadgeAchievementService {
  constructor(
    private badgeRepository: BadgeRepository,
    private userBadgeRepository: UserBadgeRepository,
    private userRecordRepository: UserRecordRepository,
    private logRepository: LogRepository
  ) {}

  async checkAndAwardBadges(
    userId: string,
    workouts: WorkoutData[]
  ): Promise<{ badges: UserBadge[], userRecord: UserRecord }> {
    // 모든 데이터를 한 번에 조회
    const [badges, existingBadges, userRecord] = await Promise.all([
      this.badgeRepository.findAll(),
      this.userBadgeRepository.findByUserId(userId),
      this.userRecordRepository.findByUserId(userId)
    ])

    const badgesToAward: UserBadge[] = []

    // 1. 첫 운동 뱃지 체크
    const firstWorkoutBadge = this.checkFirstWorkoutBadge(userId, badges, existingBadges)
    if (firstWorkoutBadge) badgesToAward.push(firstWorkoutBadge)

    // 2. 연속 7일 뱃지 체크
    const consecutiveBadge = await this.checkConsecutiveDaysBadge(userId, badges, existingBadges)
    if (consecutiveBadge) badgesToAward.push(consecutiveBadge)

    // 3. 일주일에 3일 이상 뱃지 체크
    const weeklyBadge = await this.checkWeeklyWorkoutBadge(userId, badges)
    if (weeklyBadge) badgesToAward.push(weeklyBadge)

    // 4. 신기록 뱃지들 체크 및 UserRecord 업데이트
    const { recordBadges, updatedUserRecord, needsRecordSave } = this.checkRecordBadgesAndUpdateRecord(
      userId,
      workouts,
      badges,
      existingBadges,
      userRecord
    )
    badgesToAward.push(...recordBadges)

    // 5. 뱃지와 UserRecord 저장
    let awardedBadges: UserBadge[] = []
    let savedUserRecord = updatedUserRecord

    if (badgesToAward.length > 0 || needsRecordSave) {
      if (badgesToAward.length > 0) {
        awardedBadges = await this.userBadgeRepository.saveMany(badgesToAward)
      }
      if (needsRecordSave) {
        savedUserRecord = await this.userRecordRepository.save(updatedUserRecord)
      }
    }

    return { badges: awardedBadges, userRecord: savedUserRecord }
  }

  private checkFirstWorkoutBadge(
    userId: string,
    badges: Badge[],
    existingBadges: UserBadge[] | null
  ): UserBadge | null {
    const firstWorkoutBadge = badges.find(
      (badge) =>
        badge.name.includes("첫 운동") || badge.name.includes("first workout")
    )

    if (!firstWorkoutBadge) return null

    // 이미 받았는지 확인
    const alreadyHas = existingBadges?.some(
      (ub) => ub.badgeId === firstWorkoutBadge.id
    )

    if (alreadyHas) return null

    // 첫 운동 뱃지는 CreateLogUsecase에서 첫 로그인지 확인 후 호출
    return new UserBadge(0, firstWorkoutBadge.id, userId, new Date())
  }

  private async checkConsecutiveDaysBadge(
    userId: string,
    badges: Badge[],
    existingBadges: UserBadge[] | null
  ): Promise<UserBadge | null> {
    const consecutiveBadge = badges.find(
      (badge) =>
        badge.name.includes("연속 7일") || badge.name.includes("7 days") || badge.name.includes("연속")
    )

    if (!consecutiveBadge) return null

    // 마지막으로 연속 7일 뱃지를 받은 날짜 찾기
    const lastConsecutiveBadge = existingBadges
      ?.filter(ub => ub.badgeId === consecutiveBadge.id)
      ?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]

    // 마지막 뱃지 수여일로부터 7일 후를 시작점으로 설정
    const startDate = lastConsecutiveBadge 
      ? new Date(lastConsecutiveBadge.createdAt.getTime() + 1 * 24 * 60 * 60 * 1000) // 다음날부터
      : new Date(0) // 처음이면 모든 기간

    const today = new Date()
    today.setHours(23, 59, 59, 999)

    const recentLogs = await this.logRepository.findByUserIdAndDateRange(
      userId,
      startDate,
      today
    )

    // 날짜별로 그룹화
    const workoutDates = new Set(
      recentLogs.map(log => log.createdAt.toDateString())
    )

    // 7일 연속 운동했는지 확인
    if (workoutDates.size >= 7) {
      // 연속성 확인: 실제로 연속된 7일인지 체크
      const sortedDates = Array.from(workoutDates)
        .map(dateStr => new Date(dateStr))
        .sort((a, b) => a.getTime() - b.getTime())

      let consecutiveDays = 1
      let maxConsecutive = 1
      
      for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = sortedDates[i - 1]
        const currentDate = sortedDates[i]
        const dayDiff = (currentDate.getTime() - prevDate.getTime()) / (24 * 60 * 60 * 1000)
        
        if (dayDiff === 1) {
          consecutiveDays++
          maxConsecutive = Math.max(maxConsecutive, consecutiveDays)
        } else {
          consecutiveDays = 1
        }
      }

      if (maxConsecutive >= 7) {
        return new UserBadge(0, consecutiveBadge.id, userId, new Date())
      }
    }

    return null
  }

  private async checkWeeklyWorkoutBadge(
    userId: string,
    badges: Badge[]
  ): Promise<UserBadge | null> {
    const weeklyBadge = badges.find(
      (badge) =>
        badge.name.includes("일주일 3일") || 
        badge.name.includes("주 3일") ||
        badge.name.includes("weekly 3")
    )

    if (!weeklyBadge) return null

    // 이번 주 시작일 계산 (월요일 기준)
    const now = new Date()
    const dayOfWeek = now.getDay() // 0=일요일, 1=월요일, ..., 6=토요일
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1 // 월요일부터의 일수
    
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - daysFromMonday)
    startOfWeek.setHours(0, 0, 0, 0)
    
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)

    const weekLogs = await this.logRepository.findByUserIdAndDateRange(
      userId,
      startOfWeek,
      endOfWeek
    )

    // 이번 주 운동한 날짜 수 계산
    const workoutDatesThisWeek = new Set(
      weekLogs.map(log => log.createdAt.toDateString())
    )

    // 3일째 운동한 경우에만 뱃지 수여
    if (workoutDatesThisWeek.size === 3) {
      return new UserBadge(0, weeklyBadge.id, userId, new Date())
    }

    return null
  }

  private checkRecordBadgesAndUpdateRecord(
    userId: string,
    workouts: WorkoutData[],
    badges: Badge[],
    existingBadges: UserBadge[] | null,
    userRecord: UserRecord | null
  ): { recordBadges: UserBadge[], updatedUserRecord: UserRecord, needsRecordSave: boolean } {
    const awardedBadges: UserBadge[] = []
    
    // 기존 기록이 없으면 새로 생성
    let currentRecord = userRecord || new UserRecord(
      0,
      userId,
      0, // benchPressMax
      0, // squatMax  
      0, // deadliftMax
      0, // runningMax
      new Date(),
      new Date()
    )

    // exerciseId로 신기록 대상 운동 필터링
    const recordExerciseIds = Object.values(RECORD_EXERCISE_IDS)
    const recordWorkouts = workouts.filter(w => 
      recordExerciseIds.includes(w.exerciseInfo.exerciseId as typeof recordExerciseIds[number])
    )

    let isRecordUpdated = false
    const logRecordBadges = new Set<string>() // 로그별로 한 번만 뱃지 수여

    // 각 운동 종목별 이번 로그에서의 최대값 계산
    const logMaxRecords = {
      benchPress: Math.max(...recordWorkouts
        .filter(w => w.exerciseInfo.exerciseId === RECORD_EXERCISE_IDS.BENCH_PRESS && w.weight)
        .map(w => w.weight || 0), 0),
      squat: Math.max(...recordWorkouts
        .filter(w => w.exerciseInfo.exerciseId === RECORD_EXERCISE_IDS.SQUAT && w.weight)
        .map(w => w.weight || 0), 0),
      deadlift: Math.max(...recordWorkouts
        .filter(w => w.exerciseInfo.exerciseId === RECORD_EXERCISE_IDS.DEADLIFT && w.weight)
        .map(w => w.weight || 0), 0),
      running: Math.max(...recordWorkouts
        .filter(w => w.exerciseInfo.exerciseId === RECORD_EXERCISE_IDS.RUNNING && w.distance)
        .map(w => w.distance || 0), 0)
    }

    // 벤치프레스 신기록 체크
    if (logMaxRecords.benchPress >= RECORD_MINIMUMS.BENCH_PRESS && 
        logMaxRecords.benchPress > (currentRecord.benchPressMax || 0)) {
      
      currentRecord = new UserRecord(
        currentRecord.id,
        currentRecord.userId,
        logMaxRecords.benchPress,
        currentRecord.squatMax,
        currentRecord.deadliftMax,
        currentRecord.runningMax,
        currentRecord.createdAt,
        new Date()
      )
      isRecordUpdated = true

      // 로그당 벤치프레스 뱃지 하나만
      const benchBadge = badges.find(badge => 
        badge.name.includes("벤치프레스") && badge.name.includes("신기록")
      )
      if (benchBadge && !logRecordBadges.has("bench")) {
        const userBadge = new UserBadge(0, benchBadge.id, userId, new Date())
        awardedBadges.push(userBadge)
        logRecordBadges.add("bench")
      }
    }
    
    // 스쿼트 신기록 체크
    if (logMaxRecords.squat >= RECORD_MINIMUMS.SQUAT && 
        logMaxRecords.squat > (currentRecord.squatMax || 0)) {
      
      currentRecord = new UserRecord(
        currentRecord.id,
        currentRecord.userId,
        currentRecord.benchPressMax,
        logMaxRecords.squat,
        currentRecord.deadliftMax,
        currentRecord.runningMax,
        currentRecord.createdAt,
        new Date()
      )
      isRecordUpdated = true

      const squatBadge = badges.find(badge => 
        badge.name.includes("스쿼트") && badge.name.includes("신기록")
      )
      if (squatBadge && !logRecordBadges.has("squat")) {
        const userBadge = new UserBadge(0, squatBadge.id, userId, new Date())
        awardedBadges.push(userBadge)
        logRecordBadges.add("squat")
      }
    }
    
    // 데드리프트 신기록 체크
    if (logMaxRecords.deadlift >= RECORD_MINIMUMS.DEADLIFT && 
        logMaxRecords.deadlift > (currentRecord.deadliftMax || 0)) {
      
      currentRecord = new UserRecord(
        currentRecord.id,
        currentRecord.userId,
        currentRecord.benchPressMax,
        currentRecord.squatMax,
        logMaxRecords.deadlift,
        currentRecord.runningMax,
        currentRecord.createdAt,
        new Date()
      )
      isRecordUpdated = true

      const deadliftBadge = badges.find(badge => 
        badge.name.includes("데드리프트") && badge.name.includes("신기록")
      )
      if (deadliftBadge && !logRecordBadges.has("deadlift")) {
        const userBadge = new UserBadge(0, deadliftBadge.id, userId, new Date())
        awardedBadges.push(userBadge)
        logRecordBadges.add("deadlift")
      }
    }
    
    // 달리기 신기록 체크
    if (logMaxRecords.running >= RECORD_MINIMUMS.RUNNING && 
        logMaxRecords.running > (currentRecord.runningMax || 0)) {
      
      currentRecord = new UserRecord(
        currentRecord.id,
        currentRecord.userId,
        currentRecord.benchPressMax,
        currentRecord.squatMax,
        currentRecord.deadliftMax,
        logMaxRecords.running,
        currentRecord.createdAt,
        new Date()
      )
      isRecordUpdated = true

      const runningBadge = badges.find(badge => 
        badge.name.includes("달리기") && badge.name.includes("신기록")
      )
      if (runningBadge && !logRecordBadges.has("running")) {
        const userBadge = new UserBadge(0, runningBadge.id, userId, new Date())
        awardedBadges.push(userBadge)
        logRecordBadges.add("running")
      }
    }

    // 3대 합계 뱃지 체크 (100kg 단위)
    const currentTotal = (currentRecord.benchPressMax || 0) + 
                        (currentRecord.squatMax || 0) + 
                        (currentRecord.deadliftMax || 0)
    
    const previousTotal = (userRecord?.benchPressMax || 0) + 
                         (userRecord?.squatMax || 0) + 
                         (userRecord?.deadliftMax || 0)

    // 이번에 새로운 100kg 구간을 달성했는지 확인
    const currentLevel = Math.floor(currentTotal / BIG_THREE_BADGE_UNIT)
    const previousLevel = Math.floor(previousTotal / BIG_THREE_BADGE_UNIT)

    if (currentLevel > previousLevel && currentTotal >= BIG_THREE_BADGE_UNIT) {
      const totalBadge = badges.find(badge => 
        badge.name.includes("3대") && (badge.name.includes("합계") || badge.name.includes("total"))
      )
      
      if (totalBadge) {
        const userBadge = new UserBadge(0, totalBadge.id, userId, new Date())
        awardedBadges.push(userBadge)
      }
    }

    return { recordBadges: awardedBadges, updatedUserRecord: currentRecord, needsRecordSave: isRecordUpdated || currentRecord.id === 0 }
  }
}
