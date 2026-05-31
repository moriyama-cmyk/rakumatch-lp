# ART_DIRECTION.md — 楽マッチ AI LP アートディレクション

> **本書の位置づけ**: `DESIGN_SYSTEM.md`（トークン・タイポスケール・コンポーネントクラスの「数値の正」）の **上に積む、最終ビジュアルの方向性と意思決定** を定める。
> - 数値・クラス定義の唯一の正は **`DESIGN_SYSTEM.md`**。矛盾したら DESIGN_SYSTEM を優先し、本書を直す。
> - 本書が担うのは「その数値を **いつ・どこで・どれだけ・なぜ** 使うか」というトンマナ・アクセント運用・額装・ヒーロー構図・全ページ一貫性・**デザインQA**。
> - 実装注意（DESIGN_SYSTEM §冒頭と同じ）: Next.js 16.2.1 は破壊的変更を含む。コード前に `node_modules/next/dist/docs/` を読む（`AGENTS.md` 準拠）。Tailwind v4・トークンは `tailwind.config.ts` が正。
>
> 対象: トップ `src/app/page.tsx` ＋ `/features/*` 詳細ページ群。
> 読者: 実装エージェント（lp-main / feat-foundation / 各feature担当）と デザインQA（art-director）。

---

## 0. 一行コンセプト

**「白い余白に、緑が一筋、ゴールドが一点。経営者が触れて損のない、静かな高級感。」**

奇抜さはゼロでいい。**可読性・余白・一貫性・誠実さ**だけで「プロ顔負け」に引き上げる。装飾で盛らず、**引き算とリズム**で品を出す。色は白×緑をベースに、ゴールド(`accent`)は「差し色1点」だけ（DESIGN_SYSTEM §2）。

---

## 1. ブランドトーン — 不動産売買の経営者に効く"静かな上質"

### 1.1 目指す第一印象（3秒の脳内）
- 「ちゃんとした会社の、ちゃんとした製品だ」（信頼・堅実）
- 「ごちゃごちゃしていない。読みやすい」（明晰）
- 「これは"売買仲介"の自分たちのための道具だ」（専門性）
- 「導入しても恥ずかしくない」（上質）

### 1.2 即アウトの印象
- 「SaaSテンプレ」「AIツールにありがちな未来感の押し売り」
- 「派手・うるさい・若者向け・チャラい」
- 「文字が詰まっていて読む気が失せる」
- 「数字を盛っている／うさんくさい」（法務にも直結。§9・DESIGN_SYSTEM §9）

### 1.3 白×緑×ゴールドを上質に見せる4原則
1. **白は"無"でなく"間"**。背景はオフ白 `surface-50` 基調。純白 `bg-white` は"浮かせたい面（カード/モックアップ）"にだけ。背景は `white ↔ surface-50` の交互でリズムを作る（DESIGN_SYSTEM §4）。`surface-100` はカード地・ストーリー帯など"もう一段沈めたい面"に。
2. **緑は効かせ色。塗らず差す**。緑面積は画面の **5%以下** が目安。広い緑ベタは安い。緑は「CTA・リンク・アイコン・アクティブ・重要数値・エヤブロウ・区切りの一筋」に集中。**唯一の例外＝最終CTAの濃色フィナーレ**（`bg-primary-900`、1ページ1回／DESIGN_SYSTEM §5）。
3. **ゴールドは"一点豪華"**。`accent` は「実績/受賞バッジ」「数値の差し色」「区切りの極細1pxライン」だけ。**面塗り禁止**。1ページに数えるほどしか出さない（出しすぎ＝品が消える）。
4. **黒を使わない**。本文は純黒禁止 → `text-ink-700`、見出し `text-ink-900`、補足 `text-ink-500`（緑を一滴落とした黒系。DESIGN_SYSTEM §2.使い分け）。純黒・純黒影は硬く、白基調の上品さを壊す。

