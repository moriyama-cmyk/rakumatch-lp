import {
  CheckCircle2,
  ClipboardList,
  GripVertical,
  RefreshCw,
  Send,
  Smartphone,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'
import type { MatchReason } from './MatchCard'

/**
 * ヒーローのノートPC画面、右列「マッチ物件リスト」の再現UI（画像ではなくコードで描く）。
 *
 * DualMatchLeftMock と同じ方式：サイズは親の幅に対する相対値（cqw / em）だけで決まる。
 * 親の幅がいくつでも見た目の比率が変わらないので、画像時代に繰り返した
 * 「箱の縦横比と中身の比率がずれて文字が見切れる」が原理的に起きない。
 * 中身が親の高さを超えた分は overflow-hidden で自然に隠れる。
 */
interface HeroMatchListMockProps {
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
    name: '三軒茶屋ガーデンレジデンス',
    propertyType: 'マンション',
    price: '7,480万円',
    layout: '3LDK',
    area: '東京都世田谷区三軒茶屋1丁目',
    trainLine: '東急田園都市線',
    station: '三軒茶屋',
    walk: '徒歩6分',
    reasons: ['間取り', '希望駅', '駅徒歩', '沿線', 'エリア'],
  },
  {
    rank: 2,
    score: 100,
    name: '桜新町ガーデンハウス',
    propertyType: 'マンション',
    price: '6,980万円',
    layout: '3LDK',
    area: '東京都世田谷区桜新町2丁目',
    trainLine: '東急田園都市線',
    station: '桜新町',
    walk: '徒歩8分',
    reasons: ['間取り', '希望駅', '駅徒歩', '沿線', 'エリア'],
  },
]

export function HeroMatchListMock({ className }: HeroMatchListMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden bg-white', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="flex h-full w-full flex-col text-slate-800"
        style={{ fontSize: 'clamp(7px, 3.1cqw, 22px)' }}
      >
        <TabBar />

        <div className="flex min-h-0 flex-1 flex-col px-[0.85em] pt-[0.95em]">
          <div className="flex shrink-0 items-center justify-between gap-[0.6em]">
            <p className="min-w-0 truncate text-[0.82em] leading-snug text-slate-500">
              スコア40%以上：<span className="font-bold text-blue-700">2件</span>
              <span className="ml-[0.5em] text-[0.94em] text-slate-400">（登録物件 14件中）</span>
            </p>
            <span className="inline-flex shrink-0 items-center gap-[0.35em] whitespace-nowrap rounded-full bg-blue-600 px-[0.9em] py-[0.5em] text-[0.78em] font-bold leading-none text-white">
              <RefreshCw className="h-[1.15em] w-[1.15em]" />
              再計算
            </span>
          </div>

          <p className="mt-[0.75em] shrink-0 truncate text-[0.8em] leading-snug text-slate-400">
            物件を選択して紹介・案内準備ができます
          </p>

          <div className="mt-[0.8em] flex min-h-0 flex-1 flex-col gap-[0.75em] overflow-hidden pb-[0.9em]">
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
    <div className="flex shrink-0 items-stretch overflow-hidden border-b border-slate-200 bg-white px-[0.6em]">
      <Tab icon={Send} label="紹介" grip />
      <Tab icon={Sparkles} label="マッチ" count={2} grip active />
      <Tab icon={ClipboardList} grip />
      <span className="my-[0.7em] ml-[0.35em] mr-[0.55em] w-px shrink-0 self-stretch bg-slate-200" />
      <Tab icon={Smartphone} label="アプリ" count={4} />
    </div>
  )
}

function Tab({
  icon: Icon,
  label,
  count,
  grip,
  active,
}: {
  icon: LucideIcon
  label?: string
  count?: number
  grip?: boolean
  active?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-[0.3em] whitespace-nowrap border-b-2 px-[0.35em] py-[0.85em] text-[0.9em] leading-none',
        active ? 'border-blue-600 font-bold text-blue-600' : 'border-transparent font-medium text-slate-700',
      )}
    >
      {grip && <GripVertical className="h-[1.1em] w-[1.1em] shrink-0 text-slate-300" />}
      <Icon className={cn('h-[1.2em] w-[1.2em] shrink-0', active ? 'text-blue-600' : 'text-slate-500')} />
      {label}
      {count != null && (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full px-[0.5em] py-[0.22em] text-[0.85em] font-bold',
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
    <div className="shrink-0 rounded-[0.85em] border border-slate-200 bg-white px-[0.85em] py-[0.85em] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-12px_rgba(15,23,42,0.25)]">
      <div className="flex items-center gap-[0.5em]">
        <span className="h-[1.3em] w-[1.3em] shrink-0 rounded-[0.28em] border-[0.11em] border-slate-300 bg-white" />
        <span className="shrink-0 text-[0.78em] font-bold leading-none text-slate-500">
          #{data.rank}
        </span>
        <span
          className={cn(
            'shrink-0 rounded-full border px-[0.8em] py-[0.28em] text-[0.95em] font-extrabold leading-snug',
            isHigh
              ? 'border-emerald-200 bg-emerald-100 text-emerald-600'
              : 'border-amber-200 bg-amber-100 text-amber-600',
          )}
        >
          {data.score}%
        </span>
        <span className="min-w-0 flex-1 truncate text-[0.98em] font-bold leading-snug text-blue-700">
          {data.name}
        </span>
      </div>

      <div className="mt-[0.75em] grid grid-cols-2 gap-x-[1em] gap-y-[0.65em]">
        <Field label="種別" value={data.propertyType} />
        <Field label="価格" value={data.price} strong />
        <Field label="間取り / 面積" value={data.layout} />
        <Field label="エリア" value={data.area} wrap />
        <Field label="沿線" value={data.trainLine} />
        <Field label="駅 / 徒歩" value={data.station} sub={data.walk} />
      </div>

      <div className="mt-[0.85em] flex flex-wrap gap-[0.4em]">
        {data.reasons.map((reason) => (
          <span
            key={reason}
            className="inline-flex items-center gap-[0.3em] whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-[0.65em] py-[0.3em] text-[0.8em] font-medium leading-none text-emerald-700"
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
  wrap,
}: {
  label: string
  value: string
  sub?: string
  strong?: boolean
  /** 住所のように長い値だけ2行まで折り返す（実画面と同じ見え方） */
  wrap?: boolean
}) {
  return (
    <div className="min-w-0">
      <p className="truncate text-[0.75em] leading-none text-slate-400">{label}</p>
      <p
        className={cn(
          'mt-[0.35em] text-[0.9em] leading-snug text-slate-800',
          wrap ? 'line-clamp-2' : 'truncate',
          strong && 'font-bold',
        )}
      >
        {value}
        {sub && <span className="ml-[0.4em] text-[0.86em] text-slate-400">{sub}</span>}
      </p>
    </div>
  )
}
