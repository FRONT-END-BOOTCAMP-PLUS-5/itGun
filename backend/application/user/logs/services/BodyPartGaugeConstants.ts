export type ProjectBodyPart = "legs" | "back" | "chest" | "shoulders" | "arms" | "core" | "stamina"

// exerciseDB의 bodyParts와 projectBodyPart와의 매핑
export const BODY_PART_MAPPING: Record<string, ProjectBodyPart[]> = {
  "BACK": ["back"],
  "CALVES": ["legs"],
  "CHEST": ["chest"],
  "FOREARMS": ["arms"],
  "HIPS": ["legs"],
  "NECK": ["back"],
  "SHOULDERS": ["shoulders"],
  "THIGHS": ["legs"],
  "WAIST": ["core"],
  "HANDS": ["arms"],
  "FEET": ["legs"],
  "FACE": ["chest"],
  "FULL BODY": ["legs", "back", "chest", "shoulders", "arms", "core"],
  "BICEPS": ["arms"],
  "UPPER ARMS": ["arms"],
  "TRICEPS": ["arms"],
  "HAMSTRINGS": ["legs"],
  "QUARDRICEPS": ["legs"],
}

// 부위별 가중치
export const BODY_PART_MULTIPLIERS: Record<ProjectBodyPart, number> = {
  legs: 0.7,
  back: 0.8,
  chest: 1.0,
  shoulders: 1.2,
  arms: 1.3,
  core: 1.1,
  stamina: 1,
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
