"use client"
import { useGetUserBadges } from "@/hooks/useGetUserBadges"
import BadgeItem from "./BadgeItem"
import { Badge, UserBadge } from "@/services/user/badges/getUserBadges"

const BadgeGride = () => {
  const { data } = useGetUserBadges()

  const matchBadge = (badge: Badge): UserBadge | null => {
    let match: UserBadge | null = null

    if (data?.userBadges && data.userBadges.length > 0) {
      match = data.userBadges.filter(
        (userBadge) => userBadge.badgeId === badge.id
      )[0]
    }

    return match
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data &&
        data.badges.map((badge, index) => (
          <BadgeItem
            key={badge.id}
            index={index}
            badge={badge}
            userBadge={matchBadge(badge)}
          />
        ))}
    </div>
  )
}

export default BadgeGride
