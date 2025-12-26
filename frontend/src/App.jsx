
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import SyntheticMonitoring from "./pages/synthetic/SyntheticMonitoring";
import NetworkTools from "./pages/tools/NetworkTools";
import DNSChecker from "./pages/tools/DNSChecker";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/synthetic-monitoring" element={<SyntheticMonitoring />} />
        <Route path="/network-tools" element={<NetworkTools />} />
        <Route path="/network-tools/dns-checker" element={<DNSChecker />} />
      </Routes>
    </BrowserRouter>
  );
}
