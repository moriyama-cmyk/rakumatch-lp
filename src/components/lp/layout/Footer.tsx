import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { NAV, SITE } from '../site'

// 情報（規約・特商法・問い合わせ）。本番サイトの各ページへ内部リンク。
const LEGAL: { label: string; href: string }[] = [
  { label: '利用規約', href: '/terms' },
  { label: 'プライバシーポリシー', href: '/privacy' },
  { label: '特定商取引法に基づく表記', href: '/tokusho' },
  { label: 'お問い合わせ', href: '/contact' },
]

// 機能詳細ページ（既存の4ページ）。トップのハブと別に、フッターからも到達できるよう維持。
const FEATURES: { label: string; href: string }[] = [
  { label: 'お客様連動アプリ', href: '/features/customer-app' },
  { label: 'AIマッチング・逆引き', href: '/features/matching' },
  { label: '通話録音・要約', href: '/features/call-recording' },
  { label: 'コピペ物件登録・契約管理', href: '/features/property-input' },
]

/** フッター（会社情報・機能ナビ・情報リンク）。ライト。 */
export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-surface-200 bg-surface-100 py-14">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-500">
              不動産営業専門の顧客・物件管理AI。月々3,000円（税込・スタンダード）/人〜
            </p>
          </div>

          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <nav aria-label="機能ナビゲーション" className="flex flex-col gap-3">
              <p className="text-xs font-bold tracking-wide text-ink-900">機能を見る</p>
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ink-700 transition-colors hover:text-primary-700"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <nav aria-label="機能詳細" className="flex flex-col gap-3">
              <p className="text-xs font-bold tracking-wide text-ink-900">機能の詳細</p>
              {FEATURES.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ink-700 transition-colors hover:text-primary-700"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <nav aria-label="情報" className="flex flex-col gap-3">
              <p className="text-xs font-bold tracking-wide text-ink-900">情報</p>
              {LEGAL.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ink-700 transition-colors hover:text-primary-700"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-surface-200 pt-6">
          <p className="text-xs leading-relaxed text-ink-500">
            ※ 本ページのマッチングの点数や各種試算は、営業判断を助けるための目安です。サービス内容・料金は予告なく変更される場合があります。
          </p>
          <div className="mt-4 flex flex-col gap-2 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} {SITE.brand}</p>
            <p>不動産売買支援 SaaS</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
