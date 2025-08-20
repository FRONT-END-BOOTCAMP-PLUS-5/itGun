"use client"
import Character from "@/ds/components/atoms/character/Character"
import { blink, dumbbellCurl } from "@/utils/animations"
import { burky } from "@/static/svgs/burky"
import { CharacterAsset } from "@/ds/components/atoms/character/Character.types"
import { createAssetsFromSvgs } from "@/utils/character"
import { sortAssets } from "@/utils/assets"
import { useEffect, useState } from "react"

const LoadingCharacter = () => {
  const assets: CharacterAsset[] = createAssetsFromSvgs(burky)
  const defaultAnimation = () => {
    blink("eyes")
    dumbbellCurl(0)
  }
  const color = ["#FFF6E3", "#BFECFF", "#FFCCEA", "#CDC1FF"]

  const [randomColor, setRandomColor] = useState<number>(0)
  useEffect(() => {
    setRandomColor(Math.floor(Math.random() * 100) % 4)
  }, [])

  return (
    <div className="relative flex flex-col items-center">
      <div className="z-20">
        <Character
          assets={sortAssets(assets)}
          animation={() => defaultAnimation()}
          characterColor={color[randomColor]}
        />
      </div>
    </div>
  )
}

export default LoadingCharacter
