import gsap from "gsap"

export const blink = (className: string) => {
  const timeline = gsap.timeline({ repeat: -1 })
  timeline.to(`.${className}`, {
    scaleY: 0,
    transformOrigin: "0% 50%",
    duration: 0.8,
  })
  timeline.to(`.${className}`, {
    scaleY: 1,
    transformOrigin: "0% 50%",
    duration: 0.8,
  })
}

export const wave = (id: string, angle?: number, z?: number) => {
  gsap.from(`#${id}`, {
    rotation: "+=120",
    duration: 1,
    transformOrigin: "top center",
  })
  const timeline = gsap.timeline({ repeat: -1 })
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
}

export const armsShake = (
  left: string,
  right: string,
  angle?: number,
  z?: number
) => {
  wave(left, angle ? angle : 40, z)
  wave(right, angle ? angle : 40, z)
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

export const dumbbellCurl = (armlevel: number, angle: number = 40) => {
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
