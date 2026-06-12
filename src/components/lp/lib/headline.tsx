import { Fragment, type ReactNode } from 'react'

/**
 * 見出しの改行制御（Safari/iOS でも確実）。
 *
 * このLPの見出しは word-break: auto-phrase（文節で折る）に頼っているが、これは
 * Chrome 系専用で Safari/iOS は無視する。その結果、見出しが語の途中で割れる
 * （例: 「もったいな／い」「育たない。属／人化」「上／司」）。
 *
 * 対策として、意味のまとまり（文節）を whitespace-nowrap で包み、チャンクの
 * 境界（<wbr>）でのみ改行を許す。auto-phrase に依存しないため全ブラウザで同じ
 * 折り返しになる。文言は一切変えない（折り返し位置だけ制御する）。
 *
 * チャンクが画面幅を超えると nowrap で溢れるため、1チャンクは概ね全角9文字以内に
 * 収まるよう分割すること（長い文節は複数チャンクに分ける）。
 */
export function hl(...chunks: ReactNode[]): ReactNode {
  return chunks.map((c, i) => (
    <Fragment key={i}>
      {i > 0 ? <wbr /> : null}
      <span className="whitespace-nowrap">{c}</span>
    </Fragment>
  ))
}

// 句読点・中黒・空白の直後で区切る（語中では割らない）。
const BREAK_AFTER = '、。，．・！？　 '

/**
 * プレーンな見出し文字列を句読点等の直後で区切り、各区切りを nowrap 化する。
 * 色付き span や <br>、ブランド名（「楽マッチ AI」等の途中で割りたくない語）を
 * 含む見出しは、この関数ではなく hl(...) で手動分割すること。
 */
export function hlText(text: string): ReactNode {
  const segs: string[] = []
  let cur = ''
  for (const ch of text) {
    cur += ch
    if (BREAK_AFTER.includes(ch)) {
      segs.push(cur)
      cur = ''
    }
  }
  if (cur) segs.push(cur)
  return hl(...segs)
}
