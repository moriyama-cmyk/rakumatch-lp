import { ArrowUpDown, ChevronDown, Home, MapPin, Ruler, Star, TrainFront, Trash2, Users } from 'lucide-react'
import { cn } from '../lib/cn'

/**
 * 「AIが項目へ整理」＝物件一覧画面の再現UI（画像ではなくコードで描く）。
 *
 * DualMatchLeftMock / DualMatchRightMock と同じ方式：サイズは親の幅に対する相対値
 * （cqw / em）だけで決まる。親の幅がいくつでも見た目の比率が変わらないので、画像時代に
 * 繰り返した「箱の縦横比と中身の比率がずれて文字が見切れる」が原理的に起きない。
 * 3カラムグリッドなので基準フォントは1カラム版（2.85cqw）のおよそ1/3にしてある。
 * 中身の自然な高さ ≒ 親幅 × 0.42 なので、親をそれより縦長にすれば下に余白が出るだけで済む。
 */
interface PropertyGridMockProps {
  className?: string
}

interface FilterTabData {
  label: string
  count: number
}

const FILTER_TABS: FilterTabData[] = [
  { label: 'すべて', count: 14 },
  { label: 'マンション', count: 11 },
  { label: '戸建', count: 0 },
  { label: '土地', count: 0 },
  { label: '区分・OC', count: 2 },
  { label: '一棟収益', count: 1 },
]

interface PropertyData {
  name: string
  price: string
  address: string
  access: string
  layout: string
  area: string
  /** 坪単価（括弧つきで面積の右に小さく出る） */
  unitPrice: string
  floor: string
  age: string
  registeredAt: string
  matchCount: number
}

const PROPERTIES: PropertyData[] = [
  {
    name: '中延ステーションレジデンス',
    price: '5,980万円',
    address: '東京都品川区中延5丁目',
    access: '都営浅草線 中延駅 徒歩5分',
    layout: '3LDK',
    area: '68.5㎡',
    unitPrice: '289万/坪',
    floor: '5階',
    age: '築7年',
    registeredAt: '2026/6/3',
    matchCount: 1,
  },
  {
    name: '三軒茶屋ガーデンコート',
    price: '7,480万円',
    address: '東京都世田谷区三軒茶屋1丁目',
    access: '東急田園都市線 三軒茶屋駅 徒歩6分',
    layout: '3LDK',
    area: '72.3㎡',
    unitPrice: '342万/坪',
    floor: '3階',
    age: '築8年',
    registeredAt: '2026/6/3',
    matchCount: 1,
  },
  {
    name: '麻布十番タワーレジデンス',
    price: '12,800万円',
    address: '東京都港区麻布十番2丁目',
    access: '東京メトロ南北線 麻布十番駅 徒歩4分',
    layout: '2LDK',
    area: '58.2㎡',
    unitPrice: '727万/坪',
    floor: '18階',
    age: '築6年',
    registeredAt: '2026/6/3',
    matchCount: 1,
  },
  {
    name: '四谷フォレストコート',
    price: '8,980万円',
    address: '東京都新宿区四谷3丁目',
    access: 'JR中央線 四ツ谷駅 徒歩6分',
    layout: '3LDK',
    area: '70.1㎡',
    unitPrice: '423万/坪',
    floor: '7階',
    age: '築9年',
    registeredAt: '2026/6/3',
    matchCount: 1,
  },
  {
    name: '自由が丘グランテラス',
    price: '9,200万円',
    address: '東京都目黒区自由が丘1丁目',
    access: '東急東横線 自由が丘駅 徒歩9分',
    layout: '3LDK',
    area: '75.4㎡',
    unitPrice: '403万/坪',
    floor: '6階',
    age: '築10年',
    registeredAt: '2026/6/3',
    matchCount: 0,
  },
  {
    name: '茗荷谷ヒルズ',
    price: '7,980万円',
    address: '東京都文京区小石川4丁目',
    access: '東京メトロ丸ノ内線 茗荷谷駅 徒歩7分',
    layout: '3LDK',
    area: '70㎡',
    unitPrice: '377万/坪',
    floor: '8階',
    age: '築7年',
    registeredAt: '2026/6/3',
    matchCount: 1,
  },
]

