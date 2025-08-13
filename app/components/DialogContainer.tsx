"use client"

import React from "react"
import { useDialogStore } from "@/hooks/useDialogStore"
import Dialog from "@/ds/components/molecules/dialog/Dialog"

const DialogContainer = () => {
  const { dialogs, dismissDialog } = useDialogStore()

  return (
    <>
      {dialogs.map((dialog) => {
        const buttonsWithDismiss = dialog.buttons?.map((button) => ({
          ...button,
          onClick: () => {
            button.onClick?.()
            dismissDialog(dialog.id)
          },
        }))

        return (
          <Dialog
            key={dialog.id}
            variant={dialog.variant}
            message={dialog.message}
            buttons={buttonsWithDismiss}
          />
        )
      })}
    </>
  )
}

export default DialogContainer
