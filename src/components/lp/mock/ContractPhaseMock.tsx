import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Plus,
  SquarePen,
} from 'lucide-react'
import { Fragment } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../lib/cn'

/**
 * 「契約フェーズを確認」画面の再現UI（画像ではなくコードで描く）。
 *
 * DualMatchLeftMock と同じ方式：サイズは親の幅に対する相対値（cqw / em）だけで決まる。
 * 親の幅がいくつでも見た目の比率が変わらないので、画像時代に繰り返した
 * 「箱の縦横比と中身の比率がずれて文字が見切れる」が原理的に起きない。
 * 中身の自然な高さ ≒ 親幅 × 1.1。親がそれより横長なら下端（メモ欄側）から順に
 * overflow-hidden で隠れ、上部のヘッダー・ステッパー・本審査の見出し行は必ず残る。
 */
interface ContractPhaseMockProps {
  className?: string
}

interface StepData {
  no: number
  label: string
  state: 'done' | 'current' | 'todo'
}

const STEPS: StepData[] = [
  { no: 1, label: '事前審査', state: 'done' },
  { no: 2, label: '契約', state: 'done' },
  { no: 3, label: '本審査', state: 'current' },
  { no: 4, label: '最終確認', state: 'todo' },
  { no: 5, label: '金消', state: 'todo' },
  { no: 6, label: '決済', state: 'todo' },
]

const CHECK_ITEMS = [
  '本申込書類一式の準備・不備チェック',
  '物件資料（登記簿・建築確認通知書等）の取得',
  '審査書類の金融機関への提出',
  '審査結果の確認・報告',
]

export function ContractPhaseMock({ className }: ContractPhaseMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden bg-white', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="flex h-full w-full flex-col bg-[#f9fbfc] text-slate-800"
        style={{ fontSize: 'clamp(8px, 2.6cqw, 22px)' }}
      >
        <Header />

        <div className="flex min-h-0 flex-1 flex-col gap-[0.6em] px-[0.9em] pt-[0.75em] pb-[0.8em]">
          <Stepper />
          <PhaseRow title="事前審査" checked="0/4 チェック済" />
          <PhaseRow title="契約" checked="0/5 チェック済" />
          <CurrentPhaseRow />
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="flex shrink-0 items-center gap-[0.7em] border-b border-slate-200/70 bg-white px-[0.9em] py-[0.7em]">
      <ArrowLeft className="h-[1.3em] w-[1.3em] shrink-0 text-slate-500" />
      <div className="min-w-0">
        <p className="truncate text-[1.45em] font-black leading-tight tracking-tight text-slate-900">
          契約フェーズ管理
        </p>
        <p className="mt-[0.1em] truncate text-[0.92em] leading-tight text-slate-400">鈴木 花子 様</p>
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-[0.4em]">
        <HeaderBadge icon={Building2} label="管理費等精算" tone="blue" />
        <HeaderBadge icon={FileText} label="固都税精算" tone="slate" />
        <HeaderBadge icon={Clock} label="本審査まであと-47日" tone="amber" />
      </div>
    </div>
  )
}

function HeaderBadge({
  icon: Icon,
  label,
  tone,
}: {
  icon: LucideIcon
  label: string
  tone: 'blue' | 'slate' | 'amber'
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-[0.35em] whitespace-nowrap rounded-full border px-[0.7em] py-[0.4em] text-[0.78em] font-bold leading-none',
        tone === 'blue' && 'border-blue-100 bg-blue-50 text-blue-600',
        tone === 'slate' && 'border-slate-200 bg-slate-50 text-slate-600',
        tone === 'amber' && 'border-amber-200 bg-amber-50 text-amber-600',
      )}
    >
      <Icon className="h-[1.15em] w-[1.15em]" />
      {label}
    </span>
  )
}

function Stepper() {
  return (
    <div className="shrink-0 rounded-[0.9em] border border-slate-200/70 bg-white px-[0.9em] py-[0.8em] shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="flex items-start">
        {STEPS.map((step, i) => (
          <Fragment key={step.no}>
            {i > 0 && (
              <span
                className={cn(
                  'mt-[1.1em] h-[0.16em] min-w-0 flex-1 rounded-full',
                  STEPS[i - 1].state === 'done' ? 'bg-emerald-500' : 'bg-slate-200',
                )}
              />
            )}
            <div className="flex shrink-0 flex-col items-center gap-[0.35em]">
              <span className="flex h-[2.35em] items-center">
                {step.state === 'done' ? (
                  <span className="flex h-[2em] w-[2em] items-center justify-center rounded-full bg-emerald-500">
                    <CheckCircle2 className="h-[1.25em] w-[1.25em] text-white" />
                  </span>
                ) : step.state === 'current' ? (
                  <span className="flex h-[2.35em] w-[2.35em] items-center justify-center rounded-full bg-violet-600 text-[0.9em] font-bold leading-none text-white">
                    {step.no}
                  </span>
                ) : (
                  <span className="flex h-[2em] w-[2em] items-center justify-center rounded-full bg-slate-200 text-[0.9em] font-bold leading-none text-slate-500">
                    {step.no}
                  </span>
                )}
              </span>
              <span
                className={cn(
                  'whitespace-nowrap text-[0.8em] leading-none',
                  step.state === 'current' ? 'font-bold text-slate-900' : 'text-slate-400',
                )}
              >
                {step.label}
              </span>
            </div>
          </Fragment>
        ))}
      </div>

      <div className="mt-[0.7em] h-[0.4em] w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-blue-500" />
      </div>
      <p className="mt-[0.3em] text-right text-[0.8em] leading-none text-slate-400">42% 完了</p>
    </div>
  )
}

