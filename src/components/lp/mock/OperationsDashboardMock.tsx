import {
  Bell,
  Building2,
  ChevronRight,
  ClipboardList,
  Clock,
  House,
  LayoutGrid,
  LogOut,
  MessageSquarePlus,
  Phone,
  RefreshCw,
  Settings,
  Smartphone,
  Sparkles,
  TrendingUp,
  UsersRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

/**
 * 「業務管理ダッシュボード」画面の再現UI（画像ではなくコードで描く）。
 *
 * AiInputMock / ContractPhaseMock と同じ方式：サイズは親の幅に対する相対値（cqw / em）
 * だけで決まる。親の幅がいくつでも見た目の比率が変わらないので、画像時代に繰り返した
 * 「箱の縦横比と中身の比率がずれて文字が見切れる」が原理的に起きない。
 * 中身の最小の高さ ≒ 親幅 × 0.55（＝16:9の箱にちょうど収まる）。それより縦長の箱に
 * 入れた場合は下段3カラムが伸びて余りを吸収するので、下端が切れることはない。
 * 3カラムは狭い幅でも縦積みにしない：箱の縦横比が 16:9 で固定されているため、
 * 縦積みにすると高さが溢れる。狭い時は全体が等比で小さくなる。
 */
interface OperationsDashboardMockProps {
  className?: string
}

interface StatData {
  icon: LucideIcon
  label: string
  value: string
  chipBg: string
  chipFg: string
}

const STATS: StatData[] = [
  {
    icon: UsersRound,
    label: '追客中の顧客',
    value: '9人',
    chipBg: 'bg-blue-50',
    chipFg: 'text-blue-600',
  },
  {
    icon: Building2,
    label: '登録物件数',
    value: '14件',
    chipBg: 'bg-emerald-50',
    chipFg: 'text-emerald-500',
  },
  {
    icon: TrendingUp,
    label: '今月の案内数',
    value: '3回',
    chipBg: 'bg-violet-50',
    chipFg: 'text-violet-600',
  },
  {
    icon: Smartphone,
    label: 'アプリ利用者',
    value: '6人',
    chipBg: 'bg-rose-50',
    chipFg: 'text-rose-500',
  },
]

interface TaskData {
  title: string
  customer: string
  due: string
  dueTone: string
}

const TASKS: TaskData[] = [
  {
    title: '内見日程の最終調整',
    customer: '鈴木花子',
    due: '本日',
    dueTone: 'bg-amber-50 text-amber-600',
  },
  {
    title: '物件資料の郵送',
    customer: '山本美咲',
    due: '明日',
    dueTone: 'bg-blue-50 text-blue-600',
  },
  {
    title: '契約書類の最終確認',
    customer: '高橋直樹',
    due: '6/7',
    dueTone: 'bg-slate-100 text-slate-500',
  },
  {
    title: '事前審査書類の回収',
    customer: '小林拓也',
    due: '6/5',
    dueTone: 'bg-slate-100 text-slate-500',
  },
]

interface ContractData {
  name: string
  phase: string
  phaseTone: string
  dotBg: string
  dotFg: string
  status: string
  statusTone: string
}

const CONTRACTS: ContractData[] = [
  {
    name: '高橋直樹',
    phase: '契約',
    phaseTone: 'bg-blue-50 text-blue-600',
    dotBg: 'bg-blue-50',
    dotFg: 'bg-blue-500',
    status: '順調',
    statusTone: 'text-emerald-600',
  },
  {
    name: '小林拓也',
    phase: '事前審査',
    phaseTone: 'bg-amber-50 text-amber-600',
    dotBg: 'bg-amber-50',
    dotFg: 'bg-amber-500',
    status: '順調',
    statusTone: 'text-emerald-600',
  },
  {
    name: '鈴木花子',
    phase: '本審査',
    phaseTone: 'bg-violet-50 text-violet-600',
    dotBg: 'bg-violet-50',
    dotFg: 'bg-violet-500',
    status: 'あと5日',
    statusTone: 'text-blue-600',
  },
  {
    name: '中村彩花',
    phase: '決済',
    phaseTone: 'bg-emerald-50 text-emerald-600',
    dotBg: 'bg-emerald-50',
    dotFg: 'bg-emerald-500',
    status: '明日',
    statusTone: 'text-slate-500',
  },
]

export function OperationsDashboardMock({ className }: OperationsDashboardMockProps) {
  return (
    <div
      className={cn('h-full w-full overflow-hidden bg-slate-50', className)}
      style={{ containerType: 'inline-size' }}
      aria-hidden
    >
      <div
        className="flex h-full w-full text-slate-800"
        style={{ fontSize: 'clamp(5px, 1.95cqw, 18px)' }}
      >
        <SideRail />

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden px-[1.5em] pb-[1.1em] pt-[1.2em]">
          <div className="flex shrink-0 items-start gap-[0.8em]">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[1.3em] font-bold leading-tight tracking-tight text-slate-900">
                ダッシュボード
              </p>
              <p className="mt-[0.4em] truncate text-[0.85em] leading-snug text-slate-500">
                お疲れ様です。今日も頑張りましょう。
              </p>
            </div>
            <span className="inline-flex h-[2.1em] w-[2.1em] shrink-0 items-center justify-center rounded-[0.5em] border border-slate-200 bg-white">
              <RefreshCw className="h-[1.05em] w-[1.05em] text-slate-500" />
            </span>
          </div>

          <div className="mt-[1.1em] grid shrink-0 grid-cols-4 gap-[0.75em]">
            {STATS.map((stat) => (
              <StatCard key={stat.label} data={stat} />
            ))}
          </div>

          <div className="mt-[1.1em] grid min-h-0 flex-1 grid-cols-3 gap-[0.75em]">
            <Panel icon={ClipboardList} title="タスク" badge="4件" badgeTone="bg-amber-50 text-amber-600">
              <div className="flex flex-col gap-[0.6em]">
                {TASKS.map((task) => (
                  <TaskRow key={task.title} data={task} />
                ))}
              </div>
            </Panel>

            <Panel icon={Clock} title="契約進行中" badge="4件" badgeTone="bg-blue-50 text-blue-600">
              <div className="flex flex-col">
                {CONTRACTS.map((contract, index) => (
                  <ContractRow
                    key={contract.name}
                    data={contract}
                    last={index === CONTRACTS.length - 1}
                  />
                ))}
              </div>
            </Panel>

            <Panel icon={Bell} title="追客アラート" badge="1名" badgeTone="bg-rose-50 text-rose-500">
              <div className="flex items-center gap-[0.6em] rounded-[0.6em] border border-rose-100 bg-rose-50/70 px-[0.7em] py-[0.65em]">
                <span className="inline-flex h-[2em] w-[2em] shrink-0 items-center justify-center rounded-full bg-rose-100 text-[0.8em] font-bold leading-none text-rose-500">
                  伊
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.9em] font-bold leading-none text-slate-800">
                    伊藤雄大
                  </p>
                  <p className="mt-[0.35em] truncate text-[0.78em] leading-none text-rose-500">
                    3日連絡なし
                  </p>
                </div>
                <span className="inline-flex h-[2em] w-[2em] shrink-0 items-center justify-center rounded-full bg-blue-600">
                  <Phone className="h-[0.95em] w-[0.95em] text-white" />
                </span>
              </div>

              <p className="mt-[0.75em] text-[0.76em] leading-snug text-slate-400">
                他の8名は直近で接触済みです。連絡が空いた方だけ自動で浮かび上がります。
              </p>
            </Panel>
          </div>
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

      <span className="inline-flex h-[1.9em] w-[1.9em] items-center justify-center rounded-[0.5em] bg-blue-600">
        <LayoutGrid className="h-[1em] w-[1em] text-white" />
      </span>
      <RailIcon icon={UsersRound} />
      <RailIcon icon={Building2} />
      <RailIcon icon={Sparkles} />
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

function StatCard({ data }: { data: StatData }) {
  const Icon = data.icon

  return (
    <div className="flex min-w-0 items-center gap-[0.65em] rounded-[0.7em] border border-slate-200 bg-white px-[0.8em] py-[0.75em] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-16px_rgba(15,23,42,0.35)]">
      <span
        className={cn(
          'inline-flex h-[2.1em] w-[2.1em] shrink-0 items-center justify-center rounded-[0.5em]',
          data.chipBg,
        )}
      >
        <Icon className={cn('h-[1.1em] w-[1.1em]', data.chipFg)} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[0.8em] leading-none text-slate-500">{data.label}</p>
        <p className="mt-[0.35em] truncate text-[1.3em] font-bold leading-none text-slate-900">
          {data.value}
        </p>
      </div>
    </div>
  )
}

function Panel({
  icon: Icon,
  title,
  badge,
  badgeTone,
  children,
}: {
  icon: LucideIcon
  title: string
  badge: string
  badgeTone: string
  children: ReactNode
}) {
  return (
    <div className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[0.8em] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-16px_rgba(15,23,42,0.35)]">
      <div className="flex shrink-0 items-center gap-[0.45em] border-b border-slate-100 px-[0.85em] py-[0.65em]">
        <Icon className="h-[1.1em] w-[1.1em] shrink-0 text-slate-500" />
        <span className="min-w-0 truncate text-[0.95em] font-bold leading-none text-slate-800">
          {title}
        </span>
        <span
          className={cn(
            'ml-auto shrink-0 whitespace-nowrap rounded-full px-[0.6em] py-[0.3em] text-[0.75em] font-bold leading-none',
            badgeTone,
          )}
        >
          {badge}
        </span>
      </div>

      <div className="min-h-0 flex-1 px-[0.85em] py-[0.7em]">{children}</div>
    </div>
  )
}

function TaskRow({ data }: { data: TaskData }) {
  return (
    <div className="flex items-center gap-[0.55em]">
      <span className="h-[1.05em] w-[1.05em] shrink-0 rounded-[0.2em] border border-slate-300 bg-white" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.88em] leading-snug text-slate-800">{data.title}</p>
        <p className="mt-[0.15em] truncate text-[0.78em] leading-none text-blue-600">
          {data.customer}
        </p>
      </div>
      <span
        className={cn(
          'shrink-0 whitespace-nowrap rounded-full px-[0.6em] py-[0.3em] text-[0.74em] font-bold leading-none',
          data.dueTone,
        )}
      >
        {data.due}
      </span>
    </div>
  )
}

