# 楽マッチ AI — LP デザインシステム

不動産「売買仲介」会社の経営者（2〜20名）に向けた、上品・信頼・読みやすさを最優先とする
ランディングページ／機能詳細ページの共通デザイン指針。白×緑のブランドを維持しつつ、
「モダンだが汎用的」から「プロ顔負け」へ引き上げることを目的とする。

> 実装注意（必読）: このリポジトリの Next.js は学習データと挙動が異なる破壊的変更を含む。
> コードを書く前に必ず `node_modules/next/dist/docs/` の該当ガイドを読むこと（`AGENTS.md` 準拠）。
> Tailwind は v4。トークンは `tailwind.config.ts` の `primary`（緑）/ `surface`（オフ白）を正とする。

---

## 1. 参照ギャラリー（盗むべき要素）

各社から「楽マッチに移植する具体策」を抜き出す。奇抜な演出ではなく、上品さ・信頼・余白に資するものだけを採用。

| # | LP | URL | 盗む要素 |
|---|----|-----|---------|
| 1 | **Linear** | https://linear.app | (a) 巨大 H1 × 引き締まった行間（`leading-[1.05]`）で「製品の自信」を表現。製品体験そのものがサイトに滲む“minimalism-meets-premium”。(b) セクション間を太い余白で完全に分離し、1画面1メッセージ。楽マッチも Hero の H1 を大きく・行間を詰める。 |
| 2 | **Stripe** | https://stripe.com | (a) Söhne 系の引き締まったタイポ＋1価値・1CTA・余計な要素ゼロの hyper-focused 構成。(b) ライブ製品ダッシュボードのスクショを浮かせ、ホバー/クリックの micro-interaction を“ベンチマーク級”に磨く。楽マッチの `DeviceMockup` に柔らかい影＋薄い枠、Hero は主張を1つに絞る。 |
| 3 | **Vercel** | https://vercel.com | (a) モノクロ基調＋1点アクセントの禁欲的配色。(b) 数値（パフォーマンス指標）を大きく見せて説得。楽マッチの統計ブロックを大型タイポ＋`CountUp`で。 |
| 4 | **Notion** | https://notion.so | (a) 手書き感のイラスト/丸みで親しみ。(b) 機能を「ビフォー→アフター」の対比で説明。楽マッチは「物件登録の手間」のビフォーアフターに流用。 |
| 5 | **Attio** | https://attio.com | (a) モノクロ（黒/白）基調にセクションごと淡いパステルを1差すだけ＋Inter 系を tight tracking で。(b) bento グリッドの機能カード＋カーソル追従の控えめホバー。楽マッチのカードパターンとグリッドの基準にする（CRM らしい構造美）。 |
| 6 | **Ramp** | https://ramp.com | (a) bento グリッドを「角丸タイルを統一・ガター均一・サイズ＝階層」のルールで厳格運用＝size-as-hierarchy。(b) 鮮やかな色も“規律ある余白”で抑える。楽マッチは機能グリッドのタイル寸法で重要度を表現し、色は足さず余白で語る。 |
| 7 | **Framer** | https://framer.com | (a) スクロール連動の控えめなフェード/パララックス。(b) セクションごとに背景色を `white`↔`surface-50` で交互にしてリズムを作る。楽マッチの `FadeIn` の使い所の手本。 |
| 8 | **SmartHR** | https://smarthr.design | (a) 本文 16px ベースの可読性最優先（行間広め `leading-relaxed`、1行40字前後で改行）。(b) 余白を「情報のグルーピング・視覚的関係づけ」の道具として距離差で設計（装飾でなく構造）。日本企業向けの信頼演出と余白設計の手本。 |
| 9 | **freee** | https://www.freee.co.jp | (a) 「誰の・どんな悩みを」を冒頭で言語化する課題提起型 Hero。(b) 料金表の明快さ（比較しやすい2カラム）。楽マッチの料金セクションの手本。 |
| 10 | **Facilo（競合）** | https://facilo.jp | (a) 不動産業界向けの落ち着いた配色と専門用語の噛み砕き方を観察し、差別化（お客様連動アプリ・逆引き共有）を前面に。 |
| 11 | **KASIKA（競合）** | https://kasika.estate | (a) 不動産×データの図解の見せ方を参考に、楽マッチの「マッチング図解」を SVG で上品に。 |

