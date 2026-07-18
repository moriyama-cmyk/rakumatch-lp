// トップページ（新デザイン＝lp-bold 版・ハブ軸）。
// 不動産営業専門CRMとして、PROBLEM → 機能ハブ（#hub）→ 7機能 → WHY/料金/FAQ/CTA の順に提示。
// 各コンポーネントは src/components/lp 配下（Vite 版を Next.js へ忠実移植）。
import { Header } from "@/components/lp/layout/Header";
import { Footer } from "@/components/lp/layout/Footer";
import { StickyCta } from "@/components/lp/layout/StickyCta";
import { Hero } from "@/components/lp/sections/Hero";
import { TrustStrip } from "@/components/lp/sections/TrustStrip";
import { Problem } from "@/components/lp/sections/Problem";
import { FeatureHub } from "@/components/lp/sections/FeatureHub";
import { SolutionCore } from "@/components/lp/sections/SolutionCore";
import { CustomerApp } from "@/components/lp/sections/CustomerApp";
import { Matching } from "@/components/lp/sections/Matching";
import { AiPartner } from "@/components/lp/sections/AiPartner";
import { Recording } from "@/components/lp/sections/Recording";
import { Ingest } from "@/components/lp/sections/Ingest";
import { Workflow } from "@/components/lp/sections/Workflow";
import { Settlement } from "@/components/lp/sections/Settlement";
import { Why } from "@/components/lp/sections/Why";
import { Story } from "@/components/lp/sections/Story";
import { Security } from "@/components/lp/sections/Security";
import { Solutions } from "@/components/lp/sections/Solutions";
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
        {/* 2. Hero */}
        <Hero />
        <TrustStrip />
        {/* 3. PROBLEM */}
        <Problem />
        {/* 3.5 機能の軸（ハブ図・"機能を見る"の着地点 #hub） */}
        <FeatureHub />
        {/* 4. SOLUTION（核の宣言） */}
        <SolutionCore />

        {/* 5〜11. 機能① 〜 ⑦（ハブ各カードのアンカー先） */}
        <div id="features" className="scroll-mt-20" aria-hidden />
        <CustomerApp />
        <Matching />
        <AiPartner />
        <Recording />
        <Ingest />
        <Workflow />
        <Settlement />

        {/* 12. WHY */}
        <Why />
        {/* 12.3 開発者の声（WHY TRUST US ストーリー） */}
        <Story />
        {/* 12.5 セキュリティ／インフラの信頼（比較→ストーリー→安全→誰のため） */}
        <Security />
        {/* 13. FOR WHOM */}
        <Solutions />
        {/* 14. 料金 */}
        <Pricing />
        {/* 15. FAQ */}
        <Faq />
        {/* 16. 最終CTA */}
        <FinalCta />
      </main>

      {/* 17. フッター */}
      <Footer />

      {/* モバイル下部固定CTA */}
      <StickyCta />
    </div>
  );
}
