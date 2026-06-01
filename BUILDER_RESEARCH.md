# BUILDER_RESEARCH.md — Claude Code 等でアプリ/LPを作る実践知 多角リサーチ

> 担当: cc-builder-researcher（タスク #18）。発端=森山さん「同じようにクロードコードでアプリを作っている人の話など多角的にリサーチを」。
> 目的: (a) 今作っている楽マッチLPの品質向上 と (b) 私たちチームの進め方 の両方に効く打ち手を、出典つきで持ち帰る。
> 調査方法: WebSearch / WebFetch（2026年5月時点）。**未裏取り・推定は本文中で「未確認」「推定」と明示**した。数値は出典側の主張であり、楽マッチで再現性を保証するものではない。
>
> このリポジトリには既に `DESIGN_SYSTEM.md` / `ART_DIRECTION.md` という非常に強いデザイン規約がある。本書はそれと**重複しない**よう、(1) ビルダーの「進め方・プロセス」 (2) 「AIっぽさ」を脱する具体テク (3) Next.js 16 / Tailwind v4 の実務的な落とし穴 に絞り、**既存規約への補完**として書く。規約と数値が矛盾したら DESIGN_SYSTEM/ART_DIRECTION が正。

---

## 0. 最重要サマリ（先に結論）

このLPに関して、リサーチと**コード実査**を突き合わせて分かった一番効く事実:

> **`globals.css:9` は `font-family: var(--font-sans), …` を参照しているが、`--font-sans` を定義している箇所がコードのどこにもない**（`layout.tsx` に `next/font` の読み込みがなく、CSS変数の宣言もない／実査済み）。
> 結果、変数は空になり `system-ui` にフォールバック＝**OS任せの既定日本語フォント**（Mac=ヒラギノ / Windows=遊ゴシック・メイリオ）で表示され、端末ごとに見え方がバラつき、`next/font` の最適化も効いていない。

これは、リサーチで繰り返し出てきた2つの知見が**1つのバグに収束**している:
- 「**デフォルト/Inter のまま=AIっぽさの最大の兆候**」（925studios, DEV）
- 「**BtoB・信頼業種は Noto Sans JP（源ノ角ゴシック）で信頼感を出すのが定石**」（ferret One, GUARDIAN）

→ **打ち手#1（後述）**: `next/font/google` で Noto Sans JP を読み込み `--font-sans` を実際に定義する。これだけで「端末バラつき解消＋意図あるタイポ＝脱・汎用感」が同時に効く。最小工数・最大効果。

次点で効くのは:
- **打ち手#2**: 日本語見出しの単語途中改行を `text-wrap: balance/pretty` + `word-break: auto-phrase`（+ BudouX フォールバック）で根治（モバイル見出し崩れの直接の解）。
- **プロセス改善#1**: Playwright で全幅スクショ→規約と突き合わせる「ビジュアル・フィードバック・ループ」を回す（既に UI 監査タスク #16 が方向性として正しい。これを“毎回”回す型にする）。

---

## 1. Claude Code / AIコーディングで本番アプリ・LPを作る実践（プロセス）

### 1-1. 並列サブエージェント＝「分割→統合（split-and-merge）」が本番の型
- **誰が/どこで**: Claude Code 公式 Docs「Common workflows」、MindStudio「5 Workflow Patterns」、HAMY「9 Parallel AI Agents That Review My Code」、Anthropic「Introducing dynamic workflows」。
- **何を言っているか**:
  - 独立サブタスクは依存がなければ**並列**に走らせ、最後に統合する。各サブエージェントは**自分専用のコンテキスト**を持つため、実装時の判断に引きずられず**独立した目線**でレビューできる（=実装者バイアスの排除）。
  - HAMY は「**9体の並列レビュー・サブエージェント**」を各観点（正しさ/セキュリティ/パフォ等）に割り当て、各々が重大度つきで指摘→メインが統合して最終判定、という運用を紹介。
  - 並列分岐は**出力スキーマを統一**しておくと統合が楽。逆に**部分失敗の扱い**（あるエージェントだけ失敗）を設計しておかないと統合で詰まる、という注意も。
