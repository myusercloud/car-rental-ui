import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import { Providers } from './providers'
import './globals.css'
import { ColorModeScript } from '@chakra-ui/react'

export const metadata: Metadata = {
  title: 'Car Rental',
  description: 'Premium car rental listings UI',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>

        {/* MUST be before Providers */}
        <ColorModeScript initialColorMode="light" />

        <Providers>
          <Navbar />
          <main className="appMain">{children}</main>
        </Providers>

      </body>
    </html>
  )
}