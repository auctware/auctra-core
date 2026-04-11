import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-tx-border bg-white px-3 shadow-sm lg:px-8">
      <div className="flex min-w-0 items-center gap-3 lg:hidden px-2">
        <img src="https://auctware.in/assets/images/logo.png" alt="Auctware Logo" className="h-6 w-auto object-contain" />
      </div>

      <div className="hidden min-w-0 flex-1 items-center gap-3 lg:flex">
        <div className="relative max-w-md flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>
          <input
            type="search"
            placeholder="Search auctions, entities, lots…"
            className="w-full rounded-xl border border-tx-border bg-tx-canvas py-2 pl-9 pr-3 text-sm outline-none ring-tx-teal placeholder:text-slate-400 focus:bg-white focus:ring-2"
            aria-label="Global search"
          />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-tx-mint bg-tx-mint-soft px-2.5 py-1 text-xs font-semibold text-tx-teal">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-tx-teal/60 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-tx-teal" />
          </span>
          3 live
        </span>
        <span className="rounded-full border border-tx-border bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">
          KYC 12
        </span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <Link 
          to="/wallet-account"
          className="hidden sm:flex items-center gap-2 rounded-xl border border-tx-border bg-slate-50 px-3 py-1.5 hover:bg-white transition-colors"
        >
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available</span>
          <span className="text-sm font-black text-tx-navy tracking-tight">₹1.66 Cr</span>
          <span className="h-6 w-6 rounded-lg bg-tx-teal/10 text-tx-teal flex items-center justify-center font-bold text-xs">+</span>
        </Link>

        <button
          type="button"
          className="relative rounded-xl border border-tx-border bg-white p-2 text-slate-600 shadow-sm hover:bg-tx-canvas"
          aria-label="Notifications"
        >
          <span className="sr-only">Notifications</span>
          <span className="text-base">🔔</span>
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
        </button>
        <Link
          to="/auction-floor"
          className="rounded-xl bg-gradient-to-r from-tx-teal to-tx-teal-dark px-3 py-1.5 text-sm font-semibold text-white shadow-md shadow-tx-teal/25 hover:from-tx-teal-dark hover:to-tx-teal-dark"
        >
          Floor
        </Link>
      </div>
    </header>
  );
}
