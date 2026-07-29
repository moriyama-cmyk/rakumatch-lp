// GA4 イベント送信の共通ユーティリティ。
// window.gtag は Analytics コンポーネント（src/components/lp/Analytics.tsx）が
// 初回マウント時に注入する。未注入・計測オフ環境（GA_ID='off'等）では何もしない安全ガード付き。

import { SITE } from "@/components/lp/site";

type Gtag = (...args: unknown[]) => void;
type Clarity = (...args: unknown[]) => void;

function getGtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: Gtag }).gtag;
}

function getClarity(): Clarity | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { clarity?: Clarity }).clarity;
}

// 直近で trackCta() が発火した時刻。Analytics.tsx の document クリック監視
// （location 未指定の /try リンク救済用）が同じクリックを二重計上しないための目印。
// React のハンドラ（= trackCta）は root コンテナで先に走り、document 監視が後に走る。
let lastTrackedAt = 0;

/** 直近 300ms 以内に trackCta() が呼ばれたか（同一クリックの二重計上防止用） */
export function ctaJustTracked(): boolean {
  return Date.now() - lastTrackedAt < 300;
}

/**
 * CTA（「無料で試す」等）クリック計測。
 * location: どのボタンか判別する識別子（例: 'header' / 'hero_night' / 'final_cta'）。
 * どのコピーが押されているかをLP改善ループで見るための最小イベント。
 * イベント名は cta_click に一本化（旧 cta_try_click は廃止・2026-07-25）。
 */
export function trackCta(location: string): void {
  lastTrackedAt = Date.now();
  getGtag()?.("event", "cta_click", {
    cta_location: location,
    copy_variant: SITE.copyVariant,
  });
  getClarity()?.("event", "cta_click");
}
