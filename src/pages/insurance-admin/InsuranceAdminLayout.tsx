import { Home, Package, Inbox, BarChart3 } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/insurance-admin", icon: Home },
  { label: "Plans", to: "/insurance-admin/plans", icon: Package },
  { label: "Leads", to: "/insurance-admin/leads", icon: Inbox },
  { label: "Analytics", to: "/insurance-admin/analytics", icon: BarChart3 },
];

const titles: Record<string, string> = {
  "/insurance-admin": "Insurance Dashboard",
  "/insurance-admin/plans": "Plan Management",
  "/insurance-admin/leads": "Leads Management",
  "/insurance-admin/analytics": "Analytics",
};

export default function InsuranceAdminLayout() {
  const location = useLocation();
  return (
    <DashboardLayout title={titles[location.pathname] || "Insurance Admin"} navItems={navItems} role="Insurance Admin">
      <Outlet />
    </DashboardLayout>
  );
}
