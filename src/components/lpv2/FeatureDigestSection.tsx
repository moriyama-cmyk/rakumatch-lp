// 機能ダイジェスト（物件管理／ダッシュボード／顧客管理／契約フェーズ管理の4カード）。
// AB案そのまま（文言変更なし）。画像は public/lpv2/ の全景スクショ。
// 「物件管理」カードのみ、全景では小さくなる「マッチ○名」バッジが読めるよう
// assets班の拡大切り出し（lpv2-crop-properties-badges）を補足インセットとして併記する。
type DigestCard = {
  tag: string
  title: string
  desc: string
  src: string
  alt: string
  detailSrc?: string
  detailAlt?: string
}

const CARDS: DigestCard[] = [
  {
    tag: 'PROPERTIES',
    title: '物件管理',
    desc: 'マッチ人数が、一覧のバッジでひと目に。',
    src: '/lpv2/lpv2-properties.webp',
    alt: '物件管理の一覧画面。物件カードに「マッチ1名」「マッチ2名」バッジが並ぶ。',
    detailSrc: '/lpv2/lpv2-crop-properties-badges.webp',
    detailAlt: '物件一覧の拡大。「マッチ1名」「マッチ0名」バッジが読める大きさで並ぶ。',
  },
  {
    tag: 'DASHBOARD',
    title: 'ダッシュボード',
    desc: '今日のタスク・契約進行中・追客アラートを一望。',
    src: '/lpv2/lpv2-dashboard.webp',
    alt: 'ダッシュボード画面。タスク一覧、契約進行中の案件、追客アラートが並ぶ。',
  },
  {
    tag: 'CUSTOMERS',
    title: '顧客管理',
    desc: 'しばらく連絡できていない顧客が、自動で上に浮く。',
    src: '/lpv2/lpv2-customers.webp',
    alt: '顧客管理の一覧画面。重点フォロー中の顧客が上部にまとめて表示されている。',
  },
  {
    tag: 'CONTRACT',
    title: '契約フェーズ管理',
    desc: '事前審査から決済まで、6段階で進捗管理。',
    src: '/lpv2/lpv2-contract.webp',
    alt: '契約フェーズ管理の画面。事前審査から決済までの6段階が進捗バーで管理されている。',
  },
]

export function FeatureDigestSection() {
  return (
    <section className="sec day section-pad" id="hub">
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">そのほかの機能</p>
          <h2>そのほかも、ひと目でわかる。</h2>
          <p className="lead">核ループのまわりを固める、日々の運用のための機能です。</p>
        </div>

        <div className="digest-grid">
          {CARDS.map((c) => (
            <div className="digest-card" key={c.tag}>
              <div className="digest-card__frame">
                <div className="digest-card__bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="digest-card__img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.src} width={1920} height={1080} loading="lazy" alt={c.alt} />
                </div>
              </div>
              <div className="digest-card__body">
                <p className="digest-card__tag">{c.tag}</p>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                {c.detailSrc && (
                  <div className="detail-crop" style={{ maxWidth: '100%' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.detailSrc} width={1600} height={344} loading="lazy" alt={c.detailAlt} />
                    <figcaption>拡大 — マッチ人数バッジ</figcaption>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
