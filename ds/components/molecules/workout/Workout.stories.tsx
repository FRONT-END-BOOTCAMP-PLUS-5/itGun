import type { Meta, StoryObj } from "@storybook/nextjs"
import Workout from "@/ds/components/molecules/workout/Workout"
import { Input } from "@/ds/components/atoms/input/Input"
import Text from "@/ds/components/atoms/text/Text"

const meta: Meta<typeof Workout> = {
  title: "Components/Molecules/Workout",
  component: Workout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
    isFullWidth: {
      control: { type: "boolean" },
    },
  },
}

export default meta
type Story = StoryObj<typeof Workout>

export const WithInputs: Story = {
  args: {
    variant: "primary",
    title: "벤치프레스",
  },
  render: (args) => (
    <Workout {...args}>
      <div className="grid grid-cols-3 gap-4">
        <Text size="text-sm" className="text-center">세트</Text>
        <Text size="text-sm" className="text-center">kg</Text>
        <Text size="text-sm" className="text-center">회</Text>
        <Input size="xs" placeholder="1" />
        <Input size="xs" placeholder="80" />
        <Input size="xs" placeholder="10" />
        <Input size="xs" placeholder="2" />
        <Input size="xs" placeholder="85" />
        <Input size="xs" placeholder="8" />
      </div>
    </Workout>
  ),
}

export const WithText: Story = {
  args: {
    variant: "primary",
    title: "벤치프레스",
  },
  render: (args) => (
    <Workout {...args}>
      <div className="grid grid-cols-3 gap-4">
        <Text size="text-sm" className="text-center">세트</Text>
        <Text size="text-sm" className="text-center">kg</Text>
        <Text size="text-sm" className="text-center">회</Text>
        <Text size="text-sm" className="text-center">1</Text>
        <Text size="text-sm" className="text-center">80</Text>
        <Text size="text-sm" className="text-center">10</Text>
        <Text size="text-sm" className="text-center">2</Text>
        <Text size="text-sm" className="text-center">85</Text>
        <Text size="text-sm" className="text-center">8</Text>
      </div>
    </Workout>
  ),
}

export const RunningWorkout: Story = {
  args: {
    variant: "secondary",
    title: "러닝",
  },
  render: (args) => (
    <Workout {...args}>
      <div className="grid grid-cols-3 gap-4">
        <Text size="text-sm" className="text-center">세트</Text>
        <Text size="text-sm" className="text-center">km</Text>
        <Text size="text-sm" className="text-center">시간</Text>
        <Input size="sm" placeholder="1" />
        <Input size="sm" placeholder="5.2" />
        <Input size="sm" placeholder="25:30" />
      </div>
    </Workout>
  ),
}
