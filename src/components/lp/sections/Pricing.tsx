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

// 2026-07-24 Phase3（森山さん指摘「わかりづらすぎ」対応）: ①〜④の抽象ステップを
// 「きょう→初月→2か月目〜」の時間軸3段に組み替え。読み手の疑問は「結局いつ・いくら払うのか」
// なので、段の名前を時間、段の主役を金額にする。デモ(登録なし)とトライアル(7日以内解約で0円)の
// 法的に大事な区別は、きょう欄の注記2行で正確に保つ。
const STAGES = [
  {
    stage: 'きょう',
    price: '0円',
    notes: ['登録なしで、実物の画面を触れる', '7日間トライアルも、期間内解約なら0円'],
    highlight: true,
  },
  { stage: '初月', price: '1,500円', notes: ['スタンダードの初月割引'], highlight: false },
  { stage: '2か月目〜', price: '月3,000円/人', notes: ['税込・いつでも解約できます'], highlight: false },
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
    <Section id="pricing" className="bg-surface-100 border-t-2 border-primary-600/20" spacing="xl">
      <Container narrow>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>料金</Badge>
            <h2 className="mt-4 text-display-lg text-ink-900">
              {hl(<GradientText variant="gold">月々たったの3,000円</GradientText>, 'から。')}
            </h2>
            <p className="mt-2 text-sm font-bold text-ink-700">（税込）/ 人・月　※個人でも会社でも同じ料金</p>
            <p className="mx-auto mt-5 max-w-xl text-base text-ink-700 sm:mt-6">
              2プランの人数課金・初月割引あり。プランの違いはAIの利用枠です（AIの品質はどちらも同じ）。まずは無料で、中身を触ってから選べます。
            </p>
            <p className="mx-auto mt-3 inline-flex flex-wrap items-center justify-center gap-x-1.5 text-sm font-bold text-primary-700">
              <span className="whitespace-nowrap">1週間の無料トライアル付き</span>・
              <span className="whitespace-nowrap">初月割引あり</span>・
              <span className="whitespace-nowrap">いつでも解約可能。</span>
            </p>
          </Reveal>
        </div>

        {/* 時間軸3段（きょう→初月→2か月目〜）。0円ゾーンの括り枠・spacerハックは全廃し、
            3枚を素直に等高で並べる。強調は「きょう=0円」の1枚だけ（緑地）。 */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-stretch">
            {STAGES.map((s, i) => (
              <div key={s.stage} className="contents">
                {i > 0 && <StepArrow />}
                <div
                  className={`flex flex-1 flex-col items-center rounded-xl border p-5 text-center ${
                    s.highlight ? 'border-primary-600/40 bg-primary-50' : 'border-surface-200 bg-white'
                  }`}
                >
                  <span
                    className={`text-sm font-bold tracking-wide ${
                      s.highlight ? 'text-primary-700' : 'text-ink-600'
                    }`}
                  >
                    {s.stage}
                  </span>
                  <span
                    className={`mt-1.5 text-3xl font-bold tabular-nums ${
                      s.highlight ? 'text-primary-700' : 'text-ink-900'
                    }`}
                  >
                    {s.price}
                  </span>
                  <ul className="mt-2 space-y-0.5 text-xs leading-relaxed text-ink-600">
                    {s.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>

        {/* 私たちの約束 */}
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

        <div className="mt-16 grid gap-5 sm:mt-20 sm:grid-cols-2">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <PlanCard plan={p} location={i === 1 ? 'pricing_premium' : 'pricing_standard'} />
            </Reveal>
          ))}
        </div>

        {/* 各プランカードに「無料で試す」があるため、直後の重複ボタンは撤去。マイクロコピーのみ残す。 */}
        <p className="mt-8 text-center text-xs text-ink-500">{SITE.microCopy}</p>

        <p className="mt-6 text-center text-xs leading-relaxed text-ink-500">
          ※ 料金は税込・人数課金です（初月割引あり）。詳細は特定商取引法に基づく表記をご確認ください。
        </p>
      </Container>
    </Section>
  )
}

function PlanCard({ plan, location }: { plan: Plan; location: 'pricing_standard' | 'pricing_premium' }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-surface-200 bg-surface-50 p-7 sm:p-8">
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
        <Badge
          variant="tag"
          icon={<Sparkles className="h-3.5 w-3.5 text-primary-600" />}
          className="mt-3 rounded-md border border-surface-200 bg-white px-3 py-1 font-medium text-ink-700"
        >
          AI利用枠：{plan.quota}
        </Badge>
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
        variant="secondary"
        className="mt-5 w-full"
        onClick={() => trackCta(location, SITE.ctaTryUrl)}
      >
        無料で試す
        <ArrowRight className="h-4 w-4" />
      </GlowButton>
    </div>
  )
}

function StepArrow() {
  return <ArrowRight className="h-4 w-4 shrink-0 self-center rotate-90 text-ink-300 sm:rotate-0" aria-hidden />
}
