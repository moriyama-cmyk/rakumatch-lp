// GA4 イベント送信の共通ユーティリティ。
// window.gtag は Analytics コンポーネント（src/components/lp/Analytics.tsx）が
// 初回マウント時に注入する。未注入・計測オフ環境（GA_ID='off'等）では何もしない安全ガード付き。
// window.clarity の型は Analytics.tsx の declare global が持つため、ここでは再宣言しない。

import { SITE } from "@/components/lp/site";

type Gtag = (...args: unknown[]) => void;

function getGtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: Gtag }).gtag;
}

/**
 * CTA（「無料で試す」等）クリック計測。
 * location: どのボタンか判別する識別子（例: 'header' / 'hero_primary' / 'final_cta'）。
 * destination: 遷移先URL（外部CTAのみ渡す。ページ内アンカーはtrackNavを使う）。
 * copy_variant を全イベントに付与し、どのコピーが押されているかをコピー別に集計できるようにする。
 */
export function trackCta(location: string, destination?: string): void {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", "cta_click", {
    cta_location: location,
    copy_variant: SITE.copyVariant,
    ...(destination ? { link_url: destination } : {}),
  });
  if (typeof window !== "undefined") window.clarity?.("event", "cta_click");
}

/** ページ内アンカー等の内部ナビ。cta_clickの純度を守るため別イベントに分離。 */
export function trackNav(location: string): void {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", "nav_click", { nav_location: location, copy_variant: SITE.copyVariant });
}
