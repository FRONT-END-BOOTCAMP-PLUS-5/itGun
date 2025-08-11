import localFont from "next/font/local"

export const galmuri = localFont({
  src: [
    {
      path: "../static/fonts/Galmuri11.woff2",
      weight: "400",
    },
    {
      path: "../static/fonts/Galmuri11-Bold.woff2",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-galmuri",
})
