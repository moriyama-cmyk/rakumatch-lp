import { CheckCircle2, ChevronRight, Mail } from 'lucide-react'
import { cn } from '../lib/cn'
import type { MatchReason } from './MatchCard'

/**
 * 「物件から、紹介先の顧客を探す」画面の再現UI（画像ではなくコードで描く）。
 *
 * 隣に並ぶ DualMatchLeftMock と同じ方式：サイズは親の幅に対する相対値（cqw / em）だけで
 * 決まる。親の幅がいくつでも見た目の比率が変わらないので、画像時代に繰り返した
 * 「箱の縦横比と中身の比率がずれて文字が見切れる」が原理的に起きない。
 * 基準フォントサイズの clamp は左パネルと同値にしてあり、左右を並べたとき文字の大きさが揃う。
 */
interface DualMatchRightMockProps {
  className?: string
}

interface MatchRowData {
  rank: number
  /** 0〜100。70を境に色が変わる（MatchCard.tsx と同じ閾値） */
  score: number
  name: string
  reasons: MatchReason[]
}

const ROWS: MatchRowData[] = [
  {
    rank: 1,
    score: 100,
    name: '小林 拓也',
    reasons: ['間取り', '希望駅', '駅徒歩', '沿線', 'エリア'],
  },
  {
    rank: 2,
    score: 55,
    name: '中村 彩花',
    reasons: ['間取り', '駅徒歩', 'エリア'],
  },
]

export function DualMatchRightMock({ className }: DualMatchRightMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden bg-white', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="flex h-full w-full flex-col text-slate-800"
        style={{ fontSize: 'clamp(9px, 2.85cqw, 19px)' }}
      >
        <TabBar />

        <div className="flex min-h-0 flex-1 flex-col px-[0.9em] pt-[0.85em]">
          <div className="flex shrink-0 items-center justify-between gap-[0.6em]">
            <p className="min-w-0 truncate text-[0.86em] leading-snug text-slate-500">
              スコア40%以上：<span className="font-bold text-violet-600">2名</span>
            </p>
            <span className="inline-flex shrink-0 items-center gap-[0.35em] whitespace-nowrap rounded-full bg-blue-600 px-[0.9em] py-[0.45em] text-[0.8em] font-bold leading-none text-white">
              <Mail className="h-[1.1em] w-[1.1em]" />
              一斉メール作成
            </span>
          </div>

          <div className="mt-[0.7em] flex min-h-0 flex-1 flex-col gap-[0.7em] overflow-hidden pb-[0.9em]">
            {ROWS.map((row) => (
              <MatchRow key={row.rank} data={row} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TabBar() {
  return (
    <div className="flex shrink-0 items-stretch gap-[1.1em] border-b border-slate-200 bg-white px-[1em]">
      <Tab label="マッチ顧客" count={2} active />
      <Tab label="紹介済み" count={0} />
    </div>
  )
}

function Tab({ label, count, active }: { label: string; count: number; active?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-[0.4em] whitespace-nowrap border-b-2 py-[0.85em] text-[0.9em] leading-none',
        active ? 'border-emerald-500 font-bold text-emerald-700' : 'border-transparent font-medium text-slate-500',
      )}
    >
      {label}
      <span
        className={cn(
          'rounded-full px-[0.5em] py-[0.15em] text-[0.85em] font-bold',
          active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500',
        )}
      >
        {count}
      </span>
    </span>
  )
}

function MatchRow({ data }: { data: MatchRowData }) {
  const isHigh = data.score >= 70

  return (
    <div className="flex shrink-0 items-center gap-[0.7em] rounded-[0.75em] border border-slate-200 bg-slate-50 px-[0.85em] py-[0.8em]">
      <span className="shrink-0 text-[0.85em] font-bold leading-none text-slate-500">
        #{data.rank}
      </span>
      <span
        className={cn(
          'shrink-0 rounded-full border px-[0.7em] py-[0.2em] text-[0.95em] font-extrabold leading-snug',
          isHigh
            ? 'border-emerald-300 bg-emerald-100 text-emerald-700'
            : 'border-amber-300 bg-amber-100 text-amber-700',
        )}
      >
        {data.score}%
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.98em] font-bold leading-snug text-slate-900">{data.name}</p>
        <div className="mt-[0.45em] flex flex-wrap items-center gap-[0.35em]">
          <span className="shrink-0 text-[0.76em] leading-none text-slate-400">合致条件:</span>
          {data.reasons.map((reason) => (
            <span
              key={reason}
              className="inline-flex items-center gap-[0.3em] whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-[0.6em] py-[0.25em] text-[0.78em] font-medium leading-none text-emerald-700"
            >
              <CheckCircle2 className="h-[1.05em] w-[1.05em]" />
              {reason}
            </span>
          ))}
        </div>
      </div>

      <ChevronRight className="h-[1.2em] w-[1.2em] shrink-0 text-slate-300" />
    </div>
  )
}
