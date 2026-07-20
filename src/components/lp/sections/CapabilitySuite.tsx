import Image from 'next/image'
import {
  ArrowRight,
  Check,
  Bot,
  ClipboardList,
  FileInput,
  MessageSquareText,
  PhoneCall,
  ReceiptText,
  Repeat2,
  Smartphone,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { hl } from '../lib/headline'
import { protect } from '../lib/protect'

type Capability = {
  icon: LucideIcon
  title: string
  body: string
  href?: string
}

const CAPABILITIES: Capability[] = [
  { icon: ClipboardList, title: '顧客管理', body: '条件・会話・進捗を、提案の起点に。' },
  { icon: FileInput, title: '物件一括取り込み', body: '物件情報を取り込み、入力を進めやすく。', href: '/features/property-input' },
  { icon: Repeat2, title: '双方向マッチング', body: '顧客から物件を、物件から顧客を見つける。', href: '/features/matching' },
  { icon: Bot, title: '専属AI', body: '顧客ごとの状況をもとに、次の一手を考える。' },
  { icon: Smartphone, title: 'お客様アプリ', body: 'お客様が保存した物件や希望を受け取る。', href: '/features/customer-app' },
]

const SUPPORTING = [
  { icon: PhoneCall, title: '通話録音・AI要約', href: '/features/call-recording' },
  { icon: MessageSquareText, title: '契約フェーズ管理' },
  { icon: ReceiptText, title: '固都税・精算金の自動計算' },
]

const INGEST_STEPS = [
  '物件一覧を全選択してコピー',
  '楽マッチ AIに貼り付ける',
  'AIが物件ごとに下書き',
  '内容を確認して登録',
  'マッチング候補に入る',
] as const

/** 営業の一連の流れとして、主機能と周辺業務をひとまとめに提示する。 */
export function CapabilitySuite() {
  return (
    <Section id="features" className="bg-white" spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Badge>5つの主機能</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display-lg text-ink-900">
              {hl('入力から', '次の提案まで、', '営業の流れを', '一つに。')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.85] text-ink-700 sm:text-lg">
              点在しがちな情報をつなぎ、ひとりの営業でも次の行動を決めやすくします。
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-6 lg:mt-14 lg:grid-cols-5">
          {CAPABILITIES.map((capability, index) => {
            const Icon = capability.icon
            return (
              <Reveal
                key={capability.title}
                delay={index * 0.05}
                className={`min-w-0 sm:col-span-2 lg:col-span-1 ${index === 3 ? 'sm:col-start-2 lg:col-start-auto' : ''} ${index === 4 ? 'col-span-2 sm:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="flex h-full min-w-0 flex-col rounded-2xl border border-surface-200 bg-surface-100/50 p-5 shadow-soft transition-shadow hover:shadow-soft-md">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                  </span>
                  <h3 className="mt-5 text-base font-bold text-ink-900">{protect(capability.title)}</h3>
                  <p className="mt-2 min-w-0 flex-1 text-sm leading-relaxed text-ink-700">{protect(capability.body)}</p>
                  {capability.href ? (
                    <a
                      href={capability.href}
                      className="mt-4 inline-flex min-h-11 items-center gap-1 self-start text-sm font-bold text-primary-700 underline-offset-4 transition-colors hover:text-primary-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    >
                      詳しく見る
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </a>
                  ) : null}
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-6 rounded-2xl border border-surface-200 bg-white p-5 sm:p-6">
            <p className="text-sm font-bold text-ink-900">提案の前後も、同じ場所で。</p>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {SUPPORTING.map((item) => {
                const Icon = item.icon
                const content = (
                  <>
                    <Icon className="h-4 w-4 shrink-0 text-primary-600" strokeWidth={2} aria-hidden />
                    <span>{protect(item.title)}</span>
                    {item.href ? <ArrowRight className="ml-auto h-4 w-4 shrink-0" aria-hidden /> : null}
                  </>
                )
                return (
                  <li key={item.title} className="min-w-0">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-bold text-ink-700 transition-colors hover:bg-surface-100 hover:text-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-bold text-ink-700">
                        {content}
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <figure className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-2xl border border-surface-200 bg-surface-100 shadow-soft-md">
            <Image
              src="/shot-bulk-input.webp"
              alt="物件情報を取り込む楽マッチ AIの実画面"
              width={1920}
              height={1080}
              sizes="(max-width: 899px) calc(100vw - 40px), 860px"
              className="h-auto w-full"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm sm:px-5">
              <span className="font-bold text-ink-800">物件情報を取り込み、内容を確認する画面</span>
              <span className="text-xs text-ink-500">実画面・デモデータ</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-7 rounded-2xl border border-primary-100 bg-primary-50/60 p-5 sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.12em] text-primary-700">物件一括取り込みの流れ</p>
                <h3 className="mt-2 text-lg font-bold leading-relaxed text-ink-900 sm:text-xl">
                  コピーした物件情報を、提案候補までつなげます。
                </h3>
              </div>
              <a
                href="/features/property-input"
                className="inline-flex min-h-11 shrink-0 items-center gap-1 self-start rounded-lg text-sm font-bold text-primary-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                詳しい入力方法
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <ol className="mt-5 grid gap-2 sm:grid-cols-5">
              {INGEST_STEPS.map((step, index) => (
                <li key={step} className="flex min-w-0 items-start gap-2 rounded-xl border border-primary-100 bg-white px-3.5 py-3 text-sm font-bold leading-relaxed text-ink-800 sm:flex-col">
                  <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary-600 text-xs tabular-nums text-white">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ink-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" strokeWidth={3} aria-hidden />
              AIの抽出結果は下書きです。内容を確認してから登録します。
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
