# ビジュアルQA ノート（タスク#3）

担当: visual-qa（チーム lp-redesign）／ 実施日: 2026-06-02
対象: `src/app/page.tsx`（トップLP）。ベンチ = notion.com/ja・Stripe・Linear の「余白・1セクション1メッセージ・階層・散らからなさ」。
実機検証: Playwright（Chromium・dev サーバ http://localhost:3000）。デスクトップ 1440 / モバイル 390 / 最小 320 を実測。

> 注意: 文言（コピー）は変更していない。FeatureHub.tsx は一切編集していない。検出したコピー/構成の気づきは末尾に「team-lead への申し送り」として記載のみ。

---

## 検出した問題 → 対応

### 1.【修正済】320px で横スクロールが発生（実害バグ）
- 症状: 画面幅 320px で `window.scrollTo(500,0)` が効き、ページ全体が横に約76pxスクロールしてしまう（`documentElement.scrollWidth` 403 > clientWidth 308）。狭い端末や文字拡大時にレイアウトが横ズレする。
- 原因: 比較表の `min-w-[720px]`（`#comparison` の table）。`overflow-x-auto` ラッパー内にあり視覚的にはクリップされるが、ページ全体の `scrollWidth` を押し広げて横スクロールを誘発していた。Hero の装飾ぼかし円(`w-[500px]`)は `overflow-hidden` で抑止済みのため無関係と切り分け済み（非表示にしても scrollWidth は変わらず＝表が主因と確定）。
- 対応: ルートコンテナ `<div className="min-h-screen ...">` に **`overflow-x-clip`** を付与（`page.tsx`）。
  - `overflow-x-hidden` ではなく `overflow-x-clip` を採用した理由: hidden はスクロールコンテナを生成し `position: sticky` のヘッダーを壊す恐れがある。clip はスクロールコンテナを作らないためヘッダーの sticky を維持できる。実機で「横スクロール 0px・ヘッダーは scroll 時 top:0 で sticky 維持・比較表は内部で横スクロール可能」を確認済み。
- 検証: 修正後 320px で `pageScrollX: 0` / `htmlScrollWidth == clientWidth(308)`。比較表は引き続き内部横スクロール可（`scrollWidth 720 > clientWidth 259`）。ヘッダー sticky 維持。
- before/after: `qa-screenshots/mobile-320-hero.png`（fold は元々崩れていない）／構造はDOM実測で確認。

### 2.【修正済】2カラムセクションが3連続で同じ向き＝単調（implementer 申し送りの裏取り）
- 症状: 「お客様連動アプリ(堀①)」「逆引きマッチング(堀②)」「専属AI」の3セクションがすべて **テキスト左／ビジュアル右** で連続し、リズムが単調（Notion/Stripe/Linear は左右交互＝ジグザグでリズムを作る）。
- 対応: 中央の **マッチング(堀②)セクションだけ lg で左右反転**（ビジュアル左／テキスト右）。
  - 実装: `#matching` のグリッド子に `lg:order-*` を付与（テキスト `FadeIn className="lg:order-2"` / 画像 `FadeIn className="lg:order-1"`）。**モバイルは text→visual の順序を維持**（order は lg 以上のみ適用）。
  - 堀①は独自SVGフロー図、専属AIは右カラムが縦積み構成のため、両端は自然な向きを保ち、間の1本だけ反転＝最小介入でジグザグ化。
- 検証: 1440 で「画像 left=170 / 見出し left=746＝画像が左」、390 で「見出し top < 画像 top＝テキスト先頭」を実測。before=`desktop-matching.png`（テキスト左）／after=`desktop-matching-zigzag.png`（画像左）。

---

## 検証して「問題なし」を確認した項目（デスクトップ1440）

