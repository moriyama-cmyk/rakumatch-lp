import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * FeaturePageShell — /features/* の共通ページ枠。
 * Header / Footer を流用し、全機能ページで同一の外枠（シリーズ感）を担保する。
 * ART_DIRECTION §8.2: Header/Footer は全ページ既存コンポーネントを使用（独自実装しない）。
 * 本文背景は surface-50（トップと同じ基調）。各セクションが white↔surface-50 を交互に塗る。
 */
export default function FeaturePageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-50 text-ink-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
