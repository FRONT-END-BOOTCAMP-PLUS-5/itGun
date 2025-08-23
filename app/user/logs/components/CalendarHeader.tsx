"use client"

import { Button } from "@/ds/components/atoms/button/Button"
import { C1, H1 } from "@/ds/components/atoms/text/TextWrapper"
import Icon from "@/ds/components/atoms/icon/Icon"
import { CalendarHeaderProps } from "@/app/user/logs/types"

export const CalendarHeader = ({
  calMonth,
  onNext,
  onPrev,
  onToday,
}: CalendarHeaderProps) => {
  return (
    <div className="calendar-title-box grid w-full grid-cols-5 gap-2">
      <div></div>
      <div className="col-span-3 flex items-center justify-center gap-2">
        <div className="prev-button">
          <Button variant="ghost" size="xs" onClick={onPrev}>
            <Icon name="leftArrow" size={24} />
          </Button>
        </div>
        <div className="title">
          <H1>{calMonth}</H1>
        </div>
        <div className="next-button">
          <Button variant="ghost" size="xs" onClick={onNext}>
            <Icon name="rightArrow" size={24} />
          </Button>
        </div>
      </div>
      <div className="today-button flex items-center justify-center">
        <Button variant="ghost" size="xs" onClick={onToday}>
          <C1 variant="secondary">today</C1>
        </Button>
      </div>
    </div>
  )
}
