import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import "./lpv2.css";
import { Analytics } from "../components/lp/Analytics";

// 日本語フォントを next/font でセルフホストし、CSS変数 --font-sans を実定義する。
// globals.css の `font-family: var(--font-sans), ...` がこれで解決される。
// CJK は容量が大きく preload は無駄が多いため preload:false。display:swap で FOIT を回避。
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
  preload: false,
});

// LP v2（AB案）専用フォント。夜パート（明朝の見出し）と朝パートのゴシックUI文字。
// 既存 --font-sans（Noto Sans JP）とは独立した CSS 変数として定義し、lpv2.css の
// `.lpv2` スコープ内でのみ参照する（既存ページの見た目には影響しない）。
const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-shippori-mincho",
  preload: false,
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-zen-kaku-gothic-new",
  preload: false,
});

const SITE_URL = 'https://rakumatch-ai.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '楽マッチAI｜次に誰へ、何を提案するかが画面で見える不動産営業CRM',
    template: '%s | 楽マッチ AI',
  },
  description: '物件情報を貼ると、合うお客様を理由つきで表示。顧客・物件の双方向マッチングからメール・電話・案内準備まで支える、売買・賃貸仲介向けAI営業CRM。登録なしで実画面を確認できます。',
  openGraph: {
    title: '楽マッチAI｜次に誰へ、何を提案するかが画面で見える',
    description: '物件を貼ると、合うお客様が理由つきで並ぶ。不動産仲介に特化したAI営業CRM。',
    url: SITE_URL,
    siteName: '楽マッチAI',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/og-rakumatch.png', width: 1200, height: 630, alt: '楽マッチAI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '楽マッチAI｜次に誰へ、何を提案するかが画面で見える',
    description: '物件を貼ると、合うお客様が理由つきで並ぶ。不動産仲介に特化したAI営業CRM。',
    images: ['/og-rakumatch.png'],
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
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${shipporiMincho.variable} ${zenKakuGothicNew.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface-50 text-ink-900">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "楽マッチ AI",
          "description": "不動産営業専門の顧客・物件管理AI。顧客と物件の双方向マッチング、コピペ・PDFでの物件登録、通話録音の文字起こし・要約、お客様連動アプリ、契約・精算まで一元化。",
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
