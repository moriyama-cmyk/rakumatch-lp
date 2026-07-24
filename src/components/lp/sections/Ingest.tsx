import {
  ArrowDown,
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
import { hl, hlText } from '../lib/headline'
import { cn } from '../lib/cn'
import { MockFrame, PropertyCard } from '../mock'
import type { PropertyCardAgentData } from '../mock'

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
    <Section id="ingest" className="bg-white" spacing="lg">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <Badge icon={<ClipboardPaste className="h-3.5 w-3.5" />}>媒体連携 0円</Badge>
            <h2 className="mt-4 text-display-lg text-ink-900">
              {hlText('Ctrl+A、コピペ。')}
              <br className="hidden sm:block" />
              {hl('物件50件、', '片づいた。')}
            </h2>
          </Reveal>
        </div>

        {/* 2026-07-24 森山さん指示の物語ブロック（旧・抽象リード文を置き換え）:
            「新規物件500件→何もしない/自分で見る/高額ツール」の3択と、楽マッチの3つの数字を
            1対1で対比させる。視覚文法はProblem/EraShiftと同じ「沈む灰→勝つ緑」。
            ※数字の扱い（景表法配慮）: 500件は市況の例示（モックの在庫表示と整合）。
            「500件を数秒で登録」という処理性能の断定はせず、「あなたの作業はコピペ1秒/画面」
            という作業量の事実だけを主張する。 */}
        <Reveal delay={0.08}>
          <div className="mx-auto mt-10 max-w-3xl">
            <p className="text-center text-lg font-bold text-ink-900 sm:text-xl">
              新規物件、500件。あなたなら、どうしますか。
            </p>

            {/* これまでの3つの選択肢（沈む灰） */}
            <div className="mt-6 rounded-xl bg-surface-100 p-6 opacity-[0.85] sm:p-7">
              <p className="text-sm font-bold tracking-wide text-ink-600">これまでの選択肢は、3つ</p>
              <ul className="mt-3 space-y-2.5 text-base leading-relaxed text-ink-600">
                <li>
                  <span className="font-bold text-ink-700">何もしない</span> — 見きれないから。お客様に合う物件が、埋もれたまま流れていく。
                </li>
                <li>
                  <span className="font-bold text-ink-700">自分で全部見る</span> — お客様一人ひとりに、頭の中で当てはめる。時間が足りない。
                </li>
                <li>
                  <span className="font-bold text-ink-700">高額なツールを入れる</span> — マッチングは自動になるが、媒体との有料連携や設定が前提で、面倒。
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-center py-2">
              <ArrowDown className="h-6 w-6 text-primary-400" aria-hidden />
            </div>

            {/* 楽マッチの答え（勝つ緑・3つの数字）。
                「手作業は数秒」は森山さん確認済みの製品事実（バッチ機能で500件もまとめて投入可・
                人間の作業はクリック/ドラッグ/コピペのみ）。処理完了時間ではなく手作業の量を主張する。 */}
            <div className="rounded-xl border border-primary-600/40 bg-primary-50 p-6 sm:p-7">
              <p className="text-sm font-bold tracking-wide text-primary-700">楽マッチなら</p>
              <div className="mt-4 grid gap-4 text-center sm:grid-cols-3">
                <div>
                  <p className="text-2xl font-bold text-primary-700 sm:text-3xl">手作業は数秒</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-900">
                    クリックとコピペだけ。<br className="hidden sm:block" />
                    500件も、まとめて投げ込めます。
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-700 sm:text-3xl">自動マッチ</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-900">
                    全物件に「マッチ○名」が付き、<br className="hidden sm:block" />
                    誰に出すかまで並ぶ。
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary-700 sm:text-3xl">月3,000円</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-900">
                    税込/人。<br className="hidden sm:block" />
                    媒体連携は0円。
                  </p>
                </div>
              </div>
              <p className="mt-5 border-t border-primary-600/20 pt-4 text-center text-base leading-relaxed text-ink-900">
                入れ方も、選びません。<strong className="font-bold">画面コピペでも、図面のPDFでも、スクショでも</strong>——投げ込めば、AIが1件ずつ物件カードに整理します。
                <br className="hidden sm:block" />
                <strong className="font-bold text-primary-700">物件入力の“ステージ”が、変わりました。</strong>
              </p>
            </div>
          </div>
        </Reveal>

        {/* 4ステップ（コード製・番号＋アイコン＋一行） */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.caption} delay={i * 0.06}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-surface-200 bg-white p-5 shadow-none">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <s.icon className="h-5 w-5 text-primary-600" strokeWidth={2} aria-hidden />
                  <p className="mt-2 text-sm font-medium leading-snug text-ink-700">{s.caption}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 実画面4コマ（レインズ一覧 → Ctrl+A全選択 → 貼るだけ → 物件カード化）。
            コード製の再現イメージ（実スクショではない）。UI内の文字は雰囲気でよい方針とし、
            各コマの下に16px以上のラベルで「何が起きているか」を文字で読ませる。 */}
        <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
            {/* 2026-07-24 修正: 各グリッド子要素はデフォルトの min-width:auto により、
                キャプション文（word-break: auto-phrase がフレーズを分割できず1行分の実寸を
                要求）の分だけトラックが広がり、375px幅で355px(320px超)まで膨らんで
                overflow-x: clip に隠される横はみ出しになっていた。min-w-0 でこの床を外し、
                break-words で長いキャプションが折り返せるようにして解消する。 */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="min-w-0">
                <p className="mb-3 text-center text-base font-bold text-ink-900 break-words">1. 物件データベースの検索結果</p>
                <MockReinsList />
              </div>
              <div className="min-w-0">
                <p className="mb-3 text-center text-base font-bold text-ink-900 break-words">2. Ctrl+Aで全選択コピー</p>
                <MockReinsList selected />
              </div>
              <div className="min-w-0">
                <p className="mb-3 text-center text-base font-bold text-ink-900 break-words">3. 楽マッチに貼る</p>
                <BulkPasteMock />
              </div>
              <div className="min-w-0">
                <p className="mb-3 text-center text-base font-bold text-ink-900 break-words">
                  4. 全物件が「マッチ○名」バッジ付きで並ぶ
                </p>
                <PropertyGridMock />
              </div>
            </div>
            <p className="mt-8 text-center text-lg font-bold text-ink-900">
              あなたの作業は、コピペの1秒。50件以上を、AIが一気に登録。
            </p>
        </div>

        {/* 要点 */}
        <ul className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {POINTS.map((p) => (
              <li
                key={p.text}
                className="flex items-start gap-3 rounded-xl border border-surface-200 bg-white p-5 shadow-none"
              >
                <p.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" strokeWidth={2} aria-hidden />
                <span className="text-sm leading-[1.7] text-ink-700">{p.text}</span>
              </li>
            ))}
        </ul>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-ink-500">
          ※ 1〜4の画面は架空データによる再現イメージです。レインズ等のデータは各サービスの規約に沿ってご利用ください。
        </p>
      </Container>
    </Section>
  )
}