- **Hero**: バッジ1個＋H1＋エヤブロウ＋リード＋CTA2＋マイクロコピー＋ベネフィット3カード＋デバイスモック。文字の壁になっておらず1セクション1メッセージ。価値が一読で伝わる。`desktop-hero.png`。
- **Problem(3カード)**: アイコン＋課題＋赤コスト行（※自社試算 注記が同一視界）。`desktop-problem-stats.png`。
- **Stats**: 90%/1秒/5秒の大型数値＋区切り＋「※いずれも自社利用に基づく試算です。」。`desktop-stats.png`。
- **FeatureHub**: ALL-IN-ONE / 月¥3,000で、これ全部。ハブ図のノード(双方向マッチング/お客様連動アプリ/専属AI)＋CTA。崩れなし（不変・未編集）。`desktop-featurehub-1/2.png`。
- **堀①お客様連動アプリ**: テキスト＋逆方向SVGフロー図(お客様のスマホ→反応が逆流→担当者のCRM)＋AI要約カード。`desktop-customer-app.png`。
- **専属AI＋通話録音**: テキスト左／右カラムは AI画面＋通話録音サブカードの縦積み。バランス良好（implementer 懸念の右カラム縦積みは破綻なし）。`desktop-ai-trust.png`。
- **信頼統合**: 開発者の声(緑左罫の引用)＋インフラ4カード＋「個人/会社」1行。中央寄せで3連2カラムの後の休止点として機能。`desktop-trust-comparison.png`。
- **比較表**: ヘッダー＋8行、楽マッチ列は緑ハイライト。KASIKAのみ社名＋具体額、他は一般化列。注記同一視界。`desktop-comparison-pricing.png`。
- **料金**: 2カード（プレミアムに緑枠＋金「人気」バッジ）。注記2本。`desktop-pricing-cards.png`。
- **FAQ / 最終CTA**: アコーディオン＋濃色(primary-900)フィナーレ1回。背景リズム white↔surface-50 が機能。`top-desktop-1440-full.png`。

## 検証して「問題なし」を確認した項目（モバイル 390 / 最小 320）

- **Hero(390/320)**: CTA2個が縦積み・全幅・タップ領域十分。本文16px・左右余白OK。320でも fold が崩れない。`mobile-hero-1.png` / `mobile-320-hero.png`。
- **ベネフィット3カード(390)**: 縦積みで崩れなし。`mobile-hero-2.png`。
- **堀①(390)**: 縦積み順 = テキスト→SVG図（正しい text→visual）。`mobile-customer-app.png`。
- **マッチング(390)**: ジグザグ反転後もモバイルはテキスト先頭を維持（DOM実測）。
- **比較表(390/320)**: `overflow-x-auto` で内部横スクロール可。「← 横にスクロールできます →」ヒントが md 未満で表示される（実装済み）。表はセクション幅内に収まりページ横スクロールを誘発しない（#1修正後）。
- **料金(390)**: 2カードが1カラムに縦積み（DOM実測 tops 11535/12110）。
- **FAQ(390)**: アコーディオンのタップ領域 = 各56px（≥44px のa11y基準クリア）。
- **モバイル下部固定CTAバー**: `MobileStickyCTA.tsx` で実装済み。`md:hidden`・`env(safe-area-inset-bottom)` 考慮・`prefers-reduced-motion` 尊重。`#hero-sentinel` で Hero を過ぎたら出現、`#final-cta` 表示中は重複回避で非表示。DOM実測で「Hero通過後 opacity:1 / aria-hidden:false / バーが画面下端に表示(top=772<vh=844)」を確認＝**機能は正常**。
  - 既知の検証ノイズ: Playwright の `browser_take_screenshot` 実行が IntersectionObserver を再評価してバーを一瞬隠すため、固定バーの「見えている瞬間」の静止画キャプチャは安定取得できなかった。実スクロール時の挙動はDOM計測で正常と確認済み（コードレビューも合致）。実機(実iPhone/Chrome)での最終目視を推奨。

## FeatureHub 内部の観察（未対応・編集禁止のため報告のみ）

- FeatureHub は中央ハブ→3ノードへ放射状コネクタを描く設計で、**デスクトップ/モバイルともコネクタ領域に大きめの空白**がある。デスクトップの縦長ビューポートやモバイルでは「間延び」して見える瞬間がある。
- ただし `FeatureHub.tsx` は「ユーザーお気に入り・不変」の指定のため**一切編集していない**。気になる場合のみ team-lead 判断で別途検討（このQAでは対象外）。

## ビルド検証

- `npm run build` 成功（tsc 通過・12ページ静的生成・エラーなし）。tailwind.config.ts の MODULE_TYPELESS 警告は既存・本変更と無関係。

## /features 詳細ページ（軽チェックのみ）

