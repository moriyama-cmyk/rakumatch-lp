import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type BadgeProps = {
  children: ReactNode
  className?: string
  icon?: ReactNode
}

/** セクションのアイブロウ／ラベル用ピル（ライト・上品）。 */
export function Badge({ children, className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-3.5 py-1.5 text-xs font-bold tracking-wide text-primary-700',
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
