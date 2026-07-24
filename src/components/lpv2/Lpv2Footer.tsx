// フッター。AB案の見た目（ダーク・明朝ロゴ）そのまま。
// リンク先はAB案の "#" ダミーではなく、実在する既存ページ（/terms /privacy /tokusho）に接続する
// （PORT_SPEC「規約・プライバシー・特商法リンクは既存ページへ」指定）。
const LEGAL = [
  { label: '利用規約', href: '/terms' },
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: '特定商取引法に基づく表記', href: '/tokusho' },
]

export function Lpv2Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <div className="wrap">
        <p className="footer-logo">楽マッチAI</p>
        <ul className="footer-links">
          {LEGAL.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
        <p className="footer-copy">© {year} 楽マッチAI</p>
      </div>
    </footer>
  )
}
