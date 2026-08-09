import { CheckCircle2, ClipboardCheck, Mic, Sparkles } from 'lucide-react'
import { cn } from '../lib/cn'

/**
 * 「通話録音・AI要約で、商談の振り返りを軽く。」の再現UI（画像ではなくコードで描く）。
 *
 * 他のMockと同じ方式：サイズは親の幅に対する相対値（cqw / em）だけで決まるので、
 * 親ボックスの縦横比が何でも中身が破綻しない。横方向にはみ出さないよう、
 * 折り返し・truncateを要所に入れて幅超過を防いでいる。
 */
interface CallRecordingMockProps {
  className?: string
}

const TRANSCRIPT_LINES = [
  { speaker: '鈴木様', text: '駅から少し遠いのが気になっていて、車がないと厳しいかなと。' },
  { speaker: '担当者', text: '徒歩10分圏内で、駐輪場が広い物件もご紹介できますよ。' },
  { speaker: '鈴木様', text: 'それなら安心です。保育園の近さも重視したいです。' },
]

const SUMMARY_POINTS = ['駅徒歩10分以内を重視、駐輪場の有無も確認したい', '保育園へのアクセスを最優先条件として追加']

export function CallRecordingMock({ className }: CallRecordingMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden bg-white', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="flex h-full w-full flex-col text-slate-800"
        style={{ fontSize: 'clamp(8px, 2.6cqw, 20px)' }}
      >
        <Header />
        <RecordingBar />
        <div className="flex min-h-0 flex-1 flex-col gap-[0.7em] overflow-hidden px-[1.1em] pb-[1.1em] pt-[0.9em]">
          <Transcript />
          <Summary />
        </div>
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-[0.5em] border-b border-slate-200 px-[1.1em] py-[0.85em]">
      <p className="min-w-0 flex-1 truncate text-[1.05em] font-bold leading-none text-slate-900">
        鈴木 花子様との通話
      </p>
      <span className="inline-flex shrink-0 items-center gap-[0.3em] whitespace-nowrap rounded-full bg-emerald-50 px-[0.7em] py-[0.35em] text-[0.75em] font-bold leading-none text-emerald-600">
        <CheckCircle2 className="h-[1.05em] w-[1.05em]" />
        文字起こし完了
      </span>
    </div>
  )
}

function RecordingBar() {
  return (
    <div className="mx-[1.1em] mt-[0.9em] flex shrink-0 items-center gap-[0.7em] rounded-[0.7em] bg-blue-600 px-[0.9em] py-[0.7em]">
      <span className="grid h-[2.1em] w-[2.1em] shrink-0 place-items-center rounded-full bg-white/15">
        <Mic className="h-[1.05em] w-[1.05em] text-white" />
      </span>
      <div className="flex min-w-0 flex-1 items-center gap-[0.15em]">
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="w-[2px] shrink-0 rounded-full bg-white/70"
            style={{ height: `${18 + ((i * 37) % 60)}%` }}
          />
        ))}
      </div>
      <span className="shrink-0 whitespace-nowrap text-[0.85em] font-bold leading-none text-white">
        12:34
      </span>
    </div>
  )
}

function Transcript() {
  return (
    <div className="flex min-h-0 flex-[3_1_0%] flex-col overflow-hidden rounded-[0.7em] border border-slate-200">
      <p className="shrink-0 border-b border-slate-100 bg-slate-50 px-[0.85em] py-[0.5em] text-[0.8em] font-bold leading-none text-slate-500">
        文字起こし
      </p>
      <div className="flex min-h-0 flex-1 flex-col gap-[0.55em] overflow-hidden px-[0.85em] py-[0.7em]">
        {TRANSCRIPT_LINES.map((line, i) => (
          <p key={i} className="text-[0.85em] leading-snug text-slate-700">
            <span className="mr-[0.4em] font-bold text-blue-700">{line.speaker}</span>
            {line.text}
          </p>
        ))}
      </div>
    </div>
  )
}

function Summary() {
  return (
    <div className="flex shrink-0 flex-col overflow-hidden rounded-[0.7em] border border-blue-100 bg-blue-50 px-[0.85em] py-[0.75em]">
      <p className="flex min-w-0 items-center gap-[0.4em] text-[0.85em] font-bold leading-none text-blue-700">
        <Sparkles className="h-[1.1em] w-[1.1em] shrink-0" />
        <span className="truncate">AI要約：次のアクション</span>
      </p>
      <ul className="mt-[0.55em] flex flex-col gap-[0.4em]">
        {SUMMARY_POINTS.map((point) => (
          <li key={point} className="flex min-w-0 items-start gap-[0.4em] text-[0.82em] leading-snug text-slate-700">
            <span className="mt-[0.5em] h-[0.3em] w-[0.3em] shrink-0 rounded-full bg-blue-500" />
            <span className="min-w-0">{point}</span>
          </li>
        ))}
      </ul>
      <span className="mt-[0.65em] inline-flex w-fit shrink-0 items-center gap-[0.35em] whitespace-nowrap rounded-full bg-white px-[0.7em] py-[0.35em] text-[0.75em] font-bold leading-none text-blue-700 shadow-sm">
        <ClipboardCheck className="h-[1.05em] w-[1.05em]" />
        活動履歴に保存済み
      </span>
    </div>
  )
}
