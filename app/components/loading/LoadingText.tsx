"use client"
import { H1 } from "@/ds/components/atoms/text/TextWrapper"
import { loadingDots } from "@/utils/animations"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const LoadingText = ({ text }: { text: string }) => {
  gsap.registerPlugin(useGSAP)
  useGSAP(() => {
    loadingDots(["dot-0", "dot-1", "dot-2"])
  })

  return (
    <div className="flex">
      <H1>{text}</H1>
      <H1 id="dot-0" className="opacity-0">
        .
      </H1>
      <H1 id="dot-1" className="opacity-0">
        .
      </H1>
      <H1 id="dot-2" className="opacity-0">
        .
      </H1>
    </div>
  )
}

export default LoadingText
