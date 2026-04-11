import { PageHeader } from "../components/PageHeader";
import { Link } from "react-router-dom";

export function RegistrationSummary() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <PageHeader
        title="Registered KYC Details"
        description="View and manage your verified business documents and bank information."
        action={
          <Link to="/registration" className="bg-tx-navy text-white px-6 py-2.5 rounded-xl font-bold tracking-widest uppercase shadow-lg hover:bg-slate-800 transition-all">
            Update Details
          </Link>
        }
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Business/Entity Details */}
        <div className="lg:col-span-1 space-y-6">
           <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="w-20 h-20 rounded-3xl bg-tx-teal/10 text-tx-teal flex items-center justify-center font-black text-2xl mb-6 shadow-inner">
                VS
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Vikas Sharma</h3>
              <div className="flex items-center gap-2 mb-8">
                 <span className="text-[10px] font-black bg-emerald-500 text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">Verified</span>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Individual Trader</p>
              </div>

              <div className="space-y-6">
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-mono">Entity Type</p>
                    <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">Individual Proprietorship</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 font-mono">Registered Address</p>
                    <p className="text-sm font-bold text-slate-800 leading-relaxed">Sector 4, Plot 12, Navi Mumbai, Maharashtra - 400706</p>
                 </div>
              </div>
           </div>

           <div className="rounded-[2rem] bg-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10">
                 <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
              </div>
              <h4 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] mb-4">Security Note</h4>
              <p className="text-xs leading-relaxed font-medium text-slate-300">Your documents are encrypted and only accessible for auction compliance audits.</p>
           </div>
        </div>

        {/* Right Column: Documents and Bank */}
        <div className="lg:col-span-2 space-y-6">
           <div className="rounded-[2rem] border border-slate-200 bg-white p-1 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
                 <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Verified Documents</h3>
              </div>
              <div className="divide-y divide-slate-50">
                 {[
                   { label: 'PAN Card', value: 'ABCDE1234F', date: 'Verified on 10 Apr 2026' },
                   { label: 'Aadhar Card', value: 'xxxx xxxx 4491', date: 'Verified on 10 Apr 2026' },
                   { label: 'GST Certificate', value: '27AAACV1234F1Z5', date: 'Verified on 10 Apr 2026' },
                 ].map(doc => (
                   <div key={doc.label} className="px-8 py-5 flex items-center justify-between group hover:bg-slate-50 transition-colors">
                      <div>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{doc.label}</p>
                         <div className="flex items-center gap-3">
                            <p className="text-sm font-black text-slate-900 tracking-tight uppercase">{doc.value}</p>
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-tighter">Verified</span>
                         </div>
                      </div>
                      <button className="flex items-center gap-2 bg-slate-100 text-slate-600 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-tx-teal hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download
                      </button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-8">Registered Bank Details</h3>
              
              <div className="grid gap-8 sm:grid-cols-2">
                 <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Account Number</p>
                    <p className="text-xl font-black text-slate-900 tracking-tight">50200012348821</p>
                    <p className="text-[10px] text-tx-teal font-black mt-2 uppercase tracking-widest">HDFC BANK LTD</p>
                 </div>
                 <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">IFSC Code</p>
                    <p className="text-xl font-black text-slate-900 tracking-tight uppercase">HDFC0001234</p>
                    <p className="text-[10px] text-tx-teal font-black mt-2 uppercase tracking-widest">NAVI MUMBAI BRANCH</p>
                 </div>
              </div>

              <div className="mt-8 flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                 <p className="text-xs font-bold text-emerald-800 leading-relaxed font-sans">Bank account verified via ₹1.00 Penny Drop settlement.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
