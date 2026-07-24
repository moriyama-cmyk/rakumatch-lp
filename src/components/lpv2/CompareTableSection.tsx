'use client'

// 詳細比較表（PORT_SPEC「詳細比較表」仕様の14行）。
// 実在サービス名は出さず、他社セルは事実ベース表現（「〜が多い」「一般に〜」）に統一。
// モバイルは横スクロール表ではなく、行ごとのカード（compare-cards）に組み替える
// （PORT_SPEC「比較表がスマホで読める」品質ゲート対応）。
import { trackCta } from '@/lib/track'

const APP_TRY_URL = 'https://app.rakumatch-ai.com/try'

type Row = { label: string; excel: string; crm: string; raku: string }

const ROWS: Row[] = [
  { label: 'レインズ一覧の取り込み', excel: '1件ずつ手入力', crm: '手入力（規約上、自動連携は不可）', raku: '貼るだけでAIが解析・登録' },
  { label: '図面PDF・スクショからの登録', excel: '手入力', crm: 'オプション対応の製品も', raku: '投げ込むだけ（標準機能）' },
  { label: '反響メールからの顧客登録', excel: 'コピペで転記', crm: '媒体連携の設定が前提のことが多い', raku: 'メール文を貼るだけ' },
  { label: 'この物件を誰に紹介するか', excel: '表からは分からない', crm: '検索・抽出の操作が必要なことが多い', raku: '全物件に「マッチ○名」が自動表示' },
  { label: '案内済み物件の管理', excel: '記憶とメモ', crm: '手動更新', raku: '候補から自動で外れる' },
  { label: '提案メール・電話トーク', excel: 'ゼロから作成', crm: '定型文まで', raku: 'AIが下書き' },
  { label: 'お客様からの物件共有（逆方向）', excel: '不可', crm: 'ほぼ見られない', raku: 'お客様アプリで自動で届く' },
  { label: '追客アラート', excel: '気づいた人だけ', crm: '設定すれば可', raku: '連絡が途絶えると自動警告' },
  { label: '導入までの設定', excel: '—', crm: '初期設定・研修が前提のことが多い', raku: '貼れば今日から' },
  { label: '初期費用', excel: '0円', crm: '発生することが多い', raku: '0円' },
  { label: '月額', excel: '0円（ただし人件費で払っている）', crm: '価格非公開が多い（資料請求→商談）', raku: '3,000円/人（税込・公開）' },
  { label: '媒体連携費', excel: '—', crm: '別費用のことが多い', raku: '0円' },
  { label: '最低利用期間', excel: '—', crm: '年間契約が多い', raku: 'なし' },
  { label: '試し方', excel: '—', crm: '資料請求→商談→デモ', raku: '登録なしで今すぐ実物を触れる' },
]

export function CompareTableSection() {
  return (
    <section className="sec day section-pad" id="compare">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">現場でのくらべかた</p>
          <h2>Excelでも、CRMでもない選択。</h2>
          <p className="lead">特定のサービス名ではなく、現場でよく見る運用のかたちと比べています。</p>
        </div>

        {/* デスクトップ/タブレット: 通常の表（横スクロール保険つき） */}
        <div className="table-scroll" data-compare-table-wrap>
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">項目</th>
                <th scope="col">Excel・紙の台帳</th>
                <th scope="col">従来の高機能CRM（一般的な例）</th>
                <th scope="col">楽マッチ</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.excel}</td>
                  <td>{r.crm}</td>
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
                <div className="compare-card__row">
                  <span className="compare-card__row-label">EXCEL・紙</span>
                  <span className="compare-card__row-value">{r.excel}</span>
                </div>
                <div className="compare-card__row">
                  <span className="compare-card__row-label">高機能CRM</span>
                  <span className="compare-card__row-value">{r.crm}</span>
                </div>
                <div className="compare-card__row compare-card__row--win">
                  <span className="compare-card__row-label">楽マッチ</span>
                  <span className="compare-card__row-value">{r.raku}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: 'clamp(1.6rem,3vw,2.2rem)' }}>
          <a className="inline-link" href={APP_TRY_URL} onClick={() => trackCta('compare')}>
            → 実物の画面を触ってみる
          </a>
        </p>
      </div>
    </section>
  )
}
