import type { Meta, StoryObj } from "@storybook/nextjs"
import Text from "./Text"
import { B1, B2, C1, C2, Display, H1, H2, S1, S2 } from "./TextWrapper"

const meta = {
  title: "Components/Atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof Text>

export const Default: Story = {
  render: (args) => <Text {...args} />,
  args: {
    children: "Text",
    variant: "primary",
  },
}

// Display
export const DisplayText: Story = {
  render: (args) => <Display {...args} />,
  args: {
    children: "Display Text",
    variant: "primary",
  },
}

// Headline1
export const Headline1Text: Story = {
  render: (args) => <H1 {...args} />,
  args: {
    children: "Headline1 Text",
    variant: "primary",
  },
}

// Headline2
export const Headline2Text: Story = {
  render: (args) => <H2 {...args} />,
  args: {
    children: "Headline2 Text",
    variant: "primary",
  },
}

// Subtitle1
export const Subtitle1Text: Story = {
  render: (args) => <S1 {...args} />,
  args: {
    children: "Subtitle1 Text",
    variant: "primary",
  },
}

// Subtitle2
export const Subtitle2Text: Story = {
  render: (args) => <S2 {...args} />,
  args: {
    children: "Subtitle2 Text",
    variant: "primary",
  },
}

// Body1
export const Body1Text: Story = {
  render: (args) => <B1 {...args} />,
  args: {
    children: "Body1 Text",
    variant: "primary",
  },
}

// Body2
export const Body2Text: Story = {
  render: (args) => <B2 {...args} />,
  args: {
    children: "Body2 Text",
    variant: "primary",
  },
}

// Caption1
export const Caption1Text: Story = {
  render: (args) => <C1 {...args} />,
  args: {
    children: "Caption1 Text",
    variant: "primary",
  },
}

// Caption2
export const Caption2Text: Story = {
  render: (args) => <C2 {...args} />,
  args: {
    children: "Caption2 Text",
    variant: "primary",
  },
}
