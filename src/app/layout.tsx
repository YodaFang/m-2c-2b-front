import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/custom-ui/toast";
import { DefaultSeo } from "next-seo";
import defaultSEOConfig from "@/app/next-seo.config";


export const metadata: Metadata = {
  title: "Furnisy - E-Commerce Template",
  description:
    "Furnisy - e-commerce template built with Next.js, Tailwind CSS, and Shadcn UI.",
  keywords: [
    "ecommerce",
    "furnisy",
    "product",
  ],
  metadataBase: new URL("https://www.furnisy.com"),
  openGraph: {
    title: "Furnisy - Smart Furniture & Decor",
    description:
      "Discover premium furniture and smart home products at Furnisy. Elegant design, modern comfort, fast delivery.",
    url: "https://www.furnisy.com",
    siteName: "Furnisy",
    images: [
      {
        url: "https://www.furnisy.com/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Furnisy Furniture - Modern Home",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} suppressContentEditableWarning={true}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <DefaultSeo {...defaultSEOConfig} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <StoreProvider>
            {children}
            <Toaster position="top-right"/>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
