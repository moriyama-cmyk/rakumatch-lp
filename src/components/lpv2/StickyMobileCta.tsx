'use client'

// モバイル下部固定CTA（PORT_SPEC構成 #14）。
// 表示/非表示のロジックは既存 src/components/lp/layout/StickyCta.tsx と同じ考え方
// （IntersectionObserverではなくscrollイベント駆動のgetBoundingClientRectで判定し、
// 「気づかず出っぱなし」を防ぐ）。見た目だけAB案のダーク配色に差し替えている。
import { useEffect, useState } from 'react'
import { trackCta } from '@/lib/track'

const APP_TRY_URL = 'https://app.rakumatch-ai.com/try'

export function StickyMobileCta() {
  const [scrolled, setScrolled] = useState(false)
  const [nearFinalCta, setNearFinalCta] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 520)
      const target = document.getElementById('cta')
      if (target) {
        const rect = target.getBoundingClientRect()
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
    <div className="sticky-cta" data-hidden={!show}>
      <div className="sticky-cta__text">
        <p className="sticky-cta__price">
          月々<span className="num">3,000円</span>（税込）/人〜
        </p>
        <p className="sticky-cta__note">ログイン不要・クレカ不要で、そのまま画面が触れます</p>
      </div>
      <a className="btn btn-primary" href={APP_TRY_URL} onClick={() => trackCta('sticky_mobile')}>
        無料で試す <span className="arrow" aria-hidden="true">→</span>
      </a>
    </div>
  )
}
