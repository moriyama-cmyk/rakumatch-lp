import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/content/blog";

const SITE_URL = "https://rakumatch-ai.com";
const BLOG_URL = `${SITE_URL}/blog`;

export const metadata: Metadata = {
  title: "ブログ｜不動産営業の顧客管理・CRM・通話録音の実用ガイド",
  description:
    "不動産営業の現場で使える顧客管理・CRMの選び方、ひとり仲介の運用、通話録音のAI要約などを、実用本位でまとめたブログです。",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "ブログ｜楽マッチ AI",
    description:
      "不動産営業の顧客管理・CRM・通話録音の実用ガイド。現場目線で役立つ記事をまとめています。",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/ogp-new.png",
        width: 1200,
        height: 630,
        alt: "楽マッチ AI ブログ",
      },
    ],
  },
  twitter: {
    title: "ブログ｜楽マッチ AI",
    description: "不動産営業の顧客管理・CRM・通話録音の実用ガイド。",
    images: ["/ogp-new.png"],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  // CollectionPage（ブログ一覧）＋ BreadcrumbList の構造化データ。
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "楽マッチ AI ブログ",
    description:
      "不動産営業の顧客管理・CRM・通話録音の実用ガイドをまとめたブログです。",
    url: BLOG_URL,
    hasPart: posts.map((p) => ({
      "@type": "Article",
      headline: p.title,
      description: p.description,
      url: `${BLOG_URL}/${p.slug}`,
      datePublished: p.datePublished,
      dateModified: p.dateModified,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "ブログ", item: BLOG_URL },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-50 text-ink-900">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:px-8 sm:py-20">
          {/* パンくず（視覚） */}
          <nav aria-label="パンくずリスト" className="text-sm text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="transition-colors hover:text-primary-600">
                  ホーム
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-ink-700" aria-current="page">
                ブログ
              </li>
            </ol>
          </nav>

          {/* 見出し */}
          <header className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              Blog
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
              不動産営業の実用ガイド
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              顧客管理・CRMの選び方、ひとり仲介の運用、通話録音のAI要約など、不動産営業の現場で役立つ話を実用本位でまとめています。
            </p>
          </header>

          {/* 記事一覧 */}
          <ul className="mt-10 space-y-5">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-surface-200 bg-white p-6 transition-all hover:border-primary-200 hover:shadow-soft-md sm:p-7"
                >
                  <div className="flex items-center gap-3 text-xs text-ink-500">
                    <span className="rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary-700">
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      約{post.readingMinutes}分で読めます
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-primary-700 sm:text-xl">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600">
                    続きを読む
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
