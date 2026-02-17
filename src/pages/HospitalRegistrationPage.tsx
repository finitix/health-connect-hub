import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle2, Upload, MapPin, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const indianStates = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi"];

export default function HospitalRegistrationPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", registration_number: "", hospital_type: "Multi-Specialty", bed_count: "",
    address: "", city: "", state: "", district: "", pincode: "", phone: "", email: "", website: "",
    description: "", specializations: "",
  });

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!user) { toast.error("Please login first"); navigate("/login"); return; }
    setLoading(true);
    const { error } = await supabase.from("hospitals").insert({
      name: form.name,
      registration_number: form.registration_number,
      hospital_type: form.hospital_type,
      bed_count: parseInt(form.bed_count) || 0,
      address: form.address,
      city: form.city,
      state: form.state,
      district: form.district,
      pincode: form.pincode,
      phone: form.phone,
      email: form.email,
      website: form.website,
      description: form.description,
      specializations: form.specializations.split(",").map(s => s.trim()).filter(Boolean),
      registered_by: user.id,
      status: "pending",
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-md">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Registration Submitted!</h1>
            <p className="mt-2 text-sm text-muted-foreground">Our team will review your hospital details and get back within 48 hours. You'll be notified once approved.</p>
            <Button className="mt-6" asChild><Link to="/">Back to Home</Link></Button>
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
            {!user && (
              <p className="mt-2 text-sm text-muted-foreground">
                Don't have a hospital account? <Link to="/hospital-signup" className="text-primary font-medium underline">Create one first</Link>
              </p>
            )}
          </div>

          {!user && (
            <div className="rounded-xl bg-accent/10 p-4 mb-6 text-center">
              <p className="text-sm text-foreground">Please <Link to="/login" className="text-primary font-medium underline">sign in</Link> or <Link to="/signup" className="text-primary font-medium underline">create an account</Link> before registering your hospital.</p>
            </div>
          )}

          {/* Progress */}
          <div className="flex items-center gap-2 mb-8 max-w-md mx-auto">
            {["Basic Info", "Details", "Review"].map((label, i) => (
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
                  <div><label className="text-xs font-medium text-foreground">Hospital Name *</label><input value={form.name} onChange={(e) => update("name", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Apollo Hospital" /></div>
                  <div><label className="text-xs font-medium text-foreground">Registration Number *</label><input value={form.registration_number} onChange={(e) => update("registration_number", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. MH/2024/1234" /></div>
                  <div><label className="text-xs font-medium text-foreground">Type *</label><select value={form.hospital_type} onChange={(e) => update("hospital_type", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"><option>Multi-Specialty</option><option>Super-Specialty</option><option>General Hospital</option><option>Clinic</option><option>Diagnostic Center</option></select></div>
                  <div><label className="text-xs font-medium text-foreground">Bed Count *</label><input type="number" value={form.bed_count} onChange={(e) => update("bed_count", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. 200" /></div>
                  <div className="sm:col-span-2"><label className="text-xs font-medium text-foreground">Description</label><textarea value={form.description} onChange={(e) => update("description", e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" rows={3} placeholder="Brief description of your hospital" /></div>
                </div>
                <Button className="mt-4" onClick={() => { if (!form.name || !form.registration_number) { toast.error("Please fill required fields"); return; } setStep(2); }}>Continue</Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-semibold flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> Contact & Location</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2"><label className="text-xs font-medium text-foreground">Full Address *</label><textarea value={form.address} onChange={(e) => update("address", e.target.value)} className="mt-1 w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" rows={2} placeholder="Complete hospital address" /></div>
                  <div><label className="text-xs font-medium text-foreground">State *</label><select value={form.state} onChange={(e) => update("state", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"><option value="">Select state</option>{indianStates.map(s => <option key={s}>{s}</option>)}</select></div>
                  <div><label className="text-xs font-medium text-foreground">District</label><input value={form.district} onChange={(e) => update("district", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Mumbai Suburban" /></div>
                  <div><label className="text-xs font-medium text-foreground">City *</label><input value={form.city} onChange={(e) => update("city", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Mumbai" /></div>
                  <div><label className="text-xs font-medium text-foreground">Pincode</label><input value={form.pincode} onChange={(e) => update("pincode", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. 400001" /></div>
                  <div><label className="text-xs font-medium text-foreground">Phone *</label><input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="+91 98765 43210" /></div>
                  <div><label className="text-xs font-medium text-foreground">Email *</label><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="admin@hospital.com" /></div>
                  <div><label className="text-xs font-medium text-foreground">Website</label><input value={form.website} onChange={(e) => update("website", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="https://hospital.com" /></div>
                  <div><label className="text-xs font-medium text-foreground">Specializations</label><input value={form.specializations} onChange={(e) => update("specializations", e.target.value)} className="mt-1 h-10 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Cardiology, Neurology, Orthopedics" /></div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="ghost" onClick={() => setStep(1)}>← Back</Button>
                  <Button onClick={() => { if (!form.address || !form.city || !form.state || !form.phone || !form.email) { toast.error("Please fill required fields"); return; } setStep(3); }}>Continue</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> Review & Submit</h2>
                <div className="rounded-xl border p-4 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-xs text-muted-foreground">Hospital Name</span><p className="font-medium text-foreground">{form.name}</p></div>
                    <div><span className="text-xs text-muted-foreground">Type</span><p className="font-medium text-foreground">{form.hospital_type}</p></div>
                    <div><span className="text-xs text-muted-foreground">Location</span><p className="font-medium text-foreground">{form.city}, {form.state}</p></div>
                    <div><span className="text-xs text-muted-foreground">Bed Count</span><p className="font-medium text-foreground">{form.bed_count || "N/A"}</p></div>
                    <div><span className="text-xs text-muted-foreground">Phone</span><p className="font-medium text-foreground">{form.phone}</p></div>
                    <div><span className="text-xs text-muted-foreground">Email</span><p className="font-medium text-foreground">{form.email}</p></div>
                    {form.specializations && <div className="sm:col-span-2"><span className="text-xs text-muted-foreground">Specializations</span><p className="font-medium text-foreground">{form.specializations}</p></div>}
                  </div>
                </div>
                <div className="flex items-start gap-2 mt-4">
                  <input type="checkbox" className="mt-1 rounded border-muted" />
                  <p className="text-xs text-muted-foreground">I certify that the information provided is accurate and I am authorized to register this hospital on MediConnect.</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="ghost" onClick={() => setStep(2)}>← Back</Button>
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleSubmit} disabled={loading || !user}>
                    {loading ? "Submitting..." : "Submit Registration"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
