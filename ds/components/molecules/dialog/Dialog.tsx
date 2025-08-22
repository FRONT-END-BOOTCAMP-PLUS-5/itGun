import { Button } from "../../atoms/button/Button"
import { S1 } from "../../atoms/text/TextWrapper"
import { DialogProps } from "./Dialog.types"
import { dialogVariants } from "@/ds/styles/tokens/dialog/variants"

const Dialog: React.FC<DialogProps> = ({ message, variant, buttons }) => {
  const baseClasses = [
    "cursor-default",
    "fixed",
    "left-1/2",
    "-translate-x-1/2",
    "bottom-10",
    "w-90",
    "px-6",
    "py-6",
    "z-100",
    "shadow-md",
    dialogVariants[variant].bg,
    "flex",
    "flex-col",
    "text-center",
    "content-center",
    "animate-slide-up",
  ]
    .join(" ")
    .trim()

  return (
    <div className={baseClasses}>
      <S1 className={`${dialogVariants[variant].text} whitespace-pre-line`}>
        {message}
      </S1>
      <div className="mt-4 flex justify-center gap-x-2">
        {buttons &&
          buttons.length > 0 &&
          buttons.map((button) => (
            <Button
              size="sm"
              variant={dialogVariants[variant].buttons}
              onClick={button.onClick}
              key={`dialog-button-${button.text}`}
            >
              {button.text}
            </Button>
          ))}
      </div>
    </div>
  )
}

export default Dialog
