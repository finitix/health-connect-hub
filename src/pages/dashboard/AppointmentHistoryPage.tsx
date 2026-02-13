import { Download, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const history = [
  { id: 1, hospital: "Apollo Hospital", doctor: "Dr. Priya Sharma", date: "Feb 10, 2026", dept: "Cardiology", status: "Completed" },
  { id: 2, hospital: "Fortis Hospital", doctor: "Dr. Meera Nair", date: "Jan 25, 2026", dept: "Nephrology", status: "Completed" },
  { id: 3, hospital: "Medanta", doctor: "Dr. Suresh Rao", date: "Jan 12, 2026", dept: "Cardiac Surgery", status: "Cancelled" },
  { id: 4, hospital: "Max Hospital", doctor: "Dr. Amit Chandra", date: "Dec 20, 2025", dept: "Spine Surgery", status: "Completed" },
];

export default function AppointmentHistoryPage() {
  return (
    <div className="animate-fade-up">
      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Hospital</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Doctor</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Department</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-foreground">{h.hospital}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{h.doctor}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{h.dept}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{h.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${h.status === "Completed" ? "text-success" : "text-destructive"}`}>
                      {h.status === "Completed" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                      {h.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {h.status === "Completed" && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs"><Download className="h-3 w-3 mr-1" /> PDF</Button>
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
