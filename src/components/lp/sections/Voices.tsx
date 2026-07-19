'use client'

import { useState } from 'react'
import { Briefcase, User } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { GradientText } from '../ui/GradientText'

type Voice = {
  /** 発話者の立場。sales=営業側 / customer=お客様側。ラベルと配色を切り替える。 */
  kind: 'sales' | 'customer'
  /** 匿名化した属性（実在の人とのズレを防ぐため粒度は粗め）。 */
  attr: string
  /** 本人から聞いた声を、体験の描写に留めて整えたもの（断定数字・最上級は載せない）。 */
  body: string
}

/**
 * お客様/営業の声。発注者が本人から実際に聞いた声を、体験の描写に留めて掲載。
 * - 断定的な成果数値（「2倍」等）・最上級・機能タグ・「構成した」等のメタ文は載せない。
 * - 属性は実在の人とのズレを防ぐため粗い粒度に匿名化。
 * 代表3件を最初から表示し、残りは「もっと見る」で開く。
 */
const VOICES: Voice[] = [
  {
    kind: 'sales',
    attr: '都内・売買仲介／30代',
    body: '顧客が20人を超えたあたりで、誰にどの物件かを頭で追えなくなりました。新着をコピペで放り込むと「この物件はこの3人に」とバッジで出るので、探す作業が確認する作業に変わった感覚です。案内済みは自動で外れるので、同じ物件を二度勧める失礼もなくなりました。',
  },
  {
    kind: 'customer',
    attr: '30代・購入検討中のお客様',
    body: '担当者から届いたリンクを、アプリ代わりに使っています。気になった物件を共有ボタンで保存するだけ。自分ではうまく言葉にできていなかった希望——距離より部屋の明るさを大事にしていた、とか——を傾向として見せてくれて、"わかってもらえている"感覚がありました。',
  },
  {
    kind: 'sales',
    attr: '新人（入社数ヶ月）',
    body: '引き出しがなくて、電話が怖かったんです。顧客ページを開くとAIが資金や条件を踏まえて「次はこう聞くと」「この物件が潜在的に合うかも」と教えてくれる。優しい上司が隣にいる感じで、初日から一人で動けました。',
  },
  {
    kind: 'sales',
    attr: '小規模店舗の店長',
    body: 'できる営業のやり方は本人の頭の中にあって、辞められると履歴ごと消えるのが怖かった。通話を録音すれば要約が活動履歴に自動で残るので、担当交代の引き継ぎが一瞬です。初期費用もかからず法人契約も不要で、「まず店で入れてみるか」のハードルがほとんどありませんでした。',
  },
  {
    kind: 'sales',
    attr: 'ベテラン営業（PC操作は苦手）',
    body: 'CRMは何度も挫折してきました——入力が続かないので。楽マッチは"入力らしい入力"がありません。レインズをまるごと貼るだけで、50件がカードになる。清算金の日割りも起算日を入れるだけで出るので、電卓の時間も消えました。',
  },
  {
    kind: 'customer',
    attr: '投資用物件を検討中のお客様',
    body: '複数社と同時に話を進めていますが、楽マッチを使う担当者は提案の質が違いました。保存した物件の傾向から、予算や利回りに幅を持たせた実務的な提案をしてくれる。アプリから内見のリクエストもでき、専属のコンシェルジュがついているようでした。',
  },
  {
    kind: 'customer',
    attr: '購入検討中のお客様',
    body: 'いくつもの媒体で探すうちに、自分の軸が分からなくなっていました。AIが保存した物件の共通点を分析して傾向を言葉にしてくれたことで、軸が固まりました。AIの費用は営業側が持ってくれるので、探す側は無料で使えるのもありがたかったです。',
  },
  {
    kind: 'customer',
    attr: '購入検討中のお客様',
    body: '営業さんに直接は言いにくい本音——予算を少し下げたい、とか——を、AIに壁打ちして整理できました。おかげで、自信を持って担当者に伝えられました。',
  },
]

// 2026-07-19 森山さん指摘: sm:grid-cols-2 で3枚だと右下が1マス空く。
// 初期表示を4枚（2行×2列）にして空きマスをなくす。声の文言・順序は変更しない。
const INITIAL_COUNT = 4

export function Voices() {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? VOICES : VOICES.slice(0, INITIAL_COUNT)
  const rest = VOICES.length - INITIAL_COUNT

  return (
    <Section id="voices" className="bg-surface-150 border-t border-surface-200" spacing="md">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>お客様・営業の声</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-display-lg text-ink-900">
              使ってくださっている方の、<GradientText>声</GradientText>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            {/* 2026-07-19 森山さん指摘: 「まだ多くはありませんが」は売る場面での自己申告の弱点＝削除。 */}
            <p className="mt-5 text-base leading-relaxed text-ink-700 sm:mt-6">
              先に使ってくださっている方から、こんな声が届いています。
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2">
          {shown.map((v, i) => (
            <Reveal key={v.attr + i} delay={Math.min((i % INITIAL_COUNT) * 0.06, 0.18)}>
              <figure className="flex h-full flex-col rounded-xl border border-surface-200 bg-white p-6 transition-shadow duration-200 hover:shadow-soft sm:p-7">
                <VoiceLabel kind={v.kind} />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
                  {v.body}
                </blockquote>
                <figcaption className="mt-4 text-xs text-ink-500">— {v.attr}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {rest > 0 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-surface-200 bg-white px-5 py-2.5 text-sm font-bold text-ink-700 transition-colors hover:bg-surface-100"
            >
              {expanded ? '閉じる' : `もっと見る（あと${rest}件）`}
            </button>
          </div>
        )}
      </Container>
    </Section>
  )
}

/** 声の出どころ（営業／お客様）を示す小ラベル。営業=ブランド緑・お客様=ゴールド。 */
function VoiceLabel({ kind }: { kind: Voice['kind'] }) {
  if (kind === 'sales') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-md bg-primary-50 px-2.5 py-1 text-xs font-bold text-primary-700">
        <Briefcase className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
        営業の声
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-50 px-2.5 py-1 text-xs font-bold text-accent-700">
      <User className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden />
      お客様の声
    </span>
  )
}
