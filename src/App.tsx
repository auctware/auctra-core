import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardHome } from "./pages/DashboardHome";
import { RegistrationKYC } from "./pages/RegistrationKYC";
import { RegistrationSummary } from "./pages/RegistrationSummary";
import { WalletAccount } from "./pages/WalletAccount";
import { AdminApprovals } from "./pages/AdminApprovals";
import { Masters } from "./pages/Masters";
import { MarketWatch } from "./pages/MarketWatch";
import { AuctionFloor } from "./pages/AuctionFloor";
import { Reporting } from "./pages/Reporting";
import { Login } from "./pages/Login";
import { OrderTradeBook } from "./pages/OrderTradeBook";

export default function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <Routes>
      {/* Auth Gate */}
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
      
      {/* Protected Terminal Routes */}
      <Route element={isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" replace />}>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/registration" element={<RegistrationKYC />} />
        <Route path="/registration-summary" element={<RegistrationSummary />} />
        <Route path="/wallet-account" element={<WalletAccount />} />
        <Route path="/admin-approvals" element={<AdminApprovals />} />
        <Route path="/masters" element={<Masters />} />
        <Route path="/market-watch" element={<MarketWatch />} />
        <Route path="/auction-floor" element={<AuctionFloor />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/order-trade-book" element={<OrderTradeBook />} />
      </Route>
      
      {/* Catch-all Redirect */}
      <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
    </Routes>
  );
}
