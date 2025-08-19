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

// Validation 예시
export const WithValidation: Story = {
  args: {
    placeholder: "Password",
    type: "password",
    validations: [
      { label: "8자 이상", validate: (v: string) => v.length >= 8 },
      { label: "숫자 포함", validate: (v: string) => /\d/.test(v) },
      { label: "특수문자 포함", validate: (v: string) => /[!@#$%^&*]/.test(v) },
    ],
  },
}

// 에러 메시지 예시
export const WithError: Story = {
  args: {
    placeholder: "Email",
    type: "email",
    errorRules: [
      {
        when: (v) => v.length > 0 && v.length < 4,
        message: "4글자 이상 입력해주세요",
      },
      { when: (v) => /\s/.test(v), message: "공백은 사용할 수 없습니다" },
    ],
  },
}
