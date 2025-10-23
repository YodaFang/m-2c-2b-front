import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

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
    ],
  },
  experimental: {
    // missingSuspenseWithCSRBailout: false,
    optimizePackageImports: [
      "lucide-react",
      "@/lib/icon",
      "@/components/ui",
      "@/components/sections",
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};


const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);