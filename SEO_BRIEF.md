# SEO ブリーフ — 楽マッチ AI LP（詳細ページ4本追加）

担当: SEO/テクニカル（タスク #12）／作業ブランチ: `lp/redesign-features-2026-05-30`
対象: Next.js 16.2.1 App Router + Tailwind v4 / `metadataBase = https://rakumatch-ai.com`

> 注記: このブリーフは設計ドキュメントです（実装はしません）。
> Next.js 16.2.1 は破壊的変更を含むため、実装者は metadata / generateMetadata / next/image の最終確認を
> `node_modules/next/dist/docs/` の該当ガイドで取ってからコードに落とすこと（AGENTS.md 厳守）。
> 本ブリーフ内のコード例は Next 16 App Router の現行作法に沿った雛形で、API名・引数の最終裏取りは実装者側で行う前提です。

### 既存実装の確認結果（このブリーフの根拠）
- `src/app/layout.tsx` を確認済み。すでに `metadataBase`／`title.template = '%s | 楽マッチ AI'`／`openGraph`／`twitter(summary_large_image)`／`alternates.canonical`／`robots.index/follow` が全て設定済み。
  → **詳細ページ側では `metadataBase`・`twitter.card` などを再定義しない**。`title.template` が効くので各ページの `title` は固有部分のみ書けば自動で ` | 楽マッチ AI` が付く（後述の文案は template 前提に修正済み）。
- 既存 JSON-LD はトップ layout に SoftwareApplication（offers ¥3,000〜¥5,000）と FAQPage の2本。詳細ページの BreadcrumbList はこれと別に各 page.tsx で追加する。
- 既存 metadata の description はキーワード過多気味（「不動産CRM」「自動マッチング」「電話スクリプト」等を列挙）。詳細ページでは詰め込みを避け、1ページ1主題で自然文にする（重複・カニバリ回避）。
- 競合は **Facilo**（1,500店舗以上、AI追客メール・マイページのAIおすすめコメント）を想定。検索結果でも上位常連。差別化（お客様→担当者の逆方向共有／コピペ登録／通話録音要約）を本文で明示しないと埋もれる。
- 画像実測: `feature-ai-assistant.png` 約9.0MB / `feature-contract.png` 約6.9MB / `feature-matching.png` 約7.6MB / `lp-desktop.jpg` 約1.3MB。**これが LCP/帯域の最大リスク**（後述 §6）。`ogp.png` は約195KB（1200x630、流用可）。
- robots.txt（70バイト・静的）と sitemap.xml（755バイト・静的）は `public/` 直下に既存。`next.config.ts` あり（画像最適化設定の有無は実装時に要確認）。

---

## 0. サイト構成（現状 → 追加後）

現状:
- トップ `/`（既存 JSON-LD: SoftwareApplication / FAQPage、`metadataBase`、sitemap.xml / robots.txt / ogp.png あり）

追加（詳細ページ4本）:
- `/features/customer-app`    … お客様連動アプリ（最大の差別化＝堀）
- `/features/call-recording`  … 通話録音→要約AI
- `/features/matching`        … 顧客×物件マッチング（逆引き含む）
- `/features/property-input`  … 物件コピペ登録（入力自動化）

設計方針: トップは「指名検索＋総合訴求」、詳細4本は「機能名＋課題」の検索意図を個別に取りに行くトピッククラスター構成。トップ＝ピラー、詳細4本＝クラスタ。相互リンクで内部評価を集約する。

---

## 1. キーワード設計（ページ別 主/副 + 検索意図）

> WebSearch / WebFetch がこのセッションで応答しないため、需要・競合語の最終確認は実装フェーズで取り直すこと（後述「未完了タスク」）。
> 以下は不動産売買仲介 SaaS の一般的検索行動と本プロダクトの差別化（お客様連動アプリ／逆引き／コピペ登録／通話録音要約）に基づく設計値。ボリューム/競合度は要実測。

### トップ `/`
- 主: `不動産 CRM`, `不動産 営業 AI`, `楽マッチ`(指名)
- 副: `不動産 売買 仲介 顧客管理`, `不動産 営業支援 ツール`, `不動産テック CRM`
- 意図: 比較検討（情報収集〜サービス選定）。「総合的に何ができるか」を一望したい。
- 勝ち筋: 指名「楽マッチ」を確実に取りつつ、`不動産 CRM`系のロングテール（売買特化/中小仲介）で差別化。

