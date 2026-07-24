'use client'

// STEP1の実演: 生テキスト（レインズ一覧のコピペ例）→ 物件カードへの変換を、
// スクロールで画面に入ったタイミングで演出する（AB案の parse-demo を移植）。
// reduced-motion・IntersectionObserver非対応環境では最初から完成形（is-parsed相当）を表示する
// （デフォルトでは js-animate クラスを付けないため、CSS上は常に完成状態＝安全側フォールバック）。
import { useEffect, useRef } from 'react'

// 実装ノート: js-animate / is-parsed の付け外しは、React state ではなく元の vanilla script と
// 同じくDOMのclassListを直接操作している。ここはReactの状態としてレンダーに影響する値ではなく
// （見た目のクラス切り替えのみ・テキスト内容は変わらない）、effect内でのsetStateはeslint（react-hooks/
// set-state-in-effect）が指摘するカスケード再レンダーを招くため、素直に副作用として扱う。
export function ParseDemo() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return

    el.classList.add('js-animate')

    let triggered = false
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !triggered) {
            triggered = true
            window.setTimeout(() => el.classList.add('is-parsed'), 650)
            io.unobserve(el)
          }
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className="parse-demo">
      <div className="parse-demo__raw">
        <span className="tag">レインズ一覧のコピペ（例・架空データ）</span>
        <pre>
          中央区月島2丁目　中古マンション　<span className="tok">3LDK</span>　専有<span className="tok">68.20㎡</span>
          （21.29坪）　<span className="tok">6,480万円</span>（坪単価304万円）
          <span className="tok">都営大江戸線「月島」徒歩4分</span>　総階数14階建/8階部分
          <span className="tok">築11年</span>（2015年3月）　バルコニー南向き・角部屋　二重サッシ
          　管理費28,000円／修繕積立金15,200円　取引態様：媒介　情報公開日：2026/06/03　現況：空家
          　引渡し：相談
          <span className="parse-demo__more">…ほか12件</span>
        </pre>
        <span className="parse-demo__cursor" aria-hidden="true" />
      </div>
      <div className="parse-demo__arrow" aria-hidden="true">
        <span className="parse-demo__scanning">
          AIが解析中
          <i />
          <i />
          <i />
        </span>
        <span className="parse-demo__done">→</span>
      </div>
      <div className="parse-demo__card">
        <div className="parse-demo__card-field">
          <span className="parse-demo__card-cat">マンション</span>
        </div>
        <div className="parse-demo__card-field parse-demo__card-title" style={{ transitionDelay: '.08s' }}>
          月島グランドレジデンス（例）
        </div>
        <div className="parse-demo__card-field parse-demo__card-price" style={{ transitionDelay: '.16s' }}>
          6,480万円<small>坪304万円</small>
        </div>
        <div className="parse-demo__card-field parse-demo__card-meta" style={{ transitionDelay: '.24s' }}>
          東京都中央区月島2丁目
        </div>
        <div className="parse-demo__card-field parse-demo__card-meta" style={{ transitionDelay: '.32s' }}>
          都営大江戸線 月島駅 徒歩4分
        </div>
        <div className="parse-demo__card-field parse-demo__card-specs" style={{ transitionDelay: '.4s' }}>
          <span>3LDK ・ 68.20㎡</span>
          <span>築11年</span>
        </div>
        <div
          className="parse-demo__card-bottom parse-demo__card-field parse-demo__card-field--match"
          style={{ transitionDelay: '.5s' }}
        >
          <span className="parse-demo__date">登録: 2026/06/03</span>
          <span className="parse-demo__badge">マッチ 2名</span>
        </div>
      </div>
    </div>
  )
}
