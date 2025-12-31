"use client"

import { useCheckUserGauge } from "@/hooks/useCheckUserGauge"
import BadgeRing from "./BadgeRing"
import MainCharacter from "./MainCharacter"
import MainUserTitle from "./MainUserTitle"
import MobileNavBar from "./MobileNavBar"
import { useEffect, useState } from "react"
import { burky } from "@/static/svgs/burky"
import { createAssetsFromSvgs } from "@/utils/character"
import { useSession } from "next-auth/react"
import Tooltip from "@/ds/components/atoms/tooltip/Tooltip"

const MainPage = () => {
  const { tear } = burky
  const [decorations] = useState(() => createAssetsFromSvgs({ tear }))
  const [hasNoRecentWorkout, setHasNoRecentWorkout] = useState(false)
  const { data: session } = useSession()

  const { mutate } = useCheckUserGauge({
    onNoRecentWorkout: () => setHasNoRecentWorkout(true),
  })

  useEffect(() => {
    mutate()
  }, [])

  return (
    <>
      {!session?.user && (
        <Tooltip
          label="운동기록을 추가하면 캐릭터가 성장합니다!"
          variant="success"
        />
      )}
      <MainCharacter decorations={hasNoRecentWorkout ? decorations : []} />
      <MainUserTitle />
      <BadgeRing />
      <MobileNavBar />
    </>
  )
}

export default MainPage
