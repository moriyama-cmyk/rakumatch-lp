import {
  ArrowLeft,
  Calculator,
  CalendarDays,
  ChevronDown,
  ClipboardPaste,
  Info,
  Plus,
  Save,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

/**
 * 「日割り精算を保存」画面の再現UI（画像ではなくコードで描く）。
 *
 * サイズは親の幅に対する相対値（cqw）だけで決まるので、親の箱がどんな縦横比でも
 * 見た目の比率が崩れない。中身の自然な高さは親幅の約1.1倍あり、上から
 * ヘッダー → AI貼り付け → 基本情報 → 精算項目 の順に重要度が下がるので、
 * 親が縦に短い場合は下端（その他精算項目あたり）が隠れる前提で組んでいる。
 */
interface SettlementFormMockProps {
  className?: string
}

export function SettlementFormMock({ className }: SettlementFormMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden bg-slate-50', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="flex h-full w-full flex-col text-slate-800"
        style={{ fontSize: 'clamp(6px, 2.1cqw, 18px)' }}
      >
        <Header />

        <div className="flex min-h-0 flex-1 flex-col gap-[0.6em] overflow-hidden px-[0.9em] py-[0.7em]">
          <AiPasteBox />
          <BasicInfoCard />
          <SettlementItemsCard />
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="flex shrink-0 items-center gap-[0.55em] border-b border-slate-200 bg-white px-[0.9em] py-[0.6em]">
      <ArrowLeft className="h-[1.05em] w-[1.05em] shrink-0 text-slate-400" />
      <Calculator className="h-[1.15em] w-[1.15em] shrink-0 text-blue-600" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[1em] font-bold leading-tight">精算計算</p>
        <p className="mt-[0.1em] truncate text-[0.7em] leading-tight text-slate-500">
          鈴木 花子 様 ／ 固都税・管理費等の日割り計算・領収書作成
        </p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-[0.3em] whitespace-nowrap rounded-[0.4em] bg-blue-600 px-[0.8em] py-[0.45em] text-[0.78em] font-bold leading-none text-white">
        <Save className="h-[1.05em] w-[1.05em]" />
        保存
      </span>
    </div>
  )
}

function AiPasteBox() {
  return (
    <div className="shrink-0 rounded-[0.6em] border border-purple-200 bg-purple-50 px-[0.7em] py-[0.55em]">
      <p className="flex items-center gap-[0.35em] text-[0.78em] font-bold leading-none text-purple-700">
        <ClipboardPaste className="h-[1.15em] w-[1.15em] shrink-0" />
        <span className="truncate">書類スクショから自動入力（AI）</span>
      </p>

      <div className="mt-[0.45em] rounded-[0.5em] border border-dashed border-purple-300 bg-white/60 px-[0.6em] py-[0.5em] text-center">
        <ClipboardPaste className="mx-auto h-[1.4em] w-[1.4em] text-purple-400" />
        <p className="mt-[0.4em] whitespace-nowrap text-[0.75em] leading-none text-purple-900">
          <span className="rounded-[0.25em] border border-purple-300 bg-white px-[0.4em] py-[0.2em] font-mono text-[0.85em] font-bold text-purple-700">
            Ctrl+V
          </span>
          <span className="ml-[0.4em]">でスクショを貼り付け</span>
        </p>
        <p className="mt-[0.3em] truncate text-[0.66em] leading-none text-purple-400">
          またはタップしてファイル選択
        </p>
        <p className="mt-[0.28em] truncate text-[0.58em] leading-none text-purple-300">
          対応書類: 売買契約書 / 重要事項説明書 / 公課証明書 / 課税明細書 / 管理費通知書
        </p>
      </div>
    </div>
  )
}

function BasicInfoCard() {
  return (
    <div className="shrink-0 rounded-[0.6em] border border-slate-200 bg-white px-[0.8em] py-[0.6em] shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <p className="text-[0.85em] font-bold leading-none">基本情報</p>

      <div className="mt-[0.5em] grid grid-cols-2 gap-x-[0.8em] gap-y-[0.45em]">
        <TextField
          label={
            <>
              決済日 <span className="text-rose-500">★必須</span>
            </>
          }
          value="年 / 月 / 日"
          trailing={<CalendarDays className="h-[0.85em] w-[0.85em] shrink-0 text-slate-400" />}
        />
        <TextField label="物件名" value="○○マンション 203号室" />
        <TextField label="所在地" value="東京都品川区中延○丁目○番○号" />
        <TextField label="買主名" value="鈴木 花子" filled />
        <TextField label="売主名" value="鈴木 次郎" />
        <TextField label="会社名" value="○○不動産株式会社" />
      </div>
    </div>
  )
}

