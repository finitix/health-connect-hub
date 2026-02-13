import { CheckCircle2, XCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const partners = [
  { id: 1, name: "Star Health", plans: 3, status: "Approved", irdai: "IRDAI/HLT/001" },
  { id: 2, name: "HDFC Ergo", plans: 2, status: "Approved", irdai: "IRDAI/HLT/002" },
  { id: 3, name: "ICICI Lombard", plans: 2, status: "Approved", irdai: "IRDAI/HLT/003" },
  { id: 4, name: "Max Bupa", plans: 1, status: "Approved", irdai: "IRDAI/HLT/004" },
  { id: 5, name: "SafeHealth Insurance", plans: 0, status: "Pending", irdai: "Pending" },
];

export default function InsurancePartnerControl() {
  return (
    <div className="animate-fade-up">
      <div className="rounded-xl border bg-emerald-50 p-3 flex items-start gap-2 mb-6">
        <Shield className="h-4 w-4 text-accent shrink-0 mt-0.5" />
        <p className="text-xs text-foreground">All insurance partners must provide valid IRDAI registration before approval.</p>
      </div>
      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-secondary/50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Partner</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Active Plans</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden sm:table-cell">IRDAI #</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {partners.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.plans}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell font-mono text-xs">{p.irdai}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 text-xs font-medium ${p.status === "Approved" ? "text-success" : "text-warning"}`}>
                    {p.status === "Approved" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />} {p.status}
                  </span></td>
                  <td className="px-4 py-3 text-right">
                    {p.status === "Pending" && <Button size="sm" className="h-7 text-xs bg-accent hover:bg-accent/90 text-accent-foreground">Approve</Button>}
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
