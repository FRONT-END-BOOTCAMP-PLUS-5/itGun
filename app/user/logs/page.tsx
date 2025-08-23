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

  const [calMonth, setCalMonth] = useState<string>(() => {
    const now = new Date()
    return `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, "0")}`
  })

  const { data } = useGetUserLogs({ calMonth })

  const setInitData = () => {
    const logs = data?.logs?.length ? data.logs : []
    setLogsOnMonth(logs)
    setLogsToDisplay(logs)
  }

  useEffect(() => {
    setInitData()
  }, [calMonth, data])

  const setNewMonthTitle = () => {
    if (calendarRef.current) {
      const date = calendarRef.current.getApi().getDate()
      const newMonth = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}`
      setCalMonth(newMonth)
      setSelectedDate(null)
    }
  }

  const handleNext = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next()
      setNewMonthTitle()
    }
  }

  const handlePrev = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev()
      setNewMonthTitle()
    }
  }

  const handleToday = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today()
      setNewMonthTitle()
    }
  }

  const handleIconClick = (logs: Log[]) => {
    setLogsToDisplay(logs)
    setSelectedDate(logs[0].logDate.toISOString())
  }

  const calTypeMaps = ( calType: string ): { 
    calTypeKo: string 
    iconName: string 
    iconColor: string 
  } => {
    switch (calType) {
      case "upper":
        return { calTypeKo: "상체", iconName: "arm", iconColor: "secondary-yellow" }
      case "lower":
        return { calTypeKo: "하체", iconName: "leg", iconColor: "secondary-blue" }
      default:
        return { calTypeKo: "유산소", iconName: "hearts", iconColor: "secondary-pink" }
    }
  }

  return (
    <div className="size-full">
      <div className="mb-[20px] flex-grow-1">
        <CalendarHeader
          calMonth={calMonth}
          onNext={handleNext}
          onPrev={handlePrev}
          onToday={handleToday}
        />
        <CalendarGrid
          calendarRef={calendarRef}
          logsOnMonth={logsOnMonth}
          calTypeMaps={calTypeMaps}
          onIconClick={handleIconClick}
        />
      </div>
      <LogList
        logsToDisplay={logsToDisplay}
        selectedDate={selectedDate}
        calTypeMaps={calTypeMaps}
      />
    </div>
  )
}

export default UserLogsPage
