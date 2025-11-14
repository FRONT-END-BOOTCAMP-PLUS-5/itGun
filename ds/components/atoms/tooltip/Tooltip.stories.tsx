import type { Meta, StoryObj } from "@storybook/nextjs"
import type { ComponentProps } from "react"
import Tooltip from "./Tooltip"
import { Button } from "../button/Button"

const meta: Meta<typeof Tooltip> = {
  title: "Design System/Atoms/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    variant: {
      control: "select",
      options: ["primary", "secondary-blue", "error", "success"],
    },
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    size: {
      control: "select",
      options: ["xs", "s", "m", "l"],
    },
  },
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Tooltip>

const StoryWrapper = (args: ComponentProps<typeof Tooltip>) => (
  <div className="relative">
    <Button>Target</Button>
    <Tooltip {...args} />
  </div>
)

export const Default: Story = {
  args: {
    label: "This is a tooltip",
    variant: "secondary-blue",
    position: "top",
    size: "md",
  },
  render: StoryWrapper,
}

export const Top: Story = {
  args: {
    ...Default.args,
    position: "top",
  },
  render: StoryWrapper,
}

export const Bottom: Story = {
  args: {
    ...Default.args,
    position: "bottom",
  },
  render: StoryWrapper,
}

export const Left: Story = {
  args: {
    ...Default.args,
    position: "left",
  },
  render: StoryWrapper,
}

export const Right: Story = {
  args: {
    ...Default.args,
    position: "right",
  },
  render: StoryWrapper,
}

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: "primary",
  },
  render: StoryWrapper,
}

export const Error: Story = {
  args: {
    ...Default.args,
    variant: "error",
  },
  render: StoryWrapper,
}

export const Small: Story = {
  args: {
    ...Default.args,
    size: "sm",
  },
  render: StoryWrapper,
}
