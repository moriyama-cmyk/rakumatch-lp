// GA4 イベント送信の共通ユーティリティ。
// window.gtag は Analytics コンポーネント（src/components/lp/Analytics.tsx）が
// 初回マウント時に注入する。未注入・計測オフ環境（GA_ID='off'等）では何もしない安全ガード付き。

type Gtag = (...args: unknown[]) => void;

function getGtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: Gtag }).gtag;
}

/**
 * CTA（「無料で試す」等）クリック計測。
 * location: どのボタンか判別する識別子（例: 'header' / 'hero_primary' / 'final_cta'）。
 * どのコピーが押されているかをLP改善ループで見るための最小イベント。
 */
export function trackCta(location: string): void {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", "cta_click", { cta_location: location });
}