function ContractRow({ data, last }: { data: ContractData; last?: boolean }) {
  return (
    <div className="flex items-stretch gap-[0.5em]">
      <div className="relative flex w-[1.5em] shrink-0 justify-center">
        {/* 行間まで縦線を届かせるため、下方向へ次の行の丸まではみ出させる */}
        {!last && (
          <span className="absolute bottom-0 left-1/2 top-[1.5em] w-[0.09em] -translate-x-1/2 bg-slate-200" />
        )}
        <span
          className={cn(
            'relative flex h-[1.5em] w-[1.5em] shrink-0 items-center justify-center rounded-full',
            data.dotBg,
          )}
        >
          <span className={cn('h-[0.5em] w-[0.5em] rounded-full', data.dotFg)} />
        </span>
      </div>

      <div className={cn('min-w-0 flex-1', !last && 'pb-[0.65em]')}>
        <div className="flex items-center gap-[0.4em]">
          <span className="min-w-0 truncate text-[0.88em] font-bold leading-none text-slate-800">
            {data.name}
          </span>
          <span
            className={cn(
              'shrink-0 whitespace-nowrap rounded-full px-[0.55em] py-[0.28em] text-[0.72em] font-bold leading-none',
              data.phaseTone,
            )}
          >
            {data.phase}
          </span>
        </div>
        <p className={cn('mt-[0.35em] truncate text-[0.78em] font-bold leading-none', data.statusTone)}>
          {data.status}
        </p>
      </div>
    </div>
  )
}
