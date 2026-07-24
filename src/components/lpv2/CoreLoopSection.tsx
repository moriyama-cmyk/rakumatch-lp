'use client'

// 商品の核＝3ステップのループ（STEP1 INPUT → STEP2 MATCH → STEP3 PROPOSE）。
// デスクトップ（900px以上・reduced-motionでない）では右側にスティッキーの
// ブラウザフレームが張り付き、スクロールに応じて画像・注釈ピン・URL・下部の
// pip（●●●）が切り替わる。モバイル／reduced-motionでは各ステップが自前の
// 静止画（fallback figure）を持つ縦積みレイアウトになる（PORT_SPEC技術仕様の
// reduced-motionフォールバック要件）。
//
// 注釈は PORT_SPEC の指示により「番号ピン＋外出しリスト」方式（BrowserShot参照）。
// STEP1/STEP2は縮小時に潰れる細部のため、assets班の拡大切り出し画像
// （lpv2-crop-ai-input-panels / lpv2-crop-property-match）に差し替えている。
// STEP3はお客様アプリ節からの「もう見えていました」の呼応（右パネル）を保つため
// 全景（lpv2-customer-detail）のまま。
import { useEffect, useRef, useState } from 'react'
import { trackCta } from '@/lib/track'
import { BrowserShot, type DetailCrop, type Pin } from './BrowserShot'
import { ParseDemo } from './ParseDemo'

const APP_TRY_URL = 'https://app.rakumatch-ai.com/try'

type StepId = '1' | '2' | '3'

type StepDef = {
  step: StepId
  url: string
  label: string
  title: string
  desc: string
  image: { src: string; width: number; height: number; alt: string }
  pins: Pin[]
  list: string[]
  caption: string
  detail: DetailCrop
}

// 全景スクリーンショットを主図に使い（AB案オリジナルと同じ構図）、ピン座標も
// AB案の callout 位置（top/left/right の%指定）をそのまま踏襲している。
// 加えて、全景では読めない細部を assets班の拡大切り出し画像（public/lpv2/manifest.md
// 記載の実寸）で detail-crop として併記する（PORT_SPEC「拡大切り出し画像に差し替え」対応・
// ただしフィグ自体は全景を残し「差し替え」ではなく「補強」とした判断は
// docs/lpv2-implementation-notes.md に記録）。
const STEPS: StepDef[] = [
  {
    step: '1',
    url: 'app.rakumatch-ai.com/ai-input',
    label: 'STEP 1 — INPUT',
    title: 'コピペする、投げ込む。',
    desc: 'レインズの一覧は、Ctrl+Aでコピペ。レインズは今も、外部システムとの連携や二次利用が規約で認められていない——だからこそ、貼るのが最短ルートになる。図面のPDFやスクリーンショットも、そのまま投げ込むだけ。数百件級でも、AIが一件ずつ「物件カード」に整理して自動登録する。顧客情報も同じ要領で、ポータルの反響メールを貼るだけでいい。',
    image: {
      src: '/lpv2/lpv2-ai-input.webp',
      width: 1920,
      height: 1080,
      alt: 'AI一括入力ハブの画面。顧客情報と物件情報を、それぞれテキストを貼るだけで解析・自動登録できる。',
    },
    pins: [
      { n: 1, top: '15%', left: '24%' },
      { n: 2, top: '24%', right: '20%' },
    ],
    list: ['貼るだけでAIが解析', 'PDF・図面画像もドロップ可'],
    caption: 'Fig.01 — AI一括入力ハブ（デモデータ表示）',
    detail: {
      src: '/lpv2/lpv2-crop-ai-input-panels.webp',
      width: 1200,
      height: 507,
      alt: 'AI一括入力ハブの中央パネル拡大。テキストを貼るだけでAIが解析し、PDF・図面画像もドロップできる。',
      caption: '拡大 — 入力パネル',
    },
  },
  {
    step: '2',
    url: 'app.rakumatch-ai.com/properties/12',
    label: 'STEP 2 — MATCH',
    title: '「誰に紹介するか」は、もう並んでいる。',
    desc: '登録された物件には、マッチ○名バッジが自動でつく。開けば、条件に合う顧客がスコア順に並ぶ。顧客を開いても、合う物件が同じように並ぶ。案内が済んだ物件は、静かに候補から外れていく。',
    image: {
      src: '/lpv2/lpv2-property-detail.webp',
      width: 1920,
      height: 1080,
      alt: '物件詳細画面。右側に田中太郎さま、合致度100%のマッチ顧客が条件チェック付きで表示されている。',
    },
    pins: [
      { n: 1, top: '9%', right: '9%' },
      { n: 2, top: '16%', right: '5%' },
    ],
    list: ['田中太郎さま・合致度100%', '条件を自動でチェック'],
    caption: 'Fig.02 — 物件詳細・マッチ顧客（デモデータ表示）',
    detail: {
      src: '/lpv2/lpv2-crop-property-match.webp',
      width: 700,
      height: 426,
      alt: '物件詳細画面の右パネル拡大。田中太郎さま・合致度100%のマッチ顧客カード。',
      caption: '拡大 — マッチ顧客パネル',
    },
  },
  {
    step: '3',
    url: 'app.rakumatch-ai.com/customers/5',
    label: 'STEP 3 — PROPOSE',
    title: 'あとは、送るだけ。',
    desc: 'メールの文面も、電話で話す内容も、物件の説明文も。AIがすでに下書きを用意している。潜在ニーズの提案まで添えて。営業が最後にやることは、内容を確かめて、送るボタンを押すことだけ。',
    image: {
      src: '/lpv2/lpv2-customer-detail.webp',
      width: 1920,
      height: 1080,
      alt: '顧客詳細画面。左に顧客情報、中央にAIアシスタントの潜在ニーズ提案、右にお客様がアプリで保存した物件が並ぶ。',
    },
    pins: [
      { n: 1, top: '13%', left: '39%' },
      { n: 2, top: '22%', right: '19%' },
    ],
    list: ['AIが潜在ニーズを提案', 'お客様がアプリで保存した物件'],
    caption: 'Fig.03 — 顧客詳細・AIアシスタント（デモデータ表示）',
    detail: {
      src: '/lpv2/lpv2-crop-ai-needs.webp',
      width: 1200,
      height: 557,
      alt: '顧客詳細画面の潜在ニーズ提案パネル拡大。物件種別・希望駅の提案カードが2枚並ぶ。',
      caption: '拡大 — 潜在ニーズ提案パネル',
    },
  },
]

