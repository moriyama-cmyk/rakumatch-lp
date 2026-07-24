// お客様アプリ（逆方向共有）。AB案そのまま（文言変更なし）。
// STEP3（顧客詳細・Fig.03）の右パネルとの呼応コピー（「営業側の画面は、もう見えていました」）を維持。
const PHONES = [
  {
    num: '01',
    src: '/lpv2/lpv2-app-share.webp',
    alt: 'お客様のiPhoneの共有シート。「楽マッチに保存」という項目が並んでいる。',
    caption: 'お客様が「共有」をタップ',
  },
  {
    num: '02',
    src: '/lpv2/lpv2-app-saved.webp',
    alt: 'お客様アプリの保存した物件一覧の画面。',
    caption: '保存した物件が、アプリに並ぶ',
  },
  {
    num: '03',
    src: '/lpv2/lpv2-app-ai.webp',
    alt: 'お客様アプリの物件詳細画面。AIによる「良い点」「確認ポイント」のコメントが添えられている。',
    caption: 'AIがプロ視点のコメントを添える',
  },
]

export function CustomerAppSection() {
  return (
    <section
      className="sec day section-pad"
      id="app"
      style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">お客様アプリ</p>
          <h2>共有した物件が、届いている。</h2>
          <p className="lead">
            業界でも珍しい、逆方向の共有。お客様がポータルサイトで気になった物件を「共有」するだけで、
            あなたの楽マッチにAIのコメント付きで届く。ご家族との共有もできる。
          </p>
        </div>

        <div className="app-phones">
          {PHONES.map((p) => (
            <div key={p.num}>
              <p className="app-phone__num">{p.num}</p>
              <div className="phone-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} width={750} height={1630} loading="lazy" alt={p.alt} />
              </div>
              <p className="app-phone__caption">{p.caption}</p>
            </div>
          ))}
        </div>

        <div className="app-back-note">
          <span aria-hidden="true">↑</span>
          <p>
            <strong>営業側の画面は、もう見えていました。</strong>{' '}
            STEP3（Fig.03）の右側に写っていたのが、これです。顧客詳細の「アプリ」タブで、保存物件と温度感がそのまま見えます。
          </p>
        </div>
      </div>
    </section>
  )
}
