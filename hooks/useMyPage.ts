import { useState } from "react"

export const useMyPage = () => {
  const [isEditMode, setIsEditMode] = useState(false)

  const handleEditClick = () => {
    setIsEditMode(true)
  }

  const handleBackClick = () => {
    setIsEditMode(false)
  }

  return {
    isEditMode,
    handleEditClick,
    handleBackClick,
  }
}
