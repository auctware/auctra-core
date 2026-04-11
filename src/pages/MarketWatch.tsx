import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { TimeLeftTicker } from "../components/market/TimeLeftTicker";
import { AIPanel } from "../components/AIPanel";
import { PageHeader } from "../components/PageHeader";
import { MarketAnalysisWidget } from "../components/MarketAnalysisWidget";
import { marketWatchLots } from "../data/marketWatchLots";
import type { AuctionMechanism, MarketWatchLot } from "../data/marketWatchLots";

const mechanismStyles: Record<AuctionMechanism, string> = {
  english: "bg-gradient-to-r from-tx-mint to-teal-50 text-tx-navy border border-teal-200 shadow-sm",
  yankee: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-900 border border-emerald-200 shadow-sm",
  dutch: "bg-gradient-to-r from-orange-50 to-amber-50 text-orange-900 border border-orange-200 shadow-sm",
};

const statusStyles: Record<MarketWatchLot["status"], { bg: string; dot: string }> = {
  live: { bg: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500 animate-pulse" },
  scheduled: { bg: "bg-amber-50 text-amber-700 border border-amber-200", dot: "bg-amber-500" },
  settled: { bg: "bg-slate-50 text-slate-600 border border-slate-200", dot: "bg-slate-400" },
};

const filters = ["all", "recommended", "english", "yankee", "dutch"] as const;
type FilterType = typeof filters[number];

function formatWhen(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Detail({ label, children, highlight = false }: { label: string; children: ReactNode; highlight?: boolean }) {
  return (
    <div
      className={`min-w-0 rounded-lg px-2 py-1.5 ${highlight ? "bg-tx-mint/30" : "bg-slate-50/80"}`}
    >
      <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <div className={`mt-0.5 leading-tight ${highlight ? "text-sm font-semibold text-tx-teal" : "text-xs text-slate-800"}`}>
        {children}
      </div>
    </div>
  );
}

function LotThumbnail({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-slate-200 px-1 text-center text-[9px] font-medium leading-tight text-slate-500">
        No preview
      </div>
    );
  }
  return (
    <img
      src={src}
      alt=""
      className="h-full w-full object-cover"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function AuctionCard({ a }: { a: MarketWatchLot }) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <article className="group w-full overflow-hidden rounded-xl border border-tx-border/60 bg-white shadow-sm transition hover:border-tx-teal/25 hover:shadow-md">
      <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-stretch">
        {/* Image — fixed compact height */}
        <div className="relative h-24 w-full shrink-0 sm:h-24 sm:w-28">
          <div className="relative h-full w-full overflow-hidden rounded-lg bg-slate-100">
            <LotThumbnail src={a.imageUrl} />
            <div className="absolute right-1.5 top-1.5 z-10">
              <span
                className={`inline-flex rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${mechanismStyles[a.mechanism]}`}
              >
                {a.mechanism}
              </span>
            </div>
            <div className="absolute left-1.5 top-1.5 z-10">
              <button 
                onClick={(e) => { e.preventDefault(); setIsFavorite(!isFavorite); }}
                className={`flex h-6 w-6 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:scale-110 active:scale-95 ${isFavorite ? 'text-rose-500 bg-rose-50/90' : 'text-slate-400 hover:text-rose-400'}`}
                aria-label={isFavorite ? "Remove from watchlist" : "Add to watchlist"}
              >
                <svg className="h-3.5 w-3.5" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={isFavorite ? 0 : 2}>
                  {isFavorite ? (
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-mono text-[11px] font-bold text-tx-teal">{a.id}</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase ${statusStyles[a.status].bg}`}
                >
                  <span className={`h-1 w-1 rounded-full ${statusStyles[a.status].dot}`} />
                  {a.status}
                </span>
                {a.volatility === "high" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold uppercase text-rose-600 ring-1 ring-inset ring-rose-200">
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    High Volatility
                  </span>
                )}
                {a.isRecommended && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-1.5 py-0.5 text-[9px] font-bold uppercase text-indigo-600 ring-1 ring-inset ring-indigo-200">
                    ✨ For You
                  </span>
                )}
                {isFavorite && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-1.5 py-0.5 text-[9px] font-bold uppercase text-rose-600 ring-1 ring-inset ring-rose-200">
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Watchlisted
                  </span>
                )}
              </div>
              <h2 className="mt-1 text-sm font-bold leading-snug text-slate-900 line-clamp-2 sm:line-clamp-1">
                {a.shortTitle}
              </h2>
              <p className="mt-0.5 text-xs leading-snug text-slate-500 line-clamp-2">{a.description}</p>
            </div>

            <div className="flex shrink-0 flex-row items-center justify-between sm:justify-end gap-4 sm:flex-col sm:items-end sm:gap-2">
              <div className="flex flex-col text-left sm:text-right">
                <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">
                  {a.bestBid ? "Best Bid" : "Base Price"}
                </span>
                <span className={`font-mono text-lg font-black leading-none ${a.bestBid ? 'text-emerald-600' : 'text-slate-700'}`}>
                  {a.bestBid ? a.bestBid : a.basePrice}
                </span>
              </div>
              <Link
                to="/auction-floor"
                className="inline-flex items-center justify-center rounded-lg bg-tx-navy px-4 py-2 text-xs font-semibold text-white hover:bg-tx-teal transition-colors shadow-sm"
              >
                Floor →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1.5 border-t border-slate-100 pt-2 sm:grid-cols-3 lg:grid-cols-5">
            <Detail label="Quantity">{a.qty}</Detail>
            <Detail label="AI Fair Value" highlight>
              {a.predictedPrice ? (
                <span className="font-mono text-indigo-700 font-bold flex items-center gap-1">
                  ✨ {a.predictedPrice}
                </span>
              ) : (
                <span className="font-mono text-slate-400">—</span>
              )}
            </Detail>
            <Detail label="Time left">
              <span className={a.status === "live" ? "font-semibold text-orange-600" : ""}>
                <TimeLeftTicker startUtc={a.startUtc} endUtc={a.endUtc} status={a.status} />
              </span>
            </Detail>
            <Detail label="Participants">
              <span>
                {a.participants} bidders
                {a.spreadBps != null && a.spreadBps > 0 && (
                  <span className="text-slate-400"> · {a.spreadBps} bps</span>
                )}
              </span>
            </Detail>
            <Detail label="Reserve">
              {a.reserveMet ? (
                <span className="text-emerald-700">Met</span>
              ) : (
                <span className="text-amber-700">Open</span>
              )}
            </Detail>

            <Detail label="Starts">
              <span className="text-slate-600">{formatWhen(a.startUtc)}</span>
            </Detail>
            <Detail label="Ends">
              <span className="text-slate-600">{formatWhen(a.endUtc)}</span>
            </Detail>
            <Detail label="Commodity">
              <span className="line-clamp-1" title={a.commodity}>
                {a.commodity}
              </span>
            </Detail>
            <Detail label="Warehouse">
              <span className="line-clamp-1" title={a.warehouse}>
                {a.warehouse}
              </span>
            </Detail>
            <Detail label="Grade">
              <span className="line-clamp-1 text-slate-600" title={a.gradeNote ?? undefined}>
                {a.gradeNote ?? "—"}
              </span>
            </Detail>
            <Detail label="Location">
              <span className="line-clamp-1">{a.location}</span>
            </Detail>
          </div>
        </div>
      </div>
    </article>
  );
}

