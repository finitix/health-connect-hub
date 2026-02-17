import { useEffect, useState } from "react";
import { CalendarCheck, UserCheck, Clock, CheckCircle2, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Users, XCircle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: string;
  patient_name: string;
  appointment_date: string;
  appointment_time: string | null;
  status: string;
  doctors: { name: string; specialization: string } | null;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  is_active: boolean;
}

export default function HospitalAdminHome() {
  const { hospitalId } = useAuth();
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hospitalId) { setLoading(false); return; }
    const today = new Date().toISOString().split("T")[0];

    // Today's appointments
    supabase.from("appointments")
      .select("id, patient_name, appointment_date, appointment_time, status, doctors(name, specialization)")
      .eq("hospital_id", hospitalId)
      .eq("appointment_date", today)
      .order("appointment_time")
      .then(({ data }) => setTodayAppointments(data || []));

    // Doctors
    supabase.from("doctors").select("id, name, specialization, is_active").eq("hospital_id", hospitalId)
      .then(({ data }) => setDoctors(data || []));

    // Counts
    supabase.from("appointments").select("id", { count: "exact", head: true }).eq("hospital_id", hospitalId)
      .then(({ count }) => setTotalAppointments(count || 0));
    supabase.from("appointments").select("id", { count: "exact", head: true }).eq("hospital_id", hospitalId).eq("status", "pending")
      .then(({ count }) => setPendingCount(count || 0));
    supabase.from("appointments").select("id", { count: "exact", head: true }).eq("hospital_id", hospitalId).eq("status", "confirmed")
      .then(({ count }) => setConfirmedCount(count || 0));
    supabase.from("appointments").select("id", { count: "exact", head: true }).eq("hospital_id", hospitalId).eq("status", "completed")
      .then(({ count }) => { setCompletedCount(count || 0); setLoading(false); });
  }, [hospitalId]);

  const activeDoctors = doctors.filter(d => d.is_active).length;

  const stats = [
    { label: "Today's Appointments", value: todayAppointments.length, icon: CalendarCheck, color: "text-info" },
    { label: "Active Doctors", value: activeDoctors, icon: UserCheck, color: "text-accent" },
    { label: "Pending Requests", value: pendingCount, icon: Clock, color: "text-warning" },
    { label: "Total Completed", value: completedCount, icon: CheckCircle2, color: "text-success" },
  ];

  const statusColors: Record<string, string> = {
    pending: "text-warning bg-warning/10",
    confirmed: "text-info bg-info/10",
    completed: "text-success bg-success/10",
    rejected: "text-destructive bg-destructive/10",
    cancelled: "text-muted-foreground bg-secondary",
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  }

  if (!hospitalId) {
    return (
      <div className="text-center py-12">
        <Activity className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <h2 className="font-display text-lg font-semibold text-foreground">No Hospital Linked</h2>
        <p className="text-sm text-muted-foreground mt-1">Your account isn't linked to a hospital yet. Please register a hospital or contact support.</p>
        <Button className="mt-4" asChild><Link to="/hospital-registration">Register Hospital</Link></Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Stats */}
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link to="/hospital-admin/appointments" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-xs text-foreground">Manage Appointments</span>
              </div>
              {pendingCount > 0 && <span className="text-[10px] font-medium text-warning bg-warning/10 rounded-full px-2 py-0.5">{pendingCount} pending</span>}
            </Link>
            <Link to="/hospital-admin/doctors" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-accent" />
                <span className="text-xs text-foreground">Manage Doctors</span>
              </div>
              <span className="text-[10px] text-muted-foreground">{doctors.length} total</span>
            </Link>
            <Link to="/hospital-admin/booking-form" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-xs text-foreground">Booking Form Builder</span>
              </div>
            </Link>
            <Link to="/hospital-admin/analytics" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-info" />
                <span className="text-xs text-foreground">View Analytics</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Doctors */}
        <div className="rounded-xl bg-card p-5 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-semibold">Your Doctors</h2>
            <Button size="sm" variant="ghost" className="text-xs" asChild><Link to="/hospital-admin/doctors">Manage</Link></Button>
          </div>
          {doctors.length === 0 ? (
            <div className="text-center py-6">
              <Users className="h-6 w-6 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">No doctors added yet</p>
              <Button size="sm" className="mt-2" asChild><Link to="/hospital-admin/doctors">Add Doctors</Link></Button>
            </div>
          ) : (
            <div className="space-y-2">
              {doctors.slice(0, 5).map((d) => (
                <div key={d.id} className="flex items-center gap-3 rounded-lg border p-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium text-foreground">
                    {d.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{d.name}</p>
                    <p className="text-[10px] text-muted-foreground">{d.specialization}</p>
                  </div>
                  <span className={`h-2 w-2 rounded-full ${d.is_active ? "bg-success" : "bg-muted-foreground"}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Overview stats */}
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-4">Appointment Overview</h2>
          <div className="space-y-3">
            {[
              { label: "Total Appointments", value: totalAppointments, color: "bg-primary" },
              { label: "Pending", value: pendingCount, color: "bg-warning" },
              { label: "Confirmed", value: confirmedCount, color: "bg-info" },
              { label: "Completed", value: completedCount, color: "bg-success" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
                <span className="text-sm font-semibold font-display text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Appointments Table */}
      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="font-display text-sm font-semibold">Today's Appointments</h2>
            <p className="text-[10px] text-muted-foreground">{todayAppointments.length} scheduled for today</p>
          </div>
          <Button size="sm" variant="outline" className="text-xs" asChild><Link to="/hospital-admin/appointments">View all</Link></Button>
        </div>
        {todayAppointments.length === 0 ? (
          <div className="p-8 text-center">
            <CalendarCheck className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No appointments for today</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-secondary/50">
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Patient</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden sm:table-cell">Doctor</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Time</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
              </tr></thead>
              <tbody>
                {todayAppointments.map((a) => (
                  <tr key={a.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{a.patient_name}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{a.doctors?.name || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.appointment_time || "TBD"}</td>
                    <td className="px-4 py-3"><span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-medium ${statusColors[a.status] || ""}`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
