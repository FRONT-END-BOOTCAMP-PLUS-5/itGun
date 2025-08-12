import { TextVariant } from "../../../styles/tokens/text/textVariants"

export type FontWeight = "normal" | "bold"

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
  size?: string // Tailwind size override (예: "text-[20px]")
  fontWeight?: FontWeight // normal | bold
  variant?: TextVariant
  className?: string
}
