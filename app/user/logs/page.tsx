import React from "react"
import { CalendarHeader } from "@/app/user/logs/components/CalendarHeader"
import CalendarWithLogs from "@/app/user/logs/components/CalendarWithLogs"

const UserLogsPage = () => {
  return (
      <div className="flex h-[calc(100dvh-100px)] w-full flex-col overflow-hidden pb-[30px]">
        <div className="flex-shrink-0">
          <CalendarHeader />
        </div>
        <CalendarWithLogs />
      </div>
  )
}

export default UserLogsPage
