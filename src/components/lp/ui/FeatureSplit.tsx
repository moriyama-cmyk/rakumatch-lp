import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { Badge } from './Badge'
import { cn } from '../lib/cn'

type FeatureSplitProps = {
  icon: LucideIcon
  eyebrow: string
  title: ReactNode
  children: ReactNode
  points?: { icon?: LucideIcon; text: ReactNode }[]
  note?: ReactNode
  /** ビジュアル側（実プロダクト画像など） */
  visual: ReactNode
  /** ビジュアルを左に置く（交互配置用） */
  reverse?: boolean
}

/** 大きな交互配置の機能ブロック（テキスト＋実画像）。ライト・上品。 */
export function FeatureSplit({
  icon: Icon,
  eyebrow,
  title,
  children,
  points,
  note,
  visual,
  reverse,
}: FeatureSplitProps) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* テキスト */}
      <div className={cn(reverse && 'lg:order-2')}>
        <Reveal>
          <Badge icon={<Icon className="h-3.5 w-3.5" />}>{eyebrow}</Badge>
          <h3 className="mt-5 text-display-md text-ink-900">{title}</h3>
          {/* 説明本文。日本語の長文が詰まって読みにくいという指摘を受け、17px・行間1.9で
              ゆったり読めるようにする（孤立行抑制は globals.css の text-wrap:pretty）。 */}
          <div className="mt-4 text-[1.0625rem] leading-[1.9] text-ink-700">{children}</div>

          {points && (
            <ul className="mt-6 space-y-3">
              {points.map((p, i) => {
                const PIcon = p.icon ?? Icon
                return (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                      <PIcon className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-ink-700">{p.text}</span>
                  </li>
                )
              })}
            </ul>
          )}

          {note && <p className="mt-5 text-xs leading-relaxed text-ink-500">{note}</p>}
        </Reveal>
      </div>

      {/* ビジュアル */}
      <div className={cn(reverse && 'lg:order-1')}>
        <Reveal delay={0.1}>{visual}</Reveal>
      </div>
    </div>
  )
}
