"use client"

import { useCheckUserGauge } from "@/hooks/useCheckUserGauge"
import BadgeRing from "./BadgeRing"
import MainCharacter from "./MainCharacter"
import MainUserTitle from "./MainUserTitle"
import MobileNavBar from "./MobileNavBar"
import { useEffect, useState } from "react"
import { burky } from "@/static/svgs/burky"
import { createAssetsFromSvgs } from "@/utils/character"

const MainPage = () => {
  const { tear } = burky
  const [decorations] = useState(() => createAssetsFromSvgs({ tear }))
  const [hasNoRecentWorkout, setHasNoRecentWorkout] = useState(false)

  const { mutate } = useCheckUserGauge({
    onNoRecentWorkout: () => setHasNoRecentWorkout(true),
  })

  useEffect(() => {
    mutate()
  }, [])

  return (
    <>
      <MainCharacter decorations={hasNoRecentWorkout ? decorations : []} />
      <MainUserTitle />
      <BadgeRing />
      <MobileNavBar />
    </>
  )
}

export default MainPage
