import { Layout } from "@/components/Layout";
import { Building2, Users, CalendarCheck, Shield, BarChart3, CheckCircle2, ArrowRight, Zap, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4 } }),
};

const features = [
  { icon: Users, title: "Reach Thousands of Patients", desc: "Get discovered by patients searching for hospitals in your area and specialty." },
  { icon: CalendarCheck, title: "Easy Appointment Management", desc: "Accept, reject, and manage appointments with a powerful admin dashboard." },
  { icon: Shield, title: "Insurance Integration", desc: "Connect with insurance providers and offer cashless services to patients." },
  { icon: BarChart3, title: "Analytics Dashboard", desc: "Track patient flow, appointment trends, and revenue with real-time analytics." },
  { icon: Zap, title: "Custom Booking Forms", desc: "Create your own booking form with custom fields tailored to your hospital's needs." },
  { icon: Star, title: "Build Your Reputation", desc: "Collect reviews and ratings to build trust with potential patients." },
];

const steps = [
  { step: "01", title: "Register Your Hospital", desc: "Fill in your hospital details, upload documents, and submit for verification." },
  { step: "02", title: "Get Verified", desc: "Our team reviews your submission within 48 hours and verifies your hospital." },
  { step: "03", title: "Go Live", desc: "Once approved, your hospital appears on the platform for patients to discover." },
  { step: "04", title: "Manage Everything", desc: "Use your admin dashboard to manage doctors, appointments, and analytics." },
];

export default function ForHospitalsPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero-gradient py-16 md:py-20">
        <div className="container max-w-4xl">
          <div className="text-center">
            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={0} className="text-xs font-semibold text-accent uppercase tracking-wider">For Hospitals</motion.p>
            <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={1} className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mt-3">
              Register Your Hospital
            </motion.h1>
            <motion.p initial="hidden" animate="visible" variants={fadeUp} custom={2} className="mt-4 text-base text-primary-foreground/70 max-w-xl mx-auto">
              Join India's fastest-growing healthcare platform. Get verified, attract more patients, and manage appointments effortlessly.
            </motion.p>
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="mt-8 flex gap-3 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" size="lg" asChild>
                <Link to="/hospital-registration">Register Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Benefits</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-2">Why Join MediConnect?</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="rounded-xl bg-card p-6 card-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 font-display text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-card">
        <div className="container max-w-3xl">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Process</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-2">How It Works</h2>
          </div>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div key={s.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="flex gap-4 items-start">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-sm font-bold">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container">
          <div className="rounded-2xl bg-hero-gradient p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-primary-foreground">Ready to Grow Your Hospital?</h2>
            <p className="mt-2 text-sm text-primary-foreground/70">Registration is free. Get verified and start receiving patients within 48 hours.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" size="lg" asChild>
                <Link to="/hospital-registration">Register Your Hospital</Link>
              </Button>
              <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
