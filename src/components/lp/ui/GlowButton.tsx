import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark'
type Size = 'sm' | 'md' | 'lg'

type ButtonProps = {
  children: ReactNode
  className?: string
  variant?: Variant
  size?: Size
} & AnchorHTMLAttributes<HTMLAnchorElement>

// whitespace-nowrap: ボタン内テキストは絶対に折り返さない（スマホで「無料で／試す」のように割れるのを防ぐ）。
const base =
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-bold tracking-tight transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-50 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  // 単色 primary-600（hover 700）。柔らかい影のみ。発光なし。
  primary: 'bg-primary-600 text-white shadow-cta hover:bg-primary-700 hover:-translate-y-px active:translate-y-0',
  // 白＋枠線。常時の影は持たない（テンプレっぽさの原因のため撤去）。
  secondary:
    'border border-surface-200 bg-white text-ink-900 hover:border-primary-200 hover:bg-primary-50 hover:-translate-y-px active:translate-y-0',
  ghost: 'text-ink-700 hover:text-primary-700 hover:bg-primary-50',
  // ダーク面（FinalCta）専用の二番手ボタン。primary の白発光より確実に沈める必要があるため、
  // secondary/ghost と衝突するクラス（bg-white 等）を含まない専用トークンにする（cn は tailwind-merge 非対応のため）。
  onDark: 'border border-white/20 bg-transparent text-white hover:bg-white/10 hover:-translate-y-px active:translate-y-0',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-7 text-sm',
  lg: 'h-14 px-9 text-base sm:text-lg',
}

/** クリーンな主要 CTA（アンカー）。発光は使わず、単色＋柔らかい影。 */
export function GlowButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...rest
}: ButtonProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  )
}
