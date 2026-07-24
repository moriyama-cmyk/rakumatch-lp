// ブラウザ枠付きスクリーンショット + 番号ピン＋外出しリスト方式の注釈。
// PORT_SPEC「スクショ注釈（テロップ）の作り直し」対応: 黒ラベルをスクショに
// 被せる旧方式（AB案オリジナル）は廃止し、①②の小さな円ピンを画像上に置き、
// 説明文は画像の外（<ol class="pin-list">）に番号付きで並べる。
export type Pin = {
  n: number
  /** 画像内でのおおよその位置（%）。left/right どちらか一方を指定。 */
  top: string
  left?: string
  right?: string
}

export type DetailCrop = {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}

type BrowserShotProps = {
  url: string
  src: string
  width: number
  height: number
  alt: string
  caption: string
  pins?: Pin[]
  list?: string[]
  className?: string
  /** true の場合 `data-fallback-figure` を付与（デスクトップ強化時にCSSで非表示にする対象）。 */
  fallback?: boolean
  /** 全景では潰れる細部を読めるようにする、assets班の拡大切り出し画像（補助・任意）。 */
  detail?: DetailCrop
}

export function BrowserShot({
  url,
  src,
  width,
  height,
  alt,
  caption,
  pins = [],
  list = [],
  className,
  fallback,
  detail,
}: BrowserShotProps) {
  return (
    <figure
      className={className ? `loop-step__figure fig ${className}` : 'loop-step__figure fig'}
      {...(fallback ? { 'data-fallback-figure': true } : {})}
    >
      <div className="browser-frame">
        <div className="browser-frame__bar">
          <span className="browser-frame__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="browser-frame__url">{url}</span>
        </div>
        <div className="browser-frame__body">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={width} height={height} loading="lazy" alt={alt} />
          {pins.map((p) => (
            <span
              key={p.n}
              className="pin-dot"
              style={{ top: p.top, left: p.left, right: p.right }}
              aria-hidden="true"
            >
              {p.n}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="fig-caption">{caption}</figcaption>
      {list.length > 0 && (
        <ol className="pin-list">
          {list.map((text, i) => (
            <li key={i}>
              <span className="pin-num" aria-hidden="true">
                {i + 1}
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ol>
      )}
      {detail && (
        <div className="detail-crop">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={detail.src} width={detail.width} height={detail.height} loading="lazy" alt={detail.alt} />
          <figcaption>{detail.caption}</figcaption>
        </div>
      )}
    </figure>
  )
}
