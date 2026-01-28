import { Input } from "../../atoms/input/Input"
import ValidationCheck from "../../atoms/validationCheck/ValidationCheck"
import { InputWithValidationProps } from "./InputWithValidationProps.types"

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
    <>
      <Input
        name={name}
        type={type}
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
            isValid={isValid}
            label={label}
          />
        ))}
      </div>
    </>
  )
}

export default InputWithValidation
