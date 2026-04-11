import type { BookRow } from "../data/mock";

type Props = {
  bids: BookRow[];
  asks: BookRow[];
  midLabel?: string;
};

export function OrderBookDepth({ bids, asks, midLabel = "Spread" }: Props) {
  const maxDepth = Math.max(
    ...bids.map((b) => b.depth),
    ...asks.map((a) => a.depth),
    1
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-3 py-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-600">Depth</h3>
        <span className="text-xs text-slate-500">{midLabel}</span>
      </div>
      <div className={`grid max-h-[280px] ${bids.length > 0 && asks.length > 0 ? 'grid-cols-2' : 'grid-cols-1'} gap-px overflow-hidden rounded-b-xl bg-slate-200`}>
        {bids.length > 0 && (
          <div className="bg-white">
            <p className="bg-emerald-50/80 px-3 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              Buyer Bids (Forward Depth)
            </p>
            <ul className="max-h-[240px] overflow-y-auto">
              {bids.map((row) => (
                <li
                  key={`${row.price}-${row.qty}`}
                  className="relative border-b border-slate-50 px-3 py-2 text-xs"
                >
                  <span
                    className="absolute inset-y-0 left-0 bg-emerald-500/15"
                    style={{ width: `${(row.depth / maxDepth) * 100}%` }}
                  />
                  <div className="relative flex justify-between font-mono tabular-nums">
                    <span className="text-emerald-800 font-bold">₹{(row.price / 1000).toFixed(1)}k</span>
                    <span className="text-slate-600">{row.qty}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {asks.length > 0 && (
          <div className="bg-white">
            <p className="bg-rose-50/80 px-3 py-1.5 text-center text-[10px] font-bold uppercase tracking-wider text-rose-800">
              Seller Offers (Reverse Depth)
            </p>
            <ul className="max-h-[240px] overflow-y-auto">
              {asks.map((row) => (
                <li
                  key={`${row.price}-${row.qty}`}
                  className="relative border-b border-slate-50 px-3 py-2 text-xs"
                >
                  <span
                    className="absolute inset-y-0 right-0 bg-rose-500/15"
                    style={{ width: `${(row.depth / maxDepth) * 100}%` }}
                  />
                  <div className="relative flex justify-between font-mono tabular-nums">
                    <span className="text-rose-800 font-bold">₹{(row.price / 1000).toFixed(1)}k</span>
                    <span className="text-slate-600">{row.qty}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
