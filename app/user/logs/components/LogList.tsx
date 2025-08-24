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
    <div className="relative mb-3 flex max-h-[30%] flex-col gap-[9px] overflow-hidden">
      <div className="sticky top-0 px-2">
        <S1>
          {selectedDate ? dateToYmdSlash(selectedDate) : "이달의 운동 기록"}
        </S1>
      </div>
      <div className="overflow-auto scrollbar-none">
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
