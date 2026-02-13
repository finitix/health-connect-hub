import { CalendarCheck, UserCheck, Clock, CheckCircle2 } from "lucide-react";

const stats = [
  { label: "Today's Appointments", value: "12", icon: CalendarCheck, color: "text-info" },
  { label: "Active Doctors", value: "8", icon: UserCheck, color: "text-accent" },
  { label: "Pending Requests", value: "3", icon: Clock, color: "text-warning" },
  { label: "Completed Today", value: "7", icon: CheckCircle2, color: "text-success" },
];

const todayAppointments = [
  { id: 1, patient: "Rahul K.", doctor: "Dr. Priya Sharma", time: "9:00 AM", status: "Confirmed" },
  { id: 2, patient: "Sneha M.", doctor: "Dr. Rajesh Kumar", time: "9:30 AM", status: "In Progress" },
  { id: 3, patient: "Arun P.", doctor: "Dr. Priya Sharma", time: "10:00 AM", status: "Pending" },
  { id: 4, patient: "Maya D.", doctor: "Dr. Anita Desai", time: "10:30 AM", status: "Confirmed" },
];

const statusColors: Record<string, string> = {
  Confirmed: "text-info bg-info/10",
  "In Progress": "text-warning bg-warning/10",
  Pending: "text-muted-foreground bg-secondary",
};

export default function HospitalAdminHome() {
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

      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="px-5 py-4 border-b"><h2 className="font-display text-sm font-semibold">Today's Appointments</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-secondary/50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Patient</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Doctor</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Time</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
            </tr></thead>
            <tbody>
              {todayAppointments.map((a) => (
                <tr key={a.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{a.patient}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.doctor}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.time}</td>
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