// 架空データの一覧再現イメージ（実在の会社・物件は含まない）。
// 実物スクショは他社商号・電話番号が写り公開不可（目的外利用）のため、くっきり読める再現で代替。
// 方針: UI内の文字は雰囲気でよい。読ませたいのはコマ下の日本語ラベルの方。
// その代わり枠は大きく・文字は最小14px・コントラストは高めに（森山さん指摘「小さいし薄い」対応）。
const MOCK_ROWS = [
  { no: '1001-2345', type: '中古マンション・3LDK', price: '3,980万円', addr: '青葉区みどり台1丁目' },
  { no: '1001-2346', type: '中古マンション・2LDK', price: '2,780万円', addr: '旭区ひかりが丘2丁目' },
  { no: '1001-2347', type: '中古戸建・4LDK',       price: '4,480万円', addr: '緑区つばき町3丁目' },
  { no: '1001-2348', type: '売地',                 price: '2,980万円', addr: '港南区さくら丘5丁目' },
] as const

function MockReinsList({ selected = false }: { selected?: boolean }) {
  return (
    // 再現UI＝装飾。MockFrame を使わない唯一の再現UIなので、ここで aria-hidden を付ける
    // （中身は div/span のみ・フォーカス可能要素は絶対に置かない）。
    // 支援技術には、上のラベル「1. 物件データベースの検索結果」等と STEPS の文言で内容が伝わる。
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border-2 border-surface-200 bg-white shadow-soft-lg"
    >
      {/* 2026-07-24 Phase1: 直値排除。深緑のヘッダーはブランドトークンprimary-800へ寄せる */}
      <div className="flex items-center justify-between bg-primary-800 px-4 py-3">
        <span className="text-sm font-bold text-white">売買検索結果一覧（在庫）</span>
        <span className="text-sm font-semibold text-white/90">500件</span>
      </div>
      {/* 2026-07-24 Phase1: 全面ブルー(#2a5bb0)の塗りつぶしを鎮静化。
          選択状態は薄いハイライト(/15)のみとし、テキスト色は通常のまま。
          「選択中」であることの主張は下のフッター行（primary-700濃色）に集約する。 */}
      <div className={selected ? 'bg-[#2a5bb0]/15' : 'bg-white'}>
        {MOCK_ROWS.map((r) => (
          <div
            key={r.no}
            className="flex items-center justify-between gap-3 border-b border-surface-100 px-4 py-3.5 last:border-b-0"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-snug text-ink-800">
                {r.type}
              </p>
              <p className="truncate text-sm leading-snug text-ink-500">
                {r.addr}
              </p>
            </div>
            <p className="shrink-0 text-base font-bold leading-snug text-ink-900">
              {r.price}
            </p>
          </div>
        ))}
      </div>
      <p className={cn('px-4 py-3 text-center text-sm font-semibold', selected ? 'bg-primary-700 text-white' : 'text-ink-600')}>
        {selected ? '全選択中 — Ctrl+C でコピー' : '画面は再現イメージ（架空データ）'}
      </p>
    </div>
  )
}

