import {
  ClipboardPaste,
  Layers,
  PackageOpen,
  BadgeJapaneseYen,
  Monitor,
  Copy,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Badge } from '../ui/Badge'
import { AppShot } from '../ui/AppShot'
import { hl, hlText } from '../lib/headline'

// ⑤一括投げ込み の手順（コード製の4ステップ）。貼る→AIが整理→物件カード化。
const STEPS: { icon: LucideIcon; caption: string }[] = [
  { icon: Monitor, caption: 'レインズ等の画面を開く' },
  { icon: Copy, caption: 'Ctrl+Aでコピー' },
  { icon: ClipboardPaste, caption: '楽マッチに貼って投げ込む' },
  { icon: Sparkles, caption: 'AIが物件カードに整理' },
]

const POINTS: { icon: LucideIcon; text: string }[] = [
  { icon: Layers, text: '画面コピペ・スクショ・PDFから、AIが1件ずつに振り分け' },
  { icon: PackageOpen, text: '物件も顧客も、まとめて投げ込むだけ' },
  { icon: BadgeJapaneseYen, text: '媒体との有料契約は不要（0円でマッチングに乗せられる）' },
]

/**
 * ⑤ 一括投げ込み登録（媒体連携 0円）。
 * ★主旨厳守: 入力時短ではない。価値は「0円でマッチに乗せる手軽さ」。手順はコード製カード。
 */
