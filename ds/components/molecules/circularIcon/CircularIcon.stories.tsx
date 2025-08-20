import type { Meta, StoryObj } from "@storybook/nextjs"
import CircularIcon from "./CircularIcon"

const meta: Meta<typeof CircularIcon> = {
  title: "Components/Molecules/CircularIcon",
  component: CircularIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    iconName: {
      control: {
        type: "select",
      },
      options: [
        "setting",
        "rightArrow",
        "leftArrow",
        "remove",
        "save",
        "hearts",
        "plusHearts",
        "plus",
        "calendar",
        "clock",
        "bin",
        "menu",
        "medal",
        "trophy",
        "paper",
        "gauge",
        "leg",
        "arm",
        "check",
      ],
    },
    iconSize: {
      control: {
        type: "range",
        min: 16,
        max: 50,
      },
    },
    variant: {
      control: {
        type: "select",
      },
      options: [
        "primary",
        "secondary",
        "secondary-purple",
        "secondary-pink",
        "secondary-blue",
        "secondary-yellow",
        "disable",
        "error",
        "accent",
        "success",
        "info",
        "outline",
        "ghost",
      ],
    },
    iconColor: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "secondary-purple",
        "secondary-pink",
        "secondary-blue",
        "secondary-yellow",
        "white-100",
        "white-200",
        "disable",
        "error",
        "accent",
        "success",
        "info",
        "#f3f3f3",
      ],
    },
    iconFilledColor: {
      control: "text",
    },
  },
}

export default meta
type Story = StoryObj<typeof CircularIcon>

export const Primary: Story = {
  args: {
    iconName: "trophy",
    iconSize: 24,
    iconColor: "secondary",
    variant: "primary",
    iconFilledColor: "secondary-pink",
  },
}

export const SecondaryPink: Story = {
  args: {
    iconName: "calendar",
    iconSize: 24,
    variant: "secondary-pink",
    iconFilledColor: "accent",
  },
}

export const Outline: Story = {
  args: {
    iconName: "remove",
    iconSize: 24,
    variant: "outline",
    iconFilledColor: "success",
  },
}
