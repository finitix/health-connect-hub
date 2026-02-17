import { useState, useEffect } from "react";
import { XCircle, Clock, MapPin, Star, BadgeCheck, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  status: string;
  created_at: string;
  rating: number | null;
  registered_by: string | null;
}

const statusConfig: Record<string, { icon: React.ReactNode; class: string }> = {
  approved: { icon: <BadgeCheck className="h-3 w-3" />, class: "text-success bg-success/10" },
  pending: { icon: <Clock className="h-3 w-3" />, class: "text-warning bg-warning/10" },
  rejected: { icon: <XCircle className="h-3 w-3" />, class: "text-destructive bg-destructive/10" },
};

export default function HospitalVerification() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHospitals = async () => {
    const { data } = await supabase
      .from("hospitals")
      .select("id, name, city, state, status, created_at, rating, registered_by")
      .order("created_at", { ascending: false });
    setHospitals(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchHospitals(); }, []);

  const handleApprove = async (hospital: Hospital) => {
    // 1. Approve the hospital
    const { error } = await supabase
      .from("hospitals")
      .update({ status: "approved", approved_at: new Date().toISOString() })
      .eq("id", hospital.id);
    if (error) { toast.error(error.message); return; }

    // 2. Auto-link the registering user as hospital_admin
    if (hospital.registered_by) {
      // Add hospital_admin role
      const { data: existingRole } = await supabase
        .from("user_roles")
        .select("id")
        .eq("user_id", hospital.registered_by)
        .eq("role", "hospital_admin")
        .maybeSingle();

      if (!existingRole) {
        await supabase.from("user_roles").insert({
          user_id: hospital.registered_by,
          role: "hospital_admin",
        });
      }

      // Link user to hospital in hospital_admins table
      const { data: existingLink } = await supabase
        .from("hospital_admins")
        .select("id")
        .eq("user_id", hospital.registered_by)
        .eq("hospital_id", hospital.id)
        .maybeSingle();

      if (!existingLink) {
        await supabase.from("hospital_admins").insert({
          user_id: hospital.registered_by,
          hospital_id: hospital.id,
        });
      }
    }

    toast.success("Hospital approved! Admin role assigned to registrant.");
    fetchHospitals();
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from("hospitals")
      .update({ status: "rejected" })
      .eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Hospital rejected");
    fetchHospitals();
  };

  if (loading) {
    return <div className="flex justify-center py-12"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;
  }

  return (
    <div className="animate-fade-up">
      {hospitals.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No hospital registrations yet</p>
        </div>
      ) : (
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
                {hospitals.map((h) => (
                  <tr key={h.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3"><p className="font-medium text-foreground">{h.name}</p>{h.rating ? <span className="flex items-center gap-0.5 text-xs text-muted-foreground mt-0.5"><Star className="h-2.5 w-2.5 text-warning fill-warning" /> {h.rating}</span> : null}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell"><span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {h.city}, {h.state}</span></td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{new Date(h.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${statusConfig[h.status]?.class || ""}`}>{statusConfig[h.status]?.icon} {h.status}</span></td>
                    <td className="px-4 py-3 text-right">
                      {h.status === "pending" && (
                        <div className="flex gap-1 justify-end">
                          <Button size="sm" className="h-7 text-xs bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => handleApprove(h)}>Approve</Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleReject(h.id)}>Reject</Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
