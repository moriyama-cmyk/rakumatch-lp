import { cn } from '../lib/cn'

type AppShotProps = {
  /** 最適化済みベース名（拡張子なし・例 "/shot-dashboard"）。.webp と .opt.jpg を参照。 */
  base: string
  alt: string
  /** 画像の実寸（レイアウトシフト防止用） */
  width: number
  height: number
  className?: string
  /** ファーストビュー等は即時読込＋同期デコード */
  priority?: boolean
  /**
   * ブラウザ風のヘッダーを付ける（信号ドット＋URLピル）。
   * 実画面を主役にするため既定はオフ。過去の呼び出し箇所は撤去済みだが、
   * 型として残し、必要になれば明示的に true を渡せば復活できる。
   */
  chrome?: boolean
  chromeUrl?: string
}

/** 実プロダクト画像を上品に額装（ライト・柔らかい影）。WebP優先＋JPEGフォールバック。 */
export function AppShot({
  base,
  alt,
  width,
  height,
  className,
  priority = false,
  chrome = false,
  chromeUrl = 'app.rakumatch-ai.com',
}: AppShotProps) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-xl border border-ink-900/8 bg-white shadow-soft-lg',
        className,
      )}
    >
      {chrome && (
        <div className="flex items-center gap-2 border-b border-surface-200 bg-surface-100 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-surface-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-surface-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-surface-200" />
          <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-[0.7rem] text-ink-500 ring-1 ring-surface-200">
            {chromeUrl}
          </span>
        </div>
      )}
      <picture>
        <source srcSet={`${base}.webp`} type="image/webp" />
        <img
          src={`${base}.opt.jpg`}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="block h-auto w-full"
        />
      </picture>
    </figure>
  )
}
