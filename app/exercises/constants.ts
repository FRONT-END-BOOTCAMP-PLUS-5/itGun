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
  { label: "바벨", value: "BARBELL%2TRAP+BAR" },
  { label: "케틀벨", value: "KETTLEBELL" },
  { label: "케이블", value: "CABLE" },
  { label: "레버리지 머신", value: "LEVERAGE+MACHINE" },
  { label: "스미스 머신", value: "SMITH+MACHINE" },
  { label: "슬레드 머신", value: "SLED+MACHINE" },
  { label: "런닝 머신", value: "TREADMILL%2STEPMILL+MACHINE" },
  { label: "볼", value: "BALL" },
  { label: "로프", value: "ROPE" },
]

export const BODY_PART_MAPPINGS: BodyPartMapping[] = [
  { label: "전체", value: "" },
  { label: "가슴", value: "CHEST" },
  { label: "등", value: "BACK%2NECK" },
  { label: "어깨", value: "SHOULDERS" },
  { label: "팔", value: "BICEPS%2TRICEPS%2FOREARMS%2UPPER+ARMS%2LOWER+ARMS" },
  {
    label: "하체",
    value:
      "THIGHS%2HAMSTRINGS%2CALVES%2HIPS%2FEET%2QUARDRICEPS%2UPPER+LEGS%2LOWER+LEGS",
  },
  { label: "복근", value: "WAIST" },
  { label: "유산소", value: "CARDIO" },
]
