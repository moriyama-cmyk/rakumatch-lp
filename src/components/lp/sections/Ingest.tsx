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
                <p className="mb-2 text-center text-xs font-bold text-ink-500">1. レインズの検索結果</p>
                <a
                  href="/bulk-step-01-reins-list.png"
                  target="_blank"
                  rel="noopener"
                  className="block cursor-zoom-in"
                  aria-label="1. レインズの検索結果（原寸画像を新しいタブで開く）"
                >
                  <img
                    src="/bulk-step-01-reins-list.png"
                    alt="レインズの売買検索結果一覧のイメージ（内容はぼかし加工）"
                    className="block h-auto w-full rounded-xl border border-surface-200 shadow-soft"
                    loading="lazy"
                  />
                </a>
              </div>
              <div>
                <p className="mb-2 text-center text-xs font-bold text-ink-500">2. Ctrl+Aで全選択コピー</p>
                <a
                  href="/bulk-step-02-reins-selected.png"
                  target="_blank"
                  rel="noopener"
                  className="block cursor-zoom-in"
                  aria-label="2. Ctrl+Aで全選択コピー（原寸画像を新しいタブで開く）"
                >
                  <img
                    src="/bulk-step-02-reins-selected.png"
                    alt="一覧をCtrl+Aで全選択した状態のイメージ（内容はぼかし加工）"
                    className="block h-auto w-full rounded-xl border border-surface-200 shadow-soft"
                    loading="lazy"
                  />
                </a>
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
            ※ レインズ等のデータは各サービスの規約に沿ってご利用ください。
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
