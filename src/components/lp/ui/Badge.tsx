import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

type BadgeVariant = 'eyebrow' | 'chip' | 'tag' | 'onDark'

type BadgeProps = {
  children: ReactNode
  className?: string
  icon?: ReactNode
  /**
   * 見た目のバリエーション（2026-07-24 Phase2: 各ページに散っていたインライン実装を集約）。
   * - eyebrow（既定）: セクション先頭の淡緑ピル。色まで含めて完結（旧Badgeの見た目そのまま）。
   * - chip: 白地・緑枠のアンカリングチップ（Hero.tsx の旧Chip関数と同一の見た目）。色まで含めて完結。
   * - tag: 小さめのカテゴリタグの「骨格」のみ（inline-flex・items-center・gap-1.5・text-xs）。
   *   色・背景・角丸・余白・太さは呼び出し側の className で指定する。
   *   cn は tailwind-merge 非対応（後勝ちのマージができない）ため、tag 自体は
   *   色/角丸/余白/太さのユーティリティを一切持たない設計にして、className 側の指定と
   *   絶対に競合しないようにしている（Voices の営業/お客様ラベル、Pricing の
   *   「0円ゾーン」「AI利用枠」など、形は同じでも色・角丸・余白が違うタグに共用できる）。
   * - onDark: FinalCta のダーク面専用バッジ。色まで含めて完結。
   */
  variant?: BadgeVariant
}

const variantMap: Record<BadgeVariant, string> = {
  eyebrow:
    'inline-flex items-center gap-1.5 rounded-md border border-primary-100 bg-primary-50 px-3.5 py-1.5 text-xs font-bold tracking-wide text-primary-700',
  chip: 'inline-flex items-center gap-1 rounded-md border border-primary-200 bg-white px-3 py-1 text-xs font-bold text-primary-700 sm:text-sm',
  tag: 'inline-flex items-center gap-1.5 text-xs',
  onDark:
    'inline-flex items-center gap-1.5 rounded-md border border-primary-200 bg-white px-4 py-1.5 text-xs font-bold text-primary-700',
}

/** セクションのアイブロウ／ラベル用ピル（ライト・上品）。variant でチップ／タグ／ダーク面用に切替。 */
export function Badge({ children, className, icon, variant = 'eyebrow' }: BadgeProps) {
  return (
    <span className={cn(variantMap[variant], className)}>
      {icon}
      {children}
    </span>
  )
}
