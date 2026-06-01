# UI ベンチマーク — 一流アプリ/LP の実装に学ぶ楽マッチLPの打ち手

調査日: 2026-05-31 / 担当: ui-benchmark
対象: 不動産売買AI営業支援CRM「楽マッチ AI」のLP（白基調×緑×ゴールド差し色・上品・余白広め・日本語 / Next.js 16.2.1 + Tailwind v4）

このドキュメントは「一流アプリ/LPが同種のUIパターンをどう作っているか」を調べ、楽マッチLPに適用可能な打ち手を持ち帰るためのもの。発端は「最終CTA等で日本語の大見出しが単語途中で改行（『まず触ってみてく／ださい』『不要で／す』、ボタン『試し／てみる』）」という品質問題のため、**日本語の改行制御を最優先セクション**に置く。

すべての知見は「どのサイトが・どう実装し・楽マッチにどう適用するか」で整理し、出典URLを付す。裏取りできなかった点は「未確認」と明示する。

---

## 0. 現状コードの問題の所在（このLP内）

調査の前提として、現LPの該当箇所を確認した。

- `src/app/globals.css` … `body` に改行制御の指定が**一切ない**。`overflow-wrap` / `word-break` / `line-break` のいずれも未設定。よってブラウザ既定（日本語は文中どこでも改行可）のまま。
- `src/app/page.tsx:234-238` … H1 だけは手動の `<br className="hidden sm:block" />` で改行位置を制御している（PCのみ改行、モバイルは自動折返し）。これは部分的な正解だが、モバイルでは結局ブラウザ任せ。
- `src/app/features/_components/FeatureCTA.tsx:34` … フィナーレCTAの `<h2>`（既定文言「まず触ってみてください。説明は不要です。」）に改行制御が**全くない**。`max-w-2xl` の中で `sm:text-4xl` の大見出しが折り返されるため、**ここが報告された「まず触ってみてく／ださい」「不要で／す」の発生源**。
- 同 `:42` のボタンラベル（`ctaLabel`）も素の `<a>` 内テキストで、`white-space` 制御がないため「試し／てみる」が起こりうる。
- フォントは Tailwind v4 のテーマ変数 `--font-sans`（`globals.css` の `body` で `var(--font-sans), system-ui...`）。

→ 後述の打ち手は、この3層（グローバル既定・見出し用クラス・ボタン）に対応させて書く。

---

## 1.【最重点】日本語サイトのタイポグラフィと改行制御

### 1-1. なぜ日本語の見出しは単語途中で割れるのか