function PhaseRow({ title, checked }: { title: string; checked: string }) {
  return (
    <div className="flex shrink-0 items-stretch gap-[0.55em]">
      <Rail tone="done" />
      <div className="flex min-w-0 flex-1 items-center gap-[0.5em] rounded-[0.8em] border border-slate-200/70 bg-white px-[0.85em] py-[0.7em] shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <span className="shrink-0 text-[0.98em] font-bold leading-none text-slate-800">{title}</span>
        <span className="shrink-0 rounded-full bg-emerald-100 px-[0.55em] py-[0.2em] text-[0.78em] font-bold leading-none text-emerald-600">
          完了
        </span>
        <span className="min-w-0 truncate text-[0.85em] leading-none text-slate-400">{checked}</span>
        <ChevronDown className="ml-auto h-[1.1em] w-[1.1em] shrink-0 text-slate-300" />
      </div>
    </div>
  )
}

function CurrentPhaseRow() {
  return (
    <div className="flex shrink-0 items-stretch gap-[0.55em]">
      <Rail tone="current" last />
      <div className="min-w-0 flex-1 rounded-[0.8em] border border-violet-200/70 bg-[#f6f4ff] px-[0.85em] py-[0.75em]">
        <div className="flex items-center gap-[0.5em]">
          <span className="shrink-0 text-[0.98em] font-bold leading-none text-violet-700">本審査</span>
          <span className="shrink-0 rounded-full bg-violet-600 px-[0.6em] py-[0.25em] text-[0.78em] font-bold leading-none text-white">
            現在地
          </span>
          <span className="shrink-0 text-[0.85em] leading-none text-slate-400">0/4 チェック済</span>
          <span className="inline-flex min-w-0 shrink items-center gap-[0.3em] truncate rounded-full bg-rose-100 px-[0.6em] py-[0.25em] text-[0.76em] font-bold leading-none text-rose-500">
            <Clock className="h-[1.1em] w-[1.1em] shrink-0" />
            <CalendarDays className="h-[1.1em] w-[1.1em] shrink-0" />
            <span className="truncate">2026-06-09 (47日超過)</span>
          </span>
          <ChevronUp className="ml-auto h-[1.1em] w-[1.1em] shrink-0 text-slate-300" />
        </div>

        <p className="mt-[0.55em] text-[0.86em] leading-snug text-slate-600">
          本申込書類を整え、金融機関による本格審査を受ける。
        </p>

        <div className="mt-[0.6em] flex flex-col gap-[0.4em]">
          <DateField label="申込み予定日" />
          <DateField label="結果が分かる予定日" />
        </div>

        <div className="mt-[0.7em] flex flex-col gap-[0.35em]">
          {CHECK_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-[0.6em]">
              <span className="h-[1.05em] w-[1.05em] shrink-0 rounded-[0.18em] border border-slate-300 bg-white" />
              <span className="min-w-0 truncate text-[0.87em] leading-snug text-slate-700">{item}</span>
            </div>
          ))}
        </div>

        <p className="mt-[0.6em] inline-flex items-center gap-[0.25em] text-[0.8em] leading-none text-slate-400">
          <Plus className="h-[1.05em] w-[1.05em]" />
          項目を追加
        </p>

        <div className="mt-[0.6em] flex items-center justify-between text-[0.8em] leading-none text-slate-400">
          <span>チェック進捗</span>
          <span>0 / 4</span>
        </div>

        <p className="mt-[0.7em] inline-flex items-center gap-[0.3em] text-[0.82em] font-bold leading-none text-slate-700">
          <SquarePen className="h-[1.1em] w-[1.1em] text-slate-500" />
          メモ
        </p>
        <div className="mt-[0.35em] rounded-[0.6em] border border-violet-200/70 bg-white px-[0.7em] py-[0.6em]">
          <p className="text-[0.85em] leading-snug text-slate-400">このフェーズに関するメモ・連絡事項...</p>
          <span className="block h-[1.1em]" />
        </div>
      </div>
    </div>
  )
}

function Rail({ tone, last }: { tone: 'done' | 'current'; last?: boolean }) {
  return (
    <div className="relative flex w-[2.4em] shrink-0 flex-col items-center">
      {/* フェーズ間をつなぐ縦線。行間(gap)まで届かせるため下方向へはみ出させる */}
      {!last && (
        <span className="absolute bottom-[-0.75em] left-1/2 top-[2.4em] w-[0.1em] -translate-x-1/2 bg-emerald-100" />
      )}
      <span
        className={cn(
          'flex h-[2.4em] w-[2.4em] shrink-0 items-center justify-center rounded-full',
          tone === 'done' ? 'bg-emerald-100' : 'bg-violet-100',
        )}
      >
        <span
          className={cn(
            'flex h-[1.75em] w-[1.75em] items-center justify-center rounded-full bg-white',
            tone === 'done' ? 'text-emerald-500' : 'text-violet-500',
          )}
        >
          {tone === 'done' ? (
            <CheckCircle2 className="h-[1.15em] w-[1.15em]" />
          ) : (
            <FileText className="h-[1.05em] w-[1.05em]" />
          )}
        </span>
      </span>
    </div>
  )
}

function DateField({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-[0.5em]">
      <CalendarDays className="h-[1.05em] w-[1.05em] shrink-0 text-slate-300" />
      <span className="shrink-0 text-[0.85em] leading-none text-slate-600">{label}</span>
      <span className="ml-[0.6em] inline-flex min-w-[7.5em] shrink-0 items-center justify-center gap-[0.9em] rounded-full border border-slate-200 bg-white px-[0.8em] py-[0.4em] text-[0.85em] leading-none text-slate-400">
        年 /月/日
        <CalendarDays className="h-[1.05em] w-[1.05em] text-slate-700" />
      </span>
    </div>
  )
}
