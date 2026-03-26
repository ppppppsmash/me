import Head from "next/head";
import Script from "next/script";
import { Metadata } from "next";

import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import HeaderStatus from "@/components/HeaderStatus"
import { AnimatedThemeToggler } from "@/components/Theme";
import WeatherWrapper from "@/components/WeatherWrapper";

import SquareBg from "@/components/SquareBg";

import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KUROSAWA",
  description: "KUROSAWAのポートフォリオ",
  authors: { name: "KUROSAWA ARATA" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "localhost",
    siteName: "Kurosawa's portfolio",
    title: "Kurosawa's portfolio",
    images: "https://xxx.png",
  },
  robots: {
    index: false,
    follow: false,
  },
  viewport: {
    width: "device-width, initial-scale=1.0, viewport-fit=cover",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
        <Head>
          <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet" />
          <link href="https://https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" rel="stylesheet" />
        </Head>
        <Script src="https://my-comment-widget.vercel.app/widget.umd.js" />
        <body className={`${inter.className} dark:bg-transparent bg-neutral-100/80`}>
          <Nav />

          <SquareBg 
            speed={0.4} 
            squareSize={45}
            direction="diagonal"
            borderColor="rgba(255, 255, 255, 0.08)"
            hoverFillColor="#222"
          />

          <main className="flex h-[100svh] flex-col items-center justify-between">
          <AnimatedThemeToggler className="fixed top-[15px] left-[20px] z-[9999] dark:text-white text-black w-5" />
            {children}
          </main>

          <HeaderStatus />

          <WeatherWrapper />

          <my-widget project-id="1" />

          {/* <BackgroundBeams /> */}
          {/* <StarBg /> */}
        </body>
    </html>
  );
}
