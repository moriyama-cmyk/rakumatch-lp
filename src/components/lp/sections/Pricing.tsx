'use client'

import { ArrowRight, Check, CircleHelp, CreditCard, MonitorPlay } from 'lucide-react'
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
  '顧客管理',
  '物件一括取り込み',
  '双方向マッチング',
  '専属AI',
  'お客様アプリ',
]

const SUPPORT_SCOPE = [
  '初期設定',
  '最初の顧客・物件の登録',
  'お客様アプリの初回共有',
]

/** 料金と始め方。匿名デモとカード登録を伴うトライアルを明確に分ける。 */
export function Pricing() {
  return (
    <Section id="pricing" className="border-t-2 border-primary-600/20 bg-white" spacing="xl">
      <Container narrow>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>料金</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display-lg text-ink-900">
              {hl('1名から、', <GradientText variant="gold">月額3,000円</GradientText>, 'で始められます。')}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 text-sm font-bold text-ink-700">税込・スタンダードプラン / 人・月</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">
              個人でも、1〜3名の営業チームでも。初期費用は0円、最低利用期間・違約金はありません。
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.13}>
          <div className="mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
            <Fact label="利用開始" value="1名から" />
            <Fact label="初期費用" value="0円" />
            <Fact label="共通機能" value="5つ" />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-primary-200 bg-primary-50 p-5 sm:p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-bold text-primary-800">まずは登録なしで、画面を確認できます</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-700">クレジットカードも連絡先の入力も不要です。</p>
              </div>
              <GlowButton
                href={SITE.ctaTryUrl}
                variant="secondary"
                className="w-full shrink-0 sm:w-auto"
                onClick={() => trackCta('demo', 'pricing_demo')}
              >
                <MonitorPlay className="h-4 w-4" />
                {SITE.ctaPrimaryLabel}
              </GlowButton>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2">
          {PLANS.map((plan, index) => (
            <Reveal key={plan.name} delay={0.05 * index}>
              <PlanCard plan={plan} featured={index === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-ink-600">
            使えるAI機能とAIの性能は両プラン共通です。違いはAI利用枠と保存容量です。
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-surface-200 bg-surface-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" aria-hidden />
              <div>
                <p className="text-sm font-bold text-ink-900">本ページ公開後の新規契約・先着5アカウントに、初回のオンライン相談</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-700">
                  開発者本人が30分・1回、オンラインでご相談を受けます。対象は{SUPPORT_SCOPE.join('、')}です。契約後、登録メールアドレスへ日程調整をご案内します。
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-500">
                  入力代行、個別の営業判断、法務相談は対象外です。
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-ink-500">
            料金は税込・1人あたり月額です。お支払い方法や解約後の扱いは、特定商取引法に基づく表記をご確認ください。
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-surface-200 bg-surface-50 px-4 py-4 text-center">
      <p className="text-xs font-medium text-ink-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-ink-900">{value}</p>
    </div>
  )
}

function PlanCard({ plan, featured }: { plan: Plan; featured: boolean }) {
  const location = plan.name === 'スタンダード' ? 'pricing_standard' : 'pricing_premium'

  return (
    <div className={`relative flex h-full flex-col rounded-xl border p-6 sm:p-8 ${featured ? 'border-primary-600 bg-white shadow-soft' : 'border-surface-200 bg-surface-50'}`}>
      {featured && <span className="absolute right-5 top-5 rounded-md bg-primary-600 px-2.5 py-1 text-xs font-bold text-white">基本プラン</span>}
      <p className="text-lg font-bold text-ink-900">{plan.name}</p>
      <p className="mt-1 text-sm text-ink-600">{plan.tagline}</p>
      <div className="mt-5 border-b border-surface-200 pb-5">
        <p className="flex items-end gap-1.5">
          <span className="text-5xl font-bold tracking-[-0.03em] tabular-nums text-accent-600 sm:text-6xl">{plan.price}</span>
          <span className="mb-1.5 text-sm font-medium text-ink-600">{plan.unit}</span>
        </p>
        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs text-ink-600">
          <div className="rounded-lg bg-surface-50 px-3 py-2">
            <dt>AI利用枠</dt>
            <dd className="mt-0.5 font-bold text-ink-900">{plan.quota}</dd>
          </div>
          <div className="rounded-lg bg-surface-50 px-3 py-2">
            <dt>保存容量</dt>
            <dd className="mt-0.5 font-bold text-ink-900">{plan.storage}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-5 text-sm font-bold text-ink-900">どちらのプランにも含まれる5機能</p>
      <ul className="mt-3 flex-1 space-y-2.5">
        {COMMON_FEATURES.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm leading-relaxed text-ink-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={3} aria-hidden />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-lg border border-surface-200 bg-white p-3.5">
        <p className="flex items-center gap-2 text-sm font-bold text-ink-900"><CreditCard className="h-4 w-4 text-primary-600" aria-hidden />カード登録後、7日間試せます</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-600">7日以内に解約すれば料金はかかりません。</p>
      </div>
      <GlowButton
        href={SITE.ctaTrialUrl}
        variant={featured ? 'primary' : 'secondary'}
        className="mt-4 w-full"
        onClick={() => trackCta('trial', location)}
      >
        {SITE.ctaTrialLabel}
        <ArrowRight className="h-4 w-4" />
      </GlowButton>
    </div>
  )
}
