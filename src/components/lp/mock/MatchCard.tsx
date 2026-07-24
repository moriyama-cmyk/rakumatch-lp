import { CheckCircle2 } from 'lucide-react'
import { cn } from '../lib/cn'

/**
 * 合致理由チップに使ってよい文言は、実装(businessLogic.ts の calcMatchScoreInternal)の
 * 採点項目だけ。ここにない文言（例: 「築浅」「駅近」等の曖昧表現）を追加しないこと。
 */
export type MatchReason =
  | '間取り'
  | '希望駅'
  | '駅徒歩'
  | '沿線'
  | 'エリア'
  | '階数'
  | '利回り'
  | '築年数'
  | '構造'

export interface MatchCardData {
  /** 順位（#1 等）。省略可。 */
  rank?: number
  /** マッチ相手（物件名 or 顧客名）の表示名 */
  name: string
  /** 0〜100。70を境に色が変わる（実装 CustomerDetailPage.tsx の MatchCard と同じ閾値） */
  score: number
  /** 合致理由。表示は先頭2つまで（呼び出し側で絞る必要はない） */
  reasons: MatchReason[]
  /** 価格・間取り等の補足1行（任意） */
  meta?: string
}

interface MatchCardProps {
  data: MatchCardData
  className?: string
}

/**
 * マッチ物件/顧客カード（装飾用の再現UI）。
 * 主役はスコアバッジの色（70%以上=緑、未満=琥珀）と、降順に並ぶこと。
 */
export function MatchCard({ data, className }: MatchCardProps) {
  const { rank, name, score, reasons, meta } = data
  const isHigh = score >= 70

  return (
    <div className={cn('rounded-xl border border-surface-200 bg-white p-3 shadow-soft', className)}>
      <div className="flex items-center gap-2">
        {rank != null && <span className="shrink-0 text-sm font-bold text-ink-400">#{rank}</span>}
        <span
          className={cn(
            'shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-base font-bold',
            isHigh
              // 2026-07-24 Phase1: emerald→primary（amberは注意色として維持）
              ? 'border-primary-300 bg-primary-100 text-primary-700'
              : 'border-amber-300 bg-amber-100 text-amber-700',
          )}
        >
          {score}%
        </span>
        <span className="min-w-0 flex-1 truncate text-base font-semibold text-ink-900">{name}</span>
      </div>

      {meta && <p className="mt-1.5 truncate text-sm text-ink-600">{meta}</p>}

      {reasons.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {reasons.slice(0, 2).map((r) => (
            <span
              key={r}
              // 2026-07-24 Phase1: emerald→primary（理由チップ）
              className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-primary-200 bg-primary-50 px-2 py-0.5 text-sm font-medium text-primary-700"
            >
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              {r}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
