# 楽マッチ AI LP 全面刷新 最終QAレポート

担当: finisher（チーム lp-redesign）／ 実施日: 2026-06-03
作業ブランチ: lp-redesign-2026-06-02
役割: **読み取り専用の最終検証ゲート**（team-lead 指示で方針転換。修正は visual-qa/implementer が完了済みのため、二重編集で成果を壊さないよう原則ファイルは編集しない）。
対象: トップ `src/app/page.tsx`・/features 4ページ・共通コンポーネント・public 配下
検証: コード Read/Grep ＋ Playwright 実機（dev サーバ http://localhost:3000）＋ `npm run build` / `npm run lint`

結論: **コード変更ゼロで締め**。全修正が適用済みであることを実機・コードで確認。build/lint 通過、再監査の高重大度6項目すべて ○、コンプラ §8 すべてクリア。`page.tsx:189` ルートdivの `overflow-x-clip`（320px横スクロール再発防止の要・削除厳禁）が残存していることも確認。**本番反映してよい状態**。

---

## A. 残修正の担保（指示された3点）

| # | 指示 | 状態 | 根拠 |
|---|------|------|------|
| A1（監査#11） | painPoints コスト文 `text-red-500`→`text-red-600` | ○ 適用済 | `page.tsx:294` が `text-red-600`。Grep で `text-red-500` 0件（白背景4.83:1でAA通過）。 |
| A2（監査#5） | reins-bulk.mp4 を自動再生させない（poster＋クリック再生＋preload="none"） | ○ 適用済 | property-input は `DemoVideoPoster`（poster画像＋再生ボタン）を使用。初期DOMに `<video>` 0個（自動再生なし）。クリックで `<video preload="none" src="/reins-bulk.mp4">` を注入＝14MB動画はクリックまでロードしない。`FeatureDemoMedia` の `ready=false` は fallback を表示し autoPlay 動画を出さない。 |
| A3（監査 中低） | DeviceMockup デスクトップのみ priority・モバイル lazy | ○ 適用済 | `DeviceMockup.tsx:61` desktop に `priority`、`:136` mobile に `loading="lazy"`。 |

A項は手を入れる箇所が残っておらず、コード変更ゼロで完了（先行エージェントの修正が正しく入っていた）。

## B. ビルド健全性

- `npm run build`: **成功**。TypeScript 通過、12ページ静的生成、エラーなし。
  - 既存の `MODULE_TYPELESS_PACKAGE_JSON` 警告のみ（tailwind.config.ts・本変更と無関係・従来から既知）。
- `npm run lint`: **成功**（出力なし＝エラー0）。

## C. /features 4ページ 最終ビジュアルQA（実機）

デスクトップ1440・モバイル390・最小320でフルページ確認。**4ページとも横スクロール無し・リンク切れ無し・トップとのシリーズ感あり・CTA primary-600・メディア枠が枠として綺麗**。

| ページ | 1440 | 390 | 320 横スクロール | CTA色 | 自動再生動画 | Accordion aria |
|--------|------|-----|------------------|-------|--------------|----------------|
| /features/property-input | ○ | ○ | 無し(244==244) | primary-600 白文字 | 無し(poster方式) | 4個 |
| /features/customer-app | ○ | ○ | 無し(244==244) | primary-600 白文字 | 無し | 4個 |
| /features/matching | ○ | ○ | 無し(244==244) | primary-600 白文字 | 無し | 4個 |
| /features/call-recording | ○ | ○ | 無し(244==244) | primary-600 白文字 | 無し | 4個 |

- シリーズ感: 各ページ `FeatureHero`（エヤブロウ→H1→リード→CTA→右メディア）で骨格統一。白↔surface-50 の背景リズム、余白、タイポ、`FeatureCTA`（primary-900 濃色フィナーレ1回）がトップと揃っている。
- メディア枠: property-input は poster＋再生ボタンで枠として綺麗に成立。他3ページは ScreenMockup/画像で「デモ画面（イメージ）」枠を維持。差し替え時は `FeatureDemoMedia` に video/ready を渡すだけ。
- トップ（/）も A/C 反映後の最新状態で 1440・390 を撮り直し済。

## D. 再監査（AUDIT_FINDINGS 高重大度の回帰確認）

コード Read ＋ 実DOM計測の二重確認。

| # | 項目 | 結果 | 根拠 |
|---|------|------|------|
| 1 | 全CTA（Header/Hero/Pricing/FeatureHub/MobileSticky/FeatureHero/FeatureCTA）が白文字 on primary-600（4.5:1以上） | ○ | Grep で全CTAが `bg-primary-600 ... text-white`。実DOMで Hero/Feature CTA = `rgb(13,124,102)`＋白＝5.13:1。`bg-primary-500` はバッジ内1.5px装飾ドット（aria-hidden）のみ残存＝CTAではない。FinalCTAカードは primary-900（12.91:1）。 |
| 2 | Accordion に aria-expanded/aria-controls/region | ○ | `Accordion.tsx:13-15,22-25` に `aria-expanded`/`aria-controls`/`id`、パネルに `role="region"`/`aria-labelledby`、`ChevronDown` に `aria-hidden`。実DOMでトップ8個・各featureページ4個の `aria-expanded` を確認。 |
| 3 | FadeIn/CountUp/globals.css が prefers-reduced-motion 尊重 | ○ | `FadeIn.tsx:12` と `CountUp.tsx:11` が `matchMedia('(prefers-reduced-motion: reduce)')` を見て即表示／即確定。`globals.css:11-20` に reduced-motion で transition/animation/scroll を無効化。 |
| 4 | sitemap.xml に feature4ページ | ○ | `public/sitemap.xml` に property-input/customer-app/matching/call-recording の4URL（priority 0.7・lastmod 2026-06-03）。 |
| 5 | reins-bulk が自動再生でない | ○ | property-input 初期DOMに video 0個。クリックで `preload="none"` の video を注入（A2 と同根拠）。 |
| 6 | layout.tsx FAQ JSON-LD が実FAQ（page.tsx faqs＝8問）と一致 | ○ | `layout.tsx:73-86` のFAQPage JSON-LDが8問で、`page.tsx:150-183` の faqs 配列8問と設問・回答とも一致（「メンバーが増減したら…」含む）。 |

