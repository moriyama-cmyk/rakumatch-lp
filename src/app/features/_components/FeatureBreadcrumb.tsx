import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SITE_URL = "https://rakumatch-ai.com";

export interface Crumb {
  /** 表示名（パンくず・JSON-LD 共通） */
  name: string;
  /** リンク先（相対パス）。現在地（末尾）は省略すると非リンク表示になる */
  href?: string;
}

/**
 * FeatureBreadcrumb — 視覚的パンくず ＋ BreadcrumbList JSON-LD。
 * SEO_BRIEF §4: 視覚パンくずと JSON-LD を必ず一致させる。
 * 一覧ページ（/features）は未作成のため、リンク先が 404 になる階層は items に含めない。
 */
export default function FeatureBreadcrumb({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.href ?? ""}`,
    })),
  };

  return (
    <nav aria-label="パンくずリスト" className="text-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-500">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.name} className="flex items-center gap-1.5">
              {c.href && !isLast ? (
                <Link
                  href={c.href}
                  className="transition-colors hover:text-primary-600"
                >
                  {c.name}
                </Link>
              ) : (
                <span className={isLast ? "text-ink-700" : undefined} aria-current={isLast ? "page" : undefined}>
                  {c.name}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="h-3.5 w-3.5 text-ink-500/70" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
