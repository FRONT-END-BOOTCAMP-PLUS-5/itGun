import MainCharacter from "@/app/components/MainCharacter"
import Title from "@/app/components/title/Title"
import GaugeList from "./components/GaugeList"

const Gauges = () => {
  return (
    <div className="flex w-full flex-col gap-[30px]">
      <Title title={"근육 성장률"} />
      <MainCharacter isAnimation={false} isShadow={false} />
      <GaugeList />
    </div>
  )
}

export default Gauges
