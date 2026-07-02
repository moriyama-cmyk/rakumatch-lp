import Image from "next/image";
import { Fragment } from "react";
import { ArrowRight, ArrowDown, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";

/**
 * BulkInputSteps — 「コピペ一括登録」をパワポ風の4ステップで見せる視覚部品。
 *
 * 実機スクショ（/public の bulk-step-0X-*.png）を枠付きで横一列に並べ、
 * 緑の矢印で 01→02→03→04 をつなぐ。レインズで全選択コピー → 楽マッチに貼付 →
 * 物件ごとのカード（フォルダ）が自動生成、という流れが一目で伝わるようにする。
 *
 * - PC: 横一列（card → 矢印 → card …）
 * - スマホ: 縦積み（card ↓ card …）
 * コンプラ: alt に「デモ画面・イメージ」を明記（ART_DIRECTION §9 / COMPLIANCE）。
 * レインズ画面の会員番号・会社名はマスク済み。
 */

interface BulkStep {
  n: string;
  src: string;
  alt: string;
  caption: string;
  sub: string;
  /** 結果ステップ（4番目）を少し強調する */
  featured?: boolean;
}

const steps: BulkStep[] = [
  {
    n: "1",
    src: "/bulk-step-01-reins-list.png",
    alt: "レインズの売買検索結果一覧（デモ画面・イメージ）",
    caption: "レインズで物件一覧を開く",
    sub: "売買検索結果の一覧をそのまま",
  },
  {
    n: "2",
    src: "/bulk-step-02-reins-selected.png",
    alt: "Ctrl+Aで一覧を全選択した状態（デモ画面・イメージ）",
    caption: "Ctrl+A で全選択 → コピー",
    sub: "何百件でも、まとめて1回",
  },
  {
    n: "3",
    src: "/bulk-step-03-paste-hub.png",
    alt: "楽マッチのAI一括入力ハブに貼り付けたデモ画面（イメージ）",
    caption: "楽マッチに貼り付ける",
    sub: "AI一括入力ハブにペーストするだけ",
  },
  {
    n: "4",
    src: "/bulk-step-04-property-cards.png",
    alt: "物件ごとのカードが自動生成された物件管理のデモ画面（イメージ）",
    caption: "物件ごとのカードが完成",
    sub: "1件ずつ自動でフォルダ化。すぐマッチングへ",
    featured: true,
  },
];

/** ステップ間の矢印に添えるラベル（i番目とi+1番目の間） */
const connectorLabels = ["全選択", "コピペ", "AIが解析"];

export default function BulkInputSteps() {
  return (
    <div>
      <ol className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
        {steps.map((s, i) => (
          <Fragment key={s.n}>
            <FadeIn className="md:flex-1 md:min-w-0">
              <li
                className={`relative flex h-full flex-col rounded-2xl border p-3 shadow-[0_8px_30px_rgba(13,124,102,0.06)] ${
                  s.featured
                    ? "border-primary-200 bg-primary-50/40"
                    : "border-surface-200 bg-white"
                }`}
              >
                <div className="mb-3 flex min-h-[3rem] items-start gap-2.5">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold tabular-nums text-white"
                    aria-hidden="true"
                  >
                    {s.featured ? <CheckCircle2 className="h-5 w-5" /> : s.n}
                  </span>
                  <p className="pt-0.5 text-sm font-bold leading-snug text-ink-900 text-balance sm:break-keep">
                    {s.caption}
                  </p>
                </div>
                <div className="overflow-hidden rounded-xl ring-1 ring-surface-200 bg-white">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={2560}
                    height={1265}
                    sizes="(max-width: 768px) 90vw, 320px"
                    className="block h-auto w-full"
                  />
                </div>
                <p className="mt-2.5 text-xs leading-relaxed text-ink-500 text-balance">
                  {s.sub}
                </p>
              </li>
            </FadeIn>

            {i < steps.length - 1 && (
              <div
                className="flex shrink-0 items-center justify-center py-0.5 md:px-2"
                aria-hidden="true"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="rounded-full bg-primary-50 px-2 py-0.5 text-[11px] font-semibold text-primary-700 whitespace-nowrap">
                    {connectorLabels[i]}
                  </span>
                  <ArrowDown className="h-5 w-5 text-primary-400 md:hidden" />
                  <ArrowRight className="hidden h-5 w-5 text-primary-400 md:block" />
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </ol>

      <p className="mt-5 text-sm leading-relaxed text-ink-500">
        ※ 画面はデモ画面（イメージ）です。チラシ・マイソクはPDF・画像のまま投げ込んでもOK。顧客情報も同じ要領で取り込めます。
      </p>
    </div>
  );
}
