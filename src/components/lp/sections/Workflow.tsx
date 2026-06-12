import { LayoutDashboard, User, Building, ArrowRight } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { AppShot } from '../ui/AppShot'
import { hlText } from '../lib/headline'

/** ⑥ TODO・契約フェーズ・ダッシュボード。ここで経営者へ橋渡し。ライト・実画面。 */
export function Workflow() {
  return (
    <Section id="workflow" className="bg-white" spacing="lg">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Badge icon={<LayoutDashboard className="h-3.5 w-3.5" />}>全体が、見える</Badge>
              <h3 className="mt-5 text-display-md text-ink-900">
                {hlText('やること・契約の今・全体像。')}
                <br className="hidden sm:block" />
                {hlText('楽マッチを見れば分かる。')}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink-700">
                お客様からの頼まれごとや次のアクションは、TODOで取りこぼさない。契約は案件ごとに進捗と「次にやること」が分かるから、混乱しない。関係各所へのメールも、つじつまを合わせてAIが下書き。
              </p>
            </Reveal>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.05}>
                <ViewCard
                  icon={User}
                  label="個人"
                  body="楽マッチを見れば、自分の全スケジュールと“次の一手”が分かる。"
                />
              </Reveal>
              <Reveal delay={0.12}>
                <ViewCard
                  icon={Building}
                  label="経営・管理"
                  body="ダッシュボードで全体を把握。オーナーは組織の全顧客を見られるから、こまめな報告がいらない。新人が何で詰まっているかも見える。"
                  accent
                />
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <p className="mt-6 flex items-start gap-2 text-[0.95rem] font-bold text-ink-900">
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary-600" />
                「報告して」と言わなくても、状況が見える。育成も、把握も、ここから。
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <AppShot
              base="/shot-dashboard"
              alt="契約フェーズとTODOを横断把握する楽マッチ AI のダッシュボード画面"
              width={1600}
              height={713}
              chrome
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

function ViewCard({
  icon: Icon,
  label,
  body,
  accent,
}: {
  icon: typeof User
  label: string
  body: string
  accent?: boolean
}) {
  return (
    <div
      className={`rounded-2xl border p-5 shadow-soft ${
        accent ? 'border-primary-200 bg-primary-50' : 'border-surface-200 bg-surface-50'
      }`}
    >
      <p className="flex items-center gap-2 text-sm font-bold text-primary-700">
        <Icon className="h-4 w-4" strokeWidth={2.4} />
        {label}
      </p>
      <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-700">{body}</p>
    </div>
  )
}
