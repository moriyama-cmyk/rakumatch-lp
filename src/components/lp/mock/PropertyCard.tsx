import { Users, TrendingDown } from 'lucide-react'
import { cn } from '../lib/cn'

export type PropertyCardVariant = 'customer' | 'agent'

/** お客様アプリ用（保存物件リスト）のカードデータ。 */
export interface PropertyCardCustomerData {
  title: string
  /** 表示用に整形済みの価格文字列（例: "3,980万円"） */
  price: string
  /** 駅・間取り・築年などをまとめた短い1行（任意） */
  meta?: string
  /** 'viewing'=内見希望済み(緑) / 'listingEnded'=掲載終了の可能性(黄)。省略可。 */
  status?: 'viewing' | 'listingEnded'
}

/** 物件一覧（担当者側）用のカードデータ。 */
export interface PropertyCardAgentData {
  title: string
  price: string
  /** マンション/戸建て/土地/その他 など。バッジの色分けに使用。 */
  propertyType?: string
  /** エリア・駅・間取りなどをまとめた短い1行（任意） */
  meta?: string
  /** マッチ顧客数バッジ（undefined/0 で非表示） */
  matchCount?: number
  /** 相場より何%安いか（5以上のときだけ呼び出し側で渡すことを想定。実装 PropertiesPage.tsx に合わせた閾値） */
  discountPct?: number
}

interface PropertyCardProps {
  variant: PropertyCardVariant
  data: PropertyCardCustomerData | PropertyCardAgentData
  className?: string
}

/** 物件種別バッジの色分け（PropertiesPage.tsx の propertyTypeColor と同じ考え方の簡略版） */
function propertyTypeBadgeClass(propertyType?: string): string {
  if (!propertyType) return 'bg-slate-100 text-slate-700'
  if (propertyType.includes('マンション')) return 'bg-blue-100 text-blue-700'
  if (propertyType === '土地') return 'bg-emerald-100 text-emerald-700'
  return 'bg-amber-100 text-amber-700'
}

/**
 * 物件カード（装飾用の再現UI）。variant で「お客様アプリ用」「物件一覧用」を切替。
 * ※ このカード自体は非対話（div/span のみ）。押せるように見せない。
 */
export function PropertyCard({ variant, data, className }: PropertyCardProps) {
  if (variant === 'customer') {
    const d = data as PropertyCardCustomerData
    return (
      <div className={cn('rounded-2xl bg-white p-3 shadow-md', className)}>
        <h3 className="truncate text-base font-bold leading-snug text-ink-900">{d.title}</h3>
        <p className="mt-0.5 text-lg font-bold leading-tight text-blue-700">{d.price}</p>
        {d.meta && <p className="mt-1 truncate text-sm leading-snug text-ink-600">{d.meta}</p>}
        {d.status && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {d.status === 'viewing' && (
              <span className="inline-flex items-center whitespace-nowrap rounded-full bg-green-100 px-2.5 py-1 text-sm font-medium text-green-800">
                内見希望済み
              </span>
            )}
            {d.status === 'listingEnded' && (
              <span className="inline-flex items-center whitespace-nowrap rounded-full bg-yellow-100 px-2.5 py-1 text-sm font-medium text-yellow-800">
                掲載終了の可能性
              </span>
            )}
          </div>
        )}
      </div>
    )
  }

  const d = data as PropertyCardAgentData
  return (
    <div className={cn('rounded-2xl border border-surface-200 bg-white p-3 shadow-soft', className)}>
      <div className="flex items-center gap-1.5">
        {d.propertyType && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2 py-0.5 text-sm font-semibold',
              propertyTypeBadgeClass(d.propertyType),
            )}
          >
            {d.propertyType}
          </span>
        )}
        <h3 className="min-w-0 truncate text-base font-bold text-ink-900">{d.title}</h3>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <p className="text-lg font-bold text-ink-900">{d.price}</p>
        {d.discountPct != null && (
          <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-700">
            <TrendingDown className="h-3.5 w-3.5" aria-hidden />
            相場より{Math.round(d.discountPct)}%安
          </span>
        )}
      </div>
      {d.meta && <p className="mt-2 truncate text-sm text-ink-600">{d.meta}</p>}
      {d.matchCount != null && (
        <div className="mt-2 flex items-center justify-end border-t border-surface-100 pt-2">
          <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-violet-50 px-2.5 py-1 text-sm font-semibold text-violet-600">
            <Users className="h-3.5 w-3.5" aria-hidden />
            マッチ {d.matchCount}名
          </span>
        </div>
      )}
    </div>
  )
}
