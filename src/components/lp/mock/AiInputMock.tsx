import {
  Bell,
  Building2,
  ChevronRight,
  FileImage,
  House,
  LayoutGrid,
  LogOut,
  MessageSquarePlus,
  Settings,
  Shield,
  Sparkles,
  UsersRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

/**
 * 「AI一括入力ハブ」画面の再現UI（画像ではなくコードで描く）。
 *
 * DualMatchLeftMock / DualMatchRightMock と同じ方式：サイズは親の幅に対する相対値
 * （cqw / em）だけで決まる。親の幅がいくつでも見た目の比率が変わらないので、画像時代に
 * 繰り返した「箱の縦横比と中身の比率がずれて文字が見切れる」が原理的に起きない。
 * 中身の自然な高さ ≒ 親幅 × 0.45 で、縦方向の余りは余白ブロック（透かしアイコンの領域と
 * 入力欄）が吸収する。元画像と同じ 16:9 の箱に入れても下端が切れない。
 */
interface AiInputMockProps {
  className?: string
}

interface CardTone {
  chipBg: string
  chipFg: string
  button: string
  watermark: string
}

interface CardData {
  icon: LucideIcon
  title: string
  placeholder: string
  /** プレースホルダー内の補足行。元画像どおり1行ずつ改行する */
  exampleLines: string[]
  note: string
  /** チェックボックス付きの小さいラベル。顧客側だけ「業者リストとして登録」が付く */
  options: { label: string; icon?: LucideIcon; accent?: boolean }[]
  buttonLabel: string
  tone: CardTone
}

const CUSTOMER_TONE: CardTone = {
  chipBg: 'bg-indigo-100',
  chipFg: 'text-indigo-500',
  button: 'bg-gradient-to-r from-blue-400 to-indigo-400',
  watermark: 'text-slate-200',
}

const PROPERTY_TONE: CardTone = {
  chipBg: 'bg-emerald-100',
  chipFg: 'text-emerald-500',
  button: 'bg-gradient-to-r from-emerald-400 to-teal-400',
  watermark: 'text-slate-200',
}

const CARDS: CardData[] = [
  {
    icon: UsersRound,
    title: '顧客情報 丸投げ入力',
    placeholder: 'ここに顧客に関するテキストをペースト...',
    exampleLines: [
      '例：【SUUMO反響】山田様 予算4500万 新宿か中野で2LDK希望。',
      '複数顧客が混在していてもOK。',
      'またはPDF・画像をドロップ。',
    ],
    note: '※ PDFは解析後に保存されません。画像として残したい場合は、顧客詳細の「情報追加」から登録してください。',
    options: [
      { label: '業者リストとして登録', accent: true },
      { label: '登録前に確認（OFF＝即登録）', icon: Shield },
    ],
    buttonLabel: 'AIで顧客解析',
    tone: CUSTOMER_TONE,
  },
  {
    icon: Building2,
    title: '物件情報 丸投げ入力',
    placeholder: 'ここに物件に関するテキストをペースト...',
    exampleLines: [
      'レインズ・SUUMO・図面など複数物件をまとめてコピペ可。解析中でも追加投入できます。',
      'またはPDF・マイソク画像をドロップ。',
    ],
    note: '※ PDFは解析後に保存されません。画像として残したい場合は、物件詳細の「情報追加」から登録してください。',
    options: [{ label: '登録前に確認（OFF＝即登録）', icon: Shield }],
    buttonLabel: 'AIで物件解析',
    tone: PROPERTY_TONE,
  },
]

const DISCLAIMER =
  'AIが自動抽出した内容は、まれに誤りが含まれる場合があります。登録前に必ず内容をご確認ください。AI抽出はあくまで補助機能です。内容の最終確認・修正はご利用者様にてお願いいたします。'

export function AiInputMock({ className }: AiInputMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden bg-slate-50', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div className="flex h-full w-full text-slate-800 text-[length:clamp(9px,2.4cqw,20px)] @[400px]:text-[length:clamp(8px,1.5cqw,20px)]">
        <SideRail />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-[1.9em] pt-[1.5em]">
          <div className="shrink-0">
            <div className="flex items-center gap-[0.45em]">
              <Sparkles className="h-[1.5em] w-[1.5em] shrink-0 text-violet-500" />
              <span className="truncate text-[1.35em] font-bold leading-tight text-slate-900">
                AI一括入力ハブ
              </span>
            </div>
            <p className="mt-[0.5em] truncate text-[0.85em] leading-snug text-slate-500">
              テキストを貼り付けるだけでAIが自動抽出・自動登録します。
            </p>
          </div>

          <div className="mt-[1.3em] flex min-h-0 flex-1 flex-col items-stretch gap-[1.4em] overflow-hidden @[480px]:flex-row">
            {CARDS.map((card) => (
              <HubCard key={card.title} data={card} />
            ))}
          </div>

          <p className="shrink-0 truncate px-[0.5em] pb-[0.9em] pt-[0.7em] text-center text-[0.72em] font-medium leading-normal text-red-500">
            {DISCLAIMER}
          </p>
        </div>
      </div>
    </div>
  )
}

