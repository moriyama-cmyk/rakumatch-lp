'use client'

import type { ReactNode } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { Container } from '../ui/Container'
import { GlowButton } from '../ui/GlowButton'
import { GradientText } from '../ui/GradientText'
import { Reveal } from '../ui/Reveal'
import { AppShot } from '../ui/AppShot'
import { SITE } from '../site'
import { hlText } from '../lib/headline'
import { trackCta } from '@/lib/track'

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

          {/* 2. メインキャッチ（最大）。2026-07-18 コピーチーム選定（4書き手×3審査員ループ・8.7点）。
              旧「月3,000円で、月5万円のCRMに勝つ方法があります。」→ 価格はチップへ移設。 */}
          <Reveal delay={0.05}>
            {/*
              意味のまとまり（文節）ごとに whitespace-nowrap で包み、語の途中では絶対に
              折り返さない。改行はかたまりの境界でのみ起きる。
            */}
            <p className="mt-2.5 font-bold leading-[1.18] tracking-tight text-ink-900 [font-size:clamp(1.6rem,6.2vw,3.3rem)] sm:mt-3.5">
              <span className="inline-block whitespace-nowrap">
                <span className="text-accent-600">新人</span>でも、
              </span>
              <span className="inline-block whitespace-nowrap">
                <span className="text-accent-600">初日</span>から
              </span>
              <br className="hidden sm:block" />
              <span className="inline-block whitespace-nowrap">
                <GradientText className="text-primary-700">トップ営業マンの動き</GradientText>ができる。
              </span>
            </p>
          </Reveal>

          {/* 3. サブ行 */}
          <Reveal delay={0.1}>
            <p className="mx-auto mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-700 sm:mt-5 sm:text-lg">
              {hlText('誰に、何を出すか。')}
              <span className="whitespace-nowrap">— AIが先に決めています。</span>
            </p>
            <p className="mt-1.5 text-sm text-ink-600">
              {hlText('パソコンが苦手でも、大丈夫。操作は"貼るだけ"しかありません。')}
            </p>
          </Reveal>

          {/* 4. アンカリング（チップ3）。価格は見出しに統合したので重複表示はしない。 */}
          <Reveal delay={0.13}>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-6">
              <Chip>月3,000円/人</Chip>
              <Chip>初月1,500円〜</Chip>
              <Chip>導入費 0円</Chip>
            </div>
            <p className="mt-2 text-xs text-ink-500">※ 料金はすべて税込・1人あたりの月額です。</p>
          </Reveal>

          {/* 5. CTA */}
          <Reveal delay={0.16}>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row">
              <GlowButton
                href={SITE.ctaTryUrl}
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => trackCta('hero_primary')}
              >
                登録なしで、実物の画面を触る
                <ArrowRight className="h-5 w-5" />
              </GlowButton>
              <GlowButton
                href="#hub"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => trackCta('hero_secondary')}
              >
                <Play className="h-4 w-4" />
                {SITE.ctaSecondaryLabel}
              </GlowButton>
            </div>

            {/* 6. マイクロコピー（3行）。2026-07-19 事実誤り修正: デモ(登録・カード不要)とトライアル(カード必要・7日以内解約で無料)を混同しないよう分離。 */}
            <div className="mt-3 space-y-1 text-xs text-ink-500">
              <p>まずは登録なしで、実物の画面を触れます。連絡先も不要なので、営業の電話やメールが来ることもありません。</p>
              <p>気に入って有料機能を試すときだけ登録が必要ですが、7日以内に解約すれば料金は一切かかりません。</p>
              <p>合わなければ、そのまま離れるだけです。</p>
            </div>
          </Reveal>
        </div>

        {/* 実アプリ画面。ファーストビュー直下。
            最大の差別化「お客様連動アプリ」を1枚で伝えるため、営業のPC画面（主役・横長）に
            お客様のスマホ画面（お客様連動アプリ）を右下へ重ねた合成ビジュアルにしている。
            スマホ幅では重ね配置が破綻するので、モバイルはPCを主役に据えつつスマホを右下へ
            小さく縦積み（overflowを出さない）。 */}
        <Reveal delay={0.18}>
          <div className="relative mx-auto mt-10 max-w-5xl sm:mt-14">
            {/* PC（営業の画面・主役） */}
            <AppShot
              base="/shot-top-hero"
              alt="顧客情報とAI提案が一画面に並ぶ楽マッチ AI（PC画面）"
              width={1920}
              height={1080}
              priority
              chrome
            />

            {/* スマホ（お客様連動アプリ）。モバイル=PC直下に右寄せで少し重ねて縦積み。
                sm以上=PC画面の右下へ絶対配置で手前に重ねる。 */}
            <div className="relative z-10 -mt-12 ml-auto mr-1 w-[40%] max-w-[168px] sm:absolute sm:bottom-1 sm:-right-2 sm:m-0 sm:w-[30%] sm:max-w-[224px]">
              <div className="overflow-hidden rounded-[1.6rem] border-[5px] border-ink-900 bg-ink-900 shadow-soft-lg ring-1 ring-black/10">
                <picture>
                  <source srcSet="/shot-customer-app-list.webp" type="image/webp" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/shot-customer-app-list.opt.jpg"
                    alt="お客様がスマホで保存した物件が営業に届く、お客様連動アプリ"
                    width={868}
                    height={1887}
                    loading="eager"
                    decoding="async"
                    className="block h-auto w-full rounded-[1.2rem]"
                  />
                </picture>
              </div>
            </div>
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