- `/features/matching` はタイトル「顧客×物件マッチング | 楽マッチ AI」で正常ロード・Heroは§7共通レイアウトで崩れなし(`feature-matching-desktop-top.png`)。
- ただし **タスク#4「/features 4ページ刷新」が in_progress**（別teammateが編集中）のため、詳細QAは#4完了後に実施するのが安全（編集途中をQAすると衝突するため見送り）。リンク切れ・致命的崩れは現時点で未検出。

---

## team-lead への申し送り（コピー/構成。私は変更していない）

1. **FAQ が7問でなく8問**: `page.tsx` の faqs に「メンバーが増減したら料金は？」が残り計8問。ブループリント§3-10は7問精選を推奨だが、§6-3で team-lead 判断事項として「増減課金は購買前の実質的不安なので残す選択肢あり」と明記済み。**現状8問は妥当な判断の範囲**だが、7問精選の意図と差分があるため確認を。
2. **Problem セクションの位置**: 現状 Hero 直後（Hero→Problem→Stats→FeatureHub）。ブループリント§6-1の「Stats と FeatureHub の間」案ではなく「Hero 直後」案を採用している。課題提起→数値→全部入り解決、の流れで筋は通る。意図どおりか確認を。
3. **Problem のコスト行が赤字(`text-red-500`)**: DESIGN_SYSTEM はエラー色を最小面積に限定とするが、ペイン強調としては機能している。許容範囲だが気になれば ink-500 等への変更余地あり（コピー/色判断のため未変更）。

## 主要スクショ（第1パス・修正反映済み）

- デスクトップ全体: `qa-screenshots/top-desktop-1440-full.png`
- モバイル全体: `qa-screenshots/top-mobile-390-full.png`
- ジグザグ修正 after: `qa-screenshots/desktop-matching-zigzag.png`
- モバイル Hero: `qa-screenshots/mobile-hero-1.png` / 320: `qa-screenshots/mobile-320-hero.png`

---

# 第2パス（2026-06-03）: 「惹きつけ（磁力）」軸＋監査反映＋/features QA

team-lead から追加された評価軸「第一印象の磁力（静かな高級感で惹きつける／盛らない）」と、監査(AUDIT_FINDINGS.md)由来の必須修正を反映。

## 追加で修正した点

### A.【磁力】Hero ベネフィット3カードを「クリスプ」に（page.tsx）
- 症状: カードが `bg-white/70`＋淡いボーダーで白Hero上にほぼ溶け込み、輪郭の弱いゴースト箱に見えていた（惹きが弱い）。アイコンも size-10 で控えめ。
- 対応: 実地 `bg-white` ＋ ごく淡い影 `shadow-[0_2px_12px_rgba(5,57,43,0.04)]` で前に出す。`group` ＋ 上品なホバー（`hover:-translate-y-0.5`・緑寄りボーダー・影増し・`group-hover:bg-primary-100`・`motion-reduce` 対応）でAttio/Stripe風の「クリスプで生きたカード」に。アイコンも size-11 に微増。新色なし・過剰演出なし。
- before=`qa-screenshots/magnetism-hero-cards.png`（溶け込み）/ after=`qa-screenshots/magnetism-hero-cards-after.png`（前に出る）。

### B.【磁力】Heroバッジに極小ドット（page.tsx）
- バッジ `不動産売買特化のAI営業CRM` の先頭に `size-1.5 bg-primary-500` の小ドットを追加（`aria-hidden`）。Notion/Linear系の「静かな焦点アクセント」。盛らずに意図的な完成度を一段引き上げる。after=`qa-screenshots/magnetism-hero-after.png` / モバイル=`qa-screenshots/mobile-hero-final.png`。

