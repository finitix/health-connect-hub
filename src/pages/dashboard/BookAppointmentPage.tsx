import { useState, useEffect } from "react";
import { Building2, User, CalendarDays, Clock, CheckCircle2, Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Hospital { id: string; name: string; city: string; state: string; hospital_type: string; rating: number; image_url: string | null; specializations: string[]; }
interface Doctor { id: string; name: string; specialization: string; experience_years: number; consultation_fee: number; is_active: boolean; image_url: string | null; }

const slideVariant = { enter: { opacity: 0, x: 30 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 } };

export default function BookAppointmentPage() {
  const { user, profile } = useAuth();
  const [step, setStep] = useState(1);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");

  useEffect(() => {
    supabase.from("hospitals").select("id, name, city, state, hospital_type, rating, image_url, specializations")
      .eq("status", "approved").order("rating", { ascending: false })
      .then(({ data }) => { setHospitals(data || []); setLoading(false); });
  }, []);

  useEffect(() => {
    if (profile) {
      setPatientName(profile.full_name || "");
      setPatientPhone(profile.phone || "");
    }
  }, [profile]);

  useEffect(() => {
    if (selectedHospital) {
      supabase.from("doctors").select("id, name, specialization, experience_years, consultation_fee, is_active, image_url")
        .eq("hospital_id", selectedHospital).eq("is_active", true).order("name")
        .then(({ data }) => setDoctors(data || []));
    }
  }, [selectedHospital]);

  const hospital = hospitals.find(h => h.id === selectedHospital);
  const doctor = doctors.find(d => d.id === selectedDoctor);

  const handleConfirm = async () => {
    if (!user) { toast.error("Please login first"); return; }
    if (!patientName) { toast.error("Patient name required"); return; }
    setSubmitting(true);
    const { error } = await supabase.from("appointments").insert({
      user_id: user.id,
      hospital_id: selectedHospital,
      doctor_id: selectedDoctor || null,
      appointment_date: selectedDate,
      appointment_time: selectedTime || null,
      patient_name: patientName,
      patient_phone: patientPhone || null,
      symptoms: symptoms || null,
      status: "pending",
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Appointment booked!");
    setStep(5);
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;

  if (step === 5) {
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md mx-auto text-center py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Appointment Booked!</h2>
        <p className="mt-2 text-sm text-muted-foreground">Your appointment is pending confirmation from the hospital. You'll be notified once confirmed.</p>
        <div className="mt-6 rounded-xl bg-card p-5 card-shadow text-left space-y-3">
          <div className="flex items-center gap-2 text-sm"><Building2 className="h-4 w-4 text-primary" /> <span className="text-muted-foreground">Hospital:</span> <span className="font-medium text-foreground">{hospital?.name}</span></div>
          {doctor && <div className="flex items-center gap-2 text-sm"><User className="h-4 w-4 text-primary" /> <span className="text-muted-foreground">Doctor:</span> <span className="font-medium text-foreground">{doctor.name}</span></div>}
          <div className="flex items-center gap-2 text-sm"><CalendarDays className="h-4 w-4 text-primary" /> <span className="text-muted-foreground">Date:</span> <span className="font-medium text-foreground">{selectedDate}</span></div>
          {selectedTime && <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /> <span className="text-muted-foreground">Preferred Time:</span> <span className="font-medium text-foreground">{selectedTime}</span></div>}
        </div>
        <Button variant="outline" className="mt-6" onClick={() => { setStep(1); setSelectedHospital(""); setSelectedDoctor(""); setSelectedDate(""); setSelectedTime(""); setSymptoms(""); }}>Book Another</Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-1 mb-8">
        {["Hospital", "Doctor", "Schedule", "Confirm"].map((label, i) => (
          <div key={label} className="flex-1 flex items-center gap-1">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              i + 1 < step ? "bg-accent text-accent-foreground" : i + 1 === step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}>{i + 1 < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}</div>
            <span className={`text-xs font-medium hidden sm:inline ${i + 1 <= step ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
            {i < 3 && <div className={`flex-1 h-0.5 rounded-full mx-1 ${i + 1 < step ? "bg-accent" : "bg-secondary"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <h2 className="font-display text-lg font-bold mb-1">Select Hospital</h2>
            <p className="text-sm text-muted-foreground mb-4">Choose from verified hospitals</p>
            {hospitals.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground"><Building2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground/30" /><p>No approved hospitals available yet</p></div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {hospitals.map((h) => (
                  <button key={h.id} onClick={() => { setSelectedHospital(h.id); setSelectedDoctor(""); setStep(2); }}
                    className="text-left rounded-xl border p-4 transition-all hover:card-shadow-hover group bg-card hover:border-primary/20">
                    <div className="flex items-start gap-3">
                      <div className="h-14 w-14 rounded-lg bg-secondary shrink-0 overflow-hidden flex items-center justify-center">
                        {h.image_url ? <img src={h.image_url} alt={h.name} className="h-full w-full object-cover" /> : <Building2 className="h-5 w-5 text-muted-foreground/30" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-sm font-semibold text-foreground truncate">{h.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {h.city}, {h.state}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center gap-0.5 text-xs"><Star className="h-3 w-3 text-warning fill-warning" /> {Number(h.rating).toFixed(1)}</span>
                          <span className="text-[10px] text-muted-foreground">{h.hospital_type}</span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <h2 className="font-display text-lg font-bold mb-1">Select Doctor</h2>
            <p className="text-sm text-muted-foreground mb-4">Available doctors at {hospital?.name}</p>
            {doctors.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <p className="text-sm">No doctors available at this hospital yet</p>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSelectedDoctor(""); setStep(3); }}>Skip — Book without doctor</Button>
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {doctors.map((d) => (
                  <button key={d.id} onClick={() => { setSelectedDoctor(d.id); setStep(3); }}
                    className="text-left rounded-xl border p-4 transition-all hover:card-shadow-hover bg-card hover:border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                        {d.image_url ? <img src={d.image_url} alt={d.name} className="h-full w-full object-cover" /> : <User className="h-5 w-5 text-muted-foreground/30" />}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{d.name}</h3>
                        <p className="text-xs text-muted-foreground">{d.specialization}</p>
                        <p className="text-[10px] text-muted-foreground">{d.experience_years} yrs · ₹{d.consultation_fee}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            <Button variant="ghost" size="sm" className="mt-4" onClick={() => setStep(1)}>← Back</Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <h2 className="font-display text-lg font-bold mb-1">Appointment Details</h2>
            <p className="text-sm text-muted-foreground mb-4">Fill in your details</p>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="text-xs font-medium text-foreground">Patient Name *</label><input value={patientName} onChange={e => setPatientName(e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
                <div><label className="text-xs font-medium text-foreground">Phone</label><input value={patientPhone} onChange={e => setPatientPhone(e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              </div>
              <div><label className="text-xs font-medium text-foreground">Preferred Date *</label><input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="mt-1 h-10 w-full max-w-xs rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <div><label className="text-xs font-medium text-foreground">Preferred Time (optional)</label><input type="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} className="mt-1 h-10 w-full max-w-xs rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
              <div><label className="text-xs font-medium text-foreground">Symptoms / Reason</label><textarea value={symptoms} onChange={e => setSymptoms(e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" rows={2} placeholder="Describe your symptoms..." /></div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setStep(2)}>← Back</Button>
              <Button size="sm" disabled={!selectedDate || !patientName} onClick={() => setStep(4)}>Continue</Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="s4" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <h2 className="font-display text-lg font-bold mb-1">Confirm Appointment</h2>
            <p className="text-sm text-muted-foreground mb-4">Review your booking details</p>
            <div className="rounded-xl bg-card p-6 card-shadow space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                  {hospital?.image_url ? <img src={hospital.image_url} alt="" className="h-full w-full object-cover" /> : <Building2 className="h-5 w-5 text-muted-foreground/30" />}
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">{hospital?.name}</h3>
                  <p className="text-xs text-muted-foreground">{hospital?.city}, {hospital?.state}</p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm"><User className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Patient:</span><span className="font-medium">{patientName}</span></div>
                {doctor && <div className="flex items-center gap-3 text-sm"><User className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Doctor:</span><span className="font-medium">{doctor.name} ({doctor.specialization})</span></div>}
                <div className="flex items-center gap-3 text-sm"><CalendarDays className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Date:</span><span className="font-medium">{selectedDate}</span></div>
                {selectedTime && <div className="flex items-center gap-3 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /><span className="text-muted-foreground">Time:</span><span className="font-medium">{selectedTime}</span></div>}
                {symptoms && <div className="text-sm"><span className="text-muted-foreground">Symptoms:</span> <span className="font-medium">{symptoms}</span></div>}
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setStep(3)}>← Back</Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleConfirm} disabled={submitting}>
                {submitting ? "Booking..." : "Confirm Booking"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
