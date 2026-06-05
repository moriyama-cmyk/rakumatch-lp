import { Plus } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { GradientText } from '../ui/GradientText'

const QA: { q: string; a: string }[] = [
  {
    q: '導入や初期設定は大変ですか？',
    a: '無料でログイン前から中を触れます。物件や顧客は、画面を貼る・スクショ・PDFを投げ込むだけでAIが整理します。媒体とのAPI連携は不要です。',
  },
  {
    q: '1人でも、会社でも使えますか？料金は？',
    a: 'はい。個人の営業の方も会社でも使えます。料金は同じ¥3,000/人（税込・スタンダード）。プレミアムは¥5,000/人（税込）でAI利用枠が拡大します。人数課金・初月割引あり。',
  },
  {
    q: 'お客様連動アプリは、お客様にアプリのインストールが必要ですか？',
    a: 'リンクから使えて、ログインは不要です。気になった物件を1か所に集約でき、その内容が担当者に届きます。',
  },
  {
    q: '通話録音は特別な機材がいりますか？',
    a: '選んだマイクに入る音を録る方式なので、携帯でも固定電話でも対面でも使えます。高額な電話システムは不要です（録音はお相手の同意のうえで）。',
  },
  {
    q: '賃貸でも使えますか？',
    a: '売買向けに作っていますが、顧客・物件の管理やマッチングはご利用いただけます。賃貸の細かな運用はサポートにご相談ください。',
  },
]

/** FAQ（少数）。native details で開閉・アクセシブル。ライト。 */
export function Faq() {
  return (
    <Section id="faq" className="bg-surface-50" spacing="lg">
      <Container narrow>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>よくある質問</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-display-lg text-ink-900">
              よくある<GradientText>質問</GradientText>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 space-y-3">
          {QA.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i * 0.05, 0.2)}>
              <details className="group rounded-2xl border border-surface-200 bg-white shadow-soft [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left">
                  <span className="text-[0.95rem] font-bold text-ink-900">{item.q}</span>
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-transform duration-300 group-open:rotate-45">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <div className="px-5 pb-5 text-[0.9rem] leading-relaxed text-ink-700">{item.a}</div>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
