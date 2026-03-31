import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-surface-50 text-neutral-900">
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
            { "@type": "Question", "name": "無料トライアル中に解約できますか？", "acceptedAnswer": { "@type": "Answer", "text": "はい、1週間以内に解約すれば一切料金はかかりません。" }},
            { "@type": "Question", "name": "他のCRMからデータ移行できますか？", "acceptedAnswer": { "@type": "Answer", "text": "Excelやどんな媒体でも、コピペするだけでAIが自動登録します。" }},
            { "@type": "Question", "name": "1人でも使えますか？", "acceptedAnswer": { "@type": "Answer", "text": "はい、個人の営業マンの方も同じ料金でご利用いただけます。" }},
            { "@type": "Question", "name": "セキュリティは大丈夫ですか？", "acceptedAnswer": { "@type": "Answer", "text": "Google AI・Amazon DB・Stripe決済を採用。銀行レベルのセキュリティです。お客様のデータは弊社では管理しません。" }},
            { "@type": "Question", "name": "賃貸でも使えますか？", "acceptedAnswer": { "@type": "Answer", "text": "楽マッチAIは不動産売買に特化して設計されています。売買仲介の業務フローに最適化されています。" }}
          ]
        })}} />
        {children}
      </body>
    </html>
  );
}
