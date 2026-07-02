# 楽マッチ AI ─ LP画像 差し替えプロンプト集

> 目的：LPに差し込まれている画像を「伝えたいことがすぐ伝わる」ものに刷新する。
> 方針：**製品画面はゼロからAI生成しない**（日本語UIの文字が崩れて不信感になる）。
> 実機スクショをAIで「磨く」＋ ブランク枠と感情訴求枠は写真調をフル生成する。
> 作成日：2026-06-03

---

## 0. 大方針（なぜ全部を生成にしないか）

- 2026年のSaaS LPトレンドは「抽象イラスト/3D → 実際の製品画面を見せる」方向。B2Bは画面で“使えそう/複雑すぎないか”を3〜5秒で判断する＝**リアルなUIが一番売れる**。
- AI画像生成は**日本語のUI文字を正しく描けない**。偽ダッシュボードは「すぐ伝わる」の逆。
- だからスロットを2種類に分ける：
  - **製品画面スロット**（ヒーロー/マッチング/専属AI/契約/コピペ）＝実機スクショを**参照画像編集**で磨く（文字は実物が残る）。
  - **概念・感情スロット**（現状ブランクの2枠・OGP）＝**写真調をフル生成**（文字不要だから崩れない）。

### ブランド制約（全プロンプト共通・ART_DIRECTION.md 準拠）

- トーン：**静かな上質**。不動産売買の経営者・営業に効く落ち着き。余白を広く。
- 色：プライマリ緑 `#0D7C66`（深いエメラルド）／明るい緑 `#33AF87`／最深 `#05392B`。背景は**温かいオフ白** `#FAFAF8`〜`#F5F3EF`。ゴールド `#C8A24A` は極小アクセントのみ。
- 禁止：**緑ベタ背景・写真ベタ背景・原色・ケバいグラデ・絵文字・崩れた文字・ストック感の強い握手/スーツ集合写真**。
- 光：自然光・やわらかい。影は淡い。
- 人物：日本人。30〜40代中心。清潔感。誇張した笑顔より自然な表情。

### 推奨ツール（2026年時点）

| 用途 | 第1候補 | 理由 |
|---|---|---|
| 製品スクショを磨く（参照編集） | **Nano Banana Pro（Gemini 3 Pro Image）** | 参照画像の文字・レイアウトを保ったまま編集できる。日本語に最も強い |
| 写真調シーンのフル生成 | **Nano Banana Pro** or **Midjourney v7** | フォトリアル。MJはより作品的・雰囲気重視 |
| 文字を入れる画像（OGP等） | **Ideogram v3** or Nano Banana Pro | 文字が読める数少ないモデル。確実に綺麗にしたいなら Canva/Figma で組む手も |

> プロンプトは英語ベース（モデルの性能が出やすい）。画面に出す日本語文字は `" "` で明示。比率・出力サイズも各項に記載。

---

## 1. スロット一覧（どこに・何の画像が・何を伝えるか）

| # | 場所 | ファイル | 種別 | 伝えたいこと | 作り方 |
|---|---|---|---|---|---|
| A | トップ Hero | `/public/lp-desktop.jpg` + `/lp-mobile.jpg` | 製品画面 | オールインワンのAI営業ワークスペース | 実機スクショを磨く |
| B | トップ MATCHING節 | `/public/feature-matching.png` | 製品画面 | この物件、誰に当てるか一瞬で分かる（逆引き・点数順） | 実機スクショを磨く |
| C | トップ AI ASSISTANT節 | `/public/feature-ai-assistant.png` | 製品画面 | 顧客1人1人に専属AI（次の一手・刺さる訴求） | 実機スクショを磨く |
| D | /features/property-input 契約節 | `/public/feature-contract.png` | 製品画面 | 契約フェーズ・精算・書類が全部ここに | 実機スクショを磨く |
| E | /features/property-input ヒーロー | `/public/demo-copypaste-poster.jpg` | 製品画面 | レインズ等からコピペ1回で一括登録 | 実機スクショを磨く |
| F | /features/customer-app ヒーロー | （現状ブランク：MacBook枠プレースホルダ） | 感情・シーン | お客様が見つけた物件が担当者に集まる | 写真調フル生成 |
| G | /features/call-recording ヒーロー | （現状ブランク：MacBook枠プレースホルダ） | 感情・シーン | 電話の内容をAIが文字起こし・要約 | 写真調フル生成 |
| H | OGP（SNSシェア画像） | `/public/ogp.png`（1200×630） | ブランドカード | 楽マッチ AI＝不動産売買特化のAI営業CRM | 文字入れ生成 or Canva |

