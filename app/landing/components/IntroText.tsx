import { D1, S1 } from "@/ds/components/atoms/text/TextWrapper"

const IntroText = () => {
  return (
    <div className="-mt-15 mb-[40px] flex flex-col items-center gap-[10px]">
      <D1>ItGun</D1>
      <S1 className="text-center" variant="secondary">
        꾸준한 운동을 통해
        <br /> 캐릭터를 키워보세요!
      </S1>
    </div>
  )
}
export default IntroText
