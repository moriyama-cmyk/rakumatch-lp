import {
  ClipboardPaste,
  Layers,
  PackageOpen,
  BadgeJapaneseYen,
  ArrowRight,
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
              貼る・撮る・投げ込む。
              <br className="hidden sm:block" />
              あとはAIがマッチに乗せる。
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

        {/* 結果（実画面：投げ込み後に物件カードが並び「マッチ1名」バッジが付く一覧） */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-8 max-w-4xl">
            <AppShot
              base="/shot-properties"
              alt="投げ込んだ物件がカードに整理され「マッチ1名」バッジ付きで並ぶ楽マッチ AI の物件一覧画面"
              width={1600}
              height={713}
              chrome
            />
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
          <p className="mx-auto mt-6 flex max-w-3xl items-center justify-center gap-1.5 text-center text-xs text-ink-500">
            <ArrowRight className="h-3.5 w-3.5 text-primary-600" />
            ※ レインズ等のデータは各サービスの規約に沿ってご利用ください。
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
