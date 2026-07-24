'use client'

import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { GradientText } from '../ui/GradientText'
import { GlowButton } from '../ui/GlowButton'
import { SITE, PLANS } from '../site'
import type { Plan } from '../site'
import { hl } from '../lib/headline'
import { trackCta } from '@/lib/track'

const STEPS = [
  { step: '①', label: '触る', note: '0円（登録なし）' },
  { step: '②', label: '7日試す', note: '0円（7日以内解約で無料）' },
  { step: '③', label: '初月', note: '1,500円（Standard）' },
  { step: '④', label: '月3,000円/人', note: '' },
]

const PROMISES = [
  '7日以内に解約すれば、料金は一切かかりません。引き止めの電話もメールもしません。',
  '契約後も、違約金・最低利用期間はありません。',
  '解約はいつでもStripeの管理画面から、ご自身で行えます。',
]

const COMMON_FEATURES = [
  '双方マッチング・逆引き',
  'お客様連動アプリ',
  '顧客・物件の専属AI',
  '通話録音・文字起こし・要約',
  'TODO・契約・ダッシュボード・精算',
]

/** 料金（CTA中心。実額表示＋AI利用枠で差を示す）。ライト。 */
export function Pricing() {
  return (
    <Section id="pricing" className="bg-white border-t-2 border-primary-600/20" spacing="xl">
      <Container narrow>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>料金</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display-lg text-ink-900">
              {hl(<GradientText variant="gold">月々たったの3,000円</GradientText>, 'から。')}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-2 text-sm font-bold text-ink-700">（税込）/ 人・月　※個人でも会社でも同じ料金</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base text-ink-700 sm:mt-6">
              2プランの人数課金・初月割引あり。プランの違いはAIの利用枠です（AIの品質はどちらも同じ）。まずは無料で、中身を触ってから選べます。
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-3 inline-flex flex-wrap items-center justify-center gap-x-1.5 text-sm font-bold text-primary-700">
              <span className="whitespace-nowrap">1週間の無料トライアル付き</span>・
              <span className="whitespace-nowrap">初月割引あり</span>・
              <span className="whitespace-nowrap">いつでも解約可能。</span>
            </p>
          </Reveal>
        </div>

        {/* 4段の階段→一直線＋矢印に変更（2026-07-19 森山さん指摘: 段差だと①②が0円ゾーンの
            枠に入っている分だけ基準線がずれて不揃いに見える）。
            全カラムに同じ高さのラベル行を確保（0円ゾーンのみ可視・他は同サイズの不可視プレースホルダ）
            することで、translate-y のズラしなしに4枚が同じ基準線に並ぶ。矢印で進行だけを示す。 */}
        <Reveal delay={0.14}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-stretch sm:justify-center sm:gap-3">
            <div className="flex flex-1 flex-col items-center gap-2 sm:flex-initial">
              <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-bold tracking-wide text-primary-700">
                0円ゾーン
              </span>
              <div className="flex flex-1 flex-row items-stretch gap-2 rounded-xl border border-primary-200 bg-primary-50 p-3">
                <StepCard {...STEPS[0]} />
                <StepCard {...STEPS[1]} />
              </div>
            </div>

            <StepArrow />
            <div className="flex flex-1 flex-col items-center gap-2 sm:flex-initial">
              {/* 2026-07-24 修正: invisible要素はモバイル縦積みでも高さを占有し約28pxの
                  幽霊余白になっていた。sm未満はhiddenで高さごと消し、sm以上のみinvisibleで
                  基準線合わせ（0円ゾーンのラベル行と高さを揃える）を有効にする。 */}
              <span aria-hidden="true" className="hidden rounded-full px-3 py-1 text-xs font-bold sm:invisible sm:block">
                spacer
              </span>
              <div className="flex flex-1 items-stretch p-3">
                <StepCard {...STEPS[2]} />
              </div>
            </div>

            <StepArrow />
            <div className="flex flex-1 flex-col items-center gap-2 sm:flex-initial">
              {/* 2026-07-24 修正: invisible要素はモバイル縦積みでも高さを占有し約28pxの
                  幽霊余白になっていた。sm未満はhiddenで高さごと消し、sm以上のみinvisibleで
                  基準線合わせ（0円ゾーンのラベル行と高さを揃える）を有効にする。 */}
              <span aria-hidden="true" className="hidden rounded-full px-3 py-1 text-xs font-bold sm:invisible sm:block">
                spacer
              </span>
              <div className="flex flex-1 items-stretch p-3">
                <StepCard {...STEPS[3]} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* 私たちの約束 */}
        <Reveal delay={0.17}>
          <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-surface-200 bg-white p-6 sm:p-7">
            <p className="text-sm font-bold text-primary-700">私たちの約束</p>
            <ul className="mt-3 space-y-2.5">
              {PROMISES.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={3} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:mt-20 sm:grid-cols-2">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <PlanCard plan={p} highlight={i === 1} />
            </Reveal>
          ))}
        </div>

        {/* 各プランカードに「無料で試す」があるため、直後の重複ボタンは撤去。マイクロコピーのみ残す。 */}
        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-xs text-ink-500">{SITE.microCopy}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-xs leading-relaxed text-ink-500">
            ※ 料金は税込・人数課金です（初月割引あり）。詳細は特定商取引法に基づく表記をご確認ください。
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