export function MarketWatch() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [q, setQ] = useState("");
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(true);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return marketWatchLots.filter((a) => {
      if (filter === "recommended" && !a.isRecommended) return false;
      if (filter !== "all" && filter !== "recommended" && a.mechanism !== filter) return false;
      if (!needle) return true;
      const hay = [
        a.id,
        a.shortTitle,
        a.commodity,
        a.description,
        a.location,
        a.warehouse,
        a.gradeNote ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
  }, [filter, q]);

  return (
    <div className="flex w-full flex-col lg:flex-row gap-6 max-w-[1600px] mx-auto pb-10 items-start">
      <div className="flex-1 space-y-6 min-w-0 w-full transition-all duration-300">
        <PageHeader
          title="Market Watch"
          description="Monitor active and upcoming auctions with a high-level view. Use advanced filtering to quickly locate targeted commodities."
          action={
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
                className="hidden lg:flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition-all hover:bg-indigo-100 hover:shadow"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {isAIPanelOpen ? "Hide AI Panel" : "Show AI Panel"}
              </button>
              <Link
                to="/auction-floor"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-tx-teal to-tx-teal-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-tx-teal/20 transition-all hover:scale-105 hover:shadow-tx-teal/40 active:scale-95"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  Enter Floor
                </span>
              </Link>
            </div>
          }
        />

        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="flex items-start gap-4">
            <div className="flex shrink-0 items-center justify-center rounded-xl bg-indigo-100 p-2.5 text-indigo-600 shadow-inner">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-slate-900">AI-Powered Market Intelligence Active</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                Welcome to the upgraded Market Watch! We've automatically activated <strong className="font-semibold text-indigo-700">Fair Value Predictions</strong> to help you spot undervalued lots, a dedicated <strong className="font-semibold text-indigo-700">"For You"</strong> smart watchlist, and live <strong className="font-semibold text-indigo-700">Volatility Anomaly</strong> tracking. Try our natural language search to instantly find exactly what you need.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-tx-border/80 bg-white/60 backdrop-blur-xl p-2 pl-4 shadow-sm sm:flex-row sm:items-center sm:justify-between transition-all hover:bg-white/90 ring-1 ring-black/5">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={
                  filter === f
                    ? "relative rounded-xl bg-tx-navy px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-md transition-transform active:scale-95 overflow-hidden group"
                    : "rounded-xl border border-transparent hover:border-slate-200 bg-slate-50 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all active:scale-95"
                }
              >
                {filter === f && <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />}
                {f === "all" ? "All Mechanisms" : f === "recommended" ? "✨ For You" : f}
              </button>
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-3 sm:max-w-md sm:flex-row sm:items-center sm:justify-end py-2 pr-2">
             <div className="relative w-full group">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 transition-colors group-focus-within:text-tx-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ask AI: 'Show me copper scrap near Mumbai...'"
                className="w-full rounded-xl border border-indigo-100 bg-indigo-50/30 pl-10 pr-4 py-2.5 text-sm font-medium text-slate-900 outline-none ring-0 placeholder:text-indigo-400/80 placeholder:font-normal focus:bg-white focus:border-tx-teal focus:ring-4 focus:ring-tx-teal/10 transition-all shadow-inner"
                aria-label="Natural Language AI Filter"
              />
            </div>
            <div className="shrink-0 flex items-center justify-center sm:justify-end px-2">
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="text-tx-teal font-bold text-sm">{filtered.length}</span> / {marketWatchLots.length}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((a) => (
            <AuctionCard key={a.id} a={a} />
          ))}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-tx-border bg-white/50 backdrop-blur-sm py-24 text-center">
              <div className="rounded-full bg-slate-100 p-4 mb-4 text-slate-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">No matching auctions</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm px-4">
                Try adjusting your filters or search query to find what you're looking for.
              </p>
              <button 
                onClick={() => { setFilter("all"); setQ(""); }}
                className="mt-6 px-5 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {filtered.length > 0 && (
          <p className="text-center text-[11px] uppercase tracking-widest font-semibold text-slate-400/80 pt-4">
            End of Results
          </p>
        )}
        
        {/* Mobile AI Panel */}
        <div className="block mt-8 lg:hidden space-y-4">
          <AIPanel
            title="AI Market Intelligence"
            insights={[
              {
                label: "Price Anomaly Detected",
                value: "Copper Wire Scrap (Millberry) is bidding ~4.2% below real-time LME futures. Probability of aggressive late-clearing: High.",
                tone: "positive",
              },
              {
                label: "Volatility Alert",
                value: "Historical data suggests 15% higher momentum for Dutch mechanisms closing within 20 mins. Watch Al Extrusion closely for sudden drops.",
                tone: "warn",
              },
              {
                label: "Sentiment & Supply",
                value: "Regional supply constraints in Maharashtra are driving a 200 bps spread widening for Mixed Ferrous. Demand signals are deeply bullish.",
                tone: "positive",
              },
              {
                label: "Algorithmic Fair Value",
                value: "Milling Wheat predicted mid-point at ₹2,350/Qtl, factoring in spatial weather patterns and silo saturation metrics.",
                tone: "neutral",
              },
              {
                label: "Arbitrage Opportunity",
                value: "Spread divergence detected between Scheduled Yankee Raw Cotton and live secondary market spots. Potential yield delta: +12%.",
                tone: "positive",
              },
            ]}
          />
          <MarketAnalysisWidget />
        </div>
      </div>

      {/* Desktop AI Sidebar */}
      <div
        className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out ${
          isAIPanelOpen ? "w-80 opacity-100 translate-x-0" : "w-0 opacity-0 translate-x-8 overflow-hidden"
        }`}
      >
        <div className="sticky top-6 w-80 space-y-4">
          <AIPanel
            title="AI Market Intelligence"
            insights={[
              {
                label: "Price Anomaly Detected",
                value: "Copper Wire Scrap (Millberry) is bidding ~4.2% below real-time LME futures. Probability of aggressive late-clearing: High.",
                tone: "positive",
              },
              {
                label: "Volatility Alert",
                value: "Historical data suggests 15% higher momentum for Dutch mechanisms closing within 20 mins. Watch Al Extrusion closely for sudden drops.",
                tone: "warn",
              },
              {
                label: "Sentiment & Supply",
                value: "Regional supply constraints in Maharashtra are driving a 200 bps spread widening for Mixed Ferrous. Demand signals are deeply bullish.",
                tone: "positive",
              },
              {
                label: "Algorithmic Fair Value",
                value: "Milling Wheat predicted mid-point at ₹2,350/Qtl, factoring in spatial weather patterns and silo saturation metrics.",
                tone: "neutral",
              },
              {
                label: "Arbitrage Opportunity",
                value: "Spread divergence detected between Scheduled Yankee Raw Cotton and live secondary market spots. Potential yield delta: +12%.",
                tone: "positive",
              },
            ]}
          />
          <MarketAnalysisWidget />
        </div>
      </div>
    </div>
  );
}
