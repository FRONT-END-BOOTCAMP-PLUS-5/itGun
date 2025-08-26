import type { Metadata } from "next"
import { galmuri } from "@/utils/fonts"
import "./globals.css"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/auth"
import ToastContainer from "./components/ToastContainer"
import DialogContainer from "./components/DialogContainer"
import NextAuthSessionProviders from "./providers/NextAuthSessionProviders"
import ReactQueryProvider from "./providers/ReactQueryProvider"
import ConditionHeader from "./components/ConditionHeader"

export const metadata: Metadata = {
  title: "ItGun | 잇근 - 운동기록 서비스",
  description:
    "잇근으로 득근! 운동기록을 통해 나만의 캐릭터를 성장시켜 보세요.",
  openGraph: {
    title: "ItGun | 잇근 - 운동기록 서비스",
    url: "http://localhost:3000/",
    images: "/opengraph-image.png",
    description:
      "잇근으로 득근! 운동기록을 통해 나만의 캐릭터를 성장시켜 보세요.",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={`${galmuri.className} flex justify-center antialiased`}>
        <div
          className={`relative box-border flex min-h-svh w-full max-w-[430px] flex-col items-center !bg-[var(--color-white-200)] px-[30px] pt-[100px] sm:min-h-dvh lg:min-h-screen`}
        >
          <ConditionHeader />
          <NextAuthSessionProviders session={session}>
            <ReactQueryProvider>{children}</ReactQueryProvider>
            <ToastContainer />
            <DialogContainer />
          </NextAuthSessionProviders>
        </div>
      </body>
    </html>
  )
}
