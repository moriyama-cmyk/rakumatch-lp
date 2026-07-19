export interface FeatureShotProps {
  /** 最適化済みベース名（拡張子なし・例 "/shot-customer-app-list"）。.webp と .opt.jpg を参照。 */
  base: string;
  alt: string;
  /** 画像の実寸（レイアウトシフト防止用） */
  width: number;
  height: number;
  /** 画像の下に添える小さなキャプション（任意） */
  caption?: string;
  priority?: boolean;
  className?: string;
}

/**
 * FeatureShot — /features/* のヒーロー等で使う実プロダクト画像の額装。
 * ScreenMockup（コード製プレースホルダ）の代わりに、実画面をそのまま主役として見せる。
 * 装飾は最小限（角丸・薄い枠線・柔らかい影）にとどめ、画像を覆い隠さない。
 */
export default function FeatureShot({
  base,
  alt,
  width,
  height,
  caption,
  priority = false,
  className = "",
}: FeatureShotProps) {
  return (
    <div className={className}>
      <figure className="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-soft-lg">
        <picture>
          <source srcSet={`${base}.webp`} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${base}.opt.jpg`}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="block h-auto w-full"
          />
        </picture>
      </figure>
      {caption && (
        <p className="mt-3 text-center text-sm text-ink-500">{caption}</p>
      )}
    </div>
  );
}
