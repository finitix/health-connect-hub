import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Building2, Shield, CalendarCheck, Star, ArrowRight, CheckCircle2, Users, Clock, Heart, Award, Zap, MessageSquare, Phone, MapPin, ThumbsUp, Stethoscope, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { HeroCarousel } from "@/components/HeroCarousel";

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
  { icon: CheckCircle2, title: "Verified Hospitals", text: "Every hospital is manually verified for quality and compliance" },
  { icon: Shield, title: "Transparent Insurance", text: "Clear comparisons with no hidden fees or surprise charges" },
  { icon: Users, title: "Trusted by Thousands", text: "Join families making smarter health decisions every day" },
  { icon: Clock, title: "Save Time", text: "Everything you need in one streamlined platform" },
];

const testimonials = [
  { name: "Priya Sharma", role: "Patient", text: "MediConnect made finding the right hospital so easy. I compared 5 hospitals in minutes and booked my appointment the same day.", rating: 5 },
  { name: "Rajesh Gupta", role: "Father of 2", text: "The insurance comparison feature saved us thousands. We found a plan that covers our entire family at a fraction of what we were paying.", rating: 5 },
  { name: "Dr. Anita Verma", role: "Cardiologist", text: "As a doctor, I appreciate how MediConnect connects patients with the right specialists. The platform is incredibly well-designed.", rating: 5 },
];

const specialties = [
  { icon: Heart, name: "Cardiology", count: "120+ Doctors" },
  { icon: Stethoscope, name: "General Medicine", count: "200+ Doctors" },
  { icon: Zap, name: "Neurology", count: "85+ Doctors" },
  { icon: Award, name: "Orthopedics", count: "95+ Doctors" },
  { icon: BadgeCheck, name: "Oncology", count: "60+ Doctors" },
  { icon: Users, name: "Pediatrics", count: "150+ Doctors" },
];

