import { TitleProps } from "@/app/types"
import { B2, H2 } from "@/ds/components/atoms/text/TextWrapper"

const Title: React.FC<TitleProps> = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <H2>{title}</H2>
      {subTitle && <B2 variant="secondary">{subTitle}</B2>}
    </div>
  )
}

export default Title
