import InputWithValidation from "@/ds/components/molecules/inputWithValidation/InputWithValidation"
import { PasswordInputGroupProps } from "@/ds/components/organisms/passwordInputGroup/PasswordInputGroupProps.types"

const PasswordInputGroup = ({
  password,
  passwordConfirm,
  className,
}: PasswordInputGroupProps) => {
  const combinedClassName = `flex flex-1 flex-col ${className}`.trim()

  return (
    <div className={combinedClassName}>
      <InputWithValidation
        validations={password.validations}
        name={password?.name}
        type={password?.type}
        value={password.value}
        onChange={password.onChange}
        isFullWidth={password?.isFullWidth}
        placeholder={password?.placeholder}
        readOnly={password?.readOnly}
        className={password?.className}
      />
      <InputWithValidation
        validations={passwordConfirm.validations}
        name={passwordConfirm?.name}
        type={passwordConfirm?.type}
        value={passwordConfirm.value}
        onChange={passwordConfirm.onChange}
        isFullWidth={passwordConfirm?.isFullWidth}
        placeholder={passwordConfirm?.placeholder}
        readOnly={passwordConfirm?.readOnly}
        className={passwordConfirm?.className}
      />
    </div>
  )
}

export default PasswordInputGroup
