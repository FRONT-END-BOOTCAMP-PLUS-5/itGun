"use client"

import { S1 } from "@/ds/components/atoms/text/TextWrapper"
import { dateToYmdSlash } from "@/utils/dateToYmdSlash"
import { LogListProps } from "@/app/user/logs/types"
import React from "react"
import LogItem from "@/app/user/logs/components/LogItem"
import Loading from "@/app/loading"

const LogList = ({
  isFetching,
  logsToDisplay,
  selectedDate,
  calTypeMaps,
}: LogListProps) => {
  return (
    <div className="relative flex flex-col gap-[9px] overflow-hidden h-full">
      <div className="sticky top-0 px-2">
        <S1>
          {selectedDate ? `${dateToYmdSlash(selectedDate)}의 운동기록` : "이달의 운동 기록"}
        </S1>
      </div>
      <div className="flex-1 overflow-auto scrollbar-none">
        {isFetching 
        ? <Loading /> 
        : logsToDisplay.map((log) => (
          <LogItem
            key={log.id}
            log={log}
            calTypeMaps={calTypeMaps}
          />
        ))}
      </div>
    </div>
  )
}

export default LogList
