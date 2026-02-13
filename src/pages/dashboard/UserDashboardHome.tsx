import { CalendarCheck, Building2, Shield, Bell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { label: "Upcoming", value: "2", icon: CalendarCheck, color: "text-info" },
  { label: "Hospitals Visited", value: "5", icon: Building2, color: "text-primary" },
  { label: "Insurance Plans", value: "1", icon: Shield, color: "text-accent" },
];

const upcomingAppointments = [
  { id: 1, hospital: "Apollo Hospital", doctor: "Dr. Priya Sharma", date: "Mar 15, 2026", time: "10:00 AM", dept: "Cardiology" },
  { id: 2, hospital: "Fortis Hospital", doctor: "Dr. Vikram Patel", date: "Mar 22, 2026", time: "2:30 PM", dept: "Oncology" },
];

const reminders = [
  { text: "Annual health checkup due", type: "info" },
  { text: "Insurance renewal in 30 days", type: "warning" },
];

export default function UserDashboardHome() {
  return (
    <div className="space-y-6 animate-fade-up">
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
          <div className="space-y-3">
            {upcomingAppointments.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50">
                  <CalendarCheck className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{a.doctor}</p>
                  <p className="text-xs text-muted-foreground">{a.hospital} · {a.dept}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-foreground">{a.date}</p>
                  <p className="text-[11px] text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-card p-5 card-shadow">
            <h2 className="font-display text-sm font-semibold mb-3">Health Reminders</h2>
            <div className="space-y-2">
              {reminders.map((r, i) => (
                <div key={i} className={`flex items-center gap-2 rounded-lg p-3 text-xs ${r.type === "warning" ? "bg-warning/10 text-warning-foreground" : "bg-info/10 text-info"}`}>
                  <Bell className="h-3.5 w-3.5 shrink-0" /> {r.text}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-card p-5 card-shadow">
            <h2 className="font-display text-sm font-semibold mb-3">Suggested For You</h2>
            <div className="space-y-2">
              <Link to="/dashboard/recommendations" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/50 transition-colors">
                <span className="text-xs text-foreground">Best cardiologists near you</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
              <Link to="/insurance" className="flex items-center justify-between rounded-lg border p-3 hover:bg-secondary/50 transition-colors">
                <span className="text-xs text-foreground">Top insurance plans for families</span>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
