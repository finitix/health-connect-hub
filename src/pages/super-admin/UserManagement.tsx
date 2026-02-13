import { Ban, Eye, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const users = [
  { id: 1, name: "Rahul Kapoor", email: "rahul@example.com", role: "Patient", status: "Active", lastLogin: "2 hrs ago" },
  { id: 2, name: "Sneha Mehta", email: "sneha@example.com", role: "Patient", status: "Active", lastLogin: "1 day ago" },
  { id: 3, name: "Dr. Priya Sharma", email: "priya@apollo.com", role: "Hospital Admin", status: "Active", lastLogin: "30 min ago" },
  { id: 4, name: "Arun Prasad", email: "arun@example.com", role: "Patient", status: "Suspended", lastLogin: "5 days ago" },
  { id: 5, name: "Maya Das", email: "maya@starhealth.com", role: "Insurance Admin", status: "Active", lastLogin: "3 hrs ago" },
];

export default function UserManagement() {
  return (
    <div className="animate-fade-up">
      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-secondary/50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">User</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden sm:table-cell">Role</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden md:table-cell">Last Login</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3"><p className="font-medium text-foreground">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></td>
                  <td className="px-4 py-3 hidden sm:table-cell"><span className="rounded bg-navy-50 px-2 py-0.5 text-xs font-medium text-primary">{u.role}</span></td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{u.lastLogin}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium ${u.status === "Active" ? "text-success" : "text-destructive"}`}>{u.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Eye className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-destructive"><Ban className="h-3.5 w-3.5" /></Button>
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
