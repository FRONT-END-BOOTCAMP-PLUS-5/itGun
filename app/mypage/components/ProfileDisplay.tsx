import React from "react"
import Icon from "@/ds/components/atoms/icon/Icon"

interface ProfileDisplayProps {
  onEditClick?: () => void
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ onEditClick }) => {
  return (
    <div className="mx-auto max-w-md space-y-10 p-6">
      <div className="space-y-10">
        <div className="flex h-10 w-full items-center border-b border-gray-300">
          <span className="text-[var(--color-secondary)]">근욱 멋사</span>
        </div>
        <div className="flex h-10 w-full items-center border-b border-gray-300">
          <span className="text-[var(--color-secondary)]">186 cm</span>
        </div>
        <div className="flex h-10 w-full items-center border-b border-gray-300">
          <span className="text-[var(--color-secondary)]">87 kg</span>
        </div>
        <div className="flex h-10 w-full items-center border-b border-gray-300">
          <span className="text-[var(--color-secondary)]">30</span>
        </div>
        <div className="flex h-10 w-full items-center border-b border-gray-300">
          <span className="text-[var(--color-secondary)]">남</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileDisplay
