'use client'

// 締めCTA。AB案そのまま（文言変更なし）。
import { trackCta } from '@/lib/track'

const APP_TRY_URL = 'https://app.rakumatch-ai.com/try'

export function FinalCtaSection() {
  return (
    <section className="sec day cta-sec section-pad" id="cta">
      <div className="wrap center">
        <p className="eyebrow" style={{ justifyContent: 'center' }}>
          夜が明けて
        </p>
        <h2>
          あなたの夜を、
          <br />
          あなたに返す。
        </h2>
        <p className="sub">
          登録なしで、実物の画面を触れます。<span className="nowrap">メールアドレスも要りません。</span>
        </p>
        <a className="btn btn-primary" href={APP_TRY_URL} onClick={() => trackCta('final_cta')}>
          登録なしで、今すぐ試す <span className="arrow" aria-hidden="true">→</span>
        </a>
        <p className="fine">スタンダード 月3,000円/人〜。初期費用・最低利用期間なし。</p>
      </div>
    </section>
  )
}
