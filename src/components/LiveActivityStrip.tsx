import type { ActivityItem } from "../data/mock";

type Props = { items: ActivityItem[] };

const typeStyle = {
  bid: "border-l-emerald-500 bg-emerald-50/40",
  ai: "border-l-tx-teal bg-tx-mint-soft/80",
  sys: "border-l-amber-500 bg-amber-50/40",
} as const;

export function LiveActivityStrip({ items }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2">
        <h2 className="text-sm font-semibold text-slate-900">Live feed</h2>
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      </div>
      <ul className="max-h-[220px] space-y-0 overflow-y-auto">
        {items.map((item) => (
          <li
            key={item.id}
            className={`border-l-4 px-4 py-2.5 text-sm ${typeStyle[item.type]}`}
          >
            <span className="font-mono text-xs text-slate-400">{item.time}</span>
            <p className="text-slate-800">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
