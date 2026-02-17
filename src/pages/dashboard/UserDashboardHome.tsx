import { useEffect, useState } from "react";
import { CalendarCheck, Building2, Shield, Bell, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string | null;
  assigned_time: string | null;
  status: string;
  hospitals: { name: string } | null;
  doctors: { name: string; specialization: string } | null;
}

export default function UserDashboardHome() {
  const { user, profile } = useAuth();
  const [upcoming, setUpcoming] = useState<Appointment[]>([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];

    // Fetch upcoming appointments
    supabase.from("appointments")
      .select("id, appointment_date, appointment_time, assigned_time, status, hospitals(name), doctors(name, specialization)")
      .eq("user_id", user.id)
      .in("status", ["pending", "confirmed"])
      .gte("appointment_date", today)
      .order("appointment_date")
      .limit(5)
      .then(({ data }) => { setUpcoming(data || []); });

    // Count total
    supabase.from("appointments").select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .then(({ count }) => { setTotalAppointments(count || 0); setLoading(false); });
  }, [user]);

  const stats = [
    { label: "Upcoming", value: String(upcoming.length), icon: CalendarCheck, color: "text-info" },
    { label: "Total Appointments", value: String(totalAppointments), icon: Building2, color: "text-primary" },
    { label: "Active Insurance", value: "—", icon: Shield, color: "text-accent" },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {profile && (
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-lg font-semibold text-foreground">Welcome back, {profile.full_name || "User"}!</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Here's your health overview</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-card p-4 card-shadow flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
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
        <div className="rounded-xl bg-card p-5 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-semibold">Upcoming Appointments</h2>
            <Button variant="ghost" size="sm" className="text-xs" asChild><Link to="/dashboard/book">Book new <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
          </div>
          {loading ? (
            <div className="flex justify-center py-6"><div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>
          ) : upcoming.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground text-sm">
              <CalendarCheck className="h-6 w-6 mx-auto mb-2 text-muted-foreground/30" />
              <p>No upcoming appointments</p>
              <Button size="sm" className="mt-3" asChild><Link to="/dashboard/book">Book Appointment</Link></Button>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    {a.status === "confirmed" ? <CheckCircle2 className="h-4 w-4 text-accent" /> : <Clock className="h-4 w-4 text-warning" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{a.doctors?.name || "Doctor TBD"}</p>
                    <p className="text-xs text-muted-foreground">{a.hospitals?.name} {a.doctors?.specialization ? `· ${a.doctors.specialization}` : ""}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-foreground">{a.appointment_date}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{a.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-card p-5 card-shadow">
            <h2 className="font-display text-sm font-semibold mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <Link to="/dashboard/book" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/50 transition-colors">
                <span className="text-xs text-foreground">Book a new appointment</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
              <Link to="/dashboard/history" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/50 transition-colors">
                <span className="text-xs text-foreground">View appointment history</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
              <Link to="/search" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/50 transition-colors">
                <span className="text-xs text-foreground">Find hospitals near you</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
              <Link to="/insurance" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/50 transition-colors">
                <span className="text-xs text-foreground">Compare insurance plans</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
