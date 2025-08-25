import { WorkoutData } from "@/backend/application/user/logs/dtos/CreateLogRequestDto"
import { BodyPartsGroup } from "@/backend/domain/entities/Log"
import {
  BODY_PART_MAPPING,
  BODY_PART_MULTIPLIERS,
  LEVEL_THRESHOLDS,
  LEVEL_MULTIPLIERS,
} from "@/backend/application/user/logs/constants/bodyPartGaugeConstants"

export type BodyPartGaugeUpdate = Record<BodyPartsGroup, number>

// 부위별 레벨 계산
export const calculateBodyPartLevel = (totalPoints: number): number => {
  const threshold = LEVEL_THRESHOLDS.find(
    (t) => totalPoints >= t.min && totalPoints < t.max
  )
  return threshold ? threshold.level : 1 // 기본값 1단계
}

// 운동의 bodyParts를 프로젝트 부위로 매핑
const mapExerciseBodyPartsToProject = (
  exerciseBodyParts: string[]
): BodyPartsGroup[] => {
  const mappedParts: BodyPartsGroup[] = []

  for (const part of exerciseBodyParts) {
    const normalizedPart = part.toUpperCase().trim()
    const projectParts = BODY_PART_MAPPING[normalizedPart]

    if (projectParts && projectParts.length > 0) {
      mappedParts.push(...projectParts)
    }
  }

  // 중복 제거
  return [...new Set(mappedParts)]
}

export const calculateGaugeUpdates = (
  workouts: WorkoutData[],
  currentGauge?: BodyPartGaugeUpdate
): BodyPartGaugeUpdate => {
  const gaugeUpdate: BodyPartGaugeUpdate = {
    legs: 0,
    back: 0,
    chest: 0,
    shoulders: 0,
    arms: 0,
    core: 0,
    stamina: 0,
  }

  for (const workout of workouts) {
    const weight = workout.weight || 0
    const reps = workout.repetitionCount || 0
    const distance = workout.distance || 0
    const duration = workout.durationSeconds || 0
    const sets = workout.setCount || 1

    let basePoints = 0

    // 포인트 계산 로직
    if (weight && reps) {
      // 무게 * 횟수 * 세트 (기존 로직)
      const volume = weight * reps * sets
      basePoints = volume / 10000
    } else if (distance && duration) {
      // 거리(m) * 시간(초) / 50000000
      basePoints = (distance * duration) / 50000000
    } else if (duration) {
      // 시간(초) / 40000
      basePoints = duration / 40000
    } else if (reps) {
      // 횟수 * 세트 / 10000
      basePoints = (reps * sets) / 10000
    }

    // CARDIO 타입 운동인지 확인
    const isCardio = workout.exerciseInfo.exerciseType === "CARDIO"

    if (isCardio) {
      // 유산소: 0.6은 stamina, 0.4는 bodyParts에 균등 분배
      const staminaPoints = basePoints * 0.6
      const bodyPartsPoints = basePoints * 0.4

      // stamina 포인트 적용
      const currentStaminaPoints = currentGauge ? currentGauge.stamina : 0
      const staminaLevel = calculateBodyPartLevel(currentStaminaPoints)
      const staminaMultiplier = BODY_PART_MULTIPLIERS.stamina
      const staminaLevelMultiplier = LEVEL_MULTIPLIERS[staminaLevel] || 1.0
      const finalStaminaPoints =
        staminaPoints * staminaMultiplier * staminaLevelMultiplier
      gaugeUpdate.stamina += finalStaminaPoints

      // bodyParts 포인트를 각 부위에 균등 분배
      const targetBodyParts = mapExerciseBodyPartsToProject(
        workout.exerciseInfo.bodyParts
      )

      if (targetBodyParts.length > 0) {
        const pointsPerBodyPart = bodyPartsPoints / targetBodyParts.length

        for (const bodyPart of targetBodyParts) {
          if (bodyPart !== "stamina") {
            // stamina는 이미 처리했으므로 제외
            const currentBodyPartPoints = currentGauge
              ? currentGauge[bodyPart]
              : 0
            const bodyPartLevel = calculateBodyPartLevel(currentBodyPartPoints)
            const bodyPartMultiplier = BODY_PART_MULTIPLIERS[bodyPart]
            const levelMultiplier = LEVEL_MULTIPLIERS[bodyPartLevel] || 1.0
            const finalPoints =
              pointsPerBodyPart * bodyPartMultiplier * levelMultiplier
            gaugeUpdate[bodyPart] += finalPoints
          }
        }
      }
    } else {
      // 근력 운동
      const targetBodyParts = mapExerciseBodyPartsToProject(
        workout.exerciseInfo.bodyParts
      )

      if (targetBodyParts.length > 0) {
        const pointsPerBodyPart = basePoints / targetBodyParts.length

        for (const bodyPart of targetBodyParts) {
          const currentBodyPartPoints = currentGauge
            ? currentGauge[bodyPart]
            : 0
          const bodyPartLevel = calculateBodyPartLevel(currentBodyPartPoints)
          const bodyPartMultiplier = BODY_PART_MULTIPLIERS[bodyPart]
          const levelMultiplier = LEVEL_MULTIPLIERS[bodyPartLevel] || 1.0
          const finalPoints =
            pointsPerBodyPart * bodyPartMultiplier * levelMultiplier
          gaugeUpdate[bodyPart] += finalPoints
        }
      }
    }
  }

  return gaugeUpdate
}