> 共通の学び: 一流LPは「色数を絞る（ベース＋アクセント1色を規律ある余白で抑える）・余白を贅沢に取る・1セクション1メッセージ・サイズ＝階層（size-as-hierarchy）・タイポは引き締めて数値で語る・スクショ/ライブUIに影で立体感・micro-interaction はホバー時のみ控えめに」。
> 楽マッチはこの原則を徹底するだけで「汎用」から脱却できる。
> なお 2025〜26 の主流は「ダーク＋ネオン1色」「静的スクショでなくライブUI/AIエージェントの実演」だが、楽マッチは不動産経営者向けに**白基調を維持**（ダーク化はしない）。代わりに「実スクショ＋（可能なら）短い操作デモ動画」で“製品が動く様”を見せる方向に転用する。

---

## 2. カラー設計

**原則**: 白×緑を維持。アクセントは1色（ゴールド系）のみ追加。色で語らず、余白とタイポで語る。

### 既存トークン（維持・正）
- `primary.500 #0D9B76` … ブランド緑（CTA・リンク・アイコン）
- `primary.600 #0D7C66` … CTA ホバー・濃い緑の見出しアクセント
- `primary.700 #0A6652` / `primary.900 #05392B` … ダーク面・濃色テキスト
- `primary.50 #E6F5F0` / `primary.100 #CCEBE1` … 淡い緑の面・バッジ背景
- `surface.50 #FAFAF8`（オフ白・交互背景）/ `surface.100 #F5F3EF`（カード地）/ `surface.200 #E5E2DD`（ボーダー）

### 追加トークン案（`tailwind.config.ts` の `extend.colors` に追記提案）
信頼・上質さの「差し色」として控えめなゴールドを1色だけ。多用禁止（数値の強調・受賞/実績バッジ・区切りの極細ラインのみ）。

```ts
accent: {
  50:  '#FBF7EE',  // ゴールドの極淡い面
  500: '#C8A24A',  // 上品なゴールド（実績数値・バッジの差し色）
  600: '#A8842F',  // ゴールドのテキスト/ホバー
},
ink: {
  900: '#0F1A16',  // 本文の最濃色（黒に緑を一滴。純黒を避け上品に）
  700: '#36433D',  // 本文標準
  500: '#5E6B64',  // キャプション/補足
},
```

### 使い分けルール
- **本文**: `text-ink-700`（標準）/ 見出し `text-ink-900` / 補足 `text-ink-500`。純 `black` は使わない。
- **緑**: CTA・リンク・アイコン・アクティブ状態。`primary-500`→ホバー `primary-600`。
- **ゴールド(accent)**: 「数値の強調」「実績/受賞バッジ」「区切りの 1px ライン」のみ。面塗りは原則禁止。
- **背景リズム**: `white` ↔ `surface-50` を交互。濃色セクション（CTA前など）は `primary-900` 全面 + 白文字を1回だけ使い緩急を付ける。
- **状態色**: 成功=`primary`, 注意=`amber-500`, エラー=`red-500`（Tailwind標準のまま、面積は最小に）。

---

## 3. タイポスケール

日本語可読性を最優先（SmartHR流）。見出しは contrast を効かせ、本文は行間広め。

| 役割 | Tailwind クラス | 用途 |
|------|----------------|------|
| H1（Hero） | `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-ink-900` | ページ最上位の主張。1ページ1回。 |
| H2（セクション見出し） | `text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900` | 各セクションの主題。 |
| H3（小見出し/カード見出し） | `text-xl sm:text-2xl font-semibold leading-snug text-ink-900` | 機能名・カードタイトル。 |
| エヤブロウ（小ラベル） | `text-sm font-semibold tracking-widest uppercase text-primary-600` | H2 の上に置く区分ラベル（例: FEATURES）。日本語なら `tracking-wider` 程度。 |
| Lead（リード文） | `text-lg sm:text-xl leading-relaxed text-ink-700` | Hero 直下・セクション導入の説明。 |
| Body | `text-base leading-relaxed text-ink-700` | 標準本文。日本語は `leading-relaxed`（1.625）以上を死守。 |
| Caption | `text-sm leading-relaxed text-ink-500` | 補足・注記・「※自社試算」等。 |
| 統計の数値 | `text-5xl sm:text-6xl font-bold tracking-tight text-primary-600`（差し色は `text-accent-600`） | `CountUp` と併用。 |

