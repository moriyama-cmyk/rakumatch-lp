import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "楽マッチ AI へのお問い合わせページです。ご質問・ご要望はこちらからお気軽にどうぞ。",
  openGraph: {
    title: "お問い合わせ | 楽マッチ AI",
    description: "楽マッチ AI へのお問い合わせページです。ご質問・ご要望はこちらからお気軽にどうぞ。",
    url: "https://rakumatch-ai.com/contact",
  },
  alternates: {
    canonical: "https://rakumatch-ai.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface-50 text-neutral-900 flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/"
            className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            &larr; トップページへ戻る
          </Link>

          <h1 className="text-2xl font-bold mt-6 mb-8">お問い合わせ</h1>

          <div className="bg-white rounded-2xl border border-surface-200 p-8 md:p-10">
            <p className="text-neutral-700 leading-relaxed mb-6">
              楽マッチ AI に関するご質問・ご要望・不具合のご報告等は、下記メールアドレスまでお気軽にお問い合わせください。
            </p>

            <div className="flex items-center gap-3 bg-surface-50 rounded-xl p-5 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-neutral-400 mb-0.5">メールアドレス</p>
                <p className="text-sm font-semibold text-neutral-800">moriyama@fm-y.com</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-neutral-600">
              <p>
                お問い合わせの際は、以下の情報をご記載いただくとスムーズに対応できます。
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>ご登録のメールアドレス</li>
                <li>お問い合わせの内容（できるだけ具体的に）</li>
                <li>スクリーンショット（不具合の場合）</li>
              </ul>
              <p className="bg-primary-50/60 text-primary-700 rounded-lg px-4 py-3 font-medium">
                通常、3営業日以内にご返信いたします。
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
