import { useState } from "react";
import { PageHeader } from "../components/PageHeader";

type ApprovalStatus = "Pending" | "Approved" | "Rejected";

interface Application {
  id: string;
  entityName: string;
  entityType: string;
  pan: string;
  gst: string;
  bankAccount: string;
  ifsc: string;
  status: ApprovalStatus;
  submissionTime: string;
  documents: string[];
}

export function AdminApprovals() {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "APP-001",
      entityName: "Tata Steel Ltd",
      entityType: "Public Limited",
      pan: "ABCDE1234F",
      gst: "27ABCDE1234F1Z5",
      bankAccount: "**** **** 9087",
      ifsc: "SBIN0001234",
      status: "Pending",
      submissionTime: "2026-04-10 14:30",
      documents: ["PAN Card", "GST Cert", "Cancelled Cheque"]
    },
    {
      id: "APP-002",
      entityName: "JSW Energy",
      entityType: "Public Limited",
      pan: "BCDEF2345G",
      gst: "27BCDEF2345G1Z5",
      bankAccount: "**** **** 5543",
      ifsc: "ICIC0000001",
      status: "Pending",
      submissionTime: "2026-04-10 12:15",
      documents: ["PAN Card", "GST Cert", "IEC License"]
    }
  ]);

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const handleAction = (id: string, newStatus: ApprovalStatus) => {
    setApplications(apps => apps.map(a => a.id === id ? { ...a, status: newStatus } : a));
    setSelectedApp(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <PageHeader 
        title="Account Onboarding Triage" 
        description="Review and verify corporate KYC applications for exchange participation." 
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Main Application Table */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
               <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pending Registrations</h3>
               <span className="bg-tx-teal/10 text-tx-teal text-[10px] font-black px-2 py-1 rounded uppercase">{applications.filter(a => a.status === 'Pending').length} Action Required</span>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Application ID</th>
                  <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Entity Name</th>
                  <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {applications.map(app => (
                  <tr key={app.id} className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${selectedApp?.id === app.id ? 'bg-slate-50' : ''}`} onClick={() => setSelectedApp(app)}>
                    <td className="px-8 py-6">
                       <p className="text-[10px] font-mono font-bold text-slate-400">{app.id}</p>
                       <p className="text-[8px] text-slate-300 mt-0.5">{app.submissionTime}</p>
                    </td>
                    <td className="px-8 py-6 font-black text-slate-800 tracking-tight">{app.entityName}</td>
                    <td className="px-8 py-6">
                       <span className="text-[9px] font-black text-tx-navy bg-slate-100 px-2 py-0.5 rounded uppercase tracking-tighter">{app.entityType}</span>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                          app.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                          app.status === 'Rejected' ? 'bg-rose-100 text-rose-700' :
                          'bg-amber-100 text-amber-700'
                       }`}>{app.status}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <button className={`text-[10px] font-black uppercase tracking-widest ${selectedApp?.id === app.id ? 'text-tx-teal' : 'text-slate-400 group-hover:text-tx-teal'}`}>
                          Review →
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Detail Audit Card */}
        <div className="lg:col-span-4 transition-all duration-500">
           {selectedApp ? (
              <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-xl animate-in slide-in-from-right-4 sticky top-20">
                 <div className="flex justify-between items-start mb-8">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest italic underline decoration-tx-teal decoration-4 underline-offset-8">Entity Audit Trail</h3>
                    <span className={`text-[9px] font-black px-2 py-1 rounded uppercase ${selectedApp.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{selectedApp.status}</span>
                 </div>

                 <div className="space-y-8">
                    <div className="grid grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                       <DetailItem label="PAN Card" value={selectedApp.pan} />
                       <DetailItem label="GST Number" value={selectedApp.gst} />
                       <DetailItem label="Bank Account" value={selectedApp.bankAccount} />
                       <DetailItem label="IFSC Code" value={selectedApp.ifsc} />
                    </div>

                    <div>
                       <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Document Verification</h4>
                       <div className="space-y-2">
                          {selectedApp.documents.map(doc => (
                             <div key={doc} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-tx-teal transition-colors group">
                                <span className="text-xs font-bold text-slate-700">{doc}</span>
                                <button className="text-[9px] font-black text-tx-teal hover:underline uppercase tracking-widest">Download</button>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                       <button 
                         onClick={() => handleAction(selectedApp.id, 'Approved')}
                         className="py-4 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all active:scale-95"
                       >
                         Approve Account
                       </button>
                       <button 
                         onClick={() => handleAction(selectedApp.id, 'Rejected')}
                         className="py-4 border border-rose-200 text-rose-600 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-50 transition-all active:scale-95"
                       >
                         Reject
                       </button>
                    </div>
                 </div>
              </div>
           ) : (
              <div className="rounded-xl border-2 border-dashed border-slate-100 bg-slate-50/50 p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest opacity-40 italic">Select Application <br/> to perform KYC audit</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
   return (
      <div className="space-y-1">
         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
         <p className="text-xs font-black text-slate-800 tracking-tight">{value}</p>
      </div>
   );
}
