"use client"

import { useGetUserLog } from "@/hooks/useGetUserLog"
import WorkoutList from "./WorkoutList"
import LogSummaryHeader from "./LogSummaryHeader"
import { LogDetailProps } from "../types"
import { C2 } from "@/ds/components/atoms/text/TextWrapper"
import MainCharacter from "@/app/components/MainCharacter"
import { dateToyymmdd } from "@/utils/dateToyymmdd"

const LogDetailPage = ({ id }: LogDetailProps) => {
  const { data, isLoading } = useGetUserLog(id)
  const log = data?.log

  if (isLoading || !log) return <C2>💪 이 로그에는 아무 기록도 없어요.</C2>

  return (
    <div className="flex flex-col items-center gap-5 pb-7.5">
      <LogSummaryHeader
        id={id}
        date={log.logDate}
        duration={log.totalDuration}
      />
      <MainCharacter
        isAnimation={false}
        isShadow={false}
        date={dateToyymmdd(log.logDate)}
      />
      <WorkoutList workouts={log.workouts} />
    </div>
  )
}

export default LogDetailPage
