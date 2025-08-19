import MainCharacter from "./components/MainCharacter"
import MobileNavBar from "./components/MobileNavBar"
import MainUserTitle from "./components/MainUserTitle"

export default function Home() {
  return (
    <div className="flex w-full flex-col items-center">
      <main>
        <MainCharacter />
        <MainUserTitle />
        <MobileNavBar />
      </main>
    </div>
  )
}
