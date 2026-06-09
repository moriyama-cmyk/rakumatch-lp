'use client'

import { useEffect } from 'react'
import { SITE } from './site'

/**
 * 計測タグ（GA4 + Microsoft Clarity）。両方とも無料。
 *
 * - 環境変数が無ければ何も読み込まない（＝ID未設定の本番では完全に無影響）。
 *   Vercel の環境変数に NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_CLARITY_ID を入れると有効化される。
 * - 表示中のキャッチコピー識別子 SITE.copyVariant を GA4 のユーザープロパティと
 *   Clarity のタグに送る → 「どのコピーの時に何が起きたか」をコピー別に集計・録画フィルタできる。
 * - 主CTA（/try への遷移）クリックを cta_try_click イベントとして送る。
 *
 * バージョン非依存にするため next/script は使わず、標準DOMでスクリプトを注入する。
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

export function Analytics() {
  useEffect(() => {
    // --- GA4 ---
    if (GA_ID && !window.gtag) {
      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(s)

      window.dataLayer = window.dataLayer || []
      const gtag = (...args: unknown[]) => {
        window.dataLayer!.push(args)
      }
      window.gtag = gtag
      gtag('js', new Date())
      // 表示中コピーを全イベントに付与（ユーザープロパティ）
      gtag('config', GA_ID, {
        user_properties: { copy_variant: SITE.copyVariant },
      })
    }

    // --- Microsoft Clarity ---
    if (CLARITY_ID && !window.clarity) {
      const queue: unknown[] = []
      const clarityFn = (...args: unknown[]) => {
        queue.push(args)
      }
      ;(clarityFn as unknown as { q: unknown[] }).q = queue
      window.clarity = clarityFn
      const t = document.createElement('script')
      t.async = true
      t.src = 'https://www.clarity.ms/tag/' + CLARITY_ID
      const first = document.getElementsByTagName('script')[0]
      first?.parentNode?.insertBefore(t, first)
      // 録画・ヒートマップをコピー別にフィルタできるようタグ付け
      window.clarity('set', 'copy_variant', SITE.copyVariant)
    }

    // --- 主CTA（無料で試す＝/try 遷移）クリック計測 ---
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest('a') as HTMLAnchorElement | null
      if (!anchor?.href || !anchor.href.includes('/try')) return
      window.gtag?.('event', 'cta_try_click', {
        copy_variant: SITE.copyVariant,
        link_url: anchor.href,
      })
      window.clarity?.('event', 'cta_try_click')
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}
