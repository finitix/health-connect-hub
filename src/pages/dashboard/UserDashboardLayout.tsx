import { Home, CalendarCheck, Lightbulb, History, Settings } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: Home },
  { label: "Book Appointment", to: "/dashboard/book", icon: CalendarCheck },
  { label: "Recommendations", to: "/dashboard/recommendations", icon: Lightbulb },
  { label: "History", to: "/dashboard/history", icon: History },
  { label: "Profile", to: "/dashboard/profile", icon: Settings },
];

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/book": "Book Appointment",
  "/dashboard/recommendations": "Recommendations",
  "/dashboard/history": "Appointment History",
  "/dashboard/profile": "Profile & Settings",
};

export default function UserDashboardLayout() {
  const location = useLocation();
  return (
    <DashboardLayout title={titles[location.pathname] || "Dashboard"} navItems={navItems} role="Patient">
      <Outlet />
    </DashboardLayout>
  );
}
