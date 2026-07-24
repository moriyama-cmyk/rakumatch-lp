'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { GlowButton } from '../ui/GlowButton'
import { NAV, SITE } from '../site'
import { cn } from '../lib/cn'
import { trackCta } from '@/lib/track'

/** スクロールで白＋影が乗る固定ヘッダー。デスクトップはナビ表示。ライト。
 *  solid: 常に白背景（LP v2 のように暗い背景の上でも最上部から明るく見せる用途）。 */
export function Header({ solid = false }: { solid?: boolean } = {}) {
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
        solid || scrolled
          ? 'border-b border-surface-200 bg-white/85 backdrop-blur-xl'
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
          {/*
            ログインは sm 以上のみ表示。スマホのヘッダーは主要CTA 1 つに集約し、
            「ログイン」と「無料で試す」が詰まって 2 行に折り返す不具合を根治する。
            ※ GlowButton の base が inline-flex のため className に hidden を足しても
            　 CSS の出力順で打ち消されない。確実に隠すため、表示ユーティリティだけを持つ
            　 div でラップする。スマホのログインはフッターの導線から。
          */}
          <div className="hidden sm:block">
            <GlowButton href={`${SITE.appUrl}/login`} variant="ghost" size="sm">
              ログイン
            </GlowButton>
          </div>
          <GlowButton href={SITE.ctaTryUrl} size="sm" onClick={() => trackCta('header')}>
            {SITE.ctaPrimaryLabel}
            <ArrowRight className="h-4 w-4" />
          </GlowButton>
        </div>
      </Container>
    </header>
  )
}
