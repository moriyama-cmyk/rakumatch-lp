// トップページ（新デザイン＝lp-bold 版・ハブ軸）。
// 「メインは1分で決めるページ・詳細は別ページ」構成（2026-07-19 組み替え）。
// Hero → TrustStrip → Problem → SOLUTION → 差別化(お客様アプリ) → 主要機能(厳選)
// → 機能ダイジェスト（#hub・詳細ページへ誘導）→ WHY/料金/FAQ/CTA の順に提示。
// 各コンポーネントは src/components/lp 配下（Vite 版を Next.js へ忠実移植）。
//
// 除去したセクション（コンポーネント自体は残置＝ロールバック用。import・JSXのみ撤去）:
//   FeatureHub（ハブ図・着地点はFeatureDigestのid="hub"が引き継ぐ）
//   Recording / Workflow / Settlement（詳細はFeatureDigestの3カード＋機能ページへ集約）
//   Solutions（FOR WHOM）
import { Header } from "@/components/lp/layout/Header";
import { Footer } from "@/components/lp/layout/Footer";
import { StickyCta } from "@/components/lp/layout/StickyCta";
import { Hero } from "@/components/lp/sections/Hero";
import { TrustStrip } from "@/components/lp/sections/TrustStrip";
import { Problem } from "@/components/lp/sections/Problem";
import { EraShift } from "@/components/lp/sections/EraShift";
import { SolutionCore } from "@/components/lp/sections/SolutionCore";
import { CustomerApp } from "@/components/lp/sections/CustomerApp";
import { Matching } from "@/components/lp/sections/Matching";
import { Ingest } from "@/components/lp/sections/Ingest";
import { AiPartner } from "@/components/lp/sections/AiPartner";
import { FeatureDigest } from "@/components/lp/sections/FeatureDigest";
import { Why } from "@/components/lp/sections/Why";
import { Story } from "@/components/lp/sections/Story";
import { Voices } from "@/components/lp/sections/Voices";
import { Security } from "@/components/lp/sections/Security";
import { Pricing } from "@/components/lp/sections/Pricing";
import { Faq } from "@/components/lp/sections/Faq";
import { FinalCta } from "@/components/lp/sections/FinalCta";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-surface-50">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        本文へスキップ
      </a>

      <Header />

      <main>
        {/* 1. Hero */}
        <Hero />
        <TrustStrip />
        {/* 2. PROBLEM */}
        <Problem />
        {/* 2.5 時代の転換（価格軸→個人の武器軸へのブリッジ） */}
        <EraShift />
        {/* 3. SOLUTION（核の宣言） */}
        <SolutionCore />

        {/* 4〜7. 主要機能（差別化を前倒し・厳選4本。#features は機能群の先頭アンカー）。
            2026-07-24 修正: アンカー着地点の空divなので aria-hidden は不要かつ有害
            （スクリーンリーダーのランドマーク探索を阻害するため撤去）。 */}
        <div id="features" className="scroll-mt-20" />
        <CustomerApp />
        <Matching />
        <Ingest />
        <AiPartner />

        {/* 8. 機能ダイジェスト（除去したRecording/Workflow/Settlementを3カードに集約・#hubを引き継ぐ） */}
        <FeatureDigest />

        {/* 9. WHY */}
        <Why />
        {/* 9.3 開発者の声（WHY TRUST US ストーリー） */}
        <Story />
        {/* 9.4 お客様・営業の声（実際に聞いた声・アコーディオン） */}
        <Voices />
        {/* 9.5 セキュリティ／インフラの信頼 */}
        <Security />
        {/* 10. 料金 */}
        <Pricing />
        {/* 11. FAQ */}
        <Faq />
        {/* 12. 最終CTA */}
        <FinalCta />
      </main>

      {/* フッター */}
      <Footer />

      {/* モバイル下部固定CTA */}
      <StickyCta />
    </div>
  );
}
