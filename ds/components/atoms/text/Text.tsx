import React from "react"
import "../../../styles/globals.css"

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode
}

const Text: React.FC<TextProps> = ({ children, ...props }) => {
  return <h1 {...props}>{children}</h1>
}

export default Text
