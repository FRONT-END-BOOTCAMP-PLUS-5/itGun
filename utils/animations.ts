import gsap from "gsap"

export const blink = (className: string) => {
  const timeline = gsap.timeline({ repeat: -1 })
  timeline.to(`#${className}`, {
    scaleY: 0,
    transformOrigin: "0% 50%",
    duration: 0.8,
  })
  timeline.to(`#${className}`, {
    scaleY: 1,
    transformOrigin: "0% 50%",
    duration: 0.8,
  })
}

export const wave = (
  id: string,
  repeat: number = -1,
  angle?: number,
  z?: number
) => {
  gsap.from(`#${id}`, {
    rotation: "+=120",
    duration: 1,
    transformOrigin: "top center",
  })
  const timeline = gsap.timeline({ repeat: repeat })
  timeline.to(`#${id}`, {
    rotation: angle ? `+=${angle}` : "+=20",
    transformOrigin: "right top",
    duration: 0.5,
    zIndex: z ? z : 10,
  })
  timeline.to(`#${id}`, {
    rotation: angle ? `-=${angle}` : "-=20",
    transformOrigin: "right top",
    duration: 0.5,
    zIndex: z ? z : 10,
  })

  if (repeat !== -1) {
    gsap.to(`#${id}`, {
      rotation: "-=105",
      duration: 1,
      transformOrigin: "top center",
      delay: 3,
    })
  }
}

export const armsShake = (
  left: string,
  right: string,
  angle?: number,
  z?: number
) => {
  wave(left, -1, angle ? angle : 40, z)
  wave(right, -1, angle ? angle : 40, z)
}

export const dumbbellShake = (id: string, angle?: number, z?: number) => {
  const origin = 23
  gsap.from(`#${id}`, {
    rotation: "+=120",
    duration: 1,
    transformOrigin: `center -${origin}px`,
    zIndex: z ? z : 10,
  })
  const timeline = gsap.timeline({ repeat: -1 })
  timeline.to(`#${id}`, {
    rotation: angle ? `+=${angle}` : "+=20",
    transformOrigin: `center -${origin}px`,
    duration: 0.5,
    zIndex: z ? z : 10,
  })
  timeline.to(`#${id}`, {
    rotation: angle ? `-=${angle}` : "-=20",
    transformOrigin: `center -${origin}px`,
    duration: 0.5,
    zIndex: z ? z : 10,
  })
}

export const dumbbellCurl = (armlevel: number = 0, angle: number = 40) => {
  armsShake(
    `left-under-arm-${armlevel}`,
    `right-under-arm-${armlevel}`,
    angle,
    200
  )
  dumbbellShake(`dumbbel-left`, angle)
  dumbbellShake(`dumbbel-right`, angle)
  sweat("sweat")
}

export const sweat = (id: string) => {
  let timeline = gsap.timeline({ repeat: -1 })
  timeline.to(`#${id}`, { y: "+=4", duration: 0.6 })
  timeline.to(`#${id}`, { y: "-=4", duration: 0.6 })
}

export const moveByRingPath = <T>(array: T[]) => {
  const timeline = gsap.timeline()

  array.forEach((item, index) =>
    timeline.to(`#badge-${index}`, {
      duration: 0.6 - index * 0.05,
      opacity: 1,
      ease: "power1.inOut",
      motionPath: {
        path: "#path",
        align: "#path",
        autoRotate: false,
        alignOrigin: [0.5, 0.5],
        start: 0,
        end: 1 - (1 / (array.length + 1)) * (1 + index),
      },
    })
  )
}

export const bounce = <T>(array: T[]) => {
  array.forEach((item, index) => {
    console.log(item)
    gsap
      .fromTo(
        `#${item}`,
        { y: "+=5" },
        { duration: 1.2, y: "-=5", ease: "bounce" }
      )
      .repeat(-1)
  })
}
