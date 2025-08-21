import BadgeGride from "./components/BageGrid"
import Title from "./components/Title"

const Badges = () => {
  return (
    <div className="flex w-full flex-col gap-[40px]">
      <Title />
      <BadgeGride />
    </div>
  )
}

export default Badges
