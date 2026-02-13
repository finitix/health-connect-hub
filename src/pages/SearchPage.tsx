import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Star, MapPin, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { hospitals } from "@/data/mockData";
import { motion } from "framer-motion";

const allSpecializations = [...new Set(hospitals.flatMap((h) => h.specializations))];
const allInsurance = [...new Set(hospitals.flatMap((h) => h.acceptedInsurance))];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggle = (arr: string[], val: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    return hospitals.filter((h) => {
      const q = query.toLowerCase();
      const mq = !q || h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q) || h.specializations.some((s) => s.toLowerCase().includes(q));
      const ms = selectedSpecs.length === 0 || h.specializations.some((s) => selectedSpecs.includes(s));
      const mi = selectedInsurance.length === 0 || h.acceptedInsurance.some((i) => selectedInsurance.includes(i));
      return mq && ms && mi;
    });
  }, [query, selectedSpecs, selectedInsurance]);

  return (
    <Layout>
      <section className="bg-hero-gradient py-10">
        <div className="container text-center">
          <h1 className="font-display text-2xl font-bold text-primary-foreground">Find Hospitals</h1>
          <p className="mt-1 text-sm text-primary-foreground/70">Search by condition, location, or hospital name</p>
          <div className="mx-auto mt-5 max-w-lg relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. Cardiology, Delhi, Apollo..."
              className="h-11 w-full rounded-lg border-0 bg-card pl-10 pr-4 text-sm shadow-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container flex flex-col gap-6 lg:flex-row">
          <aside className="hidden lg:block w-56 shrink-0">
            <FilterPanel specs={allSpecializations} insurance={allInsurance} selectedSpecs={selectedSpecs} selectedInsurance={selectedInsurance}
              toggleSpec={(s) => toggle(selectedSpecs, s, setSelectedSpecs)} toggleIns={(i) => toggle(selectedInsurance, i, setSelectedInsurance)} />
          </aside>
          <div className="lg:hidden">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-1.5 h-3.5 w-3.5" /> Filters {(selectedSpecs.length + selectedInsurance.length) > 0 && `(${selectedSpecs.length + selectedInsurance.length})`}
            </Button>
            {showFilters && <div className="mt-3"><FilterPanel specs={allSpecializations} insurance={allInsurance} selectedSpecs={selectedSpecs} selectedInsurance={selectedInsurance}
              toggleSpec={(s) => toggle(selectedSpecs, s, setSelectedSpecs)} toggleIns={(i) => toggle(selectedInsurance, i, setSelectedInsurance)} /></div>}
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-4">{filtered.length} hospital{filtered.length !== 1 ? "s" : ""} found</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {filtered.map((h, i) => (
                <motion.div key={h.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <Link to={`/hospital/${h.id}`} className="group block rounded-xl bg-card card-shadow overflow-hidden hover:card-shadow-hover transition-all">
                    <div className="relative h-36 overflow-hidden">
                      <img src={h.image} alt={h.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-card/90 px-2 py-0.5 text-xs font-medium">
                        <Star className="h-3 w-3 text-warning fill-warning" /> {h.rating} <span className="text-muted-foreground">({h.reviewCount})</span>
                      </div>
                      {h.distance && <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-card/90 px-2 py-0.5 text-[10px] text-muted-foreground">
                        <MapPin className="h-2.5 w-2.5" /> {h.distance}
                      </div>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-sm font-semibold text-foreground">{h.name}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{h.location}</p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {h.specializations.slice(0, 3).map((s) => (
                          <span key={s} className="rounded bg-navy-50 px-1.5 py-0.5 text-[10px] font-medium text-primary">{s}</span>
                        ))}
                      </div>
                      <Button className="mt-3 w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="sm">Book Appointment</Button>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && <div className="py-16 text-center text-muted-foreground"><p className="font-medium">No hospitals found</p><p className="text-xs mt-1">Try adjusting your filters</p></div>}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FilterPanel({ specs, insurance, selectedSpecs, selectedInsurance, toggleSpec, toggleIns }: {
  specs: string[]; insurance: string[]; selectedSpecs: string[]; selectedInsurance: string[];
  toggleSpec: (s: string) => void; toggleIns: (i: string) => void;
}) {
  return (
    <div className="space-y-5">
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
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Insurance</h3>
        <div className="flex flex-wrap gap-1.5">
          {insurance.map((ins) => (
            <button key={ins} onClick={() => toggleIns(ins)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${selectedInsurance.includes(ins) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>
              {ins}{selectedInsurance.includes(ins) && <X className="ml-1 inline h-2.5 w-2.5" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
