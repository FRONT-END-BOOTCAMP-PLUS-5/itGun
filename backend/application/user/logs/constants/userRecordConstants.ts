// 신기록 관련 운동 ID 상수
export const RECORD_EXERCISE_IDS = {
  BENCH_PRESS: ["exr_EIeI8Vf",], // 바벨 벤치 프레스
  SQUAT: ["exr_Gnfo4FM", "exr_qXTaZnJ"], // 바벨 하이바 스쿼트, 바벨 풀 스쿼트
  DEADLIFT: ["exr_ila4NZS",], // 바벨 데드리프트
  RUNNING: ["exr_oLrKqDH", "exr_y5p0H8a"], // 러닝, 러닝 (장비)
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
