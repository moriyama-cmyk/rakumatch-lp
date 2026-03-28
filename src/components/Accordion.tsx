"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="border border-surface-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-neutral-900 hover:bg-surface-50 transition-colors"
          >
            {item.q}
            <ChevronDown className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
          </button>
          {open === i && (
            <div className="px-6 pb-4 text-neutral-700 leading-relaxed">{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}
