import type { ReactNode } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { Container } from '../ui/Container'
import { GlowButton } from '../ui/GlowButton'
import { GradientText } from '../ui/GradientText'
import { Reveal } from '../ui/Reveal'
import { AppShot } from '../ui/AppShot'
import { SITE } from '../site'
import { hlText } from '../lib/headline'

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
          {/* 1. カテゴリ行（H1でSEOキーワードを保持しつつ、エヤブロウとして小さめに） */}
          <Reveal>
            <h1 className="font-bold tracking-tight text-primary-700 [font-size:clamp(0.95rem,3.6vw,1.45rem)]">
              {SITE.categoryLine}
            </h1>
          </Reveal>

          {/* 2. メインキャッチ（最大・森山さん指定）。金額を強調し、価格はここに統合。 */}
          <Reveal delay={0.05}>
            {/*
              意味のまとまり（文節）ごとに whitespace-nowrap で包み、語の途中では絶対に
              折り返さない。「月5万円」が「月5／万円」に割れる・「勝つ方法」が割れるのを防ぐ。
              text-balance は外す（幅が余っていても短く均してしまい「なぜここで折り返す？」に
              見えるため）。改行は3つのかたまりの境界でのみ起きる。
            */}
            <p className="mt-2.5 font-bold leading-[1.18] tracking-tight text-ink-900 [font-size:clamp(1.75rem,7vw,3.6rem)] sm:mt-3.5">
              <span className="inline-block whitespace-nowrap">
                <span className="text-accent-600">月3,000円</span>で、
              </span>
              <span className="inline-block whitespace-nowrap">
                <span className="text-accent-600">月5万円</span>のCRMに
              </span>
              <span className="inline-block whitespace-nowrap">
                <GradientText className="text-primary-700">勝つ方法</GradientText>があります。
              </span>
            </p>
          </Reveal>

          {/* 3. サブ行 */}
          <Reveal delay={0.1}>
            <p className="mx-auto mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-700 sm:mt-5 sm:text-lg">
              {hlText('このお客様に、何を。この物件を、誰に。')}
              <span className="whitespace-nowrap">— AIが両方から答えます。</span>
            </p>
          </Reveal>

          {/* 4. アンカリング（チップ2）。価格は見出しに統合したので重複表示はしない。 */}
          <Reveal delay={0.13}>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-6">
              <Chip>導入費 0円</Chip>
              <Chip>高額なAPI連携 0円</Chip>
            </div>
            <p className="mt-2 text-xs text-ink-500">※ 料金はすべて税込・1人あたりの月額です。</p>
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