### `/features/customer-app` お客様連動アプリ
- 主: `不動産 顧客 アプリ 連携`, `お客様 物件 共有 アプリ`
- 副: `不動産 営業 顧客 アプリ`, `担当者 お客様 物件 共有`, `不動産 顧客 マイページ`
- 意図: 課題解決型。「お客様にどう物件を届けるか／追客の仕組み化」。
- 差別化軸: お客様→担当者の逆方向共有（競合にない独自性）。本文で必ず明示。

### `/features/call-recording` 通話録音→要約AI
- 主: `通話 録音 要約 AI`, `営業 通話 文字起こし AI`
- 副: `不動産 営業 通話 録音`, `電話 自動 議事録 AI`, `商談 録音 要約 ツール`
- 意図: 課題解決型。「通話内容を残す・要約する・顧客情報に紐づける」。
- 補足: 録音機材（ECM-TL3 + UGREEN 30724）の実用情報はサポート/信頼性訴求に有効だが、SEO主軸は「要約AI」。

### `/features/matching` 顧客×物件マッチング
- 主: `不動産 顧客 物件 マッチング`, `物件 提案 自動 AI`
- 副: `不動産 売買 マッチング システム`, `顧客 条件 物件 自動提案`, `物件 逆引き 顧客`
- 意図: 課題解決型。「条件に合う物件/顧客を自動で当てたい」。
- 差別化軸: 双方向（顧客起点・物件起点の逆引き）。賃貸/売買は分離思想だが LP では「売買特化」を前面に。

### `/features/property-input` 物件コピペ登録
- 主: `物件 入力 自動化`, `物件 コピペ 登録`
- 副: `不動産 物件 情報 取り込み AI`, `マイソク 入力 自動`, `物件 データ 入力 効率化`
- 意図: 課題解決型。「物件入力の手間を消したい」。デモ映えする機能＝CV直結。
- 差別化軸: テキスト貼り付け→AI構造化で即登録。X固定ポストの「コピペ登録デモ」と連動。

---

## 2. title / meta description / canonical / OGP 文案

ルール:
- **title は固有部分のみ書く**。layout の `title.template = '%s | 楽マッチ AI'` が ` | 楽マッチ AI` を自動付与するため、各ページの `title` に「楽マッチ AI」を含めると二重になる。固有部は全角約20〜24文字以内目安。
  - 例外: トップ `/` は layout 側 `title.default` で設定済み。詳細ページのみ本節の対象。
- description: 全角70〜90文字。便益＋差別化＋自然語のキーワード。誇大表現/未裏取り数値は禁止（法務地雷回避、必要なら「※自社試算」）。
- canonical: `alternates.canonical` を相対パスで自己参照（`metadataBase` で絶対URL化される）。
- OGP: 各ページ専用 `og:image` 推奨（無ければ既存 `/ogp.png` フォールバック）。`og:type=website`。`twitter.card` は layout 継承されるため各ページで再指定不要（title/description/image のみ上書き）。

### トップ `/`（layout で設定済み・現状維持でよい／調整案のみ）
- 現状 title.default: `楽マッチ AI — 不動産売買専用AI営業支援CRM｜顧客管理・物件管理・自動マッチング`（やや長い。検索結果で末尾切れ。下記に短縮案）
- 短縮案 title.default: `楽マッチ AI｜不動産売買特化のAI営業支援CRM・自動マッチング`
- 現状 description は機能列挙でキーワード過多。維持でも可だが、詳細ページと役割分担するなら「総合・指名」に寄せる方が良い。
- canonical: `/`（現状 `SITE_URL` 絶対指定。相対 `/` でも可）
- og:image: `/ogp.png`（既存）

> 以下、詳細4本の `title` は **固有部分のみ**（` | 楽マッチ AI` は template で自動付与）。

### `/features/customer-app`
- title（固有）: `お客様連動アプリ`  → 表示: `お客様連動アプリ | 楽マッチ AI`
- description: `担当者が選んだ物件をお客様アプリへ即共有。お客様からの反応も担当者に戻る双方向連携で、追客を仕組み化します。楽マッチ AIの中核機能。`
- canonical: `/features/customer-app`
- og:image: `/ogp-customer-app.png`（無ければ `/ogp.png`）

