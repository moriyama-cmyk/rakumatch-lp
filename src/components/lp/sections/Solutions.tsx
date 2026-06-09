import { User, Building, Check, ArrowRight } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { GradientText } from '../ui/GradientText'
import { GlowButton } from '../ui/GlowButton'
import { SITE } from '../site'

const PERSONAL = {
  title: '一人で戦う営業マンへ',
  intro:
    '会社のシステムとは別に、自分のAI相棒を。抱えている顧客を取りこぼさず、「次に誰へ何を」をAIと決める。導入は重くありません。',
  items: [
    '会社の管理が古い/重い。AIをちゃんと使いたい',
    '「このお客様に何を出す？」を一緒に考えてほしい',
    'やることが多くて混乱。一つにまとめたい',
  ],
}

const COMPANY = {
  title: '中小の不動産営業チームへ',
  intro:
    '高い導入費なしで、AIを現場に。新人が初日から動け、部下の状況は報告いらずで見える。属人化を、仕組みに変える。',
  items: [
    '新しいシステムは高い/汎用は業務に合わせにくい',
    '新人教育に手が回らない',
    '部下の把握も、上司への報告も難しい',
  ],
}

/** FOR WHOM（誰のためか）。個人 / 中小経営 の2カラム。ライト。 */
export function Solutions() {
  return (
    <Section id="for-whom" className="bg-surface-50" spacing="lg">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>誰のためか</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-display-lg text-ink-900">
              個人の<GradientText>武器</GradientText>にも、
              <br className="hidden sm:block" />
              チームの<GradientText>仕組み</GradientText>にも。
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <WhomCard icon={User} {...PERSONAL} />
          </Reveal>
          <Reveal delay={0.08}>
            <WhomCard icon={Building} accent {...COMPANY} />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <GlowButton href={SITE.ctaTryUrl} size="lg">
              {SITE.ctaPrimaryLabel}
              <ArrowRight className="h-5 w-5" />
            </GlowButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

function WhomCard({
  icon: Icon,
  title,
  intro,
  items,
  accent,
}: {
  icon: typeof User
  title: string
  intro: string
  items: string[]
  accent?: boolean
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border p-7 shadow-soft sm:p-8 ${
        accent ? 'border-primary-200 bg-primary-50' : 'border-surface-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
          <Icon className="h-6 w-6" strokeWidth={2.2} aria-hidden />
        </span>
        <h3 className="text-xl font-bold text-ink-900">{title}</h3>
      </div>

      <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-700">{intro}</p>

      <ul className="mt-5 space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
              <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
            </span>
            <span className="text-[0.9rem] leading-relaxed text-ink-700">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
