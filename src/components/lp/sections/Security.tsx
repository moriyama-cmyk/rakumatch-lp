import { Brain, Database, CreditCard, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { protect } from '../lib/protect'
import { hl } from '../lib/headline'

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
    <Section id="security" className="bg-white" spacing="sm">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge icon={<Shield className="h-3.5 w-3.5" />}>セキュリティ</Badge>
            <h2 className="mt-4 text-display-lg text-ink-900">
              {hl('データは、', '大手テック企業の', 'インフラで守る。')}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700 sm:mt-6">
              {protect('自社で大手企業レベルのセキュリティを実現するのは、ほぼ不可能です。楽マッチAIは、Google・Amazon・Stripeという世界最大級のインフラ上で稼働。お客様のデータや決済情報を弊社サーバーで保持することはありません。')}
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid divide-y divide-surface-200 sm:mt-16 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {TRUST.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.06}>
              <div className="flex h-full items-start gap-3 py-4 sm:p-4">
                <t.icon className="mt-0.5 h-6 w-6 shrink-0 text-ink-700" strokeWidth={2} aria-hidden />
                <div>
                  <p className="text-sm font-bold text-ink-900">{t.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 2026-07-24 Phase3: 末尾の運用形態の段落（個人/会社の使い分け）はセキュリティと無関係の
            孤児段落だったため削除（Fable F3-3）。同内容はFAQ「1人でも、会社でも使えますか？」が担う。 */}
      </Container>
    </Section>
  )
}
