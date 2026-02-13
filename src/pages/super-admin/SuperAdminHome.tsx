import { Building2, Users, Shield, Activity, TrendingUp, ArrowUpRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const stats = [
  { label: "Total Hospitals", value: "127", change: "+4", up: true, icon: Building2, color: "text-primary" },
  { label: "Total Users", value: "10,482", change: "+312", up: true, icon: Users, color: "text-info" },
  { label: "Insurance Partners", value: "22", change: "+1", up: true, icon: Shield, color: "text-accent" },
  { label: "Active Sessions", value: "342", change: "+18", up: true, icon: Activity, color: "text-warning" },
];

const monthlyGrowth = [
  { month: "Aug", users: 7200, hospitals: 95 },
  { month: "Sep", users: 7800, hospitals: 102 },
  { month: "Oct", users: 8500, hospitals: 108 },
  { month: "Nov", users: 9200, hospitals: 115 },
  { month: "Dec", users: 9800, hospitals: 120 },
  { month: "Jan", users: 10482, hospitals: 127 },
];

const revenueData = [
  { month: "Aug", revenue: 180000 },
  { month: "Sep", revenue: 195000 },
  { month: "Oct", revenue: 210000 },
  { month: "Nov", revenue: 225000 },
  { month: "Dec", revenue: 230000 },
  { month: "Jan", revenue: 240000 },
];

const recentActivity = [
  { text: "New hospital registered: Sunrise Medical Center", time: "2 min ago", type: "info" },
  { text: "Suspicious login attempt from IP 203.x.x.x", time: "15 min ago", type: "warning" },
  { text: "HDFC Ergo updated plan details", time: "1 hr ago", type: "info" },
  { text: "Apollo Hospital verified successfully", time: "2 hr ago", type: "success" },
  { text: "Monthly revenue report generated", time: "3 hr ago", type: "info" },
];

const activityIcons: Record<string, { icon: typeof Activity; color: string }> = {
  info: { icon: Activity, color: "text-info" },
  warning: { icon: AlertTriangle, color: "text-warning" },
  success: { icon: CheckCircle2, color: "text-success" },
};

export default function SuperAdminHome() {
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
                <span className="flex items-center text-[10px] font-medium text-success">
                  <ArrowUpRight className="h-3 w-3" />{s.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-xl bg-card p-5 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-sm font-semibold">Platform Growth</h2>
              <p className="text-[10px] text-muted-foreground">Users & hospitals over 6 months</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-success font-medium"><TrendingUp className="h-3.5 w-3.5" /> +45%</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyGrowth}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(220, 60%, 20%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(220, 60%, 20%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="users" stroke="hsl(220, 60%, 20%)" fill="url(#colorUsers)" strokeWidth={2} />
              <Area type="monotone" dataKey="hospitals" stroke="hsl(152, 55%, 42%)" fill="hsl(152, 55%, 42%)" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={220}>
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

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-3">Platform Activity</h2>
          <div className="space-y-2">
            {recentActivity.map((a, i) => {
              const { icon: Icon, color } = activityIcons[a.type] || activityIcons.info;
              return (
                <div key={i} className="flex items-start gap-2.5 rounded-lg border px-3 py-2.5 hover:bg-secondary/30 transition-colors">
                  <Icon className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${color}`} />
                  <div className="flex-1"><p className="text-xs text-foreground">{a.text}</p><p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-3">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Pending Verifications</p>
              <p className="text-2xl font-bold font-display text-foreground mt-1">4</p>
            </div>
            <div className="rounded-xl bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Revenue (Month)</p>
              <p className="text-2xl font-bold font-display text-foreground mt-1 flex items-center gap-1">₹2.4L <TrendingUp className="h-4 w-4 text-success" /></p>
            </div>
            <div className="rounded-xl bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Data Consent Rate</p>
              <p className="text-2xl font-bold font-display text-foreground mt-1">94.2%</p>
            </div>
            <div className="rounded-xl bg-secondary p-4">
              <p className="text-xs text-muted-foreground">Avg Response Time</p>
              <p className="text-2xl font-bold font-display text-foreground mt-1">1.2s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
