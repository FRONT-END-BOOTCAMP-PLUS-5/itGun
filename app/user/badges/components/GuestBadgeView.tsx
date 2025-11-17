"use client"

import Tooltip from "@/ds/components/atoms/tooltip/Tooltip"

const GuestBadgeItem = ({ withTooltip }: { withTooltip?: boolean }) => (
  <div className="relative flex aspect-square flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 p-2">
    <div className="relative h-[80px] w-[80px] rounded-full bg-gray-300" />
    <div className="h-4 w-20 rounded-full bg-gray-200" />
    {withTooltip && (
      <Tooltip
        label="로그인하여 획득한 뱃지를 확인하세요!"
        position="bottom"
        variant="success"
      />
    )}
  </div>
)

const GuestBadgeView = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <GuestBadgeItem key={index} withTooltip={index === 1} />
      ))}
    </div>
  )
}

export default GuestBadgeView