英文は単語間に半角スペースがあり、ブラウザはスペース位置で改行する。日本語は分かち書きをしないため、ブラウザは**文字と文字の間ならどこでも改行できる**とみなす。結果、大見出しを狭い幅（中央寄せ・`max-w-2xl` など）に流し込むと「ください」「不要です」のような語の途中で割れる。これは CSS を当てていない素の状態の挙動であり、現LPのフィナーレCTAがまさにこの状態。
出典: [MDN word-break](https://developer.mozilla.org/ja/docs/Web/CSS/word-break) / [ICS MEDIA 折り返し最新版](https://ics.media/entry/240411/)

### 1-2. 解決手法の全体像（4段階・下にいくほど制御が強い）

| 手法 | 何をするか | 品質 | ブラウザ対応 | 楽マッチでの位置づけ |
|---|---|---|---|---|
| (A) グローバル安全弁 | `overflow-wrap:anywhere` + `word-break:normal` + `line-break:strict` を `body` に | はみ出し防止・禁則は効くが、語の途中改行は防げない | Chrome80+/FF65+/Safari15.4+ | **土台として全ページに必須** |
| (B) `word-break:auto-phrase` | 文節（文の意味の塊）で自動改行。Google BudouX 由来のML判定 | 高い。ただし機械判定なので稀に不自然 | **Chrome/Edge 119+ のみ。Safari/Firefox 未対応** | 見出しに付ける「対応ブラウザでの底上げ」 |
| (C) `text-wrap:balance` / `pretty` | 各行の長さを均す（balance=中央寄せ向け / pretty=行頭揃え向け） | 見栄え向上。改行位置そのものの制御ではない | balance: Chrome114+/Safari17.5+ / pretty: Chrome117+/Safari26 | 見出しに併用 |
| (D) 手動 `<wbr>`・ゼロ幅スペース・`inline-block`で句を包む / 意図的`<br>` | 設計者が改行可能/不可の位置を明示。全ブラウザで確実 | **最も確実**。ただし手間・文言変更時に保守が要る | 全ブラウザ | **重要見出し（Hero/フィナーレCTA/ボタン）は必ずこれを併用** |

結論の方針: **(A)を土台に全ページへ。重要見出しは(D)で確実に制御し、その上に(B)(C)をプログレッシブエンハンスメントとして重ねる。** 「Chrome系では文節改行が効く・他ブラウザでも最低限崩れない」状態を作る。
出典: [ICS MEDIA](https://ics.media/entry/240411/) / [Chrome for Developers: 4 i18n features](https://developer.chrome.com/blog/css-i18n-features) / [yuheiy 日本語におけるtext-wrapの運用](https://yuheiy.com/2024-07-22-text-wrap-in-japanese)

### 1-3. 制作品質の高い国内サイトが実際どうしているか

- **yuheiy（漢字とかな等の権威的フロントエンド技術者）の推奨パターン**（実装の結論として最も信頼できる）:
  - 行頭揃えの見出し: `font-feature-settings:'palt'; text-wrap:pretty; word-break:auto-phrase;`
  - 中央揃えの見出し: `font-feature-settings:'palt'; text-wrap:balance; word-break:auto-phrase;`
  - **本文はベタ組みが原則**で `text-wrap` 系は当てない。`text-wrap` / `auto-phrase` は**見出し・リード・キャプションに限定**する。
  - `auto-phrase` はサポートが不十分なので、必要なら BudouX（JS）を併用する、というのが彼の結論。
  出典: [yuheiy](https://yuheiy.com/2024-07-22-text-wrap-in-japanese)
- **SmartHR Design System**: 游ゴシック採用（字面が小さくゆとりがあり長文向き）。見出しで `line-height:1` を禁止し、詰めたい場合は `text-box-trim`/`text-box-edge`（ハーフレディング除去）で対応。段落の折返しのガタつきは行幅を `round()` で全角1文字相当（`1ic`）に丸めて整える、という運用も提示。→ **「行間を詰めすぎない・トリムで詰める」は楽マッチの大見出し（`leading-[1.1]`等）にも示唆的**。
  出典: [SmartHR タイポグラフィ基本要素](https://smarthr.design/basics/typography/) / [SmartHR Text コンポーネント](https://smarthr.design/products/components/text/)
- **Google（BudouX 提供元）**: 日本語の「読みやすい改行」のために軽量分かち書き器 BudouX を公開。`word-break:auto-phrase` の裏側はこの BudouX の C++ 移植（AdaBoost による文節境界判定）で、`lang="ja"` 属性が必要。
  出典: [Google Developers Japan: BudouX](https://developers-jp.googleblog.com/2023/09/budoux-adobe.html) / [Chrome for Developers](https://developer.chrome.com/blog/css-i18n-features)

### 1-4. ブラウザ対応の正確な現状（2026年5月時点・要点）

- `overflow-wrap:anywhere` … Chrome80+ / Firefox65+ / Safari15.4+。実質全環境で使える。土台に最適。
- `line-break:strict`（禁則を厳格化。句読点・閉じ括弧が行頭に来るのを防ぐ）… 主要ブラウザ対応。
- `word-break:auto-phrase` … **Chrome/Edge 119+ のみ。Safari・Firefox は未対応**。日本のスマホは Safari(iPhone) が多いため、**これ単独に頼ると iPhone で文節改行が効かない**。必ず(D)の手動制御か BudouX を併用すること。
- `text-wrap:balance` … Chrome114+ / Safari17.5+。`text-wrap:pretty` … Chrome117+ / Safari26。Firefox は限定的。**いずれも「効けば嬉しい」程度の上乗せ**として扱い、これがないと崩れる設計にはしない。
- `text-autospace`（和欧間の自動スペース）/ `text-spacing-trim`（CJK約物の詰め）… Chrome120前後で実験的〜既定化が進行中。安定運用にはまだ早い（未確認の挙動あり）。
出典: [Chrome for Developers](https://developer.chrome.com/blog/css-i18n-features) / [ICS MEDIA](https://ics.media/entry/240411/) / [コリス: i18n向けCSS4機能](https://coliss.com/articles/build-websites/operation/css/css-4-features-for-i18n.html)

### 1-5. Safari/Firefox を含めた確実な解（BudouX を Next.js 16 で使う）

`auto-phrase` が効かない iPhone Safari でも文節改行を実現する手段が BudouX（JS/分かち書きライブラリ）。本LPは Next.js 16 のサーバーコンポーネント主体なので、**クライアントJSを足さずビルド/サーバー側で分割する**のが理想。

- 方式1（推奨・JSランタイム不要）: サーバーコンポーネントで `budoux` を import → `loadDefaultJapaneseParser()` で見出し文字列を分割し、各文節を `<span style="display:inline-block">` で包んで描画。`inline-block` の塊は途中で割れないため、文節単位の改行になる。クライアントへJSを送らない。
- 方式2: Web Component `<budoux-ja>...</budoux-ja>` で囲むだけ。手軽だがカスタム要素のJSが要る・SSRと相性に注意。
- 方式3: `parser.translateHTMLString()` をビルド時に通して `<wbr>` を埋め込んでおく（ランタイムゼロ）。
- 注意: 機械判定なので固有名詞やカタカナ語は意図と違う位置で割れることがある。**Hero やフィナーレCTAのような「絶対に崩したくない短い見出し」は BudouX に任せず手動(D)が安全**。BudouX は本文に近い長めのリード/説明文の自動改行向き。
出典: [Next.js(React)でBudouXを使う](https://zenn.dev/minojiro/articles/772ba9be722255) / [Google Developers Japan: BudouX](https://developers-jp.googleblog.com/2023/09/budoux-adobe.html)
※ Next.js 16 のサーバー/クライアント境界・ハイドレーションの作法は、実装前に `node_modules/next/dist/docs/` の該当ガイドで裏取りすること（AGENTS.md）。本項のNext.js連携の細部は**未確認**（一般的なReact例からの推定を含む）。

### 1-6. 楽マッチへの具体的な適用提案（改行制御）

**(1) グローバル土台**（`src/app/globals.css` の `body` に追記）— 全ページのはみ出し・禁則をまず保証する:
```css
body {
  font-family: var(--font-sans), system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-wrap: anywhere; /* 長いURL/英単語のはみ出し防止 */
  word-break: normal;      /* 既定の改行規則を尊重（break-allは使わない） */
  line-break: strict;      /* 句読点・括弧の禁則を厳格化 */
}
```
出典: [ICS MEDIA](https://ics.media/entry/240411/)

**(2) 見出し用ユーティリティ**（重要見出しに付与。Chrome系で文節改行・全環境で行均し）:
```css
.heading-ja {           /* 中央寄せ見出し（Hero/フィナーレCTA）向け */
  text-wrap: balance;
  word-break: auto-phrase;   /* Chrome/Edgeでのみ効く上乗せ */
  font-feature-settings: 'palt';
}
.heading-ja-start {     /* 行頭揃え見出し向け */
  text-wrap: pretty;
  word-break: auto-phrase;
  font-feature-settings: 'palt';
}
```
※ Tailwind v4 なら `@utility` でこれらを定義してクラス化できる（実装時に v4 の `@utility` 記法を `node_modules` のドキュメントで確認）。

**(3) フィナーレCTA `FeatureCTA.tsx` の確実な修正**（報告バグの直接対処・(D)手動制御）:
- `<h2>` に上記 `.heading-ja` 相当を付け、さらに**意図的な改行を `<br className="hidden sm:block" />` で明示**するか、文節を `inline-block` の `<span>` で包んで「ください」「不要です」が割れないようにする。既定文言なら例として「まず触ってみてください。／説明は不要です。」の句点で改行を切る設計が安全。
- ボタンラベルは `<a>` に `whitespace-nowrap`（Tailwind）を付け、「試してみる」が割れないようにする。短い CTA 文言は基本これでよい。

**(4) Hero `page.tsx`**: 既存の `<br className="hidden sm:block" />` は残しつつ、`<h1>` に `.heading-ja` を併用。モバイルでもブラウザ任せにせず、必要なら文節 `inline-block` で割れを防ぐ。リード文（長め）は BudouX 方式2/3 の候補。

**優先度**: (1)→(3) を最優先（バグ直撃箇所）。(2)(4) はその上の品質向上。

---

## 2. 国内外SaaSのUIパターン（Hero／フィナーレCTA／機能ページ／余白／モーション）

データ裏付けのある [Evil Martians「100のdevtool LP研究(2025)」](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025) と、[Stripe/Linear/Vercel のプレミアムUI解説](https://mantlr.com/blog/stripe-linear-vercel-premium-ui) / [4つの設計原則](https://www.pixeldarts.com/en/post/four-design-principles-behind-stripe-linear-and-vercel) を中心に整理。

### 2-1. Hero見出しサイズ設計（モバイル）

- **中央寄せ・大見出し＋直下にビジュアル**が最頻パターン（devtool LPの主流。左右分割は例外）。楽マッチHeroは中央寄せ＋下にモックアップで既にこの型に沿っている。
- サイズは `clamp()` でビューポート連動にするのが2026年の標準。例: `font-size: clamp(2rem, 1.2rem + 4vw, 3.75rem)`。メディアクエリ分岐より滑らかで、モバイルで過大化しない。`line-height` も `clamp()` 可。
  出典: [clamp()レスポンシブフォント](https://shogo-log.com/clamp-usage/) / [azukiazusa clamp()](https://azukiazusa.dev/blog/responsive-font-size-clamp/)
- モバイル本文は14〜16px目安、見出し下に1行分の余白を入れると可読性が上がる。
  出典: [LPの最適サイズ/レスポンシブ](https://wacul-ai.com/blog/creative/landing-page/lp-size/)
- 楽マッチへの適用: 現状 `text-4xl sm:text-5xl lg:text-6xl` の段階指定で機能はしているが、**`clamp()`化で中間幅(タブレット)のガタつきを解消**できる。`leading-[1.1]` は大見出しでは詰まり気味になりやすい（SmartHRの「line-height:1禁止」に通じる）ので、文節改行を入れる前提で 1.15〜1.25 程度の余裕を検討。

### 2-2. フィナーレ（最終）CTA

- 「**big and loud**・背景をはっきり分離・コンバージョン目標は1つに絞る」が定石。楽マッチの `bg-primary-900` の濃色ブロック＋白文字＋白ボタンはこの定石に合致しており方向性は正しい。
- 早期段階のチームでは、ボタンより**日程調整ウィジェット埋め込み**の方が質の高いリード獲得に効いた事例あり（楽マッチは無料トライアル直行なので現状の signup 誘導でよいが、商談獲得を狙うなら選択肢）。
- 上部のCTAは**主＋副の2つ**が標準。主ボタンは製品固有の動詞（"Start building"等）、副は軽い見た目（"View docs"）。**楽マッチのCTA文言は「試してみる」のような汎用語より、製品の動作を表す語**（例「無料で物件を登録してみる」等）の方が定石に沿う。※具体文言はマーケ判断。
  出典: [Evil Martians](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)
- **改行品質との接続**: フィナーレCTAこそ「big and loud」＝最も大きい見出しなので、**1章の手動改行制御を最優先で当てるべき場所**。大きい＝割れると最も目立つ。

### 2-3. 機能詳細ページ構成

- 機能の語り方は弱→強で「機能リスト < 行動喚起文 < 課題ナラティブ < 大胆な断定 < ミッション」。**課題起点（ペイン）→解決の物語が感情的に強い**。楽マッチは `painPoints`（同じ物件を何媒体にも手入力…）で既に課題起点を持っており、これは強い型。
- レイアウトは「フル幅スクショ＋説明」「左右交互（チェス）配置」「アイコン+テキストカード」「Bento グリッド」「タブ」「ステップ」等。楽マッチの zigzag（交互配置）は王道。
- 体験談（社会的証明）は**手動キュレーションが基本**で、ページ下部だけでなく**該当機能の隣に短い引用を文脈配置**するのがより効く。
  出典: [Evil Martians](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)
- 製品ビジュアルは**抽象イラストより実画面スクショ**が強い（楽マッチの DeviceMockup 路線は正しい）。

### 2-4. 余白リズム

- Stripe/Linear/Vercel 共通の指針は「**色は抑制・タイポグラフィをブランドに・余白は必要と感じた量の倍**」。要素間を詰めすぎないことがプレミアム感の源。楽マッチの「余白広め」方針はこの系譜。
- Stripeは12カラム1280px、Linearは1024pxで高密度、と**グリッド幅で性格が変わる**。楽マッチは `max-w-6xl`/`max-w-3xl` 等を使い分けており、セクションごとの最大幅の一貫性を点検すると締まる。
  出典: [4つの設計原則](https://www.pixeldarts.com/en/post/four-design-principles-behind-stripe-linear-and-vercel) / [Mantlr](https://mantlr.com/blog/stripe-linear-vercel-premium-ui)
- 8pxベースの間隔スケール（8/16/24/32/48/64…）に寄せると縦リズムが揃う（一般的定石。Tailwindの `space`/`py` も8pxベース）。

### 2-5. マイクロインタラクション

- プレミアムUIの不変点は「**操作の応答性・抑制された色・作り込まれた微状態（hover/focus/active/disabled/loading）・物理メタファ尊重**」。**6状態すべてを必ず定義**するのが流儀。
- モーションの目安（一般的なデフォルト値として紹介されている）: hover 約150ms / 状態変化 約300ms / ページ遷移 約500ms。**ブラウザ既定のイージングを使わず、カーブ（ease-in/out/spring）と時間を定義して一貫適用**。
  出典: [Mantlr](https://mantlr.com/blog/stripe-linear-vercel-premium-ui) / [4つの設計原則](https://www.pixeldarts.com/en/post/four-design-principles-behind-stripe-linear-and-vercel)
- 楽マッチへの適用: `FeatureCTA` ボタンは既に `transition hover:bg-surface-50 hover:shadow-md` と `focus-visible` を持ち良好。`motion-reduce:transition-none` 配慮も◎。**不足は `active`(押下) と `disabled` の明示**。全ボタンで `transition-[...] duration-150 ease-out` のように**時間とイージングを共通トークン化**すると統一感が出る。過度なアニメは避ける（devtool LPは「flashyを避ける」が定石）。
- ※ Mantlr/設計原則記事は**具体的なpx・hex・msの規定値は提示していない**（"invariantは値でなく原則"と明言）。上記msは一般的デフォルトの紹介値であり**各社の公式規定値ではない＝未確認**。一次情報は Linear Method / Rauno Freiberg "Devouring Details" 参照。

---

## 3. 適用提案サマリ（楽マッチが今すぐ取るべき打ち手・優先順）

1. **【最優先・バグ直撃】`FeatureCTA.tsx` の見出し＆ボタンの改行制御**: `<h2>` に手動 `<br>`/文節`inline-block`＋`text-wrap:balance`＋`word-break:auto-phrase`、ボタンに `whitespace-nowrap`。「まず触ってみてく／ださい」「試し／てみる」を根絶。（→1-6(3)）
2. **【最優先】グローバル土台**: `globals.css` の `body` に `overflow-wrap:anywhere; word-break:normal; line-break:strict;`。全ページの崩れ・禁則を保証。（→1-6(1)）
3. **見出しユーティリティ整備**: `.heading-ja`/`.heading-ja-start`（Tailwind v4 `@utility`）を作り、Hero/各見出しに付与。Chrome系で文節改行、全環境で行均し。（→1-6(2)(4)）
4. **iPhone対応の確実化**: Safari で文節改行が効かない問題に対し、絶対崩したくない短い見出しは手動制御、長めのリードは BudouX（サーバー側分割でJS不要）を検討。（→1-5）
5. **Heroサイズの `clamp()`化**＋`line-height` を1.15〜1.25に緩める（詰めすぎ回避）。（→2-1）
6. **ボタンの微状態を6つ揃える**（active/disabled追加）＋transitionの時間/イージングをトークン化。（→2-5）
7. **証言の文脈配置・CTA文言を製品動詞へ**（マーケ判断含む）。（→2-2, 2-3）

実装時の鉄則: `auto-phrase`/`text-wrap` は「効けば上乗せ」のプログレッシブエンハンスメント扱いとし、**それ無しでも崩れない土台(A)＋重要箇所の手動制御(D)を必ず先に敷く**。Next.js 16 / Tailwind v4 の記法（`@utility`・サーバー/クライアント境界）は実装前に `node_modules` のドキュメントで裏取りする（AGENTS.md厳守）。

---

## 4. 出典一覧

日本語改行・タイポグラフィ:
- [yuheiy: 日本語におけるtext-wrapプロパティの運用](https://yuheiy.com/2024-07-22-text-wrap-in-japanese)
- [Chrome for Developers: Introducing four new international features in CSS](https://developer.chrome.com/blog/css-i18n-features)
- [ICS MEDIA: 文章の折り返し指定のCSS最新版](https://ics.media/entry/240411/)
- [MDN: word-break](https://developer.mozilla.org/ja/docs/Web/CSS/word-break) / [MDN: overflow-wrap](https://developer.mozilla.org/ja/docs/Web/CSS/overflow-wrap)
- [コリス: 日本語が読みやすくなるi18n向けCSS 4機能](https://coliss.com/articles/build-websites/operation/css/css-4-features-for-i18n.html)
- [Google Developers Japan: BudouX 読みやすい改行のための軽量な分かち書き器](https://developers-jp.googleblog.com/2023/09/budoux-adobe.html)
- [Next.js(React)でBudouXを使って日本語の改行を整える](https://zenn.dev/minojiro/articles/772ba9be722255)
- [SmartHR Design System: タイポグラフィ（基本要素）](https://smarthr.design/basics/typography/) / [Text コンポーネント](https://smarthr.design/products/components/text/) / [デザイントークン:タイポグラフィ](https://smarthr.design/products/design-tokens/typography/)

SaaS/LP パターン・余白・モーション:
- [Evil Martians: We studied 100 devtool landing pages (2025)](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)
- [Four design principles behind Stripe, Linear, and Vercel](https://www.pixeldarts.com/en/post/four-design-principles-behind-stripe-linear-and-vercel)
- [Mantlr: How Stripe, Linear, and Vercel Ship Premium UI](https://mantlr.com/blog/stripe-linear-vercel-premium-ui)

レスポンシブ・clamp:
- [clamp()を使ってフォントサイズはレスポンシブで（しょーごログ）](https://shogo-log.com/clamp-usage/)
- [clamp()関数を使用したレスポンシブなフォントサイズ（azukiazusa）](https://azukiazusa.dev/blog/responsive-font-size-clamp/)
- [LPの最適サイズとレスポンシブ対応（WACUL）](https://wacul-ai.com/blog/creative/landing-page/lp-size/)

未確認事項（要追検証）:
- 各社プレミアムUIの具体的なms/px/hex規定値（記事は原則のみ提示。一次情報=Linear Method, Rauno Freiberg "Devouring Details"）。
- `text-autospace`/`text-spacing-trim` の安定運用可否（実験的段階）。
- Next.js 16 でのBudouXサーバー側分割の正確な作法（`node_modules/next/dist/docs/` で要裏取り）。
