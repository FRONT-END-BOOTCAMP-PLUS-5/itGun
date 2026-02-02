import type { Meta, StoryObj } from "@storybook/nextjs"
import { Input } from "./Input"

const meta: Meta<typeof Input> = {
  title: "Components/Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    isFullWidth: {
      control: "boolean",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
    },
  },
}
export default meta

type Story = StoryObj<typeof Input>

// 기본 예시
export const Default: Story = {
  args: {
    placeholder: "Enter text",
    size: "md",
  },
}

// 모든 사이즈
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Input {...args} size="xs" placeholder="XS size" />
      <Input {...args} size="sm" placeholder="SM size" />
      <Input {...args} size="md" placeholder="MD size" />
      <Input {...args} size="lg" placeholder="LG size" />
      <Input {...args} size="xl" placeholder="XL size" />
    </div>
  ),
  args: {
    placeholder: "Enter text",
  },
}
