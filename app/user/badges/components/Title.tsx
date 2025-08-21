import { B2, H2 } from "@/ds/components/atoms/text/TextWrapper"

const Title = () => {
  return (
    <div className="flex flex-col gap-[10px]">
      <H2>뱃지 목록</H2>
      <B2 variant="secondary">운동 목표를 달성하여 뱃지를 획득하세요!</B2>
    </div>
  )
}

export default Title
