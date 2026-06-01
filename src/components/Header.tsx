import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

const APP_URL = "https://app.rakumatch-ai.com";

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
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/icon-192.png" alt="楽マッチ AI" width={32} height={32} className="h-8 w-8 rounded-lg" />
          <span className="text-base font-bold tracking-tight text-ink-900">
            楽マッチ AI
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-6 mr-4">
            {/* 機能メニュー（ホバーで詳細ページ4本へ） */}
            <div className="relative group">
              <Link
                href="/#features"
                className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-900 transition-colors"
              >
                機能
                <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <div className="w-64 rounded-xl border border-surface-200 bg-white p-2 shadow-[0_8px_30px_rgba(13,124,102,0.08)]">
                  {featureLinks.map((f) => (
                    <Link
                      key={f.href}
                      href={f.href}
                      className="block rounded-lg px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-surface-50 hover:text-primary-600"
                    >
                      {f.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/#comparison" className="text-sm text-ink-500 hover:text-ink-900 transition-colors">比較</Link>
            <Link href="/#plans" className="text-sm text-ink-500 hover:text-ink-900 transition-colors">料金</Link>
            <Link href="/#faq" className="text-sm text-ink-500 hover:text-ink-900 transition-colors">FAQ</Link>
          </nav>
          <a
            href={`${APP_URL}/login`}
            className="text-sm text-ink-500 hover:text-ink-900 transition-colors"
          >
            ログイン
          </a>
          <a
            href={`${APP_URL}/try`}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-sm font-medium text-white transition-colors"
          >
            無料で試す
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
