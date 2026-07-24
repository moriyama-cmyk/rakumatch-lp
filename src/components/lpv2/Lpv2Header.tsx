'use client'

// AB案のヘッダー（透過・夜明けで背景色が自動追従）。
// 背景色・文字色は Lpv2Root が更新する --phase-bg / --phase-fg に依存するため、
// このコンポーネント自体にはロジックを持たせない（CSSのみ）。
import { trackCta } from '@/lib/track'

const APP_URL = 'https://app.rakumatch-ai.com'

export function Lpv2Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="logo" href="#top">
          楽マッチ<span>AI</span>
        </a>
        <a className="header-cta" href={APP_URL} onClick={() => trackCta('header')}>
          登録なしで触ってみる
        </a>
      </div>
    </header>
  )
}
