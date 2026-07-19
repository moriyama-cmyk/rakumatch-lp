import { Check } from "lucide-react";
import type { ReactNode } from "react";

export interface RequirementItem {
  /** 見出し（例: 担当者 / お客様（iPhone）/ 推奨マイク） */
  label: string;
  /** 内容 */
  desc: ReactNode;
}

/**
 * RequirementCard — 必要なもの／機材。
 * DESIGN_SYSTEM §7-5: 箇条書き or 小カード。機材依存機能は「推奨機材」として案内（断定回避）。
 * note は注記（※自社試算・トラブル時の切り分け案内等）に使う。
 */
export default function RequirementCard({
  items,
  note,
}: {
  items: RequirementItem[];
  note?: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-6 lg:p-8">
      <ul className="space-y-5">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold text-ink-900">{item.label}</p>
              <p className="mt-1 text-base leading-relaxed text-ink-700">
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {note && (
        <p className="mt-6 border-t border-surface-200 pt-5 text-sm leading-relaxed text-ink-500">
          {note}
        </p>
      )}
    </div>
  );
}
