'use client'

import type { ReactNode } from 'react'
import { ArrowRight, Play, Phone } from 'lucide-react'
import { Container } from '../ui/Container'
import { GlowButton } from '../ui/GlowButton'
import { GradientText } from '../ui/GradientText'
import { Reveal } from '../ui/Reveal'
import { SITE } from '../site'
import { hlText } from '../lib/headline'
import { trackCta } from '@/lib/track'
import { MockFrame, AppSidebar, MatchCard, AiPanel, PhoneApp } from '../mock'

/**
 * ファーストビュー（1スクリーン縦積み）。
 * 上から: カテゴリ行（最重要・特大）→ メインキャッチ → サブ → アンカリング（チップ2＋価格）
 * → CTA → マイクロコピー。スマホ375pxで6要素が1画面に収まる高さに。
 * 実アプリ画面はファーストビュー直下に配置。
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-x-clip bg-fade-primary pb-14 pt-24 sm:pb-24 sm:pt-36"
    >
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* 1. カテゴリ行（H1でSEOキーワードを保持しつつ、エヤブロウとして小さめに）。
              2026-07-19 デザイン改修: ファーストビューのLCP要素のためRevealのopacity-0/transformを撤去し素のdivに。 */}
          <div>
            <h1 className="font-bold tracking-tight text-primary-700 [font-size:clamp(0.95rem,3.6vw,1.45rem)]">
              {SITE.categoryLine}
            </h1>
          </div>

          {/* 2. メインキャッチ（最大）。2026-07-18 コピーチーム選定（4書き手×3審査員ループ・8.7点）。
              旧「月3,000円で、月5万円のCRMに勝つ方法があります。」→ 価格はチップへ移設。
              2026-07-19 デザイン改修: Revealを撤去し素のdivに（LCP要素・主従回復のためclamp値も引き上げ）。 */}
          <div>
            {/*
              意味のまとまり（文節）ごとに whitespace-nowrap で包み、語の途中では絶対に
              折り返さない。改行はかたまりの境界でのみ起きる。
            */}
            {/* 2026-07-19 デザイン改修の是正: clamp下限を 2.125rem(34px) まで上げたところ、
                375px 幅で「トップ営業マンの動きができる。」(13字)を1つの nowrap で包んでいたため
                右端で見切れた。下限を 1.9rem(≈30.4px・最長かたまり10字=304px<343px)に戻し、
                かたまりを「〜の動き」「ができる。」の2つに割って折り返せるようにする。 */}
            <p className="mt-2.5 font-bold leading-[1.16] tracking-[-0.005em] text-ink-900 [font-size:clamp(1.9rem,6.4vw,4rem)] sm:mt-3.5">
              <span className="inline-block whitespace-nowrap">
                <span className="text-accent-600">新人</span>でも、
              </span>
              <span className="inline-block whitespace-nowrap">
                <span className="text-accent-600">初日</span>から
              </span>
              <br className="hidden sm:block" />
              <span className="inline-block whitespace-nowrap">
                <GradientText className="text-primary-700">トップ営業マンの動き</GradientText>
              </span>
              <span className="inline-block whitespace-nowrap">ができる。</span>
            </p>
          </div>

          {/* 3. サブ行 */}
          <Reveal delay={0.1}>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink-700 sm:mt-5 sm:text-lg">
              {hlText('誰に、何を出すか。')}
              <span className="whitespace-nowrap">— AIが先に決めています。</span>
            </p>
            <p className="mt-1.5 text-sm text-ink-500">
              {hlText('パソコンが苦手でも、大丈夫。操作は"貼るだけ"しかありません。')}
            </p>
          </Reveal>

          {/* 4. アンカリング（チップ3）。価格は見出しに統合したので重複表示はしない。 */}
          <Reveal delay={0.13}>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:mt-6">
              <Chip>月3,000円/人</Chip>
              <Chip>初月1,500円〜</Chip>
              <Chip>導入費 0円</Chip>
            </div>
            <p className="mt-2 text-xs text-ink-500">※ 料金はすべて税込・1人あたりの月額です。</p>
          </Reveal>

          {/* 5. CTA */}
          <Reveal delay={0.16}>
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row">
              <GlowButton
                href={SITE.ctaTryUrl}
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => trackCta('hero_primary')}
              >
                登録なしで、実物の画面を触る
                <ArrowRight className="h-5 w-5" />
              </GlowButton>
              {/* 2026-07-24 修正: #hub（機能ダイジェスト）ではなく #features（主要4機能の先頭）へ着地させる。
                  「機能を見る」が主要4機能を飛ばしてダイジェストに着地していた事故の修正。 */}
              <GlowButton
                href="#features"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => trackCta('hero_secondary')}
              >
                <Play className="h-4 w-4" />
                {SITE.ctaSecondaryLabel}
              </GlowButton>
            </div>

            {/* 6. マイクロコピー（3行）。2026-07-19 事実誤り修正: デモ(登録・カード不要)とトライアル(カード必要・7日以内解約で無料)を混同しないよう分離。
                同日デザイン改修: 横幅を絞って画像を押し下げる重さを軽減。 */}
            <div className="mx-auto mt-4 max-w-xl space-y-1 text-xs text-ink-500">
              <p>まずは登録なしで、実物の画面を触れます。連絡先も不要なので、営業の電話やメールが来ることもありません。</p>
              <p>気に入って有料機能を試すときだけ登録が必要ですが、7日以内に解約すれば料金は一切かかりません。</p>
              <p>合わなければ、そのまま離れるだけです。</p>
            </div>
          </Reveal>
        </div>

        {/* 実アプリ画面。ファーストビュー直下。
            2026-07-19 森山さん指摘「パソコンのほうが小さいのやだ。大きく。すまほはかぶってもいいから、右下に。」
            を受けて全面改修: 実画面スクショの<img>を廃し、コード製の再現UI（mock/配下の共通部品）に
            差し替えた。主役は「顧客情報とAIの提案とマッチ物件が一画面に並んでいる配置」＝
            AppSidebar + 顧客情報カード + AIの提案(AiPanel) + マッチ物件カード(MatchCard) の2カラム構成
            （実アプリは3カラムだがLPでは読めないため2カラムに圧縮。書類フォルダ列・詳細情報アコーディオン・
            複数の連絡ボタン・履歴/紹介/案内済タブの中身は捨てた。連絡は「電話する」1つに集約）。
            PC枠は親いっぱい(w-full)まで拡大。スマホ（お客様連動アプリ=PhoneApp）は sm 以上で
            PCの右下に重ねる（かぶってよい指示のため z-10 で前面へ）。sm未満は重ねると破綻するため
            従来どおり縦積みにフォールバックする。横スクロールは出さない（section の overflow-x-clip と併用）。
            架空データ注記は PC/スマホ共通で1回だけ、両方の下にまとめて表示する
            （MockFrame/PhoneApp 側の note は二重表示を避けるため両方 false にしている）。 */}
        <div className="relative mx-auto mt-10 w-full sm:mt-14">
          {/* ノートPC（営業の画面・主役）。コード製のデスクトップ再現。ブラウザ風の額装(MockFrame)。 */}
          <MockFrame variant="desktop" chromeUrl="app.rakumatch-ai.com" note={false} className="w-full">
            <div className="flex items-stretch">
              <AppSidebar activeKey="customers" className="hidden sm:flex" />
              <div className="flex min-w-0 flex-1 flex-col">
                {/* ヘッダー: 顧客名＋連絡は「電話する」1つに集約 */}
                <div className="flex items-center justify-between gap-3 border-b border-surface-200 px-4 py-3 sm:px-6 sm:py-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-bold text-ink-900 sm:text-xl">田中 様</h3>
                    <p className="mt-0.5 truncate text-sm text-ink-500 sm:text-base">
                      3LDK・世田谷区／目黒区・予算〜5,000万円
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary-600 px-3 py-2 text-sm font-bold text-white shadow-soft sm:px-4 sm:py-2.5 sm:text-base">
                    <Phone className="h-4 w-4" aria-hidden />
                    電話する
                  </span>
                </div>

                {/* 2カラム本体: 左=顧客情報+AIの提案 / 右=マッチ物件 */}
                <div className="grid flex-1 grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-5 sm:p-5">
                  <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="rounded-2xl border border-surface-200 bg-white p-3 shadow-soft sm:p-4">
                      <h4 className="text-sm font-bold text-ink-900 sm:text-base">お客様の希望条件</h4>
                      <dl className="mt-2 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <dt className="text-sm text-ink-500">エリア</dt>
                          <dd className="truncate text-sm font-semibold text-ink-800 sm:text-base">
                            世田谷区・目黒区
                          </dd>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <dt className="text-sm text-ink-500">間取り</dt>
                          <dd className="truncate text-sm font-semibold text-ink-800 sm:text-base">3LDK以上</dd>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <dt className="text-sm text-ink-500">予算</dt>
                          <dd className="truncate text-sm font-semibold text-ink-800 sm:text-base">
                            〜5,000万円
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <AiPanel
                      actions={[]}
                      messages={[
                        { role: 'user', content: '田中様に合う物件、他にありますか？' },
                        {
                          role: 'ai',
                          content:
                            '内見履歴から「駅徒歩」より「築年数」を重視されています。新着の築8年物件が3件マッチしました。',
                        },
                      ]}
                    />
                  </div>

                  {/* lg以上ではスマホを右下に重ねるため、その分だけ右に余白を作り、
                      物件名がスマホの下に隠れないようにする（かぶってよい＝ただし内容は読める）。 */}
                  <div className="flex flex-col gap-2 lg:pr-[150px]">
                    <h4 className="text-sm font-bold text-ink-900 sm:text-base">
                      マッチした物件 <span className="text-primary-600">3件</span>
                    </h4>
                    <MatchCard
                      data={{
                        rank: 1,
                        name: 'みどり坂レジデンス',
                        score: 92,
                        reasons: ['間取り', 'エリア'],
                        meta: '4,780万円・3LDK・築7年',
                      }}
                    />
                    <MatchCard
                      data={{
                        rank: 2,
                        name: 'ひかり町ガーデン',
                        score: 81,
                        reasons: ['駅徒歩', '築年数'],
                        meta: '4,580万円・3LDK・築9年',
                      }}
                    />
                    <MatchCard
                      data={{
                        rank: 3,
                        name: 'さくら丘テラス',
                        score: 68,
                        reasons: ['エリア', '沿線'],
                        meta: '4,950万円・4LDK・築12年',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </MockFrame>

          {/* スマホ（お客様連動アプリ）。sm以上=PC右下に重ねる（かぶってよい指示のためz-10で前面）。
              sm未満=重ねると破綻するので、PCの下へ縦積みにフォールバックする。 */}
          {/* 2026-07-19 是正: 重ねる開始点を sm → lg に上げた。sm/md ではカラムが狭く、
              スマホを重ねるとマッチ物件の文字が完全に隠れてしまうため（実描画で確認）。
              lg未満はPCの下に縦積みして、両方とも読める状態を保つ。 */}
          <div className="mx-auto mt-6 w-[62%] max-w-[220px] lg:absolute lg:-bottom-6 lg:-right-6 lg:z-10 lg:mx-0 lg:mt-0 lg:w-[230px] lg:max-w-[230px] lg:drop-shadow-2xl">
            <PhoneApp
              customerName="田中様"
              note={false}
              properties={[
                {
                  title: 'みどり坂レジデンス',
                  price: '4,780万円',
                  meta: '田園都市線・3LDK・築7年',
                  status: 'viewing',
                },
                {
                  title: 'ひかり町ガーデン',
                  price: '4,580万円',
                  meta: '東急目黒線・3LDK・築9年',
                },
              ]}
            />
          </div>
        </div>

        <p className="mx-auto mt-3 max-w-3xl text-center text-xs text-ink-500">
          ※架空データによる再現イメージ
        </p>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-ink-500">
            ※ マッチングの点数や各種試算は、営業判断を助けるための目安です。
          </p>
        </Reveal>
      </Container>
    </section>
  )
}

/** アンカリング用の小チップ（白地・緑枠）。 */
function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-primary-200 bg-white px-3 py-1 text-xs font-bold text-primary-700 sm:text-sm">
      {children}
    </span>
  )
}
