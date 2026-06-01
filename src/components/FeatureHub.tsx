"use client";

// ============================================================
//  FeatureHub — 「¥3,000で、これ全部。」全部入りハブ図セクション
//
//  中央ハブ（楽マッチAI ¥3,000）から、7機能を3グループに分けて提示。
//  ・上段: 入力のムダをなくす / 契約まで取りこぼさない
//  ・下段: 売れる相手を逃さない（お客様連動アプリ＝堀を含む・主役）
//  ハブ→各カードへの接続線は offset 計測で描画（transform に影響されない）。
//  スクロールで画面に入ったら1回だけ順番に出現（スクロールは奪わない）。
//  配色はブランド（primary 緑 / accent ゴールド極細ライン / ink）に統一。
// ============================================================

import { useEffect, useRef, useState } from "react";
import {
  Home, ClipboardPaste, Mic, ClipboardCheck, Calculator,
  ArrowLeftRight, Smartphone, Sparkles, ArrowRight,
} from "lucide-react";

const APP_URL = "https://app.rakumatch-ai.com";

type PillKind = "soft" | "strong" | "gold";
type Item = { Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; title: string; sub: string };
type Group = { label: string; pill: PillKind; items: Item[] };

// 上段（左: 入力のムダ / 右: 契約取りこぼさない）
const TOP: Group[] = [
  {
    label: "入力のムダをなくす", pill: "soft", items: [
      { Icon: ClipboardPaste, title: "コピペ/PDF登録", sub: "レインズ・SUUMOを貼るだけ" },
      { Icon: Mic, title: "通話録音・要約", sub: "電話メモも手入力ゼロ" },
    ],
  },
  {
    label: "契約まで取りこぼさない", pill: "gold", items: [
      { Icon: ClipboardCheck, title: "TODO・契約フェーズ", sub: "審査→決済まで管理" },
      { Icon: Calculator, title: "かんたん精算", sub: "固都税・管理費を自動計算" },
    ],
  },
];
// 下段（主役）
const BOTTOM: Group = {
  label: "売れる相手を逃さない", pill: "strong", items: [
    { Icon: ArrowLeftRight, title: "双方向マッチング", sub: "顧客⇄物件を逆引き" },
    { Icon: Smartphone, title: "お客様連動アプリ", sub: "お客様の反応が逆流" },
    { Icon: Sparkles, title: "専属AI", sub: "顧客ごとに次の一手" },
  ],
};

const PILL: Record<PillKind, string> = {
  soft: "bg-primary-50 text-primary-700 border border-primary-100",
  strong: "bg-primary-500 text-white",
  gold: "bg-white text-ink-700 border border-accent-500",
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

  // 接続線の計測（offset ベース＝出現時の transform に影響されない）
  useEffect(() => {
    const stage = stageRef.current, hub = hubRef.current;
    if (!stage || !hub) return;
    const measure = () => {
      const nodes = stage.querySelectorAll<HTMLElement>("[data-node]");
      const hx = hub.offsetLeft + hub.offsetWidth / 2;
      const hy = hub.offsetTop + hub.offsetHeight;
      const ps: string[] = [];
      nodes.forEach((n) => {
        const x = n.offsetLeft + n.offsetWidth / 2;
        const y = n.offsetTop;
        const my = (hy + y) / 2;
        ps.push(`M ${hx} ${hy} C ${hx} ${my}, ${x} ${my}, ${x} ${y}`);
      });
      setPaths(ps);
      setSize({ w: stage.offsetWidth, h: stage.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

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
        <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-ink-900 break-keep">
          月<span className="text-primary-600">¥3,000</span>で、これ全部。
        </h2>
        <p className="mt-3 text-ink-500 max-w-2xl mx-auto leading-relaxed break-keep">
          物件集めから契約・精算、お客様連動アプリまで。1本で、1人でも会社でも同額（税込）。
        </p>

        <div ref={stageRef} className="relative mx-auto mt-12 max-w-[900px]">
          {/* ハブ */}
          <div className="text-center">
            <div ref={hubRef} className="relative z-20 inline-flex flex-col items-center gap-1">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500 shadow-lg shadow-primary-500/30">
                <Home className="h-8 w-8 text-white" strokeWidth={1.8} />
              </div>
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
                key={i} d={d} fill="none" stroke="#CCEBE1" strokeWidth={1.5}
                className={`transition-opacity duration-500 ${linesShown ? "opacity-100" : "opacity-0"}`}
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
            <div className="mt-8 flex justify-center md:mt-9">
              <GroupBlock g={BOTTOM} startIndex={4} vis={vis} />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <a
            href={`${APP_URL}/try`}
            className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-7 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-primary-600 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 motion-reduce:hover:scale-100"
          >
            無料で試す <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-2.5 text-xs text-ink-500">30秒で登録・1週間無料・いつでも解約可能</p>
        </div>
      </div>
    </section>
  );
}

function GroupBlock({ g, startIndex, vis }: { g: Group; startIndex: number; vis: boolean[] }) {
  return (
    <div className="flex w-full flex-col items-center gap-3 md:w-auto">
      <span className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-bold ${PILL[g.pill]}`}>
        {g.label}
      </span>
      <div className="flex w-full max-w-[340px] flex-col gap-3 md:max-w-none md:flex-row md:gap-3">
        {g.items.map((it, i) => (
          <Card key={it.title} it={it} shown={vis[startIndex + i]} />
        ))}
      </div>
    </div>
  );
}

function Card({ it, shown }: { it: Item; shown: boolean }) {
  const { Icon } = it;
  return (
    <div
      data-node
      className={`group flex w-full items-center gap-3 rounded-2xl border border-surface-200 bg-white p-3.5 text-left shadow-sm transition-all duration-500 ease-out
        md:w-[150px] md:flex-col md:items-stretch md:gap-0 md:p-4 md:text-center
        hover:-translate-y-2 hover:border-primary-200 hover:shadow-xl
        ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 md:mx-auto md:mb-2">
        <Icon className="h-5 w-5 text-primary-600" strokeWidth={1.7} />
      </div>
      <div>
        <div className="text-sm font-bold leading-snug text-ink-900">{it.title}</div>
        <div className="mt-0.5 text-xs leading-snug text-ink-500">{it.sub}</div>
      </div>
    </div>
  );
}
