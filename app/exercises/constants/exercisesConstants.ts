export interface EquipmentMapping {
  label: string // UI에 보여질 한글
  value: string // API로 보낼 값 (실제 DB equipments 필드 값)
  key: string // 내부적으로 사용할 키
}

export interface BodyPartMapping {
  label: string // UI에 보여질 한글
  value: string // API로 보낼 값
  key: string // 내부적으로 사용할 키
}

export const EQUIPMENT_MAPPINGS: EquipmentMapping[] = [
  { label: "전체", value: "", key: "all" },
  { label: "맨몸", value: "BODY WEIGHT", key: "bodyweight" },
  { label: "덤벨", value: "DUMBBELL", key: "dumbbell" },
  { label: "바벨", value: "BARBELL", key: "barbell" },
  { label: "케이블", value: "CABLE", key: "cable" },
  { label: "레버리지 머신", value: "LEVERAGE MACHINE", key: "leverageMachine" },
  { label: "로프", value: "ROPE", key: "rope" },
]

export const BODY_PART_MAPPINGS: BodyPartMapping[] = [
  { label: "전체", value: "", key: "all" },
  { label: "가슴", value: "CHEST", key: "chest" },
  { label: "등", value: "BACK", key: "back" },
  { label: "어깨", value: "SHOULDERS", key: "shoulders" },
  { label: "팔", value: "BICEPS,TRICEPS,FOREARMS", key: "arms" },
  { label: "다리", value: "THIGHS,HAMSTRINGS,CALVES", key: "legs" },
  { label: "허리", value: "WAIST", key: "core" },
  { label: "전신", value: "FULL BODY", key: "fullBody" },
]
