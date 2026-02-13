import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Phone, Mail, Clock, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { hospitals } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function HospitalDetailsPage() {
  const { id } = useParams();
  const hospital = hospitals.find((h) => h.id === id);

  if (!hospital) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Hospital Not Found</h1>
          <Button className="mt-4" asChild><Link to="/search">Back to Search</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={hospital.image} alt={hospital.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 container">
          <Link to="/search" className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground mb-3">
            <ArrowLeft className="h-4 w-4" /> Back to search
          </Link>
          <h1 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">{hospital.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-primary-foreground/80">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {hospital.location}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 text-accent fill-accent" /> {hospital.rating} ({hospital.reviewCount} reviews)</span>
            {hospital.distance && <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {hospital.distance} away</span>}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="font-display text-xl font-bold text-foreground">About</h2>
                <p className="mt-2 text-muted-foreground leading-relaxed">{hospital.description}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="font-display text-xl font-bold text-foreground">Departments</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {hospital.departments.map((d) => (
                    <Badge key={d} variant="secondary" className="rounded-lg">{d}</Badge>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <h2 className="font-display text-xl font-bold text-foreground">Our Doctors</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {hospital.doctors.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-4 rounded-xl bg-card p-4 card-shadow">
                      <img src={doc.image} alt={doc.name} className="h-14 w-14 rounded-full object-cover" />
                      <div className="flex-1">
                        <h4 className="font-display font-semibold text-foreground text-sm">{doc.name}</h4>
                        <p className="text-xs text-muted-foreground">{doc.specialization} · {doc.experience}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="flex items-center gap-0.5 text-xs">
                            <Star className="h-3 w-3 text-accent fill-accent" /> {doc.rating}
                          </span>
                          <span className={`text-xs font-medium ${doc.available ? "text-primary" : "text-destructive"}`}>
                            {doc.available ? "Available" : "Unavailable"}
                          </span>
                        </div>
                      </div>
                      {doc.available && (
                        <Button size="sm" variant="outline" className="shrink-0">Book</Button>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="font-display text-xl font-bold text-foreground">Accepted Insurance</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {hospital.acceptedInsurance.map((ins) => (
                    <span key={ins} className="flex items-center gap-1.5 rounded-lg bg-teal-50 px-3 py-1.5 text-sm font-medium text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5" /> {ins}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-20 space-y-4">
                <div className="rounded-2xl bg-card p-6 card-shadow">
                  <h3 className="font-display font-semibold text-foreground">Book an Appointment</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Select a doctor and time slot</p>
                  <Button className="mt-4 w-full">Book Now</Button>
                </div>
                <div className="rounded-2xl bg-card p-6 card-shadow space-y-3">
                  <h3 className="font-display font-semibold text-foreground">Contact</h3>
                  <a href={`tel:${hospital.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <Phone className="h-4 w-4" /> {hospital.phone}
                  </a>
                  <a href={`mailto:${hospital.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <Mail className="h-4 w-4" /> {hospital.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
