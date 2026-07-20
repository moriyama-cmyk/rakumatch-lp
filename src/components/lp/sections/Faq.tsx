'use client'

import { Plus } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { GradientText } from '../ui/GradientText'
import { hl } from '../lib/headline'
import { trackCta } from '@/lib/track'

const QA: { q: string; a: string }[] = [
  {
    q: '1人から使えますか？料金はいくらですか？',
    a: 'はい、1名からご利用いただけます。スタンダードは月額3,000円、プレミアムは月額5,000円です。いずれも税込・1人あたり月額で、初期費用はかかりません。',
  },
  {
    q: '初期設定は相談できますか？',
    a: '新規契約の先着5アカウントには、開発者本人による初回30分・1回のオンライン相談があります。初期設定、最初の顧客・物件登録、お客様アプリの初回共有が対象です。契約後、登録メールアドレスへ日程調整をご案内します。入力代行、個別の営業判断、法務相談は対象外です。',
  },
  {
    q: 'お客様アプリは、お客様にもアプリのインストールが必要ですか？',
    a: '不要です。お客様は共有されたリンクを開くだけで、物件の保存、星評価、メモ、「内見したい」の送信ができます。保存や希望は担当者に届きます。',
  },
  {
    q: '登録なしのデモと、7日間トライアルの違いは何ですか？',
    a: '登録なしのデモは、連絡先やクレジットカードを入力せずに画面を試せます。7日間トライアルはカード登録が必要で、有料機能を7日間お試しいただけます。',
  },
  {
    q: 'いつから課金されますか？解約はできますか？',
    a: '7日間トライアルを継続した場合、8日目以降に月額課金が始まります。7日以内に解約すれば料金はかかりません。最低利用期間・違約金はなく、解約はいつでもStripeの管理画面から行えます。',
  },
  {
    q: '解約後のデータはどうなりますか？',
    a: '解約後30日間はデータを保持し、その間に再開すれば復元できます。30日経過後、登録データは自動的かつ復元できない形で削除されます。解約前にはアプリ内の設定ページからCSV形式でエクスポートできます。',
  },
]

/** 購入直前の疑問にだけ答えるFAQ。native detailsでキーボード操作にも対応。 */
export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-heading" className="bg-surface-50" spacing="md">
      <Container narrow>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><Badge>よくある質問</Badge></Reveal>
          <Reveal delay={0.05}>
            <h2 id="faq-heading" className="mt-4 text-display-lg text-ink-900">{hl('始める前の', <GradientText>確認事項</GradientText>)}</h2>
          </Reveal>
        </div>

        <div className="mt-10 space-y-2 sm:mt-12">
          {QA.map((item, index) => (
            <Reveal key={item.q} delay={Math.min(index * 0.05, 0.2)}>
              <details className="group rounded-lg border border-surface-200 bg-white [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 p-4 text-left sm:p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500">
                  <span className="text-sm font-bold leading-relaxed text-ink-900">{item.q}</span>
                  <span aria-hidden="true" className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-transform duration-200 ease-out motion-reduce:transition-none group-open:rotate-45">
                    <Plus className="h-4 w-4" aria-hidden />
                  </span>
                </summary>
                <div className="px-4 pb-5 text-sm leading-relaxed text-ink-700 sm:px-5">{item.a}</div>
              </details>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#pricing"
            onClick={() => trackCta('anchor', 'faq_pricing', '#pricing')}
            className="inline-flex min-h-11 items-center justify-center rounded-lg px-4 text-sm font-bold text-primary-700 underline decoration-primary-300 underline-offset-4 hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            料金・試し方をもう一度見る
          </a>
        </div>
      </Container>
    </Section>
  )
}
