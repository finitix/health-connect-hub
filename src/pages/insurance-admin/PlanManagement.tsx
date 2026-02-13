import { useState } from "react";
import { Plus, Edit, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { insurancePlans } from "@/data/mockData";

export default function PlanManagement() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{insurancePlans.length} plans</p>
        <Button size="sm" onClick={() => setShowAdd(!showAdd)}><Plus className="h-3.5 w-3.5 mr-1" /> Add Plan</Button>
      </div>

      {showAdd && (
        <div className="rounded-xl bg-card p-5 card-shadow animate-fade-in">
          <h3 className="font-display text-sm font-semibold mb-3">New Insurance Plan</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className="text-xs font-medium text-muted-foreground">Plan Name</label><input className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Coverage Amount</label><input className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. ₹10 Lakh" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Monthly Premium</label><input className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Age Range</label><input className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. 18-65" /></div>
          </div>
          <div><label className="text-xs font-medium text-muted-foreground mt-3 block">Exclusions</label><textarea className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" rows={2} /></div>
          <div className="mt-4 flex gap-2"><Button size="sm">Create</Button><Button variant="ghost" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button></div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {insurancePlans.map((p) => (
          <div key={p.id} className="rounded-xl bg-card p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><span className="text-lg">{p.logo}</span><div><h3 className="text-sm font-semibold text-foreground">{p.planName}</h3><p className="text-xs text-muted-foreground">{p.coverage} · {p.premium}</p></div></div>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
            </div>
            <ul className="mt-2 space-y-1">{p.benefits.slice(0, 2).map((b) => <li key={b} className="flex items-start gap-1 text-xs text-muted-foreground"><CheckCircle2 className="h-3 w-3 text-accent mt-0.5 shrink-0" /> {b}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}
