"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { trackCta } from "@/lib/track";
import { SITE } from "@/components/lp/site";

const featureLinks = [
  { href: "/features/customer-app", label: "お客様連動アプリ" },
  { href: "/features/matching", label: "AIマッチング・逆引き" },
  { href: "/features/call-recording", label: "通話録音・要約" },
  { href: "/features/property-input", label: "コピペ物件登録・契約管理" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex min-h-11 items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
          <Image src="/icon-192.png" alt="楽マッチ AI" width={32} height={32} className="h-8 w-8 rounded-lg" />
          <span className="text-base font-bold tracking-tight text-ink-900">
            楽マッチ AI
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="mr-4 hidden items-center gap-6 lg:flex">
            {/* 機能メニュー（ホバーで詳細ページ4本へ） */}
            <div className="relative group">
              <Link
                href="/#features"
                className="inline-flex min-h-11 items-center gap-1 rounded-md text-sm text-ink-500 transition-colors hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                機能
                <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="w-64 rounded-xl border border-surface-200 bg-white p-2 shadow-[0_8px_30px_rgba(13,124,102,0.08)]">
                  {featureLinks.map((f) => (
                    <Link
                      key={f.href}
                      href={f.href}
                      className="flex min-h-11 items-center rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-surface-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      {f.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/#pricing" className="inline-flex min-h-11 items-center rounded-md text-sm text-ink-500 transition-colors hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">料金</Link>
            <Link href="/blog" className="inline-flex min-h-11 items-center rounded-md text-sm text-ink-500 transition-colors hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">ブログ</Link>
            <Link href="/#faq" className="inline-flex min-h-11 items-center rounded-md text-sm text-ink-500 transition-colors hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">FAQ</Link>
          </nav>
          <a
            href={`${SITE.appUrl}/login`}
            className="inline-flex min-h-11 items-center rounded-md text-sm text-ink-500 transition-colors hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            ログイン
          </a>
          <a
            href={SITE.ctaTryUrl}
            onClick={() => trackCta("demo", "secondary_page_header", SITE.ctaTryUrl)}
            className="hidden min-h-11 items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 sm:inline-flex"
          >
            {SITE.ctaPrimaryLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
