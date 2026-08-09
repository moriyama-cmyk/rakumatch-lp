import {
  CheckCircle2,
  ClipboardList,
  History,
  RefreshCw,
  Send,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'
import type { MatchReason } from './MatchCard'

/**
 * 「顧客から、合う物件を探す」画面の再現UI（画像ではなくコードで描く）。
 *
 * サイズは親の幅に対する相対値（cqw）だけで決まる。親の幅がいくつでも見た目の比率が
 * 変わらないので、画像時代に繰り返した「箱の縦横比と中身の比率がずれて文字が見切れる」
 * が原理的に起きない。中身の自然な高さ ≒ 親幅 × 1.0 なので、親の aspect-ratio を
 * 1.0 より小さく（＝縦長に）しておけば下端に余白が出るだけで済む。
 */
interface DualMatchLeftMockProps {
  className?: string
}

interface MatchRowData {
  rank: number
  /** 0〜100。70を境に色が変わる（MatchCard.tsx と同じ閾値） */
  score: number
  name: string
  propertyType: string
  price: string
  layout: string
  area: string
  trainLine: string
  station: string
  walk: string
  reasons: MatchReason[]
}

const ROWS: MatchRowData[] = [
  {
    rank: 1,
    score: 100,
    name: '代々木パークサイドレジデンス',
    propertyType: 'マンション',
    price: '9,800万円',
    layout: '2LDK',
    area: '東京都渋谷区代々木2丁目',
    trainLine: 'JR山手線',
    station: '代々木',
    walk: '徒歩7分',
    reasons: ['間取り', '希望駅', '駅徒歩', '沿線', 'エリア'],
  },
  {
    rank: 2,
    score: 55,
    name: '四谷フォレストレジデンス',
    propertyType: 'マンション',
    price: '8,980万円',
    layout: '3LDK',
    area: '東京都新宿区四谷3丁目',
    trainLine: 'JR中央線',
    station: '四ツ谷',
    walk: '徒歩6分',
    reasons: ['間取り', '駅徒歩', 'エリア'],
  },
]

export function DualMatchLeftMock({ className }: DualMatchLeftMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="flex h-full w-full flex-col text-slate-800"
        style={{ fontSize: 'clamp(9px, 2.85cqw, 24px)' }}
      >
        <TabBar />

        <div className="flex min-h-0 flex-1 flex-col px-[0.9em] pt-[0.85em]">
          <div className="flex shrink-0 items-center justify-between gap-[0.6em]">
            <p className="min-w-0 truncate text-[0.86em] leading-snug text-slate-500">
              スコア40%以上：<span className="font-bold text-slate-800">2件</span>
              <span className="text-[0.92em] text-slate-400">（登録物件14件中）</span>
            </p>
            <span className="inline-flex shrink-0 items-center gap-[0.35em] whitespace-nowrap rounded-full bg-blue-600 px-[0.9em] py-[0.45em] text-[0.8em] font-bold leading-none text-white">
              <RefreshCw className="h-[1.1em] w-[1.1em]" />
              再計算
            </span>
          </div>

          <p className="mt-[0.6em] shrink-0 truncate text-[0.78em] leading-snug text-slate-400">
            物件を選択して紹介・案内準備ができます
          </p>

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
    <div className="flex shrink-0 items-stretch gap-[0.15em] border-b border-slate-200 bg-white px-[0.7em]">
      <Tab icon={Sparkles} label="マッチ" count={2} active />
      <Tab icon={History} label="履歴" count={2} />
      <Tab icon={Send} label="紹介" />
      <Tab icon={ClipboardList} label="案内済" />
      <span className="mx-[0.4em] my-[0.75em] w-px self-stretch bg-slate-200" />
      <Tab icon={Smartphone} label="アプリ" />
    </div>
  )
}

function Tab({
  icon: Icon,
  label,
  count,
  active,
}: {
  icon: LucideIcon
  label: string
  count?: number
  active?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-[0.3em] whitespace-nowrap border-b-2 px-[0.5em] py-[0.8em] text-[0.86em] font-bold leading-none',
        active ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500',
      )}
    >
      <Icon className={cn('h-[1.15em] w-[1.15em]', active ? 'text-blue-600' : 'text-slate-400')} />
      {label}
      {count != null && (
        <span
          className={cn(
            'rounded-full px-[0.5em] py-[0.15em] text-[0.85em] font-bold',
            active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500',
          )}
        >
          {count}
        </span>
      )}
    </span>
  )
}

function MatchRow({ data }: { data: MatchRowData }) {
  const isHigh = data.score >= 70

  return (
    <div className="shrink-0 rounded-[0.75em] border border-slate-200 bg-white px-[0.85em] py-[0.8em] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-10px_rgba(15,23,42,0.25)]">
      <div className="flex items-center gap-[0.5em]">
        <span className="h-[1.1em] w-[1.1em] shrink-0 rounded-[0.25em] border-2 border-slate-300 bg-white" />
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
        <span className="min-w-0 flex-1 truncate text-[0.98em] font-bold leading-snug text-blue-700">
          {data.name}
        </span>
      </div>

      <div className="mt-[0.6em] grid grid-cols-2 gap-x-[1em] gap-y-[0.5em]">
        <Field label="種別" value={data.propertyType} />
        <Field label="価格" value={data.price} strong />
        <Field label="間取り / 面積" value={data.layout} />
        <Field label="エリア" value={data.area} />
        <Field label="沿線" value={data.trainLine} />
        <Field label="駅 / 徒歩" value={data.station} sub={data.walk} />
      </div>

      <div className="mt-[0.7em] flex flex-wrap gap-[0.35em]">
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
  )
}

function Field({
  label,
  value,
  sub,
  strong,
}: {
  label: string
  value: string
  sub?: string
  strong?: boolean
}) {
  return (
    <div className="min-w-0">
      <p className="truncate text-[0.72em] leading-none text-slate-400">{label}</p>
      <p
        className={cn(
          'mt-[0.3em] truncate text-[0.88em] leading-snug text-slate-800',
          strong && 'font-bold',
        )}
      >
        {value}
        {sub && <span className="ml-[0.4em] text-[0.86em] text-slate-500">{sub}</span>}
      </p>
    </div>
  )
}
