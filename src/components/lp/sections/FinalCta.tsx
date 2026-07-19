'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { GlowButton } from '../ui/GlowButton'
import { Reveal } from '../ui/Reveal'
import { SITE } from '../site'
import { hl } from '../lib/headline'
import { trackCta } from '@/lib/track'

/** 最終 CTA（特大・全幅）。ページ唯一のダーク面（surface-900）で終着点を作る。 */
export function FinalCta() {
  return (
    <Section id="cta" className="bg-white border-t-2 border-primary-600/20" spacing="xl">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl bg-surface-900 px-6 py-12 text-center sm:px-12 sm:py-16">
            <div className="relative mx-auto max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-primary-200 bg-white px-4 py-1.5 text-xs font-bold text-primary-700">
                <Sparkles className="h-3.5 w-3.5" />
                登録なしで、今すぐ
              </span>

              <h2 className="mt-6 text-display-xl text-white">
                {hl('明日の営業から、')}
                <br />
                {hl(<span className="text-primary-300">変えられます。</span>)}
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                新人でも、初日からトップ営業マンの動き。まずは無料で、実際の画面を触って確かめてください。
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <GlowButton
                  href={SITE.ctaTryUrl}
                  size="lg"
                  className="w-full min-w-[240px] shadow-none ring-1 ring-white/25 text-lg sm:w-auto"
                  onClick={() => trackCta('final_cta')}
                >
                  {SITE.ctaPrimaryLabel}
                  <ArrowRight className="h-5 w-5" />
                </GlowButton>
                <GlowButton href={SITE.appUrl} variant="onDark" size="lg" className="w-full text-lg sm:w-auto">
                  ログイン
                </GlowButton>
              </div>
              <p className="mt-4 text-xs text-white/60">{SITE.microCopy}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
