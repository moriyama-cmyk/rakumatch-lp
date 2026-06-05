import type { ElementType, ReactNode } from 'react'
import { cn } from '../lib/cn'

type EmphasisProps = {
  children: ReactNode
  className?: string
  as?: ElementType
  /** primary=ブランド緑 / gold=アクセント。発光・グラデは使わない。 */
  variant?: 'primary' | 'gold'
}

const variantMap = {
  primary: 'text-primary-600',
  gold: 'text-accent-600',
} as const

/**
 * 見出し中の強調語。クリーン・ライト方針につき、ネオングラデは廃止し
 * ブランド緑（既定）またはゴールドの単色強調にする。
 */
export function GradientText({
  children,
  className,
  as: Tag = 'span',
  variant = 'primary',
}: EmphasisProps) {
  return <Tag className={cn(variantMap[variant], className)}>{children}</Tag>
}
