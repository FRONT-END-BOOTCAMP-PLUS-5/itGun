import type { Meta, StoryObj } from "@storybook/nextjs"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Components/Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    children: "Primary Button",
    size: "md",
    variant: "primary",
  },
}

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    size: "md",
    variant: "secondary",
  },
}

export const Outline: Story = {
  args: {
    children: "Outline Button",
    size: "md",
    variant: "outline",
  },
}

export const Underline: Story = {
  args: {
    children: "Underline Button",
    size: "xs",
    variant: "underline",
  },
}

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    size: "md",
    variant: "ghost",
  },
}

export const Disable: Story = {
  args: {
    children: "Disable Button",
    size: "md",
    variant: "disable",
  },
}

export const FullWidth: Story = {
  args: {
    children: "Full Width Button",
    size: "md",
    variant: "primary",
    isFullWidth: true,
  },
}
