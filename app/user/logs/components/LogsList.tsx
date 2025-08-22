"use client"

import { Button } from "@/ds/components/atoms/button/Button"
import { C1, C2, S1 } from "@/ds/components/atoms/text/TextWrapper"
import Icon from "@/ds/components/atoms/icon/Icon"
import { dateToYmdSlash } from "@/utils/dateToYmdSlash"
import { svgList } from "@/static/svgs/svgList"
import { LogsListProps } from "@/app/user/logs/types"
import React from "react"

export const LogsList = ({
  logsToDisplay,
  selectedDate,
  onLogClick,
  calTypeMaps,
}: LogsListProps) => {
  return (
    <div className="log-list relative mb-3 flex max-h-[30%] flex-col gap-[18px] overflow-hidden">
      <div className="daily-logs-title sticky top-0 px-2">
        <S1>
          {selectedDate ? dateToYmdSlash(selectedDate) : "이달의 운동 기록"}
        </S1>
      </div>
      <div className="overflow-auto">
        {logsToDisplay.map((log) => (
          <React.Fragment key={log.id}>
            <Button
              variant="ghost"
              size="xs"
              isFullWidth={true}
              onClick={() => onLogClick(log.id)}
            >
              <div className="grid w-full grid-cols-4 gap-4 rounded-sm border-2 border-[var(--color-primary)] px-6 py-4">
                <div className="flex flex-col justify-center gap-1">
                  <C2>{log.logDate.toLocaleDateString("en-US", { weekday: "short" })}</C2>
                  <C1>{log.logDate.getDate()}</C1>
                </div>
                <div className="jutify-center flex items-center">
                  <Icon
                    name={
                      calTypeMaps(log.calIconType)
                        .iconName as keyof typeof svgList
                    }
                  />
                  <C2>{calTypeMaps(log.calIconType).calTypeKo}</C2>
                </div>
                <div className="flex items-center justify-center">
                  <Icon name="clock" />
                  <C2>{`${log.totalDuration}min.`}</C2>
                </div>
                <div className="flex items-center justify-center">
                  <Icon name="rightArrow" fillColor="primary" />
                </div>
              </div>
            </Button>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
