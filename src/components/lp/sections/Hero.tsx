'use client'

import Image from 'next/image'
import { ArrowRight, ArrowUpRight, Bot, Database, Download, Smartphone } from 'lucide-react'
import { Container } from '../ui/Container'
import { GlowButton } from '../ui/GlowButton'
import { SITE } from '../site'
import { hl } from '../lib/headline'
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
    <section id="top" className="relative overflow-x-clip bg-fade-primary pb-16 pt-24 sm:pb-24 sm:pt-32">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center rounded-full border border-primary-200 bg-white px-3 py-1.5 text-sm font-bold tracking-wide text-primary-700 shadow-sm">
            不動産売買仲介の営業担当者へ
          </p>

          <h1 className="mt-5 font-bold leading-[1.18] tracking-[-0.035em] text-ink-900 [font-size:clamp(1.75rem,5.3vw,4.25rem)] sm:mt-6">
            {hl('月額3,000円/人', 'から。', '顧客管理も、', '「次に出す物件」も。')}
          </h1>

          <p className="mt-3 text-sm font-bold tracking-wide text-primary-800 sm:text-base">
            税込・スタンダードプラン ／ 1名から
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-[1.8] text-ink-700 sm:mt-6 sm:text-lg">
            顧客と物件の情報をつなげて、提案のきっかけを一つの画面へ。1名から始められる、不動産売買仲介の営業支援サービスです。
          </p>

          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-2 text-left sm:mt-8 sm:grid-cols-5 sm:gap-2.5" aria-label="楽マッチ AIの5つの機能">
            {FEATURES.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="flex min-h-11 items-center gap-2 rounded-xl border border-surface-200 bg-white px-3 py-2 shadow-sm last:col-span-2 last:justify-center sm:min-h-14 sm:last:col-auto sm:last:justify-start"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
                <span className="text-sm font-bold leading-snug text-ink-800">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row">
            <GlowButton
              id="hero-primary-cta"
              href={SITE.ctaTryUrl}
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => trackCta('demo', 'hero')}
            >
              {SITE.ctaPrimaryLabel}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </GlowButton>
            <div className="flex min-h-11 flex-wrap items-center justify-center gap-x-1 text-sm font-bold text-primary-700">
              <a
                href="#features"
                onClick={() => trackCta('anchor', 'hero_features')}
                className="inline-flex min-h-11 items-center justify-center rounded-lg px-3 underline decoration-primary-300 underline-offset-4 transition-colors hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                5つの機能
              </a>
              <span aria-hidden="true" className="text-surface-200">／</span>
              <a
                href="#pricing"
                onClick={() => trackCta('anchor', 'hero_pricing')}
                className="inline-flex min-h-11 items-center justify-center gap-1 rounded-lg px-3 underline decoration-primary-300 underline-offset-4 transition-colors hover:text-primary-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                料金・試し方
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <p className="mt-3 text-sm text-ink-600">登録なしデモは、ログイン不要・連絡先不要・クレカ不要</p>
        </div>

        <figure className="mx-auto mt-8 max-w-6xl sm:mt-14">
          <div className="overflow-hidden rounded-2xl border border-surface-200 bg-white p-1.5 shadow-[0_24px_70px_rgba(20,54,48,0.16)] sm:rounded-3xl sm:p-2">
            <Image
              src="/shot-top-hero.webp"
              alt="顧客情報、AIの提案、紹介候補の物件を表示した楽マッチ AIの製品画面"
              width={1920}
              height={1080}
              preload
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1280px) calc(100vw - 64px), 1152px"
              className="h-auto w-full rounded-[0.7rem] sm:rounded-[1.1rem]"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-ink-600">
            デモデータを表示した実際の製品画面
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}
