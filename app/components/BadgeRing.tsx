"use client"
import Icon from "@/ds/components/atoms/icon/Icon"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { moveByRingPath } from "@/utils/animations"
import { useGetUserBadges } from "@/hooks/useGetUserBadges"
import { colors } from "@/static/colors"
import { useRouter } from "next/navigation"
import { Button } from "@/ds/components/atoms/button/Button"
import { useSession } from "next-auth/react"

const BadgeRing = ({}) => {
  const { data: session } = useSession()
  const { data } = useGetUserBadges(
    { limit: 6 },
    { enabled: session?.user ? true : false }
  )
  const router = useRouter()
  gsap.registerPlugin(MotionPathPlugin)
  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    if (data?.userBadges && data?.userBadges?.length > 0)
      moveByRingPath(data.userBadges)
  }, [data])

  const onClickBadge = () => {
    router.push("/user/badges")
  }

  return (
    <div className="absolute -top-3 left-1/2 z-25 -translate-x-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="300"
        height="300"
        viewBox="0 0 14 14"
        fill="none"
      >
        <g clipPath="url(#clip0_15_4145)">
          <path
            id="path"
            d="M7 13.5C10.5899 13.5 13.5 10.5899 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_15_4145">
            <rect width="14" height="14" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {data?.userBadges?.map((badge, index) => {
        return (
          <Button
            key={index}
            id={`badge-${index}`}
            variant="ghost"
            size="xs"
            className="absolute bottom-0 left-1/2 z-30 -translate-x-1/2 opacity-0"
            onClick={onClickBadge}
          >
            <Icon name="medal" fillColor={colors[index]} size={70} />
          </Button>
        )
      })}
    </div>
  )
}

export default BadgeRing
