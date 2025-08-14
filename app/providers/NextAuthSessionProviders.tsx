"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

interface ProvidersProps {
  children: React.ReactNode
  session: Session | null
}

export default function NextAuthSessionProviders({
  children,
  session,
}: ProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
