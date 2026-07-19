import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type SectionProps = {
  children: ReactNode
  id?: string
  className?: string
  /**
   * セクション上下の余白。4段階（つなぎ/通常/通常(強)/山場）。
   * - sm  … つなぎ（帯として通過させるセクション）
   * - md  … 通常
   * - lg  … 通常（強）
   * - xl  … 山場。ページ内で #problem / #why / #pricing / #cta の4箇所のみ使用
   */
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}

const spacingMap = {
  sm: 'py-10 sm:py-14',
  md: 'py-16 sm:py-24',
  lg: 'py-20 sm:py-28',
  xl: 'py-28 sm:py-40 lg:py-52',
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
