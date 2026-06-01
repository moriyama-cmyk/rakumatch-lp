import FadeIn from "@/components/FadeIn";

export interface Step {
  title: string;
  /** 補足説明（任意） */
  desc?: string;
}

/**
 * StepList — 使い方ステップ（01 / 02 / 03 …）。
 * DESIGN_SYSTEM §7-4: 左に大きな番号（text-5xl font-bold text-primary-100）＋右にテキスト。
 */
export default function StepList({ steps }: { steps: Step[] }) {
  return (
    <ol className="space-y-8 sm:space-y-10">
      {steps.map((s, i) => (
        <FadeIn key={s.title}>
          <li className="flex items-start gap-5 sm:gap-7">
            <span
              className="shrink-0 text-4xl font-bold leading-none tracking-tight text-primary-100 tabular-nums sm:text-5xl"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-1">
              <h3 className="text-lg font-semibold leading-snug text-ink-900 sm:text-xl">
                {s.title}
              </h3>
              {s.desc && (
                <p className="mt-2 text-base leading-relaxed text-ink-700">
                  {s.desc}
                </p>
              )}
            </div>
          </li>
        </FadeIn>
      ))}
    </ol>
  );
}
