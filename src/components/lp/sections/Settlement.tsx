import { Calculator, Receipt, Sparkles } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { FeatureSplit } from '../ui/FeatureSplit'

/** 書類スクショ→自動入力の精算書 を示す軽量ビジュアル（ライト）。 */
function SettlementVisual() {
  const rows = [
    { k: '固定資産税', v: '¥128,400' },
    { k: '都市計画税', v: '¥27,600' },
    { k: '日割り日数', v: '212 日' },
    { k: '精算額（買主負担）', v: '¥90,640' },
  ]
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-soft-lg sm:p-7">
      <div className="grid grid-cols-[auto_1fr] gap-4">
        <div className="flex w-24 flex-col items-center justify-center rounded-xl border border-dashed border-surface-200 bg-surface-50 p-4 text-center">
          <Receipt className="h-7 w-7 text-ink-500" />
          <p className="mt-2 text-[0.7rem] text-ink-500">書類を貼る</p>
        </div>
        <div className="rounded-xl border border-surface-200 bg-surface-50 p-4">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-primary-700">
            <Sparkles className="h-3.5 w-3.5" /> 自動入力された精算書
          </p>
          <dl className="space-y-2">
            {rows.map((r, i) => (
              <div
                key={r.k}
                className={`flex items-center justify-between text-[0.8rem] ${
                  i === rows.length - 1
                    ? 'border-t border-surface-200 pt-2 font-bold text-ink-900'
                    : 'text-ink-700'
                }`}
              >
                <dt>{r.k}</dt>
                <dd className="tabular-nums">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <p className="mt-3 text-[0.7rem] text-ink-500">関東/関西の起算日方式に対応（金額は目安）</p>
    </div>
  )
}

/** ⑦ 精算金かんたん精算。ビジュアルは左。 */
export function Settlement() {
  return (
    <Section id="settlement" className="bg-surface-50" spacing="lg">
      <Container>
        <FeatureSplit
          reverse
          icon={Calculator}
          eyebrow="面倒を、貼るだけに"
          title="精算書は、書類を貼るだけ。"
          visual={<SettlementVisual />}
          note="※ 精算金額は確認のうえご利用ください（自動計算は目安です）。"
        >
          固定資産税・都市計画税や管理費等の精算。書類のスクショを貼れば、AIが日数計算と金額の下書きまで。起算日方式は関東/関西の切り替えに対応。
        </FeatureSplit>
      </Container>
    </Section>
  )
}
