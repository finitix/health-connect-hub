import { useEffect, useState } from "react";
import { Building2, Users, Shield, Activity, Clock, CheckCircle2, XCircle, TrendingUp, ArrowUpRight, CalendarCheck, AlertTriangle, UserCheck } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface RecentHospital {
  id: string;
  name: string;
  city: string;
  state: string;
  status: string;
  created_at: string;
}

interface RecentAppointment {
  id: string;
  patient_name: string;
  appointment_date: string;
  status: string;
  hospitals: { name: string } | null;
}

const COLORS = ["hsl(220, 60%, 20%)", "hsl(152, 55%, 42%)", "hsl(38, 92%, 50%)", "hsl(0, 72%, 51%)"];

export default function SuperAdminHome() {
  const [hospitalCount, setHospitalCount] = useState(0);
  const [pendingHospitals, setPendingHospitals] = useState(0);
  const [rejectedHospitals, setRejectedHospitals] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [planCount, setPlanCount] = useState(0);
  const [pendingPlans, setPendingPlans] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [recentHospitals, setRecentHospitals] = useState<RecentHospital[]>([]);
  const [recentAppointments, setRecentAppointments] = useState<RecentAppointment[]>([]);
  const [appointmentsByStatus, setAppointmentsByStatus] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    // Counts
    supabase.from("hospitals").select("id", { count: "exact", head: true }).eq("status", "approved").then(({ count }) => setHospitalCount(count || 0));
    supabase.from("hospitals").select("id", { count: "exact", head: true }).eq("status", "pending").then(({ count }) => setPendingHospitals(count || 0));
    supabase.from("hospitals").select("id", { count: "exact", head: true }).eq("status", "rejected").then(({ count }) => setRejectedHospitals(count || 0));
    supabase.from("profiles").select("id", { count: "exact", head: true }).then(({ count }) => setUserCount(count || 0));
    supabase.from("insurance_plans").select("id", { count: "exact", head: true }).eq("is_approved", true).then(({ count }) => setPlanCount(count || 0));
    supabase.from("insurance_plans").select("id", { count: "exact", head: true }).eq("is_approved", false).then(({ count }) => setPendingPlans(count || 0));
    supabase.from("appointments").select("id", { count: "exact", head: true }).then(({ count }) => setAppointmentCount(count || 0));
    supabase.from("doctors").select("id", { count: "exact", head: true }).then(({ count }) => setDoctorCount(count || 0));

    // Recent hospitals
    supabase.from("hospitals").select("id, name, city, state, status, created_at").order("created_at", { ascending: false }).limit(5)
      .then(({ data }) => setRecentHospitals(data || []));

    // Recent appointments
    supabase.from("appointments").select("id, patient_name, appointment_date, status, hospitals(name)").order("created_at", { ascending: false }).limit(5)
      .then(({ data }) => setRecentAppointments(data || []));

    // Appointments by status
    Promise.all([
      supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "confirmed"),
      supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "completed"),
      supabase.from("appointments").select("id", { count: "exact", head: true }).eq("status", "cancelled"),
    ]).then(([pending, confirmed, completed, cancelled]) => {
      setAppointmentsByStatus([
        { name: "Pending", value: pending.count || 0 },
        { name: "Confirmed", value: confirmed.count || 0 },
        { name: "Completed", value: completed.count || 0 },
        { name: "Cancelled", value: cancelled.count || 0 },
      ]);
    });
  }, []);

  const stats = [
    { label: "Approved Hospitals", value: hospitalCount, icon: Building2, color: "text-primary", sub: `${pendingHospitals} pending` },
    { label: "Total Users", value: userCount, icon: Users, color: "text-info", sub: "registered accounts" },
    { label: "Active Doctors", value: doctorCount, icon: UserCheck, color: "text-accent", sub: "across hospitals" },
    { label: "Insurance Plans", value: planCount, icon: Shield, color: "text-warning", sub: `${pendingPlans} pending` },
    { label: "Appointments", value: appointmentCount, icon: CalendarCheck, color: "text-success", sub: "total bookings" },
    { label: "Rejected", value: rejectedHospitals, icon: XCircle, color: "text-destructive", sub: "hospitals rejected" },
  ];

  const statusColors: Record<string, string> = {
    pending: "text-warning bg-warning/10",
    approved: "text-success bg-success/10",
    rejected: "text-destructive bg-destructive/10",
    confirmed: "text-info bg-info/10",
    completed: "text-success bg-success/10",
    cancelled: "text-muted-foreground bg-secondary",
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-card p-4 card-shadow">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-[10px] text-muted-foreground/70 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Pending Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" /> Pending Actions
          </h2>
          <div className="space-y-3">
            <Link to="/super-admin/hospitals" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                  <Building2 className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{pendingHospitals} Hospitals</p>
                  <p className="text-[10px] text-muted-foreground">awaiting verification</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
            </Link>
            <Link to="/super-admin/insurance" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning/10">
                  <Shield className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{pendingPlans} Plans</p>
                  <p className="text-[10px] text-muted-foreground">awaiting approval</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs">Review</Button>
            </Link>
          </div>
        </div>

        {/* Appointment Status Pie */}
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-4">Appointment Distribution</h2>
          {appointmentsByStatus.some(s => s.value > 0) ? (
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie data={appointmentsByStatus} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={55} paddingAngle={2}>
                    {appointmentsByStatus.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5">
                {appointmentsByStatus.map((s, i) => (
                  <div key={s.name} className="flex items-center gap-2 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-muted-foreground">{s.name}</span>
                    <span className="font-medium text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No appointments yet</p>
          )}
        </div>

        {/* System Health */}
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-success" /> System Health
          </h2>
          <div className="space-y-3">
            {[
              { label: "Database", status: "Operational", color: "text-success bg-success/10" },
              { label: "Authentication", status: "Operational", color: "text-success bg-success/10" },
              { label: "File Storage", status: "Operational", color: "text-success bg-success/10" },
              { label: "API Gateway", status: "Operational", color: "text-success bg-success/10" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-lg border p-2.5">
                <span className="text-xs text-foreground">{item.label}</span>
                <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium ${item.color}`}>
                  <CheckCircle2 className="h-2.5 w-2.5" /> {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Tables */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Hospitals */}
        <div className="rounded-xl bg-card card-shadow overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">Recent Hospital Registrations</h2>
            <Button size="sm" variant="ghost" className="text-xs" asChild><Link to="/super-admin/hospitals">View all</Link></Button>
          </div>
          {recentHospitals.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">No hospitals registered yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-secondary/50">
                  <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground">Hospital</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground hidden sm:table-cell">Location</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground">Status</th>
                </tr></thead>
                <tbody>
                  {recentHospitals.map((h) => (
                    <tr key={h.id} className="border-b last:border-0 hover:bg-secondary/30">
                      <td className="px-4 py-2.5 font-medium text-foreground">{h.name}</td>
                      <td className="px-4 py-2.5 text-muted-foreground hidden sm:table-cell">{h.city}, {h.state}</td>
                      <td className="px-4 py-2.5"><span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-medium ${statusColors[h.status] || ""}`}>{h.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Appointments */}
        <div className="rounded-xl bg-card card-shadow overflow-hidden">
          <div className="px-5 py-4 border-b flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">Recent Appointments</h2>
          </div>
          {recentAppointments.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">No appointments yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b bg-secondary/50">
                  <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground">Patient</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground hidden sm:table-cell">Hospital</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-muted-foreground">Status</th>
                </tr></thead>
                <tbody>
                  {recentAppointments.map((a) => (
                    <tr key={a.id} className="border-b last:border-0 hover:bg-secondary/30">
                      <td className="px-4 py-2.5 font-medium text-foreground">{a.patient_name}</td>
                      <td className="px-4 py-2.5 text-muted-foreground hidden sm:table-cell">{a.hospitals?.name || "—"}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{a.appointment_date}</td>
                      <td className="px-4 py-2.5"><span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-medium ${statusColors[a.status] || ""}`}>{a.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
