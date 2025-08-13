// 신기록 관련 운동 ID 상수
export const RECORD_EXERCISE_IDS = {
  BENCH_PRESS: "bench-press-001", // 나중에 실제 exerciseId로 교체
  SQUAT: "squat-001",
  DEADLIFT: "deadlift-001", 
  RUNNING: "running-001"
} as const

// 신기록 최소 기준
export const RECORD_MINIMUMS = {
  BENCH_PRESS: 15, // kg
  SQUAT: 20,       // kg
  DEADLIFT: 20,    // kg
  RUNNING: 1000    // m (1km)
} as const

// 3대 합계 뱃지 기준
export const BIG_THREE_BADGE_UNIT = 100 // kg 단위
