import { useState } from "react";
import { Building2, User, CalendarDays, Clock, CheckCircle2, Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospitals } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

const timeSlots = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: true },
  { time: "10:00 AM", available: false },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: true },
  { time: "2:00 PM", available: true },
  { time: "2:30 PM", available: false },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true },
  { time: "4:00 PM", available: true },
];

const slideVariant = {
  enter: { opacity: 0, x: 30 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");

  const hospital = hospitals.find((h) => h.id === selectedHospital);
  const availableDoctors = hospital?.doctors.filter((d) => d.available) || [];

  if (step === 5) {
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md mx-auto text-center py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Appointment Confirmed!</h2>
        <p className="mt-2 text-sm text-muted-foreground">Your appointment has been booked successfully. You'll receive a confirmation email shortly.</p>
        <div className="mt-6 rounded-xl bg-card p-5 card-shadow text-left space-y-3">
          <div className="flex items-center gap-2 text-sm"><Building2 className="h-4 w-4 text-primary" /> <span className="text-muted-foreground">Hospital:</span> <span className="font-medium text-foreground">{hospital?.name}</span></div>
          <div className="flex items-center gap-2 text-sm"><User className="h-4 w-4 text-primary" /> <span className="text-muted-foreground">Doctor:</span> <span className="font-medium text-foreground">{availableDoctors.find((d) => d.id === selectedDoctor)?.name}</span></div>
          <div className="flex items-center gap-2 text-sm"><CalendarDays className="h-4 w-4 text-primary" /> <span className="text-muted-foreground">Date:</span> <span className="font-medium text-foreground">{selectedDate}</span></div>
          <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /> <span className="text-muted-foreground">Time:</span> <span className="font-medium text-foreground">{selectedTime}</span></div>
        </div>
        <div className="mt-6 flex gap-3 justify-center">
          <Button variant="outline" onClick={() => { setStep(1); setSelectedHospital(""); setSelectedDoctor(""); setSelectedDate(""); setSelectedTime(""); setReason(""); }}>Book Another</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-1 mb-8">
        {["Hospital", "Doctor", "Schedule", "Confirm"].map((label, i) => (
          <div key={label} className="flex-1 flex items-center gap-1">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              i + 1 < step ? "bg-accent text-accent-foreground" : i + 1 === step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            }`}>
              {i + 1 < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:inline ${i + 1 <= step ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
            {i < 3 && <div className={`flex-1 h-0.5 rounded-full mx-1 ${i + 1 < step ? "bg-accent" : "bg-secondary"}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <h2 className="font-display text-lg font-bold mb-1">Select Hospital</h2>
            <p className="text-sm text-muted-foreground mb-4">Choose from our verified hospitals</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {hospitals.map((h) => (
                <button key={h.id} onClick={() => { setSelectedHospital(h.id); setStep(2); }}
                  className={`text-left rounded-xl border p-4 transition-all hover:card-shadow-hover group ${selectedHospital === h.id ? "border-primary bg-primary/5" : "bg-card hover:border-primary/20"}`}>
                  <div className="flex items-start gap-3">
                    <img src={h.image} alt={h.name} className="h-14 w-14 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm font-semibold text-foreground truncate">{h.name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {h.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-0.5 text-xs"><Star className="h-3 w-3 text-warning fill-warning" /> {h.rating}</span>
                        <span className="text-[10px] text-muted-foreground">({h.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <h2 className="font-display text-lg font-bold mb-1">Select Doctor</h2>
            <p className="text-sm text-muted-foreground mb-4">Available doctors at {hospital?.name}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {availableDoctors.map((d) => (
                <button key={d.id} onClick={() => { setSelectedDoctor(d.id); setStep(3); }}
                  className={`text-left rounded-xl border p-4 transition-all hover:card-shadow-hover ${selectedDoctor === d.id ? "border-primary bg-primary/5" : "bg-card hover:border-primary/20"}`}>
                  <div className="flex items-center gap-3">
                    <img src={d.image} alt={d.name} className="h-12 w-12 rounded-full object-cover ring-2 ring-secondary" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{d.name}</h3>
                      <p className="text-xs text-muted-foreground">{d.specialization}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-0.5 text-xs"><Star className="h-3 w-3 text-warning fill-warning" /> {d.rating}</span>
                        <span className="text-[10px] text-muted-foreground">{d.experience}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="mt-4" onClick={() => setStep(1)}>← Back</Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <h2 className="font-display text-lg font-bold mb-1">Select Date & Time</h2>
            <p className="text-sm text-muted-foreground mb-4">Choose your preferred appointment slot</p>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground">Preferred Date</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
                  className="mt-1 h-11 w-full max-w-xs rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Available Slots</label>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {timeSlots.map((t) => (
                    <button key={t.time} disabled={!t.available} onClick={() => setSelectedTime(t.time)}
                      className={`rounded-lg px-2 py-2.5 text-xs font-medium transition-colors ${
                        !t.available ? "bg-secondary/50 text-muted-foreground/40 cursor-not-allowed line-through" :
                        selectedTime === t.time ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                      }`}>
                      {t.time}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-foreground">Reason for Visit (optional)</label>
                <textarea value={reason} onChange={(e) => setReason(e.target.value)}
                  className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" rows={2} placeholder="Describe your symptoms or reason..." />
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setStep(2)}>← Back</Button>
              <Button size="sm" disabled={!selectedDate || !selectedTime} onClick={() => setStep(4)}>Continue</Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" variants={slideVariant} initial="enter" animate="center" exit="exit" transition={{ duration: 0.2 }}>
            <h2 className="font-display text-lg font-bold mb-1">Confirm Appointment</h2>
            <p className="text-sm text-muted-foreground mb-4">Review your booking details</p>
            <div className="rounded-xl bg-card p-6 card-shadow space-y-4">
              <div className="flex items-center gap-3">
                <img src={hospital?.image} alt={hospital?.name} className="h-14 w-14 rounded-lg object-cover" />
                <div>
                  <h3 className="font-display text-sm font-semibold text-foreground">{hospital?.name}</h3>
                  <p className="text-xs text-muted-foreground">{hospital?.location}</p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Doctor:</span>
                  <span className="font-medium">{availableDoctors.find((d) => d.id === selectedDoctor)?.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                {reason && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Reason:</span> <span className="font-medium">{reason}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setStep(3)}>← Back</Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setStep(5)}>Confirm Booking</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
