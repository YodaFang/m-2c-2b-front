import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";

const satoshi = localFont({
  src: [
    {
      path: '../font/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../font/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../font/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../font/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable:'--satoshi'
})


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
        className={`${satoshi.variable}`}
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
