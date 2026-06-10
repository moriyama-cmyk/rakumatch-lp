import { Check } from "lucide-react";
import type { ArticleSection, ContentBlock } from "@/content/blog/types";

/**
 * ArticleBody — 構造化された記事セクションを既存LPのトーン（白基調・エメラルド）で描画する。
 * 表示と JSON-LD（Article.articleBody 等）の食い違いを避けるため、本文は posts データから一元生成。
 */

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[15px] sm:text-base leading-relaxed text-ink-700">
          {block.text}
        </p>
      );
    case "h3":
      return (
        <h3 className="mt-8 text-lg sm:text-xl font-bold text-ink-900">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[15px] sm:text-base leading-relaxed text-ink-700">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[15px] sm:text-base leading-relaxed text-ink-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
                {i + 1}
              </span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "checklist":
      return (
        <ul className="grid gap-3 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="rounded-xl border border-surface-200 bg-white p-4"
            >
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
                <span className="text-sm font-semibold text-ink-900">{item.label}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{item.desc}</p>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <aside className="rounded-xl border border-primary-100 bg-primary-50/60 p-4 sm:p-5">
          <p className="text-[15px] leading-relaxed text-ink-700">{block.text}</p>
        </aside>
      );
    case "definition":
      // 平文で「◯◯とは〜」を明示（生成AIが定義を抜き出しやすい形）。
      return (
        <div className="rounded-xl border-l-4 border-primary-500 bg-white p-4 sm:p-5">
          <p className="text-[15px] leading-relaxed text-ink-700">
            <strong className="font-bold text-ink-900">{block.term}とは</strong>
            、{block.description}
          </p>
        </div>
      );
    case "table":
      return (
        <figure className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
            {block.caption && (
              <caption className="mb-2 text-left text-xs text-ink-500">
                {block.caption}
              </caption>
            )}
            <thead>
              <tr className="border-b border-surface-200">
                <th scope="col" className="py-2.5 pr-3 font-semibold text-ink-900">
                  {block.rowHeader}
                </th>
                {block.columns.map((col, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-3 py-2.5 font-semibold text-ink-900"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-surface-200 align-top">
                  <th
                    scope="row"
                    className="py-3 pr-3 font-medium text-ink-900"
                  >
                    {row.axis}
                  </th>
                  {row.cells.map((cell, ci) => (
                    <td key={ci} className="px-3 py-3 leading-relaxed text-ink-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    default:
      return null;
  }
}

export default function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ink-900">
            {section.heading}
          </h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>
      ))}
    </div>
  );
}
