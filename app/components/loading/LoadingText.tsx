"use client"
import { H1 } from "@/ds/components/atoms/text/TextWrapper"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const LoadingText = () => {
  gsap.registerPlugin(useGSAP)
  useGSAP(() => {
    const timeline = gsap.timeline({ repeat: -1 })
    timeline.to("#dot-0", {
      opacity: 1,
      duration: 0.3,
    })
    timeline.to("#dot-1", {
      opacity: 1,
      duration: 0.3,
    })
    timeline.to("#dot-2", {
      opacity: 1,
      duration: 0.3,
    })
  })

  return (
    <div className="flex">
      <H1>Loading</H1>
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
