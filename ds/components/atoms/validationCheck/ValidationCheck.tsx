import { ValidationCheckProps } from "@/ds/components/atoms/validationCheck/ValidationCheckProps.types"
import { C2 } from "../text/TextWrapper"
import Icon from "../icon/Icon"

const ValidationCheck = ({
  isValid,
  label,
  showIcon = true,
  className,
}: ValidationCheckProps) => {
  const customClassName = `flex items-end gap-2 ${className}`

  return (
    <div className={customClassName}>
      <C2 variant={isValid ? "success" : "disable"} className="mt-[5px]">
        {label}
      </C2>
      {showIcon && (
        <Icon name="check" size={10} color={isValid ? "success" : "disable"} />
      )}
    </div>
  )
}

export default ValidationCheck
