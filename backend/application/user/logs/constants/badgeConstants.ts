export const BADGE_IDS = {
  FIRST_WORKOUT: 1,       // 첫 운동 뱃지
  CONSECUTIVE_7_DAYS: 2,  // 연속 7일 운동 뱃지
  WEEKLY_3_DAYS: 3,       // 일주일 3일 운동 뱃지
  BENCH_PRESS_RECORD: 4,  // 벤치프레스 신기록 뱃지
  SQUAT_RECORD: 5,        // 스쿼트 신기록 뱃지
  DEADLIFT_RECORD: 6,     // 데드리프트 신기록 뱃지
  RUNNING_RECORD: 7,      // 달리기 신기록 뱃지
  BIG_THREE_RECORD: 8,    // 3대 운동 합계 달성 뱃지
} as const

export type BadgeId = typeof BADGE_IDS[keyof typeof BADGE_IDS]

// 신기록 뱃지 그룹
export const RECORD_BADGE_IDS = [
  BADGE_IDS.BENCH_PRESS_RECORD,
  BADGE_IDS.SQUAT_RECORD,
  BADGE_IDS.DEADLIFT_RECORD,
  BADGE_IDS.RUNNING_RECORD,
  BADGE_IDS.BIG_THREE_RECORD,
] as const
