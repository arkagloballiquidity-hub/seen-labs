import type { Metadata } from "next"
import { Sora, Manrope } from "next/font/google"
import "./globals.css"

const sora    = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["300","400","600","700","800"] })
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" })

export const metadata: Metadata = {
  title: "Seen Labs CRM",
  description: "Sistema de gestión interno — Seen Labs",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sora.variable} ${manrope.variable} h-full`}>
      <body className="min-h-full bg-[#0A0A0F] text-white antialiased">{children}</body>
    </html>
  )
}
