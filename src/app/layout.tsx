import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

// 日本語フォントを next/font でセルフホストし、CSS変数 --font-sans を実定義する。
// globals.css の `font-family: var(--font-sans), ...` がこれで解決される。
// CJK は容量が大きく preload は無駄が多いため preload:false。display:swap で FOIT を回避。
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-sans",
  preload: false,
});

const SITE_URL = 'https://rakumatch-ai.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: '楽マッチ AI — 不動産売買専用AI営業支援CRM｜顧客管理・物件管理・自動マッチング',
    template: '%s | 楽マッチ AI',
  },
  description: '不動産売買特化のAI営業支援CRM。コピペだけで物件登録、AIが顧客と物件を自動マッチング。顧客管理・物件管理・追客メール・電話スクリプト・契約管理まで一元化。個人でも企業でも月3,000円で導入可能な不動産営業支援ツール。',
  openGraph: {
    title: '楽マッチ AI — 不動産売買専用AI営業支援CRM',
    description: '不動産CRMの決定版。コピペで物件登録、AIが自動マッチング・提案メール・電話スクリプトを生成。顧客管理・物件管理・契約管理を月3,000円で。',
    url: SITE_URL,
    siteName: '楽マッチ AI',
    locale: 'ja_JP',
    type: 'website',
    images: [{ url: '/ogp.png', width: 1200, height: 630, alt: '楽マッチ AI — 不動産売買専用AI営業支援CRM' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '楽マッチ AI — 不動産売買専用AI営業支援CRM',
    description: '不動産CRMの決定版。コピペで物件登録、AIが自動マッチング。顧客管理・物件管理・契約管理を月3,000円で。',
    images: ['/ogp.png'],
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
          "description": "不動産売買専用AI営業支援CRM。顧客管理・物件管理・自動マッチング・契約管理を一元化。",
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
            { "@type": "Question", "name": "無料トライアル中に解約できますか？", "acceptedAnswer": { "@type": "Answer", "text": "はい、1週間以内に解約すれば料金はかかりません。" }},
            { "@type": "Question", "name": "SUUMOやレインズとAPI契約が必要ですか？", "acceptedAnswer": { "@type": "Answer", "text": "いいえ。物件情報はページをコピペするか、PDF・画像を投げ込むだけで登録できます。外部サービスとの連携契約や設定は不要で、導入したその日から使えます。" }},
            { "@type": "Question", "name": "1人でも、会社でも使えますか？", "acceptedAnswer": { "@type": "Answer", "text": "はい。個人の営業の方は自分の顧客・物件・追客をまるごと管理でき、料金は同じ¥3,000/人（税込）です。会社で使う場合は、オーナーが全体を見ながら、担当者ごとに情報を分けて運用できます（会社間・担当者間のデータは分離されます）。" }},
            { "@type": "Question", "name": "賃貸でも使えますか？", "acceptedAnswer": { "@type": "Answer", "text": "楽マッチAIは売買仲介に全振りして設計しているので、売買の業務フローに合わせた作りです。賃貸にも対応（業態モードの切替）しており、売買・賃貸を兼業されている事務所でもお使いいただけます。賃貸メインでのご利用はまずご相談ください。" }},
            { "@type": "Question", "name": "スマホでも使えますか？", "acceptedAnswer": { "@type": "Answer", "text": "はい。ブラウザで動くので、スマホ・タブレット・PCのどれでも使えます。お客様連動アプリはスマホのホームに追加すればアプリのように使えます（iPhone・Android対応）。" }},
            { "@type": "Question", "name": "スタンダードとプレミアムの違いは？", "acceptedAnswer": { "@type": "Answer", "text": "使えるAI機能・AIの性能は同じです。違いは1ヶ月のAI利用枠の大きさと保存容量（250GB/500GB）です。AIをたくさん使う事務所はプレミアムが向いています。" }},
            { "@type": "Question", "name": "メンバーが増減したら料金はどうなりますか？", "acceptedAnswer": { "@type": "Answer", "text": "人数分の課金です。メンバーを招待すると枠が1つ増え、削除すると1つ減るよう自動で連動します。使わない分を払い続けることはありません。" }},
            { "@type": "Question", "name": "セキュリティは大丈夫ですか？", "acceptedAnswer": { "@type": "Answer", "text": "自社で大手と同等のセキュリティを構築するのはほぼ不可能です。楽マッチAIは、AWS・Google Cloud・Stripeなど、世界中の大企業や銀行が採用するインフラ上で稼働しています。お客様のデータや決済情報を弊社サーバーで保持することはありません。" }}
          ]
        })}} />
        {children}
      </body>
    </html>
  );
}
