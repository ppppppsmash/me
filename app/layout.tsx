import Head from 'next/head'
import Script from 'next/script'
import { Metadata } from 'next'

import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import HeaderStatus from '@/components/HeaderStatus'

import WeatherWrapper from '@/components/WeatherWrapper'
import { BackgroundBeams } from '@/components/BackgroundBeams'
import StarBg from '@/components/StarBg'

import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KUROSAWA',
  description: 'KUROSAWAのポートフォリオ',
  authors: { name: 'KUROSAWA ARATA'},
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'localhost',
    siteName: 'Kurosawa\'s portfolio',
    title: 'Kurosawa\'s portfolio',
    images: 'https://xxx.png'
  },
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
      <Script src="https://my-comment-widget.vercel.app/widget.umd.js" />
      <body className={`${inter.className} bg-transparent`}>
        <Nav />

        <main className='flex min-h-screen flex-col items-center justify-between'>
          {children}
        </main>

        <HeaderStatus />

        <WeatherWrapper />

        <my-widget project-id="1" />

        {/* <BackgroundBeams /> */}
        <StarBg />
      </body>
    </html>
  )
}
