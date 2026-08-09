import {
  Lightbulb,
  Mail,
  Maximize2,
  Mic,
  Navigation,
  Paperclip,
  Phone,
  Plus,
  RotateCcw,
  Send,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

/**
 * 「AIアシスタント」パネルの再現UI（画像ではなくコードで描く）。
 *
 * DualMatchLeftMock / DualMatchRightMock と同じ方式：サイズは親の幅に対する相対値（cqw / em）
 * だけで決まる。親の幅がいくつでも見た目の比率が変わらないので、画像時代に繰り返した
 * 「箱の縦横比と中身の比率がずれて文字が見切れる」が原理的に起きない。
 * 縦が足りないときは AIの提案文（flex-1 の領域）だけが縮み、タブ・入力欄・提案カードは残る。
 * 呼び出し側（.demoScreen）が角丸と overflow-hidden を持つので、ここでは外枠を付けない。
 */
interface AiChatMockProps {
  className?: string
}

interface QuickTab {
  icon: LucideIcon
  label: string
  active?: boolean
}

const QUICK_TABS: QuickTab[] = [
  { icon: Mic, label: 'ヒアリング' },
  { icon: Lightbulb, label: '潜在ニーズ', active: true },
  { icon: Sparkles, label: 'AI上司' },
  { icon: Mail, label: 'メール文作成' },
  { icon: Phone, label: '電話サポート' },
  { icon: Navigation, label: '案内準備' },
  { icon: RotateCcw, label: 'クリア' },
]

interface SuggestionData {
  field: string
  value: string
  reason: string
}

const SUGGESTIONS: SuggestionData[] = [
  {
    field: '希望駅',
    value: '駒沢大学',
    reason: '三軒茶屋・桜新町の中間に位置し、保育園へのアクセスと予算バランスが良いため',
  },
  {
    field: '駅徒歩',
    value: '15',
    reason: '徒歩10分にこだわると物件数が限られるため、選択肢を広げる提案',
  },
]

export function AiChatMock({ className }: AiChatMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden bg-[#101626]', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="flex h-full w-full flex-col bg-[#101626] text-slate-200"
        style={{ fontSize: 'clamp(8px, 2.3cqw, 20px)' }}
      >
        <Header />
        <AiMessage />
        <QuickTabRow />
        <InputRow />
        <SuggestionHeader />

        <div className="flex shrink-0 flex-col gap-[0.7em] px-[1.1em] pb-[1.1em]">
          {SUGGESTIONS.map((suggestion) => (
            <SuggestionCard key={suggestion.field} data={suggestion} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="flex shrink-0 items-center gap-[0.55em] border-b border-white/5 px-[1.1em] py-[0.9em]">
      <Sparkles className="h-[1.05em] w-[1.05em] shrink-0 text-violet-400" />
      <p className="min-w-0 flex-1 truncate text-[0.86em] font-bold leading-none text-white">こんにちは、森山さん</p>
      <Maximize2 className="h-[1em] w-[1em] shrink-0 text-slate-400" />
    </div>
  )
}

function AiMessage() {
  return (
    <div className="flex min-h-0 flex-1 items-start gap-[0.65em] overflow-hidden px-[1.1em] pb-[0.6em] pt-[0.9em]">
      <span className="grid h-[1.9em] w-[1.9em] shrink-0 place-items-center rounded-full bg-violet-600/35 shadow-[0_0_1.4em_rgba(139,92,246,0.45)] ring-1 ring-violet-400/40">
        <Sparkles className="h-[0.95em] w-[0.95em] text-violet-100" />
      </span>

      <div className="min-w-0 flex-1 rounded-[0.7em] bg-[#1b2440] px-[0.85em] py-[0.75em]">
        <p className="text-[0.95em] leading-[1.7] text-slate-100">鈴木様は保育園へのアクセスを最優先されており、三軒茶屋・桜新町エリアでの絞り込みが非常に進んでいます。現在の予算内で物件の質を確保するため、隣接する<span className="font-bold text-white">駒沢大学駅</span>周辺も検討範囲に加えることを推奨します。</p>

        <ul className="mt-[0.55em] flex flex-col gap-[0.4em]">
          <Bullet>駒沢大学駅は三軒茶屋と桜新町の間に位置し、保育園の数も豊富で子育て環境として非常に適しています。</Bullet>
          <Bullet>徒歩10分という条件は非常に厳しいため、もし物件の選択肢が不足している場合は、少し範囲を広げることで良い物件に出会える可能性があります。</Bullet>
        </ul>

        <p className="mt-[0.55em] text-[0.95em] leading-[1.7] text-slate-100">他にも気になる条件があれば教えてください。会話の中から潜在ニーズを分析します。</p>
      </div>
    </div>
  )
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-[0.6em]">
      <span className="mt-[0.75em] h-[0.28em] w-[0.28em] shrink-0 rounded-full bg-slate-400" />
      <span className="min-w-0 flex-1 text-[0.9em] leading-[1.7] text-slate-200">{children}</span>
    </li>
  )
}

function QuickTabRow() {
  return (
    <div className="shrink-0 px-[1.1em] pt-[0.2em]">
      <div className="flex items-center gap-[0.45em] overflow-hidden">
        {QUICK_TABS.map((tab) => (
          <QuickTabPill key={tab.label} tab={tab} />
        ))}
      </div>
      <div className="mt-[0.5em] h-[0.2em] w-full rounded-full bg-white/[0.07]">
        <div className="h-full w-[62%] rounded-full bg-white/25" />
      </div>
    </div>
  )
}

function QuickTabPill({ tab }: { tab: QuickTab }) {
  const Icon = tab.icon

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-[0.3em] whitespace-nowrap rounded-full border px-[0.7em] py-[0.45em] text-[0.7em] font-medium leading-none',
        tab.active
          ? 'border-violet-400/60 bg-violet-500/25 text-violet-200'
          : 'border-white/10 bg-white/[0.04] text-slate-300',
      )}
    >
      <Icon className={cn('h-[1.15em] w-[1.15em]', tab.active ? 'text-violet-300' : 'text-slate-400')} />
      {tab.label}
    </span>
  )
}

