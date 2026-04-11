import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Link } from "react-router-dom";

const ledgerItems = [
  { id: 'TXN001', date: '2026-04-09 10:14', type: 'Credit', amount: '₹2,40,00,000', source: 'Opening Balance', status: 'Success' },
  { id: 'TXN002', date: '2026-04-10 09:30', type: 'Credit', amount: '₹15,00,000', source: 'Fund Addition', status: 'Success' },
  { id: 'TXN003', date: '2026-04-10 11:45', type: 'Debit', amount: '₹5,00,000', source: 'Auction Settlement (AUC-24080)', status: 'Success' },
  { id: 'TXN004', date: '2026-04-10 12:00', type: 'Block', amount: '₹50,00,000', source: 'Blocked for Copper Auction', status: 'Active' },
  { id: 'TXN005', date: '2026-04-10 13:20', type: 'Block', amount: '₹34,00,000', source: 'Blocked for Steel Scrap', status: 'Active' },
];

export function WalletAccount() {
  const [totalFund, setTotalFund] = useState(25000000); // 2.50 Cr (2.40 + 0.15 - 0.05)
  const [blockedFund] = useState(8400000); // 84 Lakh (50 + 34)
  const [showAddFund, setShowAddFund] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const availableFund = totalFund - blockedFund;

  const formatCr = (num: number) => `₹${(num / 10000000).toFixed(2)} Cr`;
  const formatLakh = (num: number) => `₹${(num / 100000).toFixed(1)} Lakh`;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Fund Management"
        description="Monitor your total funds, blocked margin, and available balance for new bids."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Fund Card */}
        <div className="lg:col-span-2 space-y-6">
           <div className="rounded-2xl bg-tx-navy p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-50"></div>
              <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                 <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
              </div>

              <div className="relative z-10">
                 <p className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.3em] mb-4">Your Total Investment</p>
                 <h2 className="text-6xl font-black tracking-tighter mb-10">{formatCr(totalFund)}</h2>
                 
                 <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10 mb-10">
                    <div>
                       <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse"></span>
                          Blocked in Margin
                       </p>
                       <p className="text-2xl font-black tracking-tight">{formatLakh(blockedFund)}</p>
                       <p className="text-[10px] text-indigo-300 mt-1 font-medium">Tied in 3 active auctions</p>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
                          Available to Bid
                       </p>
                       <p className="text-2xl font-black tracking-tight text-emerald-400">{formatCr(availableFund)}</p>
                       <p className="text-[10px] text-indigo-300 mt-1 font-medium">Ready for new auctions</p>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <button onClick={() => setShowAddFund(true)} className="flex-1 bg-tx-teal text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-tx-teal/30 hover:bg-tx-teal-dark transition-all active:scale-95">Add Funds</button>
                    <button className="flex-1 bg-white/10 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs border border-white/10 hover:bg-white/20 transition-all">Withdraw</button>
                 </div>
              </div>
           </div>

           <div className="rounded-2xl border border-slate-200 bg-white p-1 overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/20">
                 <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Transaction History</h3>
                 <button className="text-[10px] font-black text-tx-teal hover:underline tracking-widest uppercase">Export</button>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50">
                          <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Details</th>
                          <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                       {ledgerItems.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                             <td className="px-6 py-5 text-[10px] font-bold text-slate-800">{item.date}</td>
                             <td className="px-6 py-5">
                                <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${item.type === 'Credit' ? 'bg-emerald-100 text-emerald-700' : item.type === 'Block' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>{item.type}</span>
                             </td>
                             <td className="px-6 py-5 text-xs font-bold text-slate-800">{item.source}</td>
                             <td className="px-6 py-5 text-sm font-black text-slate-900 text-right">{item.amount}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Sidebar: Limits & Compliance */}
        <div className="space-y-6">
           <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-2xl bg-tx-navy text-white flex items-center justify-center font-black">VS</div>
                 <div>
                    <h4 className="text-sm font-black text-slate-900">Vikas Sharma</h4>
                    <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-1">
                       <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                       KYC Verified
                    </span>
                 </div>
              </div>

              <div className="space-y-6">
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Approved Purchase Limit</p>
                    <p className="text-xl font-black text-slate-900 tracking-tight">₹48.20 Cr</p>
                    <div className="mt-3 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500 w-[52%] h-full"></div>
                    </div>
                 </div>

                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Single Auction Max</p>
                    <p className="text-xl font-black text-slate-900 tracking-tight">₹5.00 Cr</p>
                    <p className="text-[10px] text-slate-500 mt-2 font-medium leading-relaxed italic">The maximum bid amount you can place in one auction hall.</p>
                 </div>
              </div>
           </div>

           <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Links</h5>
              <div className="space-y-3">
                 <Link to="/registration-summary" className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center justify-center hover:border-tx-teal transition-all">View KYC Docs</Link>
                 <button onClick={() => setShowSettings(true)} className="w-full py-3 rounded-2xl bg-white border border-slate-200 text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-tx-teal transition-all">Account Settings</button>
              </div>
           </div>
        </div>
      </div>

      {/* Account Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tx-navy/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl relative">
              <button onClick={() => setShowSettings(false)} className="absolute top-8 right-8 text-slate-400"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8 uppercase italic">Account Settings</h3>
              
              <div className="space-y-6">
                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Notification Preferences</p>
                    <div className="space-y-3">
                       <label className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>WhatsApp Bid Alerts</span>
                          <input type="checkbox" defaultChecked className="accent-tx-teal h-4 w-4" />
                       </label>
                       <label className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>Email Ledger Monthly</span>
                          <input type="checkbox" defaultChecked className="accent-tx-teal h-4 w-4" />
                       </label>
                    </div>
                 </div>

                 <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Security</p>
                    <button className="text-xs font-bold text-tx-navy hover:underline">Change Transaction PIN</button>
                    <p className="text-[10px] text-slate-400 mt-1">Last changed 14 days ago</p>
                 </div>

                 <button onClick={() => setShowSettings(false)} className="w-full bg-tx-navy text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs">Save Preferences</button>
              </div>
           </div>
        </div>
      )}

      {/* Add Fund Modal */}
      {showAddFund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tx-navy/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl relative">
              <button onClick={() => setShowAddFund(false)} className="absolute top-8 right-8 text-slate-400 hover:text-tx-navy transition-colors"><svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2 uppercase italic">Add Funds</h3>
              <p className="text-sm text-slate-500 mb-10 font-medium">Top up your balance via UPI, NetBanking or NEFT.</p>
              
              <div className="space-y-8">
                 <div className="relative">
                    <span className="absolute -top-3 left-4 px-2 bg-white text-[10px] font-black text-tx-teal uppercase tracking-widest">Amount to Add</span>
                    <input autoFocus className="w-full text-5xl font-black text-tx-navy py-6 px-4 border-2 border-slate-100 rounded-3xl focus:border-tx-teal outline-none transition-all placeholder:text-slate-100" placeholder="0.00" />
                 </div>
                 <button onClick={() => { setTotalFund(prev => prev + 10000000); setShowAddFund(false); }} className="w-full bg-tx-navy text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-sm hover:bg-slate-800 transition-all shadow-xl shadow-tx-navy/30">Complete Payment</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
