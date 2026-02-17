import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Star, MapPin, Phone, Mail, Clock, CheckCircle2, ArrowLeft, Globe, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function HospitalDetailsPage() {
  const { id } = useParams();
  const [hospital, setHospital] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [insurancePlans, setInsurancePlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const [hospRes, docRes, insRes] = await Promise.all([
        supabase.from("hospitals").select("*").eq("id", id).eq("status", "approved").single(),
        supabase.from("doctors").select("*").eq("hospital_id", id).eq("is_active", true),
        supabase.from("hospital_insurance").select("insurance_plan_id, insurance_plans(*)").eq("hospital_id", id),
      ]);
      setHospital(hospRes.data);
      setDoctors(docRes.data || []);
      setInsurancePlans((insRes.data || []).map((r: any) => r.insurance_plans).filter(Boolean));
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container py-20 space-y-4">
          <Skeleton className="h-56 w-full rounded-xl" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
      </Layout>
    );
  }

  if (!hospital) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-xl font-bold">Hospital Not Found</h1>
          <p className="text-sm text-muted-foreground mt-2">This hospital may not be approved yet or doesn't exist.</p>
          <Button className="mt-4" asChild><Link to="/search">Back to Search</Link></Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative h-56 md:h-72 overflow-hidden">
        <img src={hospital.image_url || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&h=400&fit=crop"} alt={hospital.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-foreground/20" />
        <div className="absolute bottom-0 left-0 right-0 p-5 container">
          <Link to="/search" className="inline-flex items-center gap-1 text-xs text-primary-foreground/70 hover:text-primary-foreground mb-2"><ArrowLeft className="h-3 w-3" /> Back</Link>
          <h1 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">{hospital.name}</h1>
          <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-primary-foreground/70">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {hospital.city}, {hospital.state}</span>
            <span className="flex items-center gap-1"><Star className="h-3 w-3 text-warning fill-warning" /> {hospital.rating || 0} ({hospital.review_count || 0})</span>
            <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {hospital.hospital_type}</span>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="font-display text-lg font-bold text-foreground">About</h2>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{hospital.description || "No description available."}</p>
              <p className="mt-2 text-xs text-muted-foreground">{hospital.address}, {hospital.city}, {hospital.district && `${hospital.district}, `}{hospital.state} {hospital.pincode}</p>
            </motion.div>

            {(hospital.specializations || []).length > 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
                <h2 className="font-display text-lg font-bold text-foreground">Specializations</h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {hospital.specializations.map((d: string) => <Badge key={d} variant="secondary" className="text-xs">{d}</Badge>)}
                </div>
              </motion.div>
            )}

            {(hospital.amenities || []).length > 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="font-display text-lg font-bold text-foreground">Amenities</h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {hospital.amenities.map((a: string) => (
                    <span key={a} className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                      <CheckCircle2 className="h-3 w-3 text-accent" /> {a}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              <h2 className="font-display text-lg font-bold text-foreground">Doctors ({doctors.length})</h2>
              {doctors.length === 0 ? (
                <p className="text-sm text-muted-foreground mt-2">No doctors listed yet.</p>
              ) : (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {doctors.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-3 rounded-lg bg-card p-3 card-shadow">
                      <img src={doc.image_url || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"} alt={doc.name} className="h-11 w-11 rounded-full object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display text-sm font-semibold text-foreground truncate">{doc.name}</h4>
                        <p className="text-[11px] text-muted-foreground">{doc.specialization} · {doc.experience_years || 0} yrs</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {doc.consultation_fee && <span className="text-[11px] text-accent font-medium">₹{doc.consultation_fee}</span>}
                          <span className={`text-[11px] font-medium ${doc.is_active ? "text-emerald-600" : "text-destructive"}`}>{doc.is_active ? "Available" : "Unavailable"}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="shrink-0 text-xs h-7" asChild>
                        <Link to={`/dashboard/book?hospital=${hospital.id}&doctor=${doc.id}`}>Book</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {insurancePlans.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
                <h2 className="font-display text-lg font-bold text-foreground">Accepted Insurance</h2>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {insurancePlans.map((ins) => (
                    <span key={ins.id} className="flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-accent">
                      <CheckCircle2 className="h-3 w-3" /> {ins.provider_name} - {ins.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div>
            <div className="sticky top-20 space-y-4">
              <div className="rounded-xl bg-card p-5 card-shadow">
                <h3 className="font-display text-sm font-semibold">Book Appointment</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">Select a doctor and time</p>
                <Button className="mt-3 w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="sm" asChild>
                  <Link to={`/dashboard/book?hospital=${hospital.id}`}>Book Now</Link>
                </Button>
              </div>
              <div className="rounded-xl bg-card p-5 card-shadow space-y-2">
                <h3 className="font-display text-sm font-semibold">Contact</h3>
                <a href={`tel:${hospital.phone}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"><Phone className="h-3.5 w-3.5" /> {hospital.phone}</a>
                <a href={`mailto:${hospital.email}`} className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"><Mail className="h-3.5 w-3.5" /> {hospital.email}</a>
                {hospital.website && <a href={hospital.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary"><Globe className="h-3.5 w-3.5" /> Website</a>}
              </div>
              {hospital.bed_count > 0 && (
                <div className="rounded-xl bg-card p-5 card-shadow">
                  <h3 className="font-display text-sm font-semibold">Facilities</h3>
                  <p className="text-xs text-muted-foreground mt-1">{hospital.bed_count} beds available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
