import { useState, useMemo } from "react";
import { CheckCircle2, Star, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { insurancePlans } from "@/data/mockData";
import { motion } from "framer-motion";

export default function InsurancePage() {
  const [budget, setBudget] = useState("all");

  const filtered = useMemo(() => {
    if (budget === "all") return insurancePlans;
    const val = (p: string) => parseInt(p.replace(/[^\d]/g, ""));
    if (budget === "low") return insurancePlans.filter((p) => val(p.premium) < 10000);
    if (budget === "mid") return insurancePlans.filter((p) => { const v = val(p.premium); return v >= 10000 && v <= 16000; });
    return insurancePlans.filter((p) => val(p.premium) > 16000);
  }, [budget]);

  return (
    <Layout>
      <section className="bg-hero-gradient py-10">
        <div className="container text-center">
          <h1 className="font-display text-2xl font-bold text-primary-foreground">Compare Insurance Plans</h1>
          <p className="mt-1 text-sm text-primary-foreground/70">Find the right health insurance for your family</p>
        </div>
      </section>

      <div className="container mt-6">
        <div className="rounded-lg border bg-emerald-50 p-3 flex items-start gap-2">
          <Info className="h-4 w-4 text-accent shrink-0 mt-0.5" />
          <p className="text-xs text-foreground"><strong>Disclaimer:</strong> We do not sell insurance. MediConnect helps you compare and connect with providers.</p>
        </div>
      </div>

      <section className="py-8">
        <div className="container">
          <div className="mb-6 flex flex-wrap gap-1.5 items-center">
            <span className="text-xs font-medium text-muted-foreground mr-1">Budget:</span>
            {[{ l: "All", v: "all" }, { l: "Under ₹10k", v: "low" }, { l: "₹10k–₹16k", v: "mid" }, { l: "Above ₹16k", v: "high" }].map((o) => (
              <button key={o.v} onClick={() => setBudget(o.v)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${budget === o.v ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>
                {o.l}
              </button>
            ))}
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((plan, i) => (
              <motion.div key={plan.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="relative rounded-xl bg-card p-5 card-shadow">
                {plan.popular && <span className="absolute -top-2 right-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">Popular</span>}
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{plan.logo}</span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">{plan.provider}</h3>
                    <p className="text-xs text-muted-foreground">{plan.planName}</p>
                  </div>
                </div>
                <div className="mt-3"><span className="font-display text-2xl font-bold text-foreground">{plan.coverage}</span><span className="ml-1 text-xs text-muted-foreground">coverage</span></div>
                <p className="text-sm text-accent font-semibold mt-0.5">{plan.premium}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Age: {plan.ageRange}</p>
                <div className="flex items-center gap-1 mt-2"><Star className="h-3 w-3 text-warning fill-warning" /><span className="text-xs font-medium">{plan.rating}</span></div>
                <ul className="mt-3 space-y-1.5">
                  {plan.benefits.map((b) => <li key={b} className="flex items-start gap-1.5 text-xs text-muted-foreground"><CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-accent" /> {b}</li>)}
                </ul>
                <Button variant="outline" size="sm" className="mt-4 w-full">Learn More</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
