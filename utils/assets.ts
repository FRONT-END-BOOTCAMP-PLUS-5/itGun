import React from "react"
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

export const jsxToString = (element: React.JSX.Element): string => {
  const { type, props } = element
  const { children, ...attrs } = props

  const tagString =
    type.toString() === "Symbol(react.fragment)" ? "" : type.toString()

  const attrsString = Object.entries(attrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ")

  const childrenString = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") return child
      if (React.isValidElement(child)) return jsxToString(child)
      return ""
    })
    .join("")

  return `<${tagString} ${attrsString}>${childrenString}</${tagString}>`
}

export const svgToCharacterAsset = (
  type: string,
  svg: React.JSX.Element,
  level: number = 1
) => {
  return {
    type: type,
    level: level,
    svg: jsxToString(svg),
  } as CharacterAsset
}
