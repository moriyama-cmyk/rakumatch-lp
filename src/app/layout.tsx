import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: '楽マッチ AI — 不動産売買専用の反則級AI',
  description: '新人が、即戦力に変わる。個人でも企業でも月3,000円で導入可能。コピペだけで物件登録、AIが自動マッチング、提案もヒアリングもAIがサポート。不動産売買特化のAI営業支援ツール。',
  openGraph: {
    title: '楽マッチ AI — 不動産売買専用の反則級AI',
    description: '新人が、即戦力に変わる。不動産売買特化のAI営業支援ツール。',
    type: 'website',
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
        {children}
      </body>
    </html>
  );
}
