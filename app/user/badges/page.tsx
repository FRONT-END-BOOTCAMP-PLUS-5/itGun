import Title from "@/app/components/title/Title"
import BadgeGride from "./components/BageGrid"

const Badges = () => {
  return (
    <div className="flex w-full flex-col gap-[40px]">
      <Title
        title={"뱃지 목록"}
        subTitle={"운동 목표를 달성하여 뱃지를 획득하세요!"}
      />
      <BadgeGride />
    </div>
  )
}

export default Badges
