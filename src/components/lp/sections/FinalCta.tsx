'use client'

import { ArrowRight, Sparkles } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { GlowButton } from '../ui/GlowButton'
import { Badge } from '../ui/Badge'
import { Reveal } from '../ui/Reveal'
import { SITE } from '../site'
import { hl } from '../lib/headline'
import { trackCta } from '@/lib/track'

/** 最終 CTA（特大・全幅）。ページ唯一のダーク面（surface-900）で終着点を作る。
 * 2026-07-19 森山さん指摘「黒くしただけ？」への対応:
 * ①暗色面に質感（放射グラデ＋極薄グリッド＋主CTA背後のグロー）を追加
 * ②縦のリズムを詰めて塊として締める ③主CTAにグロー影で存在感を持たせ、
 * 「ログイン」は控えめなテキストリンク寄りにして視線が主CTAに集まるようにする。
 * 文言・主CTAの色（primary-600）は変更しない。 */
export function FinalCta() {
  return (
    <Section id="cta" className="bg-white border-t-2 border-primary-600/20" spacing="xl">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl bg-surface-900 px-6 py-14 text-center ring-1 ring-white/5 sm:px-14 sm:py-20">
            {/* 装飾のみ（操作・テキストなし）。暗色面の質感づけ。 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_-8%,rgba(13,124,102,0.35),transparent_65%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:28px_28px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[58%] h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/25 blur-[90px]"
            />

            <div className="relative mx-auto max-w-2xl">
              <Badge variant="onDark" icon={<Sparkles className="h-3.5 w-3.5" />}>
                登録なしで、今すぐ
              </Badge>

              <h2 className="mt-5 text-display-xl text-white">
                {hl('明日の営業から、')}
                <br />
                {hl(<span className="text-primary-300">変えられます。</span>)}
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                新人でも、初日からトップ営業マンの動き。まずは無料で、実際の画面を触って確かめてください。
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <GlowButton
                  href={SITE.ctaTryUrl}
                  size="lg"
                  className="w-full min-w-[260px] !shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_22px_55px_-14px_rgba(13,124,102,0.75)] ring-1 ring-white/10 text-lg sm:w-auto"
                  onClick={() => trackCta('final_cta', SITE.ctaTryUrl)}
                >
                  {SITE.ctaPrimaryLabel}
                  <ArrowRight className="h-5 w-5" />
                </GlowButton>
                <GlowButton
                  href={SITE.appUrl}
                  variant="onDark"
                  size="sm"
                  className="!border-transparent !text-white/55 underline underline-offset-4 hover:!text-white"
                >
                  ログイン
                </GlowButton>
              </div>
              <p className="mt-3 text-xs text-white/60">{SITE.microCopy}</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
