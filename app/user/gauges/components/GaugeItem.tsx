import { B2, S1 } from "@/ds/components/atoms/text/TextWrapper"
import ProgressBar from "@/ds/components/molecules/progressBar/ProgressBar"
import { GaugeItemProps } from "@/app/user/gauges/types"
import { BODY_PART_KO } from "@/app/user/gauges/constants"

const GaugeItem: React.FC<GaugeItemProps> = ({ label, gauge }) => {
  return (
    <div className="flex w-full flex-col gap-[10px]">
      <div className="flex w-full items-center justify-between">
        <S1>{BODY_PART_KO[label as keyof typeof BODY_PART_KO]}</S1>
        <B2 fontWeight="bold">{Math.floor(gauge) + 1} / 5</B2>
      </div>
      <ProgressBar max={1} value={gauge % 1} steps={10} />
    </div>
  )
}
export default GaugeItem
