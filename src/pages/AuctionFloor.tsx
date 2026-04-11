
import { AIPanel } from "../components/AIPanel";
import { PageHeader } from "../components/PageHeader";

import { OrderBookDepth } from "../components/OrderBookDepth";
import type { AuctionMechanism } from "../data/mock";
import {
  orderBookAsks,
  orderBookBids,
} from "../data/mock";
import { useCountdown } from "../hooks/useCountdown";


export function AuctionFloor() {
  const favoriteLots = [
    { 
      id: "AUC-24091", title: "Copper scrap (Berry) - 50 MT", mechanism: "english" as AuctionMechanism, direction: "forward", price: "₹4,82,000", vol: "high", metric: "+1.2%",
      location: "Mumbai Port", warehouse: "Zone B2 (JNPT)", description: "ISRI Grade 'Berry'. Clean copper wire scrap, unalloyed.",
      insights: [
        { label: "Arbitrage Alert", value: "Identical Grade-A Copper available in AUC-24094 (Navi Mumbai) currently trading at ₹4,78,000. Switch to save ₹4k/MT.", tone: "positive" },
        { label: "Execution", value: "Hold bidding. Wait for market spread to close.", tone: "neutral" }
      ]
    },
    { 
      id: "AUC-24098", title: "Mixed Ferrous Scrap - 120 MT", mechanism: "yankee" as AuctionMechanism, direction: "reverse", price: "₹48,200", vol: "low", metric: "-0.5%",
      location: "Chennai Hub", warehouse: "Yard 4, GST Road", description: "Heavy melting scrap (HMS 1 & 2) mixed 80/20 ratio.",
      insights: [
        { label: "Geo-Intelligence", value: "Better reverse ask found in neighboring Hub (Sriperumbudur). Price dropped 2% below this Chennai benchmark.", tone: "positive" },
        { label: "Curve Request", value: "Submit curve below ₹47,800 to clear top allocation.", tone: "neutral" }
      ]
    },
    { 
      id: "AUC-24099", title: "Raw Cotton (Sankar-6) - 500 Bales", mechanism: "dutch" as AuctionMechanism, direction: "forward", price: "₹1,84,200", vol: "high", metric: "+3.4%",
      location: "Ahmedabad", warehouse: "Gujarat Agri Depot", description: "Standard Sankar-6 variety. 28mm-29mm staple length.",
      insights: [
        { label: "Market Momentum", value: "Current tick price is 3.5% above fair spot value. High risk of overpayment.", tone: "negative" },
        { label: "Tactical Move", value: "Wait for 4 more clock drops before hitting ACCEPT.", tone: "neutral" }
      ]
    },
    { 
      id: "AUC-24105", title: "Aluminium Ingots (A356) - 200 MT", mechanism: "english" as AuctionMechanism, direction: "forward", price: "₹2,10,500", vol: "low", metric: "+0.8%",
      location: "Pune West", warehouse: "Chakan Industrial Zone", description: "Primary foundry alloy. Stacked on pallets.",
      insights: [
        { label: "Liquidity Alert", value: "Order book depth is extremely thin above ₹2.12L. Aggressive push could corner supply.", tone: "positive" },
        { label: "Surveillance", value: "Normal bidding velocity. 3 active participants.", tone: "neutral" }
      ]
    },
    { 
      id: "AUC-24112", title: "HDPE Plastic Granules - 50 MT", mechanism: "yankee" as AuctionMechanism, direction: "reverse", price: "₹92,000", vol: "high", metric: "-2.1%",
      location: "Surat", warehouse: "Hazira Port Silos", description: "Blow molding grade, melt flow index 0.3g/10min.",
      insights: [
        { label: "Commodity Spread", value: "Raw material oil prices dipped 1% this morning. Sellers may accept aggressive discounts.", tone: "positive" },
        { label: "Risk Model", value: "Competitor curve submitted at ₹90,500. Match to stay in allocation.", tone: "neutral" }
      ]
    },
    { 
      id: "AUC-24115", title: "Zinc Secondary Dross - 80 MT", mechanism: "dutch" as AuctionMechanism, direction: "reverse", price: "₹1,45,000", vol: "low", metric: "-1.5%",
      location: "Kolkata Hub", warehouse: "Howrah Shed C", description: "Galvanizing byproduct. Metallic zinc content ~65%.",
      insights: [
        { label: "Geo-Intelligence", value: "Logistics cost from Howrah to your plant erodes 2% margin. Factor into clock acceptance.", tone: "negative" },
        { label: "Execution", value: "Hold. Competitors historically wait until ₹1.40L for this grade.", tone: "neutral" }
      ]
    },
  ];

  const timer = useCountdown(134);

  return (
    <div className="flex flex-col gap-6 max-w-[1920px] mx-auto pb-10 xl:px-0">
      
      <PageHeader
        title="Multi-Screen Execution Floor"
        description="Monitor and execute bids across all your watchlisted auctions simultaneously with zero context switching."
        action={
          <div className="flex flex-wrap items-center justify-end gap-3">
             <span className="rounded-lg border border-emerald-400/50 bg-emerald-500/10 px-4 py-2 text-xs font-black tracking-widest uppercase text-emerald-600 flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                LIVE SYNC
              </span>
              <div className="px-4 py-2 bg-tx-navy rounded-xl text-white font-mono text-xs shadow-sm flex gap-3">
                <span>Credit: <span className="text-emerald-400">₹2.4 Cr</span></span>
                <span className="opacity-50">|</span>
                <span>Margin Util: <span className="text-rose-400">62%</span></span>
              </div>
          </div>
        }
      />

      <div className="flex flex-col gap-5">
        {favoriteLots.map(lot => (
          <div key={lot.id} className="flex flex-col xl:flex-row border border-slate-200 bg-white shadow-sm hover:shadow-xl rounded-2xl overflow-hidden relative group transition-all duration-300 transform hover:-translate-y-1">
             <div className={`absolute top-0 left-0 w-1.5 h-full z-20 ${lot.mechanism === 'english' ? 'bg-tx-teal' : lot.mechanism === 'yankee' ? 'bg-indigo-500' : 'bg-rose-500'}`}></div>
             
             {/* Left Pane: Identity & Price */}
             <div className="xl:w-[280px] shrink-0 bg-slate-50 p-5 flex flex-col justify-between border-b xl:border-b-0 xl:border-r border-slate-200/60 relative">
                <div className="flex justify-between items-start mb-4">
                  <span className={`inline-block px-2 text-[9px] font-black uppercase tracking-widest border rounded ${lot.mechanism === 'english' ? 'bg-tx-teal/10 border-tx-teal/30 text-tx-teal' : lot.mechanism === 'yankee' ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-600' : 'bg-rose-500/10 border-rose-500/30 text-rose-600'}`}>
                    {lot.mechanism}
                  </span>
                  {lot.mechanism === 'english' && (
                    <div className="text-rose-500 text-xs font-black font-mono animate-pulse">{timer.label}</div>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="text-sm font-bold text-tx-navy leading-snug mb-1">{lot.title}</h2>
                  <div className="flex items-center gap-2 mb-3">
                     <p className="text-[10px] font-bold text-tx-teal font-mono bg-tx-teal/10 px-1.5 py-0.5 rounded">{lot.id}</p>
                     <p className="text-[9px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
                        <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                        {lot.location}
                     </p>
                  </div>
                  
                  <div className="bg-white rounded-lg border border-slate-200 p-2 text-[10px]">
                     <div className="flex items-start gap-2 mb-1.5 pb-1.5 border-b border-slate-100">
                        <span className="font-bold text-slate-400 uppercase tracking-widest mt-0.5 shrink-0">W/H:</span>
                        <span className="text-slate-700 font-semibold">{lot.warehouse}</span>
                     </div>
                     <p className="text-slate-500 leading-tight italic">"{lot.description}"</p>
                  </div>
                </div>
                  
                <div className="flex items-end justify-between">
                     <div>
                       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Best Level ({lot.direction})</span>
                       <div className="text-xl font-mono font-black tabular-nums tracking-tighter text-slate-800">
                         {lot.price}
                       </div>
                     </div>
                     <span className={`font-mono text-xs font-bold ${lot.metric.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {lot.metric}
                     </span>
                  </div>
             </div>

             {/* Middle Pane Data Hub: Depth + Copilot (Scroll-Free) */}
             <div className="flex-1 flex flex-col sm:flex-row bg-white border-b xl:border-b-0 xl:border-r border-slate-200/60">
                
                {/* L2 Depth */}
                <div className="sm:w-1/2 p-4 sm:border-r border-slate-100 flex flex-col justify-center">
                   {lot.mechanism === 'dutch' ? (
                       <div className="h-full flex flex-col items-center justify-center bg-rose-50/50 rounded-xl border border-rose-100 p-4">
                         <svg className="w-8 h-8 animate-spin-slow text-rose-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                         <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-1">D-Clock Active</p>
                         <p className="text-xs font-bold font-mono text-rose-700">₹1,84,200</p>
                       </div>
                   ) : (
                       <OrderBookDepth 
                          bids={lot.direction === 'reverse' ? [] : orderBookBids.slice(0, 3)} 
                          asks={lot.direction === 'forward' ? [] : orderBookAsks.slice(0, 3)} 
                          midLabel={lot.direction === 'forward' ? "Forward Depth" : "Reverse Depth"} 
                       />
                   )}
                </div>

                <div className="sm:w-1/2 p-4 flex flex-col justify-center">
                   <AIPanel
                      title={lot.mechanism.toUpperCase() + " TACTICAL COPILOT"}
                      insights={lot.insights as any}
                   />
                </div>
             </div>

             {/* Right Pane: Direct Action Box */}
             <div className="xl:w-[280px] shrink-0 p-5 bg-gradient-to-br from-slate-800 to-tx-navy text-white flex flex-col justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05] mix-blend-overlay"></div>

                {lot.mechanism === "english" && (
                  <div className="relative z-10">
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 inline-block px-2 py-0.5 rounded border border-emerald-500/20 mb-3">Fast Action Enabled</p>
                    <div className="flex items-center gap-3 mb-4 w-full justify-between bg-white/5 rounded-xl border border-white/10 p-2">
                      <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-tx-teal flex items-center justify-center text-lg active:scale-95 transition-all">-</button>
                      <div className="text-xl font-black tabular-nums tracking-tighter">₹4,82,500</div>
                      <button className="w-8 h-8 rounded-lg bg-white/10 hover:bg-tx-teal flex items-center justify-center text-lg active:scale-95 transition-all">+</button>
                    </div>
                    <div className="flex gap-2 w-full mb-3">
                      <button type="button" className="flex-1 py-1.5 text-[10px] rounded bg-white/10 hover:bg-white/20 font-bold transition-all">+ ₹500</button>
                      <button type="button" className="flex-1 py-1.5 text-[10px] rounded bg-white/10 hover:bg-white/20 font-bold transition-all">+ ₹1K</button>
                    </div>
                    <button type="button" className="w-full py-3 rounded-xl bg-tx-teal text-white text-xs font-black tracking-widest uppercase hover:bg-tx-teal-dark transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] active:scale-95">PLACE BID</button>
                  </div>
                )}

                {lot.mechanism === "yankee" && (
                   <div className="relative z-10">
                     <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 inline-block px-2 py-0.5 rounded border border-indigo-500/20 mb-3">Curve Request</p>
                     <div className="grid grid-cols-2 gap-2 mb-4">
                        <div>
                           <span className="text-[9px] font-bold text-slate-400 mb-1 block">Price</span>
                           <input type="text" className="w-full rounded bg-white/10 border border-white/20 px-2 py-2 text-xs font-mono font-bold text-white outline-none focus:border-indigo-400" placeholder="48200" />
                        </div>
                        <div>
                           <span className="text-[9px] font-bold text-slate-400 mb-1 block">Qty</span>
                           <input type="text" className="w-full rounded bg-white/10 border border-white/20 px-2 py-2 text-xs font-mono font-bold text-white outline-none focus:border-indigo-400" placeholder="120" />
                        </div>
                     </div>
                     <button type="button" className="w-full py-3 rounded-xl bg-indigo-500 text-white text-xs font-black tracking-widest uppercase hover:bg-indigo-600 transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] active:scale-95">SUBMIT</button>
                   </div>
                )}

                {lot.mechanism === "dutch" && (
                   <div className="relative z-10 flex flex-col justify-center h-full">
                      <p className="text-[9px] font-black uppercase tracking-widest text-rose-400 mb-1 text-center">Current Offer</p>
                      <div className="w-full border-b border-rose-500/30 pb-3 mb-4 text-center">
                        <p className="text-3xl font-black font-mono text-rose-400">₹1,84,200</p>
                      </div>
                      <button type="button" className="w-full py-4 rounded-xl bg-rose-600 text-white text-sm font-black tracking-widest uppercase hover:bg-rose-700 transition-all shadow-lg shadow-rose-500/30 active:scale-95">ACCEPT NOW</button>
                   </div>
                )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
