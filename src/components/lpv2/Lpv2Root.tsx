'use client'

// LP v2（AB案）のトップレベル orchestrator。
// _lp_v2_design/direction-ab.html 末尾の3本の <script> のうち、
// ①夜→朝のアンビエント背景の色遷移（スクロール連動） と
// ②夜セクションの reveal（IntersectionObserver によるフェードイン）
// の2つをここに移植する（③ core loop と ④ parse-demo は
// CoreLoopSection.tsx / ParseDemo.tsx にそれぞれ分離）。
//
// スコープ設計: 元の <html> 要素に付与していた `reduced` クラスや
// カスタムプロパティは、このラッパー div（.lpv2）に付与する。
// CSS変数はDOM継承で子孫に伝わるため、position:fixedのambientにも
// position:stickyのheaderにも同じ値が届く（PORT_SPECの `.lpv2` スコープ方針）。
import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '../lp/lib/cn'

type Lpv2RootProps = {
  header: ReactNode
  story: ReactNode
  day: ReactNode
  footer: ReactNode
  stickyCta: ReactNode
}

type Stop3 = { t: number; c: [number, number, number] }
type StopV = { t: number; v: number }

const BG_STOPS: Stop3[] = [
  { t: 0.0, c: [10, 14, 24] },
  { t: 0.42, c: [16, 19, 31] },
  { t: 0.6, c: [34, 28, 46] },
  { t: 0.75, c: [100, 68, 80] },
  { t: 0.88, c: [210, 180, 163] },
  { t: 1.0, c: [251, 250, 247] },
]
const GLOW_STOPS: StopV[] = [
  { t: 0.0, v: 0.5 },
  { t: 0.42, v: 0.5 },
  { t: 0.6, v: 0.36 },
  { t: 0.75, v: 0.15 },
  { t: 0.88, v: 0.04 },
  { t: 1.0, v: 0.0 },
]
const STAR_STOPS: StopV[] = [
  { t: 0.0, v: 0.5 },
  { t: 0.46, v: 0.5 },
  { t: 0.68, v: 0.1 },
  { t: 0.85, v: 0.0 },
  { t: 1.0, v: 0.0 },
]
const LIGHT_FG: [number, number, number] = [244, 238, 226]
const DARK_FG: [number, number, number] = [30, 34, 42]

function lerp(a: number, b: number, f: number) {
  return a + (b - a) * f
}

function sampleColorStops(stops: Stop3[], t: number): [number, number, number] {
  if (t <= stops[0].t) return stops[0].c
  for (let i = 0; i < stops.length - 1; i++) {
    const s0 = stops[i]
    const s1 = stops[i + 1]
    if (t >= s0.t && t <= s1.t) {
      const f = (t - s0.t) / (s1.t - s0.t || 1)
      return [lerp(s0.c[0], s1.c[0], f), lerp(s0.c[1], s1.c[1], f), lerp(s0.c[2], s1.c[2], f)]
    }
  }
  return stops[stops.length - 1].c
}

function sampleValueStops(stops: StopV[], t: number): number {
  if (t <= stops[0].t) return stops[0].v
  for (let i = 0; i < stops.length - 1; i++) {
    const s0 = stops[i]
    const s1 = stops[i + 1]
    if (t >= s0.t && t <= s1.t) {
      const f = (t - s0.t) / (s1.t - s0.t || 1)
      return lerp(s0.v, s1.v, f)
    }
  }
  return stops[stops.length - 1].v
}

function luminance(c: [number, number, number]) {
  return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255
}

export function Lpv2Root({ header, story, day, footer, stickyCta }: Lpv2RootProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)

  // 1) prefers-reduced-motion の判定 → ラッパーに .lpv2-reduced を付与。
  //    2) アンビエント背景のスクロール連動色遷移（reduced時はCSS側で.ambientごと非表示）。
  //    3) 夜セクションの .lpv2-reveal 要素を IntersectionObserver でフェードイン。
  useEffect(() => {
    const root = rootRef.current
    const story = storyRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      root.classList.add('lpv2-reduced')
    }

    let cleanupScroll: (() => void) | undefined
    if (!reduceMotion && story) {
      let ticking = false
      const update = () => {
        ticking = false
        const rect = story.getBoundingClientRect()
        const vh = window.innerHeight || document.documentElement.clientHeight
        const total = rect.height + vh
        const traveled = vh - rect.top
        const t = Math.max(0, Math.min(1, traveled / (total || 1)))

        const bg = sampleColorStops(BG_STOPS, t)
        const glow = sampleValueStops(GLOW_STOPS, t)
        const stars = sampleValueStops(STAR_STOPS, t)
        const lum = luminance(bg)
        const fBlend = Math.max(0, Math.min(1, (lum - 0.48) / (0.66 - 0.48)))
        const fg: [number, number, number] = [
          lerp(LIGHT_FG[0], DARK_FG[0], fBlend),
          lerp(LIGHT_FG[1], DARK_FG[1], fBlend),
          lerp(LIGHT_FG[2], DARK_FG[2], fBlend),
        ]

        const r = Math.round(bg[0])
        const g = Math.round(bg[1])
        const b = Math.round(bg[2])
        root.style.setProperty('--phase-bg', `rgb(${r},${g},${b})`)
        root.style.setProperty('--phase-bg-rgb', `${r},${g},${b}`)
        root.style.setProperty(
          '--phase-fg',
          `rgb(${Math.round(fg[0])},${Math.round(fg[1])},${Math.round(fg[2])})`,
        )
        root.style.setProperty('--glow-color', `rgba(224,164,92,${glow.toFixed(3)})`)
        root.style.setProperty('--stars-opacity', stars.toFixed(3))
      }
      const onScroll = () => {
        if (!ticking) {
          ticking = true
          requestAnimationFrame(update)
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      update()
      cleanupScroll = () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
      }
    }

    const reveals = Array.from(root.querySelectorAll<HTMLElement>('.lpv2-reveal'))
    let io: IntersectionObserver | undefined
    if (!reduceMotion && 'IntersectionObserver' in window && reveals.length) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('lpv2-in-view')
              io?.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.15 },
      )
      reveals.forEach((el) => io?.observe(el))
    } else {
      reveals.forEach((el) => el.classList.add('lpv2-in-view'))
    }

    return () => {
      cleanupScroll?.()
      io?.disconnect()
    }
  }, [])

  return (
    <div ref={rootRef} className="lpv2">
      <a className="skip-link" href="#lpv2-main">
        本文へ移動
      </a>
      <div className="ambient" aria-hidden="true" />
      {header}
      <main id="lpv2-main">
        <div ref={storyRef} className={cn('story')} id="story">
          {story}
        </div>
        {day}
      </main>
      {footer}
      {stickyCta}
    </div>
  )
}
