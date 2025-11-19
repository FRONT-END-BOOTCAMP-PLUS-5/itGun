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

  serverExternalPackages: ["openid-client"],
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(nextConfig)
