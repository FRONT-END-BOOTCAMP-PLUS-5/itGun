"use client"

import { S1 } from "@/ds/components/atoms/text/TextWrapper"
import { dateToYmdSlash } from "@/utils/dateToYmdSlash"
import { LogListProps } from "@/app/user/logs/types"
import React from "react"
import LogItem from "@/app/user/logs/components/LogItem"
import Loading from "@/app/loading"
import Icon from "@/ds/components/atoms/icon/Icon"

const LogList = ({
  isFetching,
  logsToDisplay,
  selectedDate,
  calTypeMaps,
  isSlideUp,
  setIsSlideUp,
}: LogListProps) => {
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsSlideUp(!isSlideUp)
  }

  const handleClick = (e: React.MouseEvent) => {
    setIsSlideUp(!isSlideUp)
  }
  return (
    <div className="relative flex h-full flex-col gap-[9px] overflow-hidden px-2 pt-4">
      <div
        className="sticky top-0 cursor-pointer px-2"
        onTouchStart={handleTouchStart}
        onClick={handleClick}
      >
        <S1 className="flex items-center gap-2">
          {selectedDate
            ? `${dateToYmdSlash(selectedDate)}의 운동기록`
            : "이달의 운동 기록"}
          <div
            className={`flex h-6 w-6 transform items-center justify-center transition-transform duration-0 ${isSlideUp ? "" : "rotate-180"}`}
          >
            <Icon
              name="downArrow"
              color="primary"
              fillColor="primary"
              size={15}
              viewBox="0 0 14 8"
            />
          </div>
        </S1>
      </div>
      <div className="scrollbar-none flex-1 overflow-auto">
        {isFetching ? (
          <Loading />
        ) : (
          logsToDisplay.map((log) => (
            <LogItem key={log.id} log={log} calTypeMaps={calTypeMaps} />
          ))
        )}
      </div>
    </div>
  )
}

export default LogList
