import { Package, Inbox, Eye, TrendingUp, ArrowUpRight, ArrowDownRight, Users } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const stats = [
  { label: "Active Plans", value: "6", change: "+1", up: true, icon: Package, color: "text-primary" },
  { label: "New Leads", value: "24", change: "+8", up: true, icon: Inbox, color: "text-accent" },
  { label: "Plan Views (7d)", value: "1,842", change: "+15%", up: true, icon: Eye, color: "text-info" },
  { label: "Conversion Rate", value: "3.2%", change: "+0.4%", up: true, icon: TrendingUp, color: "text-success" },
];

const viewsData = [
  { date: "Jan", views: 1200, leads: 30 },
  { date: "Feb", views: 1800, leads: 42 },
  { date: "Mar", views: 1500, leads: 35 },
  { date: "Apr", views: 2200, leads: 55 },
  { date: "May", views: 2800, leads: 68 },
  { date: "Jun", views: 2400, leads: 58 },
];

const planDistribution = [
  { name: "Family Optima", value: 35 },
  { name: "Optima Secure", value: 25 },
  { name: "Health Guard", value: 20 },
  { name: "Others", value: 20 },
];

const COLORS = ["hsl(220, 60%, 20%)", "hsl(152, 55%, 42%)", "hsl(38, 92%, 50%)", "hsl(220, 14%, 80%)"];

const recentLeads = [
  { name: "Rahul K.", plan: "Family Health Optima", status: "New", time: "2 min ago" },
  { name: "Sneha M.", plan: "Optima Secure", status: "Contacted", time: "1 hr ago" },
  { name: "Arun P.", plan: "Health Guard", status: "Interested", time: "3 hr ago" },
  { name: "Maya D.", plan: "Family Health Optima", status: "New", time: "5 hr ago" },
];

const leadStatusColors: Record<string, string> = {
  New: "bg-accent/10 text-accent",
  Contacted: "bg-info/10 text-info",
  Interested: "bg-warning/10 text-warning",
};

export default function InsuranceAdminHome() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-card p-4 card-shadow flex items-center gap-3 group hover:card-shadow-hover transition-shadow">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary group-hover:bg-primary/5 transition-colors">
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
                <span className={`flex items-center text-[10px] font-medium ${s.up ? "text-success" : "text-destructive"}`}>
                  {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {s.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-4">Views & Leads Trend</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Line yAxisId="left" type="monotone" dataKey="views" stroke="hsl(220, 60%, 20%)" strokeWidth={2} dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="leads" stroke="hsl(152, 55%, 42%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-4">Plan Interest</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={planDistribution} innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                {planDistribution.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {planDistribution.map((p, i) => (
              <span key={p.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} /> {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="font-display text-sm font-semibold">Recent Leads</h2>
            <p className="text-[10px] text-muted-foreground">Latest interest in your plans</p>
          </div>
          <Users className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-secondary/50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Name</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Plan</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Time</th>
            </tr></thead>
            <tbody>
              {recentLeads.map((l, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{l.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.plan}</td>
                  <td className="px-4 py-3"><span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-medium ${leadStatusColors[l.status] || ""}`}>{l.status}</span></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
