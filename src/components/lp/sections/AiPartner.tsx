import { Brain, Lightbulb, MessagesSquare, Wand2, Building2, Compass } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { FeatureSplit } from '../ui/FeatureSplit'
import { Img } from '../ui/Img'
import { hl, hlText } from '../lib/headline'

/** ③ 専属AI（各ページに上司）。ライト・イメージ画像。 */
export function AiPartner() {
  return (
    <Section id="ai" className="bg-surface-50" spacing="lg">
      <Container>
        <FeatureSplit
          icon={Brain}
          eyebrow="一人ひとり・一件ごとにAI"
          title={
            <>
              {hl('全部わかってる', '“優しい上司”が、')}
              <br className="hidden sm:block" />
              {hlText('各ページに。')}
            </>
          }
          visual={
            <figure className="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-soft-lg">
              <Img
                base="/shot-ai-insight"
                alt="顧客詳細ページでAIが潜在ニーズを提案している楽マッチ AI の実画面"
                width={1600}
                height={900}
              />
            </figure>
          }
          points={[
            { icon: Compass, text: '今後のアプローチ提案・ヒアリングの聞き方提案' },
            { icon: Lightbulb, text: '自分では気づけない潜在ニーズの提示' },
            { icon: MessagesSquare, text: '壁打ち・相談（このお客様について、その場で）' },
            { icon: Wand2, text: '聞いた内容を雑にメモ → AIが適切な項目へ振り分け（備考も）' },
            { icon: Building2, text: '物件側にもAI: 説明文・提案トーク・メリデメ/注意点・メモ要約' },
          ]}
          note="「めちゃくちゃ仕事ができる優しい上司」がついている感覚。だから、新人でも初日からある程度動けます。"
        >
          普通のAIは「こんな客がいて…」と毎回説明が要ります。楽マッチのAIは、その顧客ページの中身（連絡先・資金・条件・これまでの活動履歴・未完了のやること）を把握済み。だから、説明なしでスムーズに、的確に。
        </FeatureSplit>
      </Container>
    </Section>
  )
}
