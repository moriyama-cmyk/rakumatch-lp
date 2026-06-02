import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import FeatureBreadcrumb, { type Crumb } from "./FeatureBreadcrumb";

const APP_URL = "https://app.rakumatch-ai.com";

export interface FeatureHeroProps {
  /** エヤブロウ（H1上の小ラベル・機能カテゴリ） */
  eyebrow: string;
  /** H1（機能名＋ベネフィット） */
  title: ReactNode;
  /** リード文（1〜2文） */
  lead: ReactNode;
  /** サブ（相対表現の差別化コピー等・任意） */
  sub?: ReactNode;
  /** パンくず（視覚＋JSON-LD） */
  breadcrumb: Crumb[];
  /** 主CTAの文言（既定: 1週間無料で試してみる） */
  ctaLabel?: string;
  /** 主CTAの遷移先（既定: signup） */
  ctaHref?: string;
  /** 右側のメディア（スクショ額装等・任意） */
  media?: ReactNode;
}

/**
 * FeatureHero — /features/* 共通ヒーロー。
 * ART_DIRECTION §8.1: features のヒーローはトップより控えめ（H1 は text-3xl sm:text-5xl）。
 * 背景は bg-white、淡い primary-50 のぼかし円を1つだけ。
 */
export default function FeatureHero({
  eyebrow,
  title,
  lead,
  sub,
  breadcrumb,
  ctaLabel = "1週間無料で試してみる",
  ctaHref = `${APP_URL}/try`,
  media,
}: FeatureHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] -translate-y-1/3 translate-x-1/4 rounded-full bg-primary-50 opacity-60 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24 lg:py-32">
        <FeatureBreadcrumb items={breadcrumb} />

        <div
          className={
            media
              ? "mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
              : "mt-10 max-w-3xl"
          }
        >
          <div>
            <p className="text-sm font-semibold tracking-wider text-primary-600">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-[1.15] tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-700">
              {lead}
            </p>
            {sub && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-500">
                {sub}
              </p>
            )}
            <div className="mt-8">
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-primary-700 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 motion-reduce:transition-none"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                30秒で登録完了・1週間無料トライアル・いつでも解約可能
              </p>
            </div>
          </div>

          {media && <div className="relative">{media}</div>}
        </div>
      </div>
    </section>
  );
}
