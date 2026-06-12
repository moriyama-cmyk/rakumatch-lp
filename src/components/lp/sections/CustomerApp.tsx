import { Smartphone, Check, Briefcase, Heart, Star } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { GlowButton } from '../ui/GlowButton'
import { SITE } from '../site'

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
                お客様の“欲しい”が、
                <br className="hidden sm:block" />
                向こうから届く。
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

          {/* お客様アプリ（コード製スマホモック：保存物件リスト） */}
          <Reveal delay={0.1}>
            <PhoneMock />
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

/** コード製のスマホモック（保存物件リスト3枚＝白カード＋星＋ハート）。装飾。 */
function PhoneMock() {
  return (
    <div className="mx-auto max-w-[290px]" aria-hidden>
      <div className="rounded-[2.2rem] border border-surface-200 bg-ink-900/90 p-2.5 shadow-soft-lg">
        <div className="overflow-hidden rounded-[1.7rem] bg-surface-50">
          {/* ステータス／ヘッダー */}
          <div className="bg-white px-4 pb-3 pt-4">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-surface-200" />
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600">
                <Heart className="h-3.5 w-3.5 text-white" strokeWidth={2.6} />
              </span>
              <div className="min-w-0">
                <div className="h-2.5 w-24 rounded bg-ink-900/80" />
                <div className="mt-1 h-2 w-16 rounded bg-surface-200" />
              </div>
            </div>
          </div>

          {/* 保存物件カード×3 */}
          <div className="space-y-2.5 px-3 py-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-surface-200 bg-white p-2.5 shadow-soft"
              >
                {/* サムネ枠 */}
                <div className="h-12 w-14 shrink-0 rounded-lg bg-gradient-to-br from-primary-50 to-surface-100" />
                <div className="min-w-0 flex-1">
                  <div className="h-2.5 w-full rounded bg-ink-900/70" />
                  <div className="mt-1.5 h-2 w-2/3 rounded bg-surface-200" />
                  <div className="mt-1.5 h-2 w-1/3 rounded bg-accent-500/40" />
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-accent-500" fill="currentColor" />
                  <Heart
                    className={`h-3.5 w-3.5 ${i === 0 ? 'text-primary-600' : 'text-surface-200'}`}
                    fill="currentColor"
                  />
                </div>
              </div>
            ))}
          </div>
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