export function Ingest() {
  return (
    <Section id="ingest" className="bg-surface-50" spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Badge icon={<ClipboardPaste className="h-3.5 w-3.5" />}>媒体連携 0円</Badge>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 text-display-lg text-ink-900">
              {hlText('Ctrl+A、コピペ。')}
              <br className="hidden sm:block" />
              {hl('物件50件、', '片づいた。')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-700">
              ポイントは“入力を時短すること”ではありません。
              <strong className="font-bold text-ink-900">高いお金を払って媒体とAPI連携しなくても、物件情報を楽マッチに入れるのが超かんたん</strong>
              、ということ。SUUMO/レインズ/アットホームの画面を丸ごと貼る、スクショ、PDF。それを投げ込めば、AIが物件ごと・顧客ごとに整理してページ化し、そのまま双方マッチングに乗ります。
            </p>
          </Reveal>
        </div>

        {/* 4ステップ（コード製・番号＋アイコン＋一行） */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.caption} delay={i * 0.06}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-surface-200 bg-white p-5 shadow-soft">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <s.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                  </span>
                  <p className="mt-2 text-sm font-medium leading-snug text-ink-800">{s.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 実画面4コマ（レインズ一覧 → Ctrl+A全選択 → 貼るだけ → 物件カード化）。
            レインズの2枚は他社情報・掲載物件が読めないようぼかし加工済み（規約配慮）。 */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-6xl">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:items-start">
              <div>
                <p className="mb-2 text-center text-xs font-bold text-ink-500">1. 物件データベースの検索結果</p>
                <MockReinsList />
              </div>
              <div>
                <p className="mb-2 text-center text-xs font-bold text-ink-500">2. Ctrl+Aで全選択コピー</p>
                <MockReinsList selected />
              </div>
              <div>
                <p className="mb-2 text-center text-xs font-bold text-ink-500">3. 楽マッチに貼る</p>
                <a
                  href="/shot-bulk-input.png"
                  target="_blank"
                  rel="noopener"
                  className="block cursor-zoom-in"
                  aria-label="3. 楽マッチに貼る（原寸画像を新しいタブで開く）"
                >
                  <AppShot
                    base="/shot-bulk-input"
                    alt="コピーしたテキストを貼り付けるだけのAI一括入力ハブ画面"
                    width={1600}
                    height={900}
                  />
                </a>
              </div>
              <div>
                <p className="mb-2 text-center text-xs font-bold text-ink-500">
                  4. 全物件が「マッチ○名」バッジ付きで並ぶ
                </p>
                <a
                  href="/shot-properties.png"
                  target="_blank"
                  rel="noopener"
                  className="block cursor-zoom-in"
                  aria-label="4. 全物件が「マッチ○名」バッジ付きで並ぶ（原寸画像を新しいタブで開く）"
                >
                  <AppShot
                    base="/shot-properties"
                    alt="投げ込んだ物件がカードに整理され「マッチ○名」バッジ付きで並ぶ楽マッチ AI の物件一覧画面"
                    width={1600}
                    height={900}
                  />
                </a>
              </div>
            </div>
            <p className="mt-6 text-center text-lg font-bold text-ink-900">
              あなたの作業は、コピペの1秒。50件以上を、AIが一気に登録。
            </p>
          </div>
        </Reveal>

        {/* 要点 */}
        <Reveal delay={0.1}>
          <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {POINTS.map((p) => (
              <li
                key={p.text}
                className="flex items-start gap-3 rounded-2xl border border-surface-200 bg-white p-5 shadow-soft"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                  <p.icon className="h-4 w-4" strokeWidth={2.2} aria-hidden />
                </span>
                <span className="text-[0.9rem] leading-relaxed text-ink-700">{p.text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-ink-500">
            ※ 1・2の画面は架空データによる再現イメージです。レインズ等のデータは各サービスの規約に沿ってご利用ください。
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

// 架空データの一覧再現イメージ（実在の会社・物件は含まない）。
// 実物スクショは他社商号・電話番号が写り公開不可（目的外利用）のため、くっきり読める再現で代替。
const MOCK_ROWS = [
  { no: '1001-2345', type: '中古マンション', price: '3,980万円', size: '68.4㎡', addr: '青葉区みどり台1丁目 グランみどり台 3LDK' },
  { no: '1001-2346', type: '中古マンション', price: '2,780万円', size: '55.2㎡', addr: '旭区ひかりが丘2丁目 サンハイツひかり 2LDK' },
  { no: '1001-2347', type: '中古戸建',       price: '4,480万円', size: '92.1㎡', addr: '緑区つばき町3丁目 つばき町戸建 4LDK' },
  { no: '1001-2348', type: '中古マンション', price: '3,180万円', size: '61.8㎡', addr: '泉区あさひ台4丁目 コート あさひ台 3LDK' },
  { no: '1001-2349', type: '売地',           price: '2,980万円', size: '120㎡',  addr: '港南区さくら丘5丁目 建築条件なし' },
  { no: '1001-2350', type: '中古マンション', price: '4,980万円', size: '75.6㎡', addr: '中央区はなみずき通 パークはなみずき 3LDK' },
] as const

function MockReinsList({ selected = false }: { selected?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-surface-200 bg-white shadow-soft">
      <div className="flex items-center justify-between bg-[#3d6b4f] px-3 py-1.5">
        <span className="text-[0.6rem] font-bold text-white">売買検索結果一覧（在庫）</span>
        <span className="text-[0.55rem] text-white/70">500件</span>
      </div>
      <div className={selected ? 'bg-[#316ac5]' : 'bg-white'}>
        <table className="w-full border-collapse">
          <tbody>
            {MOCK_ROWS.map((r) => (
              <tr key={r.no} className={`border-b ${selected ? 'border-white/20' : 'border-surface-100'}`}>
                <td className={`px-2 py-1.5 text-[0.55rem] leading-tight ${selected ? 'text-white' : 'text-ink-700'}`}>
                  <span className="block font-mono">{r.no}</span>
                  <span className="block">{r.type}</span>
                </td>
                <td className={`px-2 py-1.5 text-right text-[0.6rem] font-bold leading-tight ${selected ? 'text-white' : 'text-ink-900'}`}>
                  {r.price}
                  <span className={`block text-[0.5rem] font-normal ${selected ? 'text-white/80' : 'text-ink-500'}`}>{r.size}</span>
                </td>
                <td className={`px-2 py-1.5 text-[0.55rem] leading-tight ${selected ? 'text-white' : 'text-ink-700'}`}>{r.addr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={`px-2 py-1 text-center text-[0.5rem] ${selected ? 'bg-[#316ac5] text-white/80' : 'text-ink-400'}`}>
        {selected ? '全選択中 — Ctrl+C でコピー' : '画面は再現イメージ（架空データ）'}
      </p>
    </div>
  )
}
