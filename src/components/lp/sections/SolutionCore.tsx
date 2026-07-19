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
          <div className="mx-auto mt-16 flex max-w-3xl items-center justify-center gap-3 sm:mt-20 sm:gap-6">
            <FlowNode icon={User} label="顧客" />
            <Connector />
            <div className="flex flex-col items-center">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary-600 text-white sm:h-20 sm:w-20">
                <Bot className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={2} />
              </span>
              <span className="mt-2 text-xs font-bold text-ink-900">楽マッチ AI</span>
            </div>
            <Connector reverse />
            <FlowNode icon={Home} label="物件" />
          </div>
        </Reveal>

        {/* 3ステップ */}
        <div className="mt-16 grid gap-5 sm:mt-20 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="relative h-full rounded-xl border border-surface-200 bg-surface-50 p-7 transition-shadow duration-200 hover:shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center text-primary-600">
                    <s.icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                  </span>
                  <span className="text-3xl font-bold text-surface-200">{s.n}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-ink-900">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-700">{protect(s.body)}</p>
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

/**
 * 件数ごとの「手入力 と 楽マッチ の手間の差」を示すダンベル図。
 *
 * 2026-07-19 作り直し。旧版は折れ線グラフで、森山さんから
 * 「クオリティ低くて何のことかわからん」と指摘された。
 * dataviz スキル（references/choosing-a-form.md）に「2つの値を比べるときは
 * 折れ線ではなくダンベル図か横棒」と明記されており、**形式の選択そのものが誤り**だった。
 *
 * ダンベル図に変えた理由: 読み手に見てほしいのは「増え方の傾き」ではなく
 * 「同じ件数でここまで差がある」という**差の長さ**だから。棒の長さが差そのものになる。
 *
 * - 凡例を使わず直接ラベル（凡例と図を目で往復させない）
 * - 文字は最小14px（旧版は9pxで読めなかった）
 * - 実測値は書かない。位置は概念。注記の文言は従来どおり。
 */
function EffortLineChart() {
  // 楽マッチは件数が増えても一定（貼るのは1回）。手入力は件数に比例して伸びる。
  const ROWS = [
    { label: '物件10件', manual: 26, raku: 6 },
    { label: '物件50件', manual: 62, raku: 8 },
    { label: '物件100件', manual: 94, raku: 9 },
  ]

  return (
    <div className="mx-auto mt-16 max-w-xl rounded-xl border border-surface-200 bg-surface-50 p-6 sm:mt-20 sm:p-8">
      <p className="text-center text-base font-bold text-ink-900">
        件数が増えても、貼る手間は変わらない
      </p>

      <div
        className="mt-6 space-y-6"
        role="img"
        aria-label="物件10件・50件・100件のいずれでも楽マッチの手間はほぼ一定だが、手入力の手間は件数に比例して伸びる概念図。件数が増えるほど両者の差が開く。"
      >
        {ROWS.map((r, i) => (
          <div key={r.label}>
            <p className="text-sm font-bold text-ink-700">{r.label}</p>
            {/* トラック。左端=手間ゼロ。右へ行くほど手間が大きい。 */}
            <div className="relative mt-2.5 h-6">
              <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-surface-200" aria-hidden />
              {/* 差の区間（ダンベルの棒）＝この長さが「差」そのもの */}
              <span
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-ink-300/50"
                style={{ left: `${r.raku}%`, width: `${r.manual - r.raku}%` }}
                aria-hidden
              />
              {/* 楽マッチ（強調＝ブランド緑） */}
              <span
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600 ring-2 ring-surface-50"
                style={{ left: `${r.raku}%` }}
                aria-hidden
              />
              {/* 手入力（沈める＝グレー） */}
              <span
                className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-500 ring-2 ring-surface-50"
                style={{ left: `${r.manual}%` }}
                aria-hidden
              />
              {/* 直接ラベル（1行目だけ。凡例を使わない） */}
              {i === 0 && (
                <>
                  <span
                    className="absolute top-full mt-1 -translate-x-1/2 whitespace-nowrap text-sm font-bold text-primary-700"
                    style={{ left: `${r.raku}%` }}
                  >
                    楽マッチ
                  </span>
                  <span
                    className="absolute top-full mt-1 -translate-x-1/2 whitespace-nowrap text-sm font-bold text-ink-500"
                    style={{ left: `${r.manual}%` }}
                  >
                    手入力
                  </span>
                </>
              )}
            </div>
            {i === 0 && <div className="h-5" aria-hidden />}
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm leading-relaxed text-ink-500">
        ※イメージ図。手間の増え方の概念を示すものです。
      </p>
    </div>
  )
}

function FlowNode({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-surface-200 bg-white text-primary-600 sm:h-16 sm:w-16">
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
