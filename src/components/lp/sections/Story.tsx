import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'

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
              現役の不動産営業マンが、
              <br className="hidden sm:block" />
              自分のために作りました。
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-surface-200 bg-white p-8 shadow-soft sm:p-10">
            <div className="border-l-4 border-primary-400 pl-6">
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
