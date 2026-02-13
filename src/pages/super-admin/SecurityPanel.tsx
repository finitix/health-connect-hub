import { Lock, Activity, FileCheck, Database } from "lucide-react";

const auditLogs = [
  { action: "Login", user: "admin@mediconnect.com", ip: "203.x.x.x", time: "2 min ago", type: "Auth" },
  { action: "Hospital approved", user: "admin@mediconnect.com", ip: "203.x.x.x", time: "1 hr ago", type: "Admin" },
  { action: "User suspended", user: "admin@mediconnect.com", ip: "203.x.x.x", time: "2 hr ago", type: "Admin" },
  { action: "Data export requested", user: "rahul@example.com", ip: "156.x.x.x", time: "3 hr ago", type: "Data" },
  { action: "Login failed (3 attempts)", user: "unknown@test.com", ip: "45.x.x.x", time: "5 hr ago", type: "Security" },
];

const typeColors: Record<string, string> = {
  Auth: "bg-info/10 text-info",
  Admin: "bg-primary/10 text-primary",
  Data: "bg-accent/10 text-accent",
  Security: "bg-destructive/10 text-destructive",
};

export default function SecurityPanel() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-card p-4 card-shadow"><div className="flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /><span className="text-xs text-muted-foreground">2FA Enabled</span></div><p className="text-xl font-bold mt-1">89%</p></div>
        <div className="rounded-xl bg-card p-4 card-shadow"><div className="flex items-center gap-2"><Activity className="h-4 w-4 text-warning" /><span className="text-xs text-muted-foreground">Failed Logins (24h)</span></div><p className="text-xl font-bold mt-1">7</p></div>
        <div className="rounded-xl bg-card p-4 card-shadow"><div className="flex items-center gap-2"><FileCheck className="h-4 w-4 text-accent" /><span className="text-xs text-muted-foreground">Consent Rate</span></div><p className="text-xl font-bold mt-1">94.2%</p></div>
        <div className="rounded-xl bg-card p-4 card-shadow"><div className="flex items-center gap-2"><Database className="h-4 w-4 text-info" /><span className="text-xs text-muted-foreground">Data Requests</span></div><p className="text-xl font-bold mt-1">3</p></div>
      </div>

      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="px-5 py-4 border-b"><h2 className="font-display text-sm font-semibold">Audit Log</h2></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-secondary/50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Action</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden sm:table-cell">User</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden md:table-cell">IP</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Type</th>
              <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Time</th>
            </tr></thead>
            <tbody>
              {auditLogs.map((l, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{l.action}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs hidden sm:table-cell">{l.user}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs hidden md:table-cell">{l.ip}</td>
                  <td className="px-4 py-3"><span className={`rounded-md px-2 py-0.5 text-xs font-medium ${typeColors[l.type]}`}>{l.type}</span></td>
                  <td className="px-4 py-3 text-right text-xs text-muted-foreground">{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
