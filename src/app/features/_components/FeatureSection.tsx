import type { ReactNode } from "react";
import FadeIn from "@/components/FadeIn";

export interface FeatureSectionProps {
  /** エヤブロウ（H2 上の小ラベル・任意） */
  eyebrow?: string;
  /** セクション見出し（H2） */
  title?: ReactNode;
  /** リード文（任意） */
  lead?: ReactNode;
  /** 本体 */
  children: ReactNode;
  /** 背景。ART_DIRECTION §3: white ↔ surface-50 交互。沈める帯は surface-100 */
  background?: "white" | "surface-50" | "surface-100";
  /** 見出しを中央寄せにするか（既定: 左寄せ） */
  center?: boolean;
  /** id（ページ内アンカー用・任意） */
  id?: string;
}

const bgClass: Record<NonNullable<FeatureSectionProps["background"]>, string> = {
  white: "bg-white",
  "surface-50": "bg-surface-50",
  "surface-100": "bg-surface-100",
};

/**
 * FeatureSection — /features/* 共通セクション枠。
 * DESIGN_SYSTEM §4: 縦 py-20 sm:py-28 lg:py-32、コンテナ max-w-6xl px-6 sm:px-8。
 * エヤブロウ→H2→Lead は space-y-4、見出しブロックと本体は mt-12 lg:mt-16。
 */
export default function FeatureSection({
  eyebrow,
  title,
  lead,
  children,
  background = "white",
  center = false,
  id,
}: FeatureSectionProps) {
  const hasHeader = Boolean(eyebrow || title || lead);

  return (
    <section id={id} className={`${bgClass[background]} py-20 sm:py-28 lg:py-32`}>
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        {hasHeader && (
          <FadeIn>
            <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
              {eyebrow && (
                <p className="text-sm font-semibold tracking-wider text-primary-600">
                  {eyebrow}
                </p>
              )}
              {title && (
                <h2 className="mt-3 text-3xl font-bold leading-snug tracking-tight text-ink-900 sm:text-4xl">
                  {title}
                </h2>
              )}
              {lead && (
                <p className="mt-4 text-lg leading-relaxed text-ink-700">{lead}</p>
              )}
            </div>
          </FadeIn>
        )}
        <div className={hasHeader ? "mt-12 lg:mt-16" : undefined}>{children}</div>
      </div>
    </section>
  );
}