**変更しないもの**
- `/public/icon-192.png`（ロゴ）＝ブランドの核。触らない。
- トップ「お客様連動アプリ」節の逆流フロー図、/features/matching の `MatchingFlowDiagram` ＝**画像でなく内製SVG**。文字が鮮明で崩れないので、このまま据え置きが正解。

---

## 2. バケツ1：製品画面を「磨く」プロンプト（参照画像編集）

> 使い方：**実機スクショ（既存ファイル）をアップロードして**、下記を指示に貼る。
> Nano Banana Pro の画像編集モード（参照画像あり）推奨。文字は実物が残る。
> 共通の仕上げ意図：①1画面1メッセージに整理 ②淡い緑のアクセントで主役パネルを強調 ③余白・影を上質に ④モバイルでも要点が読めるよう主役を大きく。

### A. Hero（lp-desktop.jpg / lp-mobile.jpg）

- 比率：デスクトップ **16:10**（額装が16:10でクロップ）。モバイルは縦長 **9:19.5**。
- 伝える核：「入社初日の新人が、トップ営業の動きをする」＝迷わず動ける1画面。

```
Using the attached real product screenshot of a real-estate sales CRM dashboard,
produce a cleaner, brighter, more premium version of the SAME screen.
Keep all existing Japanese UI text exactly as in the reference (do not invent text).
Switch to a calm light theme on a warm off-white (#FAFAF8) canvas.
Use a single emerald-green accent (#0D7C66, with #33AF87 highlights) for the active panel,
buttons, and the AI suggestion card; everything else stays neutral and quiet.
Increase whitespace and reduce visual clutter so the layout reads in 3 seconds.
Subtle soft shadow, crisp 1px borders, rounded-2xl cards.
No logos other than what's present, no emojis, no extra UI noise.
Photoreal screen rendering, high resolution, 16:10.
```

### B. feature-matching.png（逆引きマッチング）

```
Edit the attached real screenshot of the matching screen.
Keep the real Japanese text. Light theme, warm off-white background.
Make the MATCH-SCORE list the clear hero: a vertical list of customer/property cards
ordered by a green match score (e.g. 92%, 88%, 81%) with the green progress accent (#0D7C66 / #33AF87).
Gently de-emphasize side panels (lower contrast) so the eye lands on the ranked list first.
Premium soft shadow, generous spacing, rounded-2xl, no clutter, no emojis. 16:10, high-res.
```

### C. feature-ai-assistant.png（専属AI）

```
Edit the attached real screenshot of the per-customer AI assistant.
Keep the real Japanese text. Light theme on warm off-white.
Hero element = the AI advice card ("次の一手 / ヒアリングのポイント" style panel) in emerald green (#0D7C66),
shown beside a calm customer profile. The advice card should feel like a kind, capable mentor's note.
Soften the surrounding chrome so the advice card is the focal point.
Premium soft shadow, rounded-2xl, lots of whitespace, no emojis. 16:10, high-res.
```

### D. feature-contract.png（契約・精算・書類）

```
Edit the attached real screenshot of the deal/contract management screen.
Keep the real Japanese text. Light theme, warm off-white.
Make the deal-phase pipeline the hero: a clean horizontal stepper
(事前審査 → 契約 → 本審査 → 決済) with the current step highlighted in emerald green (#0D7C66),
completed steps with green checks. Settlement amount and document list visible but secondary.
Premium soft shadow, rounded-2xl, calm and organized, no clutter, no emojis. 16:10, high-res.
```

### E. demo-copypaste-poster.jpg（コピペ一括登録）

> これは「レインズ画面（右）→ 楽マッチのAI一括入力ハブ（左）」の分割。流れがよく伝わる構図なので**構図は維持して磨く**。

```
Edit the attached split-screen reference (property database on one side, the app's bulk-input hub on the other).
Keep both real screens and their real Japanese text.
Add a single subtle motion cue between them: a soft emerald arrow with a small "コピペ" chip,
implying copy-from-database → paste-into-app. Light, premium framing on warm off-white,
soft shadow, no clutter, no emojis. 16:10 (or keep source ratio), high-res.
```

> 補足：A〜Eは「実機スクショを撮り直してから磨く」とさらに効果的（ライトテーマ・主役パネルを大きく・1画面1メッセージ）。撮り直しが必要なら声をかけてください（こちらで撮影設計を出せます）。

---

