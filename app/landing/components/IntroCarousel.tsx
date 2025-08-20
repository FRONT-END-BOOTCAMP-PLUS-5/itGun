import { Card } from "@/ds/components/atoms/card/Card"
import { Carousel } from "@/ds/components/molecules/carousel/Carousel"
import mainImage from "@/static/images/main.png"

const IntroCarousel = () => {
  const imageSet: { src: string; alt?: string }[] = [
    {
      src: mainImage.src,
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
