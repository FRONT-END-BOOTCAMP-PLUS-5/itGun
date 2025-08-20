export interface CharacterProps {
  assets: CharacterAsset[]
  characterColor?: string
  animation?: () => void
  width?: number
}

export interface CharacterAsset {
  type: string
  level: number
  svg: string
  characterId?: number
  id?: number
}
