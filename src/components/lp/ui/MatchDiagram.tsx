import { Home, User, Bot, ArrowRight } from 'lucide-react'

// 双方向マッチングのコード製図解（実画像を使わない・クリーン）。
// 中央=楽マッチAIエンジン、左=物件 / 右=顧客、下=双方向の出力（スコア順）。
// スタイルは Hero の HeroMatchMock とトーン統一（白カード・エメラルド・極細罫線）。

const PROPERTIES = ['渋谷区 区分', '目黒区 戸建', '世田谷 1LDK']
const CUSTOMERS = ['田中 様', '佐藤 様', '鈴木 様']

// 出力カードのスコア（目安）
const FROM_PROPERTY = [
  { name: '田中 様（実需・6,800万）', score: 92 },
  { name: '佐藤 様（投資・利回り）', score: 81 },
  { name: '鈴木 様（実需・駅近）', score: 67 },
]
const FROM_CUSTOMER = [
  { name: '渋谷区 区分 6,500万', score: 92 },
  { name: '目黒区 戸建 8,200万', score: 81 },
  { name: '世田谷 1LDK 4,800万', score: 67 },
]

export function MatchDiagram() {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-6 shadow-soft-lg sm:p-7">
      {/* 上段: 物件 → エンジン ← 顧客 */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
        {/* 物件群 */}
        <MiniColumn icon={Home} title="物件" items={PROPERTIES} />

        {/* 中央エンジン＋矢印 */}
        <div className="flex flex-col items-center px-0.5">
          <Arrows />
          <div className="flex flex-col items-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft-md sm:h-16 sm:w-16">
              <Bot className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2} />
            </span>
            <span className="mt-1.5 text-center text-[0.7rem] font-bold text-ink-900">楽マッチ AI</span>
            <span className="mt-0.5 max-w-[7.5rem] text-center text-[0.6rem] leading-tight text-ink-500">
              幅を持たせた実務向けスコアリング
            </span>
          </div>
        </div>

        {/* 顧客群 */}
        <MiniColumn icon={User} title="顧客" items={CUSTOMERS} align="right" />
      </div>

      {/* 下段: 双方向の出力（スコア順） */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <OutputCard
          heading={
            <>
              物件から
              <ArrowRight className="mx-1 inline h-3.5 w-3.5 text-primary-600" />
              紹介すべき顧客が並ぶ
            </>
          }
          rows={FROM_PROPERTY}
        />
        <OutputCard
          heading={
            <>
              顧客から
              <ArrowRight className="mx-1 inline h-3.5 w-3.5 text-primary-600" />
              出すべき物件が並ぶ
            </>
          }
          rows={FROM_CUSTOMER}
        />
      </div>

      <p className="mt-3 text-[0.65rem] text-ink-500">※ 点数は営業判断を助けるための目安です。</p>
    </div>
  )
}

function MiniColumn({
  icon: Icon,
  title,
  items,
  align = 'left',
}: {
  icon: typeof Home
  title: string
  items: string[]
  align?: 'left' | 'right'
}) {
  return (
    <div className="space-y-1.5">
      <p
        className={`flex items-center gap-1 text-[0.7rem] font-bold text-ink-700 ${
          align === 'right' ? 'justify-end' : ''
        }`}
      >
        <Icon className="h-3.5 w-3.5 text-primary-600" strokeWidth={2.4} />
        {title}
      </p>
      {items.map((it) => (
        <div
          key={it}
          className="truncate rounded-lg border border-surface-200 bg-surface-50 px-2 py-1.5 text-[0.62rem] text-ink-700"
        >
          {it}
        </div>
      ))}
    </div>
  )
}

/** 中央へ向かう極細の双方向矢印（SVG）。 */
function Arrows() {
  return (
    <svg
      viewBox="0 0 80 24"
      className="mb-2 h-5 w-16 text-primary-300"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* 左から中央へ */}
      <path d="M4 8 H36" />
      <path d="M32 5 l4 3 l-4 3" />
      {/* 右から中央へ */}
      <path d="M76 16 H44" />
      <path d="M48 13 l-4 3 l4 3" />
    </svg>
  )
}

function OutputCard({
  heading,
  rows,
}: {
  heading: React.ReactNode
  rows: { name: string; score: number }[]
}) {
  return (
    <div className="rounded-xl border border-surface-200 bg-surface-50 p-3">
      <p className="mb-2 text-[0.7rem] font-bold text-ink-900">{heading}</p>
      <ul className="space-y-1.5">
        {rows.map((r) => (
          <li
            key={r.name}
            className="flex items-center gap-2 rounded-lg border border-surface-200 bg-white px-2 py-1.5"
          >
            <span className="min-w-0 flex-1 truncate text-[0.62rem] text-ink-700">{r.name}</span>
            <span className="shrink-0 rounded-full bg-primary-50 px-1.5 py-0.5 text-[0.6rem] font-bold text-primary-700">
              {r.score}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
