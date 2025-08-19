import MainCharacter from "./components/MainCharacter"
import MobileNavBar from "./components/MobileNavBar"
import MainUserTitle from "./components/MainUserTitle"
import BadgeRing from "./components/BadgeRing"

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      <main className="relative">
        <MainCharacter />
        <MainUserTitle />
        <BadgeRing />
        <MobileNavBar />
      </main>
    </div>
  )
}
