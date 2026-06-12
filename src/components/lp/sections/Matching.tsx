import { ArrowLeftRight, Search, Users, SlidersHorizontal } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { FeatureSplit } from '../ui/FeatureSplit'
import { MatchDiagram } from '../ui/MatchDiagram'
import { hlText } from '../lib/headline'

/** ② 双方マッチング（逆引き）。ビジュアルは左・コード製の図解。 */
export function Matching() {
  return (
    <Section id="matching" className="bg-white" spacing="lg">
      <Container>
        <FeatureSplit
          reverse
          icon={ArrowLeftRight}
          eyebrow="双方向マッチング"
          title={
            <>
              {hlText('この物件、誰に出す？')}
              <br className="hidden sm:block" />
              {hlText('もう探さない。')}
            </>
          }
          visual={<MatchDiagram />}
          points={[
            { icon: Search, text: '物件を固定 → 紹介すべき顧客が並ぶ（逆引き）' },
            { icon: Users, text: '顧客を固定 → 出すべき物件が並ぶ' },
            {
              icon: SlidersHorizontal,
              text: '予算・面積・駅徒歩は“幅”で判定（上限超も段階評価）。実住/投資で評価軸を自動で切替',
            },
          ]}
          note="※ マッチングの点数は、営業判断を助けるための目安です。"
        >
          お客様の話した条件“ぴったり”ではなく、幅を持たせた実務向けのアルゴリズム。顧客を起点に「何を出すか」、物件を起点に「誰に出すか」、どちらからも候補が並びます。案内済みは自動で除外。
        </FeatureSplit>
      </Container>
    </Section>
  )
}
