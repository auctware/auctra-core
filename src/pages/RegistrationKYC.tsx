import { useState, useCallback } from "react";
import { PageHeader } from "../components/PageHeader";

type EntityType = "individual" | "firm";

const steps = [
  { id: 1, title: "Who are you?", desc: "Select type" },
  { id: 2, title: "Scan Documents", desc: "AI upload" },
  { id: 3, title: "Bank Details", desc: "Secure link" },
  { id: 4, title: "Finish", desc: "Ready" },
] as const;

export function RegistrationKYC() {
  const [step, setStep] = useState(1);
  const [entityType, setEntityType] = useState<EntityType>("individual");
  const [isScanning, setIsScanning] = useState<string | null>(null);
  const [doneDocs, setDoneDocs] = useState<string[]>([]);
  
  // Mock extracted data
  const [extractedData, setExtractedData] = useState<Record<string, any>>({});

  const startScan = useCallback((docName: string) => {
    if (doneDocs.includes(docName)) return;
    setIsScanning(docName);
    
    // Simulate AI extraction delay
    setTimeout(() => {
      setIsScanning(null);
      setDoneDocs(prev => [...prev, docName]);
      
      // Auto-fill mock data based on document type
      const mockInfo = docName.includes('PAN') 
        ? { id: "ABCDE1234F", name: entityType === 'individual' ? "Vikas Sharma" : "Vertex Scrap Solutions", dob: "12-05-1988" }
        : docName.includes('Aadhar')
        ? { id: "xxxx-xxxx-4491", name: "Vikas Sharma", address: "Sector 4, Navi Mumbai, MH" }
        : docName.includes('GST')
        ? { id: "27AAACV1234F1Z5", entity: "Vertex Scrap Solutions", state: "Maharashtra" }
        : { id: "TANM01122D", area: "Pune Hub" };
        
      setExtractedData(prev => ({ ...prev, [docName]: mockInfo }));
    }, 2000);
  }, [doneDocs, entityType]);

  const requiredDocs = entityType === 'individual' ? ['PAN Card', 'Aadhar Card'] : ['Business PAN', 'GST Certificate', 'TAN Number'];
  const allDocsDone = requiredDocs.every(d => doneDocs.includes(d));

  return (
    <div className="space-y-8">
      <PageHeader
        title="Quick Registration"
        description="Join the auction floor in 2 minutes. Use our AI scanner to finish your KYC quickly."
      />

      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            
            <div className="flex items-center justify-between px-2">
              {steps.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-2">
                  <div className={`h-1.5 w-16 rounded-full transition-all duration-500 ${step >= s.id ? "bg-tx-teal shadow-[0_0_8px_rgba(20,184,166,0.5)]" : "bg-slate-200"}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s.id ? "text-tx-teal" : "text-slate-400"}`}>{s.title}</span>
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-xl relative overflow-hidden">
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">I am registering as...</h2>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <button 
                      onClick={() => { setEntityType("individual"); setDoneDocs([]); }}
                      className={`group relative flex flex-col items-start p-6 rounded-2xl border-2 transition-all ${entityType === "individual" ? "border-tx-teal bg-tx-teal/[0.03] ring-4 ring-tx-teal/10" : "border-slate-100 bg-slate-50 hover:border-slate-300"}`}
                    >
                      <div className={`mb-4 p-3 rounded-xl transition-colors ${entityType === "individual" ? "bg-tx-teal text-white" : "bg-white text-slate-400"}`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </div>
                      <span className="font-bold text-slate-900">Individual / Trader</span>
                    </button>
                    <button 
                      onClick={() => { setEntityType("firm"); setDoneDocs([]); }}
                      className={`group relative flex flex-col items-start p-6 rounded-xl border-2 transition-all ${entityType === "firm" ? "border-tx-teal bg-tx-teal/[0.03] ring-4 ring-tx-teal/10" : "border-slate-100 bg-slate-50 hover:border-slate-300"}`}
                    >
                      <div className={`mb-4 p-3 rounded-xl transition-colors ${entityType === "firm" ? "bg-tx-teal text-white" : "bg-white text-slate-400"}`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      </div>
                      <span className="font-bold text-slate-900">Business / Firm</span>
                    </button>
                  </div>
                  <button onClick={() => setStep(2)} className="mt-8 w-full bg-tx-navy text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-slate-800 transition-all shadow-lg">Continue to Documents</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-xl">
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">AI Document Review</h2>
                  <p className="text-sm text-slate-500 mt-1">Scan documents and verify information read by AI.</p>
                  
                  <div className="mt-8 space-y-4">
                    {requiredDocs.map(doc => {
                      const isDone = doneDocs.includes(doc);
                      const active = isScanning === doc;
                      const data = extractedData[doc];

                      return (
                        <div key={doc} className="space-y-3">
                          <div 
                            onClick={() => !isDone && startScan(doc)}
                            className={`p-5 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${isDone ? 'border-emerald-500 bg-emerald-50/10' : active ? 'border-tx-teal bg-tx-teal/5 animate-pulse' : 'border-slate-100 bg-slate-50 hover:border-tx-teal/30'}`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isDone ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'bg-white border border-slate-200 text-slate-400'}`}>
                                {isDone ? <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : active ? <div className="w-6 h-6 border-2 border-t-tx-teal border-slate-200 rounded-full animate-spin" /> : <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
                              </div>
                              <div>
                                <p className="text-sm font-black text-slate-800">{doc}</p>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${isDone ? 'text-emerald-600' : 'text-slate-400'}`}>{isDone ? 'AI Reading Success' : active ? 'Analyzing Image...' : 'Mandatory · Ready to Scan'}</p>
                              </div>
                            </div>
                            {!isDone && !active && <button className="bg-tx-navy text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest hover:scale-105 transition-transform">Start Scan</button>}
                          </div>

                          {/* Data Review Panel after OCR */}
                          {isDone && (
                            <div className="mx-2 p-5 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-300">
                               {Object.entries(data).map(([key, value]) => (
                                 <div key={key}>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{key}</p>
                                    <p className="text-xs font-bold text-slate-800">{value as string}</p>
                                 </div>
                               ))}
                               <div className="col-span-2 pt-2 flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                  <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Cross-Verified with Govt. Registry</p>
                               </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-8 flex gap-4">
                    <button onClick={() => setStep(1)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-slate-200 transition-all border border-slate-200">Back</button>
                    <button disabled={!allDocsDone} onClick={() => setStep(3)} className="flex-[2] bg-tx-teal text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-tx-teal-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-tx-teal/20">Verify & Go to Bank</button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-xl">
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">One last thing: Bank</h2>
                  <div className="mt-8 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                       <label className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Account Number</span>
                        <input className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-tx-teal outline-none transition-all" placeholder="Enter bank account no." />
                      </label>
                      <label className="flex flex-col gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">IFSC Code</span>
                        <input className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 ring-tx-teal outline-none transition-all uppercase" placeholder="HDFC0001234" />
                      </label>
                    </div>
                  </div>
                  <div className="mt-8 flex gap-4">
                    <button onClick={() => setStep(2)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-slate-200 transition-all">Back</button>
                    <button onClick={() => setStep(4)} className="flex-[2] bg-tx-teal text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-tx-teal-dark transition-all shadow-lg shadow-tx-teal/20">Connect Account</button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in zoom-in duration-700 text-center rounded-xl border border-slate-200 bg-white p-12 shadow-2xl">
                 <div className="mx-auto w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-200"><svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg></div>
                 <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Account Live</h2>
                 <p className="text-slate-500 mt-2 font-medium">Your AI verification is complete. Welcome to the floor.</p>
                 <button onClick={() => window.location.href='/auction-floor'} className="mt-10 w-full bg-tx-navy text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-slate-800 transition-all shadow-xl">Go to Auction Floor</button>
              </div>
            )}
          </div>

          <div className="space-y-6">
             <div className="rounded-xl p-6 bg-gradient-to-br from-tx-navy to-indigo-950 text-white shadow-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-6">AI Shield Protection</h3>
                <p className="text-xs text-indigo-100 leading-relaxed font-medium">Our AI doesn't just read documents; it cross-checks them with official tax and identity databases for 100% accuracy.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
