"use client";

// ============================================================
//  FeatureHub — 「¥3,000で、これ全部。」全部入りハブ図セクション
//
//  中央ハブ（楽マッチAI ¥3,000）から、7機能を3グループに分けて提示。
//  ・上段: 入力のムダをなくす（緑） / 契約まで取りこぼさない（青）
//  ・下段: 売れる相手を逃さない（青緑・お客様連動アプリ＝堀を含む・主役）
//  ハブ→全カードへ扇状の接続線（getBoundingClientRect でステージ基準に計測）。
//  スクロールで画面に入ったら1回だけ順番にフェードイン（スクロールは奪わない）。
// ============================================================

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ClipboardPaste, Mic, ClipboardCheck, Calculator,
  ArrowLeftRight, Smartphone, Sparkles, ArrowRight,
} from "lucide-react";

const APP_URL = "https://app.rakumatch-ai.com";

type Tone = "green" | "teal" | "blue";
type Item = { Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; title: string; sub: string };
type Group = { label: string; tone: Tone; items: Item[] };

// 効果ごとの色（緑=入力のムダ / 青緑=売れる相手 / 青=契約取りこぼさない）
const TONE: Record<Tone, { pill: string; chip: string; icon: string; hover: string }> = {
  green: { pill: "bg-[#e7f8f0] text-[#0c7a4f]", chip: "bg-[#e7f8f0]", icon: "text-[#10a26a]", hover: "hover:border-[#bbf3da]" },
  teal: { pill: "bg-[#e6fafb] text-[#0a7680]", chip: "bg-[#e6fafb]", icon: "text-[#0d9aa6]", hover: "hover:border-[#bdf0f3]" },
  blue: { pill: "bg-[#eceefe] text-[#3f4fcf]", chip: "bg-[#eceefe]", icon: "text-[#5b6ef0]", hover: "hover:border-[#cdd3fb]" },
};

const TOP: Group[] = [
  {
    label: "入力のムダをなくす", tone: "green", items: [
      { Icon: ClipboardPaste, title: "コピペ/PDF登録", sub: "レインズ・SUUMOを貼るだけ" },
      { Icon: Mic, title: "通話録音・要約", sub: "電話メモも手入力ゼロ" },
    ],
  },
  {
    label: "契約まで取りこぼさない", tone: "blue", items: [
      { Icon: ClipboardCheck, title: "TODO・契約フェーズ", sub: "審査→決済まで管理" },
      { Icon: Calculator, title: "かんたん精算", sub: "固都税・管理費を自動計算" },
    ],
  },
];
const BOTTOM: Group = {
  label: "売れる相手を逃さない", tone: "teal", items: [
    { Icon: ArrowLeftRight, title: "双方向マッチング", sub: "顧客⇄物件を逆引き" },
    { Icon: Smartphone, title: "お客様連動アプリ", sub: "お客様の反応が逆流" },
    { Icon: Sparkles, title: "専属AI", sub: "顧客ごとに次の一手" },
  ],
};

const TOTAL = 7; // 出現アニメ用のカード総数

