import { SITE } from "@/components/lp/site";

type Gtag = (...args: unknown[]) => void;

function getGtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: Gtag }).gtag;
}

type CtaKind = "demo" | "trial" | "anchor";

const EVENT_BY_KIND: Record<CtaKind, string> = {
  demo: "demo_cta_click",
  trial: "trial_cta_click",
  anchor: "feature_anchor_click",
};

export function trackCta(location: string): void;
export function trackCta(kind: CtaKind, location: string, linkUrl?: string): void;
/** 匿名デモ・カード登録付きトライアル・ページ内アンカーを別イベントで送る。 */
export function trackCta(kindOrLocation: CtaKind | string, location?: string, linkUrl?: string): void {
  // 詳細ページの旧呼び出しは匿名デモとして扱い、トップLPの新イベント設計と後方互換にする。
  const kind: CtaKind = location ? (kindOrLocation as CtaKind) : "demo";
  const resolvedLocation = location ?? kindOrLocation;
  const eventName = EVENT_BY_KIND[kind];
  const gtag = getGtag();
  gtag?.("event", eventName, {
    cta_location: resolvedLocation,
    copy_variant: SITE.copyVariant,
    link_url: linkUrl,
  });

  if (typeof window === "undefined") return;
  const clarity = (window as unknown as { clarity?: (...args: unknown[]) => void }).clarity;
  clarity?.("set", "cta_location", resolvedLocation);
  clarity?.("event", eventName);
}
