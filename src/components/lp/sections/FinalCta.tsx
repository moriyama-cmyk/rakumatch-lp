import { ArrowRight, Sparkles } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { GlowButton } from '../ui/GlowButton'
import { GradientText } from '../ui/GradientText'
import { Reveal } from '../ui/Reveal'
import { SITE } from '../site'
import { hl } from '../lib/headline'

/** 最終 CTA（特大・全幅）。柔らかい primary-50 パネル（発光・ダークなし）。 */
export function FinalCta() {
  return (
    <Section id="cta" className="bg-white" spacing="lg">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary-100 bg-fade-primary px-6 py-16 text-center shadow-soft sm:px-12 sm:py-24">
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-white px-4 py-1.5 text-xs font-bold text-primary-700">
                <Sparkles className="h-3.5 w-3.5" />
                登録なしで、今すぐ
              </span>

              <h2 className="mt-6 text-display-xl text-ink-900">
                {hl('今いる顧客から、')}
                <br />
                {hl(<GradientText>次の一手が見える。</GradientText>)}
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-ink-700 sm:text-lg">
                不動産売買のためのAI営業相棒、楽マッチ AI。まずは無料で、中を触ってみてください。
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <GlowButton href={SITE.ctaTryUrl} size="lg" className="w-full sm:w-auto">
                  {SITE.ctaPrimaryLabel}
                  <ArrowRight className="h-5 w-5" />
                </GlowButton>
                <GlowButton href={SITE.appUrl} variant="secondary" size="lg" className="w-full sm:w-auto">
                  ログイン
                </GlowButton>
              </div>
              <p className="mt-4 text-xs text-ink-500">{SITE.microCopy}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
