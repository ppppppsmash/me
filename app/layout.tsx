import Head from 'next/head'
import { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KUROSAWA',
  description: 'KUROSAWAのポートフォリオ',
  robots: {
    index: false,
    follow: false
  },
  viewport: {
    width: 'device-width, initial-scale=1.0, viewport-fit=cover'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <Head>
        <link href='https://fonts.cdnfonts.com/css/sf-pro-display' rel='stylesheet' />
        <link href='https://https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css' rel='stylesheet' />
      </Head>
      <body className={inter.className}>
        <Nav />
        <main className='flex min-h-screen flex-col items-center justify-between'>
          {children}
        </main>
      </body>
    </html>
  )
}
