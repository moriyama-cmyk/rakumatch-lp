'use client'

import { ArrowRight, CreditCard, MonitorPlay } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { GlowButton } from '../ui/GlowButton'
import { Reveal } from '../ui/Reveal'
import { SITE } from '../site'
import { hl } from '../lib/headline'
import { trackCta } from '@/lib/track'

/** LPを読み終えた人に、匿名デモとトライアルの選択肢を明確に示す終点。 */
export function FinalCta() {
  return (
    <Section id="cta" className="border-t-2 border-primary-600/20 bg-white" spacing="xl">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl bg-surface-900 px-5 py-12 text-center ring-1 ring-white/5 sm:px-14 sm:py-20">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_-8%,rgba(13,124,102,0.35),transparent_65%)]" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:28px_28px]" />
            <div className="relative mx-auto max-w-2xl">
              <p className="text-sm font-bold tracking-wide text-primary-200">楽マッチ AI を試す</p>
              <h2 className="mt-4 text-display-xl text-white">{hl('まずは、', '画面で', '確かめて', 'ください。')}</h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                匿名で画面を試すか、カード登録後に7日間トライアルを始めるか。ご都合に合う方法を選べます。
              </p>

              <div className="mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-2">
                <GlowButton
                  href={SITE.ctaTryUrl}
                  size="lg"
                  className="!h-auto min-h-14 w-full flex-col !items-start px-5 py-3 text-left sm:px-6"
                  onClick={() => trackCta('demo', 'final_demo')}
                >
                  <span className="flex items-center gap-2"><MonitorPlay className="h-4 w-4" />{SITE.ctaPrimaryLabel}<ArrowRight className="h-4 w-4" /></span>
                  <span className="text-xs font-medium text-white/75">登録なし・カード不要</span>
                </GlowButton>
                <GlowButton
                  href={SITE.ctaTrialUrl}
                  variant="onDark"
                  size="lg"
                  className="!h-auto min-h-14 w-full flex-col !items-start px-5 py-3 text-left sm:px-6"
                  onClick={() => trackCta('trial', 'final_trial')}
                >
                  <span className="flex items-center gap-2"><CreditCard className="h-4 w-4" />{SITE.ctaTrialLabel}<ArrowRight className="h-4 w-4" /></span>
                  <span className="text-xs font-medium text-white/75">カード登録あり・7日間</span>
                </GlowButton>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/60">トライアルは7日以内に解約すれば料金はかかりません。最低利用期間・違約金はありません。</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
