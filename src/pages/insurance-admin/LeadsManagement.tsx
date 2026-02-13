import { Mail, Phone, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const leads = [
  { id: 1, name: "Rahul Kapoor", plan: "Family Health Optima", date: "Mar 10", status: "New", email: "rahul@example.com", phone: "+91 98765 43210" },
  { id: 2, name: "Sneha Mehta", plan: "Optima Secure", date: "Mar 9", status: "Contacted", email: "sneha@example.com", phone: "+91 87654 32100" },
  { id: 3, name: "Arun Prasad", plan: "Complete Health", date: "Mar 8", status: "New", email: "arun@example.com", phone: "+91 76543 21000" },
  { id: 4, name: "Maya Das", plan: "Health Companion", date: "Mar 7", status: "Converted", email: "maya@example.com", phone: "+91 65432 10000" },
  { id: 5, name: "Kiran Thakur", plan: "Family Health Optima", date: "Mar 6", status: "Lost", email: "kiran@example.com", phone: "+91 54321 00000" },
];

const statusColors: Record<string, string> = {
  New: "text-info bg-info/10",
  Contacted: "text-warning bg-warning/10",
  Converted: "text-success bg-success/10",
  Lost: "text-destructive bg-destructive/10",
};

export default function LeadsManagement() {
  return (
    <div className="animate-fade-up">
      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-secondary/50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Name</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden sm:table-cell">Plan Interest</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden md:table-cell">Date</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Contact</th>
            </tr></thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3"><p className="font-medium text-foreground">{l.name}</p><p className="text-xs text-muted-foreground">{l.email}</p></td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{l.plan}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{l.date}</td>
                  <td className="px-4 py-3"><span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${statusColors[l.status]}`}>{l.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Mail className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Phone className="h-3.5 w-3.5" /></Button>
                    </div>
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