> 注: 既存コードは `text-neutral-*` を多用（実測 74箇所/10ファイル、うち `page.tsx` 46箇所）。DESIGN_SYSTEM は `ink`/`accent` 追加トークンへの移行を意図。foundation のトークン追加後、実装フェーズで下記マップに従い置換する。

### neutral → ink 置換マップ（実装者向け・迷ったらこれ）
foundation が `ink`(900 #0F1A16 / 700 #36433D / 500 #5E6B64) を追加した後、`text-neutral-*` を次の通り寄せる:

| 既存 | 置換先 | 理由 |
|---|---|---|
| `neutral-900` | `ink-900` | 見出し・最濃 |
| `neutral-800` | `ink-900` | 準見出し（contact のラベル等）。`ink` は3段なので900に寄せる |
| `neutral-700` | `ink-700` | 標準本文 |
| `neutral-600` | `ink-700` | 本文相当。`ink` は3段なので700に寄せる（薄くしない） |
| `neutral-500` | `ink-500` | 補足・キャプション |
| `neutral-400` | `ink-500` | **薄すぎ。必ず ink-500 へ引き上げ**（AAコントラスト対策・本書 C項） |
| `neutral-300` | 個別判断 | ボーダーなら `surface-200`、テキストなら `ink-500` |

- **対象（neutral→ink を適用）**: `src/app/page.tsx`、`src/components/{Header,Footer,Accordion,VideoModal}.tsx`、`src/app/layout.tsx`(body の `text-neutral-900`→`text-ink-900`)。
- **法務ページ（`terms`/`privacy`/`tokusho`/`contact`）も同マップで可**だが、本リニューアルのスコープ外なら後回しでよい（一貫性のため最終的には寄せる）。
- **hover系**（`hover:text-neutral-900` 等／Header・Footer）も `hover:text-ink-900` / `hover:text-ink-700` に同調。
- 状態色（`text-red-500`=コスト強調、`amber`）は §2.2/§5.4 の方針（red はそのまま最小面積／amber→可能なら accent）に従い、ink へは寄せない。
- 注意: ベタ置換すると DeviceMockup/ScreenMockup 内の `text-gray-400`（プレースホルダ）は別系統なので触らない（`gray-*` であり `neutral-*` ではない）。

---

## 2. アクセント運用 — 緑とゴールドをどこに差すか

### 2.1 緑（primary）の用途（許可リスト）
| 用途 | トーン | クラス例（DESIGN_SYSTEM準拠） |
|---|---|---|
| プライマリCTA背景 | `primary-500`→hover`600` | `bg-primary-500 hover:bg-primary-600`（DESIGN_SYSTEM §5ボタン） |
| エヤブロウ（小ラベル） | `primary-600` | `text-sm font-semibold tracking-wider text-primary-600` |
| 重要数値/統計 | `primary-600` | `text-5xl font-bold tracking-tight text-primary-600` |
| アイコン（カード/機能） | `primary-600` on `primary-50` | `size-12 rounded-xl bg-primary-50 text-primary-600` |
| バッジ | `primary-700` on `primary-50` | `bg-primary-50 text-primary-700` |
| リンク・アクティブ・ホバー | `primary-600` | `hover:text-primary-600` |
| 濃色フィナーレ（CTA前1回） | `primary-900` 全面+白文字 | `bg-primary-900 text-white`（DESIGN_SYSTEM §5） |
| 装飾の淡い光（モックアップ背後） | `primary-50` ぼかし円 | `bg-primary-50 rounded-full blur-3xl` |

### 2.2 ゴールド（accent）の用途（これ以外で使わない）
- 実績/受賞バッジ: `bg-accent-50 text-accent-600`
- 統計の差し色: 数値1つだけ `text-accent-600`（基本は緑。ここぞの1つにゴールド）
- 区切りの極細ライン: `border-accent-500/40` の 1px
- **禁止**: 面塗り、本文、CTA、複数同時露出。

### 2.3 緑を使ってはいけない場所
- 本文テキスト（読みづらく安い）・広い背景ベタ（濃色フィナーレ以外）
- 影の色（影は無彩色＋ごく薄緑のみ。§3.4）
- 同一視界に **塗り緑CTAを2つ以上**（主役が消える。§2.4）

### 2.4 1ビューポート＝主役CTAは1つ
スクロール上の各"画面分"で、**塗り緑ボタンは原則1つ**。2つ目の行動喚起は **ゴースト**（`border border-surface-200 bg-white text-ink-900 hover:border-primary-300 hover:text-primary-600`／DESIGN_SYSTEM §5 Secondary）に格下げして主従を作る。
- 既存ヒーローは「1週間無料で試してみる（塗り緑）」＝主、「ログインはこちら（ゴースト）」＝従。この主従は正しい。維持。

### 2.5 緑の"一筋"（品が出る小技）
- エヤブロウ（`FEATURES` 等の小ラベル `text-primary-600`）が DESIGN_SYSTEM の標準。本書はこれを**全H2の上に必ず置く**ことを推奨（現状トップは未使用。実装で追加）。区分が一目で分かり、緑を塗らずに効かせられる。
- 重要KPIは数字だけ緑（または1つだけゴールド）。単位・文章は `ink`。

---

## 3. 余白・リズム・面 — 上質さの本体

> **品の9割は余白とリズム。** 装飾より先にここを守る。数値は DESIGN_SYSTEM §4 が正。

### 3.1 縦リズム（DESIGN_SYSTEM §4）
- セクション縦パディング: `py-20 sm:py-28 lg:py-32`（重要セクションは `lg:py-40`）。**隣接セクションで揃える**。詰めない。
- 同色セクションが隣接する境界には `border-t border-surface-200`。
- セクション内: エヤブロウ→H2→Lead を `space-y-4`、見出しブロックと本体は `mt-12 lg:mt-16`。

> 既存 `page.tsx` は `py-20 sm:py-24`・統計バーは `py-14`。実装で DESIGN_SYSTEM の `py-20 sm:py-28 lg:py-32` に統一。リズムのばらつきは素人臭の最大要因。

### 3.2 横方向（DESIGN_SYSTEM §4）
- コンテナ `max-w-6xl mx-auto px-6 sm:px-8`（既存は `px-4 sm:px-6`。`px-6 sm:px-8` に寄せ、モバイルで端に文字を寄せない）。
- 読み幅: 段落 `max-w-2xl`、Heroコピー `max-w-3xl`。日本語は **1行38〜42字** で折り返す（DESIGN_SYSTEM §3）。横長長文は読まれない。

### 3.3 角丸 — 用途で固定（混在禁止）
DESIGN_SYSTEM の運用に合わせ、**用途ごとに固定**:
- ボタン/CTA: `rounded-xl`（DESIGN_SYSTEM §5。`rounded-full` ボタンは堅実さのため不使用）
- カード/画像額装/モックアップ枠: `rounded-2xl`（モックアップ枠は既存どおり `rounded-xl` でも可だが、額装で `rounded-2xl` に統一推奨）
- 濃色フィナーレの大箱: `rounded-3xl`
- バッジ/ピル: `rounded-full`（バッジのみ。ボタンには使わない）
- **中途半端（`rounded-md` 等）は使わない。**

### 3.4 影 — "ほぼ無影、たまにやわらかく浮かす"
- 基本は影なし or 極薄ボーダー `border border-surface-200`。白基調は線で面を分ける方が上品。
- カードのホバー: DESIGN_SYSTEM §5 の **緑がかった極薄シャドウ** `hover:shadow-[0_8px_30px_rgba(13,124,102,0.06)]`（濃い影は禁止）。
- 製品スクショ/モックアップ: DESIGN_SYSTEM §8 の **やわらか深影＋極薄リング** `shadow-[0_20px_60px_rgba(5,57,43,0.12)] ring-1 ring-surface-200`。
- **CTAの影だけ緑がかってよい**（CTAを"光らせる"）。それ以外の影は無彩色 or ごく薄緑、低不透明。
- ホバーの影変化は `shadow-sm→shadow-md` の一段だけ。

> 既存の `shadow-2xl`（モックアップ）・`shadow-lg`（カード）・`hover:shadow-lg` は強すぎ/汎用的。実装で上記の指定影に差し替え、"立体感はあるが軽い"を作る。

### 3.5 区切り
- セクション境界は **背景色の交互**（`white ↔ surface-50`、沈める帯は `surface-100`）で作る。罫線多用はしない。
- 線で区切る時は `border-surface-200`（極薄）。ゴールドの極細1pxは"特別な区切り"に限り可（§2.2）。

---

## 4. タイポグラフィ運用（数値は DESIGN_SYSTEM §3 が正）

本書は**どのレベルをどこに使うか**だけ補足する。スケール（H1/H2/H3/Lead/Body/Caption/統計）は DESIGN_SYSTEM §3 表を参照。

- **見出しは最濃 `ink-900`、本文は `ink-700`、補足/注記は `ink-500`**。全部同じ濃さにせず濃淡の階層を作る。`text-ink-500` より薄い色を本文に使わない（既存 `text-neutral-400` の本文・注記は `ink-500` に引き上げ、コントラスト確保）。
- **`font-bold` は H1/H2/統計数値だけ**。本文の強調は `font-semibold + text-ink-900`（DESIGN_SYSTEM §3）。
- **`tracking-tight` は見出し・数値のみ**。本文・日本語に詰め文字を使わない。
- 行間: 日本語本文は `leading-relaxed`（1.625）以上を死守。H1は `leading-[1.1]`、H2 `leading-snug`。
- 明朝は使わない（古く見える・可読性低下）。フォントは DESIGN_SYSTEM/`layout.tsx` の `--font-sans` 系。
- 統計数値は `tabular-nums` を付けて `CountUp` のガタつきを防ぐ（実装時 `CountUp` 側 or 親に付与）。

---

## 5. カード・コンポーネントの統一ルック（クラスは DESIGN_SYSTEM §5）

### 5.1 標準カード
DESIGN_SYSTEM §5 のカードを正とする:
`group rounded-2xl border border-surface-200 bg-white p-6 lg:p-8 transition hover:border-primary-200 hover:shadow-[0_8px_30px_rgba(13,124,102,0.06)]`
- 構成: アイコン丸（`size-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5`）→ H3(`ink-900`) → 本文(`ink-700`)。
- **絵文字は使わない**。アイコンは `lucide-react`（既存採用）。

> 既存カードは `hover:-translate-y-1 hover:shadow-lg`。DESIGN_SYSTEM の "微浮上＋緑の極薄シャドウ" に寄せる（`hover:shadow-lg` は強い）。translate は `-translate-y-1`(=4px) 程度までで可。

### 5.2 グリッド（DESIGN_SYSTEM §4）
- 機能3カラム: `grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`
- テキスト＋画像2カラム: `grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`
- カード高さは揃える（既存 `h-full` 継続。文字数差でガタつく時は `flex flex-col` + `mt-auto`）。

### 5.3 バッジ（DESIGN_SYSTEM §5）
- 標準: `inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700`
- 実績/受賞(ゴールド): `... bg-accent-50 text-accent-600`（ゴールドはここだけ）
- 「不動産売買特化」「REINS連携」等の専門性ラベルに。1ブロック1個まで。

### 5.4 "人気"バッジなどの差し色
既存 Pricing の "人気" は `bg-amber-500`。DESIGN_SYSTEM の差し色は **ゴールド `accent`**。実装で `bg-accent-500 text-white`（または `bg-accent-50 text-accent-600`）に寄せ、状態色 `amber` の濫用を避ける（amber は"注意"状態用・面積最小／DESIGN_SYSTEM §2状態色）。

---

## 6. 図解・スクリーンショットの"額装"ルール（DESIGN_SYSTEM §8）

> 実画面が説得力の中心（不動産経営者には"実在する製品"の証明が最強）。額装で品を上げる。

### 6.1 共通額装
- スクショは**生置きしない**。`DeviceMockup`/`ScreenMockup`（既存ブラウザ枠付き）に載せる。枠は `rounded-xl`（既存）or 額装で `rounded-2xl`。
- 立体感: `shadow-[0_20px_60px_rgba(5,57,43,0.12)]` ＋ `ring-1 ring-surface-200`（DESIGN_SYSTEM §8）。**既存 `shadow-2xl` はこの指定影へ**。
- 背後に **淡い `primary-50` のぼかし円**を1つ敷いて白地に浮かせる（Stripe流。既存ヒーローに既にある `bg-primary-50 blur-3xl` を踏襲）。彩度は最小。
- zig-zag 機能セクションの素の `<Image className="rounded-2xl shadow-lg border">` も、可能なら `ScreenMockup` 額装に統一して"シリーズ感"を出す。

### 6.2 配置
- スクショは少し大きめに。2カラム時、片側で軽くはみ出させる/淡光で浮かせると高級感。やりすぎ注意（モバイルで暴れない `lg:` 限定で）。
- スクショ周囲に十分な余白。画面いっぱいに詰めない。

### 6.3 図解（内製SVG／DESIGN_SYSTEM §8）
- 不足図解は外部素材を使わず **CSS/SVG で内製**（配色をブランドに統一できる）。
- 線 `stroke-surface-200`、ノード=白カード＋緑アイコン、矢印 `primary-400`。多色禁止・緑1色アクセント。
- **差別化フロー「お客様連動アプリ（逆引き共有）」は LP最大の武器**（DESIGN_SYSTEM §9・MEMORY）。「お客様 → 担当者」の**逆方向**が一目で分かる矢印で。これは図解品質を最優先で磨く。

### 6.4 動画（`reins-bulk.mp4`）
- `VideoModal`（既存）でサムネ→クリック再生。ポスター画像＋中央に再生ボタン（緑円＋白三角）＋微暗オーバーレイ。
- **自動再生は避ける**（重さ・信頼性／DESIGN_SYSTEM §8）。使う場合のみミュート・`playsinline`。音声自動再生は禁止。

---

## 7. ヒーロー構図 — 最初の3秒

### 7.1 現状と方針
既存ヒーローは **中央寄せ＋下にモックアップ**（`text-center max-w-3xl` → `DeviceMockup`）。これは Stripe/Linear 系の正攻法で、维持してよい。左右2カラム型に**作り替える必要はない**。重要なのは下記の質。

### 7.2 H1の作法（DESIGN_SYSTEM §3）
- `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-ink-900`。
- **2行以内**に収め、主張を1つに絞る（Linear/Stripe の hyper-focus）。重要語は緑を**1ワードだけ**（全部緑にしない）。
- 既存「新人が、即戦力に変わる。」は短く強い。可。`leading-[1.1]` で締める。

### 7.3 構成要素の順
`バッジ（不動産売買専用）→ H1 → Lead(max-w-xl〜2xl) → 価格の一言 → [主CTA(塗り緑)][従CTA(ゴースト)] → 補足(30秒/無料) → モックアップ`。
- バッジ文言は誇張を避ける（既存「反則級AI」は強い表現。法務と相談のうえトーンダウン候補。§9）。
- 主CTAが**画面で最も目立つ**こと（§7.4）。

### 7.4 CTAの存在感（全CTA共通・DESIGN_SYSTEM §5）
プライマリCTA:
`inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-primary-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`
- **ホバーの `scale` は 1.0→1.02 まで**（DESIGN_SYSTEM §6）。既存の `hover:scale-105` は強すぎ → `hover:scale-[1.02]` か、影/色変化のみへ。バウンスは禁止。
- 文言は「動詞＋得」（「1週間無料で試してみる」可）。タップ領域 縦44px以上（`py-3.5` で確保）。
- フォーカスリングを必ず視認可能に（`focus-visible:outline-primary-500`）。

### 7.5 背景
- ヒーロー `bg-white`。オフ白/淡グラデは可。**緑ベタ・写真ベタ背景は禁止**。
- 装飾光は `primary-50` ぼかし円を1つだけ（既存どおり）。控えめに。

---

## 8. 全ページ一貫性（トップ / features/* 共通）

### 8.1 ページ骨格は同じ"型"（DESIGN_SYSTEM §7）
`/features/*` は全機能ページで同一骨格＝シリーズ感:
ヒーロー(エヤブロウ→H1→Lead→主CTA＋スクショ) → 価値(2カラム) → 特徴グリッド(カード3) → 使い方ステップ(01/02/03) → 必要なもの/機材 → FAQ(`Accordion`) → 濃色フィナーレCTA。**順番・余白・見出しスタイルを固定し、中身だけ差し替える**。
- features のヒーローはトップより控えめ（H1は `text-3xl sm:text-5xl` 程度・トップが主役）。

### 8.2 ページ間でブレさせない要素
- コンテナ幅 `max-w-6xl`/`px-6 sm:px-8`、縦リズム `py-20 sm:py-28 lg:py-32`、背景交互 `white↔surface-50`
- カード額装(§5)・スクショ額装(§6)・角丸の用途固定(§3.3)・影の哲学(§3.4)
- 緑5%以下・1ビュー1主役CTA(§2)・ゴールドは差し色1点(§2.2)
- 見出し階層・行間(§4)・エヤブロウを全H2上に
- **Header/Footer は全ページ既存コンポーネントを使用**（独自実装しない）
- CTA文言・ボタンスタイル統一、濃色フィナーレは各ページ1回

### 8.3 差別化は"中身"で
ページごとに色・レイアウト型を変えない。**スクショ・図解・コピー**で差をつける。型の共通＝一貫性＝信頼。

### 8.4 モーション（DESIGN_SYSTEM §6）
- `FadeIn` は「初見セクションの登場」だけ。全要素が毎回動くのは安い。1セクション1〜2回。カードは `stagger`（50〜80ms）。
- ホバーは `transition`(150〜200ms)で色/影/微小translateのみ。`scale` 上限1.02。バウンス・回転・強パララックス禁止。
- パララックスはヒーローのモックアップに"ごく僅か"だけ。
- **`prefers-reduced-motion` を尊重**（`motion-reduce:transition-none` を実装）。`CountUp`/`FadeIn` も reduced-motion で静止/即時表示に。

---

## 9. 禁止事項＋法務ガード（クイック・アウトリスト）

ビジュアル禁止:
- 緑ベタ背景（濃色フィナーレ以外）・緑の本文・1ビューに塗り緑CTA複数
- ゴールドの面塗り・ゴールド多用
- 純黒テキスト・純黒影・濃い大きなドロップシャドウ
- 角丸の用途違反（ボタンに `rounded-full`、中途半端な `rounded-md`）
- 絵文字をUI装飾に使う（アイコンを使う）
- スクショの枠なし生置き
- 明朝の見出し/本文・読み幅無制限の長文・詰まった行間
- ページごとに違うレイアウト型/色
- 派手アニメ・`scale>1.02`・自動再生音声

法務ガード（DESIGN_SYSTEM §9・MEMORY マーケ法務方針。ビジュアルにも責任）:
- **数値訴求には必ず注記**（「※自社試算」等の caption / `text-ink-500 text-sm`）。統計バー（90%/1秒/5秒）・「入力時間90%削減」バッジは注記必須。
- **比較表は出典・時点を明記**（既存「※各社公式サイト…2026年3月時点」は良い形。維持）。事実と異なる優劣表現を避ける。
- **誇張コピーのトーン確認**（「反則級AI」「7つのAI搭載」等は法務レビュー対象。COPY_DECK/法務担当と整合）。ビジュアルで煽りを増幅しない。
- Premium 等のプラン表記を事実に合わせる（MEMORY: 両プラン同モデル。差別化はストレージ/人数）。

---

## 10. デザインQAチェックリスト（実装後・各ページで実施）

> art-director が `npm run dev`（node24/npm11 確認済）＋ Playwright で **375 / 768 / 1280** のスクショを取得し、トップと全 `/features/*` を1ページずつ採点。各項目 **OK / NG / N/A**。NGは「ファイル:行 ＋ 推奨クラス」で担当へ差し戻す。

### A. 余白・リズム
- [ ] セクション縦パディングが `py-20 sm:py-28 lg:py-32` 系で隣接と揃う（統計バー等の `py-14` 残りがない）
- [ ] エヤブロウ→H2→Lead の3段間隔（`space-y-4`/`mt-12 lg:mt-16`）が効く
- [ ] コンテナ `max-w-6xl`/`px-6 sm:px-8`、モバイルで端に文字が触れない
- [ ] 段落 `max-w-2xl`・Hero `max-w-3xl`・1行38〜42字で折返し

### B. 階層・タイポ
- [ ] H1/H2/H3/Lead/Body/Caption の階層が明確（DESIGN_SYSTEM §3 準拠）
- [ ] 見出し `ink-900`・本文 `ink-700`・補足 `ink-500` の濃淡（`neutral-*` 残りがない／純黒なし）
- [ ] `font-bold` は H1/H2/数値のみ。本文強調は `font-semibold`
- [ ] `tracking-tight` は見出し/数値のみ。日本語本文に詰め文字なし。行間 `leading-relaxed` 以上

### C. コントラスト・可読性（WCAG AA）
- [ ] 本文コントラスト比 4.5:1 以上（`ink-500` より薄い本文がない／旧 `neutral-400` 本文の解消）
- [ ] 淡背景上の緑/ゴールドが薄すぎない
- [ ] フォーカスリングがキーボード操作で視認できる（`focus-visible:outline-primary-500`）

### D. アクセント運用
- [ ] 画面内の緑面積が概ね5%以下（濃色フィナーレを除く）
- [ ] 1ビューポートに塗り緑CTAは1つ（2つ目以降はゴースト）
- [ ] ゴールドは差し色のみ（面塗り・多用なし）。amber は状態用で濫用なし
- [ ] エヤブロウが各H2上にある／重要数値の緑(or ゴールド1点)が効く

### E. カード・額装・影
- [ ] 角丸が用途固定（CTA=xl / カード・額装=2xl / フィナーレ=3xl / バッジ=full）。混在なし
- [ ] カードホバーが "微浮上＋緑極薄シャドウ"（`shadow-lg` 直当てが残っていない）
- [ ] スクショが `DeviceMockup`/`ScreenMockup` 額装＋指定影＋ring。生置きなし（`shadow-2xl` の差し替え済）
- [ ] カード高さがグリッドで揃う（ガタつきなし）

### F. ヒーロー
- [ ] 3秒で「何の製品か・誰のためか・次の行動」が分かる
- [ ] H1は2行以内・緑は1ワード・`tracking-tight leading-[1.1] text-ink-900`
- [ ] 主CTAが最も目立つ。従CTA(ゴースト)と主従がある／`scale` ≤1.02
- [ ] 背景が緑ベタ/写真ベタでなく `bg-white`＋淡光1つ

### G. 視線誘導
- [ ] 上→下に自然に流れる（1セクション1メッセージ／阻害物なし）
- [ ] 各セクションに次への導線 or CTA が明確
- [ ] CTA・統計・スクショが余白で"分離"され目立つ

### H. モバイル崩れ（375 / 768 / 1280）
- [ ] 横スクロールが出ない（はみ出し画像/長文/負マージン暴走なし）
- [ ] グリッドが縦積みに正しく落ちる（`sm:`/`lg:` の解除が効く）
- [ ] タップ領域44px以上、CTAが押しやすい
- [ ] 見出しが折返しで崩れない／`DeviceMockup` の浮遊モバイル(`-bottom-6 -right-4`)が画面外にはみ出して横スクロールを作っていない
- [ ] 比較表 `min-w-[600px]` がモバイルで横スクロール内に収まる（コンテナ外に溢れない）

### I. 一貫性（ページ横断）
- [ ] トップと全 `/features/*` でコンテナ幅・縦リズム・額装・角丸・影が一致
- [ ] Header/Footer が全ページ同一コンポーネント
- [ ] レイアウトの型が共通（DESIGN_SYSTEM §7 骨格）
- [ ] CTA文言・ボタンスタイル・濃色フィナーレ運用が統一

### J. アクセシビリティ／動き
- [ ] `prefers-reduced-motion` でアニメが止まる/弱まる（`FadeIn`/`CountUp` 含む）
- [ ] 画像に意味のある `alt`（装飾は `alt=""`）。`next/image` 使用
- [ ] アニメは1〜2回・控えめ（点滅/バウンス/強パララックスなし）
- [ ] 動画はミュート/`playsinline`、自動再生音声なし

### K. 法務ガード（ビジュアル責任分）
- [ ] 数値（90%/1秒/5秒・各バッジ）に「※自社試算」等の caption がある
- [ ] 比較表に出典・時点の注記がある（誇張優劣表現なし）
- [ ] プラン表記が事実と整合（Premium 等）
- [ ] 煽りコピーをビジュアルで増幅していない（法務レビュー反映）

### 採点の通し方
- C（コントラスト）・H（モバイル崩れ）・K（法務）に NG があれば**ブロッカー**。最優先で修正依頼。
- 全ページ A〜K が OK で揃ったら タスク#11 を completed。

---

## 付録: クイック・クラス・チートシート（DESIGN_SYSTEM §3/§5 から抜粋・運用注記つき）

```text
コンテナ        max-w-6xl mx-auto px-6 sm:px-8
セクション       py-20 sm:py-28 lg:py-32  （重要 lg:py-40 / 背景は white↔surface-50 交互）
エヤブロウ       text-sm font-semibold tracking-wider text-primary-600
H1             text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-ink-900
H2            text-3xl sm:text-4xl font-bold tracking-tight leading-snug text-ink-900
H3            text-xl sm:text-2xl font-semibold leading-snug text-ink-900
Lead          text-lg sm:text-xl leading-relaxed text-ink-700 max-w-2xl
Body          text-base leading-relaxed text-ink-700
Caption/注記   text-sm leading-relaxed text-ink-500   （※自社試算 等）
統計数値        text-5xl sm:text-6xl font-bold tracking-tight text-primary-600 tabular-nums  （差し色は text-accent-600 を1つだけ）
主CTA         inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-primary-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500
従CTA(ゴースト) inline-flex items-center gap-2 rounded-xl border border-surface-200 bg-white px-6 py-3.5 text-base font-semibold text-ink-900 transition hover:border-primary-300 hover:text-primary-600
カード         group rounded-2xl border border-surface-200 bg-white p-6 lg:p-8 transition hover:border-primary-200 hover:shadow-[0_8px_30px_rgba(13,124,102,0.06)]
アイコン丸      size-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5
バッジ         inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700  （実績は bg-accent-50 text-accent-600）
スクショ額装    DeviceMockup/ScreenMockup + shadow-[0_20px_60px_rgba(5,57,43,0.12)] ring-1 ring-surface-200
淡光           bg-primary-50 rounded-full blur-3xl  （モックアップ背後に1つ）
濃色フィナーレ  bg-primary-900 text-white rounded-3xl px-8 py-16 sm:px-16 sm:py-20 text-center  （ボタンは bg-white text-primary-700・1ページ1回）
```

> クラス名（`primary-*`/`surface-*`/`ink-*`/`accent-*`）の数値定義は **`DESIGN_SYSTEM.md` ＋ `tailwind.config.ts` が正**。`ink`/`accent` は DESIGN_SYSTEM §2 の追加トークン案。**未追加なら feat-foundation に `tailwind.config.ts` への追記を依頼**（本書は ink/accent を前提に書いている）。
