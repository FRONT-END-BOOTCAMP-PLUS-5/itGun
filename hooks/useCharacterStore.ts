import { create } from "zustand"
import { CharacterAsset } from "@/ds/components/atoms/character/Character.types"

interface CharacterStoreState {
  originalAssets: CharacterAsset[]
  originalColor: string
  setOriginalCharacter: (assets: CharacterAsset[], color: string) => void
}

export const useCharacterStore = create<CharacterStoreState>((set) => ({
  originalAssets: [],
  originalColor: "",
  setOriginalCharacter: (assets, color) =>
    set({
      originalAssets: assets,
      originalColor: color,
    }),
}))
