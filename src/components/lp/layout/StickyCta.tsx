'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { GlowButton } from '../ui/GlowButton'
import { SITE } from '../site'
import { cn } from '../lib/cn'

/** モバイル下部固定 CTA。少しスクロールしてから出現。ライト・safe-area対応。 */
export function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        <GlowButton href={SITE.ctaTryUrl} size="md" className="shrink-0">
          {SITE.ctaPrimaryLabel}
          <ArrowRight className="h-4 w-4" />
        </GlowButton>
      </div>
    </div>
  )
}
