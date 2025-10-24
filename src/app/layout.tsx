import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/custom-ui/toast";

export const metadata: Metadata = {
  title: "Furnisy - E-Commerce Template",
  description:
    "Furnisy - e-commerce template built with Next.js, Tailwind CSS, and Shadcn UI.",
  keywords: [
    "ecommerce",
    "furnisy",
    "product",
    "react.js",
    "next.js",
    "tailwind css",
    "shadcn ui",
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} suppressContentEditableWarning={true}>
      <body className="min-h-screen bg-background text-foreground">
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
