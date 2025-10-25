import type { DefaultSeoProps } from "next-seo";

const defaultSEOConfig: DefaultSeoProps = {
  titleTemplate: "%s | Furnisy - Smart Furniture & Decor",
  defaultTitle: "Furnisy - Smart Furniture & Decor",
  description:
    "Furnisy 是一家智能家居与家具电商网站，提供高品质家具、灯饰与家居装饰。为您打造舒适与时尚并存的家。",
  canonical: "https://www.furnisy.com",

  openGraph: {
    type: "website",
    locale: "en_US", // 如果主要面向罗马尼亚，可以改成 "ro_RO"
    url: "https://www.furnisy.com",
    siteName: "Furnisy",
    title: "Furnisy - Smart Furniture & Decor",
    description:
      "Discover premium furniture and smart home products at Furnisy. Elegant design, modern comfort, fast delivery.",
    images: [
      {
        url: "https://www.furnisy.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Furnisy Furniture - Modern Home",
      },
    ],
  },

  twitter: {
    handle: "@furnisy",
    site: "@furnisy",
    cardType: "summary_large_image",
  },

  additionalMetaTags: [
    { name: "theme-color", content: "#ffffff" },
    { name: "apple-mobile-web-app-title", content: "Furnisy" },
    { name: "application-name", content: "Furnisy" },
  ],

  additionalLinkTags: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
};

export default defaultSEOConfig;
