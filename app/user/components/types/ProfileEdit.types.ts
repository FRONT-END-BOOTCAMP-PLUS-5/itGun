export interface ProfileEditProps {
  // 현재는 props가 필요하지 않음
}

export interface DropdownOption {
  label: string
  value: string
}

export interface GenderOption extends DropdownOption {
  value: string
}
