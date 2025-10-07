import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Flying Chicken - Premium Meat Delivery Platform',
  description:
    'Connecting trusted chicken and meat vendors directly to customers. Fresh, fast, and reliable meat delivery service.',
  keywords: ['meat delivery', 'chicken delivery', 'fresh meat', 'premium meat', 'meat vendors'],
  authors: [{ name: 'Flying Chicken' }],
  openGraph: {
    title: 'Flying Chicken - Premium Meat Delivery Platform',
    description: 'Connecting trusted chicken and meat vendors directly to customers',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}


