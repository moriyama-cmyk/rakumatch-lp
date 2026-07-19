import { Brain, Lightbulb, MessagesSquare, Wand2, Building2, Compass } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { FeatureSplit } from '../ui/FeatureSplit'
import { MockFrame, AiPanel } from '../mock'
import type { AiChatMessage } from '../mock'
import { hlText } from '../lib/headline'

const AI_POINTS = [
  { icon: Compass, text: '今後のアプローチ提案・ヒアリングの聞き方提案' },
  { icon: Lightbulb, text: '自分では気づけない潜在ニーズの提示' },
  { icon: MessagesSquare, text: '壁打ち・相談（このお客様について、その場で）' },
  { icon: Wand2, text: '聞いた内容を雑にメモ → AIが適切な項目へ振り分け（備考も）' },
  { icon: Building2, text: '物件側にもAI: 説明文・提案トーク・メリデメ/注意点・メモ要約' },
]

// 「説明していないのに具体的な提案が出ている」の再現データ（架空）。
// 先に発言するのはAI＝聞かれる前から、そのお客様固有の話を踏まえた提案が来ることを見せる。
const AI_MESSAGES: AiChatMessage[] = [
  {
    role: 'ai',
    content:
      '田中様、先週のメモに「実家に近い方がいい」とありました。まだご案内していない上北沢駅徒歩6分の物件が新着です。今週のご連絡がおすすめです。',
  },
  { role: 'user', content: 'そこまで見てくれてるんだ' },
]

/** ③ 専属AI（各ページに上司）。暗色AIパネル部分のみコード再現（全画面化はしない）。 */
export function AiPartner() {
  return (
    <Section id="ai" className="bg-white" spacing="md">
      <Container>
        <FeatureSplit
          icon={Brain}
          eyebrow="一人ひとり・一件ごとにAI"
          as="h2"
          titleClassName="text-display-lg"
          title={
            <>
              {hlText('ページを開けば、')}
              <br className="hidden sm:block" />
              {hlText('頼れる上司がいる。')}
            </>
          }
          visual={
            <MockFrame variant="desktop" chromeUrl="app.rakumatch-ai.com/customers/1234">
              <div className="bg-slate-950 p-4 sm:p-5">
                <AiPanel messages={AI_MESSAGES} />
              </div>
            </MockFrame>
          }
          note="「めちゃくちゃ仕事ができる優しい上司」がついている感覚。だから、新人でも初日からある程度動けます。"
        >
          <>
            普通のAIは「こんな客がいて…」と毎回説明が要ります。楽マッチのAIは、その顧客ページの中身（連絡先・資金・条件・これまでの活動履歴・未完了のやること）を把握済み。だから、説明なしでスムーズに、的確に。
            <ul className="mt-6 divide-y divide-surface-200">
              {AI_POINTS.map((p, i) => (
                <li key={i} className="flex items-start gap-3 py-3">
                  <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" strokeWidth={2} aria-hidden />
                  <span className="text-sm leading-[1.7] text-ink-700">{p.text}</span>
                </li>
              ))}
            </ul>
          </>
        </FeatureSplit>
      </Container>
    </Section>
  )
}
