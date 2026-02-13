import { Building2, Users, Shield, Activity, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Hospitals", value: "127", icon: Building2, color: "text-primary" },
  { label: "Total Users", value: "10,482", icon: Users, color: "text-info" },
  { label: "Insurance Partners", value: "22", icon: Shield, color: "text-accent" },
  { label: "Active Sessions", value: "342", icon: Activity, color: "text-warning" },
];

const recentActivity = [
  { text: "New hospital registered: Sunrise Medical Center", time: "2 min ago" },
  { text: "User report: suspicious login from IP 203.x.x.x", time: "15 min ago" },
  { text: "Insurance partner HDFC Ergo updated plan details", time: "1 hr ago" },
  { text: "Hospital Apollo verified successfully", time: "2 hr ago" },
  { text: "Monthly revenue report generated", time: "3 hr ago" },
];

export default function SuperAdminHome() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-card p-4 card-shadow flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary"><s.icon className={`h-5 w-5 ${s.color}`} /></div>
            <div><p className="text-2xl font-bold font-display text-foreground">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-3">Platform Activity</h2>
          <div className="space-y-2">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border px-3 py-2">
                <Activity className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                <div className="flex-1"><p className="text-xs text-foreground">{a.text}</p><p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-3">Quick Stats</h2>
          <div className="space-y-4">
            <div><p className="text-xs text-muted-foreground">Pending Verifications</p><p className="text-xl font-bold font-display">4</p></div>
            <div><p className="text-xs text-muted-foreground">Revenue (This Month)</p><p className="text-xl font-bold font-display flex items-center gap-1">₹2.4L <TrendingUp className="h-4 w-4 text-success" /></p></div>
            <div><p className="text-xs text-muted-foreground">Data Consent Rate</p><p className="text-xl font-bold font-display">94.2%</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
