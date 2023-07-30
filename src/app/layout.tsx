// IMPORTS
import type { Metadata } from 'next'

// SERVICES
import { ExchangeRateProvider } from '@/context/ExchangeRateContext'

// COMPONENTS
import { Toaster } from '@/components/ui/toaster'

// ASSETS
import { SystemProvider } from '@/context/SystemContext'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['300', '500', '700'] })

export const metadata: Metadata = {
  title: 'CoinSynch',
  description: 'CoinSynch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <SystemProvider>
          <ExchangeRateProvider>
            <Toaster />
            {children}
          </ExchangeRateProvider>
        </SystemProvider>
      </body>
    </html>
  )
}