### `/features/call-recording`
- title（固有）: `通話録音×要約AI`  → 表示: `通話録音×要約AI | 楽マッチ AI`
- description: `商談の通話を録音し、AIが内容を要約。顧客情報に自動で紐づけ、聞き直しと共有の手間を削減します。不動産営業の記録を資産に変える機能。`
- canonical: `/features/call-recording`
- og:image: `/ogp-call-recording.png`（無ければ `/ogp.png`）

### `/features/matching`
- title（固有）: `顧客×物件マッチング`  → 表示: `顧客×物件マッチング | 楽マッチ AI`
- description: `顧客の条件から物件を、物件から見込み客を。双方向の逆引きで提案先を自動抽出し、売買仲介の機会損失を減らすマッチング機能。`
- canonical: `/features/matching`
- og:image: `/ogp-matching.png`（無ければ `/ogp.png`）

### `/features/property-input`
- title（固有）: `物件コピペ登録`  → 表示: `物件コピペ登録 | 楽マッチ AI`
- description: `物件情報を貼り付けるだけ。AIが項目を読み取り構造化して登録します。手入力の手間と転記ミスを減らす、不動産物件の入力自動化機能。`
- canonical: `/features/property-input`
- og:image: `/ogp-property-input.png`（無ければ `/ogp.png`）

---

## 3. Next.js 16 metadata export 書式例

> 静的 metadata で十分（動的データ不要）なので `generateMetadata` ではなく静的 `export const metadata` を推奨。
> `metadataBase` は `layout.tsx` で既設のため、各ページの `canonical` / `og:url` / `og:image` は相対パスで指定可。
> 最終確認: `node_modules/next/dist/docs/`（metadata, app/api-reference/functions/generate-metadata 等）。

各詳細ページ `src/app/features/<slug>/page.tsx` 先頭（layout 継承前提で最小限に）:

```tsx
import type { Metadata } from "next";

// title は固有部分のみ。layout の title.template が " | 楽マッチ AI" を自動付与する。
// metadataBase / twitter.card は layout で設定済みなので再定義しない。
export const metadata: Metadata = {
  title: "お客様連動アプリ",
  description:
    "担当者が選んだ物件をお客様アプリへ即共有。お客様からの反応も担当者に戻る双方向連携で、追客を仕組み化します。楽マッチ AIの中核機能。",
  alternates: {
    canonical: "/features/customer-app",
  },
  openGraph: {
    title: "お客様連動アプリ｜楽マッチ AI", // openGraph.title は template が効かないのでフルで書く
    description:
      "担当者が選んだ物件をお客様アプリへ即共有。双方向連携で追客を仕組み化。",
    url: "/features/customer-app",
    type: "website",
    images: [{ url: "/ogp.png", width: 1200, height: 630, alt: "楽マッチ AI お客様連動アプリ" }],
  },
  // twitter は layout から card/site 等を継承。title/description/images だけ上書きしたい場合のみ記述。
  twitter: {
    title: "お客様連動アプリ｜楽マッチ AI",
    description: "担当者が選んだ物件をお客様アプリへ即共有。双方向連携で追客を仕組み化。",
    images: ["/ogp.png"],
  },
};
```

ポイント:
- `metadata.title`（template対象）には固有部のみ。`openGraph.title` / `twitter.title` は template が適用されないため `…｜楽マッチ AI` をフルで書く。
- layout 継承を活かし、各ページの metadata は title/description/canonical/openGraph(url,images)/twitter(任意) に絞る。`metadataBase`・`siteName`・`locale`・`robots` は再定義しない（layout の値が継承される）。

注意点（Next 16）:
- `alternates.canonical` / `openGraph.url` / `images[].url` は `metadataBase` を基準に絶対URL化されるため相対でよい。`metadataBase` が無いページではビルド時 warning＋ソーシャル展開が壊れるので、layout の `metadataBase` 設定が効いていることを確認。
- `viewport` / `themeColor` は `metadata` ではなく `export const viewport: Viewport` に分離する（Next 14+ で metadata から分離済み。16でも踏襲）。layout 側にあるか確認し、重複定義しない。
- メタは Server Component で評価される。詳細ページを Client Component（`"use client"`）にすると `export const metadata` は無視されるので、ページ本体は Server Component に保ち、インタラクティブ部分のみ子 Client Component に切り出す。

