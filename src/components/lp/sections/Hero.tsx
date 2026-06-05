import type { ReactNode } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { Container } from '../ui/Container'
import { GlowButton } from '../ui/GlowButton'
import { GradientText } from '../ui/GradientText'
import { Reveal } from '../ui/Reveal'
import { AppShot } from '../ui/AppShot'
import { SITE } from '../site'

/**
 * ファーストビュー（1スクリーン縦積み）。
 * 上から: カテゴリ行（最重要・特大）→ メインキャッチ → サブ → アンカリング（チップ2＋価格）
 * → CTA → マイクロコピー。スマホ375pxで6要素が1画面に収まる高さに。
 * 実アプリ画面はファーストビュー直下に配置。
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-x-clip bg-fade-primary pb-14 pt-24 sm:pb-24 sm:pt-36"
    >
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* 1. 超特大カテゴリ行（H1級・最重要） */}
          <Reveal>
            <h1 className="text-balance font-bold leading-[1.08] tracking-tight text-ink-900 [font-size:clamp(2rem,8vw,4.25rem)]">
              {SITE.categoryLine}
            </h1>
          </Reveal>

          {/* 2. メインキャッチ */}
          <Reveal delay={0.05}>
            <p className="mt-3 text-balance font-bold leading-[1.18] tracking-tight text-ink-900 [font-size:clamp(1.35rem,5vw,2.4rem)] sm:mt-5">
              今いる顧客のままで、
              <GradientText className="text-primary-700">売上が変わる。</GradientText>
            </p>
          </Reveal>

          {/* 3. サブ行 */}
          <Reveal delay={0.1}>
            <p className="mx-auto mt-3 max-w-2xl text-balance text-[0.95rem] leading-relaxed text-ink-700 sm:mt-5 sm:text-lg">
              このお客様に、何を。この物件を、誰に。
              <span className="whitespace-nowrap">— AIが両方から答えます。</span>
            </p>
          </Reveal>

          {/* 4. アンカリング（チップ2＋価格） */}
          <Reveal delay={0.13}>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-6">
              <Chip>導入費 0円</Chip>
              <Chip>高額なAPI連携 0円</Chip>
            </div>
            <p className="mt-2.5 inline-flex flex-wrap items-baseline justify-center gap-x-1.5 gap-y-1">
              <span className="text-sm font-medium text-ink-700">月々たったの</span>
              <span className="text-3xl font-bold tracking-tight text-accent-600 sm:text-4xl">
                3,000円
              </span>
              <span className="text-sm font-medium text-ink-700">（税込）/ 人 から</span>
            </p>
          </Reveal>

          {/* 5. CTA */}
          <Reveal delay={0.16}>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row">
              <GlowButton href={SITE.ctaTryUrl} size="lg" className="w-full sm:w-auto">
                {SITE.ctaPrimaryLabel}
                <ArrowRight className="h-5 w-5" />
              </GlowButton>
              <GlowButton href="#hub" variant="secondary" size="lg" className="w-full sm:w-auto">
                <Play className="h-4 w-4" />
                {SITE.ctaSecondaryLabel}
              </GlowButton>
            </div>

            {/* 6. マイクロコピー */}
            <p className="mt-3 text-xs text-ink-500">{SITE.microCopy}</p>
          </Reveal>
        </div>

        {/* 実アプリ画面（顧客に100%マッチ2件の実画面）。ファーストビュー直下。 */}
        <Reveal delay={0.18}>
          <div className="mx-auto mt-10 max-w-5xl sm:mt-14">
            <AppShot
              base="/shot-hero-matching"
              alt="お客様の希望条件に100%マッチした物件をAIが提示している楽マッチ AI の画面"
              width={1600}
              height={713}
              priority
              chrome
            />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-ink-500">
            ※ マッチングの点数や各種試算は、営業判断を助けるための目安です。
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

/** アンカリング用の小チップ（白地・緑枠）。 */
function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-primary-200 bg-white px-3 py-1 text-xs font-bold text-primary-700 shadow-soft sm:text-sm">
      {children}
    </span>
  )
}
