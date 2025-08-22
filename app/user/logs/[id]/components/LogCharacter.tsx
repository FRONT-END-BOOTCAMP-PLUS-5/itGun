"use client"

import Character from "@/ds/components/atoms/character/Character"
import { useGetUserCharacter } from "@/hooks/useGetUserCharacter"
import { sortAssets } from "@/utils/assets"
import { dateToyymmdd } from "@/utils/dateToyymmdd"
import { LogCharacterProps } from "../types"

const LogCharacter = ({ date }: LogCharacterProps) => {
  const { data } = useGetUserCharacter(
    date ? { date: dateToyymmdd(date) } : undefined
  )

  return (
    <Character
      assets={sortAssets(data?.assets || [])}
      characterColor={data?.characterColor}
    />
  )
}

export default LogCharacter
