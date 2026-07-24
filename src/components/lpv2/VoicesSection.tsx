'use client'

// 導入者の声。AB案の「声は、確認が取れてから載せます。」プレースホルダーを、
// 現行本番LP（src/components/lp/sections/Voices.tsx）の実際の声8件に文言そのまま
// 差し替える（PORT_SPEC「口コミは現行LPから引用」指定）。見た目のみAB朝パートに合わせて再スタイル。
import { useState } from 'react'

type Voice = {
  kind: 'sales' | 'customer'
  attr: string
  body: string
}

// 文言・順序は src/components/lp/sections/Voices.tsx と完全に同一（一字一句変更なし）。
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

const INITIAL_COUNT = 4

export function VoicesSection() {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? VOICES : VOICES.slice(0, INITIAL_COUNT)
  const rest = VOICES.length - INITIAL_COUNT

  return (
    <section className="sec day section-pad" id="voices">
      <div className="wrap center">
        <div className="section-head mx-auto" style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            導入者の声
          </p>
          <h2>使ってくださっている方の、声</h2>
        </div>

        <div className="voice-grid">
          {shown.map((v, i) => (
            <figure className="voice-card" key={v.attr + i}>
              <span className={`voice-card__label voice-card__label--${v.kind}`}>
                {v.kind === 'sales' ? '営業の声' : 'お客様の声'}
              </span>
              <blockquote>{v.body}</blockquote>
              <figcaption>— {v.attr}</figcaption>
            </figure>
          ))}
        </div>

        {rest > 0 && (
          <p style={{ marginTop: '2rem' }}>
            <button
              type="button"
              className="voice-more-btn"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? '閉じる' : `もっと見る（あと${rest}件）`}
            </button>
          </p>
        )}

        <p className="voice-note">
          掲載している声は、実際にご利用いただいている方から伺ったものです。個人が特定されないよう属性は粗く匿名化しています。捏造した声や口コミは一切掲載していません。
        </p>
      </div>
    </section>
  )
}
