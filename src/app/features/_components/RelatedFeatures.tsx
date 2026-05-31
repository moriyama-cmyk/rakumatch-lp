import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export interface RelatedFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
}

/**
 * RelatedFeatures — 関連機能への相互リンク（クラスタ内リンク循環・孤立ゼロ）。
 * SEO_BRIEF §5: 詳細4本を相互に1〜2本ずつ関連リンク。アンカーは機能名（「こちら」は避ける）。
 */
export default function RelatedFeatures({ items }: { items: RelatedFeature[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
      {items.map((item) => (
        <FadeIn key={item.href} className="h-full">
          <Link
            href={item.href}
            className="group flex h-full flex-col rounded-2xl border border-surface-200 bg-white p-6 transition hover:border-primary-200 hover:shadow-[0_8px_30px_rgba(13,124,102,0.06)] motion-reduce:transition-none lg:p-8"
          >
            <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-semibold leading-snug text-ink-900">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-700">
              {item.desc}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
              詳しく見る
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
            </span>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}
