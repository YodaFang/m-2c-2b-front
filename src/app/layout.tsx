import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import QueryProvider from "./query-provider";
import { Toaster } from "@/components/custom-ui/toast";
import {
  generateOrganizationJsonLd,
  generateBreadcrumbJsonLd,
  generateProductJsonLd,
  jsonLdScript,
  ProductInfo,
  BreadcrumbItem,
} from "@/lib/seo";

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
  const organizationJson = generateOrganizationJsonLd({
    name: "Furnisy",
    url: "https://furnisy.com",
    logo: "https://furnisy.com/logo.png",
    sameAs: ["https://facebook.com/furnisy", "https://instagram.com/furnisy"],
  });

  // Breadcrumb 数据，可动态生成
  const breadcrumbItems: BreadcrumbItem[] = [
    { position: 1, name: "Home", item: "https://furnisy.com" },
    { position: 2, name: "Products", item: "https://furnisy.com/products" },
  ];
  const breadcrumbJson = generateBreadcrumbJsonLd(breadcrumbItems);

  // 示例商品数据，可动态传入每个页面
  const exampleProduct: ProductInfo = {
    name: "Modern Wooden Chair",
    description: "High-quality modern chair made of oak wood.",
    image: ["https://furnisy.com/images/chair.jpg"],
    sku: "CHAIR-123",
    price: "129.99",
    currency: "EUR",
    url: "https://furnisy.com/products/wooden-chair",
  };
  const productJson = generateProductJsonLd(exampleProduct);

  return (
    <html lang="en" suppressHydrationWarning={true} suppressContentEditableWarning={true}>
      <head>
        {jsonLdScript(organizationJson)}
        {jsonLdScript(breadcrumbJson)}
        {jsonLdScript(productJson)}
      </head>
      <body className="min-h-screen bg-home-bg-1 text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <QueryProvider>
            <StoreProvider>
              {children}
            </StoreProvider>
            <Toaster position="top-right" richColors closeButton/>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
