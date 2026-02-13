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

  const toggleFilter = (arr: string[], val: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    return hospitals.filter((h) => {
      const q = query.toLowerCase();
      const matchesQuery = !q || h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q) || h.specializations.some((s) => s.toLowerCase().includes(q));
      const matchesSpec = selectedSpecs.length === 0 || h.specializations.some((s) => selectedSpecs.includes(s));
      const matchesIns = selectedInsurance.length === 0 || h.acceptedInsurance.some((i) => selectedInsurance.includes(i));
      return matchesQuery && matchesSpec && matchesIns;
    });
  }, [query, selectedSpecs, selectedInsurance]);

  return (
    <Layout>
      {/* Search header */}
      <section className="bg-hero-gradient py-12">
        <div className="container">
          <h1 className="font-display text-3xl font-bold text-primary-foreground text-center">Find Hospitals</h1>
          <p className="mt-2 text-center text-primary-foreground/80">Search by condition, location, or hospital name</p>
          <div className="mx-auto mt-6 max-w-xl relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Cardiology, Delhi, Apollo..."
              className="h-12 w-full rounded-xl border-0 bg-card pl-12 pr-4 text-sm text-foreground shadow-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Filters - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <FiltersPanel
                allSpecializations={allSpecializations}
                allInsurance={allInsurance}
                selectedSpecs={selectedSpecs}
                selectedInsurance={selectedInsurance}
                toggleSpec={(s) => toggleFilter(selectedSpecs, s, setSelectedSpecs)}
                toggleInsurance={(i) => toggleFilter(selectedInsurance, i, setSelectedInsurance)}
              />
            </aside>

            {/* Mobile filter toggle */}
            <div className="lg:hidden">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="mr-2 h-4 w-4" /> Filters {(selectedSpecs.length + selectedInsurance.length) > 0 && `(${selectedSpecs.length + selectedInsurance.length})`}
              </Button>
              {showFilters && (
                <div className="mt-4">
                  <FiltersPanel
                    allSpecializations={allSpecializations}
                    allInsurance={allInsurance}
                    selectedSpecs={selectedSpecs}
                    selectedInsurance={selectedInsurance}
                    toggleSpec={(s) => toggleFilter(selectedSpecs, s, setSelectedSpecs)}
                    toggleInsurance={(i) => toggleFilter(selectedInsurance, i, setSelectedInsurance)}
                  />
                </div>
              )}
            </div>

            {/* Results */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">{filtered.length} hospital{filtered.length !== 1 ? "s" : ""} found</p>
              <div className="grid gap-5 sm:grid-cols-2">
                {filtered.map((hospital, i) => (
                  <motion.div
                    key={hospital.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/hospital/${hospital.id}`}
                      className="group block rounded-2xl bg-card card-shadow overflow-hidden transition-all hover:card-shadow-hover"
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img src={hospital.image} alt={hospital.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-card/90 px-2.5 py-1 text-sm font-medium">
                          <Star className="h-3.5 w-3.5 text-accent fill-accent" /> {hospital.rating}
                          <span className="text-muted-foreground text-xs">({hospital.reviewCount})</span>
                        </div>
                        {hospital.distance && (
                          <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-lg bg-card/90 px-2.5 py-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" /> {hospital.distance}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-semibold text-foreground">{hospital.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{hospital.location}</p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {hospital.specializations.slice(0, 3).map((s) => (
                            <span key={s} className="rounded-md bg-teal-50 px-2 py-0.5 text-xs font-medium text-primary">{s}</span>
                          ))}
                        </div>
                        <Button className="mt-4 w-full" size="sm">Book Appointment</Button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="py-20 text-center text-muted-foreground">
                  <p className="text-lg font-medium">No hospitals found</p>
                  <p className="mt-1 text-sm">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FiltersPanel({
  allSpecializations,
  allInsurance,
  selectedSpecs,
  selectedInsurance,
  toggleSpec,
  toggleInsurance,
}: {
  allSpecializations: string[];
  allInsurance: string[];
  selectedSpecs: string[];
  selectedInsurance: string[];
  toggleSpec: (s: string) => void;
  toggleInsurance: (i: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Specialization</h3>
        <div className="flex flex-wrap gap-2">
          {allSpecializations.map((s) => (
            <button
              key={s}
              onClick={() => toggleSpec(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedSpecs.includes(s) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {s}
              {selectedSpecs.includes(s) && <X className="ml-1 inline h-3 w-3" />}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-display text-sm font-semibold text-foreground mb-3">Insurance Accepted</h3>
        <div className="flex flex-wrap gap-2">
          {allInsurance.map((ins) => (
            <button
              key={ins}
              onClick={() => toggleInsurance(ins)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedInsurance.includes(ins) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {ins}
              {selectedInsurance.includes(ins) && <X className="ml-1 inline h-3 w-3" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
