import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type ContainerProps = {
  children: ReactNode
  className?: string
  narrow?: boolean
}

/** 中央寄せの最大幅コンテナ。横方向のパディングでスマホ見切れを防ぐ。 */
export function Container({ children, className, narrow }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-6 lg:px-8',
        narrow ? 'max-w-container-narrow' : 'max-w-container',
        className,
      )}
    >
      {children}
    </div>
  )
}
