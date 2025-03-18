import { type Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/layout/Layout'
import { Analytics } from "@/components/analytics/analytics";
import { name, headline, introduction, avatarUrl } from '@/config/infoConfig'
import '@/styles/tailwind.css'
import { generatePersonSchema } from '@/lib/generate-schema'

// 加载Inter字体
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devxiyang.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s - ${name}`,
    default: `${name} - ${headline}`,
  },
  description: introduction,
  keywords: ['blog', 'software engineer', 'web developer', 'programming', 'tech'],
  authors: [{ name, url: siteUrl }],
  creator: name,
  publisher: name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
      'application/ld+json': JSON.stringify(generatePersonSchema(siteUrl)),
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: `${name} - ${headline}`,
    description: introduction,
    siteName: name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${name} - ${headline}`,
    description: introduction,
    creator: '@devxiyang',  // 替换为你的 Twitter 用户名
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteUrl}/site.webmanifest`,
  verification: {
    // 可以添加站点验证信息
    // google: 'your-google-verification-id',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="flex h-full">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
