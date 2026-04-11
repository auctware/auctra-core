import { englishBidLadder } from "../../data/mock";

export function EnglishLadder() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-900">Standing bids · soft close armed</h3>
        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-900">
          Anti-snipe +120s if bid in final minute
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-2 font-medium">#</th>
              <th className="px-4 py-2 font-medium">Bidder</th>
              <th className="px-4 py-2 font-medium">Bid ₹/MT</th>
              <th className="px-4 py-2 font-medium">Time</th>
              <th className="px-4 py-2 font-medium"> </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {englishBidLadder.map((row) => (
              <tr
                key={row.rank}
                className={row.you ? "bg-tx-mint-soft/80" : "hover:bg-slate-50/80"}
              >
                <td className="px-4 py-2.5 font-mono text-slate-600">{row.rank}</td>
                <td className="px-4 py-2.5 font-medium text-slate-900">{row.bidder}</td>
                <td className="px-4 py-2.5 font-mono tabular-nums text-slate-800">
                  ₹{row.bid.toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-2.5 font-mono text-xs text-slate-500">{row.time}</td>
                <td className="px-4 py-2.5">
                  {row.you ? (
                    <span className="rounded-full bg-tx-teal px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                      You
                    </span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
