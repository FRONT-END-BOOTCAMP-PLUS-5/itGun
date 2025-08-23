"use client"

import { useGetUserGauges } from "@/hooks/useGetUserGauges"
import GaugeItem from "./GaugeItem"
import { useEffect, useState } from "react"

const GaugeList = () => {
  const { data } = useGetUserGauges()
  const [bodyPart, setBodyPart] = useState<[string, number][] | null>(null)
  useEffect(() => {
    if (data) {
      const { id, earnedAt, createdAt, ...rest } = data
      setBodyPart(Object.entries(rest))
    }
  }, [data])

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
