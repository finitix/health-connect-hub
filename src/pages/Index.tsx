import { Link } from "react-router-dom";
import { Search, Building2, Shield, CalendarCheck, Star, ArrowRight, CheckCircle2, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { hospitals, insurancePlans } from "@/data/mockData";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const steps = [
  { icon: Search, title: "Describe Your Need", desc: "Search by health condition, location, or hospital name" },
  { icon: Building2, title: "Compare Options", desc: "View ratings, specializations, and accepted insurance" },
  { icon: CalendarCheck, title: "Book Appointment", desc: "Select a doctor, pick a time, and you're done" },
];

const trustPoints = [
  { icon: CheckCircle2, title: "Verified Hospitals", text: "Every hospital is manually verified" },
  { icon: Shield, title: "Transparent Insurance", text: "Clear comparisons, no hidden fees" },
  { icon: Users, title: "Trusted by Thousands", text: "Join families making smarter health choices" },
  { icon: Clock, title: "Save Time", text: "Everything you need in one place" },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient py-20 md:py-28">
        <div className="container">
          <motion.div initial="hidden" animate="visible" className="mx-auto max-w-2xl text-center">
            <motion.p variants={fadeUp} custom={0} className="text-sm font-medium text-accent uppercase tracking-wider mb-3">Healthcare made simple</motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl">
              Find the Right Hospital &amp; Insurance in One Place
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-base text-primary-foreground/70 max-w-lg mx-auto">
              Compare top-rated hospitals, explore insurance plans, and book appointments — all in a few clicks.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col gap-3 sm:flex-row max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input type="text" placeholder="Condition, hospital, or city..." className="h-11 w-full rounded-lg border-0 bg-card pl-10 pr-4 text-sm text-foreground shadow-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
              </div>
              <Button className="h-11 bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link to="/search">Search</Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-5 flex items-center justify-center gap-5 text-xs text-primary-foreground/50">
              <span className="flex items-center gap-1"><Star className="h-3 w-3" /> 500+ Hospitals</span>
              <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> 20+ Insurers</span>
              <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 10k+ Users</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-foreground">How It Works</h2>
            <p className="mt-1 text-sm text-muted-foreground">Three steps to better healthcare</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="text-center p-6 rounded-xl bg-card card-shadow">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg bg-primary/5">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="mt-3 inline-block text-xs font-bold text-accent">Step {i + 1}</span>
                <h3 className="mt-1 font-display text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured hospitals */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Featured Hospitals</h2>
              <p className="mt-1 text-sm text-muted-foreground">Top-rated and verified</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link to="/search">View all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {hospitals.slice(0, 3).map((hospital, i) => (
              <motion.div key={hospital.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to={`/hospital/${hospital.id}`} className="group block rounded-xl bg-background card-shadow overflow-hidden transition-all hover:card-shadow-hover">
                  <div className="relative h-40 overflow-hidden">
                    <img src={hospital.image} alt={hospital.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-card/90 px-2 py-0.5 text-xs font-medium">
                      <Star className="h-3 w-3 text-warning fill-warning" /> {hospital.rating}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-sm font-semibold text-foreground">{hospital.name}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{hospital.location}</p>
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {hospital.specializations.slice(0, 3).map((s) => (
                        <span key={s} className="rounded bg-navy-50 px-1.5 py-0.5 text-[10px] font-medium text-primary">{s}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance partners */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Insurance Partners</h2>
              <p className="mt-1 text-sm text-muted-foreground">Compare plans from trusted insurers</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link to="/insurance">Compare all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {insurancePlans.slice(0, 3).map((plan, i) => (
              <motion.div key={plan.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="rounded-xl bg-card p-5 card-shadow relative">
                {plan.popular && <span className="absolute -top-2 right-3 rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-accent-foreground">Popular</span>}
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{plan.logo}</span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">{plan.provider}</h3>
                    <p className="text-xs text-muted-foreground">{plan.planName}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="font-display text-xl font-bold text-foreground">{plan.coverage}</span>
                  <span className="ml-1 text-xs text-muted-foreground">coverage</span>
                </div>
                <p className="text-sm text-accent font-medium mt-0.5">{plan.premium}</p>
                <ul className="mt-3 space-y-1.5">
                  {plan.benefits.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-accent" /> {b}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link to="/insurance">View Details</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-bold text-foreground">Why MediConnect</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {trustPoints.map((p, i) => (
              <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="rounded-xl border p-5 text-center bg-background">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 font-display text-sm font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-2xl bg-hero-gradient p-10 md:p-14 text-center">
            <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">Ready to Find the Best Care?</h2>
            <p className="mt-2 text-sm text-primary-foreground/70 max-w-md mx-auto">Join thousands of families making smarter healthcare decisions.</p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="default" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link to="/search">Find Hospitals</Link>
              </Button>
              <Button size="default" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/insurance">Compare Insurance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
