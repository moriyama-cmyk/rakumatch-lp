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
