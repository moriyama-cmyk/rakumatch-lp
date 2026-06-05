import { cn } from '../lib/cn'

type LogoProps = {
  className?: string
  withWordmark?: boolean
}

/** 楽マッチ AI のロゴ。マークは双方向マッチングを示す対の矢印（ライト配色）。 */
export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 9h11l-3-3" />
          <path d="M19 15H8l3 3" />
        </svg>
      </span>
      {withWordmark && (
        <span className="text-lg font-bold tracking-tight text-ink-900">
          楽マッチ<span className="ml-1 text-primary-600">AI</span>
        </span>
      )}
    </span>
  )
}
