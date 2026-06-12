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
    <Section id="story" className="bg-surface-50" spacing="lg">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>WHY TRUST US</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-display-lg text-ink-900">
              {hl('現役の', '不動産営業マンが、')}
              <br className="hidden sm:block" />
              {hl('自分のために', '作りました。')}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-surface-200 bg-white p-8 shadow-soft sm:p-10">
            {/* 開発者の顔（主役・大きめ中央）。「誰が作ったか」を最初に見せる。 */}
            <div className="flex flex-col items-center text-center">
              <span className="relative block h-32 w-32 overflow-hidden rounded-full bg-primary-50 shadow-soft-md ring-1 ring-black/5 sm:h-44 sm:w-44">
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

            <div className="mt-8 border-l-4 border-primary-400 pl-6">
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

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-ink-500">
            これは投資家やエンジニアが机上で作ったツールではありません。現場の不便を1つずつ潰して作った、現場のための道具です。
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
