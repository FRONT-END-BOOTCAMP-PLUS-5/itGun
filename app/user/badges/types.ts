import { Badge, UserBadge } from "@/services/user/badges/getUserBadges"

export interface BadgeItemProps {
  index: number
  badge: Badge
  userBadge?: UserBadge | null
}
