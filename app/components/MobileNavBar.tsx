"use client"
import { Button } from "@/ds/components/atoms/button/Button"
import Icon from "@/ds/components/atoms/icon/Icon"
import { useLoginGuard } from "@/hooks/useLoginGuard"
import { useRouter } from "next/navigation"

const MobileNavBar = () => {
  const router = useRouter()
  const loginGuard = useLoginGuard()
  const handleClickCalendar = () => {
    router.push("/user/logs")
  }
  const handleClickMenu = () => {
    router.push("/menus")
  }
  const handleClickHearts = () => {
    loginGuard(() => {
      router.push("/logs")
    })
  }

  return (
    <div className="fixed bottom-0 left-1/2 z-10 h-[70px] w-full max-w-[430px] -translate-x-1/2 border-t-4 border-[var(--color-primary)]/10 bg-[var(--color-white-200)]">
      <div className="flex h-full w-full items-center justify-between px-[30px] py-[10px]">
        <Button variant="ghost" size="xs" onClick={handleClickCalendar}>
          <Icon name="calendar" size={50} />
        </Button>
        <Button variant="ghost" size="xs" onClick={handleClickMenu}>
          <Icon name="menu" size={50} />
        </Button>
      </div>
      <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
        <Button variant="ghost" size="xs" onClick={handleClickHearts}>
          <Icon name="plusHearts" size={120} fillColor="error" />
        </Button>
      </div>
    </div>
  )
}

export default MobileNavBar
