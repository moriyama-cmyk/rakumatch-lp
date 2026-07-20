import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "../components/lp/Analytics";

const SITE_URL = 'https://rakumatch-ai.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '楽マッチ AI｜1名から使える不動産営業の顧客・物件管理AI',
    template: '%s | 楽マッチ AI',
  },
  description: '月額3,000円/人（税込・スタンダード）から、1名で始められる不動産売買仲介の顧客・物件管理AI。顧客管理、物件一括取り込み、双方向マッチング、専属AI、お客様アプリを一つに。登録なしで画面を試せます。',
  openGraph: {
    title: '楽マッチ AI｜1名から使える不動産営業の顧客・物件管理AI',
    description: '月額3,000円/人（税込・スタンダード）から。5つの営業機能を1名で始められます。登録なしで画面を試せます。',
    url: SITE_URL,
    siteName: '楽マッチ AI',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/ogp-new.png', width: 1200, height: 630, alt: '楽マッチ AI｜不動産営業専門の顧客・物件管理AI（月3,000円・税込）' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '楽マッチ AI｜1名から使える不動産営業の顧客・物件管理AI',
    description: '月額3,000円/人（税込・スタンダード）から。顧客管理と「次に出す物件」を一つの画面へ。',
    images: ['/ogp-new.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface-50 text-ink-900">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "楽マッチ AI",
          "description": "1名から始められる不動産売買仲介の顧客・物件管理AI。顧客管理、物件一括取り込み、双方向マッチング、専属AI、お客様アプリを一つに。",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "url": SITE_URL,
          "offers": {
            "@type": "AggregateOffer",
            "lowPrice": "3000",
            "highPrice": "5000",
            "priceCurrency": "JPY",
            "offerCount": "2"
          }
        })}} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
