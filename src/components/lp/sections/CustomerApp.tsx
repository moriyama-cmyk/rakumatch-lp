'use client'

import { Smartphone, Check, Briefcase, Heart } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { GlowButton } from '../ui/GlowButton'
import { PhoneApp } from '../mock'
import { SITE } from '../site'
import { hl, hlText } from '../lib/headline'
import { trackCta } from '@/lib/track'

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
    <Section id="customer-app" className="bg-surface-100" spacing="lg">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <Badge icon={<Smartphone className="h-3.5 w-3.5" />}>最大の差別化</Badge>
              <h2 className="mt-4 text-display-lg text-ink-900">
                {/* hlText は句読点でしか割らないため「言葉にならない“欲しい”まで、」が
                    14字の1チャンクになり、2カラム時のカラム幅(≈526px)を超えて見切れた。
                    headline.tsx の「1チャンク全角9字以内」に従い hl() で手動分割する（文言は不変）。 */}
                {hl('言葉にならない', '“欲しい”まで、')}
                <br className="hidden sm:block" />
                {hlText('営業に届く。')}
              </h2>
              {/* 2026-07-19 森山さん指摘により文言差し替え（例外的コピー変更・他は不変）。 */}
              <p className="mt-3 text-sm font-bold text-primary-700 sm:text-base">
                {hlText('お客様が見つける前に、あなたが気づく。')}
              </p>
              <p className="mt-4 text-lg leading-[1.8] text-ink-700">
                {/* 2026-07-19 事実訂正: 森山さんは会社の経営者ではなく勤務先の営業。
                    「自分の会社」は所有者と読めるため「自分が担当している」に変更。 */}
                自分が担当しているお客様に、実際に配っています。担当者が発行するリンクを、お客様が自分のアプリとして使う。SUUMOなど色々な媒体で気になった物件が1か所に集まり、その希望と保存物件が、そのままあなたに届きます。「どんな物件がお好みですか」と、もう聞かなくていい。
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
              <GlowButton
                href={SITE.ctaTryUrl}
                variant="ghost"
                size="sm"
                className="mt-3 -ml-2"
                onClick={() => trackCta('customer_app')}
              >
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

/**
 * お客様アプリの画面。2026-07-19、スクショ（/shot-customer-app-list）から
 * コード製の再現UI（PhoneApp）に差し替え。
 * 森山さん指摘「画質劣化しているし疲れる／文字が読めない」への対応。
 * 真因は画質ではなく縮小（アプリは12px前提の業務画面）。原寸で描き、
 * 情報を減らして文字を大きくすることで解決している。
 * 主役は「内見希望済み」バッジ＝お客様の動きが営業側に逆流している証拠。
 */
function PhoneShot() {
  return (
    <PhoneApp
      customerName="田中様"
      properties={[
        {
          title: 'みどり坂レジデンス',
          price: '4,780万円',
          meta: '田園都市線・3LDK・築7年',
          status: 'viewing',
        },
        {
          title: 'ひかり町ガーデン',
          price: '4,580万円',
          meta: '東急目黒線・3LDK・築9年',
        },
        {
          title: 'さくら丘テラス',
          price: '4,950万円',
          meta: '小田急線・4LDK・築12年',
        },
      ]}
    />
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
    <div className="rounded-xl border border-surface-200 bg-white p-5 shadow-none transition-shadow duration-200 hover:shadow-soft">
      <p className="flex items-center gap-2 text-sm font-bold text-primary-700">
        <Icon className="h-4 w-4" strokeWidth={2.4} />
        {title}
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm leading-[1.7] text-ink-700">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-600" strokeWidth={3} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}
