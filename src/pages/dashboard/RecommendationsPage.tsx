import { Star, MapPin, CheckCircle2, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospitals, insurancePlans } from "@/data/mockData";
import { Link } from "react-router-dom";

export default function RecommendationsPage() {
  return (
    <div className="space-y-8 animate-fade-up">
      <div className="rounded-xl bg-card p-5 card-shadow">
        <p className="text-xs text-muted-foreground mb-1">How recommendations work</p>
        <p className="text-sm text-foreground">Based on your health profile, location, and insurance — we suggest the best matches for you.</p>
      </div>

      <div>
        <h2 className="font-display text-base font-semibold text-foreground mb-4 flex items-center gap-2"><Building2 className="h-4 w-4 text-primary" /> Best Hospitals For You</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {hospitals.slice(0, 3).map((h) => (
            <div key={h.id} className="rounded-xl bg-card p-4 card-shadow">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-semibold text-foreground flex-1">{h.name}</h3>
                <span className="flex items-center gap-0.5 text-xs font-medium"><Star className="h-3 w-3 text-warning fill-warning" /> {h.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {h.location} · {h.distance}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {h.specializations.slice(0, 2).map((s) => <span key={s} className="rounded bg-navy-50 px-1.5 py-0.5 text-[10px] font-medium text-primary">{s}</span>)}
              </div>
              <Button size="sm" className="mt-3 w-full bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link to={`/hospital/${h.id}`}>View & Book</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-base font-semibold text-foreground mb-4 flex items-center gap-2"><Shield className="h-4 w-4 text-accent" /> Recommended Insurance Plans</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {insurancePlans.filter((p) => p.popular).map((plan) => (
            <div key={plan.id} className="rounded-xl bg-card p-4 card-shadow">
              <div className="flex items-center gap-2">
                <span className="text-lg">{plan.logo}</span>
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">{plan.provider}</h3>
                  <p className="text-xs text-muted-foreground">{plan.planName}</p>
                </div>
              </div>
              <div className="mt-2"><span className="font-display text-lg font-bold">{plan.coverage}</span> <span className="text-xs text-muted-foreground">· {plan.premium}</span></div>
              <ul className="mt-2 space-y-1">
                {plan.benefits.slice(0, 2).map((b) => <li key={b} className="flex items-start gap-1.5 text-xs text-muted-foreground"><CheckCircle2 className="h-3 w-3 text-accent mt-0.5 shrink-0" /> {b}</li>)}
              </ul>
              <Button variant="outline" size="sm" className="mt-3 w-full" asChild><Link to="/insurance">Compare</Link></Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
