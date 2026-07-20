import Image from 'next/image'
import {
  ArrowRight,
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

const SHOTS = [
  { src: '/shot-bulk-input.webp', alt: '物件情報を取り込む実画面', width: 1920, height: 1080, title: '物件を取り込む' },
  { src: '/shot-hero-matching.webp', alt: '物件と顧客を照らし合わせる実画面', width: 1600, height: 713, title: '提案先を見つける' },
  { src: '/shot-ai-insight.webp', alt: 'AIの提案内容を確認する実画面', width: 1920, height: 1080, title: '次の一手を考える' },
]

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

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
          {CAPABILITIES.map((capability, index) => {
            const Icon = capability.icon
            return (
              <Reveal
                key={capability.title}
                delay={index * 0.05}
                className="min-w-0 last:sm:col-span-2 last:sm:mx-auto last:sm:w-[calc(50%-0.375rem)] last:lg:col-span-1 last:lg:mx-0 last:lg:w-auto"
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

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {SHOTS.map((shot, index) => (
            <Reveal key={shot.src} delay={index * 0.06} className="min-w-0">
              <figure className="overflow-hidden rounded-2xl border border-surface-200 bg-surface-100 shadow-soft">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  className="h-auto w-full"
                />
                <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  <span className="font-bold text-ink-800">{shot.title}</span>
                  <span className="shrink-0 text-xs text-ink-500">実画面・デモデータ</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