## 3. バケツ2：写真調をフル生成するプロンプト（ここが“すぐ伝わる”の主役）

> 現状ブランク（MacBook枠に「準備中」表示）の2枠。文字不要のシーンなので崩れない。
> 出力後、`/public` に置いて該当ページのフレームを「写真カード（rounded-2xl + 淡い緑ぼかし + 影）」に差し替える。
> フレーム差し替えのコード対応が必要なら、こちらで実装します。

### F. customer-app ヒーロー（お客様連動アプリ）

- 比率：**4:3**（横長カード）。または phone枠に変えるなら 3:4。
- 伝える核：お客様が自宅でスマホから物件を保存 → それが担当者に集まる。安心・前向き。

```
Photorealistic lifestyle photograph, quiet-premium editorial style.
A relaxed Japanese person (30s) sitting on a sofa in a warm, tidy modern Japanese living room
at golden-hour, holding a smartphone and casually saving a home listing.
The phone screen shows a clean, minimal property-saving app with an emerald-green (#0D7C66) accent
and a small star/heart save action — UI abstracted and softly blurred (no readable text).
Soft natural window light, shallow depth of field, calm and reassuring mood.
Warm off-white and natural wood tones, a single emerald accent. No logos, no on-image text, no emojis.
Composition leaves clean negative space on one side for overlay copy. 4:3, high resolution.
```

> 補足：トップの「お客様連動アプリ」節は逆流SVG図がメイン。Fはあくまで /features/customer-app のヒーローで“雰囲気＝二面価値（お客様もラク／担当者にニーズが集まる）”を伝える役。

### G. call-recording ヒーロー（通話録音・AI要約）

- 比率：**16:10**。
- 伝える核：携帯でも固定でも対面でも、話すだけ → AIが文字起こし・要約。

```
Photorealistic, quiet-premium editorial photograph.
A Japanese real-estate agent (30s–40s, smart-casual) at a clean minimal desk, mid-conversation,
a smartphone resting on a small desk stand beside a compact clip mic.
On the laptop, a calm transcription/summary panel with an emerald-green (#0D7C66) accent
shows a generic waveform turning into tidy summary bullet lines — UI abstracted, softly blurred (no readable text).
Soft natural daylight, warm off-white and light-wood palette, shallow depth of field,
focused and composed mood (no exaggerated smile). No logos, no on-image text, no emojis.
Negative space on one side for overlay copy. 16:10, high resolution.
```

---

## 4. OGP（SNSシェア画像・1200×630）

> H. 文字が必須なので **Ideogram v3 / Nano Banana Pro**、または確実に綺麗にするなら **Canva/Figmaで直組み**を推奨。

```
A premium SaaS social share card, 1200x630, warm off-white background (#FAFAF8), generous whitespace.
Left side: bold Japanese headline "入社初日の新人が、トップ営業の動きをする。"
in a clean Japanese gothic font (Noto Sans JP), dark ink (#0F1A16);
below it a smaller line "楽マッチ AI ── 不動産売買特化のAI営業CRM" in emerald green (#0D7C66).
Right side: a clean laptop showing a light-theme real-estate CRM dashboard with an emerald accent,
soft premium shadow, rounded corners. Quiet, trustworthy, minimal. One emerald accent only.
No emojis, no clutter. Text must be crisp and correctly rendered.
```

> 文字の正確さが不安なら：背景＋ノートPCだけをAI生成 → 文字は Canva/Figma で重ねるのが最も安全・確実。

---

## 5. 差し替え手順（実装メモ）

- **製品画面（A〜E）**：磨いた画像を同名で `/public` に上書き。`page.tsx` / 各 `features/*` は変更不要。
- **ブランク枠（F・G）**：写真カードを表示するため `ScreenMockup`（MacBook枠）→ 写真カード枠への差し替えが必要。`FeatureDemoMedia` の `fallback` を「画像カード」に変えるだけ（ART_DIRECTION §6：rounded-2xl＋`shadow-[0_20px_60px_rgba(5,57,43,0.12)]`＋`ring-1 ring-surface-200`＋背後に淡い `primary-50` ぼかし）。実装はこちらで対応可。
- **OGP（H）**：`/public/ogp.png` を上書き。`layout.tsx` 参照はそのまま。
- 各画像の `alt` は「デモ画面（イメージ）」等のコンプラ表記を維持（ART_DIRECTION §9 / COMPLIANCE）。
- 数値・効果を画像に焼き込まない（「90%削減」等は注記必須。画像で煽らない）。
