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
    title: '入力したのに、何も返ってこない。',
    body: '顧客も物件も、打ち込むだけで一日が終わる。入力はマッチングや提案のためのはず。なのに、溜まっていくのは"入力済みのデータ"だけ——だから今日も、入力そのものが後回しになる。',
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
          <Reveal delay={0.08}>
            <p className="mt-4 text-lg font-bold text-ink-900">
              {hlText('売れない理由は、努力不足ではない。情報が、つながっていないだけ。')}
            </p>
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

        <Reveal delay={0.16}>
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-surface-200 bg-white p-7 shadow-soft sm:p-8">
            <p className="text-base font-bold text-ink-900">
              {hlText('いまのやり方の値段を、一度だけ計算してみてください。')}
            </p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-700">
              営業が“売ること”に使えている時間は、週のわずか32%※1。メール1通の作成に、平均5分57秒※2。物件の手入力が1件20分なら、50件で16時間——あなたの時給換算で、いくらになりますか。楽マッチは、月3,000円です。
            </p>
            <p className="mt-3 text-xs text-ink-500">
              ※1 Salesforce「セールス最新事情」2024（27カ国・営業職調査） ※2 日本ビジネスメール協会「ビジネスメール実態調査2024」。いずれも業界横断の調査です。
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 text-center text-display-md text-ink-900">
            {hl('その全部に、', <><GradientText>AIの相棒</GradientText>で</>, '手を打てます。')}
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
