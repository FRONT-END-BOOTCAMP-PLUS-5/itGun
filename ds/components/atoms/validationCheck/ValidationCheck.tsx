import { ValidationCheckProps } from "@/ds/components/atoms/validationCheck/ValidationCheckProps.types"
import { C2 } from "@/ds/components/atoms/text/TextWrapper"
import Icon from "@/ds/components/atoms/icon/Icon"

const ValidationCheck = ({
  label,
  variant,
  showIcon = true,
  className,
}: ValidationCheckProps) => {
  if (!label) return null

  const customClassName = `flex items-end gap-2 ${className ?? ""}`.trim()

  return (
    <div className={customClassName}>
      <C2 variant={variant} className="mt-[5px]">
        {label}
      </C2>
      {showIcon && <Icon name="check" size={10} color={variant} />}
    </div>
  )
}

export default ValidationCheck
