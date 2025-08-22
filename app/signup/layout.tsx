import { ReactNode } from "react"
import { SignupProvider } from "./context/SignupContext"

export default function SignupLayout({ children }: { children: ReactNode }) {
  return <SignupProvider>{children}</SignupProvider>
}
