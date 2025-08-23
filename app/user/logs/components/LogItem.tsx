import { Button } from "@/ds/components/atoms/button/Button"
import Icon from "@/ds/components/atoms/icon/Icon"
import { C1, C2 } from "@/ds/components/atoms/text/TextWrapper"
import { svgList } from "@/static/svgs/svgList"
import { LogItemProps } from "@/app/user/logs/types"
import React from "react"
import { useRouter } from "next/navigation"

const LogItem = ({ log, calTypeMaps }: LogItemProps) => {
  const router = useRouter()

  const handleLogClick = (logId: number) => {
    router.push(`/user/logs/${logId}`)
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="xs"
        isFullWidth={true}
        onClick={() => handleLogClick(log.id)}
      >
        <div className="grid w-full grid-cols-4 gap-4 rounded-sm border-2 border-[var(--color-primary)] px-6 py-4">
          <div className="flex flex-col justify-center gap-1">
            <C2>
              {log.logDate.toLocaleDateString("en-US", { weekday: "short" })}
            </C2>
            <C1>{log.logDate.getDate()}</C1>
          </div>
          <div className="justify-center flex items-center">
            <Icon
              name={
                calTypeMaps(log.calIconType).iconName as keyof typeof svgList
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
    </div>
  )
}

export default LogItem
