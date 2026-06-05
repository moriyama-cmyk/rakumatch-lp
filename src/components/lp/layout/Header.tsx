'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { GlowButton } from '../ui/GlowButton'
import { NAV, SITE } from '../site'
import { cn } from '../lib/cn'

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
          ? 'border-b border-surface-200 bg-surface-50/85 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
        <a href="#top" aria-label={`${SITE.brand} トップ`} className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="主要ナビゲーション">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-700 transition-colors hover:text-primary-700"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <GlowButton href={SITE.appUrl} variant="ghost" size="sm" className="hidden sm:inline-flex">
            ログイン
          </GlowButton>
          <GlowButton href={SITE.ctaTryUrl} size="sm">
            {SITE.ctaPrimaryLabel}
            <ArrowRight className="h-4 w-4" />
          </GlowButton>
        </div>
      </Container>
    </header>
  )
}
