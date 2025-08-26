export const downloadCharacterAsPNG = (
  svgElement: SVGSVGElement,
  fileName: string = "my-character"
): void => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    return
  }

  const svgData = new XMLSerializer().serializeToString(svgElement)
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
  const url = URL.createObjectURL(svgBlob)

  const img = new Image()
  img.onload = () => {
    const scale = 2
    canvas.width = svgElement.viewBox.baseVal.width * scale
    canvas.height = svgElement.viewBox.baseVal.height * scale

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
      if (blob) {
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = `${fileName}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
      }
    }, "image/png")

    URL.revokeObjectURL(url)
  }

  img.src = url
}

export const downloadCurrentCharacter = (
  fileName?: string
): void => {
  const svgElement = document.querySelector("#character") as SVGSVGElement

  if (!svgElement) {
    return
  }

  const defaultFileName = `itgun-${new Date().getTime()}`

  downloadCharacterAsPNG(svgElement, fileName || defaultFileName)
}
