import type { Meta, StoryObj } from "@storybook/nextjs"
import Toast from "./Toast"

const meta: Meta<typeof Toast> = {
  title: "Components/Molecules/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    message: { control: "text" },
    variant: {
      control: {
        type: "radio",
        options: [
          "secondary-pink",
          "secondary-blue",
          "error",
          "info",
          "success",
        ],
      },
    },
    position: {
      control: "select",
      options: ["top", "bottom"],
    },
    duration: { control: "number" },
  },
}

export default meta
type Story = StoryObj<typeof Toast>

export const TopSuccess: Story = {
  args: {
    message: "This is a success message!",
    variant: "success",
    position: "top",
  },
}

export const BottomError: Story = {
  args: {
    message: "This is an error message!",
    variant: "error",
    position: "bottom",
  },
}
