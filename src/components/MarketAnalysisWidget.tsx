export function MarketAnalysisWidget() {
  return (
    <div className="mt-4 rounded-xl border border-indigo-100 bg-white shadow-sm overflow-hidden flex flex-col">
      <div className="bg-gradient-to-r from-tx-navy to-indigo-900 px-4 py-3 text-white flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          YOUR BIDDING TIPS
        </h3>
        <span className="flex h-2 w-2 relative shrink-0">
           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
           <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
      </div>
      
      <div className="p-4 space-y-5 flex-1 overflow-y-auto">
        {/* Peer Comparison: Aggressiveness */}
        <div>
          <div className="flex justify-between items-end mb-1.5">
             <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">How fast you bid</span>
                <p className="text-[10px] text-slate-400 leading-tight mt-0.5">Your bidding speed compared to others</p>
             </div>
             <span className="text-sm font-bold text-rose-600 border border-rose-100 bg-rose-50 px-2 rounded">FAST</span>
          </div>
          
          <div className="mt-3 relative w-full h-6 rounded bg-slate-100 overflow-hidden flex shadow-inner">
             {/* Market Avg */}
             <div className="absolute left-[38%] top-0 bottom-0 w-[2px] bg-slate-400 z-10"></div>
             <div className="absolute left-[20%] top-6 text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Normal Speed (38%)</div>
             
             {/* User Bar */}
             <div className="h-full bg-gradient-to-r from-rose-400 to-rose-500 w-[74%] flex items-center justify-end px-2 shadow">
                <span className="text-[10px] font-bold text-white tracking-widest">YOU: 74% SUCCESS</span>
             </div>
          </div>
          <p className="text-[11px] text-indigo-800 bg-indigo-50 rounded-lg p-2 mt-4 font-medium leading-snug border border-indigo-100">
             <span className="font-bold">AI Tip:</span> You are buying much faster than other traders. This is good for getting more stock, but be careful not to pay too much at the start.
          </p>
        </div>

        <div className="h-px bg-slate-100 w-full" />

        {/* Geographic / Warehouse Win Probability Matrix */}
        <div>
          <h4 className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">Best Places to Buy</h4>
          <p className="text-[10px] text-slate-400 mb-3">Where you have the best chance to win at low prices.</p>
          
          <div className="space-y-2">
            {/* Geo Item 1 */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2.5">
               <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <h5 className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide">Copper → Mumbai Yard</h5>
                    <p className="text-[9px] text-emerald-600 font-medium">Your Price: ₹4.80L | Normal Price: ₹4.76L</p>
                  </div>
                  <span className="text-[9px] font-black bg-emerald-200 text-emerald-800 px-1.5 rounded uppercase">Very High Chance</span>
               </div>
               <p className="text-[10px] text-slate-600 leading-tight">
                 You are bidding a good price for this location. You will likely win most of these auctions.
               </p>
            </div>

            {/* Geo Item 2 */}
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-2.5">
               <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <h5 className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">Steel → Mundra Port</h5>
                    <p className="text-[9px] text-amber-600 font-medium">Your Price: ₹38.0k | Normal Price: ₹38.1k</p>
                  </div>
                  <span className="text-[9px] font-black bg-amber-200 text-amber-800 px-1.5 rounded uppercase">Medium Chance</span>
               </div>
               <p className="text-[10px] text-slate-600 leading-tight">
                 You are bidding a bit low here. Pay just ₹150 more to win more auctions in Gujarat.
               </p>
            </div>

            {/* Geo Item 3 */}
            <div className="bg-rose-50 border border-rose-100 rounded-lg p-2.5">
               <div className="flex justify-between items-start mb-1.5">
                  <div>
                    <h5 className="text-[11px] font-bold text-rose-800 uppercase tracking-wide">Aluminum → Pune Hub</h5>
                    <p className="text-[9px] text-rose-600 font-medium">Too Expensive</p>
                  </div>
                  <span className="text-[9px] font-black bg-rose-200 text-rose-800 px-1.5 rounded uppercase">Low Chance</span>
               </div>
               <p className="text-[10px] text-slate-600 leading-tight">
                 You are paying too much in Pune. Try buying from South India this week to save money.
               </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
