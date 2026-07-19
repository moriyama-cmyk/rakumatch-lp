import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
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

const SITE_URL = 'https://rakumatch-ai.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '楽マッチ AI｜不動産営業専門CRM・顧客/物件管理AI（月3,000円・税込）',
    template: '%s | 楽マッチ AI',
  },
  description: '不動産営業専門の顧客・物件管理AI。このお客様に何を、この物件を誰に — AIが両方から答える双方向マッチング。コピペ・PDFで物件登録（媒体連携0円）、通話録音の文字起こし・要約、お客様連動アプリ、契約・精算まで。個人でも会社でも月3,000円（税込）/人から。',
  openGraph: {
    title: '楽マッチ AI｜不動産営業専門CRM・顧客/物件管理AI',
    description: 'このお客様に何を、この物件を誰に。AIが両方から答える双方向マッチング。コピペ・PDFで物件登録（媒体連携0円）、通話録音の要約、お客様連動アプリ、契約・精算まで。月3,000円（税込）/人から。',
    url: SITE_URL,
    siteName: '楽マッチ AI',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/ogp-new.png', width: 1200, height: 630, alt: '楽マッチ AI｜不動産営業専門の顧客・物件管理AI（月3,000円・税込）' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '楽マッチ AI｜不動産営業専門CRM・顧客/物件管理AI',
    description: 'このお客様に何を、この物件を誰に。AIが両方から答える双方向マッチング。コピペ物件登録（媒体連携0円）・通話録音要約・お客様連動アプリ・契約・精算。月3,000円（税込）/人から。',
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
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "導入や初期設定は大変ですか？", "acceptedAnswer": { "@type": "Answer", "text": "無料でログイン前から中を触れます。物件や顧客は、画面を貼る・スクショ・PDFを投げ込むだけでAIが整理します。媒体とのAPI連携は不要です。" }},
            { "@type": "Question", "name": "1人でも、会社でも使えますか？料金は？", "acceptedAnswer": { "@type": "Answer", "text": "はい。個人の営業の方も会社でも使えます。料金は同じ¥3,000/人（税込・スタンダード）。プレミアムは¥5,000/人（税込）でAI利用枠が拡大します。人数課金・初月割引あり。" }},
            { "@type": "Question", "name": "お客様連動アプリは、お客様にアプリのインストールが必要ですか？", "acceptedAnswer": { "@type": "Answer", "text": "インストールもログインも不要です。リンクを開くだけで、すべての機能が使えます — SUUMO等で気になった物件の保存（共有ボタンから1タップ）、星評価、メモ、「内見したい」の送信まで。その内容はそのまま担当者に届きます。" }},
            { "@type": "Question", "name": "通話録音は特別な機材がいりますか？", "acceptedAnswer": { "@type": "Answer", "text": "選んだマイクに入る音を録る方式なので、携帯でも固定電話でも対面でも使えます。高額な電話システムは不要です。接続のしかたやマイクの選び方は、アプリ内の「通話録音のヒント」で画面を見ながら確認でき、録音前のマイクテストもできます（録音はお相手の同意のうえで）。" }},
            { "@type": "Question", "name": "賃貸でも使えますか？", "acceptedAnswer": { "@type": "Answer", "text": "売買向けに作っていますが、顧客・物件の管理やマッチングはご利用いただけます。賃貸の細かな運用はサポートにご相談ください。" }}
          ]
        })}} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
