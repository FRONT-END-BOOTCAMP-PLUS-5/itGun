"use client"

import { useCheckUserGauge } from "@/hooks/useCheckUserGauge"
import BadgeRing from "./BadgeRing"
import MainCharacter from "./MainCharacter"
import MainUserTitle from "./MainUserTitle"
import MobileNavBar from "./MobileNavBar"
import { useEffect } from "react"

const MainPage = () => {
  const { mutate } = useCheckUserGauge()

  useEffect(() => {
    mutate()
  }, [])

  return (
    <>
      <MainCharacter />
      <MainUserTitle />
      <BadgeRing />
      <MobileNavBar />
    </>
  )
}

export default MainPage
