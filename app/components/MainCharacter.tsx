"use client"
import Character from "@/ds/components/atoms/character/Character"
import { useEffect, useState } from "react"
import { blink, dumbbellCurl } from "@/utils/animations"
import { CharacterAsset } from "@/ds/components/atoms/character/Character.types"
import Icon from "@/ds/components/atoms/icon/Icon"

const MainCharacter = () => {
  const [assets, setAssets] = useState<CharacterAsset[]>([])
  const [color, setColor] = useState("")

  useEffect(() => {
    const getCharacter = async () => {
      await fetch("/api/user/character")
        .then((res) => res.json())
        .then((data) => {
          setAssets(data?.assets)
          setColor(data?.characterColor)
        })
    }
    getCharacter()
  }, [])

  const defaultAnimation = () => {
    blink("eyes")

    const arm = assets.find((item) => item["type"] === "ARMS")
    dumbbellCurl(arm?.level)
  }
  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute -bottom-25 left-1/2 z-1 -translate-x-1/2">
        <Icon name="ellipse" viewBox="0 0 231 45" color="#D9D9D9" size={230} />
      </div>
      <div className="z-20">
        <Character
          assets={assets}
          animation={() => defaultAnimation()}
          characterColor={color}
        />
      </div>
    </div>
  )
}

export default MainCharacter
