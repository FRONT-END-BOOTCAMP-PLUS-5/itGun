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
          <div
            key={dialog.id}
            className="fixed inset-0 z-100"
            onClick={() => dismissDialog(dialog.id)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Dialog
                variant={dialog.variant}
                message={dialog.message}
                buttons={buttonsWithDismiss}
              />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default DialogContainer
