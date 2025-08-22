"use client"
import { CharacterAsset } from "@/ds/components/atoms/character/Character.types"
import { ReactNode } from "react"
import { renderToString } from "react-dom/server"

export const createAssetsFromSvgs = (
  svgs: Record<string, ReactNode>
): CharacterAsset[] => {
  return Object.keys(svgs).map((key) => ({
    type: key.toUpperCase(),
    level: 0,
    svg: renderToString(svgs[key] as React.ReactElement),
  }))
}
