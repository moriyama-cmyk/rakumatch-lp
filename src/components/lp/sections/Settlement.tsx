import { Calculator } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { FeatureSplit } from '../ui/FeatureSplit'
import { AppShot } from '../ui/AppShot'
import { hlText } from '../lib/headline'

/** ⑦ 精算金かんたん精算。ビジュアルは左。 */
export function Settlement() {
  return (
    <Section id="settlement" className="bg-surface-50" spacing="lg">
      <Container>
        <FeatureSplit
          reverse
          icon={Calculator}
          eyebrow="面倒を、貼るだけに"
          title={hlText('精算書は、書類を貼るだけ。')}
          visual={
            <AppShot
              base="/shot-settlement-form"
              alt="固都税・管理費等の精算書がAIで自動入力される楽マッチ AI の精算計算画面"
              width={1600}
              height={900}
            />
          }
          note="※ 精算金額は確認のうえご利用ください（自動計算は目安です）。"
        >
          固定資産税・都市計画税や管理費等の精算。書類のスクショを貼れば、AIが日数計算と金額の下書きまで。起算日方式は関東/関西の切り替えに対応。
        </FeatureSplit>
      </Container>
    </Section>
  )
}
