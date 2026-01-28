export const emailErrorRules = [
  {
    when: (value: string) => value.trim() === "",
    message: "이메일을 입력해주세요",
  },
  {
    when: (value: string) =>
      value.length > 0 &&
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
    message: "올바른 이메일 형식이 아닙니다",
  },
]

export const passwordValidations = [
  {
    label: "영문포함",
    validate: (value: string) => /[a-zA-Z]/.test(value),
  },
  {
    label: "숫자포함",
    validate: (value: string) => /[0-9]/.test(value),
  },
  {
    label: "8자~20자",
    validate: (value: string) => value.length >= 8 && value.length <= 20,
  },
]

export const nicknameValidations = [
  {
    label: "20자 이하",
    validate: (value: string) => value.length >= 1 && value.length <= 20,
  },
  {
    label: "특수문자 제외",
    validate: (value: string) =>
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(value),
  },
]
