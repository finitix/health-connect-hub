import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Star, MapPin, Filter, X, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const indianStates = ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi"];

interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  district: string | null;
  hospital_type: string;
  specializations: string[];
  rating: number;
  review_count: number;
  image_url: string | null;
  phone: string;
  bed_count: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [allSpecs, setAllSpecs] = useState<string[]>([]);
  const [allDistricts, setAllDistricts] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("hospitals")
        .select("id, name, city, state, district, hospital_type, specializations, rating, review_count, image_url, phone, bed_count")
        .eq("status", "approved")
        .order("rating", { ascending: false });
      const h = data || [];
      setHospitals(h);
      // Extract unique specs and districts
      const specs = new Set<string>();
      const districts = new Set<string>();
      h.forEach(hosp => {
        hosp.specializations?.forEach((s: string) => specs.add(s));
        if (hosp.district) districts.add(hosp.district);
      });
      setAllSpecs([...specs].sort());
      setAllDistricts([...districts].sort());
      setLoading(false);
    };
    fetch();
  }, []);

  const toggle = (arr: string[], val: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const filtered = hospitals.filter((h) => {
    const q = query.toLowerCase();
    const mq = !q || h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q) || h.state.toLowerCase().includes(q) || h.specializations?.some((s) => s.toLowerCase().includes(q));
    const ms = selectedSpecs.length === 0 || h.specializations?.some((s) => selectedSpecs.includes(s));
    const mState = !selectedState || h.state === selectedState;
    const mDistrict = !selectedDistrict || h.district === selectedDistrict;
    const mType = !selectedType || h.hospital_type === selectedType;
    return mq && ms && mState && mDistrict && mType;
  });

  return (
    <Layout>
      <section className="bg-hero-gradient py-10">
        <div className="container text-center">
          <h1 className="font-display text-2xl font-bold text-primary-foreground">Find Hospitals</h1>
          <p className="mt-1 text-sm text-primary-foreground/70">Search verified hospitals across India</p>
          <div className="mx-auto mt-5 max-w-lg relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. Cardiology, Delhi, Apollo..."
              className="h-11 w-full rounded-lg border-0 bg-card pl-10 pr-4 text-sm shadow-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container flex flex-col gap-6 lg:flex-row">
          <aside className="hidden lg:block w-60 shrink-0">
            <FilterPanel
              states={indianStates} districts={allDistricts} specs={allSpecs}
              selectedState={selectedState} setSelectedState={setSelectedState}
              selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict}
              selectedType={selectedType} setSelectedType={setSelectedType}
              selectedSpecs={selectedSpecs} toggleSpec={(s) => toggle(selectedSpecs, s, setSelectedSpecs)}
            />
          </aside>
          <div className="lg:hidden">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-1.5 h-3.5 w-3.5" /> Filters
            </Button>
            {showFilters && <div className="mt-3">
              <FilterPanel
                states={indianStates} districts={allDistricts} specs={allSpecs}
                selectedState={selectedState} setSelectedState={setSelectedState}
                selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict}
                selectedType={selectedType} setSelectedType={setSelectedType}
                selectedSpecs={selectedSpecs} toggleSpec={(s) => toggle(selectedSpecs, s, setSelectedSpecs)}
              />
            </div>}
          </div>
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mb-4">{filtered.length} hospital{filtered.length !== 1 ? "s" : ""} found</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {filtered.map((h, i) => (
                    <motion.div key={h.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                      <Link to={`/hospital/${h.id}`} className="group block rounded-xl bg-card card-shadow overflow-hidden hover:card-shadow-hover transition-all">
                        <div className="relative h-36 overflow-hidden bg-secondary">
                          {h.image_url ? (
                            <img src={h.image_url} alt={h.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center"><Building2 className="h-8 w-8 text-muted-foreground/30" /></div>
                          )}
                          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-card/90 px-2 py-0.5 text-xs font-medium">
                            <Star className="h-3 w-3 text-warning fill-warning" /> {Number(h.rating).toFixed(1)}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-display text-sm font-semibold text-foreground">{h.name}</h3>
                          <p className="mt-0.5 text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {h.city}, {h.state}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{h.hospital_type} · {h.bed_count} beds</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {h.specializations?.slice(0, 3).map((s) => (
                              <span key={s} className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground">{s}</span>
                            ))}
                          </div>
                          <Button className="mt-3 w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="sm">Book Appointment</Button>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                {filtered.length === 0 && <div className="py-16 text-center text-muted-foreground"><Building2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground/30" /><p className="font-medium">No hospitals found</p><p className="text-xs mt-1">Try adjusting your filters or check back later</p></div>}
              </>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FilterPanel({ states, districts, specs, selectedState, setSelectedState, selectedDistrict, setSelectedDistrict, selectedType, setSelectedType, selectedSpecs, toggleSpec }: {
  states: string[]; districts: string[]; specs: string[];
  selectedState: string; setSelectedState: (v: string) => void;
  selectedDistrict: string; setSelectedDistrict: (v: string) => void;
  selectedType: string; setSelectedType: (v: string) => void;
  selectedSpecs: string[]; toggleSpec: (s: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">State</h3>
        <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(""); }}
          className="h-9 w-full rounded-lg border bg-background px-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">All States</option>
          {states.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      {districts.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">District</h3>
          <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}
            className="h-9 w-full rounded-lg border bg-background px-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">All Districts</option>
            {districts.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>
      )}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Hospital Type</h3>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}
          className="h-9 w-full rounded-lg border bg-background px-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="">All Types</option>
          <option>Multi-Specialty</option>
          <option>Super-Specialty</option>
          <option>General Hospital</option>
          <option>Clinic</option>
          <option>Diagnostic Center</option>
        </select>
      </div>
      {specs.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Specialization</h3>
          <div className="flex flex-wrap gap-1.5">
            {specs.map((s) => (
              <button key={s} onClick={() => toggleSpec(s)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${selectedSpecs.includes(s) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>
                {s}{selectedSpecs.includes(s) && <X className="ml-1 inline h-2.5 w-2.5" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
