import { Card } from "@/ds/components/atoms/card/Card"
import { Carousel } from "@/ds/components/molecules/carousel/Carousel"
import itgun1 from "@/static/images/itgun1.png"
import itgun2 from "@/static/images/itgun2.png"
import itgun3 from "@/static/images/itgun3.png"
import itgun4 from "@/static/images/itgun4.png"
import itgun5 from "@/static/images/itgun5.png"

const IntroCarousel = () => {
  const imageSet: { src: string; alt?: string }[] = [
    {
      src: itgun1.src,
      alt: "메인 페이지 설명 이미지",
    },
    {
      src: itgun2.src,
      alt: "메인 페이지 설명 이미지",
    },
    {
      src: itgun3.src,
      alt: "메인 페이지 설명 이미지",
    },
    {
      src: itgun4.src,
      alt: "메인 페이지 설명 이미지",
    },
    {
      src: itgun5.src,
      alt: "메인 페이지 설명 이미지",
    },
  ]
  return (
    <div className="w-screen max-w-[430px]">
      <Carousel autoSlideDelay={2000}>
        {imageSet.map((image) => (
          <Card key={`${image.alt}`} imageSrc={image.src} />
        ))}
      </Carousel>
    </div>
  )
}

export default IntroCarousel
