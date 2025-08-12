import type { Meta, StoryObj } from "@storybook/nextjs"
import Icon from "./Icon"

const meta = {
  title: "Components/Atoms/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
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
      ],
    },
    size: {
      control: {
        type: "range",
        min: 16,
        max: 80,
      },
    },
    color: {
      control: "color",
    },
    fillColor: {
      control: "color",
    },
    strokeWidth: {
      control: {
        type: "range",
        min: 1,
        max: 3,
      },
    },
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const SvgIcon: Story = {
  args: {
    name: "leftArrow",
    size: 24,
    color: "#000000",
  },
}
