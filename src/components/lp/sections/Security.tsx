import { Brain, Database, CreditCard, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { protect } from '../lib/protect'

type Trust = { icon: LucideIcon; title: string; desc: string }

// 文言は本番現行LPのまま（オーナー指定・盛らない/削らない）。
const TRUST: Trust[] = [
  { icon: Brain, title: 'Google AI（Gemini）搭載', desc: '世界最先端のAIエンジン' },
  { icon: Database, title: 'Amazon Web Services', desc: '世界最大級のクラウド基盤' },
  { icon: CreditCard, title: 'Stripe決済', desc: '世界135カ国以上で利用される決済インフラ' },
  { icon: Shield, title: '通信・データは暗号化', desc: '決済情報を弊社サーバーで保持しません' },
]

/**
 * セキュリティ／インフラの信頼。WHY比較表の後・FOR WHOM の前に配置し、
 * 「比較 → 安全 → 誰のため」の流れを作る。スタイルは新トークン（白カード・発光なし）。
 */
export function Security() {
  return (
    <Section id="security" className="bg-white" spacing="lg">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge icon={<Shield className="h-3.5 w-3.5" />}>セキュリティ</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-balance text-display-lg text-ink-900">
              {protect('データは、大手テック企業のインフラで守る。')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-700">
              {protect('自社で大手企業レベルのセキュリティを実現するのは、ほぼ不可能です。楽マッチAIは、Google・Amazon・Stripeという世界最大級のインフラ上で稼働。お客様のデータや決済情報を弊社サーバーで保持することはありません。')}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-surface-200 bg-surface-50 p-6 text-center shadow-soft">
                <span className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-surface-100 text-ink-700">
                  <t.icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                </span>
                <p className="text-sm font-bold text-ink-900">{t.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-base leading-relaxed text-ink-700">
            個人なら自分の顧客を自分で管理。会社なら全体を見ながら、担当者ごとに分けて運用できます。
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
