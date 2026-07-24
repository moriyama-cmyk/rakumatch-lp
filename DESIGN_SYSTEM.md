# 楽マッチ AI — LP デザインシステム

不動産「売買仲介」会社の経営者（2〜20名）に向けた、上品・信頼・読みやすさを最優先とする
ランディングページ／機能詳細ページの共通デザイン指針。白×緑のブランドを維持しつつ、
「モダンだが汎用的」から「プロ顔負け」へ引き上げることを目的とする。

> 実装注意（必読）: このリポジトリの Next.js は学習データと挙動が異なる破壊的変更を含む。
> コードを書く前に必ず `node_modules/next/dist/docs/` の該当ガイドを読むこと（`AGENTS.md` 準拠）。
> Tailwind は v4。トークンは `tailwind.config.ts` の `primary`（緑）/ `surface`（オフ白）を正とする。

> **2026-07-24 実装準拠に改訂**: §3(タイポスケール)／§4(余白・セクションリズム)／§5(コンポーネントパターン) を
> `tailwind.config.ts` と `src/components/lp/ui/` 配下の実コードに合わせて全面更新した（旧版はLP刷新前の初期構想メモで、
> `rounded-xl`ボタン・`rounded-full`バッジ・`accent`/`ink`が「追加提案」のままになっているなど実装と乖離していた＝死文化）。
> ボタンの角丸(`rounded-xl`→実際は`rounded-lg`)・バッジの角丸(`rounded-full`→実際は`rounded-md`)のように、
> 食い違いは**実装側の値で上書き**した。§1(参照ギャラリー)／§2(カラー原則)／§6(モーション原則)／§8(画像方針)は
> 引き続き思想として有効なため変更していない（§2のトークン値は現行`tailwind.config.ts`とも整合している）。

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

## 3. タイポスケール（実装準拠）

実装は `tailwind.config.ts` の `fontSize` 拡張（`display-2xl`〜`display-md`・clampベース）と、
素の Tailwind サイズユーティリティ（`text-lg`/`text-xl`等）の併用。本文の `leading-relaxed` は
Tailwind既定(1.625)ではなく **`1.85`に上書き済み**（`lineHeight.relaxed`。日本語の長文向け）。

| 役割 | 実クラス | 備考 |
|---|---|---|
| 見出しトークン `display-2xl` | `text-display-2xl` | clamp(2.125rem,6.4vw,4rem)・leading 1.16・-0.005em・700。**現状どのセクションからも呼ばれていない予約枠**（Hero見出しは下記の理由で独自clampを使用）。 |
| 見出しトークン `display-xl` | `text-display-xl` | clamp(1.75rem,4.4vw,3rem)・leading 1.24・700。核心宣言セクションのみ（`SolutionCore`「楽マッチAIが、やること。」／`FinalCta`見出し）。 |
| 見出しトークン `display-lg` | `text-display-lg` | clamp(1.5rem,3.6vw,2.5rem)・leading 1.32・600。**H2の既定**。大半のセクション見出しがこれ。 |
| 見出しトークン `display-md` | `text-display-md` | clamp(1.25rem,2.6vw,1.625rem)・leading 1.45・600。H2ではなく「セクション締めの一文」の強調（`Problem`/`Why`末尾）に使用。 |
| Hero のH1 | 独自clamp `[font-size:clamp(1.9rem,6.4vw,4rem)]`（メインコピー）／エヤブロウ行 `[font-size:clamp(0.95rem,3.6vw,1.45rem)]` | `display-2xl`を使わずベタ書きclamp。理由=LCP要素につき375px幅での折返しかたまり長を1字単位で調整した実測値が必要だったため（`Hero.tsx`のコメント参照）。**トークン化されていない既知の逸脱**。新規に真似しない。 |
| H3（カード見出し・小見出し） | `text-lg font-bold text-ink-900` または `text-xl font-bold text-ink-900` | 専用トークンなし。プレーンなTailwindサイズ＋`font-bold`の組み合わせが実質のH3規約。 |
| セクション頭のラベル（旧エヤブロウ） | `<Badge>`コンポーネント（`ui/Badge.tsx`） | クラス文字列を手書きしない。§5参照。 |
| Lead / 本文 | `text-base leading-relaxed text-ink-700`（`leading-relaxed`=1.85） | セクション導入文・本文標準。 |
| 本文（やや広め） | `text-lg leading-[1.8] text-ink-700` | `ui/FeatureSplit.tsx`の説明本文で使用。 |
| カード本文 | `text-sm leading-[1.7] text-ink-700` | カード内の短い説明文で頻出（`Problem`/`Ingest`/`AiPartner`/`CustomerApp`等）。 |
| Caption/注記 | `text-xs text-ink-500` または `text-sm text-ink-500` | 「※」注記・出典。 |
| 統計の数値 | `text-5xl font-bold text-accent-600`（Pricingのプラン価格）／`text-3xl font-bold text-ink-900`（ドーナツ図中央値等） | ゴールドは金額など「際立たせたい数値」限定。`tabular-nums`併用。共通の`CountUp`コンポーネントは無い（都度コード製）。 |

