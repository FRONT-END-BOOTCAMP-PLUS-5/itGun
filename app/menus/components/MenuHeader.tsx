"use client"

import Icon from "@/ds/components/atoms/icon/Icon"
import { H2 } from "@/ds/components/atoms/text/TextWrapper"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Link from "next/link"

const MenuHeader = () => {
  const { data: session } = useSession()

  const userColor = session?.user?.characterColor

  const colorArr = ["#FFF6E3", "#BFECFF", "#FFCCEA", "#CDC1FF"]

  const [randomColor, setRandomColor] = useState<number>(0)
  useEffect(() => {
    setRandomColor(Math.floor(Math.random() * 100) % 4)
  }, [])

  return (
    <div className="menu-header mb-8 flex w-full items-center justify-between py-1">
      <div className="flex items-center gap-2">
        <div className="flex aspect-square w-[95px] items-center justify-center rounded-full bg-[var(--color-disable)]">
          <Icon
            name="burkyFace"
            size={60}
            fillColor={userColor || colorArr[randomColor]}
            color="primary"
          />
        </div>
        <H2>{session?.user?.nickName ?? "벌키"}</H2>
      </div>
      <Link href={{ pathname: "/user" }}>
        <Icon name="setting" size={30} />
      </Link>
    </div>
  )
}

export default MenuHeader
