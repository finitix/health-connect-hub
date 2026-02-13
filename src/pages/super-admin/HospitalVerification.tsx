import { CheckCircle2, XCircle, Clock, MapPin, Star, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const hospitalRequests = [
  { id: 1, name: "Sunrise Medical Center", location: "Pune, Maharashtra", submitted: "Mar 10", status: "Pending", rating: null },
  { id: 2, name: "LifeCare Hospital", location: "Chennai, Tamil Nadu", submitted: "Mar 8", status: "Pending", rating: null },
  { id: 3, name: "Apollo Hospital", location: "Hyderabad", submitted: "Feb 20", status: "Verified", rating: 4.8 },
  { id: 4, name: "Fortis Hospital", location: "Gurgaon", submitted: "Feb 18", status: "Verified", rating: 4.7 },
  { id: 5, name: "City Clinic", location: "Jaipur", submitted: "Mar 5", status: "Rejected", rating: null },
];

const statusConfig: Record<string, { icon: React.ReactNode; class: string }> = {
  Verified: { icon: <BadgeCheck className="h-3 w-3" />, class: "text-success bg-success/10" },
  Pending: { icon: <Clock className="h-3 w-3" />, class: "text-warning bg-warning/10" },
  Rejected: { icon: <XCircle className="h-3 w-3" />, class: "text-destructive bg-destructive/10" },
};

export default function HospitalVerification() {
  return (
    <div className="animate-fade-up">
      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-secondary/50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Hospital</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden sm:table-cell">Location</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden md:table-cell">Submitted</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {hospitalRequests.map((h) => (
                <tr key={h.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3"><p className="font-medium text-foreground">{h.name}</p>{h.rating && <span className="flex items-center gap-0.5 text-xs text-muted-foreground mt-0.5"><Star className="h-2.5 w-2.5 text-warning fill-warning" /> {h.rating}</span>}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell"><span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {h.location}</span></td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{h.submitted}</td>
                  <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${statusConfig[h.status].class}`}>{statusConfig[h.status].icon} {h.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    {h.status === "Pending" && (
                      <div className="flex gap-1 justify-end">
                        <Button size="sm" className="h-7 text-xs bg-accent hover:bg-accent/90 text-accent-foreground">Approve</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs">Reject</Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
