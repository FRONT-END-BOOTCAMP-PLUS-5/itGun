"use client"

import React from "react"
import { S1 } from "@/ds/components/atoms/text/TextWrapper"
import Icon from "@/ds/components/atoms/icon/Icon"
import { Button } from "@/ds/components/atoms/button/Button"
import { svgList } from "@/static/svgs/svgList"
import { useRouter } from "next/navigation"

const MenuList = () => {
  const route = useRouter()

  const menuMap: {
    name: string
    iconName: keyof typeof svgList
    iconColor: string
    pathName: string
  }[] = [
    { name: "뱃지", iconName: "medal", iconColor: "secondary-yellow", pathName: "/user/badges" },
    { name: "근육 성장률", iconName: "gauge", iconColor: "secondary-purple", pathName: "/user/gauges"},
    { name: "근로그", iconName: "calendar", iconColor: "secondary-pink", pathName: "/user/logs"},
    { name: "운동목록", iconName: "paper", iconColor: "secondary-blue", pathName: "/exercises"},
  ]

  const handleMenuClick = (pathName: string) => {
    route.push(pathName)
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {menuMap.map((menu, index) => (
        <React.Fragment key={index}>
          <Button
            variant="ghost"
            isFullWidth={true}
            size="xs"
            onClick={() => handleMenuClick(menu.pathName)}
          >
            <div className="flex w-full items-center justify-between rounded-sm border-2 border-[var(--color-primary)] p-5">
              <S1>{menu.name}</S1>
              <Icon name={menu.iconName} fillColor={menu.iconColor} size={30} />
            </div>
          </Button>
        </React.Fragment>
      ))}
    </div>
  )
}

export default MenuList
