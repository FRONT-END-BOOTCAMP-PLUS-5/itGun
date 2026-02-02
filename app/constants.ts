/**
 * for password validation
 * usage:
 *    app/signup/[step]/components/Step2Form.tsx
 *    app/user/components/PasswordInput.tsx
 */

interface PasswordValidationRuleLabel {
  label: string
  value: "alphabet" | "number" | "length" | "match"
}

export const PASSWORD_VALIDATION_LABELS: PasswordValidationRuleLabel[] = [
  { label: "영문포함", value: "alphabet" },
  { label: "숫자포함", value: "number" },
  { label: "8자~20자", value: "length" },
]

export const PASSWORD_CONFIRM_VALIDATION_LABEL: PasswordValidationRuleLabel[] =
  [{ label: "비밀번호 일치", value: "match" }]

/**
 * for user info validation
 * usage:
 *    app/signup/[step]/components/Step3Form.tsx
 */

interface UserInfoValidationRuleLabel {
  label: string
  value: "simpleText" | "length"
}

export const USER_INFO_VALIDATION_LABELS: UserInfoValidationRuleLabel[] = [
  { label: "20자 이하", value: "length" },
  { label: "특수문자 제외", value: "simpleText" },
]
