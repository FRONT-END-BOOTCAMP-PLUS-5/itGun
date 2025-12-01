import Icon from "@/ds/components/atoms/icon/Icon"
import { C2 } from "@/ds/components/atoms/text/TextWrapper"
import { ValidationItemProps } from "../types"

const ValidationItem = ({
  isValid,
  label,
  showIcon = true,
  className,
}: ValidationItemProps) => {
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

export default ValidationItem
