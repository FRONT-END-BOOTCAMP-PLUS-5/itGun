import React, { useState } from "react"
import Dropdown, { DropdownOption, DropdownProps } from "./Dropdown"

import type { Meta, StoryObj } from "@storybook/nextjs"

const options: DropdownOption[] = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "30", value: 30 },
  { label: "40", value: 40 },
]

const meta: Meta<typeof Dropdown> = {
  title: "Molecules/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | number>(30)
    return <Dropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options,
    placeholder: "선택하세요",
    size: "md",
    variant: "default",
  },
}

export const Disabled: Story = {
  render: (args: DropdownProps) => <Dropdown {...args} disabled />,
  args: {
    options,
    placeholder: "비활성화",
    size: "md",
    variant: "default",
  },
}

export const WithPlaceholder: Story = {
  render: (args: DropdownProps) => {
    const [value, setValue] = useState<string | number | undefined>()
    return <Dropdown {...args} value={value} onChange={setValue} />
  },
  args: {
    options,
    placeholder: "값을 선택하세요",
    size: "md",
    variant: "default",
  },
}