ルール:
- 日本語本文は1行 **38〜42字** で折り返す（`max-w-prose` 相当、または `max-w-2xl`）。長い行は信頼感を損なう。
- `font-bold` は H1/H2/数値のみ。乱用しない。本文の強調は `font-semibold` + `text-ink-900` で十分。
- `tracking-tight` は見出し・数値だけ。本文に詰め文字は使わない（日本語が窮屈に見える）。

---

## 4. 余白・セクションリズム

「余白を贅沢に」が上品さの最大要因。詰め込まない。

- **セクション縦パディング**: `py-20 sm:py-28 lg:py-32`（重要セクションは `lg:py-40`）。隣接セクションが同色なら境界に `border-t border-surface-200`。
- **最大幅**: コンテンツ `max-w-6xl mx-auto px-6 sm:px-8`。テキスト主体の段落は `max-w-2xl`、Hero コピーは `max-w-3xl`。
- **グリッド**: 機能3カラム `grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`。2カラム（テキスト＋画像）`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`。
- **セクション内リズム**: エヤブロウ→H2→Lead の縦間隔は `space-y-4`、見出しブロックと本体は `mt-12 lg:mt-16`。
- **背景の交互**: 奇数セクション `bg-white` / 偶数 `bg-surface-50`。CTA直前に `bg-primary-900` の濃色を1回だけ。

---

## 5. コンポーネントパターン（推奨 Tailwind クラス）

### ボタン（CTA）
- Primary: `inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-primary-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`
- Secondary（ゴースト）: `inline-flex items-center gap-2 rounded-xl border border-surface-200 bg-white px-6 py-3.5 text-base font-semibold text-ink-900 transition hover:border-primary-300 hover:text-primary-600`
- 角丸は `rounded-xl` で統一（`rounded-full` は使わない＝堅実さ）。影は `shadow-sm`→hover `shadow-md` の微増のみ。

### カード（機能/価値）
`group rounded-2xl border border-surface-200 bg-white p-6 lg:p-8 transition hover:border-primary-200 hover:shadow-[0_8px_30px_rgba(13,124,102,0.06)]`
- アイコンは `size-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5`。
- ホバーで「微浮上＋緑の極薄シャドウ」＝Attio流。派手な変化は禁止。

### バッジ
- 標準: `inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700`
- 実績/受賞（差し色）: `... bg-accent-50 text-accent-600`（ゴールドはここだけ）

### セクションヘッダ（共通）
```
<div class="max-w-2xl">
  <p class="text-sm font-semibold tracking-wider text-primary-600">FEATURES</p>
  <h2 class="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-ink-900">見出し</h2>
  <p class="mt-4 text-lg leading-relaxed text-ink-700">リード文。</p>
</div>
```
中央寄せにする場合は `mx-auto text-center` を付与（多用しない。左寄せの方が読みやすく信頼的）。

### 統計ブロック
`grid sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-surface-200` 内に
`<dt class="text-5xl font-bold tracking-tight text-primary-600"><CountUp/></dt>` + `<dd class="mt-2 text-sm text-ink-500">ラベル ※自社試算</dd>`。
注記（※自社試算）は必ず caption で添える（法務地雷回避）。

### CTA セクション（濃色フィナーレ）
`bg-primary-900 text-white rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center`、H2 を白、ボタンは白地 `bg-white text-primary-700 hover:bg-surface-50`。1ページに1回。

---

## 6. モーション原則

