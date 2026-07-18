'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton'
import { SITE } from '../site'
import { cn } from '../lib/cn'
import { trackCta } from '@/lib/track'

/**
 * モバイル下部固定 CTA。ヒーローのCTAが画面外に出た後（少しスクロール後）に出現し、
 * 最終CTAセクション（#cta・自前の大きいCTAを持つ）に近づいたら非表示にする。
 * ライト・safe-area対応。
 */
export function StickyCta() {
  const [scrolled, setScrolled] = useState(false)
  const [nearFinalCta, setNearFinalCta] = useState(false)

  useEffect(() => {
    // IntersectionObserver は失敗時に「気づかず出っぱなし」になり得るため使わず、
    // 表示制御は Reveal.tsx と同じ考え方で scroll イベント駆動の getBoundingClientRect に統一する。
    const onScroll = () => {
      setScrolled(window.scrollY > 520)
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

  const show = scrolled && !nearFinalCta

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 lg:hidden',
        'border-t border-surface-200 bg-surface-50/95 backdrop-blur-xl',
        'px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]',
        'transition-transform duration-300',
        show ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.8rem] font-bold text-ink-900">
            月々<span className="text-accent-600">3,000円</span>（税込）/人〜
          </p>
          <p className="truncate text-[0.7rem] text-ink-500">ログイン不要・クレカ不要で、そのまま画面が触れます</p>
        </div>
        <GlowButton href={SITE.ctaTryUrl} size="md" className="shrink-0" onClick={() => trackCta('mobile_sticky')}>
          {SITE.ctaPrimaryLabel}
          <ArrowRight className="h-4 w-4" />
        </GlowButton>
      </div>
    </div>
  )
}
