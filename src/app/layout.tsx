import type { Metadata } from "next"
// import useSWR from 'swr'
import Navbar from '@/components/Navbar'
import { Inter } from "next/font/google"

import "./globals.css"
import './layout.scss'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "React Sandbox",
  description: "Fun with Nextjs boilerplate",
  openGraph: {
    siteName: 'React Sandbox',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`page-body`}>
        <Navbar />
        <div className="page-content min-h-screen flex flex-col items-center">
          {children}
        </div>
      </body>
    </html>
  )
}