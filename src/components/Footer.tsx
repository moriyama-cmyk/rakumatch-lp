import Link from "next/link";
import Image from "next/image";

const featureLinks = [
  { href: "/features/customer-app", label: "お客様連動アプリ" },
  { href: "/features/matching", label: "AIマッチング・逆引き" },
  { href: "/features/call-recording", label: "通話録音・要約" },
  { href: "/features/property-input", label: "コピペ物件登録・契約管理" },
];

const legalLinks = [
  { href: "/blog", label: "ブログ" },
  { href: "/terms", label: "利用規約" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/tokusho", label: "特定商取引法" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-surface-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {/* ブランド */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/icon-192.png" alt="楽マッチ AI" width={28} height={28} className="h-7 w-7 rounded" />
              <span className="text-sm font-bold text-ink-900">楽マッチ AI</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              不動産売買特化のAI営業CRM。物件はコピペ・PDFで登録、AIが顧客と逆引きマッチング。
            </p>
          </div>

          {/* 機能 */}
          <div>
            <p className="text-sm font-semibold text-ink-900">機能</p>
            <ul className="mt-4 space-y-2.5">
              {featureLinks.map((f) => (
                <li key={f.href}>
                  <Link
                    href={f.href}
                    className="inline-flex min-h-11 items-center rounded-md text-sm text-ink-500 transition-colors hover:text-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    {f.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 規約・問い合わせ */}
          <div>
            <p className="text-sm font-semibold text-ink-900">情報</p>
            <ul className="mt-4 space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-md text-sm text-ink-500 transition-colors hover:text-ink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-surface-200 pt-6">
          <p className="text-xs text-ink-500">&copy; 2026 楽マッチ AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
