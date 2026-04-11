import { useState, useMemo } from "react";
import { PageHeader } from "../components/PageHeader";

type MasterTab = "commodities" | "contracts" | "sessions";

export function Masters() {
  const [tab, setTab] = useState<MasterTab>("commodities");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  
  // DATA STATES
  const [commodities, setCommodities] = useState([
    { id: 'COM001', name: 'Copper Scrap', category: 'Non-Ferrous', items: 12, status: 'Active' },
    { id: 'COM002', name: 'Mixed Ferrous', category: 'Ferrous', items: 8, status: 'Active' },
    { id: 'COM003', name: 'Raw Cotton', category: 'Agriculture', items: 5, status: 'Active' },
  ]);

  const [contracts, setContracts] = useState([
    { 
      id: 'CTR-2401', commodity: 'Copper Scrap', name: 'Bulk Berry Forward',
      rules: {
        type: 'English', direction: 'Forward', margin: '5%', tickSize: '₹500',
        buyMinQty: '10 MT', buyMaxQty: '500 MT', sellMinQty: '10 MT', sellMaxQty: '1000 MT',
        payment: 'T+2 Delivery through Bank Guarantee (LC)', delivery: 'Ex-Warehouse JNPT, Mumbai Port Terminal 1',
        circuitBreaker: '15% Limit', noOfSessions: '3', noOfTicks: '20', increment: '₹500'
      }
    }
  ]);

  const [sessions, setSessions] = useState<any[]>([
    { 
      id: 'SES-001', 
      name: 'Copper Berry Lot-A Session', 
      contract: 'Bulk Berry Forward',
      phases: ['Order Entry', 'Bidding Session', 'Trade Matching'],
      extension: { isExtensible: true, noOfExtensions: 5, window: '3 mins', period: '5 mins' }
    }
  ]);

  const categories = ["All", "Ferrous", "Non-Ferrous", "Agriculture", "Energy"];

  const filteredItems = useMemo(() => {
    if (tab === 'commodities') return commodities.filter(c => (catFilter === "All" || c.category === catFilter) && c.name.toLowerCase().includes(search.toLowerCase()));
    if (tab === 'contracts') return contracts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.commodity.toLowerCase().includes(search.toLowerCase()));
    if (tab === 'sessions') return sessions.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.contract.toLowerCase().includes(search.toLowerCase()));
    return [];
  }, [tab, commodities, contracts, sessions, catFilter, search]);

  const [showAddCom, setShowAddCom] = useState(false);
  const [showAddCtr, setShowAddCtr] = useState(false);
  const [showAddSes, setShowAddSes] = useState(false);
  
  const [newCom, setNewCom] = useState({ name: '', category: 'Ferrous' });
  const [newCtr, setNewCtr] = useState({ commodity: 'Copper Scrap', name: '', rules: { type: 'English', direction: 'Forward', margin: '5%', tickSize: '₹500', buyMinQty: '10', buyMaxQty: '500', sellMinQty: '10', sellMaxQty: '1000', payment: '', delivery: '', circuitBreaker: '10%', noOfSessions: '1', noOfTicks: '10', increment: '₹100' } });
  const [newSes, setNewSes] = useState({ name: '', contract: 'Bulk Berry Forward', extension: { isExtensible: true, noOfExtensions: '3', window: '5 mins', period: '2 mins' } });

  const handleCreateCom = () => { setCommodities([...commodities, { ...newCom, id: `COM00${commodities.length+1}`, items: 0, status: 'Active' }]); setShowAddCom(false); };
  const handleCreateCtr = () => { setContracts([...contracts, { ...newCtr, id: `CTR-${Math.floor(Math.random()*9000+1000)}` }]); setShowAddCtr(false); };
  const handleCreateSes = () => { 
    setSessions([...sessions, { ...newSes, id: `SES-00${sessions.length+1}`, phases: ['Order', 'Bid', 'Trade'], extension: { ...newSes.extension, noOfExtensions: parseInt(newSes.extension.noOfExtensions) } }]); 
    setShowAddSes(false); 
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <PageHeader title="Exchange Masters" description="Orchestrate the association between contracts and execution sessions." />

      {/* GLOBAL FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
         <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
            {(['commodities', 'contracts', 'sessions'] as MasterTab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); setSelectedItem(null); }} className={`px-5 py-2 text-[9px] font-black uppercase tracking-widest rounded-md transition-all ${tab === t ? 'bg-white text-tx-navy shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                {t}
              </button>
            ))}
         </div>
         <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
               <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-black">⌕</span>
               <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${tab}...`} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black outline-none focus:bg-white focus:border-tx-teal transition-all shadow-inner" />
            </div>
            {tab === 'commodities' && (
               <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer">
                  {categories.map(c => <option key={c}>{c}</option>)}
               </select>
            )}
         </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
         {/* LIST AREA */}
         <div className="lg:col-span-7 space-y-6">
            {tab === 'commodities' && (
               <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                           <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">ID</th>
                           <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                           <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {filteredItems.map((c: any) => (
                           <tr key={c.id} className="hover:bg-slate-50 group transition-colors">
                              <td className="px-8 py-6 text-xs font-mono font-bold text-slate-400">{c.id}</td>
                              <td className="px-8 py-6 font-black text-slate-800">{c.name}</td>
                              <td className="px-8 py-6 text-right"><button className="text-[10px] font-black text-tx-teal uppercase">Modify</button></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  <div className="p-6 bg-slate-50 border-t border-slate-100"><button onClick={() => setShowAddCom(true)} className="text-[10px] font-black text-tx-navy uppercase hover:translate-x-2 transition-transform tracking-widest">+ Register Commodity</button></div>
               </div>
            )}

            {tab === 'contracts' && (
               <div className="grid gap-4">
                  {filteredItems.map((c: any) => (
                     <div key={c.id} onClick={() => setSelectedItem(c)} className={`p-6 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-center ${selectedItem?.id === c.id ? 'border-tx-teal bg-tx-teal/[0.02] ring-4 ring-tx-teal/5' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'}`}>
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xs uppercase ${selectedItem?.id === c.id ? 'bg-tx-teal text-white shadow-lg' : 'bg-slate-100 text-tx-navy'}`}>{c.commodity[0]}</div>
                           <div><p className="text-[9px] font-black text-tx-teal uppercase tracking-widest">{c.commodity}</p><h4 className="text-sm font-black text-slate-900 tracking-tight">{c.name}</h4></div>
                        </div>
                        <div className="text-right tracking-tight"><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{c.rules.type}</p><p className="text-[10px] font-mono font-bold text-slate-500 mt-1">{c.id}</p></div>
                     </div>
                  ))}
                  <button onClick={() => setShowAddCtr(true)} className="p-8 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 flex flex-col items-center justify-center gap-2 hover:border-tx-teal hover:text-tx-teal transition-all">
                     <span className="text-2xl font-black">+</span>
                     <span className="text-[10px] font-black uppercase tracking-widest">New Contract from RFP</span>
                  </button>
               </div>
            )}

            {tab === 'sessions' && (
               <div className="grid gap-4">
                  {filteredItems.map((s: any) => (
                     <div key={s.id} onClick={() => setSelectedItem(s)} className={`p-8 rounded-xl border-2 transition-all cursor-pointer flex justify-between items-center group ${selectedItem?.id === s.id ? 'border-indigo-500 bg-indigo-50/20 shadow-inner' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'}`}>
                        <div>
                           <div className="flex gap-2 mb-4">
                              {s.phases.map((p: string) => (
                                 <span key={p} className="text-[8px] font-black px-2 py-0.5 bg-white text-slate-500 rounded uppercase border border-slate-100 shadow-sm">{p}</span>
                              ))}
                           </div>
                           <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-1 italic">Linked to: {s.contract}</p>
                           <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight italic">{s.name}</h4>
                        </div>
                        <div className="text-right">
                           {s.extension.isExtensible && <div className="text-[8px] font-black bg-emerald-500 text-white px-2 py-1 rounded inline-block uppercase tracking-[0.2em] shadow-lg animate-pulse shadow-emerald-200">ACTIVE RULES</div>}
                           <p className="text-[10px] font-mono font-bold text-slate-400 mt-3">{s.id}</p>
                        </div>
                     </div>
                  ))}
                  <button onClick={() => setShowAddSes(true)} className="p-10 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 flex flex-col items-center justify-center gap-3 hover:border-indigo-500 hover:text-indigo-500 transition-all">
                     <span className="text-3xl font-black">+</span>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em]">Define Session Instance</span>
                  </button>
               </div>
            )}
         </div>

         {/* DETAIL AUDIT SIDEBAR */}
         <div className="lg:col-span-5 space-y-6">
            {selectedItem ? (
               <div className="rounded-xl border border-slate-200 bg-white p-12 shadow-xl overflow-y-auto max-h-[85vh] sticky top-20 animate-in slide-in-from-right-4 duration-500">
                  <div className="flex justify-between items-start mb-10 border-b border-slate-50 pb-6">
                    <div>
                       <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                          {tab === 'sessions' ? 'Execution Blueprint' : 'Contract Mastery'}
                       </h3>
                       <p className="text-[10px] text-slate-400 font-bold mt-1">Audit Mode Active • ID {selectedItem.id}</p>
                    </div>
                    <button onClick={() => setSelectedItem(null)} className="text-slate-300 hover:text-rose-500 transition-colors">✕</button>
                  </div>

                  {tab === 'contracts' && (
                     <div className="space-y-12">
                        <section><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Trade Parameters</h4><div className="grid grid-cols-2 gap-x-10 gap-y-10"><RuleItem label="Auction Mechanism" value={selectedItem.rules.type} /><RuleItem label="Trade Direction" value={selectedItem.rules.direction} /><RuleItem label="Tick size" value={selectedItem.rules.tickSize} /><RuleItem label="Total Ticks" value={selectedItem.rules.noOfTicks} /><RuleItem label="Bid Increment" value={selectedItem.rules.increment} /><RuleItem label="Sessions" value={selectedItem.rules.noOfSessions} /></div></section>
                        <section><h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Financial Controls</h4><div className="p-10 bg-tx-navy rounded-2xl text-white space-y-8 shadow-2xl relative overflow-hidden"><div className="grid grid-cols-2 gap-8 pb-8 border-b border-white/10"><div><p className="text-[9px] font-black text-indigo-300 uppercase mb-3">Buyer Limits</p><p className="text-sm font-black tracking-tight">{selectedItem.rules.buyMinQty} - {selectedItem.rules.buyMaxQty}</p></div><div><p className="text-[9px] font-black text-indigo-300 uppercase mb-3">Seller Limits</p><p className="text-sm font-black tracking-tight">{selectedItem.rules.sellMinQty} - {selectedItem.rules.sellMaxQty}</p></div></div><div className="space-y-6"><div className="flex justify-between items-center"><span className="text-[10px] font-black text-indigo-300 uppercase">Margin Requirement</span><span className="text-base font-black text-tx-teal underline underline-offset-4">{selectedItem.rules.margin}</span></div><div className="flex justify-between items-center"><span className="text-[10px] font-black text-rose-300 uppercase">Circuit Breaker</span><span className="text-base font-black text-rose-400 italic">{selectedItem.rules.circuitBreaker}</span></div></div></div></section>
                        <section className="space-y-8"><div className="p-8 rounded-xl bg-slate-50 border border-slate-100 shadow-inner"><p className="text-[10px] font-black text-slate-400 uppercase mb-4">Payment & Settlement</p><p className="text-xs font-bold text-slate-800 leading-relaxed uppercase italic">"{selectedItem.rules.payment}"</p></div><div className="p-8 rounded-xl bg-slate-50 border border-slate-100 shadow-inner"><p className="text-[10px] font-black text-slate-400 uppercase mb-4">Delivery Terms</p><p className="text-xs font-bold text-slate-800 leading-relaxed uppercase italic">"{selectedItem.rules.delivery}"</p></div></section>
                     </div>
                  )}

                  {tab === 'sessions' && (
                     <div className="space-y-14 mt-4">
                        <section>
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 underline italic decoration-indigo-200 decoration-2">Connected Blueprint</h4>
                           <div className="p-6 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center gap-4">
                              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-lg shadow-indigo-200">C</div>
                              <div>
                                 <p className="text-[8px] font-black text-indigo-400 uppercase">Parent Contract</p>
                                 <p className="text-sm font-black text-tx-navy tracking-tight">{selectedItem.contract}</p>
                              </div>
                           </div>
                        </section>
                        
                        <section>
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-10">Sequence of Execution</h4>
                           <div className="relative">
                              <div className="absolute left-[19px] top-0 bottom-0 w-1 bg-slate-100 rounded-full"></div>
                              <div className="space-y-12">
                                 {selectedItem.phases.map((p: string, i: number) => (
                                    <div key={p} className="relative pl-14 flex items-center group">
                                       <div className={`absolute left-0 w-10 h-10 rounded-full border-[4px] border-white shadow-xl flex items-center justify-center text-xs font-black z-10 transition-all scale-110 ${i === 1 ? 'bg-indigo-600 text-white ring-4 ring-indigo-50' : 'bg-slate-200 text-slate-500'}`}>{i+1}</div>
                                       <p className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] group-hover:text-indigo-600 transition-colors">{p}</p>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </section>

                        <section className="bg-tx-navy rounded-2xl p-1 shadow-2xl overflow-hidden">
                           <div className="p-8 bg-black/40 text-white backdrop-blur-sm">
                              <h4 className="text-[11px] font-black text-tx-teal uppercase tracking-[0.3em] mb-10 text-center italic border-b border-white/10 pb-4">Special extension rules</h4>
                              <div className="grid grid-cols-2 gap-x-10 gap-y-12">
                                 <div className="text-center group">
                                    <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-3">MAX EXTENSIONS</p>
                                    <p className="text-4xl font-black text-white group-hover:scale-110 transition-transform">{selectedItem.extension.noOfExtensions}</p>
                                    <p className="text-[8px] text-slate-500 mt-2 font-bold uppercase italic">Times Total</p>
                                 </div>
                                 <div className="text-center group">
                                    <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-3">TRIGGER WINDOW</p>
                                    <p className="text-4xl font-black text-white group-hover:scale-110 transition-transform tracking-tighter">{selectedItem.extension.window.split(' ')[0]}</p>
                                    <p className="text-[8px] text-slate-500 mt-2 font-bold uppercase italic">Mins Window</p>
                                 </div>
                                 <div className="text-center group">
                                    <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest mb-3">EXTENSION PERIOD</p>
                                    <p className="text-4xl font-black text-white group-hover:scale-110 transition-transform tracking-tighter">{selectedItem.extension.period.split(' ')[0]}</p>
                                    <p className="text-[8px] text-slate-500 mt-2 font-bold uppercase italic">Mins Per Ext.</p>
                                 </div>
                                 <div className="text-center group flex flex-col justify-center">
                                    <p className="text-[8px] font-black text-tx-teal uppercase tracking-widest mb-3">RULE STATUS</p>
                                    <p className="text-xs font-black text-tx-teal border border-tx-teal px-3 py-1 rounded-lg uppercase italic tracking-widest mx-auto">INHERITED ✅</p>
                                 </div>
                              </div>
                              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 text-center shadow-inner">
                                 <p className="text-[9px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                                    "Extends if dynamic bid bid activity <br/> detected in final window."
                                 </p>
                              </div>
                           </div>
                        </section>
                     </div>
                  )}
               </div>
            ) : (
               <div className="rounded-xl border-2 border-dashed border-slate-100 bg-slate-50/50 p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
                  <div className="w-20 h-20 bg-slate-200 rounded-full mb-6 opacity-10 flex items-center justify-center text-4xl font-black text-slate-400">?</div>
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] italic">System Data Audit</h4>
                  <p className="text-xs text-slate-400 px-8 leading-relaxed font-bold mt-2">Select a record to audit its deep-seated exchange rules and parameters.</p>
               </div>
            )}
         </div>
      </div>

      {/* MODALS */}
      {showAddCom && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tx-navy/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl w-full max-w-md p-10 shadow-2xl relative">
               <button onClick={() => setShowAddCom(false)} className="absolute top-10 right-10 text-slate-400 font-black">✕</button>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8 italic uppercase">Register new commodity</h3>
               <div className="space-y-6">
                  <InputField label="Name" placeholder="e.g. Aluminum 6061" onChange={v => setNewCom({...newCom, name: v})} />
                  <label className="block"><span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Category</span><select value={newCom.category} onChange={e => setNewCom({...newCom, category: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-black text-xs uppercase tracking-widest outline-none">{categories.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}</select></label>
                  <button onClick={handleCreateCom} className="w-full py-5 bg-tx-navy text-white rounded-xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all">Register Master</button>
               </div>
            </div>
         </div>
      )}

      {showAddCtr && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tx-navy/70 backdrop-blur-md animate-in fade-in duration-300 font-sans">
            <div className="bg-white rounded-2xl w-full max-w-3xl p-12 shadow-2xl relative overflow-y-auto max-h-[95vh]">
               <button onClick={() => setShowAddCtr(false)} className="absolute top-10 right-10 text-slate-400 hover:text-tx-navy text-xl">✕</button>
               <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-4 uppercase italic">RFP Contract conversion</h3>
               <p className="text-xs text-slate-500 mb-12 font-bold tracking-widest uppercase">Specifying all 12+ required parameters for exchange compliance.</p>
               <div className="grid gap-8 sm:grid-cols-2">
                  <div className="sm:col-span-2 grid sm:grid-cols-2 gap-4">
                     <label className="block"><span className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Commodity Link</span><select value={newCtr.commodity} onChange={e => setNewCtr({...newCtr, commodity: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-black text-xs uppercase cursor-pointer">{commodities.map(c => <option key={c.id}>{c.name}</option>)}</select></label>
                     <label className="block"><span className="text-[10px] font-black text-slate-400 uppercase mb-2 block">Blueprint ID Reference</span><input value={newCtr.name} onChange={e => setNewCtr({...newCtr, name: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-black text-xs" placeholder="Reference Name" /></label>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-xl border border-slate-100 space-y-6 shadow-sm"><h4 className="text-[10px] font-black text-tx-teal uppercase tracking-[0.2em]">Execution architecture</h4><div className="grid grid-cols-2 gap-4"><SelectField label="Type" options={['English', 'Yankee', 'Dutch']} onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, type: v}})} /><SelectField label="Direction" options={['Forward', 'Reverse']} onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, direction: v}})} /><InputField label="Tick Size" placeholder="₹500" onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, tickSize: v}})} /><InputField label="Total Ticks" placeholder="20" onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, noOfTicks: v}})} /><InputField label="Increment" placeholder="₹100" onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, increment: v}})} /><InputField label="Sessions" placeholder="3" onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, noOfSessions: v}})} /></div></div><div className="p-8 bg-slate-50 rounded-xl border border-slate-100 space-y-6 shadow-sm"><h4 className="text-[10px] font-black text-tx-teal uppercase tracking-[0.2em]">Compliance limits & terms</h4><div className="grid grid-cols-2 gap-4"><InputField label="Buy Max Limit" placeholder="500" onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, buyMaxQty: v}})} /><InputField label="Sell Max Limit" placeholder="1000" onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, sellMaxQty: v}})} /><InputField label="Margin Requirement" placeholder="5%" onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, margin: v}})} /><InputField label="Circuit Breaker Pct." placeholder="15%" onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, circuitBreaker: v}})} /><div className="col-span-2 space-y-4 pt-2"><InputField label="Payment Cycle Description" placeholder="e.g. T+2 Cash on Delivery" onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, payment: v}})} /><InputField label="Delivery Benchmarks Description" placeholder="e.g. Ex-Warehouse JNPT" onChange={v => setNewCtr({...newCtr, rules: {...newCtr.rules, delivery: v}})} /></div></div></div><button onClick={handleCreateCtr} className="sm:col-span-2 w-full py-6 bg-tx-navy text-white rounded-xl font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-black transition-all text-xs active:scale-[0.98]">Authorize exchange blueprint</button></div>
            </div>
         </div>
      )}

      {showAddSes && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-indigo-950/70 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-14 shadow-2xl relative shadow-indigo-500/20">
               <button onClick={() => setShowAddSes(false)} className="absolute top-12 right-12 text-slate-300 hover:text-indigo-600 font-black text-xl transition-colors">✕</button>
               <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2 uppercase italic">Associate session instance</h3>
               <p className="text-[9px] text-slate-400 font-black mb-12 tracking-[0.2em] uppercase italic">Inherit all rules from parent contract blueprint.</p>
               <div className="space-y-10"><div className="grid sm:grid-cols-2 gap-6"><label className="block"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Session Title</span><input value={newSes.name} onChange={e => setNewSes({...newSes, name: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-black outline-none focus:border-indigo-600" placeholder="e.g. Copper Berry - Phase 1" /></label><label className="block"><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Target Contract</span><select value={newSes.contract} onChange={e => setNewSes({...newSes, contract: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-black text-xs uppercase tracking-widest cursor-pointer outline-none focus:border-indigo-600">{contracts.map(c => <option key={c.id}>{c.name}</option>)}</select></label></div><div className="p-10 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-10 shadow-inner"><div className="flex items-center justify-between"><h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest italic decoration-indigo-200 underline underline-offset-4">Autonomous extension logic</h4><div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-indigo-200"><span className="text-[9px] font-black uppercase text-slate-400">Trigger on Bid</span><input type="checkbox" checked={newSes.extension.isExtensible} onChange={e => setNewSes({...newSes, extension: {...newSes.extension, isExtensible: e.target.checked}})} className="w-5 h-5 accent-indigo-600 cursor-pointer" /></div></div><div className="grid grid-cols-2 gap-8"><InputField label="Max Extension Count" placeholder="5" onChange={v => setNewSes({...newSes, extension: {...newSes.extension, noOfExtensions: v}})} /><InputField label="Wait Window (Mins)" placeholder="3" onChange={v => setNewSes({...newSes, extension: {...newSes.extension, window: v}})} /><InputField label="Add Time (Mins)" placeholder="5" onChange={v => setNewSes({...newSes, extension: {...newSes.extension, period: v}})} /><div className="flex items-center justify-center bg-white/60 border border-dashed border-indigo-200 rounded-xl p-4 text-center"><p className="text-[8px] font-black text-slate-400 uppercase italic">Linked to phase 2 bidding behavior.</p></div></div></div><button onClick={handleCreateSes} className="w-full py-6 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-[0.4em] shadow-xl hover:bg-black transition-all text-xs active:scale-[0.98]">Authorize Session Instance</button></div>
            </div>
         </div>
      )}
    </div>
  );
}

function RuleItem({ label, value }: { label: string, value: string }) {
   return (
      <div className="space-y-1">
         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-loose">{label}</p>
         <p className="text-xs font-black tracking-tight text-slate-900">{value}</p>
      </div>
   );
}

function InputField({ label, placeholder, onChange }: { label: string, placeholder: string, onChange: (v: string) => void }) {
   return (
      <label className="block">
         <span className="text-[8px] font-black text-slate-400 uppercase block mb-1.5 tracking-widest">{label}</span>
         <input onChange={e => onChange(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black outline-none focus:bg-white focus:border-tx-teal transition-all shadow-inner" placeholder={placeholder} />
      </label>
   );
}

function SelectField({ label, options, onChange }: { label: string, options: string[], onChange: (v: string) => void }) {
   return (
      <label className="block">
         <span className="text-[8px] font-black text-slate-400 uppercase block mb-1.5 tracking-widest">{label}</span>
         <select onChange={e => onChange(e.target.value)} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black outline-none focus:bg-white focus:border-tx-teal transition-all uppercase cursor-pointer">
            {options.map(o => <option key={o}>{o}</option>)}
         </select>
      </label>
   );
}
