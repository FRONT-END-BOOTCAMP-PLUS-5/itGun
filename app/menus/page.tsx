import React from "react"
import MenuHeader from "./components/MenuHeader"
import MenuList from "./components/MenuList"
import LogInAndOutButton from "./components/LogInAndOutButton"

const MenuPage = () => {
  return (
    <div className="flex size-full flex-col items-center justify-between pb-[30px]">
      <div className="w-full">
        <MenuHeader />
        <MenuList />
      </div>
      <LogInAndOutButton />
    </div>
  )
}

export default MenuPage
