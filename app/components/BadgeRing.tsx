"use client"
import Icon from "@/ds/components/atoms/icon/Icon"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { svgList } from "@/static/svgs/svgList"
import { moveByRingPath } from "@/utils/animations"
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"
import { useGetUserBadges } from "@/hooks/useGetUserBadges"

interface Badge {
  color: string
  iconName: keyof typeof svgList
}

const BadgeRing = ({}) => {
  const { data } = useGetUserBadges({ limit: 6 })
  // console.log(data?.badges)

  const badges: Badge[] = [
    { color: "secondary-blue", iconName: "medal" },
    { color: "secondary-pink", iconName: "medal" },
    { color: "secondary-yellow", iconName: "medal" },
    { color: "white-200", iconName: "medal" },
    { color: "accent", iconName: "medal" },
    { color: "accent", iconName: "medal" },
  ]
  gsap.registerPlugin(MotionPathPlugin)
  gsap.registerPlugin(useGSAP)

  useGSAP(() => {
    moveByRingPath(badges)
  })

  return (
    <div className="absolute top-0 left-1/2 -translate-x-1/2">
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
      {badges.map((badge, index) => {
        return (
          <div
            key={index}
            id={`badge-${index}`}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0"
          >
            <Icon name={badge.iconName} fillColor={badge.color} size={70} />
          </div>
        )
      })}
    </div>
  )
}

export default BadgeRing
