import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile) return;
    setIsLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setIsLoading(true);
    // Simulate verifying OTP
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userMobile", mobile);
      navigate("/");
      window.location.reload();
    }, 1500);
  };

  const features = [
    { icon: "🌾", text: "Agri-Commodity Auctions" },
    { icon: "⚙️", text: "Non-Ferrous & Metal Trading" },
    { icon: "💎", text: "Intangible & Carbon Assets" },
    { icon: "🧠", text: "AI-Powered Grade Prediction" },
  ];

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-tx-teal/10">
      
      {/* LEFT PANEL: BRANDING & FEATURES */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-24 bg-gradient-to-br from-tx-navy to-[#05070a] text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_100%_100%,#14b8a6_0%,transparent_50%)]"></div>
         
         <div className="relative z-10 space-y-12">
            <div className="space-y-4">
               <div className="mb-12">
                  <img 
                    src="https://auctware.in/assets/images/logo.png" 
                    alt="Auctware Logo" 
                    className="h-12 w-auto object-contain brightness-0 invert" 
                  />
               </div>
               <h1 className="text-6xl font-black text-white tracking-tighter leading-tight font-mono">
                  Multi-Class <br/>
                  <span className="text-tx-teal">Commodity Flow.</span>
               </h1>
               <p className="text-lg font-bold text-slate-400">The gateway to Agri, Metal, and Intangible auctions.</p>
            </div>

            <div className="space-y-8 py-10">
               {features.map((f) => (
                  <div key={f.text} className="flex items-center gap-6 group">
                     <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 shadow-sm flex items-center justify-center text-xl transition-all group-hover:bg-tx-teal group-hover:scale-110">
                        {f.icon}
                     </div>
                     <span className="text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{f.text}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* RIGHT PANEL: LOGIN CARD */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:bg-slate-50/50">
         <div className="w-full max-w-[480px] bg-white rounded-3xl p-12 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 animate-in fade-in slide-in-from-right-8 duration-700">
            
            <div className="mb-14 text-left">
               <h2 className="text-4xl font-black text-tx-navy tracking-tighter uppercase">{step === 1 ? 'Authorize Access' : 'Verify Identity'}</h2>
               <p className="text-[10px] text-slate-400 font-black mt-2 uppercase tracking-[0.2em] italic">
                  {step === 1 ? 'Exchange Portal v5.0 Secure Connection' : `OTP sent to +91 ${mobile.slice(-4).padStart(mobile.length, '*')}`}
               </p>
            </div>

            <form onSubmit={step === 1 ? handleGetOtp : handleVerifyOtp} className="space-y-10">
               {step === 1 ? (
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                     <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-tx-teal transition-colors text-lg">📱</span>
                        <input 
                           required
                           type="tel"
                           value={mobile}
                           onChange={e => setMobile(e.target.value)}
                           className="w-full border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-4 font-bold text-slate-800 text-sm outline-none transition-all focus:border-tx-teal focus:ring-4 ring-tx-teal/5"
                           placeholder="Enter registered mobile number"
                        />
                     </div>
                  </div>
               ) : (
                  <div className="space-y-3">
                     <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enter 6-Digit OTP</label>
                        <button type="button" onClick={() => setStep(1)} className="text-[9px] font-black text-tx-teal uppercase tracking-widest hover:underline">Change Number</button>
                     </div>
                     <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-tx-teal transition-colors text-lg">🔑</span>
                        <input 
                           required
                           type="text"
                           maxLength={6}
                           value={otp}
                           onChange={e => setOtp(e.target.value)}
                           className="w-full border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-4 font-bold tracking-[1em] text-slate-800 text-lg outline-none transition-all focus:border-tx-teal focus:ring-4 ring-tx-teal/5"
                           placeholder="••••••"
                        />
                     </div>
                     <div className="flex justify-center pt-2">
                        <button type="button" className="text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-tx-navy">Resend OTP in 24s</button>
                     </div>
                  </div>
               )}

               <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 border-l-4 border-l-tx-teal">
                  <p className="text-[9px] leading-relaxed text-slate-500 font-bold uppercase tracking-widest">
                     By accessing this node you agree to comply with <span className="text-tx-teal hover:underline cursor-pointer">Auction Protocols</span>. Unauthorized access triggers <span className="text-rose-600 font-black underline">Compliance Lockouts</span>.
                  </p>
               </div>

               <button 
                  disabled={isLoading || (step === 1 && !mobile) || (step === 2 && !otp)}
                  className="w-full py-5 bg-tx-navy text-white rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-tx-navy/20 hover:bg-black hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
               >
                  {isLoading ? (
                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                     <>{step === 1 ? 'Get Verification OTP' : 'Authorize & Access Floor'} <span className="text-tx-teal group-hover:translate-x-1 transition-transform">→</span></>
                  )}
               </button>

               <div className="text-center pt-8 border-t border-slate-50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     New Participant? <span onClick={() => navigate("/kyc")} className="text-tx-teal cursor-pointer hover:underline underline-offset-4 decoration-2">Onboard Here</span>
                  </p>
               </div>
            </form>
         </div>
      </div>

      <div className="absolute bottom-6 left-10 text-[8px] font-black text-tx-navy/20 uppercase tracking-[0.5em] italic hidden lg:block">
         Secure Exchange Interface • TLS 1.3 Active • MFA Shield Enabled
      </div>
    </div>
  );
}
