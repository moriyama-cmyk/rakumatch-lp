'use client'

// 夜パート（21:00 ヒーロー → 23:58 転換点 → 5:12 夜明け）。
// 文言はAB案（direction-ab.html）準拠だが、森山さんの2026-07-24指示により
// 「誰に出すか」系の言い回しを「この物件、誰に紹介するか」軸へ統一している
// （PORT_SPEC「森山さんの追加指示」参照）。
//
// 実装ノート: AB案の3セクションにはCTAが1つも無いが、PORT_SPECのtrackCta
// location命名リストに `hero_night` / `turn_morning` が明記されており、
// 主要セクションごとに1つずつCTAを置く設計意図と判断した（docs/lpv2-implementation-notes.md
// に記録）。ヒーロー（21:00）と夜明け（5:12）に控えめなテキストリンクを追加し、
// 転換点（23:58）は「説明は、朝に。」という溜めの演出を壊さないためCTAを置かない。
import { trackCta } from '@/lib/track'

const APP_TRY_URL = 'https://app.rakumatch-ai.com/try'

export function NightStory() {
  return (
    <>
      <section className="sec hero" id="top">
        <div className="wrap">
          <p className="eyebrow lpv2-reveal">夜の記録 ・ 21:00</p>
          <h1 className="lpv2-reveal">
            今日もまた、
            <br />
            「この物件、
            <br />
            誰に紹介するか」を、
            <br />
            頭の中だけで探している。
          </h1>
          <p className="sub lpv2-reveal">
            レインズの新着一覧。ポータルの反響メール。情報は増えていくのに、頼れるのは自分の記憶だけ。
            表計算ソフトは、記録は残してくれる。けれど、次に誰に、どの物件を紹介すべきかまでは、教えてくれない。
          </p>
          <p className="turn lpv2-reveal">——だから今夜、試してみることにした。</p>
          <p className="lpv2-reveal" style={{ marginTop: 22 }}>
            <a
              className="inline-link"
              href={APP_TRY_URL}
              onClick={() => trackCta('hero_night')}
              style={{ color: 'inherit', opacity: 0.85 }}
            >
              → 登録なしで、今の画面を見てみる
            </a>
          </p>
          <div className="scrollcue lpv2-reveal" aria-hidden="true">
            <span className="line" />
            この先で、何が変わるか
          </div>
        </div>
      </section>

      <section className="sec turnsec">
        <div className="wrap">
          <p className="eyebrow lpv2-reveal center" style={{ justifyContent: 'center' }}>
            夜の記録 ・ 23:58
          </p>
          <h2 className="lpv2-reveal">
            答えは、
            <br />
            名前を持っていた。
          </h2>
          <p className="name-wordmark lpv2-reveal">楽マッチ</p>
          <p className="turn-words lpv2-reveal">丸投げ入力　・　自動マッチ　・　そのまま提案</p>
          <p className="turn-note lpv2-reveal">説明は、朝に。</p>
        </div>
      </section>

      <section className="sec dawnbreak">
        <div className="wrap">
          <p className="eyebrow lpv2-reveal center" style={{ justifyContent: 'center' }}>
            5:12
          </p>
          <h2 className="lpv2-reveal">夜が、明けはじめる。</h2>
          <p className="sub lpv2-reveal">「誰に紹介するか」を探さなくていい朝が、もうそこまで来ている。</p>
          <div className="horizon lpv2-reveal" aria-hidden="true" />
          <p className="lpv2-reveal" style={{ marginTop: 26 }}>
            <a
              className="inline-link"
              href={APP_TRY_URL}
              onClick={() => trackCta('turn_morning')}
              style={{ color: 'inherit', opacity: 0.85, justifyContent: 'center' }}
            >
              → 登録なしで、その朝を先に体験する
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
