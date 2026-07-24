import { ArrowRight } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { hl } from '../lib/headline'

/** PROBLEM と SOLUTION の間のブリッジ。「時代の転換」で訴求を価格軸から個人の武器軸へ寄せる。 */
export function EraShift() {
  return (
    <Section id="era-shift" className="bg-white" spacing="sm">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>時代の転換</Badge>
            <h2 className="mt-4 text-display-lg text-ink-900">
              {hl('大企業の武器だったAIが、')}
              <br className="hidden sm:block" />
              {hl('あなた一人の手に。')}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700 sm:mt-6">
              これまで数十万円と法人契約が要ったAI営業が、個人1名から持てる時代になりました。楽マッチは、その最初の1本。これが、これからのスタンダードになります。
            </p>
          </Reveal>
        </div>

        {/* ビフォーアフター2カラム。昔=沈んだグレー／今=緑で浮かせる。優越断定語は使わない。 */}
        <Reveal delay={0.12}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex-1 rounded-xl bg-surface-100 p-6 text-center opacity-[0.85]">
              {/* 沈んだ見えは opacity 側で担保しつつ、比較対象を読める文字サイズで明示する。
                  ※色は ink-600 を維持（親の opacity-[0.85] 合成で ink-500 は 3.76:1 となり 4.5:1 を割る）。 */}
              <p className="text-base font-bold tracking-wide text-ink-600">これまでのAI営業ツール</p>
              <ul className="mt-4 space-y-2 text-base font-medium text-ink-600">
                <li>初期費用 数十万円〜</li>
                <li>法人・店舗単位の契約</li>
                <li>個人には手が届かない</li>
              </ul>
            </div>

            <div className="flex items-center justify-center py-1 sm:py-0">
              <ArrowRight className="h-6 w-6 rotate-90 text-primary-400 sm:h-7 sm:w-7 sm:rotate-0" aria-hidden />
            </div>

            <div className="flex-1 rounded-xl border border-primary-600/40 bg-primary-50 p-6 text-center">
              <p className="text-xs font-bold tracking-wide text-accent-700">楽マッチ</p>
              <p className="mt-3">
                <span className="text-4xl font-bold text-primary-700 sm:text-5xl">月3,000円</span>
                <span className="ml-1 text-sm font-medium text-ink-500">/人</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm font-medium text-ink-900">
                <li>個人1名から契約OK</li>
                <li>導入0円・7日間無料</li>
              </ul>
            </div>
          </div>
        </Reveal>
        <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-relaxed text-ink-500">
          ※ 昔の価格帯は当社調べ（2026年6月時点・各社公開情報による）。単位・条件は各社により異なります。
        </p>
      </Container>
    </Section>
  )
}
