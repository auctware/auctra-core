import { NavLink, Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

const mobileNav = [
  { to: "/", label: "Home" },
  { to: "/registration", label: "KYC" },
  { to: "/wallet-account", label: "Wallet" },
  { to: "/masters", label: "Masters" },
  { to: "/market-watch", label: "Watch" },
  { to: "/auction-floor", label: "Floor" },
  { to: "/reporting", label: "Reports" },
] as const;

export function DashboardLayout() {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <nav
          className="flex gap-1 overflow-x-auto border-b border-tx-border bg-white px-2 py-2 lg:hidden"
          aria-label="Module navigation"
        >
          {mobileNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "shrink-0 rounded-md border-l-2 py-1.5 pl-3 pr-2 text-xs font-medium",
                  isActive
                    ? "border-tx-teal bg-tx-mint text-tx-teal"
                    : "border-transparent text-slate-600 hover:bg-tx-canvas",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
