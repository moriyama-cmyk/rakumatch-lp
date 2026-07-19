import { Inbox, Eye, Rocket, User, Home, Bot } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { GradientText } from '../ui/GradientText'
import { protect } from '../lib/protect'

type Step = { n: string; icon: LucideIcon; title: string; body: string }

const STEPS: Step[] = [
  {
    n: '01',
    icon: Inbox,
    title: '入れる',
    body: '顧客も物件も、貼る・撮る・投げ込むだけ。AIが整理してページにします。媒体連携は不要（0円）。',
  },
  {
    n: '02',
    icon: Eye,
    title: 'わかる',
    body: '顧客からも物件からも逆引き。「このお客様に何を」「この物件を誰に」が一目で。',
  },
  {
    n: '03',
    icon: Rocket,
    title: '動く',
    body: '次のアプローチ、ヒアリング、メール下書き、潜在ニーズ。専属AIが次の一手を提案します。',
  },
]

/** SOLUTION（核の宣言）。楽マッチが何者かを1画面で言い切る。ライト。 */
export function SolutionCore() {
  return (
    <Section id="solution" className="bg-white" spacing="lg">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>楽マッチ AI が、やること</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-display-xl text-ink-900">
              <span className="whitespace-nowrap">
                <GradientText>楽マッチ AI</GradientText>
              </span>{' '}
              <span className="whitespace-nowrap">が、やること。</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700">
              顧客一人・物件一件ごとに専属AIがつき、「誰に・どの物件を・どう出すか」を、この場で言い切ります。マッチングは、考える作業から確認する作業に変わります。
            </p>
          </Reveal>
        </div>

        {/* 双方向フロー図 */}
        <Reveal delay={0.12}>
          <div className="mx-auto mt-12 flex max-w-3xl items-center justify-center gap-3 sm:gap-6">
            <FlowNode icon={User} label="顧客" />
            <Connector />
            <div className="flex flex-col items-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-soft-md sm:h-20 sm:w-20">
                <Bot className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={2} />
              </span>
              <span className="mt-2 text-xs font-bold text-ink-900">楽マッチ AI</span>
            </div>
            <Connector reverse />
            <FlowNode icon={Home} label="物件" />
          </div>
        </Reveal>

        {/* 3ステップ */}
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative h-full rounded-2xl border border-surface-200 bg-surface-50 p-7 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <s.icon className="h-6 w-6" strokeWidth={2.2} aria-hidden />
                  </span>
                  <span className="text-3xl font-bold text-surface-200">{s.n}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{protect(s.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-xl text-center text-base font-bold text-ink-900">
            50件でも、その先でも。貼る手間は、<GradientText>一瞬</GradientText>のまま。
            <br className="hidden sm:block" />
            そして、その入力が初めて<GradientText>意味</GradientText>を持つ。
          </p>
        </Reveal>

        {/* 概念図: 件数が増えるほど、手入力とのギャップが右へ開く。実測値は書かない。 */}
        <Reveal delay={0.24}>
          <EffortLineChart />
        </Reveal>
        {/* CTAはヒーロー・料金・最終CTAに集約。中間セクションの「無料で試す」連打は撤去。 */}
      </Container>
    </Section>
  )
}

/** 手入力(右肩上がり)と楽マッチ(ほぼ水平)の2本線。件数が増えるほど差が開く概念図。実測性能は書かない。 */
function EffortLineChart() {
  return (
    <div className="mx-auto mt-8 max-w-md rounded-2xl border border-surface-200 bg-surface-50 p-5 sm:p-6">
      <div className="flex items-center justify-center gap-5 text-xs font-medium text-ink-700">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-5 shrink-0 rounded-full bg-[#5E6B64]" aria-hidden />
          手入力
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-1.5 w-5 shrink-0 rounded-full bg-primary-600" aria-hidden />
          楽マッチ
        </span>
      </div>

      <svg
        viewBox="0 0 300 150"
        className="mt-3 w-full"
        role="img"
        aria-label="件数が増えるほど手入力の手間は比例して増える一方、楽マッチの手間はほぼ横ばいのまま。件数が増えるほど差が開くイメージ図。"
      >
        {/* 軸（ヘアライン・実線） */}
        <line x1="24" y1="118" x2="278" y2="118" strokeWidth="1" className="stroke-[#E5E2DD]" />
        <line x1="24" y1="18" x2="24" y2="118" strokeWidth="1" className="stroke-[#E5E2DD]" />
        <text x="278" y="132" textAnchor="end" className="fill-[#898781]" style={{ fontSize: 9 }}>
          件数 →
        </text>
        <text x="24" y="12" textAnchor="start" className="fill-[#898781]" style={{ fontSize: 9 }}>
          手間
        </text>

        {/* 手入力: 件数に比例した右肩上がり */}
        <line x1="24" y1="118" x2="256" y2="26" strokeWidth="2" strokeLinecap="round" className="stroke-[#5E6B64]" />
        <circle cx="256" cy="26" r="4" strokeWidth="2" className="fill-[#5E6B64] stroke-[#FAFAF8]" />

        {/* 楽マッチ: ほぼ水平 */}
        <line x1="24" y1="112" x2="256" y2="100" strokeWidth="2" strokeLinecap="round" className="stroke-primary-600" />
        <circle cx="256" cy="100" r="4" strokeWidth="2" className="fill-primary-600 stroke-[#FAFAF8]" />
      </svg>

      <p className="mt-2 text-center text-xs leading-relaxed text-ink-500">※イメージ図。手間の増え方の概念を示すものです。</p>
    </div>
  )
}

function FlowNode({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-surface-200 bg-white text-primary-600 shadow-soft sm:h-16 sm:w-16">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
      </span>
      <span className="mt-2 text-xs font-medium text-ink-700">{label}</span>
    </div>
  )
}

function Connector({ reverse }: { reverse?: boolean }) {
  return (
    <div className="relative h-px flex-1 bg-surface-200">
      <span
        className={`absolute top-1/2 ${reverse ? 'left-0' : 'right-0'} h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary-400`}
      />
    </div>
  )
}