const URL_MAP: Record<StepId, string> = {
  '1': STEPS[0].url,
  '2': STEPS[1].url,
  '3': STEPS[2].url,
}

export function CoreLoopSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepRefs = useRef<Partial<Record<StepId, HTMLElement>>>({})
  const [isEnhanced, setIsEnhanced] = useState(false)
  const [activeStep, setActiveStep] = useState<StepId>('1')

  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 900px)')
    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)')

    const evaluate = () => setIsEnhanced(mqDesktop.matches && !mqReduced.matches)
    evaluate()

    let resizeTimer: number | undefined
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(evaluate, 150)
    }
    window.addEventListener('resize', onResize)
    mqReduced.addEventListener?.('change', evaluate)

    return () => {
      window.removeEventListener('resize', onResize)
      mqReduced.removeEventListener?.('change', evaluate)
      window.clearTimeout(resizeTimer)
    }
  }, [])

  useEffect(() => {
    if (!isEnhanced) return
    const entries = Object.entries(stepRefs.current) as [StepId, HTMLElement][]
    if (!entries.length) return

    const io = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) {
            const found = entries.find(([, el]) => el === entry.target)
            if (found) setActiveStep(found[0])
          }
        }
      },
      { root: null, rootMargin: '-42% 0px -42% 0px', threshold: 0 },
    )
    entries.forEach(([, el]) => io.observe(el))
    return () => io.disconnect()
  }, [isEnhanced])

  // activeDef は番号ピン表示（2026-07-24 廃止）で使っていた。復活させる場合はここで STEPS から引く。

  return (
    <div className="blueprint-zone">
      <section
        ref={sectionRef}
        className={`sec day loop-sec${isEnhanced ? ' is-enhanced' : ''}`}
        id="loop"
      >
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">朝の記録 ・ 8:40 ー 出社</p>
            <h2>商品の本体、3つのステップ。</h2>
            <p className="lead">
              夜のあいだ考えていたことの答えが、ここにある。スクロールすると、右の画面が切り替わります（対応デバイスのみ）。
            </p>
          </div>
        </div>

        <div className="wrap">
          <div className="loop-scroller">
            <div className="loop-rail">
              {STEPS.map((s) => (
                <article
                  key={s.step}
                  className={`loop-step${isEnhanced && activeStep === s.step ? ' is-active' : ''}`}
                  data-step={s.step}
                  ref={(el) => {
                    if (el) stepRefs.current[s.step] = el
                    else delete stepRefs.current[s.step]
                  }}
                >
                  <p className="loop-step__label">{s.label}</p>
                  <h3>{s.title}</h3>
                  <p className="desc">{s.desc}</p>

                  {s.step === '1' && (
                    <>
                      <ParseDemo />
                      <p className="fig-note">
                        ※架空データによる再現イメージです。
                        <br />
                        実在の物件情報では<span className="nowrap">ありません。</span>
                      </p>
                    </>
                  )}

                  <BrowserShot
                    fallback
                    url={s.url}
                    src={s.image.src}
                    width={s.image.width}
                    height={s.image.height}
                    alt={s.image.alt}
                    caption={s.caption}
                    pins={s.pins}
                    list={s.list}
                  />
                </article>
              ))}
            </div>

            <div className="loop-frame-wrap">
              <div className="loop-frame">
                <div className="browser-frame">
                  <div className="browser-frame__bar">
                    <span className="browser-frame__dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                    <span className="browser-frame__url">{URL_MAP[activeStep]}</span>
                    <span className="browser-frame__pips" aria-hidden="true">
                      {STEPS.map((s) => (
                        <i key={s.step} className={activeStep === s.step ? 'is-active' : ''} />
                      ))}
                    </span>
                  </div>
                  <div className="browser-frame__body loop-frame__body">
                    {STEPS.map((s) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={s.step}
                        className={activeStep === s.step ? 'is-active' : ''}
                        src={s.image.src}
                        width={s.image.width}
                        height={s.image.height}
                        alt={s.image.alt}
                      />
                    ))}
                    {/* 2026-07-24 森山さん指示: 画像上の番号ピンは表示しない（注記はレール側の外出しリストのみ） */}
                  </div>
                </div>
                <figcaption className="fig-caption">
                  Fig.01–03 — 丸投げ入力 → 自動マッチ → そのまま提案（デモデータ表示）
                </figcaption>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap">
          <p style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
            <a className="inline-link" href={APP_TRY_URL} onClick={() => trackCta('loop')}>
              → 実物の画面を触ってみる
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
