// 신기록 관련 운동 ID 상수
export const RECORD_EXERCISE_IDS = {
  BENCH_PRESS: "exr_41n2hxnFMotsXTj3", // 나중에 실제 exerciseId로 교체
  SQUAT: "exr_Gnfo4FM",
  DEADLIFT: "exr_ila4NZS",
  RUNNING: "exr_41n2hjkBReJMbDJk",
} as const

// 신기록 최소 기준
export const RECORD_MINIMUMS = {
  BENCH_PRESS: 15, // kg
  SQUAT: 20, // kg
  DEADLIFT: 20, // kg
  RUNNING: 1, // (1km)
} as const

// 3대 합계 뱃지 기준
export const BIG_THREE_BADGE_UNIT = 100 // kg 단위
