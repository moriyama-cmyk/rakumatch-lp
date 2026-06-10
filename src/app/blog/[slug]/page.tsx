import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Accordion from "@/components/Accordion";
import ArticleBody from "@/app/blog/_components/ArticleBody";
import { getAllPosts, getPostBySlug } from "@/content/blog";
import { SITE } from "@/components/lp/site";

const SITE_URL = "https://rakumatch-ai.com";
const BLOG_URL = `${SITE_URL}/blog`;

// 全記事を build 時に静的生成する（slug は posts データから）。
export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: "記事が見つかりません" };
  }
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title}｜楽マッチ AI`,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      images: [
        {
          url: "/ogp-new.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      title: `${post.title}｜楽マッチ AI`,
      description: post.description,
      images: ["/ogp-new.png"],
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const url = `${BLOG_URL}/${post.slug}`;
  const related = getAllPosts().filter((p) => p.slug !== post.slug);

  // Article 構造化データ（本文の節見出しを articleSection に反映）。
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    articleSection: post.sections.map((s) => s.heading),
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    inLanguage: "ja",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: `${SITE_URL}/ogp-new.png`,
    author: { "@type": "Organization", name: "楽マッチ AI", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "楽マッチ AI",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon-192.png` },
    },
  };

  // FAQPage（記事固有のFAQ。トップと重複しない設問）。
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "ブログ", item: BLOG_URL },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-50 text-ink-900">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="flex-1">
        <article className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16">
          {/* パンくず（視覚） */}
          <nav aria-label="パンくずリスト" className="text-sm text-ink-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="transition-colors hover:text-primary-600">
                  ホーム
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-primary-600">
                  ブログ
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="min-w-0 truncate text-ink-700" aria-current="page">
                {post.category}
              </li>
            </ol>
          </nav>

          {/* タイトル */}
          <header className="mt-6 border-b border-surface-200 pb-8">
            <div className="flex items-center gap-3 text-xs text-ink-500">
              <span className="rounded-full bg-primary-50 px-2.5 py-1 font-medium text-primary-700">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                約{post.readingMinutes}分で読めます
              </span>
              <time dateTime={post.datePublished}>{post.datePublished}</time>
            </div>
            <h1 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-ink-900 sm:text-3xl">
              {post.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-700">
              {post.lead}
            </p>
          </header>

          {/* 目次 */}
          <nav aria-label="目次" className="mt-8 rounded-xl border border-surface-200 bg-white p-5">
            <p className="text-sm font-semibold text-ink-900">目次</p>
            <ol className="mt-3 space-y-2">
              {post.sections.map((s, i) => (
                <li key={s.id} className="text-sm leading-relaxed">
                  <a href={`#${s.id}`} className="text-ink-500 transition-colors hover:text-primary-600">
                    {i + 1}. {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* 本文 */}
          <div className="mt-12">
            <ArticleBody sections={post.sections} />
          </div>

          {/* FAQ */}
          <section className="mt-14 border-t border-surface-200 pt-10">
            <h2 className="text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
              よくある質問
            </h2>
            <div className="mt-5">
              <Accordion items={post.faq} />
            </div>
          </section>

          {/* land&expand CTA（記事末。LP本体と無料体験への内部リンク） */}
          <aside className="mt-14 rounded-2xl border border-primary-100 bg-fade-primary p-7 sm:p-9">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
              楽マッチ AI
            </p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-ink-900 sm:text-2xl">
              顧客と物件を、AIで結びつける営業相棒
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
              物件はコピペやPDFで登録、お客様の希望と物件をAIが双方向でマッチング。通話録音の文字起こし・要約まで。個人でも会社でも{SITE.priceShort}から。ログイン前から中の画面を触って試せます。
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={SITE.ctaTryUrl}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
              >
                無料で試す
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/#features"
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-surface-200 bg-white px-5 py-3 text-sm font-medium text-ink-700 transition-colors hover:border-primary-200 hover:text-primary-700"
              >
                機能を見る
              </Link>
            </div>
            <p className="mt-3 text-xs text-ink-500">{SITE.microCopy}</p>
          </aside>

          {/* 関連記事 */}
          {related.length > 0 && (
            <section className="mt-14 border-t border-surface-200 pt-10">
              <h2 className="text-lg font-bold tracking-tight text-ink-900">
                あわせて読みたい
              </h2>
              <ul className="mt-5 space-y-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex items-start justify-between gap-4 rounded-xl border border-surface-200 bg-white p-4 transition-colors hover:border-primary-200"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-ink-900 transition-colors group-hover:text-primary-700">
                          {p.title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-ink-500">
                          {p.category}
                        </span>
                      </span>
                      <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-500 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ブログ一覧へ戻る */}
          <div className="mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700"
            >
              ← ブログ一覧へ戻る
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
