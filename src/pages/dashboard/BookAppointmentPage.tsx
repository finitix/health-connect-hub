import { useState } from "react";
import { Building2, User, CalendarDays, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospitals } from "@/data/mockData";

const timeSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const hospital = hospitals.find((h) => h.id === selectedHospital);
  const availableDoctors = hospital?.doctors.filter((d) => d.available) || [];

  if (step === 5) {
    return (
      <div className="max-w-md mx-auto text-center py-12 animate-fade-up">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 mx-auto mb-4">
          <CheckCircle2 className="h-7 w-7 text-accent" />
        </div>
        <h2 className="font-display text-xl font-bold text-foreground">Appointment Confirmed!</h2>
        <p className="mt-2 text-sm text-muted-foreground">Your appointment has been booked successfully.</p>
        <div className="mt-6 rounded-xl bg-card p-5 card-shadow text-left space-y-2">
          <p className="text-xs text-muted-foreground">Hospital: <span className="text-foreground font-medium">{hospital?.name}</span></p>
          <p className="text-xs text-muted-foreground">Doctor: <span className="text-foreground font-medium">{availableDoctors.find((d) => d.id === selectedDoctor)?.name}</span></p>
          <p className="text-xs text-muted-foreground">Date: <span className="text-foreground font-medium">{selectedDate}</span></p>
          <p className="text-xs text-muted-foreground">Time: <span className="text-foreground font-medium">{selectedTime}</span></p>
        </div>
        <Button className="mt-6" onClick={() => { setStep(1); setSelectedHospital(""); setSelectedDoctor(""); setSelectedDate(""); setSelectedTime(""); }}>Book Another</Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-up">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {["Hospital", "Doctor", "Date", "Confirm"].map((label, i) => (
          <div key={label} className="flex-1">
            <div className={`h-1.5 rounded-full ${i + 1 <= step ? "bg-primary" : "bg-secondary"}`} />
            <p className={`mt-1 text-[10px] ${i + 1 <= step ? "text-primary font-medium" : "text-muted-foreground"}`}>{label}</p>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="font-display text-lg font-bold mb-4">Select Hospital</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {hospitals.map((h) => (
              <button key={h.id} onClick={() => { setSelectedHospital(h.id); setStep(2); }}
                className={`text-left rounded-xl border p-4 transition-all hover:card-shadow-hover ${selectedHospital === h.id ? "border-primary bg-navy-50" : "bg-card"}`}>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary shrink-0" />
                  <h3 className="font-display text-sm font-semibold text-foreground">{h.name}</h3>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{h.location}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-display text-lg font-bold mb-4">Select Doctor</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {availableDoctors.map((d) => (
              <button key={d.id} onClick={() => { setSelectedDoctor(d.id); setStep(3); }}
                className={`text-left rounded-xl border p-4 transition-all hover:card-shadow-hover ${selectedDoctor === d.id ? "border-primary bg-navy-50" : "bg-card"}`}>
                <div className="flex items-center gap-3">
                  <img src={d.image} alt={d.name} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{d.name}</h3>
                    <p className="text-xs text-muted-foreground">{d.specialization} · {d.experience}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-4" onClick={() => setStep(1)}>← Back</Button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="font-display text-lg font-bold mb-4">Select Date & Time</h2>
          <div className="mb-4">
            <label className="text-xs font-medium text-foreground">Date</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 h-10 w-full max-w-xs rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs font-medium text-foreground">Available Slots</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {timeSlots.map((t) => (
                <button key={t} onClick={() => setSelectedTime(t)}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${selectedTime === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setStep(2)}>← Back</Button>
            <Button size="sm" disabled={!selectedDate || !selectedTime} onClick={() => setStep(4)}>Continue</Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="font-display text-lg font-bold mb-4">Confirm Appointment</h2>
          <div className="rounded-xl bg-card p-5 card-shadow space-y-3">
            <div className="flex items-center gap-2 text-sm"><Building2 className="h-4 w-4 text-muted-foreground" /> <span className="font-medium">{hospital?.name}</span></div>
            <div className="flex items-center gap-2 text-sm"><User className="h-4 w-4 text-muted-foreground" /> <span className="font-medium">{availableDoctors.find((d) => d.id === selectedDoctor)?.name}</span></div>
            <div className="flex items-center gap-2 text-sm"><CalendarDays className="h-4 w-4 text-muted-foreground" /> <span className="font-medium">{selectedDate}</span></div>
            <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-muted-foreground" /> <span className="font-medium">{selectedTime}</span></div>
          </div>
          <div className="mt-6 flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => setStep(3)}>← Back</Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setStep(5)}>Confirm Booking</Button>
          </div>
        </div>
      )}
    </div>
  );
}
