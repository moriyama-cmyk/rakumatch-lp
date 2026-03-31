import { ArrowRight } from "lucide-react";

const APP_URL = "https://app.rakumatch-ai.com";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <img src="/icon-192.png" alt="楽マッチ AI" className="h-8 w-8 rounded-lg" />
          <span className="text-base font-bold tracking-tight">
            楽マッチ AI
          </span>
        </a>
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-6 mr-4">
            <a href="#features" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">機能</a>
            <a href="#plans" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">料金</a>
            <a href="#faq" className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors">FAQ</a>
          </nav>
          <a
            href={`${APP_URL}/login`}
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            ログイン
          </a>
          <a
            href={`${APP_URL}/login`}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-sm font-medium text-white transition-colors"
          >
            無料で試す
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
