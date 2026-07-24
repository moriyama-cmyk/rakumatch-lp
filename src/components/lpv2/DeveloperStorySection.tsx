'use client'

// 開発者ストーリー（WHY TRUST US・PORT_SPEC★新規挿入）。
// 文言は現行本番LPの src/components/lp/sections/Story.tsx から一字一句変えずに移植し、
// 見た目だけAB案の朝パート（白カード・indigoアクセント）に合わせて再スタイルしている。
// 配置は比較表〜料金の後・声の直前（PORT_SPEC「WHY TRUST USの位置」指定）。
import { trackCta } from '@/lib/track'
import { hl } from '../lp/lib/headline'

const APP_TRY_URL = 'https://app.rakumatch-ai.com/try'

export function DeveloperStorySection() {
  return (
    <section className="sec day section-pad" id="founder">
      <div className="wrap">
        <div className="section-head mx-auto center" style={{ textAlign: 'center' }}>
          <p className="eyebrow center" style={{ justifyContent: 'center' }}>
            WHY TRUST US
          </p>
          <h2>
            {hl('現役の', '不動産営業マンが、')}
            <br />
            {hl('自分のために', '作りました。')}
          </h2>
        </div>

        <div className="story-card">
          <span className="story-card__avatar">
            <picture>
              <source srcSet="/founder.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/founder.png" alt="楽マッチ AI 開発者 森山 幸弘" loading="lazy" decoding="async" />
            </picture>
          </span>
          <p className="story-card__name">森山 幸弘</p>
          <p className="story-card__role">現役不動産営業 ／ 楽マッチ AI 開発者</p>

          <div className="story-card__quote">
            <p>東京で不動産売買をやっている、現役の営業マンです。</p>
            <p>「もっと楽に、もっとわかりやすく、誰がやってもできるツール」を追い求めて作りました。</p>
            <p>説明は不要です。使えば直感的にわかります。必要最低限を、ぎゅっと詰め込みました。</p>
            <p className="accent">AIが進化するたびに、このアプリも進化します。あなたの営業トークも、提案も、一緒に進化し続けます。</p>
          </div>
        </div>

        <p className="story-note">
          これは投資家やエンジニアが机上で作ったツールではありません。現場の不便を1つずつ潰して作った、現場のための道具です。
        </p>

        <div className="story-card" style={{ marginTop: '1.4rem' }}>
          <p style={{ fontSize: '.95rem', lineHeight: 1.9, color: 'var(--text-700)' }}>
            私はエンジニアではありません。難しい操作は、私が一番嫌いです。だからこのアプリの操作は&ldquo;貼るだけ&rdquo;にしました。
          </p>
        </div>

        <p className="center" style={{ marginTop: '1.6rem' }}>
          <a
            className="inline-link"
            href={APP_TRY_URL}
            onClick={() => trackCta('story')}
            style={{ justifyContent: 'center' }}
          >
            → 実物の画面を触ってみる
          </a>
        </p>
      </div>
    </section>
  )
}
