import React, { useEffect, useState } from "react"
import "../../../styles/globals.css"
import { ToastProps } from "./Toast.types"
import { S1 } from "../../atoms/text/TextWrapper"
import { toastVariants } from "@/ds/styles/tokens/toast/variants"

const Toast: React.FC<ToastProps> = ({
  message,
  variant = "secondary-blue",
  position = "bottom",
  duration = 1500,
  onDismiss,
}) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  useEffect(() => {
    if (!visible) {
      const timer = setTimeout(() => {
        onDismiss()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [visible, onDismiss])

  const baseClasses = [
    "cursor-default",
    "fixed",
    "left-1/2",
    "-translate-x-1/2",
    "w-98",
    "px-6",
    "py-4",
    "z-200",
    "text-center",
    "shadow-md",
    "transition-all",
    "duration-300",
    "ease-in-out",
    toastVariants[variant].bg,
    position === "top" ? "top-10" : "bottom-10",
  ]
    .join(" ")
    .trim()

  const animationClasses = visible
    ? "opacity-100 translate-y-0"
    : `opacity-0 ${position === "top" ? "-translate-y-full" : "translate-y-full"}`

  return (
    <div className={`${baseClasses} ${animationClasses}`}>
      <S1 className={`${toastVariants[variant].text} whitespace-pre-line`}>
        {message}
      </S1>
    </div>
  )
}

export default Toast