function SettlementItemsCard() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[0.6em] border border-slate-200 bg-white px-[0.8em] py-[0.6em] shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex shrink-0 items-baseline justify-between gap-[0.5em]">
        <p className="min-w-0 truncate text-[0.85em] font-bold leading-none">
          精算項目（年額・月額で入力）
        </p>
        <p className="shrink-0 whitespace-nowrap text-[0.62em] leading-none text-slate-400">
          入力と同時に自動計算
        </p>
      </div>

      <div className="mt-[0.5em] flex shrink-0 items-center gap-[0.4em] rounded-[0.4em] bg-slate-50 px-[0.5em] py-[0.35em]">
        <span className="shrink-0 text-[0.66em] font-bold leading-none text-slate-600">起算日:</span>
        <span className="shrink-0 whitespace-nowrap rounded-[0.3em] bg-blue-600 px-[0.6em] py-[0.35em] text-[0.66em] font-bold leading-none text-white">
          1月1日（関東）
        </span>
        <span className="shrink-0 whitespace-nowrap rounded-[0.3em] border border-slate-300 bg-white px-[0.6em] py-[0.35em] text-[0.66em] font-bold leading-none text-slate-600">
          4月1日（関西）
        </span>
      </div>

      <div className="mt-[0.4em] flex shrink-0 items-center gap-[0.35em] rounded-[0.35em] border border-amber-200 bg-amber-50 px-[0.5em] py-[0.3em]">
        <Info className="h-[0.8em] w-[0.8em] shrink-0 text-amber-500" />
        <span className="min-w-0 truncate text-[0.66em] leading-none text-amber-700">
          先に「決済日」を入力してください
        </span>
      </div>

      <TaxBlock label="固定資産税" />
      <TaxBlock label="都市計画税" />

      <div className="mt-[0.45em] grid shrink-0 grid-cols-2 gap-x-[0.8em]">
        <MonthlyField label="管理費" />
        <MonthlyField label="修繕積立金" />
      </div>

      <div className="mt-[0.45em] shrink-0 border-t border-slate-200 pt-[0.45em]">
        <p className="text-[0.66em] font-bold leading-none text-slate-600">その他精算項目を追加</p>
        <div className="mt-[0.35em] flex items-center gap-[0.4em]">
          <InputBox className="min-w-0 flex-1">項目名</InputBox>
          <InputBox className="w-[32%] shrink-0">金額（円）</InputBox>
          <span className="grid h-[1.4em] w-[1.4em] shrink-0 place-items-center rounded-[0.35em] bg-slate-700 text-white">
            <Plus className="h-[0.85em] w-[0.85em]" />
          </span>
        </div>
      </div>
    </div>
  )
}

function TaxBlock({ label }: { label: string }) {
  return (
    <div className="mt-[0.45em] shrink-0">
      <div className="flex items-center gap-[0.4em]">
        <span className="shrink-0 text-[0.7em] font-bold leading-none text-slate-700">{label}</span>
        <SelectChip value="年額" />
        <span className="min-w-0 truncate text-[0.6em] leading-none text-slate-400">
          → 決済日〜12/31で日割り
        </span>
      </div>
      <div className="mt-[0.3em] grid grid-cols-2 gap-x-[0.8em]">
        <AmountField label="土地" />
        <AmountField label="建物" />
      </div>
    </div>
  )
}

function MonthlyField({ label }: { label: string }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-[0.66em] font-bold leading-none text-slate-700">{label}</p>
      <div className="mt-[0.3em] flex items-center gap-[0.35em]">
        <InputBox className="min-w-0 flex-1" align="right">
          0
        </InputBox>
        <SelectChip value="月額" />
      </div>
      <p className="mt-[0.3em] truncate text-[0.58em] leading-none text-slate-400">
        → 決済日〜月末で日割り
      </p>
    </div>
  )
}

function TextField({
  label,
  value,
  filled,
  trailing,
}: {
  label: ReactNode
  value: string
  filled?: boolean
  trailing?: ReactNode
}) {
  return (
    <div className="min-w-0">
      <p className="truncate text-[0.62em] font-bold leading-none text-slate-600">{label}</p>
      <div className="mt-[0.25em] flex h-[1.4em] items-center gap-[0.3em] rounded-[0.35em] border border-slate-300 bg-white px-[0.5em]">
        <span
          className={cn(
            'min-w-0 flex-1 truncate text-[0.7em] leading-none',
            filled ? 'text-slate-800' : 'text-slate-400',
          )}
        >
          {value}
        </span>
        {trailing}
      </div>
    </div>
  )
}

function AmountField({ label }: { label: string }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-[0.56em] leading-none text-slate-500">{label}</p>
      <div className="mt-[0.22em]">
        <InputBox align="right">0</InputBox>
      </div>
    </div>
  )
}

function InputBox({
  children,
  className,
  align = 'left',
}: {
  children: ReactNode
  className?: string
  align?: 'left' | 'right'
}) {
  return (
    <div
      className={cn(
        'flex h-[1.4em] items-center rounded-[0.35em] border border-slate-300 bg-white px-[0.5em]',
        align === 'right' && 'justify-end',
        className,
      )}
    >
      <span className="min-w-0 truncate text-[0.68em] leading-none text-slate-400">{children}</span>
    </div>
  )
}

function SelectChip({ value }: { value: string }) {
  return (
    <span className="inline-flex h-[1.4em] shrink-0 items-center gap-[0.2em] whitespace-nowrap rounded-[0.3em] border border-slate-300 bg-white px-[0.4em]">
      <span className="inline-flex items-center gap-[0.2em] text-[0.62em] leading-none text-slate-700">
        {value}
        <ChevronDown className="h-[1.05em] w-[1.05em] text-slate-400" />
      </span>
    </span>
  )
}
