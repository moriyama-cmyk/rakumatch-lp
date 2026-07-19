import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { hl } from '../lib/headline'

/** PROBLEM と SOLUTION の間のブリッジ。「時代の転換」で訴求を価格軸から個人の武器軸へ寄せる。 */
export function EraShift() {
  return (
    <Section id="era-shift" className="bg-surface-50" spacing="sm">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <Badge>時代の転換</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-display-lg text-ink-900">
              {hl('大企業の武器だったAIが、')}
              <br className="hidden sm:block" />
              {hl('あなた一人の手に。')}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-700">
              これまで数十万円と法人契約が要ったAI営業が、個人1名から持てる時代になりました。楽マッチは、その最初の1本。これが、これからのスタンダードになります。
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