### C.【監査必須/A11y】主要ボタンCTAのコントラスト primary-500→primary-600（page.tsx ＋ MobileStickyCTA.tsx）
- 白文字 on `bg-primary-500`(#0D9B76)=実測3.52:1でWCAG AA未達。対象=Hero主CTA・料金プレミアムの「1週間無料で始める」・MobileStickyCTA を `bg-primary-600`(hover `primary-700`・focus outline も600)に。最終CTAの白地ボタン（緑文字）と非featured料金ボタン（surface-100地+暗文字）は元々コントラスト十分のため対象外。/features の共有CTAは a11y-fixer が既に primary-600 化済み（実測 rgb(13,124,102) 確認）。

### D.【監査必須/A11y】Problem コスト赤字 text-red-500→text-red-600（page.tsx）
- red-500=3.76:1 未達 → red-600=4.83:1 で AA通過。赤の「リスク/コスト」意味は保持。3カード分。

### E.【監査中/perf】DeviceMockup の priority 整理（DeviceMockup.tsx）
- デスクトップ画像(LCP候補)は `priority` 維持、モバイル小画像は `priority` を外し `loading="lazy"` に。LCP最適化。※画像実体の差し替えはユーザー対応領域。

### F. ルート overflow-x-clip は page.tsx 側に「維持」が必須
- globals.css に `body{overflow-x:clip}` があるが、**body だけでは 320px 横スクロールが残る**（html=documentElement が依然スクロール。実測 pageScrollX=83 に再発）。`min-h-screen` のルート div に `overflow-x-clip` を置くのが実効。一度 globals 任せにしようと外したら再発→復帰。**この root の overflow-x-clip は削除しないこと**（globals.css は触らずに page.tsx 側で担保）。比較表の内部横スクロールは維持・Header sticky も維持（clip はスクロールコンテナを作らないため）。

## /features 4ページ ビジュアルQA（#4完了後・features は visual-qa 所有に移管済み）

対象: property-input / customer-app / matching / call-recording。デスクトップ1440・モバイル390・最小320で確認。

- **全4ページ HTTP 200・コンソールエラー無し・320px横スクロール無し**（call-recording で pageScrollX=0/scrollWidth==clientWidth=308 を実測。共有 FeaturePageShell が狭幅を正しく処理）。
- **§7共通レイアウトのシリーズ感OK**: breadcrumb→エヤブロウ→H1（状態の見出し）→リード→主CTA→右メディア枠 の骨格が4ページ共通。トップLPと余白/タイポ/背景リズム/CTA作法が揃う。
- **CTAコントラスト**: 共有CTAは primary-600（#0D7C66）で AA 準拠。
- **差し替えメディア枠**: property-input=動画ポスター＋再生ボタン枠（reins-bulk.mp4 フォールバック）、他=デバイスモック内に「楽マッチ AI / デモ画面（イメージ）」プレースホルダ。いずれも枠として綺麗・アスペクト整合。中身差し替え前提で問題なし。
- スクショ: `feature-property-input-desktop-top.png` / `feature-customer-app-desktop-top.png` / `feature-matching-desktop-top.png` / `feature-call-recording-desktop-top.png` / `feature-call-recording-mobile-top.png`。

### ★重要な切り分け: property-input の 500 は「dev サーバのチャンク陳腐化」で実バグではない
- QA中 `/features/property-input` が一時 500（`ReferenceError: DemoVideoPoster is not defined`）。但し `DemoVideoPoster` は `_components/index.ts` で正しく export 済み、かつ `npm run build` は同ページを静的生成成功。原因は #4 の高速編集で dev サーバの `.next/dev` チャンクが陳腐化していたこと。**dev サーバ再起動で解消（再起動後 全4ページ HTTP 200）**。本番ビルドに影響なし。

## 最終スクショ（第2パス・全修正反映）

- デスクトップ全体: `qa-screenshots/top-desktop-1440-full.png`
- **モバイル390 全体: `qa-screenshots/top-mobile-390-full.png`**
- **モバイル320 全体: `qa-screenshots/top-mobile-320-full.png`**
- Hero（磁力・after）: `qa-screenshots/magnetism-hero-after.png` / モバイル: `qa-screenshots/mobile-hero-final.png`
- /features: 上記4ページの `feature-*-desktop-top.png`

## ビルド
- 全修正後 `npm run build` 通過（tsc・12ページ静的生成・エラー無し）。

## 磁力 総評（静かな高級感の観点）
- Hero は「贅沢な余白＋存在感あるH1＋浮かせた主ビジュアル（DeviceMockupの影）＋緑アクセント＋クリスプなベネフィットカード＋バッジの小ドット」で、第一スクロールの完成度・惹きが一段上がった。盛らず・白基調維持・過剰アニメ無しで Notion/Stripe 級の静かな引き。
- 各セクション冒頭は「エヤブロウ→状態見出し（ベネフィット先行）」で掴みが効く。FadeIn は初出のみで上品（過剰でない）。
- 引き算（散らからない）と惹き（磁力）の両立は達成と判断。残る「FeatureHub内コネクタのモバイル間延び」は編集禁止コンポのため報告のみ。