export default function FeatureHub() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState<string[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [vis, setVis] = useState<boolean[]>(() => Array(TOTAL).fill(false));
  const [linesShown, setLinesShown] = useState(false);

  // 接続線の計測（getBoundingClientRect でステージ基準。ネストした
  // positioned 要素があっても座標がズレない）
  const measure = useCallback(() => {
    const stage = stageRef.current, hub = hubRef.current;
    if (!stage || !hub) return;
    const sb = stage.getBoundingClientRect();
    const hb = hub.getBoundingClientRect();
    const hx = hb.left + hb.width / 2 - sb.left;
    const hy = hb.bottom - sb.top;
    const ps: string[] = [];
    stage.querySelectorAll<HTMLElement>("[data-node]").forEach((n) => {
      const r = n.getBoundingClientRect();
      const x = r.left + r.width / 2 - sb.left;
      const y = r.top - sb.top;
      const my = (hy + y) / 2;
      ps.push(`M ${hx} ${hy} C ${hx} ${my}, ${x} ${my}, ${x} ${y}`);
    });
    setPaths(ps);
    setSize({ w: stage.offsetWidth, h: stage.offsetHeight });
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [measure]);

  // 画面に入ったら1回だけ順番に出現
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setLinesShown(true);
        for (let i = 0; i < TOTAL; i++) {
          setTimeout(() => setVis((p) => { const n = [...p]; n[i] = true; return n; }), 120 + i * 90);
        }
        obs.disconnect();
      }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 lg:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
        <p className="text-sm font-semibold tracking-wider text-primary-600">ALL-IN-ONE</p>
        <h2 className="mt-3 text-[1.75rem] sm:text-4xl font-bold text-ink-900 sm:break-keep">
          月<span className="text-primary-600">¥3,000</span>で、これ全部。
        </h2>
        <p className="mt-3 text-ink-500 max-w-2xl mx-auto leading-relaxed">
          物件集めから契約・精算、お客様連動アプリまで。1本で、1人でも会社でも同額（税込）。
        </p>

        <div ref={stageRef} className="relative mx-auto mt-12 max-w-[900px]">
          {/* ハブ（ブランドアイコン） */}
          <div className="text-center">
            <div ref={hubRef} className="relative z-20 inline-flex flex-col items-center gap-1">
              <Image
                src="/icon-192.png" alt="楽マッチ AI" width={64} height={64} priority
                className="h-16 w-16 rounded-2xl shadow-lg"
              />
              <div className="mt-1.5 text-lg font-bold text-ink-900">楽マッチ AI</div>
              <div className="rounded-full border border-primary-100 bg-primary-50 px-3.5 py-1.5 text-sm font-bold text-primary-700">
                ¥3,000 <span className="font-semibold text-primary-600/90">/人・月（税込）</span>
              </div>
            </div>
          </div>

          {/* 接続線（PCのみ） */}
          <svg
            className="pointer-events-none absolute left-0 top-0 z-0 hidden md:block"
            width={size.w} height={size.h} aria-hidden="true"
          >
            {paths.map((d, i) => (
              <path
                key={i} d={d} fill="none" stroke="#CBD5E1" strokeWidth={1.5}
                className={`transition-opacity duration-700 ${linesShown ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </svg>

          {/* カード群 */}
          <div className="relative z-10">
            <div className="mt-8 flex flex-col items-center gap-6 md:flex-row md:items-start md:justify-center md:gap-10">
              {TOP.map((g, gi) => (
                <GroupBlock key={g.label} g={g} startIndex={gi * 2} vis={vis} />
              ))}
            </div>
            <div className="mt-8 flex justify-center md:mt-10">
              <GroupBlock g={BOTTOM} startIndex={4} vis={vis} />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <a
            href={`${APP_URL}/try`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-primary-700 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 motion-reduce:hover:scale-100"
          >
            無料で試す <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-2.5 text-xs text-ink-500">
            <span className="whitespace-nowrap">30秒で登録</span>・
            <span className="whitespace-nowrap">1週間無料</span>・
            <span className="whitespace-nowrap">いつでも解約可能</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function GroupBlock({ g, startIndex, vis }: { g: Group; startIndex: number; vis: boolean[] }) {
  return (
    <div className="flex w-full flex-col items-center gap-3 md:w-auto">
      <span className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold ${TONE[g.tone].pill}`}>
        {g.label}
      </span>
      <div className="flex w-full max-w-[360px] flex-col gap-3 md:max-w-none md:flex-row md:items-stretch md:gap-3">
        {g.items.map((it, i) => (
          <Card key={it.title} it={it} tone={g.tone} shown={vis[startIndex + i]} />
        ))}
      </div>
    </div>
  );
}

function Card({ it, tone, shown }: { it: Item; tone: Tone; shown: boolean }) {
  const { Icon } = it;
  const t = TONE[tone];
  return (
    <div
      data-node
      className={`group flex w-full items-center gap-3 rounded-2xl border border-surface-200 bg-white p-3.5 text-left shadow-sm transition-all duration-500 ease-out
        md:w-[172px] md:flex-col md:items-stretch md:gap-0 md:p-4 md:text-center
        hover:-translate-y-2 hover:shadow-xl ${t.hover}
        ${shown ? "opacity-100" : "opacity-0"}`}
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${t.chip} md:mx-auto md:mb-2`}>
        <Icon className={`h-5 w-5 ${t.icon}`} strokeWidth={1.7} />
      </div>
      <div>
        <div className="text-sm font-bold leading-snug text-ink-900 break-keep">{it.title}</div>
        <div className="mt-0.5 text-xs leading-snug text-ink-500 break-keep">{it.sub}</div>
      </div>
    </div>
  );
}
