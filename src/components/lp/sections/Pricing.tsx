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
    <Section id="pricing" className="bg-white" spacing="lg">
      <Container narrow>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>料金</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-display-lg text-ink-900">
              {hl(<GradientText variant="gold">月々たったの3,000円</GradientText>, 'から。')}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-2 text-sm font-bold text-ink-700">（税込）/ 人・月　※個人でも会社でも同じ料金</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base text-ink-700">
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

        {/* 4段の階段。①②=0円ゾーン(緑の帯で囲む)→③→④が右肩上がりに高くなる。
            モバイルは縦積み(崩れ防止)、sm以上でtranslate-yによる実際の段差を付ける。 */}
        <Reveal delay={0.14}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:items-end sm:justify-center sm:gap-3">
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-primary-200 bg-primary-50 p-3">
              <span className="text-[10px] font-bold tracking-wide text-primary-700">0円ゾーン</span>
              <div className="flex flex-row gap-2">
                <StepCard {...STEPS[0]} />
                <StepCard {...STEPS[1]} />
              </div>
            </div>

            <StepArrow />
            <div className="sm:-translate-y-3.5">
              <StepCard {...STEPS[2]} />
            </div>

            <StepArrow />
            <div className="sm:-translate-y-7">
              <StepCard {...STEPS[3]} />
            </div>
          </div>
        </Reveal>

        {/* 私たちの約束 */}
        <Reveal delay={0.17}>
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-surface-200 bg-white p-6 shadow-soft sm:p-7">
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
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
      className={`relative flex h-full flex-col rounded-2xl border p-7 shadow-soft sm:p-8 ${
        highlight ? 'border-primary-300 bg-primary-50' : 'border-surface-200 bg-surface-50'
      }`}
    >
      {highlight && (
        <span className="absolute right-6 top-6 rounded-full bg-primary-600 px-3 py-1 text-[0.65rem] font-bold text-white">
          たっぷり
        </span>
      )}
      <p className="text-lg font-bold text-ink-900">{plan.name}</p>
      <p className="mt-1 text-sm text-ink-500">{plan.tagline}</p>

      {/* 実額を大きく（ゴールド）＋単位。AI利用枠は補助チップで併記 */}
      <div className="mt-5">
        <p className="flex items-end gap-1.5">
          <span className="text-4xl font-bold tracking-tight text-accent-600 sm:text-5xl">
            {plan.price}
          </span>
          <span className="mb-1.5 text-sm font-medium text-ink-500">{plan.unit}</span>
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-surface-200 bg-white px-3 py-1 text-xs font-medium text-ink-700">
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

      <p className="mt-5 text-[0.7rem] leading-relaxed text-ink-500">
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
    <div className="flex min-w-[7rem] flex-col items-center rounded-2xl border border-surface-200 bg-white px-4 py-3 text-center shadow-soft">
      <span className="text-xs font-bold text-primary-600">{step}</span>
      <span className="mt-1 text-sm font-bold text-ink-900">{label}</span>
      {note && <span className="mt-0.5 text-xs text-ink-500">{note}</span>}
    </div>
  )
}

function StepArrow() {
  return <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-ink-300 sm:rotate-0" aria-hidden />
}
