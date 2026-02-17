import { useEffect, useState } from "react";
import { CalendarCheck, Building2, Shield, ArrowRight, Clock, CheckCircle2, Heart, Search, Star, Activity } from "lucide-react";
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

const healthTips = [
  { icon: Heart, title: "Stay Hydrated", desc: "Drink at least 8 glasses of water daily for optimal health." },
  { icon: Activity, title: "Regular Check-ups", desc: "Schedule annual health check-ups to catch issues early." },
  { icon: Star, title: "Mental Wellness", desc: "Take breaks and practice mindfulness for better mental health." },
];

export default function UserDashboardHome() {
  const { user, profile } = useAuth();
  const [upcoming, setUpcoming] = useState<Appointment[]>([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const today = new Date().toISOString().split("T")[0];

    supabase.from("appointments")
      .select("id, appointment_date, appointment_time, assigned_time, status, hospitals(name), doctors(name, specialization)")
      .eq("user_id", user.id)
      .in("status", ["pending", "confirmed"])
      .gte("appointment_date", today)
      .order("appointment_date")
      .limit(5)
      .then(({ data }) => setUpcoming(data || []));

    supabase.from("appointments").select("id", { count: "exact", head: true }).eq("user_id", user.id)
      .then(({ count }) => setTotalAppointments(count || 0));
    supabase.from("appointments").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "completed")
      .then(({ count }) => setCompletedCount(count || 0));
    supabase.from("appointments").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "cancelled")
      .then(({ count }) => { setCancelledCount(count || 0); setLoading(false); });
  }, [user]);

  const stats = [
    { label: "Upcoming", value: upcoming.length, icon: CalendarCheck, color: "text-info" },
    { label: "Total Visits", value: totalAppointments, icon: Building2, color: "text-primary" },
    { label: "Completed", value: completedCount, icon: CheckCircle2, color: "text-success" },
    { label: "Cancelled", value: cancelledCount, icon: Shield, color: "text-destructive" },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      {profile && (
        <div className="rounded-xl bg-hero-gradient p-5 card-shadow">
          <h2 className="font-display text-lg font-semibold text-primary-foreground">Welcome back, {profile.full_name || "User"}! 👋</h2>
          <p className="text-sm text-primary-foreground/70 mt-0.5">Here's your health overview for today</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        {/* Upcoming */}
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
                    <p className="text-xs font-medium text-foreground">{new Date(a.appointment_date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                    <p className="text-[10px] text-muted-foreground capitalize">{a.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="rounded-xl bg-card p-5 card-shadow">
            <h2 className="font-display text-sm font-semibold mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { to: "/dashboard/book", icon: CalendarCheck, label: "Book Appointment", color: "text-info" },
                { to: "/search", icon: Search, label: "Find Hospitals", color: "text-primary" },
                { to: "/dashboard/history", icon: Clock, label: "View History", color: "text-warning" },
                { to: "/insurance", icon: Shield, label: "Insurance Plans", color: "text-accent" },
              ].map((action) => (
                <Link key={action.to} to={action.to} className="flex flex-col items-center gap-1.5 rounded-lg border p-3 hover:bg-secondary/50 transition-colors">
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <span className="text-[10px] font-medium text-foreground text-center">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Health Tips */}
          <div className="rounded-xl bg-card p-5 card-shadow">
            <h2 className="font-display text-sm font-semibold mb-3">Health Tips</h2>
            <div className="space-y-2.5">
              {healthTips.map((tip) => (
                <div key={tip.title} className="flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10">
                    <tip.icon className="h-3.5 w-3.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{tip.title}</p>
                    <p className="text-[10px] text-muted-foreground">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
