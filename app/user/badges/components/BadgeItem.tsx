import Icon from "@/ds/components/atoms/icon/Icon"
import { C2 } from "@/ds/components/atoms/text/TextWrapper"
import { BadgeItemProps } from "./BadgeItem.type"

const BadgeItem: React.FC<BadgeItemProps> = ({ index, badge, userBadge }) => {
  const colors = [
    "#FFF6E3",
    "#BFECFF",
    "#FFCCEA",
    "#CDC1FF",
    "#E8F5E8",
    "#FFE4CC",
    "#F0E6FF",
    "#FFF2E6",
  ]
  return (
    <div className="flex flex-col items-center justify-start gap-1">
      <Icon
        name="medal"
        size={90}
        fillColor={userBadge ? colors[index] : "white-200"}
      />
      <C2 className="max-w-[60px] text-center break-keep">{badge.name}</C2>
      {userBadge && (
        <div className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[var(--color-disable)]">
          <C2 variant="white-100">{userBadge.count}</C2>
        </div>
      )}
    </div>
  )
}

export default BadgeItem
