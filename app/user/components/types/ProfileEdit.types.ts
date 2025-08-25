export interface ProfileEditProps {
  onBack: () => void
}

export interface DropdownOption {
  label: string
  value: string
}

export interface GenderOption extends DropdownOption {
  value: string
}

export interface AgeOption extends DropdownOption {
  value: string
}
