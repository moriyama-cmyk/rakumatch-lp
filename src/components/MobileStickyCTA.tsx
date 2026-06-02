"use client";

// ============================================================
//  MobileStickyCTA — スマホ限定の下部固定CTAバー
//
//  Heroを過ぎてスクロールしたら画面下に「1週間無料で試す」を固定表示。
//  最終CTAセクションが見えている間は重複を避けて隠す。
//  ・md未満のみ表示（md:hidden）
//  ・safe-area-inset-bottom を考慮（ホームバー被り回避）
//  ・prefers-reduced-motion を尊重（フェード/スライドを無効化）
//
//  表示判定は2つの番兵要素の交差で行う:
//   #hero-sentinel … Hero直後に置く。これがビューポートより上に出たら「Heroを過ぎた」
//   #final-cta     … 最終CTA。見えている間はバーを隠す
// ============================================================

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const APP_URL = "https://app.rakumatch-ai.com";

export default function MobileStickyCTA() {
  // Heroを過ぎたか / 最終CTAが見えているか
  const [pastHero, setPastHero] = useState(false);
  const [finalVisible, setFinalVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    const finalCta = document.getElementById("final-cta");

    let heroObs: IntersectionObserver | null = null;
    let finalObs: IntersectionObserver | null = null;

    if (sentinel) {
      // 番兵が画面上端より上に抜けた（＝下にスクロールした）ら past=true
      heroObs = new IntersectionObserver(
        ([e]) => {
          const r = e.boundingClientRect;
          setPastHero(!e.isIntersecting && r.top < 0);
        },
        { threshold: 0 }
      );
      heroObs.observe(sentinel);
    }

    if (finalCta) {
      finalObs = new IntersectionObserver(
        ([e]) => setFinalVisible(e.isIntersecting),
        { threshold: 0.1 }
      );
      finalObs.observe(finalCta);
    }

    return () => {
      heroObs?.disconnect();
      finalObs?.disconnect();
    };
  }, []);

  const show = pastHero && !finalVisible;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 md:hidden border-t border-surface-200 bg-white/90 backdrop-blur-md shadow-[0_-4px_20px_rgba(5,57,43,0.08)] transition-all duration-300 motion-reduce:transition-none ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0 motion-reduce:translate-y-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="px-4 py-3">
        <a
          href={`${APP_URL}/try`}
          tabIndex={show ? 0 : -1}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          1週間無料で試す
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
