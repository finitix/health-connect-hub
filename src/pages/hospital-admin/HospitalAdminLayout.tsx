import { Home, UserCheck, CalendarCheck, Shield, BarChart3, FileEdit } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/hospital-admin", icon: Home },
  { label: "Doctors", to: "/hospital-admin/doctors", icon: UserCheck },
  { label: "Appointments", to: "/hospital-admin/appointments", icon: CalendarCheck },
  { label: "Booking Form", to: "/hospital-admin/booking-form", icon: FileEdit },
  { label: "Insurance", to: "/hospital-admin/insurance", icon: Shield },
  { label: "Analytics", to: "/hospital-admin/analytics", icon: BarChart3 },
];

const titles: Record<string, string> = {
  "/hospital-admin": "Hospital Dashboard",
  "/hospital-admin/doctors": "Doctor Management",
  "/hospital-admin/appointments": "Appointment Management",
  "/hospital-admin/booking-form": "Booking Form Builder",
  "/hospital-admin/insurance": "Insurance Management",
  "/hospital-admin/analytics": "Analytics",
};

export default function HospitalAdminLayout() {
  const location = useLocation();
  return (
    <DashboardLayout title={titles[location.pathname] || "Hospital Admin"} navItems={navItems} role="Hospital Admin">
      <Outlet />
    </DashboardLayout>
  );
}
