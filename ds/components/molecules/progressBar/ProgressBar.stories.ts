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

const defaultArgs: ProgressBarProps = {
  max: 5,
  value: 1,
  steps: 10,
  variant: {
    fillColor: "#3D2C4B",
    borderColor: "#3D2C4B",
  },
}

export const Default: Story = {
  args: defaultArgs,
}

export const HalfFilled: Story = {
  args: {
    ...defaultArgs,
    value: 3,
  },
}

export const FullFilled: Story = {
  args: {
    ...defaultArgs,
    value: 5,
  },
}

export const CustomColors: Story = {
  args: {
    ...defaultArgs,
    value: 2,
    variant: {
      fillColor: "#6B617A",
      borderColor: "#6B617A",
    },
  },
}

export const DenseSteps: Story = {
  args: {
    ...defaultArgs,
    steps: 20,
    value: 4,
  },
}
