import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { GradientText } from '../ui/GradientText'
import { hl, hlText } from '../lib/headline'
import { HelpCircle, NotebookPen, GraduationCap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Pain = { icon: LucideIcon; title: string; body: string }

const PAINS: Pain[] = [
  {
    icon: HelpCircle,
    title: 'このお客様に、何を出せばいい？',
    body: '抱えている顧客は増える一方。誰にどの物件が刺さるか、頭の中だけで管理しきれない。顧客が増えるほど、マッチングの精度は落ちていく。',
  },
  {
    icon: NotebookPen,
    title: '良いシステムは、高くて入れられない。',
    body: '月5万円のCRM、数十万円の初期費用。良い道具があるのは知っている。でも、うちの規模では割に合わない——そうやって今日も、Excelと紙に戻っていく。',
  },
  {
    icon: GraduationCap,
    title: '新人がなかなか育たない。属人化する。',
    body: 'できる人のやり方は共有されず、新人に教える30分が今日も取れない。担当が変わると引き継ぎが重く、その人が抜ければ、お客様の履歴も一緒にいなくなる。',
  },
]

/** 課題提起。個人/企業に共通する痛みで「これ、うちだ」と刺す。 */
export function Problem() {
  return (
    <Section id="problem" className="bg-surface-50">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>こんな現場、ありませんか</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-display-lg text-ink-900">
              {hl(<>こんな<GradientText>“もったいない”</GradientText>、</>)}
              <br className="hidden sm:block" />
              {hl('起きていませんか。')}
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PAINS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-surface-200 bg-white p-7 shadow-soft">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-surface-100 text-primary-600">
                  <p.icon className="h-5 w-5" strokeWidth={2.2} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink-900">{hlText(p.title)}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-700">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <p className="mt-10 text-center text-display-md text-ink-900">
            {hl('その全部に、', <><GradientText>AIの相棒</GradientText>で</>, '手を打てます。')}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
