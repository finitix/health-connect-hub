import { Package, Inbox, Eye, TrendingUp } from "lucide-react";

const stats = [
  { label: "Active Plans", value: "6", icon: Package, color: "text-primary" },
  { label: "New Leads", value: "24", icon: Inbox, color: "text-accent" },
  { label: "Plan Views (7d)", value: "1,842", icon: Eye, color: "text-info" },
  { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, color: "text-success" },
];

export default function InsuranceAdminHome() {
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
      <div className="rounded-xl bg-card p-5 card-shadow">
        <h2 className="font-display text-sm font-semibold mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {["New lead: Rahul K. interested in Family Health Optima", "Plan views up 15% this week", "3 leads contacted - awaiting response", "New plan 'Health Shield Plus' approved"].map((a, i) => (
            <div key={i} className="rounded-lg border px-3 py-2 text-xs text-muted-foreground">{a}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