function InputRow() {
  return (
    <div className="shrink-0 px-[1.1em] pt-[0.75em]">
      <div className="flex items-center gap-[0.55em]">
        <span className="grid h-[2.1em] w-[2.1em] shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
          <Paperclip className="h-[1em] w-[1em] text-slate-400" />
        </span>

        <div className="min-w-0 flex-1 rounded-[0.65em] border border-white/10 bg-[#161e33] px-[0.75em] py-[0.6em]">
          <p className="text-[0.82em] leading-[1.6] text-slate-500">顧客の反応や気になる点を入力（例：川崎市の物件にも興味を示していた...）</p>
        </div>

        <span className="grid h-[2.1em] w-[2.1em] shrink-0 place-items-center rounded-full bg-violet-500 shadow-[0_0_1.2em_rgba(139,92,246,0.5)]">
          <Send className="h-[1em] w-[1em] text-white" />
        </span>
      </div>

      <p className="mt-[0.5em] text-[0.68em] leading-none text-slate-500">Enter で送信 / Shift+Enter で改行 / ファイルはここにドロップ</p>
    </div>
  )
}

function SuggestionHeader() {
  return (
    <div className="mt-[0.85em] flex shrink-0 items-center justify-between gap-[0.6em] border-y border-white/5 px-[1.1em] py-[0.7em]">
      <span className="inline-flex min-w-0 items-center gap-[0.4em] truncate text-[0.86em] font-bold leading-none text-violet-300">
        <Lightbulb className="h-[1.1em] w-[1.1em] shrink-0" />
        潜在ニーズ提案
      </span>
      <span className="shrink-0 text-[0.74em] leading-none text-slate-400">2件</span>
    </div>
  )
}

function SuggestionCard({ data }: { data: SuggestionData }) {
  return (
    <div className="shrink-0 rounded-[0.7em] border border-white/5 bg-[#1a2136] px-[0.85em] py-[0.8em]">
      <div className="flex items-center gap-[0.55em]">
        <span className="inline-flex shrink-0 items-center gap-[0.15em] rounded-[0.35em] bg-emerald-500/15 px-[0.45em] py-[0.3em] text-[0.64em] font-bold leading-none text-emerald-300">
          <Plus className="h-[1.15em] w-[1.15em]" />
          追加
        </span>
        <span className="min-w-0 truncate text-[0.86em] font-bold leading-none text-white">{data.field}</span>
      </div>

      <p className="mt-[0.6em] truncate text-[0.82em] leading-snug text-slate-100">{data.value}</p>
      <p className="mt-[0.4em] truncate text-[0.7em] leading-snug text-slate-400">{data.reason}</p>

      <div className="mt-[0.7em] flex items-center gap-[0.55em]">
        <span className="flex-1 rounded-[0.4em] bg-emerald-700 px-[0.6em] py-[0.6em] text-center text-[0.78em] font-bold leading-none text-white">追加する</span>
        <span className="flex-1 rounded-[0.4em] border border-white/15 px-[0.6em] py-[0.6em] text-center text-[0.78em] font-medium leading-none text-slate-300">スキップ</span>
      </div>
    </div>
  )
}
