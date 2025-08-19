import React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"
import ProgressBar from "./ProgressBar"
import type { ProgressBarProps } from "./ProgressBar.types"

const meta: Meta<typeof ProgressBar> = {
  title: "Components/Molecules/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
}
export default meta

type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: {
    max: 5,
    value: 1,
    steps: 10,
    label: "Progress",
    showCounter: true,
  },
}

export const HalfFilled: Story = {
  args: {
    max: 5,
    value: 3,
    steps: 10,
    label: "Progress",
    showCounter: true,
  },
}

export const FullFilled: Story = {
  args: {
    max: 5,
    value: 5,
    steps: 10,
    label: "Progress",
    showCounter: true,
  },
}

export const CustomColors: Story = {
  args: {
    max: 5,
    value: 2,
    steps: 10,
    label: "Progress",
    showCounter: true,
    variant: {
      fillColor: "#6B617A",
      borderColor: "#6B617A",
    },
  },
}

export const DenseSteps: Story = {
  args: {
    max: 5,
    steps: 20,
    value: 4,
    label: "Progress",
    showCounter: true,
  },
}

export const SecondaryPurple: Story = {
  args: {
    max: 5,
    value: 3,
    steps: 10,
    label: "Progress",
    showCounter: true,
    variant: "secondary-purple",
  },
}

export const SecondaryPink: Story = {
  args: {
    max: 5,
    value: 4,
    steps: 10,
    label: "Progress",
    showCounter: true,
    variant: "secondary-pink",
  },
}

export const SecondaryBlue: Story = {
  args: {
    max: 5,
    value: 2,
    steps: 10,
    label: "Progress",
    showCounter: true,
    variant: "secondary-blue",
  },
}

export const Accent: Story = {
  args: {
    max: 5,
    value: 5,
    steps: 10,
    label: "Progress",
    showCounter: true,
    variant: "accent",
  },
}

export const Success: Story = {
  args: {
    max: 5,
    value: 4,
    steps: 10,
    label: "Progress",
    showCounter: true,
    variant: "success",
  },
}

export const Info: Story = {
  args: {
    max: 5,
    value: 3,
    steps: 10,
    label: "Progress",
    showCounter: true,
    variant: "info",
  },
}
