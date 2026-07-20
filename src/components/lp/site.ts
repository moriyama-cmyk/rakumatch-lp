// サイト全体の定数（CTA着地・ナビ・料金）。STRATEGY_BLUEPRINT / APP_CAPABILITIES より。
// 本番（Next.js）トップページ新デザイン用。Vite 版 src/config/site.ts と同一。

export const SITE = {
  brand: '楽マッチ AI',
  tagline: '不動産売買仲介のための AI 営業相棒',
  category: '不動産営業専門の顧客・物件管理システムAI',
  categoryShort: '不動産営業専門',
  categoryLine: '不動産売買仲介の営業担当者へ',
  catchMain: '月額3,000円/人（税込・スタンダード）から、顧客管理も「次に出す物件」も。',
  catchSub: '1名から始められる、不動産営業のための顧客・物件管理AIです。',
  // 実表示中の Hero コピーと必ず同時に更新する。
  copyVariant: 'v3-individual-five-functions',
  // 価格（森山さん指定・本番LP/特商法と同一表記）
  priceLead: '月々たったの3,000円（税込）/人',
  priceShort: '月3,000円/人（税込）',
  standardPrice: '¥3,000',
  premiumPrice: '¥5,000',
  priceUnit: '/ 人・月（税込）',
  // 匿名デモと、カード登録を伴う7日間トライアルは混同しない。
  ctaTryUrl: 'https://app.rakumatch-ai.com/try',
  ctaTrialUrl: 'https://app.rakumatch-ai.com/signup',
  appUrl: 'https://app.rakumatch-ai.com',
  ctaPrimaryLabel: '登録なしで画面を試す',
  ctaTrialLabel: '7日間トライアルを始める',
  ctaSecondaryLabel: '5つの機能を見る',
  microCopy: 'ログイン不要・連絡先不要・クレジットカード不要',
  microCopyShort: '登録・カード不要',
} as const

// Hero 用エイリアス（ブリーフ準拠の命名で参照できるように）
export const CATEGORY_LINE = SITE.categoryLine
export const CATCH_MAIN = SITE.catchMain
export const CATCH_SUB = SITE.catchSub

export type NavItem = { label: string; href: string }

// ブループリント【1】ヘッダー: 機能 / 選ばれる理由 / 料金 / よくある質問
export const NAV: NavItem[] = [
  { label: '5つの機能', href: '#features' },
  { label: 'お客様アプリ', href: '#customer-app' },
  { label: '料金', href: '#pricing' },
  { label: 'よくある質問', href: '#faq' },
]

// 料金プラン定数（森山さん指定で実額表示・本番LP/特商法と同一表記）。
// price/unit を PriceCard が表示。金額を変える時はここを編集すれば全体に反映。
export type Plan = {
  name: string
  tagline: string
  quota: string
  price: string
  unit: string
}

export const PLANS: Plan[] = [
  {
    name: 'スタンダード',
    tagline: '一人ひとりの営業に。',
    quota: '標準',
    price: SITE.standardPrice,
    unit: SITE.priceUnit,
  },
  {
    name: 'プレミアム',
    tagline: 'AIをたっぷり使うチームに。',
    quota: '拡大',
    price: SITE.premiumPrice,
    unit: SITE.priceUnit,
  },
]
