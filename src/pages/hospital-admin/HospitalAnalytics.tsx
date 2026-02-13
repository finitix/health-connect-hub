import { BarChart3, TrendingUp, Users, CalendarCheck } from "lucide-react";

const monthlyStats = [
  { month: "Jan", appointments: 145 }, { month: "Feb", appointments: 162 },
  { month: "Mar", appointments: 178 }, { month: "Apr", appointments: 155 },
  { month: "May", appointments: 190 }, { month: "Jun", appointments: 201 },
];

const topDoctors = [
  { name: "Dr. Priya Sharma", bookings: 45, dept: "Cardiology" },
  { name: "Dr. Rajesh Kumar", bookings: 38, dept: "Neurology" },
  { name: "Dr. Anita Desai", bookings: 32, dept: "Orthopedics" },
];

export default function HospitalAnalytics() {
  const maxAppointments = Math.max(...monthlyStats.map((s) => s.appointments));

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-card p-4 card-shadow"><p className="text-xs text-muted-foreground">Total Appointments</p><p className="font-display text-2xl font-bold mt-1">1,031</p><p className="text-xs text-success flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" /> +12% vs last month</p></div>
        <div className="rounded-xl bg-card p-4 card-shadow"><p className="text-xs text-muted-foreground">Avg. Daily Patients</p><p className="font-display text-2xl font-bold mt-1">34</p></div>
        <div className="rounded-xl bg-card p-4 card-shadow"><p className="text-xs text-muted-foreground">Satisfaction Rate</p><p className="font-display text-2xl font-bold mt-1">4.8<span className="text-sm text-muted-foreground">/5</span></p></div>
      </div>

      <div className="rounded-xl bg-card p-5 card-shadow">
        <h2 className="font-display text-sm font-semibold mb-4">Monthly Appointments</h2>
        <div className="flex items-end gap-3 h-32">
          {monthlyStats.map((s) => (
            <div key={s.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-foreground">{s.appointments}</span>
              <div className="w-full bg-primary/80 rounded-t" style={{ height: `${(s.appointments / maxAppointments) * 100}%` }} />
              <span className="text-[10px] text-muted-foreground">{s.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-card p-5 card-shadow">
        <h2 className="font-display text-sm font-semibold mb-3">Most Booked Doctors</h2>
        <div className="space-y-3">
          {topDoctors.map((d, i) => (
            <div key={d.name} className="flex items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground w-4">#{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.dept}</p>
              </div>
              <span className="text-sm font-bold text-foreground">{d.bookings}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
