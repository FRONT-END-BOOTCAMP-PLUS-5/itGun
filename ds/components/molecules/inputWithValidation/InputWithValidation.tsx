import { Input } from "@/ds/components/atoms/input/Input"
import ValidationCheck from "@/ds/components/atoms/validationCheck/ValidationCheck"
import { InputWithValidationProps } from "@/ds/components/molecules/inputWithValidation/InputWithValidationProps.types"

const InputWithValidation = ({
  validations,
  name,
  type = "text",
  size = "md",
  value,
  isFullWidth = false,
  placeholder,
  readOnly = false,
  className,
  onChange,
  ...props
}: InputWithValidationProps) => {
  return (
    <div>
      <Input
        name={name}
        type={type}
        size={size}
        value={value}
        isFullWidth={isFullWidth}
        placeholder={placeholder}
        readOnly={readOnly}
        className={className}
        onChange={onChange}
        {...props}
      />
      <div className="flex gap-5">
        {validations.map(({ label, isValid }) => (
          <ValidationCheck
            key={`${label}_check`}
            label={label}
            variant={isValid ? "success" : "disable"}
          />
        ))}
      </div>
    </div>
  )
}

export default InputWithValidation
