import { useState, useEffect } from "react";
import { Plus, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Plan {
  id: string;
  name: string;
  provider_name: string;
  plan_type: string;
  coverage_amount: number;
  premium_monthly: number;
  premium_yearly: number;
  description: string | null;
  features: string[];
  is_approved: boolean;
  created_at: string;
}

export default function PlanManagement() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: "", provider_name: "", plan_type: "Individual", coverage_amount: "", premium_monthly: "", premium_yearly: "", description: "", features: "" });

  const fetchPlans = async () => {
    const { data } = await supabase.from("insurance_plans").select("*").order("created_at", { ascending: false });
    setPlans(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchPlans(); }, []);

  const createPlan = async () => {
    if (!form.name || !form.provider_name) { toast.error("Name and provider required"); return; }
    const { error } = await supabase.from("insurance_plans").insert({
      name: form.name,
      provider_name: form.provider_name,
      plan_type: form.plan_type,
      coverage_amount: parseFloat(form.coverage_amount) || 0,
      premium_monthly: parseFloat(form.premium_monthly) || 0,
      premium_yearly: parseFloat(form.premium_yearly) || 0,
      description: form.description || null,
      features: form.features.split(",").map(s => s.trim()).filter(Boolean),
      uploaded_by: user?.id,
      uploaded_by_type: "insurance_admin",
      is_approved: false,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Plan submitted for approval");
    setForm({ name: "", provider_name: "", plan_type: "Individual", coverage_amount: "", premium_monthly: "", premium_yearly: "", description: "", features: "" });
    setShowAdd(false);
    fetchPlans();
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{plans.length} plan(s)</p>
        <Button size="sm" onClick={() => setShowAdd(!showAdd)}><Plus className="h-3.5 w-3.5 mr-1" /> Add Plan</Button>
      </div>

      {showAdd && (
        <div className="rounded-xl bg-card p-5 card-shadow animate-fade-in">
          <h3 className="font-display text-sm font-semibold mb-3">New Insurance Plan</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className="text-xs font-medium text-muted-foreground">Plan Name *</label><input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm" placeholder="e.g. Family Health Optima" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Provider Name *</label><input value={form.provider_name} onChange={e => setForm(f => ({...f, provider_name: e.target.value}))} className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm" placeholder="e.g. Star Health" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Plan Type</label><select value={form.plan_type} onChange={e => setForm(f => ({...f, plan_type: e.target.value}))} className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm"><option>Individual</option><option>Family</option><option>Senior Citizen</option><option>Group</option></select></div>
            <div><label className="text-xs font-medium text-muted-foreground">Coverage Amount (₹)</label><input type="number" value={form.coverage_amount} onChange={e => setForm(f => ({...f, coverage_amount: e.target.value}))} className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm" placeholder="e.g. 1000000" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Monthly Premium (₹)</label><input type="number" value={form.premium_monthly} onChange={e => setForm(f => ({...f, premium_monthly: e.target.value}))} className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Yearly Premium (₹)</label><input type="number" value={form.premium_yearly} onChange={e => setForm(f => ({...f, premium_yearly: e.target.value}))} className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm" /></div>
          </div>
          <div className="mt-3"><label className="text-xs font-medium text-muted-foreground">Description</label><textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm" rows={2} /></div>
          <div className="mt-3"><label className="text-xs font-medium text-muted-foreground">Features (comma-separated)</label><input value={form.features} onChange={e => setForm(f => ({...f, features: e.target.value}))} className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm" placeholder="Cashless treatment, No co-pay, Free checkup" /></div>
          <div className="mt-4 flex gap-2"><Button size="sm" onClick={createPlan}>Submit for Approval</Button><Button variant="ghost" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button></div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((p) => (
          <div key={p.id} className="rounded-xl bg-card p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.provider_name} · {p.plan_type}</p>
              </div>
              <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full ${p.is_approved ? "bg-accent/10 text-accent" : "bg-warning/10 text-warning"}`}>
                {p.is_approved ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                {p.is_approved ? "Approved" : "Pending"}
              </span>
            </div>
            <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
              <span>Coverage: ₹{(p.coverage_amount / 100000).toFixed(1)}L</span>
              <span>₹{p.premium_yearly?.toLocaleString()}/yr</span>
            </div>
            {p.features?.length > 0 && (
              <ul className="mt-2 space-y-1">{p.features.slice(0, 3).map((b) => <li key={b} className="flex items-start gap-1 text-xs text-muted-foreground"><CheckCircle2 className="h-3 w-3 text-accent mt-0.5 shrink-0" /> {b}</li>)}</ul>
            )}
          </div>
        ))}
      </div>
      {plans.length === 0 && !showAdd && (
        <div className="py-12 text-center text-muted-foreground">
          <p className="text-sm">No insurance plans yet</p>
          <Button size="sm" className="mt-3" onClick={() => setShowAdd(true)}>Add Your First Plan</Button>
        </div>
      )}
    </div>
  );
}
