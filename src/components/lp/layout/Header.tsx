'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { GlowButton } from '../ui/GlowButton'
import { NAV, SITE } from '../site'
import { cn } from '../lib/cn'
import { trackCta } from '@/lib/track'

/** スクロールで白＋影が乗る固定ヘッダー。デスクトップはナビ表示。ライト。 */
export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-surface-200 bg-white/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-3 sm:h-18">
        <a
          href="#top"
          aria-label={`${SITE.brand} トップ`}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
        >
          <span className="sm:hidden"><Logo withWordmark={false} /></span>
          <span className="hidden sm:inline-flex"><Logo /></span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="主要ナビゲーション">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-1 py-3 text-sm font-medium text-ink-700 transition-colors hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <nav className="hidden items-center gap-1 md:flex lg:hidden" aria-label="タブレット向けナビゲーション">
            <a
              href="#pricing"
              onClick={() => trackCta('anchor', 'header_pricing')}
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-bold text-ink-700 transition-colors hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              料金
            </a>
            <a
              href="#faq"
              onClick={() => trackCta('anchor', 'header_faq')}
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-bold text-ink-700 transition-colors hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              FAQ
            </a>
          </nav>
          {/*
            ログインは sm 以上のみ表示。スマホのヘッダーは主要CTA 1 つに集約し、
            「ログイン」と「無料で試す」が詰まって 2 行に折り返す不具合を根治する。
            ※ GlowButton の base が inline-flex のため className に hidden を足しても
            　 CSS の出力順で打ち消されない。確実に隠すため、表示ユーティリティだけを持つ
            　 div でラップする。スマホのログインはフッターの導線から。
          */}
          <div className="hidden lg:block">
            <GlowButton href={`${SITE.appUrl}/login`} variant="ghost" size="sm">
              ログイン
            </GlowButton>
          </div>
          <GlowButton
            href={SITE.ctaTryUrl}
            size="sm"
            className="px-3 text-xs sm:px-5 sm:text-sm"
            onClick={() => trackCta('demo', 'header', SITE.ctaTryUrl)}
          >
            {SITE.ctaPrimaryLabel}
            <ArrowRight className="hidden h-4 w-4 sm:block" aria-hidden />
          </GlowButton>
        </div>
      </Container>
    </header>
  )
}
