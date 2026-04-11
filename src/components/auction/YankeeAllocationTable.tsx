import { yankeeProvisional } from "../../data/mock";

function fmtCurrency(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export function YankeeAllocationTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-tx-border bg-tx-mint-soft/80 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Provisional allocation · pay-as-bid</h3>
          <p className="text-xs text-slate-600">200 MT Al scrap · sealed + simultaneous · ties by server time</p>
        </div>
        <span className="rounded-full bg-tx-mint px-2.5 py-0.5 text-xs font-medium text-tx-navy">
          Clearing sim v2.3
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-4 py-2 font-medium">Rank</th>
              <th className="px-4 py-2 font-medium">Bidder</th>
              <th className="px-4 py-2 font-medium">Qty</th>
              <th className="px-4 py-2 font-medium">Price</th>
              <th className="px-4 py-2 font-medium">Extended</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {yankeeProvisional.map((row) => (
              <tr key={row.rank} className="hover:bg-slate-50/80">
                <td className="px-4 py-2.5 font-mono text-slate-600">{row.rank}</td>
                <td className="px-4 py-2.5 font-medium text-slate-900">{row.bidder}</td>
                <td className="px-4 py-2.5 tabular-nums">{row.qty}</td>
                <td className="px-4 py-2.5 font-mono tabular-nums text-slate-800">
                  {row.price === null ? "—" : fmtCurrency(row.price)}
                </td>
                <td className="px-4 py-2.5 font-mono text-slate-600">
                  {row.total === null ? "—" : fmtCurrency(row.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
