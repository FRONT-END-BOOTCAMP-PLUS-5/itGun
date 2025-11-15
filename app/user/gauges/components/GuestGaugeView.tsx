import { B2, S1 } from "@/ds/components/atoms/text/TextWrapper"
import Tooltip from "@/ds/components/atoms/tooltip/Tooltip"
import ProgressBar from "@/ds/components/molecules/progressBar/ProgressBar"

const GuestGaugeItem = ({ withTooltip }: { withTooltip?: boolean }) => {
  return (
    <div className="relative flex w-full flex-col gap-[10px]">
      <div className="flex w-full items-center justify-between">
        <S1>부위</S1>
        <B2 fontWeight="bold">1 / 5</B2>
      </div>
      <ProgressBar max={1} value={0.4} steps={10} />
      {withTooltip && (
        <Tooltip
          label={`로그인 후 운동기록을 하면
          부위별 근육 성장률을 볼 수 있어요!`}
          position="bottom"
          variant="success"
        />
      )}
    </div>
  )
}

const GuestGaugeView = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      {Array.from({ length: 3 }).map((_, index) => (
        <GuestGaugeItem key={index} withTooltip={index === 0} />
      ))}
    </div>
  )
}
export default GuestGaugeView
