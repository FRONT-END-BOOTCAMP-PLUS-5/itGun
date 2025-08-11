import { WorkoutData } from "@/backend/application/user/logs/dtos/CreateLogRequestDto"
import { BodyPartsGroup } from "@/backend/domain/entities/Log"
import {
  BODY_PART_MAPPING,
  BODY_PART_MULTIPLIERS,
  LEVEL_THRESHOLDS,
  LEVEL_MULTIPLIERS,
} from "./BodyPartGaugeConstants"

export type BodyPartGaugeUpdate = Record<BodyPartsGroup, number>

export class BodyPartGaugeCalculator {
  // 부위별 레벨 계산
  calculateBodyPartLevel(totalPoints: number): number {
    const threshold = LEVEL_THRESHOLDS.find(
      (t) => totalPoints >= t.min && totalPoints < t.max
    )
    return threshold ? threshold.level : 5 // 기본값 5단계
  }

  calculateGaugeUpdates(
    workouts: WorkoutData[],
    currentGauge?: BodyPartGaugeUpdate
  ): BodyPartGaugeUpdate {
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
      // 볼륨 계산 (무게 * 횟수 * 세트)
      const weight = workout.weight || 0
      const reps = workout.repetitionCount || 0
      const sets = workout.setCount || 1
      const volume = weight * reps * sets

      // 기본 포인트 계산
      const basePoints = volume / 10000

      // 운동의 bodyParts를 프로젝트 부위로 매핑
      const targetBodyParts = this.mapExerciseBodyPartsToProject(
        workout.exerciseInfo.bodyParts
      )

      // 여러 부위에 걸친 운동인 경우 부위별로 균등 분배
      const pointsPerBodyPart =
        targetBodyParts.length > 0 ? basePoints / targetBodyParts.length : 0

      // 각 부위별 포인트 계산 및 누적
      for (const bodyPart of targetBodyParts) {
        // 해당 부위의 현재 포인트로 레벨 계산
        const currentBodyPartPoints = currentGauge ? currentGauge[bodyPart] : 0
        const bodyPartLevel = this.calculateBodyPartLevel(currentBodyPartPoints)

        // 부위별 가중치 및 레벨 가중치 적용
        const bodyPartMultiplier = BODY_PART_MULTIPLIERS[bodyPart]
        const levelMultiplier = LEVEL_MULTIPLIERS[bodyPartLevel] || 1.0
        const finalPoints =
          pointsPerBodyPart * bodyPartMultiplier * levelMultiplier

        gaugeUpdate[bodyPart] += finalPoints
      }
    }

    return gaugeUpdate
  }

  private mapExerciseBodyPartsToProject(
    exerciseBodyParts: string[]
  ): BodyPartsGroup[] {
    const mappedParts: BodyPartsGroup[] = []

    for (const part of exerciseBodyParts) {
      const normalizedPart = part.toLowerCase().trim()
      const projectParts = BODY_PART_MAPPING[normalizedPart]

      if (projectParts && projectParts.length > 0) {
        mappedParts.push(...projectParts)
      }
    }

    // 중복 제거
    return [...new Set(mappedParts)]
  }
}
