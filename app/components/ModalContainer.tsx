"use client"
import { Button } from "@/ds/components/atoms/button/Button"
import Icon from "@/ds/components/atoms/icon/Icon"
import { useModalStore } from "@/hooks/useModalStore"
import React from "react"

const ModalContainer = () => {
  const { currentModal, closeModal } = useModalStore()

  if (!currentModal) return null

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      onClick={closeModal}
    >
      <div
        className="scrollbar-none bg-white-200 absolute h-screen max-w-[430px] overflow-y-scroll p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {currentModal}
        <Button
          variant="ghost"
          size="xs"
          className="absolute top-3 right-3"
          onClick={closeModal}
        >
          <Icon name="remove" size={24} fillColor="primary" />
        </Button>
      </div>
    </div>
  )
}

export default ModalContainer
