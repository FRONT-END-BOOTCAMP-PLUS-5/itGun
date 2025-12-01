export interface CalTypeMapping {
  calTypeKo: string
  iconName: string
  iconColor: string
}

export const CAL_TYPE_MAPPINGS = (
  calType: string
): CalTypeMapping => {
  switch (calType) {
    case "upper":
      return {
        calTypeKo: "상체",
        iconName: "arm",
        iconColor: "secondary-purple",
      }
    case "lower":
      return {
        calTypeKo: "하체",
        iconName: "leg",
        iconColor: "secondary-blue",
      }
    default:
      return {
        calTypeKo: "유산소",
        iconName: "hearts",
        iconColor: "secondary-pink",
      }
  }
}