function SideRail() {
  return (
    <div className="flex w-[5%] shrink-0 flex-col items-center gap-[1.1em] bg-[#0b1220] py-[1.1em]">
      <span className="relative inline-flex h-[1.9em] w-[1.9em] items-center justify-center rounded-[0.5em] bg-blue-600/90">
        <House className="h-[1em] w-[1em] text-white" />
        <ChevronRight className="absolute left-[1.9em] h-[0.9em] w-[0.9em] text-slate-500" />
      </span>

      <RailIcon icon={LayoutGrid} />
      <RailIcon icon={UsersRound} />
      <RailIcon icon={Building2} />
      <span className="inline-flex h-[1.9em] w-[1.9em] items-center justify-center rounded-[0.5em] bg-violet-600">
        <Sparkles className="h-[1em] w-[1em] text-white" />
      </span>
      <RailIcon icon={Settings} />

      <span className="relative mt-auto inline-flex">
        <Bell className="h-[1.1em] w-[1.1em] text-slate-400" />
        <span className="absolute -right-[0.4em] -top-[0.35em] inline-flex h-[0.85em] w-[0.85em] items-center justify-center rounded-full bg-red-500 text-[0.5em] font-bold leading-none text-white">
          6
        </span>
      </span>
      <RailIcon icon={MessageSquarePlus} />
      <RailIcon icon={LogOut} />
    </div>
  )
}

function RailIcon({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="h-[1.1em] w-[1.1em] shrink-0 text-slate-400" />
}

function HubCard({ data }: { data: CardData }) {
  const Icon = data.icon

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[1em] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_24px_-18px_rgba(15,23,42,0.4)]">
      <div className="flex shrink-0 items-center gap-[0.6em] border-b border-slate-100 px-[1.2em] py-[0.85em]">
        <span
          className={cn(
            'inline-flex h-[1.8em] w-[1.8em] shrink-0 items-center justify-center rounded-[0.45em]',
            data.tone.chipBg,
          )}
        >
          <Icon className={cn('h-[1em] w-[1em]', data.tone.chipFg)} />
        </span>
        <span className="min-w-0 truncate text-[1.02em] font-bold leading-snug text-slate-800">
          {data.title}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-[1.2em] pt-[0.9em]">
        <div className="relative flex min-h-[8.4em] flex-[2_1_0%] flex-col overflow-hidden rounded-[0.55em] border border-slate-200 px-[0.9em] pb-[1.8em] pt-[0.85em]">
          <p className="text-[0.85em] leading-normal text-slate-400">{data.placeholder}</p>
          <div className="mt-[1.1em] space-y-[0.15em]">
            {data.exampleLines.map((line) => (
              <p key={line} className="text-[0.85em] leading-normal text-slate-400">
                {line}
              </p>
            ))}
          </div>
          <span className="absolute bottom-[0.6em] right-[0.9em] inline-flex items-center gap-[0.3em] whitespace-nowrap text-[0.72em] leading-none text-slate-400">
            <FileImage className="h-[1.1em] w-[1.1em]" />
            PDF/画像
          </span>
        </div>

        <p className="mt-[0.75em] shrink-0 text-[0.68em] leading-normal text-slate-400">
          {data.note}
        </p>

        <div className="mt-[0.85em] flex shrink-0 flex-wrap items-center gap-[0.5em]">
          {data.options.map((option) => (
            <span key={option.label} className="inline-flex items-center gap-[0.45em]">
              <span className="h-[0.95em] w-[0.95em] shrink-0 rounded-[0.15em] border border-slate-300 bg-white" />
              <span
                className={cn(
                  'inline-flex items-center gap-[0.3em] whitespace-nowrap rounded-[0.35em] border px-[0.55em] py-[0.3em] text-[0.68em] font-bold leading-none',
                  option.accent
                    ? 'border-amber-300 bg-amber-50 text-amber-600'
                    : 'border-slate-200 bg-white text-slate-600',
                )}
              >
                {option.icon && <option.icon className="h-[1.1em] w-[1.1em] text-slate-400" />}
                {option.label}
              </span>
            </span>
          ))}
        </div>

        <div className="mt-[0.9em] flex shrink-0 justify-end">
          <span
            className={cn(
              'inline-flex items-center gap-[0.4em] whitespace-nowrap rounded-[0.5em] px-[1.1em] py-[0.65em] text-[0.85em] font-bold leading-none text-white',
              data.tone.button,
            )}
          >
            <Sparkles className="h-[1.15em] w-[1.15em]" />
            {data.buttonLabel}
          </span>
        </div>

        <div className="flex min-h-[1.4em] flex-1 items-center justify-center overflow-hidden pb-[0.9em] pt-[0.7em]">
          <Icon className={cn('h-[3.2em] w-[3.2em]', data.tone.watermark)} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}
