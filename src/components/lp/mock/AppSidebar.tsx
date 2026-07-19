import { LayoutDashboard, Users, Building2, Sparkles, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

export interface AppSidebarItem {
  key: string
  label: string
  icon: LucideIcon
}

/** 実サイドバー（components/layout/Sidebar.tsx の navItems）と同じ並び・ラベル。 */
export const APP_SIDEBAR_ITEMS: AppSidebarItem[] = [
  { key: 'dashboard', label: 'ダッシュボード', icon: LayoutDashboard },
  { key: 'customers', label: '顧客管理', icon: Users },
  { key: 'properties', label: '物件管理', icon: Building2 },
  { key: 'ai-hub', label: 'AI一括入力ハブ', icon: Sparkles },
  { key: 'settings', label: '設定', icon: Settings },
]

interface AppSidebarProps {
  /** 選択中として塗る項目の key。既定は物件管理。 */
  activeKey?: string
  items?: AppSidebarItem[]
  className?: string
}

/**
 * アプリ左サイドバーの再現（デスクトップ画面の額装で使用）。
 * 実装同様、'ai-hub' が選択中のときだけ紫、それ以外は青で塗る。
 */
export function AppSidebar({ activeKey = 'properties', items = APP_SIDEBAR_ITEMS, className }: AppSidebarProps) {
  return (
    <div className={cn('flex h-full w-48 shrink-0 flex-col bg-slate-900 py-4', className)}>
      <div className="flex items-center gap-2 border-b border-slate-700 px-4 pb-4">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
          R
        </span>
        <span className="truncate text-base font-bold text-white">
          楽マッチ <span className="text-blue-400">AI</span>
        </span>
      </div>
      <nav className="flex-1 space-y-1 px-3 pt-3">
        {items.map((item) => {
          const active = item.key === activeKey
          return (
            <div
              key={item.key}
              className={cn(
                'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium',
                active
                  ? item.key === 'ai-hub'
                    ? 'bg-violet-600 text-white'
                    : 'bg-blue-600 text-white'
                  : 'text-slate-300',
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" aria-hidden />
              <span className="truncate">{item.label}</span>
            </div>
          )
        })}
      </nav>
    </div>
  )
}
