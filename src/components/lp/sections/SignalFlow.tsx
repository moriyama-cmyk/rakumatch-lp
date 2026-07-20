'use client'

import Image from 'next/image'
import { ArrowDown, ArrowRight, BellRing, BookmarkCheck, Send, Smartphone } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { hl } from '../lib/headline'
import { GlowButton } from '../ui/GlowButton'
import { SITE } from '../site'
import { trackCta } from '@/lib/track'

const STEPS = [
  {
    icon: BookmarkCheck,
    label: 'お客様',
    title: '見つけた物件を保存',
    body: '気になる物件を、いつもの検索中に保存。',
  },
  {
    icon: BellRing,
    label: '楽マッチ AI',
    title: '反応が担当者に届く',
    body: '保存・星評価・メモ・内見希望を確認できます。',
  },
  {
    icon: Send,
    label: '担当者',
    title: '希望を見て先に提案',
    body: '会話の前に、次の提案を考えられます。',
  },
]

/** お客様の行動が担当者へ届く流れを、実画面とともに示す。 */
export function SignalFlow() {
  return (
    <Section id="customer-app" labelledBy="customer-app-heading" className="bg-surface-100" spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Badge icon={<Smartphone className="h-3.5 w-3.5" aria-hidden />}>お客様アプリ</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="customer-app-heading" className="mt-4 text-display-lg text-ink-900">
              {hl('お客様が見つけた', '「気になる」が、', '担当者に届く。')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.85] text-ink-700 sm:text-lg">
              物件を探すお客様の行動が、営業の次の会話につながります。
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid items-center gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <Reveal className="min-w-0">
            <ol className="grid min-w-0 gap-3 md:grid-cols-3 md:items-stretch md:gap-10">
              {STEPS.map((step, index) => {
                const Icon = step.icon
                return (
                  <li key={step.title} className="relative min-w-0">
                    <div className="min-w-0 rounded-2xl border border-surface-200 bg-white p-5 shadow-soft sm:p-6">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                      </span>
                      <p className="mt-4 text-xs font-bold tracking-[0.14em] text-primary-700">{step.label}</p>
                      <h3 className="mt-2 text-base font-bold leading-snug text-ink-900 sm:text-lg">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-700">{step.body}</p>
                    </div>
                    {index < STEPS.length - 1 ? (
                      <div className="flex h-7 items-center justify-center text-primary-500 md:absolute md:-right-8 md:top-1/2 md:h-auto md:-translate-y-1/2" aria-hidden="true">
                        <ArrowDown className="h-5 w-5 md:rotate-[-90deg]" />
                      </div>
                    ) : null}
                  </li>
                )
              })}
            </ol>
            <p className="mt-5 rounded-xl border border-primary-100 bg-primary-50/70 px-4 py-3 text-sm leading-relaxed text-primary-800">
              お客様は担当者から届くリンクで使えます。インストールもログインも不要です。
            </p>
            <GlowButton
              href={SITE.ctaTryUrl}
              className="mt-5 w-full sm:w-auto"
              onClick={() => trackCta('demo', 'customer_app_demo', SITE.ctaTryUrl)}
            >
              {SITE.ctaPrimaryLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </GlowButton>
          </Reveal>

          <Reveal delay={0.12} className="min-w-0">
            <figure className="mx-auto max-w-[300px] rounded-[2rem] border-[7px] border-ink-900 bg-ink-900 p-1.5 shadow-soft-md">
              <Image
                src="/shot-customer-app-list.webp"
                alt="お客様が保存した物件の一覧画面"
                width={868}
                height={1887}
                sizes="(max-width: 1023px) 280px, 300px"
                className="h-auto w-full rounded-[1.55rem]"
              />
              <figcaption className="px-2 pb-1.5 pt-3 text-center text-xs leading-relaxed text-white/75">
                実画面（デモデータ）
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