// 3. 楽マッチに貼る — 巨大な貼り付け欄（プレースホルダ文言が主役）のコード再現。
// 顧客側パネルは持たない（森山さん指示どおり捨てる）。
function BulkPasteMock() {
  return (
    <MockFrame variant="desktop" chromeUrl="app.rakumatch-ai.com" note={false}>
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <ClipboardPaste className="h-12 w-12 text-primary-500" strokeWidth={1.75} aria-hidden />
        <p className="text-lg font-bold leading-snug text-ink-800">ここに貼り付けてください</p>
        <p className="max-w-xs text-sm leading-relaxed text-ink-500">
          SUUMO・レインズ・アットホームの画面を丸ごとコピペ。スクショやPDFもそのまま投げ込めます。
        </p>
      </div>
    </MockFrame>
  )
}

// 4. 全物件が「マッチ○名」バッジ付きで並ぶ — PropertyCard(agent)を3枚。
// サムネイル・6項目グリッドは持たず、各カード右下の「マッチN名」バッジを主役にする。
const MOCK_PROPERTIES: PropertyCardAgentData[] = [
  { title: 'グランみどり台 305号室', price: '3,980万円', propertyType: '中古マンション', meta: '青葉区みどり台 / 3LDK', matchCount: 4 },
  { title: 'つばき町戸建',           price: '4,480万円', propertyType: '中古戸建',       meta: '緑区つばき町 / 4LDK',   matchCount: 2 },
  { title: 'さくら丘 売地',           price: '2,980万円', propertyType: '土地',           meta: '港南区さくら丘 / 120㎡', matchCount: 7 },
]

function PropertyGridMock() {
  return (
    <MockFrame variant="desktop" chromeUrl="app.rakumatch-ai.com/properties" note={false}>
      <div className="flex flex-col gap-3 bg-surface-50 p-3">
        {MOCK_PROPERTIES.map((p) => (
          <PropertyCard key={p.title} variant="agent" data={p} />
        ))}
      </div>
    </MockFrame>
  )
}
