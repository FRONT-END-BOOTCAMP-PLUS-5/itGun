export interface EquipmentMapping {
  label: string
  value: string
}

export interface BodyPartMapping {
  label: string
  value: string
}

export const EQUIPMENT_MAPPINGS: EquipmentMapping[] = [
  { label: "전체", value: "" },
  { label: "맨몸", value: "BODY WEIGHT" },
  { label: "덤벨", value: "DUMBBELL" },
  { label: "바벨", value: "BARBELL" },
  { label: "케이블", value: "CABLE" },
  { label: "레버리지 머신", value: "LEVERAGE+MACHINE" },
  { label: "로프", value: "ROPE" },
]

export const BODY_PART_MAPPINGS: BodyPartMapping[] = [
  { label: "전체", value: "" },
  { label: "가슴", value: "CHEST" },
  { label: "등", value: "BACK" },
  { label: "어깨", value: "SHOULDERS" },
  { label: "팔", value: "BICEPS%2TRICEPS%2FOREARMS" },
  { label: "다리", value: "THIGHS%2HAMSTRINGS%2CALVES" },
  { label: "허리", value: "WAIST" },
  { label: "전신", value: "FULL BODY" },
]
