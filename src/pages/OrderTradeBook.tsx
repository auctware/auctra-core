import { useState } from "react";
import { PageHeader } from "../components/PageHeader";

type Order = {
  id: string;
  auctionNo: string;
  commodity: string;
  warehouse: string;
  location: string;
  type: string;
  qty: string;
  price: string;
  status: string;
  time: string;
};

type Trade = {
  id: string;
  orderId: string;
  auctionNo: string;
  commodity: string;
  warehouse: string;
  location: string;
  counterParty: string;
  qty: string;
  price: string;
  value: string;
  side: string;
  time: string;
};

type BookTab = "orders" | "trades";

export function OrderTradeBook() {
  const [tab, setTab] = useState<BookTab>("orders");
  const [search, setSearch] = useState("");

  const orders: Order[] = [
    { 
      id: 'ORD-9021', 
      auctionNo: 'AUC-2024-001', 
      commodity: 'Copper Scrap Berry', 
      warehouse: 'Central WH-1', 
      location: 'JNPT, Navi Mumbai',
      type: 'Buy', 
      qty: '10 MT', 
      price: '₹7,24,000', 
      status: 'Pending', 
      time: '14:20:05' 
    },
    { 
      id: 'ORD-8910', 
      auctionNo: 'AUC-2024-012', 
      commodity: 'Aluminum Ingot 6061', 
      warehouse: 'Alpha Logi-Park', 
      location: 'Kandla Port, Gujarat',
      type: 'Sell', 
      qty: '5 MT', 
      price: '₹2,10,000', 
      status: 'Filled', 
      time: '13:45:12' 
    },
  ];

  const trades: Trade[] = [
    { 
      id: 'TRD-5501', 
      orderId: 'ORD-8910', 
      auctionNo: 'AUC-2024-012', 
      commodity: 'Aluminum Ingot 6061', 
      warehouse: 'Alpha Logi-Park', 
      location: 'Kandla Port, Gujarat',
      counterParty: 'Adani Global Resources',
      qty: '5 MT', 
      price: '₹2,10,000', 
      value: '₹10.5 L', 
      side: 'Sell', 
      time: '13:45:12' 
    },
  ];

  const filteredOrders = orders.filter(o => 
    o.commodity.toLowerCase().includes(search.toLowerCase()) || 
    o.auctionNo.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  );
  
  const filteredTrades = trades.filter(t => 
    t.commodity.toLowerCase().includes(search.toLowerCase()) || 
    t.auctionNo.toLowerCase().includes(search.toLowerCase()) ||
    t.counterParty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <PageHeader
         title="Trade Log Terminal"
         description="Unified audit of order lifecycles and historical trade settlements."
      />

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
         <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
            <button onClick={() => setTab("orders")} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${tab === "orders" ? 'bg-white text-tx-navy shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Order Book</button>
            <button onClick={() => setTab("trades")} className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-md transition-all ${tab === "trades" ? 'bg-white text-tx-navy shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Trade Book</button>
         </div>
         <div className="relative w-full sm:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-black px-2 py-1">⌕</span>
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search ID, Auction, or Entity..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black outline-none focus:bg-white focus:border-tx-teal transition-all shadow-inner" 
            />
         </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1200px]">
               <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                     <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Identification</th>
                     <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Inventory Detail</th>
                     <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Logistics Link</th>
                     {tab === 'trades' && <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Counter Party</th>}
                     <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Volume/Rate</th>
                     <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Settlement</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {tab === 'orders' ? filteredOrders.map((o) => (
                     <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-5">
                           <p className="text-[10px] font-mono font-bold text-slate-400">{o.id}</p>
                           <p className="text-[9px] font-black text-tx-teal uppercase mt-1">Auction: {o.auctionNo}</p>
                        </td>
                        <td className="px-6 py-5">
                           <p className="text-sm font-black text-slate-800 tracking-tight">{o.commodity}</p>
                           <p className={`text-[9px] font-black uppercase mt-1 ${o.type === 'Buy' ? 'text-emerald-500' : 'text-rose-500'}`}>Order: {o.type}</p>
                        </td>
                        <td className="px-6 py-5">
                           <p className="text-[10px] font-bold text-slate-800">{o.warehouse}</p>
                           <p className="text-[9px] font-medium text-slate-400 uppercase mt-0.5">{o.location}</p>
                        </td>
                        <td className="px-6 py-5">
                           <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-900">{o.qty} @ {o.price}</span>
                              <span className="text-[9px] font-mono text-slate-400 mt-1 italic">Total Lot Quote</span>
                           </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                           <div className="inline-flex flex-col items-end">
                              <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter shadow-sm ${
                                 o.status === 'Filled' ? 'bg-emerald-100 text-emerald-700' :
                                 o.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' :
                                 'bg-amber-100 text-amber-700'
                              }`}>{o.status}</span>
                              <span className="text-[10px] font-mono font-bold text-slate-400 italic mt-2">{o.time}</span>
                           </div>
                        </td>
                     </tr>
                  )) : filteredTrades.map((t) => (
                     <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-5">
                           <p className="text-[10px] font-mono font-bold text-slate-400">{t.id}</p>
                           <p className="text-[9px] font-black text-indigo-500 uppercase mt-1">Auction: {t.auctionNo}</p>
                        </td>
                        <td className="px-6 py-5">
                           <p className="text-sm font-black text-slate-800 tracking-tight">{t.commodity}</p>
                           <p className={`text-[9px] font-black uppercase mt-1 ${t.side === 'Buy' ? 'text-emerald-500' : 'text-rose-500'}`}>Side: {t.side}</p>
                        </td>
                        <td className="px-6 py-5">
                           <p className="text-[10px] font-bold text-slate-800">{t.warehouse}</p>
                           <p className="text-[9px] font-medium text-slate-400 uppercase mt-0.5">{t.location}</p>
                        </td>
                        <td className="px-6 py-5">
                           <p className="text-xs font-black text-tx-navy tracking-tight">{t.counterParty}</p>
                           <p className="text-[9px] font-bold text-slate-400 mt-0.5">Verified Corporate ✅</p>
                        </td>
                        <td className="px-6 py-5">
                           <p className="text-xs font-bold text-slate-900">{t.qty} @ {t.price}</p>
                           <p className="text-xs font-black text-emerald-600 mt-1">Val: {t.value}</p>
                        </td>
                        <td className="px-6 py-5 text-right">
                           <div className="inline-flex flex-col items-end text-right">
                              <span className="text-[9px] font-mono font-bold text-slate-400 italic">{t.time}</span>
                              <span className="text-[9px] font-black text-slate-300 uppercase mt-1">Ref: {t.orderId}</span>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-xs">
            <div className="flex gap-4">
               <span className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  Trades Synced
               </span>
               <span className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                  Pending Orders
               </span>
            </div>
            <button className="text-[10px] font-black text-tx-teal uppercase tracking-widest hover:underline">Download Detailed Ledger (CSV)</button>
         </div>
      </div>
    </div>
  );
}
