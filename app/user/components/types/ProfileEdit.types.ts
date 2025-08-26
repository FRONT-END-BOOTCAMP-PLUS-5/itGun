// 현재는 props가 필요하지 않으므로 Record<never, never> 사용
export type ProfileEditProps = Record<never, never>

export interface DropdownOption {
  label: string
  value: string
}

export interface GenderOption extends DropdownOption {
  value: string
}
