"use client"

import dynamic from "next/dynamic"
import React, { useEffect } from "react"
import Tooltip from "@/ds/components/atoms/tooltip/Tooltip"
import LogList from "@/app/user/logs/components/LogList"
import { useSession } from "next-auth/react"
import { useGetUserLogs } from "@/hooks/useGetUserLogs"
import { useSearchParams } from "next/navigation"
import { useUserLogsStore } from "@/hooks/useUserLogsStore"

const calTypeMaps = (
    calType: string
): {
  calTypeKo: string
  iconName: string
  iconColor: string
} => {
  switch (calType) {
    case "upper":
      return {
        calTypeKo: "상체",
        iconName: "arm",
        iconColor: "secondary-purple",
      }
    case "lower":
      return {
        calTypeKo: "하체",
        iconName: "leg",
        iconColor: "secondary-blue",
      }
    default:
      return {
        calTypeKo: "유산소",
        iconName: "hearts",
        iconColor: "secondary-pink",
      }
    }
  }

const CalendarComponent = dynamic(() => import("@/app/user/logs/components/CalendarGrid"), {
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center">
      캘린더 로딩중...
    </div>
  ),
  ssr: false,
})

const CalendarWithLogs = () => {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const now = new Date()
  const year = searchParams.get("year") || now.getFullYear().toString()
  const month = searchParams.get("month") || (now.getMonth() + 1).toString()

  const { data, isFetching } = useGetUserLogs(
    { year, month },
    { enabled: !!session?.user }
  )

  const setLogsOnMonth = useUserLogsStore((state) => state.setLogsOnMonth)
  const isSlideUp = useUserLogsStore((state) => state.isSlideUp)

  useEffect(() => {
    const logs = data?.logs?.length ? data.logs : []
    setLogsOnMonth(logs)
  }, [data, setLogsOnMonth])

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className={`${isSlideUp ? "h-0" : "flex-shrink-0"}`}>
        <CalendarComponent
          year={year}
          month={month}
          calTypeMaps={calTypeMaps}
        />
      </div>
      <div
        className={`bg-white-100 z-10 min-h-0 flex-1 rounded-t-lg border-x-1 border-t-1 border-[var(--color-secondary)] ${isSlideUp ? "animate-log-list-expand" : "animate-log-list-collapse mt-2"}`}
      >
        {!session?.user && (
          <Tooltip
            label={`로그인하면 운동 기록을 
              달력에서 한 눈에 볼 수 있어요!`}
            position="top"
            variant="success"
          />
        )}
        <LogList
          isFetching={isFetching}
          calTypeMaps={calTypeMaps}
        />
      </div>
    </div>
  )
}

export default CalendarWithLogs
