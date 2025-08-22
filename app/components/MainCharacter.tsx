"use client"
import Character from "@/ds/components/atoms/character/Character"
import { useEffect, useState } from "react"
import { blink, bounce, dumbbellCurl, wave } from "@/utils/animations"
import { CharacterAsset } from "@/ds/components/atoms/character/Character.types"
import Icon from "@/ds/components/atoms/icon/Icon"
import { useGetUserCharacter } from "@/hooks/useGetUserCharacter"
import { matchAssetLevels, sortAssets } from "@/utils/assets"
import { useCheckUserGauge } from "@/hooks/useCheckUserGauge"

const MainCharacter: React.FC<MainCharacterProps> = ({
  isAnimation = true,
  isShadow = true,
}) => {
  const { data } = useGetUserCharacter()
  const { mutate } = useCheckUserGauge()

  const [assets, setAssets] = useState<CharacterAsset[]>([])
  const [levels, setLevels] = useState<Record<string, number>>()
  const [color, setColor] = useState("")

  useEffect(() => {
    if (data) {
      if (data.assets) {
        setAssets(sortAssets(data.assets))
        setLevels(matchAssetLevels(data.assets))
      }
      if (data.characterColor) {
        setColor(data.characterColor)
      }
    }
  }, [data])

  useEffect(() => {
    mutate()
  }, [])

  const defaultAnimation = () => {
    blink("eyes")

    const moveTargets = [
      `left-under-arm-${levels?.ARMS ? levels.ARMS : 0}`,
      `left-upper-arm-${levels?.ARMS ? levels.ARMS : 0}`,
      `right-under-arm-${levels?.ARMS ? levels.ARMS : 0}`,
      `right-upper-arm-${levels?.ARMS ? levels.ARMS : 0}`,
      `face`,
      `torso-${levels?.TORSO ? levels.ARMS : 0}`,
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
