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
      id="modal-container"
      onClick={closeModal}
    >
      <div
        className="scrollbar-none absolute bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2 transform overflow-y-scroll px-5 py-0"
        onClick={(e) => e.stopPropagation()}
      >
        {currentModal}
        <Button
          variant="ghost"
          size="xs"
          className="absolute top-0 right-5"
          onClick={closeModal}
        >
          <Icon name="remove" size={24} fillColor="primary" />
        </Button>
      </div>
    </div>
  )
}

export default ModalContainer
