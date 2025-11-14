"use client"

import React from "react"
import MenuHeader from "./components/MenuHeader"
import MenuList from "./components/MenuList"
import LogInAndOutButton from "./components/LogInAndOutButton"
import { useSession } from "next-auth/react"

const MenuPage = () => {
  const { data: session } = useSession()
  return (
    <div className="flex size-full flex-col items-center justify-between pb-[30px]">
      <div className="w-full">
        <MenuHeader />
        <MenuList />
      </div>
      <LogInAndOutButton type={session?.user ? 0 : 1} />
    </div>
  )
}

export default MenuPage
