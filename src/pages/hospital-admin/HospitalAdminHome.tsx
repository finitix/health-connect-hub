import { CalendarCheck, UserCheck, Clock, CheckCircle2, TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const stats = [
  { label: "Today's Appointments", value: "12", change: "+3", up: true, icon: CalendarCheck, color: "text-info" },
  { label: "Active Doctors", value: "8", change: "0", up: true, icon: UserCheck, color: "text-accent" },
  { label: "Pending Requests", value: "3", change: "-2", up: false, icon: Clock, color: "text-warning" },
  { label: "Completed Today", value: "7", change: "+5", up: true, icon: CheckCircle2, color: "text-success" },
];

const weeklyData = [
  { day: "Mon", appointments: 18, completed: 15 },
  { day: "Tue", appointments: 22, completed: 20 },
  { day: "Wed", appointments: 15, completed: 14 },
  { day: "Thu", appointments: 28, completed: 25 },
  { day: "Fri", appointments: 20, completed: 18 },
  { day: "Sat", appointments: 12, completed: 10 },
  { day: "Sun", appointments: 5, completed: 5 },
];

const departmentData = [
  { dept: "Cardiology", patients: 45 },
  { dept: "Neurology", patients: 32 },
  { dept: "Ortho", patients: 28 },
  { dept: "Pediatrics", patients: 38 },
  { dept: "Oncology", patients: 20 },
];

const todayAppointments = [
  { id: 1, patient: "Rahul K.", doctor: "Dr. Priya Sharma", time: "9:00 AM", status: "Confirmed", type: "Follow-up" },
  { id: 2, patient: "Sneha M.", doctor: "Dr. Rajesh Kumar", time: "9:30 AM", status: "In Progress", type: "New" },
  { id: 3, patient: "Arun P.", doctor: "Dr. Priya Sharma", time: "10:00 AM", status: "Pending", type: "Emergency" },
  { id: 4, patient: "Maya D.", doctor: "Dr. Anita Desai", time: "10:30 AM", status: "Confirmed", type: "Follow-up" },
  { id: 5, patient: "Vikram S.", doctor: "Dr. Rajesh Kumar", time: "11:00 AM", status: "Confirmed", type: "New" },
];

const statusColors: Record<string, string> = {
  Confirmed: "text-info bg-info/10",
  "In Progress": "text-warning bg-warning/10",
  Pending: "text-muted-foreground bg-secondary",
};

const typeColors: Record<string, string> = {
  "Follow-up": "bg-primary/10 text-primary",
  New: "bg-accent/10 text-accent",
  Emergency: "bg-destructive/10 text-destructive",
};

export default function HospitalAdminHome() {
  return (
    <div className="space-y-6 animate-fade-up">
      {/* Stats */}
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

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 rounded-xl bg-card p-5 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-sm font-semibold">Weekly Appointments</h2>
              <p className="text-[10px] text-muted-foreground">This week vs completed</p>
            </div>
            <span className="flex items-center gap-1 text-xs text-success font-medium"><TrendingUp className="h-3.5 w-3.5" /> +12%</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorAppt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(220, 60%, 20%)" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="hsl(220, 60%, 20%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Area type="monotone" dataKey="appointments" stroke="hsl(220, 60%, 20%)" fill="url(#colorAppt)" strokeWidth={2} />
              <Area type="monotone" dataKey="completed" stroke="hsl(152, 55%, 42%)" fill="hsl(152, 55%, 42%)" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="lg:col-span-2 rounded-xl bg-card p-5 card-shadow">
          <h2 className="font-display text-sm font-semibold mb-4">Department Load</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={departmentData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="dept" type="category" tick={{ fontSize: 10 }} width={65} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Bar dataKey="patients" fill="hsl(220, 60%, 20%)" radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Appointments Table */}
      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="font-display text-sm font-semibold">Today's Appointments</h2>
            <p className="text-[10px] text-muted-foreground">5 appointments scheduled</p>
          </div>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-secondary/50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Patient</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Doctor</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Time</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Type</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
            </tr></thead>
            <tbody>
              {todayAppointments.map((a) => (
                <tr key={a.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{a.patient}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.doctor}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.time}</td>
                  <td className="px-4 py-3"><span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-medium ${typeColors[a.type] || ""}`}>{a.type}</span></td>
                  <td className="px-4 py-3"><span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${statusColors[a.status] || ""}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
