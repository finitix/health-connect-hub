import { useState, useMemo } from "react";
import { CheckCircle2, Star, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { insurancePlans } from "@/data/mockData";
import { motion } from "framer-motion";

export default function InsurancePage() {
  const [budgetFilter, setBudgetFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (budgetFilter === "all") return insurancePlans;
    if (budgetFilter === "low") return insurancePlans.filter((p) => parseInt(p.premium.replace(/[^\d]/g, "")) < 10000);
    if (budgetFilter === "mid") return insurancePlans.filter((p) => { const v = parseInt(p.premium.replace(/[^\d]/g, "")); return v >= 10000 && v <= 16000; });
    return insurancePlans.filter((p) => parseInt(p.premium.replace(/[^\d]/g, "")) > 16000);
  }, [budgetFilter]);

  return (
    <Layout>
      <section className="bg-hero-gradient py-12">
        <div className="container text-center">
          <h1 className="font-display text-3xl font-bold text-primary-foreground">Compare Insurance Plans</h1>
          <p className="mt-2 text-primary-foreground/80">Find the right health insurance for you and your family</p>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="container mt-8">
        <div className="rounded-xl border border-primary/20 bg-teal-50 p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-foreground">
            <strong>Disclaimer:</strong> We do not sell insurance. MediConnect helps you compare and connect with insurance providers. Always read the policy documents carefully.
          </p>
        </div>
      </div>

      <section className="py-10">
        <div className="container">
          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            <span className="text-sm font-medium text-muted-foreground mr-2 self-center">Budget:</span>
            {[
              { label: "All", value: "all" },
              { label: "Under ₹10k/yr", value: "low" },
              { label: "₹10k–₹16k/yr", value: "mid" },
              { label: "Above ₹16k/yr", value: "high" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setBudgetFilter(opt.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  budgetFilter === opt.value ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="relative rounded-2xl bg-card p-6 card-shadow"
              >
                {plan.popular && (
                  <span className="absolute -top-2 right-4 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground">
                    Popular
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{plan.logo}</span>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{plan.provider}</h3>
                    <p className="text-sm text-muted-foreground">{plan.planName}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-foreground">{plan.coverage}</span>
                  <span className="text-sm text-muted-foreground">coverage</span>
                </div>
                <p className="text-primary font-semibold mt-1">{plan.premium}</p>
                <p className="text-xs text-muted-foreground mt-1">Age: {plan.ageRange}</p>

                <div className="flex items-center gap-1 mt-3">
                  <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                  <span className="text-sm font-medium">{plan.rating}</span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {plan.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>

                <Button variant="outline" className="mt-6 w-full">
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              <p className="text-lg font-medium">No plans match your criteria</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
