import type { Meta, StoryObj } from "@storybook/nextjs"
import { Header } from "./Header"

const meta: Meta<typeof Header> = {
  title: "Components/Molecules/Header",
  component: Header,
  tags: ["autodocs"],
  args: {
    showBackButton: true,
  },
  argTypes: {
    onBack: { action: "뒤로 가" },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const BackButtonOnly: Story = {
  args: {
    showBackButton: true,
  },
}
