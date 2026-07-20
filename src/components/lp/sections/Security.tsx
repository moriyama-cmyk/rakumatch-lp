import { BrainCircuit, CreditCard, Database, ShieldCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { hl } from '../lib/headline'

type Fact = { icon: LucideIcon; title: string; body: string; href?: string }

const FACTS: Fact[] = [
  {
    icon: CreditCard,
    title: 'カード情報はStripeで管理',
    body: '決済はStripe経由です。カード情報を楽マッチ AIのサーバーでは保持しません。',
  },
  {
    icon: Database,
    title: '利用規約に削除方針を明記',
    body: '利用規約では、解約後30日間の保持と、その後の削除方針を定めています。',
    href: '/terms',
  },
  {
    icon: BrainCircuit,
    title: 'AIの提案は判断の補助',
    body: 'マッチングの点数やAIの分析は目安です。最終判断は営業担当者が行います。',
  },
]

/** 外部企業の規模ではなく、利用前に確認できる運用上の事実だけを示す。 */
export function Security() {
  return (
    <Section id="trust" className="bg-surface-50" spacing="sm">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge icon={<ShieldCheck className="h-3.5 w-3.5" aria-hidden />}>安心して始めるために</Badge>
            <h2 className="mt-4 text-display-lg text-ink-900">
              {hl('料金だけでなく、', '扱いも明確に。')}
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {FACTS.map((fact, index) => (
            <Reveal key={fact.title} delay={index * 0.06}>
              <article className="flex h-full flex-col rounded-xl border border-surface-200 bg-white p-6">
                <fact.icon className="h-6 w-6 text-primary-700" aria-hidden />
                <h3 className="mt-4 text-base font-bold text-ink-900">{fact.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{fact.body}</p>
                {fact.href ? (
                  <a
                    href={fact.href}
                    className="mt-4 inline-flex min-h-11 items-center self-start rounded-md text-sm font-bold text-primary-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  >
                    利用規約で確認する →
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-5 text-center text-sm leading-relaxed text-ink-500">
          個人情報の取り扱いと利用中の解析サービスは、
          <a
            href="/privacy"
            className="inline-flex min-h-11 items-center rounded-md font-bold text-primary-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            プライバシーポリシー
          </a>
          で確認できます。
        </p>
      </Container>
    </Section>
  )
}
