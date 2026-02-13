import { Link } from "react-router-dom";
import { Search, Building2, Shield, CalendarCheck, Star, ArrowRight, CheckCircle2, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { hospitals, insurancePlans } from "@/data/mockData";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const steps = [
  { icon: Search, title: "Choose Your Problem", description: "Search by health condition, location, or hospital name" },
  { icon: Building2, title: "Compare Hospitals & Insurance", description: "View ratings, specializations, and accepted insurance plans" },
  { icon: CalendarCheck, title: "Book Appointment", description: "Select a doctor, pick a time, and confirm — done!" },
];

const trustPoints = [
  { icon: CheckCircle2, title: "Verified Hospitals", text: "Every hospital is manually verified for quality standards" },
  { icon: Shield, title: "Insurance Transparency", text: "Clear comparisons — no hidden costs, no commissions" },
  { icon: Users, title: "Trusted by Thousands", text: "Join thousands of families making informed health decisions" },
  { icon: Clock, title: "Save Time", text: "No more calling around — find everything in one place" },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="container relative z-10 py-24 md:py-36">
          <motion.div
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-2xl text-center"
          >
            <motion.h1
              variants={fadeUp}
              custom={0}
              className="font-display text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-5xl lg:text-6xl"
            >
              Find the Right Hospital & Insurance in{" "}
              <span className="text-accent">One Place</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="mt-5 text-lg text-primary-foreground/80"
            >
              Compare top-rated hospitals, explore insurance plans, and book appointments — all in a few clicks.
            </motion.p>

            {/* Search bar */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by condition, hospital, or location..."
                  className="h-12 w-full rounded-xl border-0 bg-card pl-12 pr-4 text-sm text-foreground shadow-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <Button size="lg" className="h-12 rounded-xl px-8" asChild>
                <Link to="/search">Search</Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} custom={3} className="mt-6 flex items-center justify-center gap-6 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 text-accent" /> 500+ Hospitals</span>
              <span className="flex items-center gap-1"><Shield className="h-4 w-4 text-accent" /> 20+ Insurers</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 bg-secondary/50">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-2 text-muted-foreground">Three simple steps to better healthcare</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="relative rounded-2xl bg-card p-8 card-shadow text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="absolute -top-3 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured hospitals */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Featured Hospitals</h2>
              <p className="mt-2 text-muted-foreground">Top-rated hospitals trusted by thousands</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link to="/search">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hospitals.slice(0, 3).map((hospital, i) => (
              <motion.div
                key={hospital.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <Link
                  to={`/hospital/${hospital.id}`}
                  className="group block rounded-2xl bg-card card-shadow overflow-hidden transition-all hover:card-shadow-hover"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={hospital.image} alt={hospital.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-card/90 px-2.5 py-1 text-sm font-medium">
                      <Star className="h-3.5 w-3.5 text-accent fill-accent" /> {hospital.rating}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-foreground">{hospital.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{hospital.location}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {hospital.specializations.slice(0, 3).map((s) => (
                        <span key={s} className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-primary">{s}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link to="/search">View all hospitals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured insurance */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Insurance Partners</h2>
              <p className="mt-2 text-muted-foreground">Compare plans from trusted insurers</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link to="/insurance">Compare all <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {insurancePlans.slice(0, 3).map((plan, i) => (
              <motion.div
                key={plan.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl bg-card p-6 card-shadow relative"
              >
                {plan.popular && (
                  <span className="absolute -top-2 right-4 rounded-full bg-accent px-3 py-0.5 text-xs font-bold text-accent-foreground">Popular</span>
                )}
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{plan.logo}</span>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{plan.provider}</h3>
                    <p className="text-sm text-muted-foreground">{plan.planName}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-2xl font-bold text-foreground">{plan.coverage}</span>
                  <span className="text-sm text-muted-foreground">coverage</span>
                </div>
                <p className="text-sm text-primary font-medium mt-1">{plan.premium}</p>
                <ul className="mt-4 space-y-2">
                  {plan.benefits.slice(0, 3).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-5 w-full" asChild>
                  <Link to="/insurance">View Details</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-foreground">Why Choose MediConnect</h2>
            <p className="mt-2 text-muted-foreground">Built on trust, designed for simplicity</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="rounded-2xl border bg-card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <point.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-display font-semibold text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="rounded-3xl bg-hero-gradient p-10 md:p-16 text-center">
            <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">Ready to Find the Best Care?</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-md mx-auto">Join thousands of families who trust MediConnect for smarter healthcare decisions.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" variant="secondary" className="rounded-xl" asChild>
                <Link to="/search">Find Hospitals</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/insurance">Compare Insurance</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
