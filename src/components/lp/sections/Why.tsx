import { FileText, MonitorPlay, UserRound } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { hl } from '../lib/headline'

const RAKUMATCH_FACTS = [
  { icon: FileText, label: '料金表示', value: '月額3,000円/人（税込・スタンダード）から' },
  { icon: MonitorPlay, label: '始め方', value: '登録なしで画面を試せる' },
  { icon: UserRound, label: '契約単位', value: '1名から' },
] as const

/** 契約判断に必要な自社条件を、外部比較に頼らず明示する。 */
export function Why() {
  return (
    <Section id="why" labelledBy="why-heading" className="border-y border-surface-200 bg-white" spacing="md">
      <Container narrow>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>公開している利用条件</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="why-heading" className="mt-4 text-display-lg text-ink-900">
              {hl('料金も、', '始め方も、', '申し込む前に', '確認できます。')}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">
              商談や登録の前に、利用を判断するための基本条件を確認できます。
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 grid gap-3 sm:mt-12 md:grid-cols-3">
            {RAKUMATCH_FACTS.map(({ icon: Icon, label, value }) => (
              <article key={label} className="rounded-2xl border border-primary-100 bg-primary-50 p-6 shadow-soft sm:p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-700 ring-1 ring-primary-100">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-5 text-sm font-medium text-ink-600">{label}</p>
                <p className="mt-1 text-base font-bold leading-relaxed text-ink-900">{value}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <p className="mt-5 text-center text-sm leading-relaxed text-ink-500">
          プランごとの価格・保存容量・トライアル条件は、上の料金表で確認できます。
        </p>
      </Container>
    </Section>
  )
}
