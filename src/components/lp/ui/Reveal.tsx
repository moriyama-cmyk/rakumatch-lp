'use client'

import { useEffect, useRef, useState, createElement, type ReactNode } from 'react'
import { cn } from '../lib/cn'

type RevealProps = {
  children: ReactNode
  className?: string
  /** 遅延（秒）。連続要素の軽いスタッガーに */
  delay?: number
  as?: 'div' | 'li' | 'span'
}

/**
 * スクロールで一度だけ静かに出現（opacity + translateY 10px / 0.5s）。
 *
 * 設計方針（重要）: コンテンツが「永久に不可視」になる事故を防ぐため、
 * - IntersectionObserver で可視化し、
 * - 監視が発火しない環境でも mount 後の failsafe タイマーで必ず可視化し、
 * - reduced-motion / 非対応環境では即可視化する。
 * framer-motion の whileInView は使わない（発火漏れで空白化するリスクを回避）。
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setShown(true)
      return
    }

    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    let done = false
    const reveal = () => {
      if (done) return
      done = true
      setShown(true)
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal()
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)

    // 既に画面内ならすぐ可視化（初期表示の取りこぼし防止）
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) reveal()

    // failsafe: 監視が発火しなくても必ず可視化（空白事故の根絶）
    const failsafe = window.setTimeout(reveal, 1500)

    return () => {
      io.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  return createElement(
    as,
    {
      ref,
      className: cn(
        'motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]',
        shown
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-[10px] motion-reduce:opacity-100 motion-reduce:translate-y-0',
        className,
      ),
      style: shown && delay ? { transitionDelay: `${delay}s` } : undefined,
    },
    children,
  )
}