補足: トップのFAQは**8問**（7問精選＋「メンバー増減課金」を残置）。これはブループリント §6-3 で team-lead 判断事項として「増減課金は購買前の実質的不安なので残す選択肢あり」と明記された範囲内の判断。JSON-LDも8問で表示と一致しているため SEO 上の不整合なし。

## E. 最終コンプラ Grep（COMPLIANCE §8）

page.tsx ＋ features/* に対し機械チェック。**マーケコピーでの違反ゼロ**。

| チェック | 結果 |
|----------|------|
| 成果保証語（上がる/伸びる/増える/必ず/確実/絶対/100%/保証） | マーケコピー0件。`page.tsx:58`「積み上がる」はペイン文（成果保証でない）。property-input「100%ではありません」はAI非完璧の打消し注記（適正）。terms「保証しておりません」は法的免責（適正）。 |
| 最上級語（唯一/初/No.1/最高/一番/世界初/業界初/他にない） | 0件。堀①は「他にあまり見られません」の相対表現を維持。 |
| 「一切」「完全」+ セキュリティ/外部アクセス文脈 | マーケコピー0件。tokusho/terms の法的文のみ（適正）。インフラ説明は「弊社サーバーで保持しません」の事実記述で断定回避。 |
| 「同時管理」「1リスト」等 業態切替の実態と異なる表現 | 0件。 |
| Premium「賢い/高性能/高精度なAI」 | 0件。Pricing 注記は「AI機能・性能は同じ、違いは利用枠と容量」を明記（`page.tsx:897`）。 |
| 旧ブランド「TOP-SALES AI」 | 0件（コード・実DOMとも）。 |
| デモ画面明記 | Hero「※画面はデモ画面です。」、各featureメディアに「デモ画面（イメージ）」、alt にも明記。 |
| 数値の注記近接 | Stats「※いずれも自社利用に基づく試算です。」、Problem コスト行「※自社利用に基づく試算」、property-input「※入力時間90%削減は自社利用に基づく試算」を同一視界に。 |
| 無料/価格条件 | Hero マイクロコピー「個人でも企業でも月3,000円/人（税込）・1週間無料・いつでも解約可能」。料金注記に税込・人数課金・導入費0円。 |

## 残課題（非ブロッカー・本番反映の妨げにならない）

これらは監査の中低重大度で、今回の最終ゲートのスコープ外（コピー/素材差し替え/将来対応）。本番反映の判断には影響しない。

1. **素材最適化（監査#6/#7）**: feature-*.png が各7〜9MB、lp-desktop.jpg は中身PNG・拡張子不一致。`next/image` で配信最適化されるため表示実害は限定的だが、将来 WebP/縮小でリポジトリ肥大とビルドコストを減らせる。
2. **実スクショ差し替え（監査#8/#12）**: feature ヒーローのメディアは現状プレースホルダ枠（ScreenMockup/「デモ画面（イメージ）」）。実画面に差し替えると信頼・CVが上がる。`FeatureDemoMedia`/`DemoVideoPoster` で差し替え導線は用意済み。
3. **比較表の競合価格（ブループリント §3-8 TODO）**: 森山さんの Facilo 確認待ち。現状は KASIKA のみ社名＋出典・他は一般化列の安全実装を維持。
4. **contact メールの mailto 化（監査#14）**: 問い合わせメールがプレーンテキスト。摩擦低減の余地。
5. **public のプレースホルダ確認ファイル（監査#15）**: `googleSEARCHCONSOLE_PLACEHOLDER.html` の残置（team-lead 判断）。

## 最終スクショ一覧

### 今回 finisher が取得（rakumatch-lp/qa-screenshots/final/）
A/C 反映後の最新状態。特に /features のモバイル390フルページは既存セットに揃っていなかったため新規取得（不足分の補完）。

- top-desktop-final.png（トップ 1440 フルページ・最新）
- top-desktop-fold.png（トップ 1440 ファーストビュー）
- top-mobile-final.png（トップ 390 フルページ・最新）
- feature-property-input-desktop.png ／ feature-property-input-mobile390.png
- feature-customer-app-desktop.png ／ feature-customer-app-mobile390.png
- feature-matching-desktop.png ／ feature-matching-mobile390.png
- feature-call-recording-desktop.png ／ feature-call-recording-mobile390.png

### 既存（先行エージェント・rakumatch-lp/qa-screenshots/）— 流用可
- top-desktop-1440-full.png ／ top-mobile-390-full.png ／ top-mobile-320-full.png（トップ全体）
- magnetism-hero-after.png ／ magnetism-hero-cards-after.png（磁力仕上げ after）
- mobile-320-hero.png ／ mobile-sticky-cta.png（320 Hero・下部固定CTA）
- desktop-matching-zigzag.png（ジグザグ修正 after）
- feature-{property-input,customer-app,matching,call-recording}-desktop-top.png（feature デスクトップTop）

---

*end of final QA report*
