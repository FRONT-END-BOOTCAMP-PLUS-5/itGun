"use client"
import Character from "@/ds/components/atoms/character/Character"
import { useEffect, useState } from "react"
import { blink, bounce, dumbbellCurl, wave } from "@/utils/animations"
import { CharacterAsset } from "@/ds/components/atoms/character/Character.types"
import Icon from "@/ds/components/atoms/icon/Icon"
import { useGetUserCharacter } from "@/hooks/useGetUserCharacter"
import {
  matchAssetLevels,
  sortAssets,
  svgToCharacterAsset,
} from "@/utils/assets"
import { burky } from "@/static/svgs/burky"
import { useSession } from "next-auth/react"
import { useCharacterStore } from "@/hooks/useCharacterStore"
import { MainCharacterProps } from "@/app/types"

const MainCharacter: React.FC<MainCharacterProps> = ({
  isAnimation = true,
  isShadow = true,
  date,
  decorations = [],
}) => {
  const { setOriginalCharacter } = useCharacterStore()
  const { data: session } = useSession()
  const { data } = useGetUserCharacter(date ? { date } : undefined, {
    enabled: session?.user ? true : false,
  })
  const { face, torso, arms, legs } = burky
  const [assets, setAssets] = useState<CharacterAsset[]>([
    svgToCharacterAsset("legs", legs),
    svgToCharacterAsset("face", face),
    svgToCharacterAsset("torso", torso),
    svgToCharacterAsset("arms", arms),
  ])
  const [levels, setLevels] = useState<Record<string, number>>()
  const [color, setColor] = useState("#cdc1ff")

  useEffect(() => {
    if (data) {
      if (data.assets) {
        const originalAssets = sortAssets([...data.assets, ...decorations])
        setAssets(originalAssets)
        setLevels(matchAssetLevels(data.assets))

        let originColor = "#fff"
        if (data.characterColor) {
          originColor = data.characterColor
        }

        setColor(originColor)
        setOriginalCharacter(originalAssets, originColor)
      }
    }
  }, [data, decorations, setOriginalCharacter])

  const defaultAnimation = () => {
    blink("eyes")

    const moveTargets = [
      `left-under-arm-${levels?.ARMS ? levels.ARMS : 0}`,
      `left-upper-arm-${levels?.ARMS ? levels.ARMS : 0}`,
      `right-under-arm-${levels?.ARMS ? levels.ARMS : 0}`,
      `right-upper-arm-${levels?.ARMS ? levels.ARMS : 0}`,
      `face`,
      `torso-${levels?.TORSO ? levels.TORSO : 0}`,
    ]
    bounce(moveTargets)
    wave(`left-under-arm-0`, 2)
  }

  return (
    <div className="relative flex flex-col items-center">
      {isShadow && (
        <div className="absolute -bottom-25 left-1/2 z-1 -translate-x-1/2">
          <Icon
            name="ellipse"
            viewBox="0 0 231 45"
            color="#D9D9D9"
            size={230}
          />
        </div>
      )}
      <div className="z-20">
        <Character
          assets={assets}
          animation={() => {
            isAnimation && defaultAnimation()
          }}
          characterColor={color}
        />
      </div>
    </div>
  )
}

export default MainCharacter
