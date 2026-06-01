import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import FadeIn from "@/components/FadeIn";

const APP_URL = "https://app.rakumatch-ai.com";

export interface FeatureCTAProps {
  /** 見出し（既定: まず触ってみてください。説明は不要です。） */
  title?: ReactNode;
  /** CTA 文言 */
  ctaLabel: string;
  /** CTA 遷移先（既定: signup） */
  ctaHref?: string;
  /** マイクロコピー（既定: 1週間無料トライアル・いつでも解約可能） */
  microcopy?: string;
}

/**
 * FeatureCTA — 末尾の濃色フィナーレ CTA（無料トライアル誘導）。
 * DESIGN_SYSTEM §5 / ART_DIRECTION §2: bg-primary-900・白文字・rounded-3xl。1ページ1回。
 * ボタンは白地 bg-white text-primary-700。
 */
export default function FeatureCTA({
  title = "まず触ってみてください。説明は不要です。",
  ctaLabel,
  ctaHref = `${APP_URL}/try`,
  microcopy = "1週間無料トライアル・いつでも解約可能",
}: FeatureCTAProps) {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <FadeIn>
          <div className="rounded-3xl bg-primary-900 px-8 py-16 text-center text-white sm:px-16 sm:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-snug tracking-tight sm:text-4xl">
              {title}
            </h2>
            <div className="mt-8">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-semibold text-primary-700 shadow-sm transition hover:bg-surface-50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-4 text-sm text-primary-100">{microcopy}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
