import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  provider_name: string;
  plan_type: string;
  coverage_amount: number;
  premium_yearly: number;
  features: string[];
  description: string | null;
  is_approved: boolean;
  uploaded_by_type: string | null;
  created_at: string;
}

export default function InsurancePartnerControl() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const fetchPlans = async () => {
    const { data } = await supabase.from("insurance_plans").select("*").order("created_at", { ascending: false });
    setPlans(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPlans(); }, []);

  const updateApproval = async (id: string, approved: boolean) => {
    const { error } = await supabase.from("insurance_plans").update({
      is_approved: approved,
      approved_at: approved ? new Date().toISOString() : null,
    }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(approved ? "Plan approved" : "Plan rejected");
    fetchPlans();
    setSelectedPlan(null);
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;

  const pending = plans.filter(p => !p.is_approved);
  const approved = plans.filter(p => p.is_approved);

  return (
    <div className="animate-fade-up space-y-6">
      <div className="rounded-xl border bg-secondary/30 p-3 flex items-start gap-2">
        <Shield className="h-4 w-4 text-accent shrink-0 mt-0.5" />
        <p className="text-xs text-foreground">Review and approve insurance plans. Only approved plans are visible to the public.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-card p-4 card-shadow text-center">
          <p className="font-display text-2xl font-bold text-warning">{pending.length}</p>
          <p className="text-xs text-muted-foreground">Pending</p>
        </div>
        <div className="rounded-xl bg-card p-4 card-shadow text-center">
          <p className="font-display text-2xl font-bold text-accent">{approved.length}</p>
          <p className="text-xs text-muted-foreground">Approved</p>
        </div>
        <div className="rounded-xl bg-card p-4 card-shadow text-center">
          <p className="font-display text-2xl font-bold text-foreground">{plans.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
      </div>

      {selectedPlan && (
        <div className="rounded-xl bg-card p-6 card-shadow border-2 border-primary/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-display text-lg font-semibold">{selectedPlan.name}</h3>
            <button onClick={() => setSelectedPlan(null)} className="text-muted-foreground hover:text-foreground">✕</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><span className="text-xs text-muted-foreground">Provider</span><p>{selectedPlan.provider_name}</p></div>
            <div><span className="text-xs text-muted-foreground">Type</span><p>{selectedPlan.plan_type}</p></div>
            <div><span className="text-xs text-muted-foreground">Coverage</span><p>₹{(selectedPlan.coverage_amount / 100000).toFixed(1)} Lakh</p></div>
            <div><span className="text-xs text-muted-foreground">Premium (Yearly)</span><p>₹{selectedPlan.premium_yearly?.toLocaleString()}</p></div>
            <div><span className="text-xs text-muted-foreground">Source</span><p className="capitalize">{selectedPlan.uploaded_by_type || "N/A"}</p></div>
          </div>
          {selectedPlan.description && <div className="mt-3"><span className="text-xs text-muted-foreground">Description</span><p className="text-sm">{selectedPlan.description}</p></div>}
          {selectedPlan.features?.length > 0 && (
            <div className="mt-3"><span className="text-xs text-muted-foreground">Features</span>
              <ul className="mt-1 space-y-1">{selectedPlan.features.map(f => <li key={f} className="flex items-start gap-1 text-xs text-muted-foreground"><CheckCircle2 className="h-3 w-3 text-accent mt-0.5 shrink-0" /> {f}</li>)}</ul>
            </div>
          )}
          {!selectedPlan.is_approved && (
            <div className="flex gap-2 mt-4">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => updateApproval(selectedPlan.id, true)}>Approve Plan</Button>
              <Button variant="outline" className="text-destructive" onClick={() => updateApproval(selectedPlan.id, false)}>Reject</Button>
            </div>
          )}
          {selectedPlan.is_approved && (
            <div className="mt-4">
              <Button variant="outline" className="text-destructive" onClick={() => updateApproval(selectedPlan.id, false)}>Revoke Approval</Button>
            </div>
          )}
        </div>
      )}

      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-secondary/50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Plan</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden sm:table-cell">Provider</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden md:table-cell">Coverage</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden md:table-cell">Source</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {plans.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No insurance plans yet</td></tr>
              ) : plans.map((p) => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">{p.plan_type}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{p.provider_name}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">₹{(p.coverage_amount / 100000).toFixed(1)}L</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell capitalize text-xs">{p.uploaded_by_type || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${p.is_approved ? "text-accent" : "text-warning"}`}>
                      {p.is_approved ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {p.is_approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setSelectedPlan(p)}>
                      <Eye className="h-3 w-3 mr-1" /> Review
                    </Button>
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
