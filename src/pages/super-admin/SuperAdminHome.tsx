import { useEffect, useState } from "react";
import { Building2, Users, Shield, Activity, TrendingUp, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const revenueData = [
  { month: "Aug", revenue: 180000 },
  { month: "Sep", revenue: 195000 },
  { month: "Oct", revenue: 210000 },
  { month: "Nov", revenue: 225000 },
  { month: "Dec", revenue: 230000 },
  { month: "Jan", revenue: 240000 },
];

export default function SuperAdminHome() {
  const [hospitalCount, setHospitalCount] = useState(0);
  const [pendingHospitals, setPendingHospitals] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [planCount, setPlanCount] = useState(0);
  const [pendingPlans, setPendingPlans] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    supabase.from("hospitals").select("id", { count: "exact", head: true }).eq("status", "approved").then(({ count }) => setHospitalCount(count || 0));
    supabase.from("hospitals").select("id", { count: "exact", head: true }).eq("status", "pending").then(({ count }) => setPendingHospitals(count || 0));
    supabase.from("profiles").select("id", { count: "exact", head: true }).then(({ count }) => setUserCount(count || 0));
    supabase.from("insurance_plans").select("id", { count: "exact", head: true }).eq("is_approved", true).then(({ count }) => setPlanCount(count || 0));
    supabase.from("insurance_plans").select("id", { count: "exact", head: true }).eq("is_approved", false).then(({ count }) => setPendingPlans(count || 0));
    supabase.from("appointments").select("id", { count: "exact", head: true }).then(({ count }) => setAppointmentCount(count || 0));
  }, []);

  const stats = [
    { label: "Approved Hospitals", value: String(hospitalCount), icon: Building2, color: "text-primary" },
    { label: "Total Users", value: String(userCount), icon: Users, color: "text-info" },
    { label: "Insurance Plans", value: String(planCount), icon: Shield, color: "text-accent" },
    { label: "Total Appointments", value: String(appointmentCount), icon: Activity, color: "text-warning" },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-card p-4 card-shadow flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending items */}
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-4">Pending Actions</h2>
          <div className="space-y-3">
            <Link to="/super-admin/hospitals" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10">
                  <Clock className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Hospital Verifications</p>
                  <p className="text-xs text-muted-foreground">{pendingHospitals} pending</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
            </Link>
            <Link to="/super-admin/insurance" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10">
                  <Clock className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Insurance Plan Approvals</p>
                  <p className="text-xs text-muted-foreground">{pendingPlans} pending</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
            </Link>
          </div>
        </div>

        {/* Revenue chart */}
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-4">Monthly Revenue (Projected)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`} />
              <Bar dataKey="revenue" fill="hsl(220, 60%, 20%)" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
