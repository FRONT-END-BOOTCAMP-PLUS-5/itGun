/**
 * for password validation
 * usage:
 *    app/signup/[step]/components/Step2Form.tsx
 *    app/user/components/PasswordInput.tsx
 */

interface ValidationRuleLabel {
  label: string
  value: "alphabet" | "number" | "length" | "match"
}

export const PASSWORD_VALIDATION_LABELS: ValidationRuleLabel[] = [
  { label: "영문포함", value: "alphabet" },
  { label: "숫자포함", value: "number" },
  { label: "8자~20자", value: "length" },
]

export const PASSWORD_CONFIRM_VALIDATION_LABEL: ValidationRuleLabel[] = [
  { label: "비밀번호 일치", value: "match" },
]
