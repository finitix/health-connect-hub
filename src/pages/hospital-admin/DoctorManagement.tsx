import { useState } from "react";
import { Plus, Edit, ToggleLeft, ToggleRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { hospitals } from "@/data/mockData";

const initialDoctors = hospitals[0].doctors.map((d) => ({ ...d, enabled: d.available }));

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [showAdd, setShowAdd] = useState(false);

  const toggleDoctor = (id: string) => {
    setDoctors(doctors.map((d) => d.id === id ? { ...d, enabled: !d.enabled } : d));
  };

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{doctors.length} doctors registered</p>
        <Button size="sm" onClick={() => setShowAdd(!showAdd)}><Plus className="h-3.5 w-3.5 mr-1" /> Add Doctor</Button>
      </div>

      {showAdd && (
        <div className="rounded-xl bg-card p-5 card-shadow animate-fade-in">
          <h3 className="font-display text-sm font-semibold mb-3">Add New Doctor</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div><label className="text-xs font-medium text-muted-foreground">Name</label><input className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Dr. Name" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Specialization</label><input className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Cardiologist" /></div>
            <div><label className="text-xs font-medium text-muted-foreground">Experience</label><input className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. 10 years" /></div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button size="sm">Add</Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {doctors.map((doc) => (
          <div key={doc.id} className="rounded-xl bg-card p-4 card-shadow flex items-center gap-3">
            <img src={doc.image} alt={doc.name} className="h-11 w-11 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground truncate">{doc.name}</h4>
              <p className="text-xs text-muted-foreground">{doc.specialization} · {doc.experience}</p>
              <span className="flex items-center gap-0.5 text-xs mt-0.5"><Star className="h-2.5 w-2.5 text-warning fill-warning" /> {doc.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toggleDoctor(doc.id)} className={doc.enabled ? "text-success" : "text-muted-foreground"}>
                {doc.enabled ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
              </button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0"><Edit className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
