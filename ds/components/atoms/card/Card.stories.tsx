import { Meta, StoryObj } from "@storybook/nextjs"
import { Card } from "./Card"

const meta: Meta<typeof Card> = {
  title: "Components/Atoms/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div className="h-96 w-96">
      <Card {...args} />
    </div>
  ),
  args: {
    imageSrc: "https://picsum.photos/300/300",
    imageAlt: "Sample image",
  },
}
