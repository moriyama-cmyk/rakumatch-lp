import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type SectionProps = {
  children: ReactNode
  id?: string
  className?: string
  /** セクション上下の余白。デフォルトは大きめ。 */
  spacing?: 'sm' | 'md' | 'lg'
}

const spacingMap = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-20 sm:py-32',
} as const

/** ランドマークとなるセクションラッパ。overflow-x を閉じてはみ出しを防ぐ。 */
export function Section({ children, id, className, spacing = 'md' }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative w-full overflow-x-clip', spacingMap[spacing], className)}
    >
      {children}
    </section>
  )
}
