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
    a: 'インストールもログインも不要です。リンクを開くだけで、すべての機能が使えます — SUUMO等で気になった物件の保存（共有ボタンから1タップ）、星評価、メモ、「内見したい」の送信まで。その内容はそのまま担当者に届きます。',
  },
  {
    q: '通話録音は特別な機材がいりますか？',
    a: '選んだマイクに入る音を録る方式なので、携帯でも固定電話でも対面でも使えます。高額な電話システムは不要です。接続のしかたやマイクの選び方は、アプリ内の「通話録音のヒント」で画面を見ながら確認でき、録音前のマイクテストもできます（録音はお相手の同意のうえで）。',
  },
  {
    q: '賃貸でも使えますか？',
    a: '賃貸でも、顧客・物件の管理、コピペ登録、マッチング、お客様連動アプリはそのまま使えます。売買専用の機能（精算・契約フェーズ管理など）を使わない形になります。',
  },
  {
    q: '今、Excelで管理している顧客データは移せますか？',
    a: 'ExcelやPDF、画面のコピペをそのまま投げ込めば、AIが顧客ごと・物件ごとに整理して取り込みます。手入力での作り直しは不要です。',
  },
  {
    q: '解約したらデータはどうなりますか？',
    a: '解約はいつでもでき、違約金・最低利用期間はありません。解約後のデータは30日で完全に削除します。お客様の情報を残したり、人質に取ったりしません。',
  },
  {
    q: '営業電話がかかってきませんか？',
    a: 'ログイン不要のデモでは連絡先を伺わないため、こちらから連絡する手段がそもそもありません。有料機能を7日間お試しになる場合はメールアドレス等の登録が必要になりますが、そちらでも営業電話をすることはありません。',
  },
  {
    q: '無料期間が終わったら、勝手に課金されませんか？',
    a: '7日間の無料トライアルを始めるには、Stripe経由でのカード登録が必要です。ただし7日以内に解約すれば料金は一切かかりません。8日目以降も利用を続けた場合にのみ課金が始まります。解約はいつでもご自身でStripeの管理画面から行えます。',
  },
  {
    q: '個人開発とのことですが、サービスは続きますか？',
    // 2026-07-19 事実訂正: 森山さんは不動産仲介会社の経営者ではない（現役の不動産営業）。
    // Story節の自己紹介「東京で不動産売買をやっている、現役の営業マンです」に表記を統一。
    a: '開発者自身が東京で不動産売買をやっている現役の営業マンで、このアプリで毎日業務をしています。自分が日々の仕事で使っている道具なので、止める動機がありません。機能改善もほぼ毎週続けています。',
  },
]

/** FAQ（少数）。native details で開閉・アクセシブル。ライト。 */
export function Faq() {
  return (
    <Section id="faq" className="bg-white" spacing="md">
      <Container narrow>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>よくある質問</Badge>
            <h2 className="mt-4 text-display-lg text-ink-900">
              よくある<GradientText>質問</GradientText>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 space-y-2">
          {QA.map((item, i) => (
            <Reveal key={item.q} delay={Math.min(i * 0.05, 0.2)}>
              <details className="group rounded-lg border border-surface-200 bg-white [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
                  <span className="text-sm font-bold text-ink-900">{item.q}</span>
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-transform duration-200 ease-out group-open:rotate-45">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <div className="px-5 pb-5 text-sm leading-relaxed text-ink-700">{item.a}</div>
              </details>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
