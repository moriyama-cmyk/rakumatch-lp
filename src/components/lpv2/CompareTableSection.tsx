'use client'

// 詳細比較表。2026-07-24 森山さん指示で「A社・B社・C社・Excel」のタイプ別比較に具体化。
// A/B/Cの金額・条件は旧LP Why.tsx（COMPARISON_DATA.md 由来・法務チェック済みの文言）を正として流用。
// 実在サービス名は出さない。他社セルは「〜が多い」「目安」「公開例」の事実ベース表現に統一。
// モバイルは横スクロール表ではなく、行ごとのカード（compare-cards）に組み替える。
import { trackCta } from '@/lib/track'

const APP_TRY_URL = 'https://app.rakumatch-ai.com/try'

type Row = { label: string; excel: string; a: string; b: string; c: string; raku: string }

const ROWS: Row[] = [
  {
    label: '月額',
    excel: '0円（ただし人件費で払っている）',
    a: '要問い合わせが中心。公開例では月数万円／社〜',
    b: '月20,000円〜／法人が目安',
    c: '月1,000〜1,800円／人＋業務化の作り込み費用',
    raku: '3,000円／人（税込・価格公開）',
  },
  {
    label: '初期費用',
    excel: '0円',
    a: '無料〜数十万円（公開例では7万円／社〜）',
    b: '20万円前後の例が多い',
    c: '汎用は無料だが業務化に開発費',
    raku: '0円',
  },
  {
    label: '最低利用',
    excel: '—',
    a: '法人・社／店舗単位が中心',
    b: '法人単位・年間契約が多い',
    c: '最低10名からの例も',
    raku: '1名から・期間縛りなし',
  },
  {
    label: '媒体連携費',
    excel: '—',
    a: '別費用のことが多い',
    b: '有料の媒体連動が前提',
    c: '—',
    raku: '0円（そもそも不要）',
  },
  {
    label: 'レインズ一覧の取り込み',
    excel: '1件ずつ手入力',
    a: '手入力（規約上、自動連携はどの製品も不可）',
    b: '手入力（同じ）',
    c: '手入力（同じ）',
    raku: '貼るだけでAIが解析・登録',
  },
  {
    label: '図面PDF・スクショからの登録',
    excel: '手入力',
    a: 'オプション対応の製品も',
    b: '媒体経由が前提のことが多い',
    c: '添付保存まで（中身は読まない）',
    raku: '投げ込むだけ（標準機能）',
  },
  {
    label: '反響メールからの顧客登録',
    excel: 'コピペで転記',
    a: '媒体連携の設定が前提のことが多い',
    b: '反響取り込みは得意分野',
    c: '手入力',
    raku: 'メール文を貼るだけ',
  },
  {
    label: 'この物件を誰に紹介するか',
    excel: '表からは分からない',
    a: '提案支援はあるが双方向は弱い',
    b: '反響管理が主で、物件起点は弱い',
    c: '自分で考える',
    raku: '全物件に「マッチ○名」が自動表示',
  },
  {
    label: '案内済み物件の管理',
    excel: '記憶とメモ',
    a: '手動更新',
    b: '手動更新',
    c: '手動更新',
    raku: '候補から自動で外れる',
  },
  {
    label: '提案メール・電話トーク',
    excel: 'ゼロから作成',
    a: '定型文まで',
    b: '定型文まで',
    c: 'なし（自分で書く）',
    raku: '顧客と物件を把握したAIが下書き',
  },
  {
    label: 'お客様からの物件共有（逆方向）',
    excel: '不可',
    a: '買主マイページ（営業→お客様の一方向が中心）',
    b: 'ポータル経由の反響のみ',
    c: 'なし',
    raku: 'お客様アプリで自動で届く',
  },
  {
    label: '追客アラート',
    excel: '気づいた人だけ',
    a: '設定すれば可',
    b: '設定すれば可',
    c: 'なし',
    raku: '連絡が途絶えると自動警告',
  },
  {
    label: '導入までの設定',
    excel: '—',
    a: '初期設定・研修が前提のことが多い',
    b: '媒体連携の設定が前提',
    c: '業務に合わせる作り込みが必要',
    raku: '貼れば今日から',
  },
  {
    label: '試し方',
    excel: '—',
    a: '資料請求→商談→デモが中心',
    b: '資料請求→商談が中心',
    c: '無料版あり（業務化は別）',
    raku: '登録なしで今すぐ実物を触れる',
  },
]

const COLS: { key: 'excel' | 'a' | 'b' | 'c'; head: string; sub: string }[] = [
  { key: 'excel', head: 'Excel・紙の台帳', sub: '現場の多数派' },
  { key: 'a', head: 'A社', sub: '不動産特化CRM' },
  { key: 'b', head: 'B社', sub: 'ポータル連動型' },
  { key: 'c', head: 'C社', sub: '汎用CRM' },
]

const CARD_LABELS: { key: 'excel' | 'a' | 'b' | 'c'; label: string }[] = [
  { key: 'excel', label: 'Excel・紙' },
  { key: 'a', label: 'A社 特化CRM' },
  { key: 'b', label: 'B社 ポータル' },
  { key: 'c', label: 'C社 汎用CRM' },
]

export function CompareTableSection() {
  return (
    <section className="sec day section-pad" id="compare">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">現場でのくらべかた</p>
          <h2>Excelでも、CRMでもない選択。</h2>
          <p className="lead">
            実在の1社ではなく、現場でよく検討される製品タイプごとに、公開情報に基づく目安で比べています。
          </p>
        </div>

        {/* デスクトップ/タブレット: 通常の表（コンテナ内の横スクロール保険つき） */}
        <div className="table-scroll" data-compare-table-wrap>
          <table className="compare-table compare-table--wide">
            <thead>
              <tr>
                <th scope="col">項目</th>
                {COLS.map((c) => (
                  <th scope="col" key={c.key}>
                    {c.head}
                    <span className="th-sub">{c.sub}</span>
                  </th>
                ))}
                <th scope="col" className="win-head">
                  楽マッチ
                  <span className="th-sub">不動産売買特化</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {COLS.map((c) => (
                    <td key={c.key}>{r[c.key]}</td>
                  ))}
                  <td className="win">{r.raku}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* モバイル: 行カード（読みやすさ優先・横スクロール禁止） */}
        <div className="compare-cards" data-compare-cards>
          {ROWS.map((r) => (
            <div className="compare-card" key={r.label}>
              <p className="compare-card__title">{r.label}</p>
              <div className="compare-card__rows">
                {CARD_LABELS.map((c) => (
                  <div className="compare-card__row" key={c.key}>
                    <span className="compare-card__row-label">{c.label}</span>
                    <span className="compare-card__row-value">{r[c.key]}</span>
                  </div>
                ))}
                <div className="compare-card__row compare-card__row--win">
                  <span className="compare-card__row-label">楽マッチ</span>
                  <span className="compare-card__row-value">{r.raku}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="compare-note">
          ※ A社（不動産特化CRM）・B社（ポータル連動型）・C社（汎用CRM）は実在の特定の1社ではなく、各タイプの代表的な公開情報に基づく目安です（2026年7月時点・当社調べ）。金額・条件はプランや導入形態により異なります。
        </p>

        <p style={{ marginTop: 'clamp(1.2rem,2.5vw,1.8rem)' }}>
          <a className="inline-link" href={APP_TRY_URL} onClick={() => trackCta('compare')}>
            → 実物の画面を触ってみる
          </a>
        </p>
      </div>
    </section>
  )
}
