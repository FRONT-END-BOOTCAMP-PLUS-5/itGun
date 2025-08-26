interface MainCharacterProps {
  isAnimation?: boolean
  isShadow?: boolean
  date?: string // yymmdd
  decorations?: CharacterAsset[]
}

interface CharacterAsset {
  type: string
  level: number
  svg: string
  characterId?: number
  id?: number
}
