export type ProjectBodyPart = "legs" | "back" | "chest" | "shoulders" | "arms" | "core"

// exerciseDB의 bodyParts와 projectBodyPart와의 매핑
export const BODY_PART_MAPPING: Record<string, ProjectBodyPart[]> = {
  "upper legs": ["legs"],
  "lower legs": ["legs"],
  "back": ["back"],
  "neck": ["back"], // neck은 등으로 매핑
  "chest": ["chest"],
  "shoulders": ["shoulders"],
  "upper arms": ["arms"],
  "lower arms": ["arms"],
  "waist": ["core"], // waist는 core로 매핑
  "cardio": [], // cardio는 특정 부위에 매핑하지 않음
}

// 부위별 가중치
export const BODY_PART_MULTIPLIERS: Record<ProjectBodyPart, number> = {
  legs: 0.7,
  back: 0.8,
  chest: 1.0,
  shoulders: 1.2,
  arms: 1.3,
  core: 1.1,
}

// 레벨별 포인트 구간
export const LEVEL_THRESHOLDS = [
  { min: 0, max: 1.0, level: 1 },
  { min: 1.0, max: 2.0, level: 2 },
  { min: 2.0, max: 3.5, level: 3 },
  { min: 3.5, max: 5.5, level: 4 },
  { min: 5.5, max: Infinity, level: 5 },
]

// 레벨별 보정 계수
export const LEVEL_MULTIPLIERS: Record<number, number> = {
  1: 1.1,
  2: 1.0,
  3: 0.85,
  4: 0.6,
  5: 0.6,
}
