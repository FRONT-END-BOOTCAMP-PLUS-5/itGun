"use client"

import { useGetUserGauges } from "@/hooks/useGetUserGauges"
import GaugeItem from "./GaugeItem"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import GuestGaugeView from "./GuestGaugeView"

const GaugeList = () => {
  const { data: session } = useSession()
  const { data } = useGetUserGauges({ enabled: session?.user ? true : false })
  const [bodyPart, setBodyPart] = useState<[string, number][] | null>(null)
  useEffect(() => {
    if (data) {
      const { id, earnedAt, createdAt, ...rest } = data
      setBodyPart(Object.entries(rest))
    }
  }, [data])

  if (!session?.user) {
    return <GuestGaugeView />
  }

  return (
    <div className="flex flex-col gap-[30px]">
      {bodyPart &&
        bodyPart.map((item) => (
          <GaugeItem label={item[0]} gauge={item[1]} key={item[0]} />
        ))}
    </div>
  )
}
export default GaugeList
