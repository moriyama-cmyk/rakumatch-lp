import { Fragment, type ReactNode } from 'react'

// 分断されると意味が壊れる、または1〜2文字の孤立行を生みやすい語句。
// これらを <span class="whitespace-nowrap"> で包み、語中・句中での改行を防ぐ。
// （word-break: auto-phrase 非対応の Safari/Firefox でも確実に効かせるための保険）
// 長い語を先に置く（部分一致の取りこぼし防止）。文言は一切変えない。
export const KEEP_TOGETHER: string[] = [
  // 機能名・複合語
  'お客様連動アプリ',
  '無料トライアル',
  '双方向マッチング',
  '専属AI',
  '双方向',
  '逆流',
  '媒体連携',
  '媒体連動',
  '反響管理',
  '初期費用',
  '人数課金',
  '手入力',
  '開発費',
  '設計',
  '税込',
  // 比較表・カードで孤立しやすい「名詞＋短い接尾/述語」
  '契約フェーズ',
  '自動計算',
  '貼るだけ',
  '例が多い',
  '潜在ニーズ',
  '次の一手',
]

/**
 * テキスト中の登録語を <span class="whitespace-nowrap"> で包み、語中・句中での
 * 改行を防ぐ。文言は一切変えず（並べ替え・削除なし）、折り返し位置だけ制御する。
 */
export function protect(text: string): ReactNode {
  if (!text) return text
  const pattern = new RegExp(`(${KEEP_TOGETHER.join('|')})`, 'g')
  const parts = text.split(pattern)
  return parts.map((part, i) =>
    KEEP_TOGETHER.includes(part) ? (
      <span key={i} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}
