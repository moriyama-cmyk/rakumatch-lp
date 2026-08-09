import {
  ArrowLeft,
  ChevronDown,
  ClipboardList,
  Copy,
  FileSignature,
  Home,
  Lightbulb,
  Mail,
  Maximize2,
  Mic,
  Pencil,
  Phone,
  Sparkles,
  StickyNote,
} from 'lucide-react'
import { cn } from '../lib/cn'

/**
 * ヒーローのノートPC画面 左列「顧客詳細パネル」の再現UI（画像ではなくコードで描く）。
 *
 * サイズは親の幅に対する相対値（cqw / em）だけで決まる。親の幅がいくつでも見た目の比率が
 * 変わらないので、画像時代に繰り返した「箱の縦横比と中身の比率がずれて文字が見切れる」が
 * 原理的に起きない。実画面と同じく末尾のメモ欄だけが伸縮する（flex-1）ので、親の高さが
 * 多少上下しても上の情報が押し出されない。
 */
interface CustomerDetailMockProps {
  className?: string
}

interface ConditionField {
  label: string
  value: string
  /** true なら予算のように大きめ太字で見せる */
  strong?: boolean
  /** true なら2列グリッドの横幅いっぱいを使う */
  wide?: boolean
}

const CONDITIONS: ConditionField[] = [
  { label: '物件種別', value: 'マンション' },
  { label: '予算上限', value: '8,000万円', strong: true },
  { label: '希望間取り', value: '3LDK' },
  { label: '入居時期', value: '—' },
  { label: '希望沿線', value: '東急田園都市線', wide: true },
  { label: '希望駅', value: '三軒茶屋、桜新町 徒歩10分', wide: true },
]

export function CustomerDetailMock({ className }: CustomerDetailMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden bg-white', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="flex h-full w-full flex-col text-slate-800"
        style={{ fontSize: 'clamp(7px, 3.35cqw, 20px)' }}
      >
        <Header />

        <div className="h-px shrink-0 bg-slate-200" />

        <Conditions />

        <Memo />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="shrink-0 px-[1.1em] pb-[1em] pt-[0.9em]">
      <p className="flex items-center gap-[0.35em] text-[0.92em] leading-none text-slate-500">
        <ArrowLeft className="h-[1.15em] w-[1.15em]" />
        戻る
      </p>

      <div className="mt-[0.75em] flex items-start justify-between gap-[0.6em]">
        <p className="min-w-0 truncate text-[2.05em] font-bold leading-tight text-slate-900">
          鈴木 花子
        </p>
        <Maximize2 className="mt-[0.5em] h-[1.15em] w-[1.15em] shrink-0 text-slate-400" />
      </div>
      <p className="mt-[0.2em] truncate text-[0.9em] leading-snug text-slate-400">スズキ ハナコ</p>

      <span className="mt-[0.6em] inline-flex items-center gap-[1.4em] rounded-[0.4em] border border-slate-300 bg-white px-[0.7em] py-[0.4em] text-[0.92em] leading-none text-slate-700">
        森山
        <ChevronDown className="h-[1.05em] w-[1.05em] text-slate-400" />
      </span>

      <div className="mt-[0.75em] flex items-center gap-[0.5em]">
        <Phone className="h-[1.05em] w-[1.05em] shrink-0 text-blue-500" />
        <span className="shrink-0 text-[1.02em] leading-none text-slate-800">090…</span>
        <Copy className="h-[1.05em] w-[1.05em] shrink-0 text-slate-400" />
        <span className="ml-[0.2em] inline-flex shrink-0 items-center gap-[0.35em] whitespace-nowrap rounded-full bg-blue-600 px-[0.85em] py-[0.5em] text-[0.92em] font-bold leading-none text-white">
          <Phone className="h-[1.05em] w-[1.05em]" />
          電話する
        </span>
        <span className="inline-flex min-w-0 shrink items-center gap-[0.35em] overflow-hidden whitespace-nowrap rounded-full border border-slate-300 bg-white px-[0.8em] py-[0.5em] text-[0.92em] font-medium leading-none text-slate-500">
          <Mic className="h-[1.05em] w-[1.05em] shrink-0" />
          録音開始
        </span>
      </div>

      <div className="mt-[0.7em] flex items-center gap-[0.5em]">
        <Mail className="h-[1.05em] w-[1.05em] shrink-0 text-slate-400" />
        <span className="min-w-0 flex-1 truncate text-[0.98em] leading-none text-slate-700">
          suzuki.hanako@example.com
        </span>
        <Lightbulb className="h-[1.15em] w-[1.15em] shrink-0 text-amber-400" />
      </div>

      <p className="mt-[0.5em] truncate text-right text-[0.78em] leading-snug text-slate-400">
        録音は「電話する」で通話を開始すると押せます
      </p>

      <div className="mt-[0.75em] flex items-center gap-[0.45em]">
        <span className="inline-flex min-w-0 flex-1 items-center justify-center gap-[0.35em] overflow-hidden whitespace-nowrap rounded-[0.45em] border border-blue-300 bg-white px-[0.6em] py-[0.6em] text-[0.9em] font-bold leading-none text-blue-700">
          <FileSignature className="h-[1.05em] w-[1.05em] shrink-0" />
          契約に進む
        </span>
        <span className="inline-flex shrink-0 items-center gap-[0.35em] whitespace-nowrap rounded-[0.45em] border border-slate-300 bg-white px-[0.7em] py-[0.6em] text-[0.9em] font-medium leading-none text-slate-600">
          <ClipboardList className="h-[1.05em] w-[1.05em]" />
          TODO (1)
        </span>
        <span className="inline-flex shrink-0 items-center gap-[0.35em] whitespace-nowrap rounded-[0.45em] border border-slate-300 bg-white px-[0.7em] py-[0.6em] text-[0.9em] font-medium leading-none text-slate-600">
          <Pencil className="h-[1.05em] w-[1.05em]" />
          編集
        </span>
      </div>
    </div>
  )
}

