import { Meta, StoryObj } from "@storybook/nextjs"
import { Carousel } from "./Carousel"
import { Card } from "../../atoms/card/Card"

const meta: Meta<typeof Carousel> = {
  title: "Components/Molecules/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const items = [
      {
        id: 1,
        imageSrc: "https://picsum.photos/400/300?random=1",
        imageAlt: "이미지 1",
      },
      {
        id: 2,
        imageSrc: "https://picsum.photos/400/300?random=2",
        imageAlt: "이미지 2",
      },
      {
        id: 3,
        imageSrc: "https://picsum.photos/400/300?random=3",
        imageAlt: "이미지 3",
      },
    ]
    return (
      <div className="h-96 w-96">
        <Carousel autoSlideDelay={2000}>
          {items.map((item) => (
            <Card
              key={item.id}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
            />
          ))}
        </Carousel>
      </div>
    )
  },
}