---

## 4. 構造化データ（JSON-LD）追加提案

実装方式: 各 `page.tsx` 内で `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />` を返す（Next 公式が App Router で推奨する方式）。`@id` を付け、トップの既存 SoftwareApplication とグラフで繋ぐと尚良い。

### 全詳細ページ共通: BreadcrumbList（必須）
```jsonc
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://rakumatch-ai.com/" },
    { "@type": "ListItem", "position": 2, "name": "機能", "item": "https://rakumatch-ai.com/features" },
    { "@type": "ListItem", "position": 3, "name": "お客様連動アプリ", "item": "https://rakumatch-ai.com/features/customer-app" }
  ]
}
```
- 注意: position 2 の `/features` は、一覧ページを作らないなら省略して2階層（ホーム→各機能）にする。リンク先が404のパンくずは作らない。

### `/features/property-input`: HowTo（適合）
「コピペ→AI構造化→登録」の手順が明確で HowTo に向く。
```jsonc
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "物件情報をコピペで登録する手順",
  "step": [
    { "@type": "HowToStep", "name": "コピー", "text": "物件情報のテキストをコピーします。" },
    { "@type": "HowToStep", "name": "貼り付け", "text": "楽マッチ AIの登録欄に貼り付けます。" },
    { "@type": "HowToStep", "name": "登録", "text": "AIが項目を読み取り構造化、確認して登録します。" }
  ]
}
```

### `/features/call-recording` / `/features/matching` / `/features/customer-app`
- HowTo より、トップの SoftwareApplication の機能として `@type: SoftwareApplication` の `featureList` か、各ページに `WebPage`＋`primaryImageOfPage` を付ける程度で十分。
- Article は「読み物（ノウハウ記事）」向け。機能紹介LPでは Article 化しない（誤適用はリッチリザルト対象外＋品質評価で不利）。将来ブログ記事を作る場合に限り Article。
- FAQPage はトップに既存。詳細ページにも各2〜3問の FAQ を置くなら、トップと重複しない設問にし、各ページに個別 FAQPage を付与（同一QAの使い回しは避ける）。

検証: 実装後に Google リッチリザルトテスト / Schema Markup Validator で各ページURLを通すこと。

---

## 5. 内部リンク設計 & sitemap 更新方針

### 内部リンク
- トップ `/`: 各機能セクションから対応する `/features/<slug>` へ「詳しく見る」リンク（アンカーテキストは機能名＝主キーワードを含める。「こちら」は避ける）。
- 詳細ページ → トップ: パンくず（ホーム）＋ CTA（料金/お申込み）＋関連機能への相互リンク（例: customer-app ↔ matching、call-recording ↔ matching）。
- パンくず UI: 視覚的パンくずと BreadcrumbList JSON-LD を一致させる。
- 詳細4本は相互に1〜2本ずつ関連リンクを張り、クラスタ内のリンク循環を作る（孤立ページを作らない）。

推奨アンカーテキスト例:
- 「お客様連動アプリの詳細」/「通話録音と要約AI」/「顧客と物件のマッチング」/「物件のコピペ登録」

### sitemap.xml 更新
現状 `public/sitemap.xml`（静的）に4URLを追記:
```xml
<url><loc>https://rakumatch-ai.com/features/customer-app</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://rakumatch-ai.com/features/call-recording</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://rakumatch-ai.com/features/matching</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>https://rakumatch-ai.com/features/property-input</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
```
- トップは `priority 1.0`、詳細は `0.8`。`lastmod` を入れるなら公開日を ISO8601 で。
- 代替案（推奨）: 静的 `public/sitemap.xml` を捨て、Next 16 の `app/sitemap.ts`（`MetadataRoute.Sitemap` を返す）に移行すると、ページ追加時の追記漏れを防げる。移行する場合は `public/sitemap.xml` を削除し重複配信を避けること。
- robots.txt の `Sitemap:` 行が `https://rakumatch-ai.com/sitemap.xml` を指していることを確認。
- 公開後、Google Search Console で sitemap 再送信。

