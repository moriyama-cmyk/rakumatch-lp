import Image from 'next/image'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { hl } from '../lib/headline'

/** 実名・写真・現役営業という一次情報を、料金判断より前に提示する。 */
export function Story() {
  return (
    <Section id="story" className="border-y border-surface-200 bg-surface-150" spacing="md">
      <Container>
        <Reveal>
          <div className="grid items-center gap-9 rounded-2xl border border-surface-200 bg-white p-6 shadow-soft sm:p-9 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 lg:p-12">
            <div className="mx-auto w-full max-w-[250px] text-center">
              <div className="relative mx-auto aspect-square w-44 overflow-hidden rounded-2xl bg-primary-50 ring-1 ring-ink-900/10 sm:w-52">
                <Image
                  src="/founder.webp"
                  alt="楽マッチ AI 開発者 森山 幸弘"
                  fill
                  sizes="(max-width: 1023px) 208px, 250px"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 text-lg font-bold text-ink-900">森山 幸弘</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">
                現役不動産営業
                <br />
                楽マッチ AI 開発者
              </p>
            </div>

            <div className="min-w-0">
              <Badge>開発者について</Badge>
              <h2 className="mt-4 text-display-lg text-ink-900">
                {hl('現役の不動産営業が、', '毎日使うために', '作っています。')}
              </h2>
              <div className="mt-6 border-l-2 border-primary-600 pl-5 sm:pl-7">
                <p className="text-base leading-relaxed text-ink-700 sm:text-lg">
                  東京で不動産売買をやっている、現役の営業マンです。
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-700 sm:text-lg">
                  「もっと楽に、もっとわかりやすく、誰がやってもできるツール」を追い求めて作りました。
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-700 sm:text-lg">
                  私はエンジニアではありません。難しい操作は、私が一番嫌いです。だからこのアプリの操作は“貼るだけ”にしました。
                </p>
              </div>
              <p className="mt-6 text-sm font-bold leading-relaxed text-primary-700">
                現場で使いながら、機能改善を続けています。
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
