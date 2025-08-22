"use client"
import Character from "@/ds/components/atoms/character/Character"
import { CharacterAsset } from "@/ds/components/atoms/character/Character.types"
import { burky } from "@/static/svgs/burky"
import { sortAssets } from "@/utils/assets"
import { createAssetsFromSvgs } from "@/utils/character"

const NotFoundCharacter = () => {
  const { dumbbellLeft, dumbbellRight, sweat, ...rest } = burky
  const assets: CharacterAsset[] = createAssetsFromSvgs(rest)
  return <Character assets={sortAssets(assets)} characterColor="#FFCCEA" />
}

export default NotFoundCharacter