function PlanCard({ plan, highlight }: { plan: Plan; highlight?: boolean }) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-xl border p-7 sm:p-8 ${
        highlight ? 'border-primary-600 bg-primary-50' : 'border-surface-200 bg-surface-50'
      }`}
    >
      {highlight && (
        <span className="absolute right-6 top-6 rounded-md bg-primary-600 px-3 py-1 text-xs font-bold text-white">
          たっぷり
        </span>
      )}
      <p className="text-lg font-bold text-ink-900">{plan.name}</p>
      <p className="mt-1 text-sm text-ink-500">{plan.tagline}</p>

      {/* 実額を大きく（ゴールド）＋単位。AI利用枠は補助チップで併記 */}
      <div className="mt-5">
        <p className="flex items-end gap-1.5">
          <span className="text-5xl font-bold tracking-[-0.01em] tabular-nums text-accent-600 sm:text-6xl">
            {plan.price}
          </span>
          <span className="mb-1.5 text-sm font-medium text-ink-500">{plan.unit}</span>
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-surface-200 bg-white px-3 py-1 text-xs font-medium text-ink-700">
          <Sparkles className="h-3.5 w-3.5 text-primary-600" />
          AI利用枠：{plan.quota}
        </span>
      </div>

      <ul className="mt-6 flex-1 space-y-2.5">
        {COMMON_FEATURES.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={3} />
            <span className="text-sm text-ink-700">{f}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-xs leading-relaxed text-ink-500">
        税込・1人あたり月額。人数課金・初月割引あり。
      </p>

      <GlowButton
        href={SITE.ctaTryUrl}
        variant={highlight ? 'primary' : 'secondary'}
        className="mt-5 w-full"
        onClick={() => trackCta(highlight ? 'pricing_premium' : 'pricing_standard')}
      >
        無料で試す
        <ArrowRight className="h-4 w-4" />
      </GlowButton>
    </div>
  )
}

function StepCard({ step, label, note }: { step: string; label: string; note?: string }) {
  return (
    <div className="flex min-h-[92px] min-w-[7rem] flex-col items-center justify-center rounded-xl border border-surface-200 bg-white px-4 py-3 text-center hover:shadow-soft transition-shadow duration-200">
      <span className="text-xs font-bold text-primary-600">{step}</span>
      <span className="mt-1 text-sm font-bold text-ink-900">{label}</span>
      {note && <span className="mt-0.5 text-xs text-ink-500">{note}</span>}
    </div>
  )
}

function StepArrow() {
  return <ArrowRight className="h-4 w-4 shrink-0 self-center rotate-90 text-ink-300 sm:rotate-0" aria-hidden />
}
