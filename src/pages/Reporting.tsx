import { useState } from "react";
import { PageHeader } from "../components/PageHeader";

type ReportCategory = "All" | "Financial" | "Operations" | "KYC" | "Market";

interface Report {
  title: string;
  desc: string;
  cat: ReportCategory;
}

export function Reporting() {
  const [activeCat, setActiveCat] = useState<ReportCategory>("All");
  const [aiQuery, setAiQuery] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const stats = [
    { label: 'Platform Volume', value: '₹145.8 Cr', trend: '+12%', color: 'text-indigo-600' },
    { label: 'Active Traded Units', value: '1,240 MT', trend: '+5%', color: 'text-tx-teal' },
    { label: 'Avg Liquidity Gap', value: '₹1,250', trend: '-2%', color: 'text-rose-600' },
    { label: 'KYC Funnel Health', value: '94%', trend: '+3%', color: 'text-emerald-600' },
  ];

  const reports: Report[] = [
    { title: 'Consolidated Settlement Ledger', desc: 'End-of-day trade matches and funds movement.', cat: 'Financial' },
    { title: 'Commodity Volatility Audit', desc: 'Analyze circuit breaker hits and price swings.', cat: 'Market' },
    { title: 'Onboarding Efficiency Report', desc: 'KYC approval times and rejection reasons.', cat: 'KYC' },
    { title: 'Order-to-Trade Ratio', desc: 'Evaluate bidding competitiveness across contracts.', cat: 'Operations' },
    { title: 'Account Margin Health', desc: 'Real-time fund coverage for active bids.', cat: 'Financial' },
    { title: 'Warehouse Stock Registry', desc: 'Current lot availability across all locations.', cat: 'Operations' },
  ];

  const getReportContent = (report: Report) => {
    switch (report.cat) {
      case "Financial":
        return {
          headers: ["Tx ID", "Entity", "Total Value", "Status"],
          rows: [
            { a: "TX-9021", b: "Reliance Ind", c: "₹45.2 L", d: "Settled" },
            { a: "TX-9022", b: "Tata Steel", c: "₹12.8 L", d: "Pending" },
            { a: "TX-9023", b: "JSW Energy", c: "₹88.5 L", d: "Settled" },
          ]
        };
      case "Operations":
        return {
          headers: ["Lot ID", "Warehouse", "Stored Qty", "Last Move"],
          rows: [
            { a: "LOT-A1", b: "JNPT WH-1", c: "450 MT", d: "14:20:05" },
            { a: "LOT-B2", b: "Kandla WH-4", c: "1,200 MT", d: "10:15:30" },
            { a: "LOT-C3", b: "Mudra WH-2", c: "880 MT", d: "Yesterday" },
          ]
        };
      case "KYC":
        return {
          headers: ["App ID", "Corporate", "Check Type", "Outcome"],
          rows: [
            { a: "KYC-001", b: "Adani Global", c: "PAN Verify", d: "Verified ✅" },
            { a: "KYC-002", b: "Birla Corp", c: "GST Audit", d: "Flagged ⚠️" },
            { a: "KYC-003", b: "Vedanta Ltd", c: "Bank Match", d: "Verified ✅" },
          ]
        };
      case "Market":
        return {
          headers: ["Contract", "LTP", "CB Hits", "Volatility"],
          rows: [
            { a: "Copper Berry", b: "₹7,24,000", c: "2", d: "High (15%)" },
            { a: "Aluminum Ingot", b: "₹2,10,000", c: "0", d: "Low (2%)" },
            { a: "Raw Cotton", b: "₹1,80,000", c: "5", d: "Extreme (25%)" },
          ]
        };
      default:
        return {
          headers: ["Ref ID", "Category", "Metric", "Magnitude"],
          rows: [
            { a: "REF-001", b: report.cat, c: "Global Sync", d: "Normal" },
            { a: "REF-002", b: report.cat, c: "Platform Delta", d: "+12%" },
          ]
        };
    }
  };

  const handleAiCommand = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAiThinking(true);
    setTimeout(() => {
       setIsAiThinking(false);
       setSelectedReport(reports[0]);
    }, 1200);
  };

  const filteredReports = activeCat === 'All' ? reports : reports.filter(r => r.cat === activeCat);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <PageHeader title="Intelligence & Reporting" description="Unified hub for AI-driven insights and regulatory logs." />

      <div className="bg-tx-navy rounded-xl p-1 shadow-2xl">
         <div className="bg-black/40 backdrop-blur-md rounded-xl p-10 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
               <h3 className="text-xl font-black mb-2 italic">AI Command Center</h3>
               <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-[0.2em] mb-8">Natural Language Intelligence (NLM)</p>
               <form onSubmit={handleAiCommand} className="relative">
                  <input value={aiQuery} onChange={e => setAiQuery(e.target.value)} placeholder="e.g. 'Show me warehouse stock for copper...'" className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-sm font-bold outline-none focus:border-tx-teal transition-all" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-tx-teal text-white px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest">{isAiThinking ? 'Analyzing...' : 'Execute'}</button>
               </form>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map(s => (
            <div key={s.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:scale-[1.02]">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
               <p className={`text-2xl font-black ${s.color} tracking-tighter`}>{s.value}</p>
               <div className="flex items-center gap-1 mt-2 text-[9px] font-black uppercase"><span className="text-emerald-500">{s.trend}</span><span className="text-slate-400 opacity-50">vs last period</span></div>
            </div>
         ))}
      </div>

      <div className="space-y-6">
         <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest underline decoration-2 underline-offset-4 decoration-tx-teal">Master Report Repository</h4>
            <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
               {(['All', 'Financial', 'Operations', 'KYC', 'Market'] as ReportCategory[]).map(c => (
                  <button key={c} onClick={() => setActiveCat(c)} className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${activeCat === c ? 'bg-white text-tx-navy shadow-sm' : 'text-slate-500'}`}>{c}</button>
               ))}
            </div>
         </div>

         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredReports.map(r => (
               <div key={r.title} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:border-tx-teal transition-all group flex flex-col justify-between h-[180px]">
                  <div><span className="text-[8px] font-black px-2 py-0.5 bg-slate-100 rounded text-slate-400 uppercase tracking-widest mb-4 inline-block">{r.cat}</span><h5 className="text-base font-black text-slate-800 group-hover:text-tx-navy">{r.title}</h5><p className="text-[10px] font-bold text-slate-400 mt-2 leading-relaxed">{r.desc}</p></div>
                  <div className="flex gap-4 border-t border-slate-50 pt-4 mt-4">
                     <button onClick={() => setSelectedReport(r)} className="text-[10px] font-black text-tx-teal uppercase tracking-widest hover:underline">View Live Data</button>
                     <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:underline">Export</button>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {selectedReport && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-tx-navy/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
               <button onClick={() => setSelectedReport(null)} className="absolute top-8 right-8 text-slate-400 hover:text-rose-500 font-black text-xl z-20">✕</button>
               
               <div className="p-10 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3 mb-2"><span className="text-[9px] font-black px-2 py-1 bg-tx-navy text-white rounded uppercase tracking-widest">{selectedReport.cat} Audit</span></div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{selectedReport.title}</h3>
                  <p className="text-sm font-bold text-slate-500 mt-2 italic capitalize">Differential data stream active for {selectedReport.cat} parameters.</p>
               </div>

               <div className="flex-1 overflow-auto p-10">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b-2 border-slate-100">
                           {getReportContent(selectedReport).headers.map((h, i) => (
                              <th key={h} className={`pb-5 text-[10px] font-black text-slate-400 uppercase tracking-widest ${i === 3 ? 'text-right' : ''}`}>{h}</th>
                           ))}
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {getReportContent(selectedReport).rows.map((row, i) => (
                           <tr key={i} className="hover:bg-slate-50 transition-colors">
                              <td className="py-6 font-black text-slate-800 text-sm">{row.a}</td>
                              <td className="py-6 font-bold text-slate-600 text-xs uppercase">{row.b}</td>
                              <td className="py-6 font-bold text-slate-600 text-xs uppercase">{row.c}</td>
                              <td className="py-6 text-right font-black text-tx-navy text-sm uppercase italic">{row.d}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                  <button className="bg-tx-navy text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em]">Download {selectedReport.cat} Summary</button>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Secure Data Sync • Powered by Exchange Intelligence</p>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
