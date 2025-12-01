export interface TitleProps {
  title: string
  subTitle?: string | undefined
}

export interface CharacterDownloadButtonProps {
  userNickName?: string
  className?: string
}

export interface MainCharacterProps {
  isAnimation?: boolean
  isShadow?: boolean
  date?: string // yymmdd
  decorations?: CharacterAsset[]
}

export interface CharacterAsset {
  type: string
  level: number
  svg: string
  characterId?: number
  id?: number
}
