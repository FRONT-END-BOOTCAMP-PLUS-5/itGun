import { CharacterAsset } from "@/ds/components/atoms/character/Character.types"
import { ReactNode } from "react"
import { jsxToString } from "./assets"

export const createAssetsFromSvgs = (
  svgs: Record<string, ReactNode>
): CharacterAsset[] => {
  return Object.keys(svgs).map((key) => ({
    type: key.toUpperCase(),
    level: 0,
    svg: jsxToString(svgs[key] as React.ReactElement),
  }))
}