- **出典**: https://code.claude.com/docs/en/common-workflows / https://www.mindstudio.ai/blog/claude-code-agentic-workflow-patterns / https://hamy.xyz/blog/2026-02_code-reviews-claude-subagents / https://claude.com/blog/introducing-dynamic-workflows-in-claude-code
- **楽マッチ/私たちへの適用**:
  - 今のチーム編成（ベンチマーク/監査/改善/本リサーチを別エージェントに分割）は、この「分割→統合」の正攻法そのもの。**正しい**。
  - 改善余地は「**統合の出力スキーマを揃える**」。UI監査(#16)・ベンチマーク(#15)・本リサーチ(#18)の成果物を、改善担当(#17)が**同じ見出し構造で受け取れる**ようにする（例: 各 .md に「適用する打ち手 Top N」節を必ず置く＝本書もそう書いた）。
  - 「**独立レビュー枠**」を1体常設する価値あり（実装エージェントとは別に、規約準拠だけを見る art-director 役。ART_DIRECTION §10 のQAチェックリストはそのまま独立レビューの採点表として使える）。

### 1-2. コンテキスト管理（/clear・plan mode・小さいCLAUDE.md）が品質の土台
- **誰が/どこで**: Claude Code 公式「Best practices」、m.academy、SitePoint、Blink、Claude Directory「Plan Mode (2026)」、ranthebuilder。
- **何を言っているか**:
  - **コンテキストは埋まるほど劣化する**。**コミット直後に `/clear`** するのが定石（コミット=論理的チェックポイント＝それ以降は過去文脈を運ばない）。小さいバッチで作業し、こまめにクリア。
  - **Plan Mode は「読まないなら無価値」**。計画を承認だけして読まないなら、Plan Mode のコストを払って価値ゼロ。「最もきれいなPRを出すチームは、巧妙なプロンプトのチームではなく、**計画を一級市民として扱う**チーム」。
  - **CLAUDE.md は短く（目安 200行未満）**。長すぎると Claude が半分無視する（重要ルールがノイズに埋もれる）。必要なスキル/ドキュメントは ad hoc に import で繋ぐ。
  - 「**ツールではなく自分のドメイン知識がボトルネック**」。機能はセッション単位に分割（1st=設計・型・境界、2nd=実装A…）。
- **出典**: https://code.claude.com/docs/en/best-practices / https://m.academy/lessons/clear-context-window-claude-code/ / https://www.sitepoint.com/claude-code-context-management/ / https://www.claudedirectory.org/blog/claude-code-plan-mode-guide / https://ranthebuilder.cloud/blog/claude-code-best-practices-lessons-from-real-projects/
- **楽マッチ/私たちへの適用**:
  - このリポジトリの `CLAUDE.md` は `@AGENTS.md` import＋短いチームルールで**既に薄い＝良い形**。一方 `DESIGN_SYSTEM.md`(184行)・`ART_DIRECTION.md`(374行)は厚い。**常時 CLAUDE.md に全文を載せず、デザイン作業時だけ参照**させる現状の分離は正しい（200行ルールに沿う）。
  - **改善**: 大きいファイルを触るエージェントは「設計セッション→実装セッション」に分け、節単位で着手（MEMORY の `feedback_agent_context`／`feedback_dynamic_workflows` と一致）。本書の知見はそれを外部出典で裏づけるもの。

### 1-3. つまずき所と回避策（本番運用の生の声）
- **誰が/どこで**: DEV「Claude Code in Production: 40% Productivity Increase」、Medium「Production-Grade Systems without Context Drift」、shinpr/claude-code-workflows(GitHub)。
- **何を言っているか（要約）**:
  - 生産性向上の主張（例: 40%）はあるが、**コンテキスト・ドリフト**（長セッションで初期方針から逸れる）が最大の敵。回避は「方針をドキュメント化＋小セッション＋計画ゲート」。
  - shinpr のリポは「専門エージェント群＋本番向けワークフロー」をOSS化＝**役割分担を仕組みにする**思想。
  - ※生産性%等の**具体数値は各記事の自己申告で未検証（推定扱い）**。打ち手の方向性のみ採用する。
- **出典**: https://dev.to/dzianiskarviha/integrating-claude-code-into-production-workflows-lbn / https://medium.com/@ilyas.ibrahim/how-to-build-production-grade-systems-with-claude-code-87f73dd311b9 / https://github.com/shinpr/claude-code-workflows

---

## 2. 日本語コミュニティ事例（Zenn・Qiita・note）

### 2-1. 「CLAUDE.md を本気で書くと開発が変わる」＋「フロント特化の設定」
- **誰が/どこで**: Zenn「CLAUDE.mdを本気で書いたら開発が変わった」(takkenai)、Zenn「【2026年版】Claude Code フロントエンド特化の設定・ツールまとめ」(enechange_blog／本書で WebFetch 精読済)。
- **何を言っているか**:
  - **共通テーマは「コンテキストウィンドウをいかに効率よく使うか」**。重い MCP より**軽量CLI**を選ぶ／ドキュメントは**静的インデックス**で常駐させずオンデマンド参照、がトークン節約の核。
  - Vercel の検証として「**Next.js ドキュメントの静的読み込みは成功率100%**」（=フレームワーク固有知識は学習データでなく実物の docs を読ませろ）。`npx @next/codemod@canary agents-md` で AGENTS.md を自動生成できる。
  - フロント実務の便利ツール例: ブラウザ操作(agent-browser=トークン削減)、diff確認(difit)、UIの要素クリックでプロンプト生成(React Grab) 等。
- **出典**: https://zenn.dev/takkenai/articles/dade58c0dec458 / https://zenn.dev/enechange_blog/articles/9288d67beed7b4
- **楽マッチへの適用**:
  - このリポの `AGENTS.md`（「This is NOT the Next.js you know … `node_modules/next/dist/docs/` を読め」）は、まさに上記「**学習データでなく実 docs を読ませる**」原則の実装。**正しい方針なので徹底**する（実装エージェントは Next.js のAPIを書く前に必ず該当 docs を開く）。

### 2-2. 「Claude Code だけで企業サイトを構築・公開」（Next.js 16 + microCMS 実例）
- **誰が/どこで**: F2T ブログ「Claude Codeだけで企業サイトを構築・公開した全手順【Next.js + microCMS】」、ぽんずテック「Claude Codeでブログを作成・公開（Next.js + Vercel + 独自ドメイン）」、Zenn idealive「業務システムのCRUDを30分で（Next.js + Prisma）」。
- **何を言っているか**:
  - **Next.js 16 + Tailwind v4 + Vercel** 構成で企画→実装→公開まで**実際に到達**している（=楽マッチLPと同じ土俵で成功事例がある＝技術選定は妥当）。
  - Claude Code が特に強いのは「ボイラープレート（Server Actions / shadcn 組み立て / スキーマ→マイグレーション）」。制作会社見積比 1/3〜1/5 に短縮との主張（※自己申告＝推定）。
- **出典**: https://f2t.jp/blog/claude-code-site-build / https://ptech-blog.com/blog/claude-code-blog-deploy-guide / https://zenn.dev/idealive/articles/claude-code-crud-nextjs-prisma
- **楽マッチへの適用**: 技術スタック（Next.js 16 / Tailwind v4 / Vercel）は日本語コミュニティでも本番実績がある“通った道”。**冒険ではない**。安心して品質の作り込みに集中してよい。

### 2-3. 日本語タイポ／文字組みの定番（BtoB・信頼業種）
- **誰が/どこで**: ferret One「BtoBサイトにおすすめのフォント11種類（モリサワ監修）」、GUARDIAN「Webで使えるおすすめ日本語フォント5選」、TANE-be「フォントサイズ・行間早見表」。
- **何を言っているか**:
  - **BtoBで最優先したい印象は「信頼感・安心感」**。定番は **Noto Sans JP（源ノ角ゴシック / Source Han Sans）**＝字面が整い視認性が高く、企業/行政サイトの信頼演出に使われる。M PLUS 1p は「真面目さ＋親しみ」。
  - 見やすい**行間は文字サイズの 150〜200%**（ゆったり読ませるなら 200% 寄り）。
  - **明朝は高級感が出るが本文には不向き**（ART_DIRECTION §4「明朝は使わない」と一致）。
- **出典**: https://ferret-one.com/blog/btob-font / https://guardian.jpn.com/creative-blog/20251117-76649/ / https://tane-be.co.jp/knowledge/web-design/2601/
- **楽マッチへの適用**: §0 のとおり **Noto Sans JP を実際に読み込む**のが最優先。DESIGN_SYSTEM の `leading-relaxed`(1.625=162.5%) 死守は上記150〜200%の範囲内で妥当。

---

## 3. 「AIっぽい汎用デザイン」を脱して“プロ顔負け”にする具体テク

### 3-1. AI slop の「兆候（tell）」と、その潰し方
- **誰が/どこで**: 925studios「AI Slop Web Design Guide」(WebFetch 精読済)、prg.sh「Why Your AI Keeps Building the Same Purple Gradient Website」、DEV「How to Break the AI-Generated UI Curse」、Hashmeta、Builder.io。
- **AIっぽさの典型兆候（チェックリストとして使える）**:
  1. **フォントがデフォルト/Inter のまま**（意図的なタイポ設計がない）
  2. **紫→青グラデ**など“統計的に安全な”装飾配色（意味を伝えない色）
  3. **抽象的で具体性ゼロの見出し**（"Build the future of …" 的）
  4. **ストック画像/3Dブロブ/AI生成イラスト**（滑らか・対称・プラスチック的）
  5. **全要素が同じ角丸16px・パディング24px**で視覚的階層がなく**ページが平坦**
  6. **ホバー無反応・汎用フェードインだけ**＝意図あるモーション設計の欠如
- **修正テク（実務でそのまま使える形）**:
  - **タイポ**: デフォルト/Inter を捨て、ヘッドラインに個性ある書体、本文に可読サンセリフの**2書体体系**を一貫適用。重み差（100/200 ↔ 800/900）とサイズ差（3倍以上のジャンプ）で**強いコントラスト**。
  - **色**: 装飾グラデを廃し、**意味的に命名した CSS 変数**（例 `--color-action-primary`）で「色が機能を伝える」設計に（黄=強調 / 青=リンク / 赤=警告）。
  - **画像**: ストック画像を**全削除**し、**実製品スクショ・実チーム写真・カスタム図解**に置換。「具体性が信頼を生む」。
  - **モーション**: 装飾モーションを全削除し、**CTA とフォームのマイクロインタラクションを最優先**。各アニメに「これはユーザーに何かを教えるか？」を問い、Noなら消す。
  - **コピー**: AI的なヘッジ表現（"〜する可能性"/"may help"）を削除。「**CEO本人がこう言うか？**」を基準に創業者の声で書き直す。
  - **設計システム**: 新ページごとに“汎用デフォルトに引き戻される重力”がある。**デザインシステム（変数/コンポーネント）でシステムレベルに上書き**して対抗。
  - **時間がない時の優先3点**: 「タイポ＋画像置換＋見出し改稿」で即差別化。
- **出典**: https://www.925studios.co/blog/ai-slop-web-design-guide / https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website / https://dev.to/a_shokn/how-to-break-the-ai-generated-ui-curse-your-guide-to-authentic-professional-design-2en
- **楽マッチへの適用（既存規約との突き合わせ）**:
  - 楽マッチは**既にほぼ全部できている**（紫グラデなし＝白×緑＋ゴールド1点／実スクショ主役＝DESIGN_SYSTEM §8／装飾モーション抑制＝§6／角丸を用途で固定＝ART §3.3）。ART_DIRECTION/DESIGN_SYSTEM は「脱AI slop」の教科書的実装になっている。
  - **唯一の穴がタイポ**（§0 の `--font-sans` 未定義バグ）。兆候#1「フォントがデフォルトのまま」に**今まさに該当**している。ここを塞げば「脱・汎用感」のチェックリストがほぼ全埋まり。
  - 注意: 925 は「ヘッドラインに個性書体（Playfair等）」を勧めるが、楽マッチは**BtoB信頼・日本語**が主戦場。**欧文ディスプレイ書体や明朝は採らない**（ART §4「明朝禁止」・§1.2「チャラい/若者向けはアウト」）。楽マッチの“個性”は奇抜書体ではなく **Noto Sans JP＋規律ある余白＋数値で語る** で出す——という**既存方針が正しい**ことを、本リサーチは裏づける。

### 3-2. 「先に style guide、AIは実行係」が鉄則
- **誰が/どこで**: 925studios / Builder.io「How to generate (actually good) designs with AI」。
- **何を言っているか**: 「**AI は実行は得意だが“趣味/趣旨（taste）”は壊滅的**。完璧なレイアウトは組めても、それが汎用的かどうかは判断できない」。だから**AIに触る前に参照デザインを3〜5個集め、共通パターン（余白・タイポ・色）を抽出してスタイルガイドを作れ**。
- **出典**: https://www.925studios.co/blog/ai-slop-web-design-guide / https://www.builder.io/blog/design-with-ai
- **楽マッチへの適用**: `DESIGN_SYSTEM §1 参照ギャラリー`（Linear/Stripe/Vercel/Attio/Ramp/SmartHR/freee…から“盗む要素”を明文化）＝**この鉄則を既に実践済み**。私たちの強み。**実装エージェントには毎回この §1 を読ませてから着手**させる運用を徹底する。

---

## 4. Next.js 16 / Tailwind v4 の実務的な落とし穴と良い型

> AGENTS.md の方針（実 docs を読む）と整合させる前提。以下は**外部出典の警告**。実装前に `node_modules/next/dist/docs/` の該当ガイドで必ず裏取りすること（バージョン差・本リポ固有設定がありうる）。

### 4-1. Next.js 16 — “ビルドは通るのに本番で静かに壊れる”系
- **誰が/どこで**: Next.js 公式「Upgrading: Version 16」、SquaredTech「4 Surprising Silent Breaks」、dev.to「7 Caching Bugs That Compile Fine」、salmanizhar 移行ガイド、Nandann「16.2 完全ガイド」。
- **何を言っているか**:
  - **`params` / `searchParams` / `cookies()` / `headers()` が完全に async 化**（同期アクセスは削除）。codemod が**レイアウトファイルを取りこぼす**ことがあり、エラーも警告も出ず**本番の最初の実リクエストで初めて露見**。
    - **回避**: codemod 実行後に「**`params.` のドット付き直接アクセスを全文 grep**」して手で潰す（5分で効く）。
  - **`middleware.ts` → `proxy.ts` にリネーム**。見落とすとリダイレクトが**黙って効かなくなる**。
  - **キャッシュが opt-in 化（`use cache` ディレクティブ）**。`use cache` でラップした“ラッパー関数”が実行境界になり、中身はキャッシュされてもラッパーは毎回走る、等の罠。**cache tag の文字列不一致**（'product-list' vs 'products'）で再検証が効かず**古いデータが残る**（エラーは出ない）。
  - `revalidate` は「N秒ごとに更新」ではなく「**N秒後の“次の”リクエストで背景再生成**」＝開発では再現せず本番でだけ顕在化しがち。
- **出典**: https://nextjs.org/docs/app/guides/upgrading/version-16 / https://www.squaredtech.co/nextjs-16-upgrade-broke-4-things-no-errors-no-warnings / https://dev.to/shubhradev/7-nextjs-16-caching-bugs-that-compile-fine-and-break-silently-in-production-1cap / https://www.salmanizhar.com/blog/nextjs-16-migration-guide
- **楽マッチLPへの適用（重要度の見極め）**:
  - 楽マッチLPは**ほぼ静的なマーケLP**（`page.tsx` ＋ `/features/*`、データフェッチや middleware は薄いはず）。よって `use cache` / cache tag / revalidate の罠は**当面の主リスクではない**（推定）。
  - とはいえ**(a) `middleware.ts` を使っているか**（あれば `proxy.ts` 影響を確認）、**(b) `params.` 直接アクセスが `/features/[slug]` 等にないか**は、**5分の grep で確認する価値がある**（黙って壊れる系のため）。**未確認なので実装/監査担当が要チェック**。

### 4-2. Tailwind v4 — CSS-first 移行の落とし穴
- **誰が/どこで**: Tailwind 公式「Upgrade guide」、DEV/Pockit「Migration Guide 2026」、designrevision、typescript.tv、codewithseb。
- **何を言っているか**:
  - **設定が JS config から CSS-first（`@theme`）へ**。深くスプレッドした複雑な theme は**自動移行されず手で `@theme` 化**が要る。
  - codemod は**約90%**しか拾えない。**クラス名を文字列連結で動的生成**している箇所（`'bg-gradient-to-' + dir` 等）は検出不能＝手で探す。
  - **cascade layers（`@layer theme/base/components/utilities`）採用で specificity が変化**。v3 の詳細度に依存した独自CSSが挙動変化しうる。独自CSSは `@layer` で正しい層に置く。
  - **対象ブラウザ Safari 16.4+ / Chrome 111+ / Firefox 128+**。古いブラウザ対応が要るなら v3.4 据え置き。**Node 20+ 必須**。
- **出典**: https://tailwindcss.com/docs/upgrade-guide / https://dev.to/pockit_tools/tailwind-css-v4-migration-guide-everything-that-changed-and-how-to-upgrade-2026-5d4 / https://medium.com/better-dev-nextjs-react/tailwind-v4-migration-from-javascript-config-to-css-first-in-2025-ff3f59b215ca
- **楽マッチへの適用（実査メモ）**:
  - このリポは `globals.css` 冒頭で `@import "tailwindcss"; @config "../../tailwind.config.ts";`＝**v4 だが旧 JS config を `@config` で併用する“ハイブリッド”構成**（実査済）。これは v4 で**正式にサポートされた橋渡しの型**で、悪くない。
  - 注意: `ink`/`accent` トークンは DESIGN_SYSTEM §2 で「`tailwind.config.ts` の `extend.colors` に追記提案」だが、**v4 流に寄せるなら `@theme` で定義する手もある**。ただし**今は JS config に統一されている**ので、トークン追加は**`tailwind.config.ts` 側に足してブレを作らない**のが安全（ART_DIRECTION 末尾も「foundation が config に追記」前提）。混在させないこと。
  - 旧ブラウザ非対応は LP（経営者向け・モダン端末想定）では実害小（推定）。

---

## 5. 今回適用する打ち手 Top 7（楽マッチLP）

優先度＝(効果 × 実装の軽さ × 既存規約との整合)。**いずれもコミット前提でなく“提案”**。

| # | 打ち手 | 何を | なぜ効く（出典） | 触る場所 |
|---|--------|------|----------------|----------|
| **1** | **`--font-sans` を実定義（最優先）** | `layout.tsx` で `next/font/google` の **Noto Sans JP**（weight 400/500/700）を読み込み、`variable: '--font-sans'` を `<html>` か `<body>` に付与。`globals.css:9` の参照を実際に満たす。 | 現状この変数が**未定義で system-ui 任せ**＝端末バラつき＋AI slop兆候#1「デフォルト書体」に該当（925studios）。BtoB信頼は Noto Sans JP が定石（ferret One）。`next/font` で最適化も効く。 | `src/app/layout.tsx`, `globals.css`(参照確認) |
| **2** | **日本語見出しの改行根治** | 見出し/キャッチ（H1・H2）に `text-wrap: balance`（中央寄せ）/`pretty`（左寄せ）＋ `word-break: auto-phrase`。未対応ブラウザ向けに **BudouX** か手動 `<wbr>` をフォールバック。本文には掛けない。 | モバイルで単語途中改行が出る現症状の直接の解。日本語は空白がなく `text-wrap` 単体では効かない＝`auto-phrase`/BudouX が要る（yuheiy, ICS, mogudeza）。 | `page.tsx` の H1/H2, `globals.css`（`:lang(ja)` 規則） |
| **3** | **`params.` / `middleware` の安全確認** | `/features/[slug]` 等で `params.` 直アクセスがないか全文 grep。`middleware.ts` があれば `proxy.ts` 影響を確認。 | Next.js 16 は**ビルドは通るが本番で黙って壊れる**（公式/SquaredTech）。5分で潰せる。 | リポ全体 grep（監査#16 と相乗） |
| **4** | **実スクショ＆実図解の徹底（ストック禁止）** | 装飾イラスト/ストックを使わず、実画面＋内製SVG図解（特に「お客様連動アプリ＝逆引き共有」フロー）で具体性を出す。 | 「具体性が信頼を生む／AI生成イラストは見抜かれる」（925studios）。DESIGN_SYSTEM §8・ART §6.3 と完全一致＝既存方針の強化。 | features/*・図解コンポーネント |
| **5** | **マイクロインタラクションは CTA とフォームに限定** | 装飾フェードインを足さず、CTA/フォーム/数値CountUp に意味あるモーションだけ。「これは何を教える?」でNoなら消す。 | AI slop兆候#6の回避（925studios, Builder）。ART §6・DESIGN_SYSTEM §6（FadeInは初見のみ）と一致。 | 各セクション/ボタン |
| **6** | **コピーを“CEOの声”で再点検** | AI的ヘッジ表現を排し、誇張は法務注記つき（※自社試算）に。抽象見出しを具体に。 | 「CEO本人が言うか?」基準（925studios）。COPY_DECK/法務ガード（ART §9）と接続。 | COPY_DECK・page.tsx 文言 |
| **7** | **トークン追加は `tailwind.config.ts` に統一** | `ink`/`accent` を `@theme` と `config` に二重定義しない。v4 ハイブリッド構成のまま config 側へ。 | v4 移行の specificity/設定二重化が落とし穴（Tailwind公式）。本リポは `@config` ハイブリッド（実査）。 | `tailwind.config.ts` |

> ※打ち手 #1/#2 は **ui-improver / foundation 担当の実装スコープ**。本リサーチは「やるべき理由と出典」を提供。実装時は AGENTS.md に従い `node_modules/next/dist/docs/` で API を裏取りすること。

---

## 6. 私たちのプロセス改善案 Top 5

| # | 改善 | 内容 | 出典/根拠 |
|---|------|------|----------|
| **1** | **ビジュアル・フィードバック・ループを“毎回”の型に** | 実装後、Playwright で **375 / 768 / 1280** の全ページスクショ→ART_DIRECTION §10 のQA表で採点→NGを「ファイル:行＋推奨クラス」で差し戻す。これを**実装のたびに回す**（一度きりにしない）。 | 「ビジュアルFBループはデザイン作業でAIに与えられる最高レバレッジ」（Builder.io／composio）。UI監査#16 が既にこの方向＝**型として常設**する。 |
| **2** | **独立レビュー枠を1体常設** | 実装エージェントと別に、規約準拠だけを見る art-director 役を分離（実装バイアスを排除）。採点表＝ART §10。 | サブエージェントは別コンテキストで独立目線を持てる（HAMY／MindStudio）。 |
| **3** | **成果物の出力スキーマを統一** | 各リサーチ/監査 .md に必ず「適用する打ち手 Top N」節を置き、改善担当(#17)が同形式で統合できるようにする。 | 並列分岐は出力スキーマ統一で統合が楽（Anthropic dynamic workflows）。 |
| **4** | **コミット直後 `/clear`＋セッション分割** | 論理チェックポイント（コミット）ごとに文脈リセット。大ファイルは「設計→実装」でセッションを割る。 | コンテキストは埋まるほど劣化（m.academy／公式 best practices／MEMORY `feedback_agent_context`）。 |
| **5** | **フレームワーク知識は実docsを読ませる運用を徹底** | Next.js のAPIを書く前に必ず `node_modules/next/dist/docs/` を開く（AGENTS.md）。学習データのNext.jsは古い前提。 | 「静的docs読み込みは成功率100%」（Vercel検証, enechange まとめ）。AGENTS.md と一致。 |

---

## 7. 出典一覧（Sources）

プロセス / Claude Code:
- [Common workflows — Claude Code Docs](https://code.claude.com/docs/en/common-workflows)
- [Best practices — Claude Code Docs](https://code.claude.com/docs/en/best-practices)
- [5 Claude Code Workflow Patterns — MindStudio](https://www.mindstudio.ai/blog/claude-code-agentic-workflow-patterns)
- [9 Parallel AI Agents That Review My Code — HAMY](https://hamy.xyz/blog/2026-02_code-reviews-claude-subagents)
- [Introducing dynamic workflows in Claude Code — Anthropic](https://claude.com/blog/introducing-dynamic-workflows-in-claude-code)
- [Clear the context window — m.academy](https://m.academy/lessons/clear-context-window-claude-code/)
- [Context Management Guide — SitePoint](https://www.sitepoint.com/claude-code-context-management/)
- [Plan Mode (2026) — Claude Directory](https://www.claudedirectory.org/blog/claude-code-plan-mode-guide)
- [Best Practices: Lessons From Real Projects — ranthebuilder](https://ranthebuilder.cloud/blog/claude-code-best-practices-lessons-from-real-projects/)
- [Claude Code in Production (40%) — DEV](https://dev.to/dzianiskarviha/integrating-claude-code-into-production-workflows-lbn)
- [Production-Grade Systems without Context Drift — Medium](https://medium.com/@ilyas.ibrahim/how-to-build-production-grade-systems-with-claude-code-87f73dd311b9)
- [shinpr/claude-code-workflows — GitHub](https://github.com/shinpr/claude-code-workflows)

日本語コミュニティ:
- [Claude Code フロントエンド特化の設定・ツールまとめ(2026) — Zenn/enechange](https://zenn.dev/enechange_blog/articles/9288d67beed7b4)
- [CLAUDE.mdを本気で書いたら — Zenn/takkenai](https://zenn.dev/takkenai/articles/dade58c0dec458)
- [Claude Codeだけで企業サイトを構築・公開(Next.js+microCMS) — F2T](https://f2t.jp/blog/claude-code-site-build)
- [Claude Codeでブログを作成・公開(Next.js+Vercel) — ぽんずテック](https://ptech-blog.com/blog/claude-code-blog-deploy-guide)
- [業務システムのCRUDを30分で(Next.js+Prisma) — Zenn/idealive](https://zenn.dev/idealive/articles/claude-code-crud-nextjs-prisma)

デザイン品質（脱AIっぽさ）:
- [AI Slop Web Design Guide — 925studios](https://www.925studios.co/blog/ai-slop-web-design-guide)
- [Why Your AI Keeps Building the Same Purple Gradient Website — prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website)
- [How to Break the AI-Generated UI Curse — DEV](https://dev.to/a_shokn/how-to-break-the-ai-generated-ui-curse-your-guide-to-authentic-professional-design-2en)
- [What Makes a Website Look Premium — Hashmeta](https://hashmeta.com/blog/ai-web-design-what-makes-a-website-look-premium-without-overdesigning/)
- [How to generate (actually good) designs with AI — Builder.io](https://www.builder.io/blog/design-with-ai)
- [Design Review skill / visual feedback loop — Builder.io](https://www.builder.io/blog/playwright-mcp-server-claude-code) / [Top 10 Design Skills — Composio](https://composio.dev/content/top-design-skills)

日本語タイポ / 文字組み:
- [日本語における text-wrap の運用 — yuheiy](https://yuheiy.com/2024-07-22-text-wrap-in-japanese)
- [文章の折り返し指定のCSS最新版 — ICS MEDIA](https://ics.media/entry/240411/)
- [wbr や BudouX の使い分け — もぐでざ](https://mogumogu-design.com/kaigyo-wbr-budoux/)
- [word-break: auto-phrase / BudouX — TeraDas](https://www.teradas.jp/archives/49786/)
- [BtoBサイトにおすすめのフォント11種類(モリサワ) — ferret One](https://ferret-one.com/blog/btob-font)
- [Webで使えるおすすめ日本語フォント5選 — GUARDIAN](https://guardian.jpn.com/creative-blog/20251117-76649/)
- [フォントサイズ・行間の早見表 — TANE-be](https://tane-be.co.jp/knowledge/web-design/2601/)

Next.js 16 / Tailwind v4:
- [Upgrading: Version 16 — Next.js 公式](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [4 Surprising Silent Breaks — SquaredTech](https://www.squaredtech.co/nextjs-16-upgrade-broke-4-things-no-errors-no-warnings)
- [7 Caching Bugs That Compile Fine — DEV](https://dev.to/shubhradev/7-nextjs-16-caching-bugs-that-compile-fine-and-break-silently-in-production-1cap)
- [Next.js 16 Migration Guide — salmanizhar](https://www.salmanizhar.com/blog/nextjs-16-migration-guide)
- [Tailwind CSS Upgrade guide — 公式](https://tailwindcss.com/docs/upgrade-guide)
- [Tailwind v4 Migration Guide 2026 — DEV/Pockit](https://dev.to/pockit_tools/tailwind-css-v4-migration-guide-everything-that-changed-and-how-to-upgrade-2026-5d4)
- [Tailwind v4: JS Config to CSS-First — Medium](https://medium.com/better-dev-nextjs-react/tailwind-v4-migration-from-javascript-config-to-css-first-in-2025-ff3f59b215ca)

---

## 8. 誇張・未裏取りの明示（誠実性ノート）

- 「生産性40%向上」「制作費1/3〜1/5」等の**数値は各記事の自己申告で未検証＝推定**。本書では方向性のみ採用。
- Next.js 16 の各罠（middleware→proxy / `params.` async / cache tag）が**楽マッチLPで実際に該当するかは未確認**。打ち手#3で「grepして確認」を提案する形に留めた（断定しない）。
- BudouX / `word-break: auto-phrase` の**ブラウザ対応はリリース当時情報ベース**。実装時に最新の対応状況とフォールバック要否を再確認すること（断定しない）。
- フォント・色・余白の“正”は、外部記事ではなく **DESIGN_SYSTEM.md / ART_DIRECTION.md / tailwind.config.ts**。本書はそれを外部出典で補強・裏づける位置づけ。矛盾時は既存規約が優先。
