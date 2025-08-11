import type { Meta, StoryObj } from "@storybook/nextjs"

import { fn } from "storybook/test"
import Text from "./Text"

const meta = {
  title: "Components/Atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: fn(),
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof Text>

export const Title: Story = {
  render: (args) => <Text {...args} />,
  args: {
    children: "Title Text",
  },
}