---

## 6. パフォーマンス / Core Web Vitals（feature-*.png 対策）

前提（実測）: `feature-ai-assistant.png`≈9.0MB / `feature-matching.png`≈7.6MB / `feature-contract.png`≈6.9MB / `lp-desktop.jpg`≈1.3MB。これは LCP/帯域の最大リスク。詳細ページでこれらを流用するなら**事前の WebP 化＋リサイズが必須**。`reins-bulk.mp4`≈14MB も埋め込むなら `preload="none"`＋ポスター画像で初期ロードから外す。

### 画像
- `next/image` を必ず使用（`<img>` 禁止）。`width`/`height` を実寸で指定し CLS を防ぐ。
- ファーストビュー（ヒーロー/最初の1枚）にだけ `priority`（＝preload）を付ける。それ以外は付けない（付け過ぎは逆効果）。
- 折りたたみ以下の画像は `loading="lazy"`（next/image はデフォルト lazy、priority 指定時のみ eager）。
- `sizes` を必ず指定。例（本文幅最大 ~720px、レスポンシブ）:
  `sizes="(max-width: 768px) 100vw, 720px"`
  カラム表示なら実レイアウト幅に合わせる。`sizes` 未指定だと Next が `100vw` 扱いで巨大画像を配信しがち。
- 元画像の最適化: 数MB PNG は配信前に圧縮/変換。next/image は配信時に WebP/AVIF 変換するが、元PNGが巨大だとビルド/初回変換コストと品質劣化が出る。可能なら元アセットを WebP 化＋リサイズ（表示最大幅の2倍＝~1440px 程度で十分）してから配置。
- 装飾画像は `alt=""`、意味のある画像は機能名を含む簡潔な `alt`。

### LCP
- LCP 要素を特定（多くはヒーロー画像 or H1）。ヒーロー画像なら `priority`、テキストなら Web フォントの表示遅延（FOIT）に注意。
- ヒーローを `next/image` の `placeholder="blur"` でちらつき軽減（任意）。

### フォント
- `next/font`（`next/font/google` or `localFont`）でセルフホスト＋自動 `font-display: swap`。CSS `@import` でのフォント読込は避ける（レンダリングブロック）。
- 日本語フォントは重い。サブセット化、または system-ui フォントスタックで回避を検討（日本語 Web フォントの全部入りは LCP/帯域に直結）。layout で既に設定済みなら踏襲し、新規追加しない。

### その他
- 詳細ページは Server Component 主体に保ち、JS バンドルを小さく（INP 改善）。
- 不要な `"use client"` を避ける。アニメーション等は CSS/Tailwind で。
- 公開後 PageSpeed Insights / Lighthouse でモバイル LCP < 2.5s、CLS < 0.1、INP < 200ms を確認。

---

## 7. 実装チェックリスト

メタデータ（各ページ）:
- [ ] `export const metadata`（静的）を Server Component の page.tsx に設置
- [ ] title `{固有} | 楽マッチ AI`、description 70〜90字、誇大/未裏取り数値なし
- [ ] `alternates.canonical` を相対パスで自己参照
- [ ] `openGraph`（title/description/url/type=website/images 1200x630）
- [ ] `twitter.card = summary_large_image`
- [ ] `metadataBase` が効いて絶対URL化されることをビルドログで確認（warning なし）
- [ ] `viewport`/`themeColor` は metadata と分離（重複定義なし）

構造化データ:
- [ ] 全詳細4ページに BreadcrumbList（リンク先が実在する階層のみ）
- [ ] property-input に HowTo
- [ ] 視覚的パンくずと JSON-LD が一致
- [ ] リッチリザルトテスト / Schema Validator を全URLで通過

内部リンク / sitemap:
- [ ] トップ→詳細4本の機能名アンカーリンク
- [ ] 詳細→トップ＋関連機能の相互リンク（孤立ゼロ）
- [ ] sitemap.xml に4URL追記（or app/sitemap.ts へ移行＋ public/sitemap.xml 削除）
- [ ] robots.txt の Sitemap 行を確認
- [ ] 公開後 GSC で sitemap 再送信

