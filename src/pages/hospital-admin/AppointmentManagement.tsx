import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock } from "lucide-react";

const appointments = [
  { id: 1, patient: "Rahul K.", doctor: "Dr. Priya Sharma", date: "Mar 15", time: "10:00 AM", status: "Pending" },
  { id: 2, patient: "Sneha M.", doctor: "Dr. Rajesh Kumar", date: "Mar 15", time: "11:00 AM", status: "Confirmed" },
  { id: 3, patient: "Arun P.", doctor: "Dr. Anita Desai", date: "Mar 16", time: "9:00 AM", status: "Pending" },
  { id: 4, patient: "Maya D.", doctor: "Dr. Priya Sharma", date: "Mar 16", time: "2:30 PM", status: "Confirmed" },
  { id: 5, patient: "Kiran T.", doctor: "Dr. Rajesh Kumar", date: "Mar 17", time: "10:30 AM", status: "Rejected" },
];

const statusIcons: Record<string, React.ReactNode> = {
  Confirmed: <CheckCircle2 className="h-3 w-3 text-success" />,
  Pending: <Clock className="h-3 w-3 text-warning" />,
  Rejected: <XCircle className="h-3 w-3 text-destructive" />,
};

export default function AppointmentManagement() {
  return (
    <div className="animate-fade-up">
      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-secondary/50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Patient</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Doctor</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden sm:table-cell">Date</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Time</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{a.patient}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.doctor}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{a.date}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.time}</td>
                  <td className="px-4 py-3"><span className="flex items-center gap-1 text-xs font-medium">{statusIcons[a.status]} {a.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    {a.status === "Pending" && (
                      <div className="flex gap-1 justify-end">
                        <Button size="sm" className="h-7 text-xs bg-accent hover:bg-accent/90 text-accent-foreground">Accept</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs">Reject</Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
