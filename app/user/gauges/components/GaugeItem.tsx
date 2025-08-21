import { B2, S1 } from "@/ds/components/atoms/text/TextWrapper"
import ProgressBar from "@/ds/components/molecules/progressBar/ProgressBar"
import { BODY_PART_KO, GaugeItemProps } from "./GuageItem.types"

const GaugeItem: React.FC<GaugeItemProps> = ({ label, gauge }) => {
  return (
    <div className="flex w-full flex-col gap-[10px]">
      <div className="flex w-full items-center justify-between">
        <S1>{BODY_PART_KO[label as keyof typeof BODY_PART_KO]}</S1>
        <B2 fontWeight="bold">{Math.floor(gauge) + 1} / 5</B2>
      </div>
      <ProgressBar max={1} value={gauge} steps={10} />
    </div>
  )
}
export default GaugeItem
