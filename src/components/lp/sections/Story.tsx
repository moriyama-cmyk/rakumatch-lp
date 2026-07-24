import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { hl } from '../lib/headline'

/**
 * WHY TRUST US（開発者の声・ストーリー）。WHY比較表の後・セキュリティ節の前に配置。
 * 文言は本番現行LPのまま（オーナー指定・盛らない/削らない）。
 * スタイルは新トークン（白カード・左ボーダー引用・発光なし）。
 */
export function Story() {
  return (
    <Section id="story" className="bg-white" spacing="md">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>WHY TRUST US</Badge>
            <h2 className="mt-4 text-display-lg text-ink-900">
              {hl('現役の', '不動産営業マンが、')}
              <br className="hidden sm:block" />
              {hl('自分のために', '作りました。')}
            </h2>
          </Reveal>
        </div>

        {/* 2026-07-24 Phase5（森山さん指摘「もっとクオリティ高くしたい」対応・文言は一切変えない）:
            ①写真を拡大（誰が作ったかを最初に大きく見せる）
            ②末尾の孤立カードにあった核の一文「私はエンジニアではありません…」を、
            　名前直後の大型プルクオートへ昇格（雑誌の人物記事の文法）。カードは統合し1枚に。 */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-surface-200 bg-white p-8 sm:p-12">
            <div className="flex flex-col items-center text-center">
              <span className="relative block h-40 w-40 overflow-hidden rounded-full bg-primary-50 shadow-soft-md ring-1 ring-ink-900/8 sm:h-52 sm:w-52">
                <picture>
                  <source srcSet="/founder.webp" type="image/webp" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/founder.png"
                    alt="楽マッチ AI 開発者 森山 幸弘"
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </picture>
              </span>
              <p className="mt-5 text-lg font-bold text-ink-900">森山 幸弘</p>
              <p className="mt-1 text-sm text-ink-500">現役不動産営業 ／ 楽マッチ AI 開発者</p>
            </div>

            {/* プルクオート（核の一文）。装飾の鉤括弧はaria-hiddenの飾り。 */}
            <blockquote className="relative mx-auto mt-8 max-w-2xl text-center">
              <span aria-hidden className="absolute -left-1 -top-4 text-5xl font-bold leading-none text-primary-200 sm:-left-6">“</span>
              <p className="text-lg font-bold leading-relaxed text-ink-900 sm:text-xl">
                私はエンジニアではありません。難しい操作は、私が一番嫌いです。だからこのアプリの操作は“貼るだけ”にしました。
              </p>
              <span aria-hidden className="absolute -bottom-6 -right-1 text-5xl font-bold leading-none text-primary-200 sm:-right-6">”</span>
            </blockquote>

            <div className="mx-auto mt-10 max-w-2xl border-l-2 border-primary-600 pl-5 text-left">
              <p className="text-base leading-relaxed text-ink-700">
                東京で不動産売買をやっている、現役の営業マンです。
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-700">
                「もっと楽に、もっとわかりやすく、誰がやってもできるツール」を追い求めて作りました。
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-700">
                説明は不要です。使えば直感的にわかります。必要最低限を、ぎゅっと詰め込みました。
              </p>
              <p className="mt-4 text-base font-bold leading-relaxed text-primary-700">
                AIが進化するたびに、このアプリも進化します。あなたの営業トークも、提案も、一緒に進化し続けます。
              </p>
            </div>
          </div>
        </Reveal>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-ink-500">
          これは投資家やエンジニアが机上で作ったツールではありません。現場の不便を1つずつ潰して作った、現場のための道具です。
        </p>
      </Container>
    </Section>
  )
}
