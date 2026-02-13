import { CheckCircle2, XCircle } from "lucide-react";

const insurancePlans = [
  { name: "Star Health", accepted: true },
  { name: "HDFC Ergo", accepted: true },
  { name: "ICICI Lombard", accepted: true },
  { name: "Max Bupa", accepted: true },
  { name: "Bajaj Allianz", accepted: false },
  { name: "New India Assurance", accepted: false },
  { name: "Religare", accepted: false },
];

export default function HospitalInsuranceManagement() {
  return (
    <div className="max-w-lg animate-fade-up">
      <p className="text-sm text-muted-foreground mb-4">Select which insurance providers are accepted at your hospital.</p>
      <div className="rounded-xl bg-card card-shadow divide-y">
        {insurancePlans.map((p) => (
          <label key={p.name} className="flex items-center justify-between px-4 py-3 hover:bg-secondary/30 transition-colors cursor-pointer">
            <span className="text-sm text-foreground">{p.name}</span>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${p.accepted ? "text-success" : "text-muted-foreground"}`}>{p.accepted ? "Accepted" : "Not accepted"}</span>
              <input type="checkbox" defaultChecked={p.accepted} className="rounded border-border" />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