パフォーマンス:
- [ ] 全画像 next/image、width/height 実寸
- [ ] ヒーロー1枚のみ priority、他は lazy
- [ ] 全画像に適切な sizes
- [ ] feature-*.png を WebP化＋~1440px にリサイズしてから配置
- [ ] フォントは next/font セルフホスト（@import 不使用）
- [ ] Lighthouse モバイル: LCP<2.5s / CLS<0.1 / INP<200ms

公開前最終:
- [ ] 4ページとも noindex が付いていない（robots meta / x-robots 確認）
- [ ] canonical が本番ドメイン https://rakumatch-ai.com を指す（www/非www, http/https の揺れなし）
- [ ] 法務: 数値主張に「※自社試算」等の注記、Premium 表記是正（既存課題と整合）

---

## 8. 競合・市場メモ（WebSearch 結果より）

- **Facilo**: 不動産仲介特化、AI追客メール文面生成、マイページの物件ごとAIおすすめコメント、1,500店舗以上導入。最大の比較対象。→ 楽マッチは「お客様→担当者の逆方向共有」「コピペ登録」「通話録音要約」で差別化。
- **いえらぶCLOUD / 入力速いもん / ラクテック自動入力**: 物件入力効率化の競合語が濃い領域。`物件 入力 自動化`・`物件 コピペ 登録` は競合多。楽マッチは「テキスト貼付→AI構造化」の手軽さで差別化（業者間サイト連携型とは別軸）。
- **GENIEE SFA / amptalk / pickupon / JAPAN AI SPEECH**: 通話録音→要約→CRM連携の競合。`通話 録音 要約 AI` は一般語で競合強。楽マッチは「不動産売買の顧客情報に紐づく」点を訴求。
- **市場トレンド（2026）**: 「初回レスポンスタイム（反響→5分以内）」が重要KPIとされる論調。マッチング/お客様アプリの訴求文に「すぐ提案できる」文脈を織り込むと検索意図に合致。
- **CANARY Cloud / キマール**: AIエージェント/非公開物件マッチングの動き。マッチング系ページの競合語確認に。

出典:
- [Facilo 不動産AI活用](https://www.facilo.jp/blog/fudousan-ai) / [SFA向けAI CRM 13選](https://sfacrm-realestate.com/blog/real-estate-ai-crm-tools/) / [2026 AIエージェント3選](https://keiei-digital.com/column/ai-agent/real-estate-ai-agent/)
- [入力速いもん](https://biz.homes.jp/lists/productivity/productivity-00002) / [ラクテック自動入力](https://www.am-bition.jp/rac-tech/jidounyuryoku/) / [いえらぶCLOUD](https://ielove-cloud.jp/chukai/)
- [GENIEE AI議事録](https://chikyu.net/functions/artificial-intelligence/sp-ai-transcription/) / [amptalk](https://amptalk.co.jp/info/ai-call-transcription) / [電話文字起こし12選](https://jp.plaud.ai/blogs/blog/tel-transcription-tools)
- [不動産マッチング12選](https://mallento.com/recommend/real-estate-matching-services/) / [インフォマティクス物件マッチング](https://www.informatix.co.jp/property_matching/) / [キマール](https://ielove-cloud.jp/lp/kimar/)

## 9. 実装フェーズで要対応（残課題）

- キーワードの実ボリューム/競合度の数値実測は未取得（WebSearch は定性のみ）。ラッコキーワード / キーワードプランナー / GSC 検索パフォーマンスで主・副を裏取りし、H1/H2 と description を微調整すること。
- Next 16.2.1 の `node_modules/next/dist/docs/` での最終裏取り（AGENTS.md 必須）。本ブリーフのコード例は確認の代替にはならない。特に `metadata` の title.template 継承挙動・`twitter` 継承・`alternates.canonical` の絶対URL化を実コードで確認。
- `next.config.ts` の `images`（formats / deviceSizes / imageSizes）設定の有無を確認。未設定なら AVIF/WebP 出力・適切な deviceSizes を検討。
- `viewport` / `themeColor` は layout に未確認（現 layout には無い）。新規追加するなら `export const viewport: Viewport` で分離（metadata に混ぜない）。
- フォント: 現 layout は `next/font` 未使用（globals.css 依存の可能性）。日本語 Web フォント追加は LCP に直結するため安易に増やさない。
