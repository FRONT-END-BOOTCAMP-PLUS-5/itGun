import type { Meta, StoryObj } from "@storybook/nextjs"
import Dialog from "./Dialog"

const meta = {
  title: "Components/Molecules/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    message: {
      control: "text",
    },
    variant: {
      control: "select",
      options: ["primary", "error"],
    },
    buttons: {
      control: false,
    },
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof Dialog>

export const PrimaryDialog: Story = {
  render: (args) => (
    <div className="box-border w-sm px-7">
      <Dialog {...args} />
    </div>
  ),
  args: {
    message: "저장되었습니다.",
    variant: "primary",
    buttons: [
      {
        text: "확인",
        onClick: () => {},
      },
    ],
  },
}

export const ErrorDialog: Story = {
  render: (args) => (
    <div className="box-border w-sm px-7">
      <Dialog {...args} />
    </div>
  ),
  args: {
    message: "정말 운동 기록을 삭제하시겠습니까?",
    variant: "error",
    buttons: [
      {
        text: "네",
        onClick: () => {},
      },
      {
        text: "아니오",
        onClick: () => {},
      },
    ],
  },
}
