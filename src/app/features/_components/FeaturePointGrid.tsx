import type { LucideIcon } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export interface FeaturePoint {
  icon: LucideIcon;
  title: string;
  desc: string;
  /** 任意の補足（※注記等・小さく表示） */
  note?: string;
  /** お客様の得 / 担当者の得 などのラベル（任意・差し色バッジ） */
  tag?: string;
}

/**
 * FeaturePointGrid — 要点カード群（特徴グリッド）。
 * DESIGN_SYSTEM §5 カード ＋ §4 グリッド（sm:2 / lg:3 カラム）。
 * カードは「アイコン丸 → H3 → 本文」。ホバーは微浮上＋緑の極薄シャドウ。
 */
export default function FeaturePointGrid({
  points,
  columns = 3,
}: {
  points: FeaturePoint[];
  columns?: 2 | 3;
}) {
  const gridCols =
    columns === 2
      ? "sm:grid-cols-2"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-6 lg:gap-8 ${gridCols}`}>
      {points.map((p) => (
        <FadeIn key={p.title} className="h-full">
          <div className="group flex h-full flex-col rounded-2xl border border-surface-200 bg-white p-6 transition hover:border-primary-200 hover:shadow-[0_8px_30px_rgba(13,124,102,0.06)] motion-reduce:transition-none lg:p-8">
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <p.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            {p.tag && (
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
                {p.tag}
              </span>
            )}
            <h3 className="text-xl font-semibold leading-snug text-ink-900">
              {p.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              {p.desc}
            </p>
            {p.note && (
              <p className="mt-3 text-sm leading-relaxed text-ink-500">{p.note}</p>
            )}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
