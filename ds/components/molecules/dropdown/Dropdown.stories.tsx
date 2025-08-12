import React, { useState } from "react"
import Dropdown from "./Dropdown"
import type { DropdownOption, DropdownProps } from "./Dropdown.types"

import type { Meta, StoryObj } from "@storybook/nextjs"

const meta: Meta<typeof Dropdown> = {
  title: "Molecules/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof Dropdown>

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i)

const heightOptions: DropdownOption[] = range(140, 200).map((n) => ({
  label: `${n}cm`,
  value: n,
}))

const weightOptions: DropdownOption[] = range(40, 120).map((n) => ({
  label: `${n}kg`,
  value: n,
}))

const ageOptions: DropdownOption[] = range(10, 100).map((n) => ({
  label: `${n}세`,
  value: n,
}))

const genderOptions: DropdownOption[] = [
  { label: "남", value: "male" },
  { label: "여", value: "female" },
]

export const HeightDropdown: Story = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | number | undefined>()
    return <Dropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options: heightOptions,
    placeholder: "키를 선택하세요",
    size: "md",
    variant: "default",
  },
}

export const WeightDropdown: Story = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | number | undefined>()
    return <Dropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options: weightOptions,
    placeholder: "몸무게를 선택하세요",
    size: "md",
    variant: "default",
  },
}

export const AgeDropdown: Story = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | number | undefined>()
    return <Dropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options: ageOptions,
    placeholder: "나이를 선택하세요",
    size: "md",
    variant: "default",
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
    variant: "default",
  },
}
