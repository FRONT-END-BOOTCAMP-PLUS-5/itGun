import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.exercisedb.dev",
        port: "",
        pathname: "/w/images/**",
      },
      {
        protocol: "https",
        hostname: "static.exercisedb.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