export default function HomePage() {
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [stats, setStats] = useState({ hospitals: 0, doctors: 0, plans: 0, appointments: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const [hospRes, planRes, docRes, apptRes] = await Promise.all([
        supabase.from("hospitals").select("*").eq("status", "approved").limit(4),
        supabase.from("insurance_plans").select("*").eq("is_approved", true).limit(3),
        supabase.from("doctors").select("id", { count: "exact", head: true }),
        supabase.from("appointments").select("id", { count: "exact", head: true }),
      ]);
      setHospitals(hospRes.data || []);
      setPlans(planRes.data || []);
      setStats({
        hospitals: hospRes.data?.length || 0,
        doctors: docRes.count || 0,
        plans: planRes.data?.length || 0,
        appointments: apptRes.count || 0,
      });
    };
    fetchData();
  }, []);

  return (
    <Layout>
      {/* Hero - Split Layout */}
      <section className="bg-hero-gradient py-16 md:py-20 overflow-hidden">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" className="max-w-xl">
              <motion.p variants={fadeUp} custom={0} className="text-sm font-medium text-accent uppercase tracking-wider mb-3">Healthcare made simple</motion.p>
              <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-[3.25rem]">
                Find the Right Hospital &amp; Insurance in One Place
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="mt-4 text-base text-primary-foreground/70 max-w-lg">
                Compare top-rated hospitals, explore insurance plans, and book appointments — all in a few clicks.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="mt-8 flex flex-col gap-3 sm:flex-row max-w-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Condition, hospital, or city..." className="h-12 w-full rounded-xl border-0 bg-card pl-10 pr-4 text-sm text-foreground shadow-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <Button className="h-12 px-6 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl" asChild>
                  <Link to="/search">Search</Link>
                </Button>
              </motion.div>
              <motion.div variants={fadeUp} custom={4} className="mt-6 flex items-center gap-6 text-xs text-primary-foreground/50">
                <span className="flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {stats.hospitals}+ Hospitals</span>
                <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" /> {stats.plans}+ Insurers</span>
                <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {stats.appointments}+ Booked</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
              className="hidden lg:block h-[420px]">
              <HeroCarousel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-0 -mt-8 relative z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-2xl bg-card p-6 card-shadow">
            {[
              { value: `${stats.hospitals}+`, label: "Verified Hospitals" },
              { value: `${stats.doctors}+`, label: "Expert Doctors" },
              { value: `${stats.plans}+`, label: "Insurance Plans" },
              { value: `${stats.appointments}+`, label: "Appointments Booked" },
            ].map((s, i) => (
              <motion.div key={s.label} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 mt-4">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Simple Process</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-2">How It Works</h2>
            <p className="mt-1 text-sm text-muted-foreground">Three steps to better healthcare</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="relative text-center p-6 rounded-xl bg-card card-shadow group hover:card-shadow-hover transition-shadow">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{i + 1}</div>
                <div className="mx-auto mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 group-hover:bg-accent/10 transition-colors">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 font-display text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Specialty */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Specializations</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-2">Browse by Specialty</h2>
            <p className="mt-1 text-sm text-muted-foreground">Find experts across major medical fields</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {specialties.map((s, i) => (
              <motion.div key={s.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                <Link to="/search" className="group block text-center p-5 rounded-xl bg-background border hover:border-accent/30 hover:card-shadow-hover transition-all">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5 group-hover:bg-accent/10 transition-colors">
                    <s.icon className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                  </div>
                  <h3 className="mt-2.5 font-display text-xs font-semibold text-foreground">{s.name}</h3>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.count}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured hospitals - real data */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Top Rated</span>
              <h2 className="font-display text-2xl font-bold text-foreground mt-1">Featured Hospitals</h2>
              <p className="mt-1 text-sm text-muted-foreground">Verified and trusted by thousands</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link to="/search">View all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          {hospitals.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">No approved hospitals yet. Be the first to <Link to="/hospital-registration" className="text-accent underline">register</Link>!</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {hospitals.map((hospital, i) => (
                <motion.div key={hospital.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                  <Link to={`/hospital/${hospital.id}`} className="group block rounded-xl bg-card card-shadow overflow-hidden transition-all hover:card-shadow-hover">
                    <div className="relative h-40 overflow-hidden">
                      <img src={hospital.image_url || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop"} alt={hospital.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-card/90 backdrop-blur-sm px-2 py-0.5 text-xs font-medium">
                        <Star className="h-3 w-3 text-warning fill-warning" /> {hospital.rating || 0}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold text-foreground">{hospital.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{hospital.city}, {hospital.state}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {(hospital.specializations || []).slice(0, 3).map((s: string) => (
                          <span key={s} className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">{s}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Insurance partners - real data */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">Insurance</span>
              <h2 className="font-display text-2xl font-bold text-foreground mt-1">Insurance Partners</h2>
              <p className="mt-1 text-sm text-muted-foreground">Compare plans from trusted insurers</p>
            </div>
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link to="/insurance">Compare all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          {plans.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">No approved insurance plans yet.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, i) => (
                <motion.div key={plan.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className="rounded-xl bg-background p-5 card-shadow relative border hover:card-shadow-hover transition-shadow">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🏥</span>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-foreground">{plan.provider_name}</h3>
                      <p className="text-xs text-muted-foreground">{plan.name}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="font-display text-xl font-bold text-foreground">₹{(plan.coverage_amount || 0).toLocaleString()}</span>
                    <span className="ml-1 text-xs text-muted-foreground">coverage</span>
                  </div>
                  <p className="text-sm text-accent font-medium mt-0.5">₹{(plan.premium_yearly || 0).toLocaleString()}/year</p>
                  <ul className="mt-3 space-y-1.5">
                    {(plan.features || []).slice(0, 3).map((b: string) => (
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
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Testimonials</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-2">What Our Users Say</h2>
            <p className="mt-1 text-sm text-muted-foreground">Real stories from real people</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="rounded-xl bg-card p-6 card-shadow relative">
                <MessageSquare className="absolute top-4 right-4 h-5 w-5 text-muted/30" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{t.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Why Us</span>
            <h2 className="font-display text-2xl font-bold text-foreground mt-2">Why MediConnect</h2>
            <p className="mt-1 text-sm text-muted-foreground">Built with your health in mind</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {trustPoints.map((p, i) => (
              <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                className="rounded-xl border p-5 text-center bg-background hover:card-shadow-hover transition-shadow">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-primary/5">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-3 font-display text-sm font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Registration CTA */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">For Hospitals</span>
              <h2 className="font-display text-2xl font-bold text-foreground mt-2">Register Your Hospital</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Join India's fastest-growing healthcare platform. Get verified, attract more patients, and manage appointments effortlessly.
              </p>
              <ul className="mt-4 space-y-2">
                {["Reach thousands of patients", "Easy appointment management", "Insurance integration", "Analytics dashboard"].map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" /> {b}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <Link to="/hospital-registration">Register Now <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="rounded-2xl bg-card p-8 card-shadow border">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-secondary p-4 text-center">
                  <Building2 className="h-6 w-6 text-primary mx-auto" />
                  <p className="mt-2 font-display text-lg font-bold text-foreground">{stats.hospitals}+</p>
                  <p className="text-[10px] text-muted-foreground">Hospitals Registered</p>
                </div>
                <div className="rounded-xl bg-secondary p-4 text-center">
                  <Users className="h-6 w-6 text-primary mx-auto" />
                  <p className="mt-2 font-display text-lg font-bold text-foreground">{stats.appointments}+</p>
                  <p className="text-[10px] text-muted-foreground">Patients Connected</p>
                </div>
                <div className="rounded-xl bg-secondary p-4 text-center">
                  <ThumbsUp className="h-6 w-6 text-primary mx-auto" />
                  <p className="mt-2 font-display text-lg font-bold text-foreground">4.8</p>
                  <p className="text-[10px] text-muted-foreground">Average Rating</p>
                </div>
                <div className="rounded-xl bg-secondary p-4 text-center">
                  <Phone className="h-6 w-6 text-primary mx-auto" />
                  <p className="mt-2 font-display text-lg font-bold text-foreground">24/7</p>
                  <p className="text-[10px] text-muted-foreground">Support</p>
                </div>
              </div>
            </div>
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
