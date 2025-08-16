import { HTMLAttributes, ReactNode } from "react"

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode | ReactNode[]
  isIndicators?: boolean
}
