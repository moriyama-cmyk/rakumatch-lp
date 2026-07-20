'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { SITE } from './site'

/**
 * 計測タグ（GA4 + Microsoft Clarity）。両方とも無料。
 *
 * - ID は公開識別子（サイトのソースに出る前提＝秘密ではない）なのでデフォルト値を直書き。
 *   Vercel の環境変数 NEXT_PUBLIC_GA_ID / NEXT_PUBLIC_CLARITY_ID があればそちらを優先。
 *   空文字や 'off' を入れれば個別に無効化できる。
 * - 表示中のキャッチコピー識別子 SITE.copyVariant を GA4 のユーザープロパティと
 *   Clarity のタグに送る → 「どのコピーの時に何が起きたか」をコピー別に集計・録画フィルタできる。
 * CTAイベントは src/lib/track.ts から明示的に送る。
 * 匿名デモ、カード登録付きトライアル、ページ内アンカーを混同しない。
 *
 * バージョン非依存にするため next/script は使わず、標準DOMでスクリプトを注入する。
 */

// 楽マッチAI LP の本番計測ID（公開ID）。環境変数があれば上書き、'off' で無効化。
const GA_ID = pickId(process.env.NEXT_PUBLIC_GA_ID, 'G-88BXPJS279')
const CLARITY_ID = pickId(process.env.NEXT_PUBLIC_CLARITY_ID, 'x4evfvyhyp')

function pickId(envValue: string | undefined, fallback: string): string | undefined {
  if (envValue === undefined) return fallback
  if (envValue === '' || envValue.toLowerCase() === 'off') return undefined
  return envValue
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }
}

export function Analytics() {
  const pathname = usePathname()
  const isFirstPathname = useRef(true)

  useEffect(() => {
    // --- GA4 ---
    if (GA_ID && !window.gtag) {
      const s = document.createElement('script')
      s.async = true
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(s)

      window.dataLayer = window.dataLayer || []
      // GA4/GTM は dataLayer に積まれた arguments オブジェクトをコマンドとして解釈する。
      // 配列（[...args]）を push すると config/js が認識されず計測先が初期化されない
      // （_ga クッキー不発・ヒット送信ゼロ＝計測が一切動かない）。標準の gtag スニペット
      // （function gtag(){dataLayer.push(arguments)}）と同義に、arguments をそのまま積む。
      const gtag = (function () {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments)
      }) as (...args: unknown[]) => void
      window.gtag = gtag
      gtag('js', new Date())
      // 表示中コピーを全イベントに付与（ユーザープロパティ）。
      // linker: LP（rakumatch-ai.com）→ アプリ（app.rakumatch-ai.com）の遷移を
      // 同一ユーザーとして計測する（クロスドメイン）。domains 配列はアプリ側と完全一致させる。
      gtag('config', GA_ID, {
        user_properties: { copy_variant: SITE.copyVariant },
        linker: { domains: ['rakumatch-ai.com', 'app.rakumatch-ai.com'] },
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

  }, [])

  // --- LP内ページ遷移の page_view（App Router の client 遷移は自動で発火しないため手動送信） ---
  // 初回ロード分は gtag('config', ...) の自動 page_view があるためスキップし、
  // 2回目以降（pathname が変わった＝クライアント側遷移）だけ送る。
  useEffect(() => {
    if (isFirstPathname.current) {
      isFirstPathname.current = false
      return
    }
    window.gtag?.('event', 'page_view', {
      page_path: pathname,
      copy_variant: SITE.copyVariant,
    })
  }, [pathname])

  return null
}
