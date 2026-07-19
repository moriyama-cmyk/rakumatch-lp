import { MockFrame } from './MockFrame'
import { PropertyCard } from './PropertyCard'
import type { PropertyCardCustomerData } from './PropertyCard'

interface PhoneAppProps {
  /** ヘッダーの「〇〇の物件リスト」に使う名前（例: "田中様"） */
  customerName?: string
  properties: PropertyCardCustomerData[]
  className?: string
  /** 「※架空データによる再現イメージ」注記の表示。既定=表示。 */
  note?: boolean
}

/**
 * お客様アプリのスマホ画面(原寸・約340px)。MockFrame(variant="phone") を内包した
 * 完成画面コンポーネントなので、これ自体をそのままセクションに置ける（二重ラップ不要）。
 *
 * 主役=状態バッジ「内見希望済み」等（お客様の動きが営業に逆流している証拠）。
 * 捨てたもの: 種別フィルタチップ列／星評価／保存回数バッジ／設定ウィザード。
 */
export function PhoneApp({ customerName = '田中様', properties, className, note = true }: PhoneAppProps) {
  return (
    <MockFrame variant="phone" className={className} note={note}>
      <div className="border-b border-surface-200 bg-white px-4 py-3">
        <h2 className="truncate text-base font-bold text-ink-900">{customerName}の物件リスト</h2>
      </div>
      <div className="space-y-2.5 bg-surface-50 p-3">
        {properties.map((p, i) => (
          <PropertyCard key={i} variant="customer" data={p} />
        ))}
      </div>
    </MockFrame>
  )
}
