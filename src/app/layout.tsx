import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Furnisy - E-Commerce Template",
  description: "Furnisy - e-commerce template create by technology next.js, tailwind css, shadcn",
  keywords: ["ecommerce", "furnisy", "product", "site", "react.js", "next.js", "tailwind css",],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        suppressContentEditableWarning={true}
      >
        <StoreProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </StoreProvider>
      </body>
    </html>
  );
}
