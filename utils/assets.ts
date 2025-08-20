export const sortAssets = <T extends { type: string }>(assets: T[]): T[] => {
  const getOrder = (type: string) => {
    switch (type) {
      case "LEGS":
        return 0
      case "ARMS":
        return 1
      case "TORSO":
        return 2
      case "FACE":
        return 3
      default:
        return 4
    }
  }
  return assets.slice().sort((a, b) => getOrder(a.type) - getOrder(b.type))
}

export const matchAssetLevels = <T extends { type: string; level: number }>(
  assets: T[]
): Record<string, number> => {
  return assets.reduce(
    (acc, asset) => {
      acc[asset.type] = asset.level
      return acc
    },
    {} as Record<string, number>
  )
}
