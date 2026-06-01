import Accordion from "@/components/Accordion";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * FeatureFAQ — FAQ（既存 Accordion を流用）＋ 個別 FAQPage JSON-LD。
 * SEO_BRIEF §4: 詳細ページに FAQ を置く場合はトップと重複しない設問にし、
 * 各ページに個別 FAQPage を付与する（同一QAの使い回しは避ける）。
 */
export default function FeatureFAQ({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Accordion items={items} />
    </div>
  );
}
