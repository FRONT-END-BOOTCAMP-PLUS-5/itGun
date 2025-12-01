"use client"

import React from "react"
import { S1 } from "@/ds/components/atoms/text/TextWrapper"
import Icon from "@/ds/components/atoms/icon/Icon"
import { Button } from "@/ds/components/atoms/button/Button"
import { useRouter } from "next/navigation"
import { MENU_MAP } from "@/app/menus/constants"

const MenuList = () => {
  const route = useRouter()

  const handleMenuClick = (pathName: string) => {
    route.push(pathName)
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {MENU_MAP.map((menu, index) => (
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