function Conditions() {
  return (
    <div className="shrink-0 px-[1.1em] pb-[0.9em] pt-[0.95em]">
      <div className="flex items-center gap-[0.45em]">
        <Home className="h-[1.15em] w-[1.15em] shrink-0 text-slate-600" />
        <span className="text-[1.18em] font-bold leading-none text-slate-900">希望条件</span>
        <span className="rounded-full border border-amber-200 bg-amber-100 px-[0.7em] py-[0.3em] text-[0.8em] font-bold leading-none text-amber-800">
          実住
        </span>
      </div>

      <div className="mt-[0.8em] grid grid-cols-2 gap-x-[1em] gap-y-[0.7em]">
        {CONDITIONS.map((field) => (
          <div key={field.label} className={cn('min-w-0', field.wide && 'col-span-2')}>
            <p className="truncate text-[0.82em] leading-none text-slate-400">{field.label}</p>
            <p
              className={cn(
                'mt-[0.35em] truncate leading-snug text-slate-800',
                field.strong ? 'text-[1.35em] font-bold text-slate-900' : 'text-[1em]',
              )}
            >
              {field.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-[0.85em] h-px bg-slate-200" />

      <p className="mt-[0.75em] truncate text-[0.82em] leading-none text-slate-400">希望エリア</p>
      <span className="mt-[0.45em] inline-flex items-center rounded-[0.4em] border border-blue-200 bg-blue-50 px-[0.7em] py-[0.35em] text-[0.9em] font-medium leading-none text-blue-700">
        世田谷区
      </span>
    </div>
  )
}

function Memo() {
  return (
    <div className="flex min-h-0 flex-1 flex-col px-[1.1em] pb-[1.1em] pt-[0.2em]">
      <div className="flex min-h-0 flex-1 flex-col rounded-[0.6em] border border-amber-200 bg-amber-50 px-[0.8em] py-[0.7em]">
        <div className="flex shrink-0 items-center gap-[0.45em]">
          <StickyNote className="h-[1.1em] w-[1.1em] shrink-0 text-slate-600" />
          <span className="min-w-0 flex-1 truncate text-[1.02em] font-bold leading-none text-slate-900">
            メモ・備考
          </span>
          <span className="inline-flex shrink-0 items-center gap-[0.3em] whitespace-nowrap rounded-[0.35em] border border-amber-300 bg-amber-200 px-[0.55em] py-[0.3em] text-[0.78em] font-bold leading-none text-amber-900">
            <Sparkles className="h-[1.05em] w-[1.05em]" />
            AIで整理
          </span>
          <Copy className="h-[1.05em] w-[1.05em] shrink-0 text-slate-400" />
          <Maximize2 className="h-[1.05em] w-[1.05em] shrink-0 text-slate-400" />
        </div>

        <p className="mt-[0.7em] min-h-0 text-[1em] leading-relaxed text-slate-800">
          2物件を比較中で決断間近。保育園の距離を重視。
        </p>
      </div>
    </div>
  )
}
