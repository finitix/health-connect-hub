import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle2, Upload, MapPin, Phone, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function HospitalRegistrationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Registration Submitted!</h1>
            <p className="mt-2 text-sm text-muted-foreground">Our team will review your hospital details and get back within 48 hours. You'll receive a verification email shortly.</p>
            <Button className="mt-6" asChild><a href="/">Back to Home</a></Button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10 max-w-3xl">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Hospital Registration</span>
            <h1 className="font-display text-2xl font-bold text-foreground mt-2">Register Your Hospital</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join MediConnect and reach thousands of patients</p>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8 max-w-md mx-auto">
            {["Basic Info", "Details", "Documents"].map((label, i) => (
              <div key={label} className="flex-1">
                <div className={`h-1.5 rounded-full transition-colors ${i + 1 <= step ? "bg-primary" : "bg-secondary"}`} />
                <p className={`mt-1 text-[10px] text-center ${i + 1 <= step ? "text-primary font-medium" : "text-muted-foreground"}`}>{label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-card p-6 md:p-8 card-shadow">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-semibold flex items-center gap-2"><Building2 className="h-5 w-5 text-primary" /> Basic Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><label className="text-xs font-medium text-foreground">Hospital Name *</label><input className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Apollo Hospital" /></div>
                  <div><label className="text-xs font-medium text-foreground">Registration Number *</label><input className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. MH/2024/1234" /></div>
                  <div><label className="text-xs font-medium text-foreground">Type *</label><select className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"><option>Multi-Specialty</option><option>Super-Specialty</option><option>General Hospital</option><option>Clinic</option></select></div>
                  <div><label className="text-xs font-medium text-foreground">Bed Count *</label><input type="number" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. 200" /></div>
                </div>
                <Button className="mt-4" onClick={() => setStep(2)}>Continue</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-semibold flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Contact & Location</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><label className="text-xs font-medium text-foreground">Full Address *</label><textarea className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" rows={2} placeholder="Complete hospital address" /></div>
                  <div><label className="text-xs font-medium text-foreground">City *</label><input className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Mumbai" /></div>
                  <div><label className="text-xs font-medium text-foreground">State *</label><input className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Maharashtra" /></div>
                  <div><label className="text-xs font-medium text-foreground">Phone *</label><input className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+91 98765 43210" /></div>
                  <div><label className="text-xs font-medium text-foreground">Email *</label><input type="email" className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="admin@hospital.com" /></div>
                  <div className="sm:col-span-2"><label className="text-xs font-medium text-foreground">Specializations</label><input className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Cardiology, Neurology, Orthopedics" /></div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="ghost" onClick={() => setStep(1)}>← Back</Button>
                  <Button onClick={() => setStep(3)}>Continue</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Documents & Verification</h2>
                <div className="space-y-4">
                  {["Hospital Registration Certificate", "NABH Accreditation (if any)", "Hospital Photos (min 3)"].map((doc) => (
                    <div key={doc} className="rounded-xl border-2 border-dashed p-6 text-center hover:border-primary/30 transition-colors cursor-pointer">
                      <Upload className="h-6 w-6 text-muted-foreground mx-auto" />
                      <p className="mt-2 text-sm font-medium text-foreground">{doc}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">Click to upload or drag & drop</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 mt-4">
                  <input type="checkbox" className="mt-1 rounded border-muted" />
                  <p className="text-xs text-muted-foreground">I certify that the information provided is accurate and I am authorized to register this hospital on MediConnect.</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="ghost" onClick={() => setStep(2)}>← Back</Button>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => setSubmitted(true)}>Submit Registration</Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