`ink`色の使い分け（`tailwind.config.ts`のコメントを正とする）:
`ink-900`見出し／`ink-800`・`ink-700`本文（`ink-700`が既定）／`ink-600`テキスト可（7.57:1）／
`ink-500`注記（5.46:1）／`ink-400`・`ink-300`は装飾専用でテキスト使用禁止（コントラスト不足）。

ルール:
- 見出しは `display-*` トークンを優先する。H3以下を新規に作る場合も、既存の `text-lg`/`text-xl font-bold text-ink-900` パターンに合わせ、独自クラスを増やさない。
- 本文の行間を詰めない。`leading-[1.7]`/`leading-[1.8]`のカスタム値は既存パターンを流用し、新しい微調整値を増やさない。
- `accent`(ゴールド)は24px以上の太字テキストか`accent-700`(24px未満)のみ。面塗りは禁止（`tailwind.config.ts`のコメント参照）。

---

## 4. 余白・セクションリズム（実装準拠）

実装は `ui/Section.tsx` の `spacing` 4段階に統一されている。新規セクションもこの4値以外を使わない。

| `spacing`値 | 実クラス | 用途 |
|---|---|---|
| `sm` | `py-10 sm:py-14` | つなぎ（帯として通過させるセクション）。`EraShift`/`Security`等。 |
| `md`（既定） | `py-16 sm:py-24` | 通常。 |
| `lg` | `py-20 sm:py-28` | 通常（強）。`CustomerApp`/`Ingest`等。 |
| `xl` | `py-28 sm:py-40 lg:py-52` | 山場。ページ内で `#problem`/`#why`/`#pricing`/`#cta` の4箇所のみ使用。 |

最大幅は `ui/Container.tsx` が正:
- 既定 `max-w-container`(1180px)、`narrow` prop指定時 `max-w-container-narrow`(860px)。横paddingは `px-5 sm:px-6 lg:px-8` で固定。
- テキスト主体の見出しブロックは `mx-auto max-w-2xl`（セクション導入部）、Hero本文は `max-w-3xl`。

**背景とセクション境界**（2026-07-24 Phase2で確定。以後この方式のみ）:
- 背景は `bg-white` と `bg-surface-100` の**2値を交互**に割り当てる（隣接セクションは必ず異なる色になるようにpage.tsxの並び順で確認する）。旧版にあった`surface-50`/`surface-150`を交えた3値運用・`border-t border-surface-200`単体の区切りは廃止した。
- 章の区切りは「章の先頭セクションにのみ `border-t-2 border-primary-600/20` を付ける」の1方式のみ。現在の章頭は `Problem`(課題章)／`CustomerApp`(機能章)／`Why`(証拠章)／`Pricing`(料金章)の4箇所。
- Hero の `bg-fade-primary` と `FinalCta` 内側のダーク面(`bg-surface-900`)はこの2値ルールの対象外（例外として維持）。

グリッド: 機能カード3列は `grid gap-5 md:grid-cols-3`。2カラム（テキスト＋ビジュアル）は独自実装せず `ui/FeatureSplit.tsx` を使う（`grid items-center gap-10 lg:grid-cols-2 lg:gap-16`、両カラムに`min-w-0`必須＝コンテンツ実寸によるはみ出し防止）。

---

## 5. コンポーネントパターン（実装準拠。クラス文字列を手書きせず既存コンポーネントを使う）

