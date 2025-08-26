"use client"

import React, { useEffect, useRef, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import { CalendarHeader } from "@/app/user/logs/components/CalendarHeader"
import { CalendarGrid } from "@/app/user/logs/components/CalendarGrid"
import LogList from "@/app/user/logs/components/LogList"
import { useGetUserLogs } from "@/hooks/useGetUserLogs"
import { Log } from "@/app/user/logs/types"

const UserLogsPage = () => {
  const calendarRef = useRef<FullCalendar | null>(null)

  const [logsOnMonth, setLogsOnMonth] = useState<Log[]>([])
  const [logsToDisplay, setLogsToDisplay] = useState<Log[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isSlideUp, setIsSlideUp] = useState<boolean>(false)

  const [calMonth, setCalMonth] = useState<string>(() => {
    const now = new Date()
    return `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, "0")}`
  })

  const { data, isFetching } = useGetUserLogs({ calMonth })

  const setInitData = () => {
    const logs = data?.logs?.length ? data.logs : []
    setLogsOnMonth(logs)
    setLogsToDisplay(logs)
  }

  useEffect(() => {
    setInitData()
  }, [calMonth, data])

  const handleIconClick = (logs: Log[]) => {
    setLogsToDisplay(logs)
    setSelectedDate(new Date(logs[0].logDate).toISOString())
  }

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

  return (
    <div className="relative flex h-[calc(100dvh-100px)] w-full flex-col pb-[30px]">
      <div className="flex-shrink-0">
        <CalendarHeader
          calendarRef={calendarRef}
          calMonth={calMonth}
          setCalMonth={setCalMonth}
          setSelectedDate={setSelectedDate}
        />
        <CalendarGrid
          calendarRef={calendarRef}
          logsOnMonth={logsOnMonth}
          calTypeMaps={calTypeMaps}
          onIconClick={handleIconClick}
        />
      </div>
      <div
        className={`min-h-0 flex-1 touch-pan-y transition-all duration-300 ease-out z-10 
            rounded-t-lg border-t-1 border-x-1 border-[var(--color-secondary)]
          ${ isSlideUp
            ? "bg-white-100 animate-log-list-slide-up absolute inset-x-0 top-[50px] bottom-0 "
            : "animate-log-list-slide-down"
        }`}
        
      >
        <LogList
          isFetching={isFetching}
          logsToDisplay={logsToDisplay}
          selectedDate={selectedDate}
          calTypeMaps={calTypeMaps}
          isSlideUp={isSlideUp}
          setIsSlideUp={setIsSlideUp}
        />
      </div>
    </div>
  )
}

export default UserLogsPage