export function PropertyGridMock({ className }: PropertyGridMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden bg-slate-50', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="flex h-full w-full flex-col text-slate-800 text-[length:clamp(9px,2.6cqw,16px)] @[420px]:text-[length:clamp(7px,1.6cqw,16px)] @[680px]:text-[length:clamp(5px,0.92cqw,16px)]"
      >
        <div className="shrink-0 border-b border-slate-200 bg-white px-[1.4em] pb-[0.9em] pt-[1em]">
          <div className="flex items-center gap-[0.6em] overflow-x-auto">
            {FILTER_TABS.map((tab, index) => (
              <FilterTab key={tab.label} data={tab} active={index === 0} />
            ))}
          </div>

          <div className="mt-[0.95em] flex items-center gap-[0.55em]">
            <ArrowUpDown className="h-[1.15em] w-[1.15em] shrink-0 text-slate-400" />
            <span className="shrink-0 whitespace-nowrap text-[0.95em] leading-none text-slate-500">
              並び替え:
            </span>
            <span className="inline-flex shrink-0 items-center gap-[1.6em] whitespace-nowrap rounded-[0.45em] border border-slate-300 bg-white px-[0.8em] py-[0.55em] text-[0.95em] font-medium leading-none text-slate-700">
              登録が新しい順
              <ChevronDown className="h-[1.1em] w-[1.1em] text-slate-400" />
            </span>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-[1.4em] pt-[1.1em]">
          <p className="shrink-0 text-[0.95em] leading-none text-slate-500">14件</p>

          <div className="mt-[1.1em] grid min-h-0 flex-1 grid-cols-1 content-start gap-[1.6em] overflow-hidden pb-[1.2em] @[420px]:grid-cols-2 @[680px]:grid-cols-3">
            {PROPERTIES.map((property) => (
              <PropertyItem key={property.name} data={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterTab({ data, active }: { data: FilterTabData; active?: boolean }) {
  const muted = !active && data.count === 0

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-[0.5em] whitespace-nowrap rounded-full px-[1em] py-[0.55em] text-[0.95em] font-bold leading-none',
        active && 'bg-emerald-500 text-white',
        !active && !muted && 'bg-slate-100 text-slate-600',
        muted && 'bg-slate-100 text-slate-400',
      )}
    >
      {data.label}
      <span
        className={cn(
          'rounded-full px-[0.5em] py-[0.2em] text-[0.85em] font-bold leading-none',
          active && 'bg-white/25 text-white',
          !active && !muted && 'bg-white text-slate-500',
          muted && 'bg-white text-slate-300',
        )}
      >
        {data.count}
      </span>
    </span>
  )
}

function PropertyItem({ data }: { data: PropertyData }) {
  const hasMatch = data.matchCount > 0

  return (
    <div className="flex min-w-0 flex-col rounded-[0.7em] border border-slate-200 bg-white px-[1.05em] pb-[0.75em] pt-[0.95em] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-14px_rgba(15,23,42,0.3)]">
      <div className="flex items-center gap-[0.55em]">
        <span className="shrink-0 whitespace-nowrap rounded-full bg-blue-100 px-[0.7em] py-[0.28em] text-[0.85em] font-bold leading-none text-blue-700">
          マンション
        </span>
        <span className="min-w-0 flex-1 truncate text-[1.1em] font-bold leading-snug text-slate-900">
          {data.name}
        </span>
        <Star className="h-[1.25em] w-[1.25em] shrink-0 text-slate-300" />
        <Trash2 className="h-[1.2em] w-[1.2em] shrink-0 text-slate-300" />
      </div>

      <p className="mt-[0.45em] truncate text-[1.75em] font-bold leading-tight tracking-tight text-slate-900">
        {data.price}
      </p>

      <div className="mt-[0.7em] flex items-center gap-[0.4em]">
        <MapPin className="h-[1.05em] w-[1.05em] shrink-0 text-slate-400" />
        <span className="min-w-0 truncate text-[0.95em] leading-snug text-slate-600">
          {data.address}
        </span>
      </div>

      <div className="mt-[0.4em] flex items-center gap-[0.4em]">
        <TrainFront className="h-[1.05em] w-[1.05em] shrink-0 text-slate-400" />
        <span className="min-w-0 truncate text-[0.95em] leading-snug text-slate-600">
          {data.access}
        </span>
      </div>

      <div className="mt-[0.55em] grid grid-cols-2 gap-x-[0.8em] gap-y-[0.4em]">
        <div className="flex min-w-0 items-center gap-[0.4em]">
          <Home className="h-[1.05em] w-[1.05em] shrink-0 text-slate-400" />
          <span className="truncate text-[0.95em] leading-snug text-slate-600">{data.layout}</span>
        </div>
        <div className="flex min-w-0 items-center gap-[0.4em]">
          <Ruler className="h-[1.05em] w-[1.05em] shrink-0 text-slate-400" />
          <span className="truncate text-[0.95em] leading-snug text-slate-600">{data.area}</span>
          <span className="truncate text-[0.82em] leading-snug text-slate-400">
            （{data.unitPrice}）
          </span>
        </div>
        <span className="truncate text-[0.95em] leading-snug text-slate-600">{data.floor}</span>
        <span className="truncate text-[0.95em] leading-snug text-slate-600">{data.age}</span>
      </div>

      <div className="mt-[0.85em] flex items-center justify-between gap-[0.6em] border-t border-slate-100 pt-[0.7em]">
        <span className="min-w-0 truncate text-[0.9em] leading-none text-slate-400">
          登録: {data.registeredAt}
        </span>
        <span
          className={cn(
            'inline-flex shrink-0 items-center gap-[0.35em] whitespace-nowrap rounded-full px-[0.75em] py-[0.4em] text-[0.9em] font-bold leading-none',
            hasMatch ? 'bg-violet-50 text-violet-600' : 'bg-slate-100 text-slate-400',
          )}
        >
          <Users className="h-[1.05em] w-[1.05em]" />
          マッチ {data.matchCount}名
        </span>
      </div>
    </div>
  )
}
