type Insight = { label: string; value: string; tone?: "neutral" | "positive" | "warn" };

type AIPanelProps = {
  title?: string;
  insights: Insight[];
};

const toneClass: Record<NonNullable<Insight["tone"]>, string> = {
  neutral: "border-slate-200 bg-white text-slate-800",
  positive: "border-green-200 bg-green-50 text-green-900",
  warn: "border-amber-200 bg-amber-50 text-amber-900",
};

export function AIPanel({ title = "AI insights", insights }: AIPanelProps) {
  return (
    <aside className="rounded-xl border border-emerald-200/90 bg-tx-mint-soft p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-md bg-tx-teal px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
          AI
        </span>
        <h2 className="text-sm font-semibold text-tx-navy">{title}</h2>
      </div>
      <ul className="space-y-2">
        {insights.map((i) => (
          <li
            key={i.label}
            className={`rounded-lg border px-3 py-2 text-sm ${toneClass[i.tone ?? "neutral"]}`}
          >
            <p className="text-xs font-medium text-slate-500">{i.label}</p>
            <p className="font-medium">{i.value}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
