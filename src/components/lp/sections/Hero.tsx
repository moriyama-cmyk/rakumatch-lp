'use client'

import type { ReactNode } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { Container } from '../ui/Container'
import { GlowButton } from '../ui/GlowButton'
import { GradientText } from '../ui/GradientText'
import { Reveal } from '../ui/Reveal'
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
          {/* 1. カテゴリ行（H1でSEOキーワードを保持しつつ、エヤブロウとして小さめに）。
              2026-07-19 デザイン改修: ファーストビューのLCP要素のためRevealのopacity-0/transformを撤去し素のdivに。 */}
          <div>
            <h1 className="font-bold tracking-tight text-primary-700 [font-size:clamp(0.95rem,3.6vw,1.45rem)]">
              {SITE.categoryLine}
            </h1>
          </div>

          {/* 2. メインキャッチ（最大）。2026-07-18 コピーチーム選定（4書き手×3審査員ループ・8.7点）。
              旧「月3,000円で、月5万円のCRMに勝つ方法があります。」→ 価格はチップへ移設。
              2026-07-19 デザイン改修: Revealを撤去し素のdivに（LCP要素・主従回復のためclamp値も引き上げ）。 */}
          <div>
            {/*
              意味のまとまり（文節）ごとに whitespace-nowrap で包み、語の途中では絶対に
              折り返さない。改行はかたまりの境界でのみ起きる。
            */}
            {/* 2026-07-19 デザイン改修の是正: clamp下限を 2.125rem(34px) まで上げたところ、
                375px 幅で「トップ営業マンの動きができる。」(13字)を1つの nowrap で包んでいたため
                右端で見切れた。下限を 1.9rem(≈30.4px・最長かたまり10字=304px<343px)に戻し、
                かたまりを「〜の動き」「ができる。」の2つに割って折り返せるようにする。 */}
            <p className="mt-2.5 font-bold leading-[1.16] tracking-[-0.005em] text-ink-900 [font-size:clamp(1.9rem,6.4vw,4rem)] sm:mt-3.5">
              <span className="inline-block whitespace-nowrap">
                <span className="text-accent-600">新人</span>でも、
              </span>
              <span className="inline-block whitespace-nowrap">
                <span className="text-accent-600">初日</span>から
              </span>
              <br className="hidden sm:block" />
              <span className="inline-block whitespace-nowrap">
                <GradientText className="text-primary-700">トップ営業マンの動き</GradientText>
              </span>
              <span className="inline-block whitespace-nowrap">ができる。</span>
            </p>
          </div>

          {/* 3. サブ行 */}
          <Reveal delay={0.1}>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink-700 sm:mt-5 sm:text-lg">
              {hlText('誰に、何を出すか。')}
              <span className="whitespace-nowrap">— AIが先に決めています。</span>
            </p>
            <p className="mt-1.5 text-sm text-ink-500">
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

            {/* 6. マイクロコピー（3行）。2026-07-19 事実誤り修正: デモ(登録・カード不要)とトライアル(カード必要・7日以内解約で無料)を混同しないよう分離。
                同日デザイン改修: 横幅を絞って画像を押し下げる重さを軽減。 */}
            <div className="mx-auto mt-4 max-w-xl space-y-1 text-xs text-ink-500">
              <p>まずは登録なしで、実物の画面を触れます。連絡先も不要なので、営業の電話やメールが来ることもありません。</p>
              <p>気に入って有料機能を試すときだけ登録が必要ですが、7日以内に解約すれば料金は一切かかりません。</p>
              <p>合わなければ、そのまま離れるだけです。</p>
            </div>
          </Reveal>
        </div>

        {/* 実アプリ画面。ファーストビュー直下。
            最大の差別化「お客様連動アプリ」を1枚で伝えるため、営業のノートPC画面（主役）と
            お客様のスマホ画面（お客様連動アプリ）を"横に並べた"デバイス・モックにしている。
            ノートPCは CSS で本体（キーボード面/ヒンジ）を薄く足し「パソコンを開いている感じ」を、
            スマホはノートPCの右横に立てて「同じ楽マッチをPCとスマホで＝連動」を一目で伝える。
            sm未満（スマホ幅）は横並びが破綻するので、ノートPCを上・スマホをその下へ縦積みし、
            横スクロールを出さない（section の overflow-x-clip と併用）。
            2026-07-19 デザイン改修: Revealを撤去し素のdivに（ファーストビュー内・opacity-0を出さない）。 */}
        <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center gap-7 sm:mt-14 sm:flex-row sm:items-end sm:justify-center sm:gap-6">
          {/* ノートPC（営業の画面・主役）。画面はノートPC風の暗色ベゼルで額装し、
              その下に本体（キーボード面/ヒンジ）を思わせる薄い台形バーを CSS で追加。 */}
          <div className="w-full max-w-[560px] sm:min-w-0 sm:flex-1">
            {/* 画面（ディスプレイ）。ブラウザchromeは付けず、ノートPCの縁取りで額装。 */}
            <div className="mx-[3.5%] rounded-t-[0.7rem] rounded-b-sm border-[6px] border-b-[9px] border-ink-900 bg-ink-900 shadow-soft-lg">
              <div className="overflow-hidden rounded-[0.28rem]">
                <picture>
                  <source srcSet="/shot-top-hero.webp" type="image/webp" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/shot-top-hero.opt.jpg"
                    alt="顧客情報とAI提案が一画面に並ぶ楽マッチ AI（PC画面）"
                    width={1920}
                    height={1080}
                    loading="eager"
                    decoding="async"
                    className="block h-auto w-full"
                  />
                </picture>
              </div>
            </div>
            {/* 本体（キーボード面/ヒンジ）。画面より少し広い薄い台形。装飾は控えめ。 */}
            <div
              className="relative -mt-px h-3.5 w-full rounded-b-lg bg-gradient-to-b from-ink-700 to-ink-900 shadow-soft sm:h-4"
              style={{ clipPath: 'polygon(3% 0, 97% 0, 100% 100%, 0 100%)' }}
              aria-hidden="true"
            >
              {/* ヒンジ（中央のくぼみ） */}
              <div className="absolute left-1/2 top-0 h-1 w-1/5 max-w-[96px] -translate-x-1/2 rounded-b-md bg-black/25" />
            </div>
          </div>

          {/* スマホ（お客様連動アプリ）。sm以上=ノートPCの右横に立てて並べる（重ねない）。
              sm未満=ノートPCの下へ中サイズで縦積み。 */}
          <div className="w-[54%] max-w-[188px] sm:w-[200px] sm:flex-none sm:max-w-[200px]">
            <div className="overflow-hidden rounded-[1.5rem] border-[5px] border-ink-900 bg-ink-900 shadow-soft-lg ring-1 ring-ink-900/8">
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
                  className="block h-auto w-full rounded-[1.1rem]"
                />
              </picture>
            </div>
          </div>
        </div>

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
    <span className="inline-flex items-center gap-1 rounded-md border border-primary-200 bg-white px-3 py-1 text-xs font-bold text-primary-700 sm:text-sm">
      {children}
    </span>
  )
}
