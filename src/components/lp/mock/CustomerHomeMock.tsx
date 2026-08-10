import { Building2, ChevronRight, House, Settings, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

/**
 * 「お客様アプリ」ホーム画面の再現UI（画像ではなくコードで描く）。
 *
 * 他のMockと同じ方式：サイズは親の幅に対する相対値（cqw / em）だけで決まる。
 * ただしこれだけは縦長のスマホ画面（実測比 約0.46 = 幅680:高さ1478）に入るので、
 * 基準フォントは横長Mock（2.6cqw）より大きい 4cqw を採用している。
 * 下部ナビは flex の外側で shrink-0 にしてあるため、親がこれより縦に短くても
 * 削られるのは中央のスクロール領域の末尾だけで、ナビは必ず残る。
 *
 * 本文は「お客様本人が読む画面」なので、二人称（あなた）で書くこと。
 * 元の画像は担当者向け文面（「担当者様…」）を流用していて、顧客が読むと意味が通らなかった。
 */
interface CustomerHomeMockProps {
  className?: string
}

interface SavedPropertyData {
  name: string
  price: string
  address: string
}

const SAVED_PROPERTIES: SavedPropertyData[] = [
  {
    name: 'ライオンズプラザ聖蹟桜ヶ丘 11階部分',
    price: '4,280万円',
    address: '東京都多摩市一ノ宮1丁目',
  },
  {
    name: 'ライオンズマンション町田駅前 3階部分',
    price: '4,180万円',
    address: '神奈川県相模原市南区上鶴間本町3丁目',
  },
  {
    name: '【新規リノベーション】グリーンテラス日野',
    price: '3,580万円',
    address: '東京都日野市落川',
  },
]

interface NavItemData {
  icon: LucideIcon
  label: string
}

const NAV_ITEMS: NavItemData[] = [
  { icon: House, label: 'ホーム' },
  { icon: Building2, label: '物件' },
  { icon: Sparkles, label: '傾向' },
  { icon: Settings, label: '設定' },
]

export function CustomerHomeMock({ className }: CustomerHomeMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden bg-white', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="flex h-full w-full flex-col bg-[#f7f9fc] text-slate-800"
        style={{ fontSize: 'clamp(7px, 4cqw, 20px)' }}
      >
        <Header />

        <div className="flex min-h-0 flex-1 flex-col gap-[1.4em] overflow-hidden px-[1.15em] pb-[1.2em] pt-[1.1em]">
          <SavedProperties />
          <TrendBox />
        </div>

        <BottomNav />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="shrink-0 border-b border-slate-200/80 bg-white px-[1.15em] py-[1.15em]">
      <p className="truncate text-[1.35em] font-bold leading-tight tracking-tight text-slate-900">
        鈴木 花子さんの物件リスト
      </p>
    </div>
  )
}

function SavedProperties() {
  return (
    <div className="shrink-0">
      <div className="flex min-w-0 items-center gap-[0.5em]">
        <p className="min-w-0 flex-1 truncate text-[1.02em] font-bold leading-none text-slate-900">
          最近保存した物件
        </p>
        <span className="inline-flex shrink-0 items-center gap-[0.15em] whitespace-nowrap text-[0.85em] font-bold leading-none text-blue-600">
          すべて見る（3件）
          <ChevronRight className="h-[1.15em] w-[1.15em]" />
        </span>
      </div>

      <div className="mt-[0.85em] flex flex-col gap-[0.75em]">
        {SAVED_PROPERTIES.map((property) => (
          <PropertyItem key={property.name} data={property} />
        ))}
      </div>
    </div>
  )
}

function PropertyItem({ data }: { data: SavedPropertyData }) {
  return (
    <div className="flex min-w-0 flex-col rounded-[0.65em] border border-slate-200/90 bg-white px-[0.95em] pb-[0.95em] pt-[0.9em] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_18px_-14px_rgba(15,23,42,0.28)]">
      <div className="flex min-w-0 items-center gap-[0.5em]">
        <span className="min-w-0 flex-1 truncate text-[1.02em] font-bold leading-snug text-slate-900">
          {data.name}
        </span>
        <span className="shrink-0 whitespace-nowrap rounded-full bg-blue-50 px-[0.65em] py-[0.3em] text-[0.75em] font-bold leading-none text-blue-600">
          マンション
        </span>
      </div>

      <p className="mt-[0.35em] truncate text-[1.55em] font-bold leading-tight tracking-tight text-blue-600">
        {data.price}
      </p>

      <p className="mt-[0.4em] truncate text-[0.9em] leading-snug text-slate-500">{data.address}</p>
    </div>
  )
}

function TrendBox() {
  return (
    <div className="shrink-0 rounded-[0.75em] border border-blue-100 bg-blue-50 px-[1em] py-[1em]">
      <p className="flex min-w-0 items-center gap-[0.4em] text-[1.02em] font-bold leading-none text-blue-700">
        <Sparkles className="h-[1.1em] w-[1.1em] shrink-0" />
        <span className="truncate">あなたの傾向</span>
      </p>

      <p className="mt-[0.6em] text-[0.92em] leading-relaxed text-slate-700">
        保存した物件から、あなたが重視している条件を分析しました。いちばん大切にされているのは駅からの近さです。徒歩10分圏内、なかでも町田駅から徒歩…
      </p>

      <span className="mt-[0.7em] inline-flex items-center gap-[0.15em] whitespace-nowrap text-[0.88em] font-bold leading-none text-blue-600">
        続きを読む
        <ChevronRight className="h-[1.15em] w-[1.15em]" />
      </span>
    </div>
  )
}

function BottomNav() {
  return (
    <div className="flex shrink-0 items-stretch border-t border-slate-200/80 bg-white px-[0.6em] pb-[0.9em] pt-[0.8em]">
      {NAV_ITEMS.map((item, index) => {
        const active = index === 0
        const Icon = item.icon

        return (
          <div
            key={item.label}
            className={cn(
              'flex min-w-0 flex-1 flex-col items-center gap-[0.35em]',
              active ? 'text-blue-600' : 'text-slate-400',
            )}
          >
            <Icon className="h-[1.45em] w-[1.45em] shrink-0" />
            <span
              className={cn(
                'truncate text-[0.72em] leading-none',
                active ? 'font-bold' : 'font-medium',
              )}
            >
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
