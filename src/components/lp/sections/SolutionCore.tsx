import { Inbox, Eye, Rocket, User, Home, Bot, ArrowLeftRight } from 'lucide-react'
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
    <Section id="solution" className="bg-surface-100" spacing="lg">
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

        {/* 双方向フロー図。
            2026-07-24 Phase3（森山さん指摘「隙間空きすぎ・文字小さい・意味わからない」対応）:
            ①余白圧縮(mt-16→mt-10) ②ラベルをxs→sm/boldへ拡大 ③点だけだった接続線を
            双方向矢印(ArrowLeftRight)に差し替え、「顧客からも物件からも逆引きできる」という
            図の意味そのものを可視化 ④矢印の下に一言ラベルを添えて図を自己説明にする。 */}
        <Reveal delay={0.12}>
          <div className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3 sm:mt-12 sm:gap-5">
            <FlowNode icon={User} label="顧客" />
            <Connector label="誰に出すか" />
            <div className="flex flex-col items-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary-600 text-white sm:h-20 sm:w-20">
                <Bot className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={2} />
              </span>
              <span className="mt-2 text-sm font-bold text-ink-900">楽マッチ AI</span>
            </div>
            <Connector label="何を出すか" />
            <FlowNode icon={Home} label="物件" />
          </div>
        </Reveal>

        {/* 3ステップ。2026-07-24 Phase3: 余白圧縮(mt-16→mt-10)・本文をsm→baseへ拡大（森山さん指摘「文字小さい」）・
            surface-100地に載るためカード面はwhiteへ（Phase2の背景2値ルール準拠）。 */}
        <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative h-full rounded-xl border border-surface-200 bg-white p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center text-primary-600">
                    <s.icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                  </span>
                  {/* 装飾番号（1.24:1・視覚的な飾りのみ）。読み上げ不要のためaria-hiddenで除外。 */}
                  <span className="text-3xl font-bold text-surface-200" aria-hidden="true">{s.n}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2.5 text-base leading-relaxed text-ink-700">{protect(s.body)}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 2026-07-24 Phase3: 締め文の緑ハイライト（一瞬/意味＝普通名詞）は情報ゼロの装飾のため撤去
            （GradientTextは数値・固有名詞限定の運用へ・Fable F3-3）。
            ダンベル図(EffortLineChart)は森山さん判定「何を伝えたいか全く意味が分からない」につき削除。
            同じ主張（件数が増えても貼る手間は一定）は直後のIngestセクションが実演で伝える。 */}
        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-xl text-center text-base font-bold text-ink-900">
            50件でも、その先でも。貼る手間は、一瞬のまま。
            <br className="hidden sm:block" />
            そして、その入力が初めて意味を持つ。
          </p>
        </Reveal>
        {/* CTAはヒーロー・料金・最終CTAに集約。中間セクションの「無料で試す」連打は撤去。 */}
      </Container>
    </Section>
  )
}

function FlowNode({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-surface-200 bg-white text-primary-600 sm:h-16 sm:w-16">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
      </span>
      <span className="mt-2 text-sm font-bold text-ink-900">{label}</span>
    </div>
  )
}

/** 双方向の接続。線＋⇄アイコン＋一言ラベルで「両方向から引ける」ことを図自身に語らせる。 */
function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <div className="flex w-full items-center gap-1">
        <span className="h-px flex-1 bg-primary-300" aria-hidden />
        <ArrowLeftRight className="h-4 w-4 shrink-0 text-primary-600 sm:h-5 sm:w-5" aria-hidden />
        <span className="h-px flex-1 bg-primary-300" aria-hidden />
      </div>
      <span className="whitespace-nowrap text-xs font-medium text-ink-700 sm:text-sm">{label}</span>
    </div>
  )
}
