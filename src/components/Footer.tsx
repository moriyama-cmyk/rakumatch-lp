import Link from "next/link";

const footerLinks = [
  { href: "/terms", label: "利用規約" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/tokusho", label: "特定商取引法" },
  { href: "/contact", label: "お問い合わせ" },
];

export default function Footer() {
  return (
    <footer className="py-10 border-t border-surface-200 bg-surface-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-neutral-400">
            <img src="/icon-192.png" alt="楽マッチ AI" className="h-6 w-6 rounded" />
            <span className="text-sm font-medium">楽マッチ AI</span>
          </div>
          <p className="text-xs text-neutral-400">
            &copy; 2026 楽マッチ AI. All rights reserved.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