- `FadeIn` は「初見セクションの登場」だけに使う。スクロールごとに全要素が動くのは安っぽい。
- 1セクションにつき1〜2回まで。カードは `stagger`（順次 50〜80ms 遅延）で上品に。
- ホバーは `transition`（150〜200ms）で色/影/微小 translate のみ。`scale` は 1.0→1.02 まで。バウンス・回転は禁止。
- パララックスは Hero のモックアップ画像に「ごく僅か」だけ。動きの主役はコンテンツであって演出ではない。
- `prefers-reduced-motion` を尊重（実装時 `motion-reduce:transition-none`）。

---

## 7. 機能詳細ページ `/features/*` 共通レイアウト

全機能ページで同一の骨格を使い「シリーズ感」を出す（一流LPの一貫性）。

1. **ヒーロー**: エヤブロウ（機能カテゴリ）→ H1（機能名＋ベネフィット）→ Lead（1〜2文）→ Primary CTA。右に該当スクショ（`DeviceMockup`/`ScreenMockup` を影付きで）。`bg-white`、`py-24 lg:py-32`。
2. **価値（なぜ重要か）**: 2カラム（左テキスト/右図）。「この機能が解く課題」を1つに絞る。`bg-surface-50`。
3. **特徴グリッド**: カード3つ（§5のカードパターン）。各カードはアイコン＋H3＋2行説明。`bg-white`。
4. **使い方ステップ**: 縦の番号付きステップ（`01 02 03`）。各ステップは左に大きな番号（`text-5xl font-bold text-primary-100`）＋右にテキスト＋必要ならスクショ。`bg-surface-50`。
5. **必要なもの（前提/機材）**: 箇条書き or 小カード。通話録音など機材依存機能は「動作確認済み機材」を明記（断定回避・実機検証ベース）。
6. **FAQ**: 既存 `Accordion` を使用。`max-w-3xl mx-auto`、項目は `border-b border-surface-200`。
7. **CTA**: §5 の濃色フィナーレ。

各ページ間で「セクションの順番・余白・見出しスタイル」を固定し、内容だけ差し替える。

---

## 8. 画像・図解の方針

- **既存スクショを主役に**: `feature-matching.png` / `feature-ai-assistant.png` / `feature-contract.png` / `lp-desktop.jpg` / `lp-mobile.jpg` を `DeviceMockup`/`ScreenMockup` に載せ、`shadow-[0_20px_60px_rgba(5,57,43,0.12)]` ＋ `ring-1 ring-surface-200` で立体感。背景に淡い `primary-50` のぼかし円を1つ置くと浮く（Stripe流）。
- **動画**: `reins-bulk.mp4` は `VideoModal` でサムネ→クリック再生。自動再生は重さと信頼性の観点で避け、ポスター画像＋再生ボタンに。
- **足りない図解は CSS/SVG で内製**: 「お客様連動アプリ（逆引き共有）」のフロー図、「マッチングの仕組み」図は外部素材を使わず SVG で。線は `stroke-surface-200`、ノードは白カード＋緑アイコン、矢印は `primary-400`。配色をブランドに統一できるのが内製の利点。
- **イラスト多用は避ける**: 不動産経営者向けは「実画面＝実在する製品」の説得力が最強。装飾イラストより実スクショを優先。
- 画像は必ず `alt` を付与し、`next/image` で最適化（実装時 docs 確認）。OGP は既存 `ogp.png`。

---

## 9. まとめ（採用した方向性）

- **キーワード**: 余白を贅沢に / 色数は白×緑＋ゴールド1点 / 1セクション1メッセージ / 数値で語る / 実スクショに影で立体感。
- **追加トークン**: `accent`（上品ゴールド・差し色限定）, `ink`（緑を一滴落とした黒系で本文を上品に）。白×緑は維持しアクセントは1色のみ。
- **差別化の打ち出し**: 競合（Facilo/KASIKA）に対し「お客様連動アプリ（逆引き共有）」を SVG フロー図で明確に可視化するのが LP 最大の武器。
- **法務**: 数値には必ず「※自社試算」等の caption。Premium 表記など事実と異なる表現を避ける。
