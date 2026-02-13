import { Home, Building2, Shield, Users, Lock, DollarSign } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/super-admin", icon: Home },
  { label: "Hospitals", to: "/super-admin/hospitals", icon: Building2 },
  { label: "Insurance", to: "/super-admin/insurance", icon: Shield },
  { label: "Users", to: "/super-admin/users", icon: Users },
  { label: "Security", to: "/super-admin/security", icon: Lock },
  { label: "Revenue", to: "/super-admin/revenue", icon: DollarSign },
];

const titles: Record<string, string> = {
  "/super-admin": "Super Admin",
  "/super-admin/hospitals": "Hospital Verification",
  "/super-admin/insurance": "Insurance Partners",
  "/super-admin/users": "User Management",
  "/super-admin/security": "Security & Compliance",
  "/super-admin/revenue": "Revenue & Monetization",
};

export default function SuperAdminLayout() {
  const location = useLocation();
  return (
    <DashboardLayout title={titles[location.pathname] || "Super Admin"} navItems={navItems} role="Super Admin">
      <Outlet />
    </DashboardLayout>
  );
}
