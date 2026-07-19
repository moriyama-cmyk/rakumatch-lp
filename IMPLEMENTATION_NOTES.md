# 実装 逸脱メモ（Implementation Notes）

計画に対する逸脱を記録し、次回の計画精度を上げるためのファイル。

## 2026-07-19 ヒーロー直下ビジュアルを「ノートPC＋横並びスマホ」に作り替え（`Hero.tsx`）

計画: 前版（ブラウザ窓chrome付きPC＋右下重ねスマホ）を、発注者の参考画像の構図——ノートPC（開いた形・画面＋下に本体のヒント）に実アプリ画面、その"横に"スマホを立てて並べる——へ作り替える。

### 逸脱・判断メモ
- **`AppShot` を流用せず素の `<picture>` に変更**: ノートPCは「ブラウザchromeを外す＋暗色ベゼルで額装」が要件で、`AppShot`（白枠rounded-2xl・chromeはブラウザ風固定）では表現できないため、PC画面も `Hero.tsx` 内に `border-ink-900` の暗色ベゼル＋`<picture>`(webp/opt.jpg) で inline 実装。結果 `AppShot` import は不要になったので削除した（他所での利用は無し）。
- **ノートPC本体（キーボード面/ヒンジ）は CSS のみ**: 画面ベゼルの直下に、`clip-path: polygon(3% 0,97% 0,100% 100%,0 100%)` の薄い台形バー（`from-ink-700 to-ink-900` グラデ・高さ `h-3.5 sm:h-4`）＋中央にヒンジのくぼみ（`bg-black/25`）を追加。実写画像は使わず装飾は控えめ、画面本体は覆っていない。台形が画面より少し広く見えるよう、画面側に `mx-[3.5%]` の内マージンを付け、本体バーはラッパー全幅にした（要素がコンテナ幅を超えない＝overflow事故を出さない設計）。
- **レイアウトは flex 横並び**: 前版の `absolute` 重ねをやめ、`flex flex-col items-center`（モバイル=縦積み）→ `sm:flex-row sm:items-end sm:justify-center`（PC=横並び・下端揃え）。PC=`sm:flex-1`（可変・主役）、スマホ=`sm:w-[200px] sm:flex-none`（固定・中サイズ）。スマホは縦長で PC 画面より背が高く、items-end で下端を揃えると PC の右横に"立って"見える＝連動が直感的。
- **検証は Node 版 Playwright**: このマシンの `python` は Microsoft Store のスタブ（実体なし）で webapp-testing スキルの Python 経路が使えず、代わりに `npx playwright`（Node・v1.61.1・chromium headless）でスクリプトを書いて 1280 幅と 390 幅のスクショ＋overflow計測を実施。

### 検証結果
- `npm run build` 成功（Next.js 16.2.1 / TypeScript・ESLint OK）。
- デスクトップ(1280): ノートPC（主役・左）＋スマホ（右・立て）が横並び。ノートPC本体の台形＋ヒンジで「開いたPC」に見える。ブラウザchromeなし。`scrollWidth==clientWidth`（横あふれ 0）。画像の潰れなし。
- モバイル(390): ノートPC（上・全幅）→スマホ（下・中央・`w-[54%] max-w-[188px]`）の縦積み。`scrollWidth==clientWidth`（横あふれ 0）。両画像とも読めるサイズ。

### 懸念点
- スマホ実画像 `shot-customer-app-list`（868×1887）は縦長のため、PC横に置くと背が高く上下に張り出す。参考画像通りの"横に立てて並ぶ"構図には合致するが、将来PC画像の縦横比が変わると下端揃えのバランスが崩れうる。
- 台形本体は `clip-path` inline style。Tailwind arbitrary の polygon はカンマのエスケープが要るため意図的に style 属性にした（将来トークン化する場合は注意）。

## 2026-07-19 ヒーロー直下ビジュアルを PC＋スマホ合成に置換（`Hero.tsx`）

計画: ヒーロー直下の `<AppShot base="/shot-top-hero" />` 単体を、PC（営業画面・主役）＋スマホ（お客様連動アプリ）の合成ビジュアルに置換。

### 逸脱・判断メモ
- **PCにブラウザchromeを付与**: 既存 `AppShot` の `chrome` prop（信号ドット＋URLピル `app.rakumatch-ai.com`）を有効化し「PC/ブラウザ＝営業の画面」であることを一目で伝わるようにした。計画の「軽いブラウザ/ノート風の縁取りは可」の範囲内。画面本体は覆っていない。
- **スマホは専用の暗色ベゼル枠を新規に inline 実装**: `AppShot`（rounded-2xl・白枠）はスマホ見えしないため流用せず、`Hero.tsx` 内に `border-ink-900` の細い角丸フレーム＋`<picture>`(webp/opt.jpg) で phone 風に描画。既存の Img/AppShot コンポーネントは追加せず流用方針は維持。
- **レスポンシブ実装**: sm以上=スマホを `absolute` で PC 右下へ重ねる（`sm:bottom-1 sm:-right-2 sm:w-[30%] sm:max-w-[224px]`）。モバイル=`relative -mt-12 ml-auto` で PC 直下に右寄せ・上方向に少し重ねて縦積み（`w-[40%] max-w-[168px]`）。破綻・横スクロールを回避。
- **検証方法の逸脱**: `resize_window` で 390px 幅にできなかった（Chrome 側でビューポートが 1920 のまま）ため、390px 幅の `<iframe>` にページを読み込み、メディアクエリを実幅で発火させて幾何・overflow を測定して代替検証した。

### 検証結果
- `npm run build` 成功（Next.js 16.2.1 / TypeScript OK）。
- デスクトップ(1280): PC 主役＋スマホ右下重ねが意図通り。横スクロールなし（`scrollWidth == clientWidth`）。
- モバイル(iframe 386px): `overflowX = 0`（横はみ出しなし）。PC 全幅(上)＋スマホ右寄せ(下)で PC 下端に ~42px 重なる。スマホ右端 342 < コンテンツ幅 371 で収まる。画像の潰れなし。

### 懸念点
- モバイルでスマホがフロー内配置のため、PC 下端に重なりつつ縦方向にスペースを取る（`※`注記はスマホの下に来る）。意図通りだが、将来コピー量が増えると縦が伸びる点に留意。
