import { NavLink } from "react-router-dom";

const nav = [
  { to: "/", label: "Overview", icon: "◆" },
  { to: "/registration", label: "Registration & KYC", icon: "◇" },
  { to: "/wallet-account", label: "Wallet & Account", icon: "⎗" },
  { to: "/admin-approvals", label: "Admin Approvals", icon: "🛡" },
  { to: "/masters", label: "Master data", icon: "▣" },
  { to: "/market-watch", label: "Market watch", icon: "◎" },
  { to: "/auction-floor", label: "Auction floor", icon: "⬡" },
  { to: "/order-trade-book", label: "Order/Trade Book", icon: "📑" },
  { to: "/reporting", label: "Reporting", icon: "▤" },
] as const;

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-tx-border bg-white shadow-sm lg:flex">
      <div className="border-b border-tx-border px-5 py-4">
        <div className="flex items-center gap-3">
          <img src="https://auctware.in/assets/images/logo.png" alt="Auctware Logo" className="h-8 w-auto object-contain" />
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 rounded-r-lg border-l-4 py-2.5 pl-3 pr-3 text-sm font-medium transition-colors",
                isActive
                  ? "border-tx-teal bg-tx-mint text-tx-teal"
                  : "border-transparent text-slate-600 hover:bg-tx-canvas hover:text-slate-900",
              ].join(" ")
            }
          >
            <span className="text-base opacity-80" aria-hidden>
              {item.icon}
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-tx-border p-4 space-y-4">
        <p className="text-xs leading-relaxed text-slate-500">
          AI copilot assists KYC, scrap grading, moisture & weight risk, and settlement. Configure
          models under Masters.
        </p>
        <button 
          onClick={() => { localStorage.removeItem("isLoggedIn"); window.location.href = "/login"; }}
          className="w-full flex items-center gap-3 py-2.5 px-3 text-sm font-black text-rose-600 hover:bg-rose-50 rounded-lg transition-all uppercase tracking-widest"
        >
          <span className="text-lg opacity-80">⎋</span>
          Terminate Session
        </button>
      </div>
    </aside>
  );
}
