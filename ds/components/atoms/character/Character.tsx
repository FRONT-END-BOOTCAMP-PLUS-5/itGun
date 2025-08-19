"use client"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { CharacterProps } from "@/ds/components/atoms/character/Character.types"

const Character: React.FC<CharacterProps> = ({
  assets,
  characterColor = "#cba0df",
  animation,
  width = 50,
}) => {
  gsap.registerPlugin(useGSAP)
  const container = useRef(null)

  useGSAP(
    () => {
      if (animation) {
        animation()
      }
    },
    { scope: container, dependencies: [assets, animation] }
  )

  return (
    <div ref={container} className={`bg-white-200 container w-${width}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="character"
        viewBox="0 0 280 330"
        style={{
          fill: characterColor,
          strokeWidth: 2,
        }}
        dangerouslySetInnerHTML={{
          __html: assets.map((assets) => assets.svg).join(""),
        }}
      />
    </div>
  )
}

export default Character
