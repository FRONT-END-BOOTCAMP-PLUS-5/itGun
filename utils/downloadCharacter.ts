import { useCharacterStore } from "@/hooks/useCharacterStore"
import { CharacterAsset } from "@/ds/components/atoms/character/Character.types"

const makeSvgString = (assets: CharacterAsset[], color: string): string => {
  const characterParts = assets
    .map((asset) => asset.svg)
    .join("")
    .replace(/<>[,\s]*|<\/>/g, "")
    .replace(/([a-z])([A-Z])/g, (match, p1, p2) => `${p1}-${p2.toLowerCase()}`)
    .replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/g, "")

  const viewBox = "0 0 280 330"

  const svgData = `<svg
    width="280"
    height="330"
    viewBox="${viewBox}"
    xmlns="http://www.w3.org/2000/svg"
    fill="${color}"
  >
    ${characterParts}
  </svg>`

  return svgData
}

export const downloadCharacterAsPNG = (
  svgData: string,
  fileName: string = "my-character"
): void => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    return
  }

  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
  const url = URL.createObjectURL(svgBlob)

  const img = new Image()
  img.onload = () => {
    const scale = 2
    const width = 280
    const height = 330
    canvas.width = width * scale
    canvas.height = height * scale

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

  img.onerror = () => {
    console.error(
      "Failed to load the SVG image. The SVG data is likely invalid."
    )
    console.error("Invalid SVG Data:", svgData)
  }

  img.src = url
}

export const downloadCurrentCharacter = (fileName?: string): void => {
  const { originalAssets, originalColor } = useCharacterStore.getState()

  if (!originalAssets.length || !originalColor) {
    console.error("Original character data not found in the store.")
    return
  }

  const svgData = makeSvgString(originalAssets, originalColor)

  const defaultFileName = `itgun-${new Date().getTime()}`
  downloadCharacterAsPNG(svgData, fileName || defaultFileName)
}
