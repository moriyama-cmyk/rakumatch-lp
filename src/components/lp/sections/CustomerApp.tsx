import { Smartphone, Check, Briefcase, Heart } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { GlowButton } from '../ui/GlowButton'
import { Img } from '../ui/Img'
import { SITE } from '../site'
import { hlText } from '../lib/headline'

const SALES = [
  '保存物件と条件が逆流。「何を出すか」の精度が上がる',
  '気になる物件がたまったら、一気に案内できる',
  '相談の窓口になることで、他の営業に奪われにくい',
]
const CUSTOMER = [
  '媒体をまたいだ“気になる”を一つに集約（共有から保存）',
  '自分では気づけない注意点に気づける',
  '内見の調整も、窓口一つで簡単',
]

/** ① お客様連動アプリ（最大の差別化＝堀・主役）。ライト・実画面。 */
export function CustomerApp() {
  return (
    <Section id="customer-app" className="bg-surface-50" spacing="lg">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Badge icon={<Smartphone className="h-3.5 w-3.5" />}>最大の差別化</Badge>
              <h3 className="mt-5 text-display-md text-ink-900">
                {hlText('お客様の“欲しい”が、')}
                <br className="hidden sm:block" />
                {hlText('向こうから届く。')}
              </h3>
              <p className="mt-4 text-[1.0625rem] leading-[1.9] text-ink-700">
                担当者が発行するリンクを、お客様が自分のアプリとして使います。SUUMOなど色々な媒体で気になった物件を、お客様が1か所に集約。その希望と保存物件が、そのままあなたに届きます。好みを言葉にしてもらわなくても、ニーズが伝わってくる。
              </p>
            </Reveal>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Reveal delay={0.05}>
                <SubList icon={Briefcase} title="営業側" items={SALES} />
              </Reveal>
              <Reveal delay={0.12}>
                <SubList icon={Heart} title="お客様側" items={CUSTOMER} />
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <p className="mt-5 text-xs text-ink-500">
                ※ お客様はログイン不要のまま、保存・星評価・メモ・内見リクエストまで全機能使えます。
              </p>
              <GlowButton href={SITE.ctaTryUrl} variant="ghost" size="sm" className="mt-3 -ml-2">
                {SITE.ctaPrimaryLabel} →
              </GlowButton>
            </Reveal>
          </div>

          {/* お客様アプリの実画面（保存物件リスト＋あなたの傾向）。スマホ枠風の細い額装。 */}
          <Reveal delay={0.1}>
            <PhoneShot />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/** 実画面をスマホ枠風の細い角丸で額装（画像は隠さない）。 */
function PhoneShot() {
  return (
    <div className="mx-auto max-w-[320px]">
      <div className="overflow-hidden rounded-[2rem] border border-surface-200 bg-white p-1.5 shadow-soft-lg">
        <div className="overflow-hidden rounded-[1.6rem]">
          <Img
            base="/shot-customer-app-list"
            alt="お客様アプリの保存物件リストと「あなたの傾向」AI分析の実画面"
            width={700}
            height={1522}
            priority
          />
        </div>
      </div>
    </div>
  )
}

function SubList({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Briefcase
  title: string
  items: string[]
}) {
  return (
    <div className="rounded-2xl border border-surface-200 bg-white p-5 shadow-soft">
      <p className="flex items-center gap-2 text-sm font-bold text-primary-700">
        <Icon className="h-4 w-4" strokeWidth={2.4} />
        {title}
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-[0.85rem] leading-relaxed text-ink-700">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-600" strokeWidth={3} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}
