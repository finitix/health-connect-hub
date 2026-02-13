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
    return <Layout><div className="container py-20 text-center"><h1 className="font-display text-xl font-bold">Hospital Not Found</h1><Button className="mt-4" asChild><Link to="/search">Back to Search</Link></Button></div></Layout>;
  }

  return (
    <Layout>
      <section className="relative h-56 md:h-72 overflow-hidden">
        <img src={hospital.image} alt={hospital.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-foreground/20" />
        <div className="absolute bottom-0 left-0 right-0 p-5 container">
          <Link to="/search" className="inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground mb-2"><ArrowLeft className="h-3 w-3" /> Back</Link>
          <h1 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">{hospital.name}</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-primary-foreground/70">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {hospital.location}</span>
            <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning fill-warning" /> {hospital.rating} ({hospital.reviewCount})</span>
            {hospital.distance && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {hospital.distance}</span>}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="font-display text-lg font-bold text-foreground">About</h2>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{hospital.description}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              <h2 className="font-display text-lg font-bold text-foreground">Departments</h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {hospital.departments.map((d) => <Badge key={d} variant="secondary" className="text-xs">{d}</Badge>)}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              <h2 className="font-display text-lg font-bold text-foreground">Doctors</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {hospital.doctors.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 rounded-lg bg-card p-3 card-shadow">
                    <img src={doc.image} alt={doc.name} className="h-11 w-11 rounded-full object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-semibold text-foreground truncate">{doc.name}</h4>
                      <p className="text-[11px] text-muted-foreground">{doc.specialization} · {doc.experience}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-0.5 text-[11px]"><Star className="h-2.5 w-2.5 text-warning fill-warning" /> {doc.rating}</span>
                        <span className={`text-[11px] font-medium ${doc.available ? "text-success" : "text-destructive"}`}>{doc.available ? "Available" : "Unavailable"}</span>
                      </div>
                    </div>
                    {doc.available && <Button size="sm" variant="outline" className="shrink-0 text-xs h-7">Book</Button>}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
              <h2 className="font-display text-lg font-bold text-foreground">Accepted Insurance</h2>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {hospital.acceptedInsurance.map((ins) => (
                  <span key={ins} className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-accent"><CheckCircle2 className="h-3 w-3" /> {ins}</span>
                ))}
              </div>
            </motion.div>
          </div>
          <div>
            <div className="sticky top-20 space-y-4">
              <div className="rounded-xl bg-card p-5 card-shadow">
                <h3 className="font-display text-sm font-semibold">Book Appointment</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">Select a doctor and time</p>
                <Button className="mt-3 w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="sm">Book Now</Button>
              </div>
              <div className="rounded-xl bg-card p-5 card-shadow space-y-2">
                <h3 className="font-display text-sm font-semibold">Contact</h3>
                <a href={`tel:${hospital.phone}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"><Phone className="h-3.5 w-3.5" /> {hospital.phone}</a>
                <a href={`mailto:${hospital.email}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"><Mail className="h-3.5 w-3.5" /> {hospital.email}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