### ボタン — `ui/GlowButton.tsx`
- 角丸は **`rounded-lg`**（旧版記載の`rounded-xl`ではない）。
- `variant`: `primary`(既定・`bg-primary-600`＋`shadow-cta`) / `secondary`(白地＋枠線) / `ghost`(テキストのみ) / `onDark`(FinalCta専用・白系半透明の縁取り)。
- `size`: `sm`(h-10) / `md`(h-12・既定) / `lg`(h-14)。
- **「GlowButton」という名前だが発光(グロー)効果は無い**（歴史的命名）。実装は単色＋柔らかい影のみで、発光演出はクリーン路線への転換で撤去済み。新規に光らせる実装を足さない。

### 強調テキスト — `ui/GradientText.tsx`
- **「GradientText」という名前だがグラデーションはかかっていない**（歴史的命名）。実装は単色の`text-primary-700`(既定)または`text-accent-600`(`variant="gold"`)。ネオン/グラデ演出はクリーン路線への転換で廃止済み。

### バッジ／チップ／タグ — `ui/Badge.tsx`（2026-07-24 Phase2で4 variant に統合）
インライン実装（呼び出し側で`<span className="...">`を都度書くこと）は禁止。必ず`Badge`を使う。

| `variant` | 見た目 | 色 | 用途 |
|---|---|---|---|
| `eyebrow`（既定） | `rounded-md`・淡緑地・枠あり | 色まで完結 | セクション先頭のラベル。ほぼ全セクションで使用。 |
| `chip` | `rounded-md`・白地・緑枠 | 色まで完結 | Hero のアンカリングチップ（価格等）。 |
| `tag` | 形（`inline-flex items-center gap-1.5 text-xs`）のみ。**色・角丸・余白・太さは持たない** | `className`で都度指定 | `Voices`の営業/お客様ラベル、`Pricing`の「0円ゾーン」「AI利用枠」など、形は同じで色/角丸/余白が違うタグ全般。 |
| `onDark` | `rounded-md`・白地・緑枠（やや大きめ） | 色まで完結 | `FinalCta`のダーク面専用。 |

`tag`は`cn`（tailwind-merge非対応の単純連結。`lib/cn.ts`）が既存クラスと衝突しないよう、
意図的に色・角丸・余白のユーティリティを一切持たない設計にしてある。新しい色/形のタグが要る場合は
`tag`＋`className`で組む（新variantを増やす前にまず`tag`で足りないか検討する）。

### カード（機能/価値）
- 標準形: `rounded-xl border border-surface-200 bg-white p-*`。角丸は`rounded-xl`（旧版と一致）。
- **hoverは実際にクリックできるカード（`href`を持つ）だけに付ける**（2026-07-24 Phase2で確定）。`hover:shadow-soft`/`hover:shadow-soft-md`＋`transition-shadow duration-200`は、内部にリンクを持つカードのみに使う（例: `FeatureDigest`の「詳しく見る」リンク付きカード、`FeatureHub`のアンカーカード）。クリックできない箱にホバー影を付けない。
- 影のトークンは`tailwind.config.ts`の`boxShadow`: `soft`(通常のカード浮き) / `soft-md`(ホバー時・やや強め) / `soft-lg`(モック枠等の強調) / `cta`(GlowButton primaryのみ)。

### セクションヘッダ（共通）
```tsx
<Reveal>
  <Badge>ラベル</Badge>
</Reveal>
<Reveal delay={0.05}>
  <h2 className="mt-4 text-display-lg text-ink-900">見出し</h2>
</Reveal>
<Reveal delay={0.1}>
  <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-700 sm:mt-6">
    リード文。
  </p>
</Reveal>
```
親divに`mx-auto max-w-2xl text-center`を付けて中央寄せするのが既定。`Reveal`の`delay`は0.05刻みで積み上げる。

### 統計ブロック
`Problem.tsx`のドーナツ図・`Pricing`のプラン価格のように、統計/数値は個々にコード製で実装（共通の
`CountUp`/`Stat`コンポーネントは存在しない）。数値には必ずcaption(`text-xs text-ink-500`)で
出典・「※イメージ図」等を添える（法務地雷回避、既存パターンを踏襲する）。

### CTAセクション（濃色フィナーレ）
`FinalCta.tsx`のみに存在する専用実装。`Section`の外側は`bg-white border-t-2 border-primary-600/20`、
内側の`bg-surface-900`の角丸ボックスが唯一の濃色面。新規に濃色セクションを増やさない（1ページ1回を維持）。

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
