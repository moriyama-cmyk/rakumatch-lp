import { Bot } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

export interface AiChatMessage {
  role: 'user' | 'ai'
  content: string
}

export interface AiPanelAction {
  label: string
  icon?: LucideIcon
}

interface AiPanelProps {
  /** 吹き出し（user→ai→user→ai の2往復を想定。件数は可変） */
  messages: AiChatMessage[]
  /** 下部のアクション行のラベル。空配列で非表示。 */
  actions?: AiPanelAction[]
  className?: string
}

const DEFAULT_ACTIONS: AiPanelAction[] = [
  { label: 'ヒアリング' },
  { label: '潜在ニーズ' },
  { label: 'AI上司' },
  { label: 'メール文作成' },
]

/**
 * 暗色のAI相談パネル（実装 CustomerDetailPage.tsx のチャットUI配色・構成を簡略再現）。
 * 主役は「説明していないのに具体的な提案が出ている」こと＝ messages の ai 発話内容で表現する
 * （呼び出し側で、そのセクションの文脈に合った具体的な一文を渡すこと）。
 */
export function AiPanel({ messages, actions = DEFAULT_ACTIONS, className }: AiPanelProps) {
  return (
    <div className={cn('flex flex-col rounded-2xl border border-violet-500/20 bg-slate-900 p-3', className)}>
      <div className="space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={cn('flex items-start gap-2', m.role === 'user' && 'flex-row-reverse')}>
            {m.role === 'ai' && (
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-violet-600/50 bg-violet-800/60">
                <Bot className="h-4 w-4 text-violet-300" aria-hidden />
              </span>
            )}
            <p
              className={cn(
                'max-w-[85%] rounded-xl px-3 py-2.5 text-base leading-relaxed',
                m.role === 'user'
                  ? 'bg-violet-500 text-white'
                  : 'border border-slate-600/50 bg-slate-700/80 text-slate-100',
              )}
            >
              {m.content}
            </p>
          </div>
        ))}
      </div>

      {actions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-700/60 pt-2.5">
          {actions.map((a) => (
            <span
              key={a.label}
              className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-slate-600/50 px-2.5 py-1 text-sm font-medium text-slate-300"
            >
              {a.icon && <a.icon className="h-3.5 w-3.5" aria-hidden />}
              {a.label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
