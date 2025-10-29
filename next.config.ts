import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    // missingSuspenseWithCSRBailout: false,
    optimizePackageImports: [
      "lucide-react",
      "@/lib/icon",
      "@/components/ui",
      "@/components/custom-ui",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;