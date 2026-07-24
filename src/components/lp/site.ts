// サイト全体の定数（CTA着地・ナビ・料金）。STRATEGY_BLUEPRINT / APP_CAPABILITIES より。
// 本番（Next.js）トップページ新デザイン用。Vite 版 src/config/site.ts と同一。

export const SITE = {
  brand: '楽マッチ AI',
  tagline: '不動産売買のための AI 営業相棒',
  // カテゴリ（森山さん指定・大々的に表示）
  category: '不動産営業専門の顧客・物件管理システムAI',
  categoryShort: '不動産営業専門',
  // Hero のカテゴリ行・キャッチ（後から一行で差し替えられるよう定数化）
  categoryLine: '不動産営業専門',
  catchMain: '新人でも、初日からトップ営業マンの動きができる。',
  catchSub: '誰に、何を出すか。— AIが先に決めています。',
  // 計測用バリアントID。上の catchMain / catchSub を差し替えるたびに必ずここも更新する。
  // この値が GA4 のユーザープロパティ／Clarity のタグに送られ、コピー別に成果を比較できる。
  // 命名: v<連番>-<訴求軸>。例: v1-baseline-sales → v2-price-vs-5man → v3-ability-shinjin → ...
  // 2026-07-24 修正: 実際の描画は Hero.tsx 側のマークアップが正（色分け・改行制御のため）。
  // 文言を変えるときは両方同時更新すること。
  copyVariant: 'v3-ability-shinjin',
  // 価格（森山さん指定・本番LP/特商法と同一表記）
  priceLead: '月々たったの3,000円（税込）/人',
  priceShort: '月3,000円/人（税込）',
  standardPrice: '¥3,000',
  premiumPrice: '¥5,000',
  priceUnit: '/ 人・月（税込）',
  // 主CTA着地（ゲスト体験＝匿名サインインで中を触れる）
  ctaTryUrl: 'https://app.rakumatch-ai.com/try',
  appUrl: 'https://app.rakumatch-ai.com',
  ctaPrimaryLabel: '無料で試す',
  ctaSecondaryLabel: '機能を見る',
  // CTA 下のマイクロコピー（景表法配慮の安全文言）
  microCopy: 'ログイン不要・クレカ不要・そのまま画面が触れます',
  microCopyShort: 'クレカ不要',
} as const

// Hero 用エイリアス（ブリーフ準拠の命名で参照できるように）
export const CATEGORY_LINE = SITE.categoryLine
export const CATCH_MAIN = SITE.catchMain
export const CATCH_SUB = SITE.catchSub

export type NavItem = { label: string; href: string }

// ブループリント【1】ヘッダー: 機能 / 選ばれる理由 / 料金 / よくある質問
// 2026-07-24 修正: href が #hub（機能ダイジェスト）を指しており、主要4機能
// （CustomerApp/Matching/Ingest/AiPartner）を飛ばして着地する事故だったため #features へ修正。
export const NAV: NavItem[] = [
  { label: '機能', href: '#features' },
  { label: '選ばれる理由', href: '#why' },
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
