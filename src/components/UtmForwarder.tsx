"use client";

import { useEffect } from "react";

// ============================================================
//  UtmForwarder — 流入経路をアプリ側へ引き継ぐ
//
//  なぜ必要か:
//    営業メールのリンクは utm 付きで LP に着地するが、LP の「実画面を見る」
//    ボタンは app.rakumatch-ai.com への固定URLだった。そのため
//    「メールで来た人が実際に触ったか」がアプリ側で分からなかった。
//
//  なぜ1箇所でやるか:
//    アプリへのリンクは LP 全体で20箇所以上あり、個別に直すと必ず漏れる。
//    クリックの瞬間に href を書き換える方式なら、あとから足したボタンも
//    自動で対象になる。
//
//  LP 内を回遊してクエリが消えても引き継げるよう、sessionStorage に控える。
// ============================================================

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const STORAGE_KEY = "rakumatch:utm";
const APP_HOST = "app.rakumatch-ai.com";

export default function UtmForwarder() {
  useEffect(() => {
    let carried = "";

    try {
      const q = new URLSearchParams(window.location.search);
      const found = new URLSearchParams();
      for (const k of UTM_KEYS) {
        const v = q.get(k);
        if (v) found.set(k, v);
      }
      carried = found.toString();
      if (carried) {
        sessionStorage.setItem(STORAGE_KEY, carried);
      } else {
        carried = sessionStorage.getItem(STORAGE_KEY) ?? "";
      }
    } catch {
      /* sessionStorage が使えなくても本体は動かす */
    }

    if (!carried) return;
    const carry = new URLSearchParams(carried);

    // capture フェーズで href を書き換える。既定の遷移が走る前に間に合う。
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;

      const href = a.getAttribute("href");
      if (!href || !href.includes(APP_HOST)) return;

      try {
        const u = new URL(href, window.location.href);
        // 既に付いている値は尊重する（個別に指定したものを壊さない）
        carry.forEach((v, k) => {
          if (!u.searchParams.has(k)) u.searchParams.set(k, v);
        });
        a.setAttribute("href", u.toString());
      } catch {
        /* URL として解釈できないものは触らない */
      }
    };

    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}
