import { Check } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { GradientText } from '../ui/GradientText'
import { protect } from '../lib/protect'
import { hl, hlText } from '../lib/headline'

// COMPARISON_DATA.md の実データ（A社/B社/C社の匿名カテゴリ列＋楽マッチ）。
// 文言はそのまま（盛らない・削らない／語尾「目安」「例が多い」を保持）。実社名は出さない。
type Row = { label: string; a: string; b: string; c: string; raku: string }

const ROWS: Row[] = [
  {
    label: '月額の目安',
    a: '要問い合わせが中心。公開例では月数万円／社〜（例: 売買仲介向けで月6万円／社の公開例あり）',
    b: '月20,000円〜／法人 が目安',
    c: '月1,000〜1,800円／人（汎用）＋業務化の作り込み費用',
    raku: '月3,000円（税込）/人',
  },
  {
    label: '初期費用',
    a: '無料〜数十万円（公開例では7万円／社〜。要問い合わせも多い）',
    b: '20万円前後の例が多い',
    c: '汎用は無料だが業務化に開発費',
    raku: '0円',
  },
  {
    label: '最低利用',
    a: '法人・社／店舗単位が中心',
    b: '法人単位',
    c: '最低10名から（汎用の例）',
    raku: '1名から',
  },
  {
    label: '不動産売買への適合',
    a: '高い（専門）',
    b: '媒体連動が主',
    c: '箱に業務を合わせる作り込みが必要',
    raku: '売買の実務に合わせて設計',
  },
  {
    label: '物件をマッチに乗せる',
    a: '媒体連動・手入力',
    b: '有料の媒体連動が前提',
    c: '手入力',
    raku: '貼る・撮る・投げ込むだけ（媒体連携0円）',
  },
  {
    label: '「誰に・どの物件を」',
    a: '提案支援はあるが双方向は弱い',
    b: '反響管理が主',
    c: '自分で考える',
    raku: '顧客←→物件の双方向で即わかる',
  },
  {
    label: 'AIの理解',
    a: '製品により搭載',
    b: '限定的',
    c: 'なし／汎用AIで都度説明',
    raku: '顧客1人・物件1件を把握した専属AI',
  },
  {
    label: 'お客様との接点',
    a: '買主マイページ（営業→お客様の一方向が中心）',
    b: 'ポータル経由の反響',
    c: 'なし',
    raku: 'お客様の“欲しい”が逆流（双方向）',
  },
]

const COLS = [
  { key: 'a' as const, head: 'A社', sub: '不動産特化CRM' },
  { key: 'b' as const, head: 'B社', sub: 'ポータル連動型' },
  { key: 'c' as const, head: 'C社', sub: '汎用CRM＋Excel' },
]

/** WHY（対立軸の比較表・実データ版）。スマホは先頭列sticky＋表内のみ横スクロール。 */
export function Why() {
  return (
    <Section id="why" className="bg-white border-t-2 border-primary-600/20" spacing="xl">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>選ばれる理由</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display-lg text-ink-900">
              {hl(<><GradientText>“合わせる”CRM</GradientText>から、</>)}
              <br className="hidden sm:block" />
              {hl('“効く”CRMへ。')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base text-ink-700 sm:mt-6">
              {/* 2026-07-19 事実訂正: 「仲介経営者」は誤り（現役の不動産営業）。 */}
              現役の不動産営業が、自分が毎日使うために不動産売買専用で作りました。
              <br className="hidden sm:block" />
              Excelは表計算。これは、不動産営業の道具です。
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="relative mt-12 sm:mt-16 after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-20 after:w-10 after:bg-gradient-to-l after:from-white after:to-transparent sm:after:hidden">
            <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[860px] border-separate border-spacing-0 overflow-hidden rounded-xl border border-surface-200 text-left">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-10 w-[8.5rem] border-r border-surface-200 bg-surface-100 p-4 sm:w-44" />
                    <th className="border-r border-surface-200 bg-primary-50 p-4 align-top">
                      <span className="block text-sm font-bold text-primary-700">楽マッチ AI</span>
                      <span className="mt-0.5 block text-xs font-medium text-primary-600">
                        不動産売買特化
                      </span>
                    </th>
                    {COLS.map((c) => (
                      <th key={c.key} className="border-r border-surface-200 bg-surface-100 p-4 align-top">
                        <span className="block text-sm font-bold text-ink-700">{c.head}</span>
                        <span className="mt-0.5 block whitespace-nowrap text-xs font-medium text-ink-500">
                          （{c.sub}）
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((r) => {
                    const numeric = r.label === '月額の目安' || r.label === '初期費用'
                    return (
                      <tr key={r.label}>
                        <th
                          scope="row"
                          className="sticky left-0 z-10 border-t border-r border-surface-200 bg-surface-100 p-4 text-sm font-bold text-ink-900"
                        >
                          {r.label}
                        </th>
                        <Td highlight numeric={numeric}>
                          <Check className="mr-1 inline h-3.5 w-3.5 text-primary-600" strokeWidth={3} />
                          <span className="font-bold">{protect(r.raku)}</span>
                        </Td>
                        {COLS.map((c) => (
                          <Td key={c.key} numeric={numeric}>{protect(r[c.key])}</Td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white sm:hidden"
              aria-hidden
            />
          </div>
        </Reveal>

        {/* 注記（必須・COMPARISON_DATA §2 のまま） */}
        <Reveal delay={0.1}>
          <p className="mt-5 text-xs leading-relaxed text-ink-500">
            ※当社調べ（2026年6月時点・各社公開情報による）。料金・仕様は各社の最新情報をご確認ください。料金は代表的なプラン例で、税表記・条件は各社により異なります。
          </p>
        </Reveal>

        {/* 締めコピー（COMPARISON_DATA §4） */}
        <Reveal delay={0.12}>
          <p className="mt-12 text-center text-display-md text-ink-900 sm:mt-16">
            {hl(
              <>初期費用<GradientText variant="gold">0円</GradientText>・</>,
              <>1人 月<GradientText variant="gold">3,000円</GradientText></>,
              '（税込）から。',
            )}
            <br className="hidden sm:block" />
            <span className="text-ink-700">{hlText('法人契約も、20万円の初期費用も、いりません。')}</span>
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mt-4 text-center text-sm font-bold text-primary-700">
            {hlText('他社は、資料請求と商談から。楽マッチは、今この場で実物が触れます。')}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

function Td({
  children,
  highlight,
  numeric,
}: {
  children: React.ReactNode
  highlight?: boolean
  numeric?: boolean
}) {
  return (
    <td
      className={`border-t border-r border-surface-200 p-4 align-top text-sm leading-relaxed ${
        numeric ? 'tabular-nums' : ''
      } ${highlight ? 'bg-primary-50/60 text-ink-900' : 'text-ink-500'}`}
    >
      {children}
    </td>
  )
}
