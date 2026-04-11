import { Link } from "react-router-dom";
import { AIPanel } from "../components/AIPanel";
import { PageHeader } from "../components/PageHeader";
import { StatCard } from "../components/StatCard";
import { LiveActivityStrip } from "../components/LiveActivityStrip";
import { MarketAnalysisWidget } from "../components/MarketAnalysisWidget";
import {
  activityFeed,
  dashboardKpis,
} from "../data/mock";

export function DashboardHome() {
  return (
    <div className="space-y-8 pb-20">
      <PageHeader
        title="Terminal Overview"
        description="Monitor institutional liquidity, grade-A arbitrage opportunities, and automated risk mitigation signals across the exchange."
        action={
          <div className="flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-widest">
            <Link
              to="/reporting"
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-slate-700 shadow-sm hover:bg-slate-50 transition-all"
            >
              Analytics Hub
            </Link>
            <Link
              to="/registration"
              className="rounded-xl bg-tx-navy px-5 py-2.5 text-white shadow-xl shadow-tx-navy/20 hover:bg-black transition-all"
            >
              Onboard Legal Entity
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardKpis.map((k) => (
          <StatCard key={k.label} {...k} />
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-12">
        <div className="xl:col-span-7 space-y-8">
           <MarketAnalysisWidget />
        </div>

        <div className="xl:col-span-5 flex flex-col gap-8">
          <div className="rounded-2xl p-[1px] bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl">
             <div className="bg-white rounded-2xl p-2 h-full">
               <AIPanel
                 title="Market Intelligence & Risk Signals"
                 insights={[
                   {
                     label: "Arbitrage Opportunity",
                     value: "Copper scrap parity in JNPT is trading ₹4,000 below Mumbai benchmarks. High liquidity detected.",
                     tone: "positive",
                   },
                   {
                     label: "Logistics Optimization",
                     value: "Scrap indices in Kandla have retracted by 2%, offering lower landed costs vs Chennai floor prices.",
                     tone: "positive",
                   },
                   {
                     label: "Volatility Alert",
                     value: "High bid clustering detected in Ahmedabad Raw Cotton auctions. Anticipate circuit breaker triggers.",
                     tone: "neutral",
                   },
                 ]}
               />
             </div>
          </div>

          <LiveActivityStrip items={activityFeed} />
        </div>
      </div>
    </div>
  );
}
