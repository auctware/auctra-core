type StatCardProps = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  hint: string;
  aiInsight?: string;
  /** When false, a downward trend is still shown as favorable (e.g. latency). */
  higherIsBetter?: boolean;
};

export function StatCard({ label, value, delta, trend, hint, aiInsight, higherIsBetter = true }: StatCardProps) {
  const favorable = higherIsBetter ? trend === "up" : trend === "down";
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm ring-1 ring-slate-100 transition duration-300 hover:shadow-xl hover:border-tx-teal/30 h-full">
      <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br from-tx-mint/80 to-transparent opacity-0 transition group-hover:opacity-100" />
      
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
        <p className="mt-2 text-2xl font-black tracking-tighter text-slate-800 tabular-nums">{value}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={
              favorable
                ? "inline-flex items-center rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold tracking-tight text-emerald-600 border border-emerald-100"
                : "inline-flex items-center rounded bg-rose-50 px-2 py-0.5 text-xs font-bold tracking-tight text-rose-600 border border-rose-100"
            }
          >
            {trend === "up" ? "↑" : "↓"} {delta}
          </span>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{hint}</span>
        </div>
      </div>

      {aiInsight && (
        <div className="mt-5 pt-4 border-t border-slate-100 relative">
          <div className="flex items-start gap-2">
            <span className="mt-0.5 flex h-2 w-2 relative shrink-0">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <p className="text-[11px] leading-relaxed text-indigo-900/80 font-medium">
              <span className="font-bold text-indigo-600 uppercase tracking-widest text-[9px] block mb-0.5">Tactical Copilot</span>
              {aiInsight}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
