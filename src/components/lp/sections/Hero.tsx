'use client'

import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Bot, CreditCard, Database, Download, Smartphone } from 'lucide-react'
import { Container } from '../ui/Container'
import { GlowButton } from '../ui/GlowButton'
import { SITE } from '../site'
import { hl } from '../lib/headline'
import { protect } from '../lib/protect'
import { trackCta } from '@/lib/track'

const FEATURES = [
  { label: '顧客管理', icon: Database },
  { label: '物件一括取り込み', icon: Download },
  { label: '双方向マッチング', icon: ArrowUpRight },
  { label: '専属AI', icon: Bot },
  { label: 'お客様アプリ', icon: Smartphone },
] as const

/**
 * ファーストビュー。
 *
 * 実製品のスクリーンショットを主役にして、価格・対象者・できること・匿名デモを
 * 最初の視線移動だけで把握できる構成にする。クリック計測があるため Client Component。
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="relative overflow-x-clip bg-fade-primary pb-16 pt-24 sm:pb-24 sm:pt-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center rounded-full border border-primary-200 bg-white px-3 py-1.5 text-sm font-bold tracking-wide text-primary-700 shadow-sm">
            不動産売買仲介の営業担当者へ
          </p>

          <h1 id="hero-heading" className="mt-5 font-bold leading-[1.18] tracking-[-0.035em] text-ink-900 [font-size:clamp(1.75rem,5.3vw,4.25rem)] sm:mt-6">
            {hl('月額3,000円/人', 'から。', '顧客管理も、', '「次に出す物件」も。')}
          </h1>

          <p className="mt-3 text-sm font-bold tracking-wide text-primary-800 sm:text-base">
            税込・スタンダードプラン ／ 1名から
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.8] text-ink-700 sm:mt-6 sm:text-lg">
            顧客と物件の情報をつなげて、提案のきっかけを一つの画面へ。1名から始められる、不動産売買仲介の営業支援サービスです。
          </p>
        </div>

        <figure className="mx-auto mt-7 max-w-6xl sm:mt-10">
          <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-surface-200 bg-white p-1.5 shadow-[0_24px_70px_rgba(20,54,48,0.16)] sm:rounded-3xl sm:p-2 md:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[0.7rem] sm:rounded-[1.1rem] md:aspect-video">
              <Image
                src="/shot-top-hero.webp"
                alt="顧客情報をもとにAIの提案を表示する楽マッチ AIの製品画面"
                fill
                preload
                sizes="(max-width: 767px) 896px, 1152px"
                className="object-cover object-center md:object-contain"
              />
            </div>
          </div>
          <figcaption className="mt-3 text-center text-sm text-ink-600">
            デモデータを表示した実際の製品画面（幅に合わせて一部を拡大表示）
          </figcaption>
        </figure>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-2 text-left sm:mt-8 sm:grid-cols-6 sm:gap-2.5 lg:grid-cols-5" aria-label="楽マッチ AIの5つの機能">
            {FEATURES.map(({ label, icon: Icon }, index) => (
              <div
                key={label}
                className={`flex min-h-11 items-center gap-1.5 rounded-xl border border-surface-200 bg-white px-2.5 py-2 shadow-sm last:col-span-2 last:justify-center sm:col-span-2 sm:min-h-14 sm:gap-2 sm:px-3 sm:last:col-span-2 sm:last:justify-start lg:col-span-1 lg:last:col-span-1 ${index === 3 ? 'sm:col-start-2 lg:col-start-auto' : ''}`}
              >
                <Icon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
                <span className="text-sm font-bold leading-snug text-ink-800">{protect(label)}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row">
            <GlowButton
              id="hero-primary-cta"
              href={SITE.ctaTryUrl}
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => trackCta('demo', 'hero', SITE.ctaTryUrl)}
            >
              {SITE.ctaPrimaryLabel}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </GlowButton>
            <GlowButton
              href={SITE.ctaTrialUrl}
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => trackCta('trial', 'hero_trial', SITE.ctaTrialUrl)}
            >
              <CreditCard className="h-5 w-5" aria-hidden="true" />
              {SITE.ctaTrialLabel}
            </GlowButton>
          </div>

          <div className="mt-3 flex flex-col items-center justify-center gap-1 text-sm leading-relaxed text-ink-600">
            <p>登録なしデモ：ログイン・連絡先・カード不要</p>
            <p>7日間トライアル：カード登録あり・7日以内の解約は料金なし・8日目から課金</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
