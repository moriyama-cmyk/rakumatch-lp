import { cn } from '../lib/cn'

type ImgProps = {
  /** 最適化済みベース名（拡張子なし・例 "/ai-partner"）。.webp と .opt.jpg を参照。 */
  base: string
  alt: string
  /** 画像の実寸（aspect-ratio / CLS 防止用） */
  width: number
  height: number
  className?: string
  /** ファーストビュー等は eager。既定は lazy。 */
  priority?: boolean
  /** 装飾画像なら true（alt 空 + aria-hidden） */
  decorative?: boolean
}

/**
 * WebP優先＋JPEGフォールバックの <picture>。width/height で CLS を防ぎ、
 * decoding=async でペイントを安定化。重い画像は lazy。
 */
export function Img({
  base,
  alt,
  width,
  height,
  className,
  priority = false,
  decorative = false,
}: ImgProps) {
  return (
    <picture>
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img
        src={`${base}.opt.jpg`}
        alt={decorative ? '' : alt}
        aria-hidden={decorative || undefined}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('block h-auto w-full', className)}
      />
    </picture>
  )
}
