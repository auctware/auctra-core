import { useDutchTicker } from "../../hooks/useDutchTicker";

/** Steel / HMS ferrous scrap — ₹/MT (demo range). */
const RESERVE = 38200;
const START = 46000;
const FLOOR = 30000;

export function DutchClockPanel() {
  const { price, ticks } = useDutchTicker({
    startPrice: START,
    floorPrice: FLOOR,
    tickSize: 500,
    intervalMs: 1600,
  });

  const pctToReserve = Math.min(100, Math.max(0, ((price - FLOOR) / (START - FLOOR)) * 100));
  const pastReserve = price <= RESERVE;

  return (
    <div className="space-y-4 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50/50 p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-orange-950">Dutch clock</h3>
          <p className="text-xs text-orange-900/80">
            First acceptance wins · AI validates against spoof & credit headroom
          </p>
        </div>
        <span
          className={
            pastReserve
              ? "rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-900"
              : "rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-semibold text-orange-900 ring-1 ring-orange-200"
          }
        >
          {pastReserve ? "Reserve passed" : "Above reserve"}
        </span>
      </div>
      <div className="rounded-xl bg-white/90 p-4 ring-1 ring-orange-100">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Current ask</p>
        <p className="mt-1 font-mono text-4xl font-bold tabular-nums tracking-tight text-slate-900">
          ₹{price.toLocaleString("en-IN")}
        </p>
        <p className="mt-1 text-xs text-slate-500">per MT · tick ₹500 (HMS) · {ticks} steps</p>
        <div className="mt-4">
          <div className="flex justify-between text-[10px] font-medium uppercase text-slate-500">
            <span>Floor {FLOOR.toLocaleString("en-IN")}</span>
            <span>Reserve {RESERVE.toLocaleString("en-IN")}</span>
            <span>Start {START.toLocaleString("en-IN")}</span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
              style={{ width: `${pctToReserve}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="flex-1 min-w-[140px] rounded-xl bg-orange-600 py-3 text-sm font-bold text-white shadow-lg shadow-orange-600/25 hover:bg-orange-700"
        >
          Accept @ current
        </button>
        <button
          type="button"
          className="rounded-xl border border-orange-300 bg-white px-4 py-3 text-sm font-medium text-orange-900 hover:bg-orange-50"
        >
          Set auto-accept ≤ ₹38,000
        </button>
      </div>
    </div>
  );
}
