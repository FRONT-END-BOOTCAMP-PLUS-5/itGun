export interface ProfileEditProps {
  onBack: () => void
}

export interface DropdownOption {
  label: string
  value: string
}

export interface GenderOption extends DropdownOption {
  value: "male" | "female"
}

export interface AgeOption extends DropdownOption {
  value: "10s" | "20s" | "30s" | "40s"
}
