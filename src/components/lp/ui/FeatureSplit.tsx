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
  /** 見出しの要素（既定 h3）。ページのアウトライン整合のため呼び出し側で指定する */
  as?: 'h2' | 'h3'
  /** 見出しのサイズ/太さを呼び出し側で上書きしたい場合に指定する（既定 text-display-md） */
  titleClassName?: string
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
  as: Tag = 'h3',
  titleClassName,
}: FeatureSplitProps) {
  return (
    // 2026-07-19: grid の子は既定 min-width:auto のため、ビジュアル側（コード製の再現UI）が
    // 中身の実寸を主張すると**テキスト側のトラックごと**広がり、モバイルで本文が画面外に切れた。
    // 両カラムに min-w-0 を入れて、はみ出しを内側で吸収させる。
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* テキスト */}
      <div className={cn('min-w-0', reverse && 'lg:order-2')}>
        <Reveal>
          <Badge icon={<Icon className="h-3.5 w-3.5" />}>{eyebrow}</Badge>
          <Tag className={cn('mt-4 text-ink-900', titleClassName ?? 'text-display-md')}>{title}</Tag>
          {/* 説明本文（lead 相当）。日本語の長文が詰まって読みにくいという指摘を受け、
              18px・行間1.8でゆったり読めるようにする（孤立行抑制は globals.css の text-wrap:pretty）。 */}
          <div className="mt-5 text-lg leading-[1.8] text-ink-700 sm:mt-6">{children}</div>

          {points && (
            <ul className="mt-6 space-y-3">
              {points.map((p, i) => {
                const PIcon = p.icon ?? Icon
                return (
                  <li key={i} className="flex items-start gap-3">
                    <PIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" strokeWidth={2} aria-hidden />
                    <span className="text-sm leading-[1.7] text-ink-700">{p.text}</span>
                  </li>
                )
              })}
            </ul>
          )}

          {note && <p className="mt-5 text-xs leading-relaxed text-ink-500">{note}</p>}
        </Reveal>
      </div>

      {/* ビジュアル */}
      <div className={cn('min-w-0', reverse && 'lg:order-1')}>
        <Reveal delay={0.1}>{visual}</Reveal>
      </div>
    </div>
  )
}
