import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "AnimeShop - Tu tienda de anime favorita",
  description: "Figuras, manga y merchandising oficial de anime",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <CartProvider>
          <Suspense>{children}</Suspense>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
