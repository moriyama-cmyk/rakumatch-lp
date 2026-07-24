'use client'

// 料金（月3,000円/人から。隠しません。）＋ 2プランカード。
// PORT_SPECのtrackCta location命名リストに pricing_standard / pricing_premium が
// 明記されているため、AB案では1本だった案内リンクをカードごとのCTAに分けている
// （docs/lpv2-implementation-notes.md 記載の判断。詳細は下記コメント参照）。
import { trackCta } from '@/lib/track'

const APP_TRY_URL = 'https://app.rakumatch-ai.com/try'

export function PricingSection() {
  return (
    <section className="sec day section-pad pricing-sec" id="pricing">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">料金</p>
          <h2>
            月<span className="num">3,000</span>円/人から。<span className="nowrap">隠しません。</span>
          </h2>
          <p className="lead">本体価格以外、余計な費用はありません。価格の非公開が主流の業界で、これが楽マッチの立ち位置です。</p>
        </div>

        <div className="pricing-grid">
          <div className="price-card">
            <p className="price-card__name">STANDARD</p>
            <div className="price-card__price">
              <span className="num">¥3,000</span>
              <span className="unit">/人・月（税込）</span>
            </div>
            <ul className="price-card__list">
              <li>初月割引あり</li>
              <li>初期費用 0円</li>
              <li>最低利用期間なし</li>
              <li>有料の媒体連携は不要</li>
            </ul>
            <p style={{ marginTop: '1.5rem' }}>
              <a className="inline-link" href={APP_TRY_URL} onClick={() => trackCta('pricing_standard')}>
                → このプランで試す
              </a>
            </p>
          </div>
          <div className="price-card price-card--hi">
            <p className="price-card__name">PREMIUM</p>
            <div className="price-card__price">
              <span className="num">¥5,000</span>
              <span className="unit">/人・月（税込）</span>
            </div>
            <ul className="price-card__list">
              <li>初月割引あり</li>
              <li>初期費用 0円</li>
              <li>最低利用期間なし</li>
              <li>有料の媒体連携は不要</li>
            </ul>
            <p style={{ marginTop: '1.5rem' }}>
              <a className="inline-link" href={APP_TRY_URL} onClick={() => trackCta('pricing_premium')}>
                → このプランで試す
              </a>
            </p>
          </div>
        </div>
        <p className="pricing-note">
          人数分のライセンスでご利用いただけます。会員登録・メールアドレスの入力なしで、実際の画面を今すぐ操作できます（ゲスト体験モード）。
        </p>
      </div>
    </section>
  )
}
