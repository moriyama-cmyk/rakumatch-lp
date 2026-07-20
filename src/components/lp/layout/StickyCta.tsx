'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton'
import { SITE } from '../site'
import { trackCta } from '@/lib/track'

/**
 * モバイル下部固定 CTA。ヒーローのCTAが画面外に出た後（少しスクロール後）に出現し、
 * 最終CTAセクション（#cta・自前の大きいCTAを持つ）に近づいたら非表示にする。
 * ライト・safe-area対応。
 */
export function StickyCta() {
  const [pastHero, setPastHero] = useState(false)
  const [nearFinalCta, setNearFinalCta] = useState(false)

  useEffect(() => {
    // Hero全体（実画面と2つの開始方法を含む）を読み終えてから表示する。
    // CTA片方だけを基準にすると、もう片方が画面内にある間に固定CTAが重なるため。
    const onScroll = () => {
      const hero = document.getElementById('top')
      setPastHero(hero ? hero.getBoundingClientRect().bottom < 0 : false)
      const target = document.getElementById('cta')
      if (target) {
        const rect = target.getBoundingClientRect()
        // 最終CTAセクションが画面の85%ラインより上に入ってきたら、自前の大きいCTAと
        // 重ならないよう固定バーを隠す。
        setNearFinalCta(rect.top < window.innerHeight * 0.85 && rect.bottom > 0)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const show = pastHero && !nearFinalCta

  // 非表示中のリンクをTabキーや読み上げの移動先に残さない。
  if (!show) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-surface-200 bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
      <div className="flex items-center gap-3">
        <a
          href="#pricing"
          onClick={() => trackCta('anchor', 'mobile_sticky_pricing', '#pricing')}
          className="min-w-0 flex-1 rounded-lg py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          aria-label="料金と試し方を見る"
        >
          <p className="truncate text-sm font-bold text-ink-900">
            月々<span className="text-accent-700">3,000円</span>（税込）/人〜
          </p>
          <p className="truncate text-xs text-ink-500">登録・連絡先・カード不要</p>
        </a>
        <GlowButton
          href={SITE.ctaTryUrl}
          size="md"
          className="shrink-0 px-4 text-xs sm:text-sm"
          onClick={() => trackCta('demo', 'mobile_sticky', SITE.ctaTryUrl)}
        >
          {SITE.ctaPrimaryLabel}
          <ArrowRight className="hidden h-4 w-4 sm:block" aria-hidden />
        </GlowButton>
      </div>
    </div>
  )
}
