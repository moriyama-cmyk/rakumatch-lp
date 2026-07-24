// ブラウザ枠付きスクリーンショット + 外出し注記方式の注釈。
// 黒ラベルをスクショに被せる旧方式（AB案オリジナル）は廃止。
// 2026-07-24 森山さん指示で画像上の番号ピンも廃止し、スクショには何も重ねず、
// 説明文だけを画像の外（.pin-list）に置く。pins プロップは互換のため受け取るが未使用。
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
        </div>
      </div>
      <figcaption className="fig-caption">{caption}</figcaption>
      {list.length > 0 && (
        <ul className="pin-list pin-list--plain">
          {list.map((text, i) => (
            <li key={i}>
              <span>{text}</span>
            </li>
          ))}
        </ul>
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
