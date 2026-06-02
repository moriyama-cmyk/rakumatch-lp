# 楽マッチ AI LP 多角監査（A11y / SEO / パフォーマンス / CV）

監査日: 2026-06-03 ／ 担当: multi-audit（読み取り専用）
対象: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/features/*`, `src/components/*`, `public/`（robots.txt / sitemap.xml / ogp.png）
判断基準: `DESIGN_SYSTEM.md` / `COMPLIANCE_CHECKLIST.md`、WCAG 2.1 AA、Next.js 16（`node_modules/next/dist/docs/`）。
検証方法: コード Read/Grep ＋ dev サーバ（localhost:3000・200 応答）の描画 HTML 確認 ＋ コントラスト比は実測（後述）。

凡例: 観点 A=アクセシビリティ / B=SEO / C=パフォーマンス / D=CV（コンバージョン）。担当 visual-qa=page.tsx・共通components、implementer=features/*。

---

## 所見一覧

| # | 重大度 | 観点 | 該当ファイル:箇所 | 現状 | 推奨対応 | 担当 |
|---|--------|------|------------------|------|---------|------|
| 1 | 高 | A | `page.tsx:217,882` Hero/Pricing CTA、`Header.tsx:61`、`FeatureHub.tsx:169`、`MobileStickyCTA.tsx:76`、`features/_components/FeatureHero.tsx:73` | プライマリCTA＝白文字 on `bg-primary-500 (#0D9B76)`。実測コントラスト **3.52:1**。ボタン文字は `text-base(16px) font-semibold`＝WCAGの「大きい文字」(18.66px太字/24px)に**該当しないため AA(4.5)未達**。サイト全部のCTAに波及。 | 既定背景を `bg-primary-600 (#0D7C66)`＝**5.13:1** に変更（ホバーは `primary-700`）。ブランド緑のまま AA 通過。または文字を 18.66px 太字以上に。 | visual-qa（共通CTA色の統一） |
| 2 | 高 | A | `components/Accordion.tsx:11-17`（page.tsx FAQ / `FeatureFAQ.tsx` 全機能ページ） | 開閉ボタンに `aria-expanded` / `aria-controls` が無く、パネルに `id`/`region` 紐付け無し（live DOM で `aria-expanded` 出現数=0）。SRで開閉状態が読めない。`ChevronDown` も `aria-hidden` 無し。 | ボタンに `aria-expanded={open===i}` と `aria-controls`、パネルに対応 `id`、アイコンに `aria-hidden`。`<ChevronDown>` の回転は装飾なので非読み上げに。 | visual-qa（Accordion 共通） |
| 3 | 高 | A | `components/FadeIn.tsx:13`, `CountUp.tsx`（page.tsx・features 全域で多用） | `FadeIn`（毎セクション）と `CountUp`（統計）が `prefers-reduced-motion` を一切尊重しない（CTAの `motion-reduce:` とは別系統）。前庭障害ユーザに不利。`globals.css` も reduced-motion 上書き無しで `scroll-behavior:smooth` のみ。 | `FadeIn`/`CountUp` で `window.matchMedia('(prefers-reduced-motion: reduce)')` を見て、reduce時は即 `visible=true`／数値即確定。`globals.css` に `@media (prefers-reduced-motion: reduce){ html{scroll-behavior:auto} *{transition/animation 抑制} }`。 | visual-qa（FadeIn/CountUp/globals.css） |
| 4 | 高 | B | `public/sitemap.xml:1-28` | 機能詳細4ページ（`/features/customer-app`・`/matching`・`/call-recording`・`/property-input`）が **sitemap に未掲載**。SEO_BRIEF が重視する集客ページがクロール対象から漏れる。`changefreq/priority` はあるが `lastmod` 無し。 | feature 4URL を追加（priority 0.7前後）。Next の `app/sitemap.ts` で動的生成にすると追加漏れを防げる（静的XMLのままでも可）。 | implementer or visual-qa（public配下） |
| 5 | 高 | C | `features/property-input/page.tsx:211` + `components/VideoModal.tsx:22-29` | `reins-bulk.mp4` = **約14.4MB** を `autoPlay muted loop` でヒーローのサムネとして常時自動再生。DESIGN_SYSTEM §8 は「自動再生は重さ・信頼性の観点で避け、ポスター＋再生ボタンに」と明記＝**自社指針に反する**。モバイル回線で重い・LCP/帯域を圧迫。 | サムネは `poster` 画像＋再生ボタンに変更し、自動再生をやめる（クリックでモーダル再生は維持）。動画は圧縮/可能なら短縮。`<video>` に `preload="none"`。 | implementer |
| 6 | 中 | C | `public/feature-matching.png(7.5MB)` `feature-ai-assistant.png(9.0MB)` `feature-contract.png(6.9MB)`、`page.tsx:506,570` | ソースPNGが各7〜9MB（2816×1536等）。`next/image` で配信時は最適化されるが、ビルド/初回最適化コストとリポジトリ肥大。`page.tsx` の2枚は折り返し下で `priority` 無し＝LCPには無害だが、`sizes` は600px指定済みで実害は限定的。 | ソース画像を WebP/最適サイズ（実寸表示の2倍程度＝~1400px）へ縮小。表示品質は維持できる。 | implementer（または素材差し替え） |
| 7 | 中 | C | `components/DeviceMockup.tsx:54-60,129-135`、`page.tsx:256` | Hero の `DeviceMockup` がデスクトップ＋モバイル**2枚とも `priority`**。LCPは1枚で十分。`lp-desktop.jpg` は実体PNG・3840×2160・1.3MB（拡張子と中身不一致）。 | LCP候補のデスクトップ画像のみ `priority`、モバイル小画像は `priority` を外し `loading="lazy"`。`lp-desktop.jpg` は正しい拡張子/サイズへ。`sizes` は実寸に合わせ調整。 | visual-qa（DeviceMockup） |
| 8 | 中 | A | `features/customer-app/page.tsx:185` ほか feature ヒーロー、`components/ScreenMockup.tsx:44-54` | feature ページのヒーロー右メディアが実スクショ無しの **Placeholder（「デモ画面（イメージ）」）**。alt自体はあるが、DESIGN_SYSTEM §8「実画面＝実在する製品が最強の説得力」に反し、CV/信頼面で弱い（A11y的にも“画像”の中身が無い）。 | 実スクショ（`feature-*.png`）を各 feature ヒーローに差し込む。無い機能は用意できるまで図解/SVGで代替し、空モックの放置を避ける。 | implementer |
| 9 | 中 | D | `page.tsx`（全体・約965行／12セクション） | LP本体が縦に長く、同一CTA文言「1週間無料で試す/始める」が Header・Hero・FeatureHub・Pricing・FinalCTA・MobileSticky と**6箇所超**で反復。CV的には多すぎると“しつこさ”で離脱要因。スクロール途中に再訴求ポイントの強弱が無い。 | CTAの「主従」を設計（Hero＝主／中間＝従の控えめリンク／Final＝主）。MobileStickyは維持。重複セクション（信頼インフラの文言が `page.tsx:181` FAQ と §8 で重複）を整理。 | visual-qa |
| 10 | 中 | C | `page.tsx:22-28` ほか | `CountUp`/`FadeIn`/`Accordion`/`MobileStickyCTA`/`VideoModal`/`FeatureHub` が `"use client"`。多くは妥当だが、`FadeIn` は単純な出現演出で**全セクションをクライアント境界化**＝SSR静的部分が断片化。 | `FadeIn` を CSS（`@starting-style`/IntersectionObserverを1つの薄いラッパで集約）に寄せるか、Server Component 内で `data-` 属性＋単一オブザーバ方式へ。優先度は低め（C/perf小）。 | visual-qa（任意・余力時） |
| 11 | 低 | A | `page.tsx:293` painPoints コスト文 `text-red-500` | `red-500 (#EF4444)` on white = **3.76:1**。`text-sm font-medium`＝小文字でAA(4.5)未達。 | `text-red-600 (#DC2626)`＝**4.83:1** に。意味（リスク/コスト）も赤で保てる。 | visual-qa |
| 12 | 低 | A | `DeviceMockup.tsx:21`, `ScreenMockup.tsx:19` Placeholder ラベル `text-gray-400` | グレー400 on 白＝**2.54:1**（AA/大文字とも未達）。プレースホルダ文言が読みにくい。 | #8 で実スクショ化されれば解消。残す場合は `text-ink-500` 以上に。 | implementer |
| 13 | 低 | B | `layout.tsx:73-83` FAQPage JSON-LD | layout の FAQPage JSON-LD（5問）が **page.tsx の FAQ 表示（7問）と不一致**（設問・回答文言が別物）。構造化データは「ページに見えている内容」と一致が原則。リッチリザルト剥奪/不利のリスク。 | JSON-LD を page.tsx の faqs 配列から生成して**表示と一致**させる（layoutの静的JSONを廃し、page側で出力）。feature側 `FeatureFAQ.tsx` は表示連動済みで良い。 | visual-qa |
| 14 | 低 | D | `contact/page.tsx:65` | 問い合わせメールが**プレーンテキスト**（`mailto:` リンク無し）。電話は `tel:` 済み。 | `moriyama@fm-y.com` を `mailto:` リンク化。摩擦低減。 | implementer（contact） |
| 15 | 低 | B | `public/` 直下 | `googleSEARCHCONSOLE_PLACEHOLDER.html` という**プレースホルダ確認ファイルが残置**（実ファイル `google740a32a8...html` は別途あり）。不要ファイルは混乱の元。 | プレースホルダを削除。本番に出さない。 | team-lead 判断 |
| 16 | 情報 | A/B | 良好な点（確認済み・対応不要） | `lang="ja"`・viewport・title/description・OGP（絶対URL 1200×630）・canonical・robots・SoftwareApplication JSON-LD・feature各ページの個別 metadata と BreadcrumbList/FAQPage/HowTo JSON-LD・見出し階層（H1単一→H2→H3で飛びなし）・主要本文コントラスト（ink-700=10.4、ink-500=5.6 でAA合格）・CTAの `focus-visible` アウトライン・`MobileStickyCTA` の `tabIndex`/`aria-hidden`/safe-area対応・`break-keep` 改行 — いずれも適切。 | — | — |

---

## コントラスト実測（WCAG 2.1・白/各背景上）

| 前景 / 背景 | 比 | 通常AA(4.5) | 大文字AA(3.0) | 用途 |
|---|---|---|---|---|
| ink-900 `#0F1A16` / 白 | 17.80 | PASS | PASS | 見出し |
| ink-700 `#36433D` / 白 | 10.36 | PASS | PASS | 本文 |
| ink-500 `#5E6B64` / 白 | 5.58 | PASS | PASS | 注記・キャプション |
| ink-500 / surface-50 | 5.34 | PASS | PASS | 同上（淡背景） |
| primary-600 `#0D7C66` / 白 | 5.13 | PASS | PASS | リンク・エヤブロウ |
| **白 / primary-500 `#0D9B76`（現CTA）** | **3.52** | **FAIL** | PASS | **プライマリCTAボタン（#1）** |
| 白 / primary-600 `#0D7C66`（修正案） | 5.13 | PASS | PASS | CTA修正後 |
| 白 / primary-900 `#05392B` | 12.91 | PASS | PASS | 濃色フィナーレ |
| **red-500 `#EF4444` / 白（現コスト文）** | **3.76** | **FAIL** | PASS | 課題コスト文（#11） |
| red-600 `#DC2626` / 白（修正案） | 4.83 | PASS | PASS | 修正後 |
| **gray-400 `#9CA3AF` / 白** | **2.54** | **FAIL** | **FAIL** | モックPlaceholder（#12） |

---

## 観点別サマリ

- **A（A11y）**: 致命は #1 CTAコントラスト（全CTA波及）、#2 Accordion の aria、#3 reduced-motion 不対応。色面の本文コントラストと focus-visible は良好。
- **B（SEO）**: 基盤（メタ/OGP/canonical/構造化データ/見出し）は非常に良い。穴は #4 sitemap の feature 漏れと #13 FAQ JSON-LD の表示不一致。
- **C（パフォーマンス）**: #5 14MB動画の自動再生が最大。次いで #6/#7 巨大画像と priority二重。`next/font` セルフホスト・swap・CJK preload:false は適切。
- **D（CV）**: ファーストビューは価値命題＋CTA＋条件注記が1秒で伝わり良好。課題は #9 CTA反復過多と長尺、#8 実スクショ欠落、#14 mailto。

（本ファイルは読み取り監査の所見。修正は team-lead が visual-qa / implementer に割り当て。）
