import React, { useState } from "react"
import { Dropdown } from "./Dropdown"
import type { DropdownOption, DropdownProps } from "./Dropdown.types"
import type { Meta, StoryObj } from "@storybook/nextjs"

const meta: Meta<typeof Dropdown> = {
  title: "Components/Molecules/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof Dropdown>

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

// height/weight dropdown stories removed on request

const ageOptions: DropdownOption[] = [
  { label: "10-25세", value: "10-25" },
  { label: "26-40세", value: "26-40" },
  { label: "41-55세", value: "41-55" },
  { label: "56세 이상", value: "56+" },
]

const genderOptions: DropdownOption[] = [
  { label: "남", value: "male" },
  { label: "여", value: "female" },
]

const heightOptions: DropdownOption[] = [
  { label: "150cm 이하", value: "150-" },
  { label: "151-160cm", value: "151-160" },
  { label: "161-170cm", value: "161-170" },
  { label: "171cm 이상", value: "171+" },
]

// Height/Weight stories removed

export const AgeDropdown: Story = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | number | undefined>()
    return <Dropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options: ageOptions,
    placeholder: "나이를 선택하세요",
    size: "md",
  },
}

export const GenderDropdown: Story = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | number | undefined>()
    return <Dropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options: genderOptions,
    placeholder: "성별을 선택하세요",
    size: "md",
  },
}

export const HeightDropdown: Story = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | number | undefined>()
    return <Dropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options: heightOptions,
    placeholder: "키를 선택하세요",
    size: "md",
  },
}
