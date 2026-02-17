import { Layout } from "@/components/Layout";
import { Heart, Shield, Users, Building2, Target, Award, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const values = [
  { icon: Heart, title: "Patient First", desc: "Every feature is designed keeping patients at the center of healthcare decisions." },
  { icon: Shield, title: "Trust & Transparency", desc: "Verified hospitals, honest insurance comparisons, and no hidden costs." },
  { icon: Zap, title: "Simplicity", desc: "Complex healthcare decisions made simple through intuitive technology." },
  { icon: Globe, title: "Accessibility", desc: "Making quality healthcare information accessible to everyone across India." },
];

const team = [
  { name: "Healthcare Experts", count: "15+", desc: "Medical professionals guiding our platform" },
  { name: "Tech Engineers", count: "30+", desc: "Building the future of healthcare" },
  { name: "Cities Covered", count: "50+", desc: "Across India and growing" },
  { name: "Happy Users", count: "50K+", desc: "And counting every day" },
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient py-16 md:py-20">
        <div className="container text-center max-w-3xl">
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={0} className="text-xs font-semibold text-accent uppercase tracking-wider">About MediConnect</motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-3">
            Transforming How India Accesses Healthcare
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mt-4 text-base text-primary-foreground/70 max-w-xl mx-auto">
            MediConnect is India's fastest-growing healthcare platform, connecting patients with verified hospitals, transparent insurance plans, and seamless appointment booking.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Our Mission</span>
              <h2 className="font-display text-2xl font-bold text-foreground mt-2">Healthcare Should Be Simple, Not Stressful</h2>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                We believe that every Indian deserves easy access to quality healthcare information. MediConnect bridges the gap between patients and healthcare providers by offering a unified platform where you can compare hospitals, explore insurance plans, and book appointments — all without the confusion and hassle.
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Our platform verifies every hospital listing, ensures transparent insurance comparisons, and provides real-time appointment booking — so you can focus on what matters most: your health.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {team.map((t, i) => (
                <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="rounded-xl bg-card p-5 card-shadow text-center">
                  <p className="font-display text-2xl font-bold text-primary">{t.count}</p>
                  <p className="text-xs font-semibold text-foreground mt-1">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Our Values</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-2">What Drives Us</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {values.map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="rounded-xl border p-6 bg-background text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 font-display text-sm font-semibold text-foreground">{v.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Platform</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-2">What MediConnect Offers</h2>
          </div>
          <div className="space-y-6">
            {[
              { icon: Building2, title: "For Patients", items: ["Search and compare 500+ verified hospitals", "Book appointments with top doctors in real-time", "View ratings, reviews, and specializations", "Access your appointment history anytime"] },
              { icon: Award, title: "For Hospitals", items: ["Register and get verified on the platform", "Manage doctors, appointments, and patient flow", "Create custom booking forms for your hospital", "Access analytics and performance dashboards"] },
              { icon: Shield, title: "For Insurance", items: ["Compare plans from 20+ trusted insurers", "Transparent premiums, coverage, and benefits", "Find cashless hospital networks", "IRDAI-compliant information and disclaimers"] },
            ].map((section, i) => (
              <motion.div key={section.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="rounded-xl bg-card p-6 card-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">{section.title}</h3>
                </div>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Target className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-hero-gradient">
        <div className="container text-center max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-primary-foreground">Ready to Get Started?</h2>
          <p className="mt-2 text-sm text-primary-foreground/70">Join thousands of users making smarter healthcare decisions every day.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <Link to="/signup">Create Account</Link>
            </Button>
            <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/hospital-registration">Register Hospital</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
