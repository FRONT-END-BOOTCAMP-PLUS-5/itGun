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
    <div className="flex h-[calc(100dvh-100px)] w-full flex-col pb-[30px] overflow-hidden">
      <div className="flex-shrink-0">
        <CalendarHeader
          calendarRef={calendarRef}
          calMonth={calMonth}
          setCalMonth={setCalMonth}
          setSelectedDate={setSelectedDate}
        />
      </div>
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className={`${isSlideUp ? "h-0" : "flex-shrink-0"}`}>
          <CalendarGrid
            calendarRef={calendarRef}
            logsOnMonth={logsOnMonth}
            calTypeMaps={calTypeMaps}
            onIconClick={handleIconClick}
          />
        </div>
        <div
          className={`bg-white-100 min-h-0 flex-1 z-10 
            rounded-t-lg border-t-1 border-x-1 border-[var(--color-secondary)]
            ${isSlideUp ? "animate-log-list-expand" : "mt-2 animate-log-list-collapse"}`}
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
    </div>
  )
}

export default UserLogsPage
