import { Check, FileText, MonitorPlay, UserRound } from 'lucide-react'
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

/** 公開情報で確認できる「価格と開始方法」だけを、優劣評価なしで比較する。 */
export function Why() {
  return (
    <Section id="why" labelledBy="why-heading" className="border-y border-surface-200 bg-white" spacing="md">
      <Container narrow>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>始め方の比較</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="why-heading" className="mt-4 text-display-lg text-ink-900">
              {hl('価格と入口を、', '申し込む前に', '比べられます。')}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">
              機能の優劣ではなく、公開されている料金と利用開始までの流れを比べました。
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 grid overflow-hidden rounded-2xl border border-surface-200 bg-surface-200 shadow-soft sm:mt-12 md:grid-cols-2">
            <article className="bg-primary-50 p-6 sm:p-8">
              <p className="text-sm font-bold text-primary-800">楽マッチ AI</p>
              <ul className="mt-5 space-y-4">
                {RAKUMATCH_FACTS.map(({ icon: Icon, label, value }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary-700 ring-1 ring-primary-100">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-ink-600">{label}</span>
                      <span className="mt-0.5 block text-sm font-bold leading-relaxed text-ink-900">{value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="border-t border-surface-200 bg-surface-100 p-6 sm:p-8 md:border-l md:border-t-0">
              <p className="text-sm font-bold text-ink-700">比較対象5社の公開情報</p>
              <ul className="mt-5 space-y-4">
                <li className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-ink-500" aria-hidden />
                  料金は公開されておらず、確認には問い合わせが必要
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-ink-500" aria-hidden />
                  利用開始は、資料請求または商談から
                </li>
              </ul>
            </article>
          </div>
        </Reveal>

        <p className="mt-4 text-sm leading-relaxed text-ink-500">
          ※2026年7月時点、当社調べ。不動産売買仲介向けの顧客管理または営業支援機能を案内している5サービスを対象に、各社公式サイトの料金表示と利用開始の入口を比較。料金・条件は各社の最新情報をご確認ください。
        </p>
      </Container>
    </Section>
  )
}
