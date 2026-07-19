import { ArrowLeftRight, Search, Users, SlidersHorizontal } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { FeatureSplit } from '../ui/FeatureSplit'
import { MockFrame, PropertyCard, MatchCard } from '../mock'
import type { MatchCardData } from '../mock'
import { hlText } from '../lib/headline'

// 「物件を固定 → 紹介すべき顧客が並ぶ」の再現データ（架空）。
// スコアは降順・70%の色境界（緑/琥珀）をまたぐように92/78/61で構成。
const MATCH_CUSTOMERS: MatchCardData[] = [
  {
    rank: 1,
    name: '佐藤様',
    score: 92,
    reasons: ['間取り', '希望駅'],
    meta: '予算3,500万円台・3LDK希望',
  },
  {
    rank: 2,
    name: '高橋様',
    score: 78,
    reasons: ['駅徒歩', '沿線'],
    meta: '予算4,000万円台・東急東横線沿線',
  },
  {
    rank: 3,
    name: '伊藤様',
    score: 61,
    reasons: ['築年数'],
    meta: '予算3,000万円台・急ぎではない',
  },
]

/** ② 双方マッチング（逆引き）。ビジュアルは左・コード製の図解。 */
export function Matching() {
  return (
    <Section id="matching" className="bg-white" spacing="md">
      <Container>
        <FeatureSplit
          reverse
          icon={ArrowLeftRight}
          eyebrow="双方向マッチング"
          as="h2"
          titleClassName="text-display-lg"
          title={
            <>
              {hlText('この物件、誰に出す？')}
              <br className="hidden sm:block" />
              {hlText('もう探さない。')}
            </>
          }
          visual={
            <MockFrame variant="desktop" chromeUrl="app.rakumatch-ai.com/properties/1234">
              <div className="space-y-3 bg-surface-50 p-4">
                <PropertyCard
                  variant="agent"
                  data={{
                    title: 'グランみどり台 3LDK',
                    price: '3,980万円',
                    propertyType: 'マンション',
                    meta: '青葉区みどり台・徒歩8分',
                    matchCount: 3,
                  }}
                />
                <div className="space-y-2">
                  {MATCH_CUSTOMERS.map((d) => (
                    <MatchCard key={d.rank} data={d} />
                  ))}
                </div>
              </div>
            </MockFrame>
          }
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
