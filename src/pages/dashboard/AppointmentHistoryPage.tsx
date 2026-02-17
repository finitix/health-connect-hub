import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Appointment {
  id: string;
  appointment_date: string;
  appointment_time: string | null;
  assigned_time: string | null;
  status: string;
  patient_name: string;
  symptoms: string | null;
  hospitals: { name: string; city: string } | null;
  doctors: { name: string; specialization: string } | null;
  created_at: string;
}

const statusConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  pending: { icon: <Clock className="h-3 w-3" />, color: "text-warning" },
  confirmed: { icon: <CheckCircle2 className="h-3 w-3" />, color: "text-accent" },
  completed: { icon: <CheckCircle2 className="h-3 w-3" />, color: "text-primary" },
  rejected: { icon: <XCircle className="h-3 w-3" />, color: "text-destructive" },
  cancelled: { icon: <XCircle className="h-3 w-3" />, color: "text-muted-foreground" },
};

export default function AppointmentHistoryPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("appointments")
      .select("*, hospitals(name, city), doctors(name, specialization)")
      .eq("user_id", user.id)
      .order("appointment_date", { ascending: false })
      .then(({ data }) => { setAppointments(data || []); setLoading(false); });
  }, [user]);

  const cancelAppointment = async (id: string) => {
    await supabase.from("appointments").update({ status: "cancelled" }).eq("id", id);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: "cancelled" } : a));
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="animate-fade-up">
      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Hospital</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Doctor</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground hidden md:table-cell">Time</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  <Building2 className="h-6 w-6 mx-auto mb-2 text-muted-foreground/30" />
                  <p>No appointments yet</p>
                  <p className="text-xs mt-1">Book your first appointment from the dashboard</p>
                </td></tr>
              ) : appointments.map((a) => {
                const sc = statusConfig[a.status] || statusConfig.pending;
                return (
                  <tr key={a.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-foreground">{a.hospitals?.name || "Unknown"}</p>
                      <p className="text-[10px] text-muted-foreground">{a.hospitals?.city}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{a.doctors?.name || "Unassigned"}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{a.appointment_date}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{a.assigned_time || a.appointment_time || "-"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium capitalize ${sc.color}`}>
                        {sc.icon} {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {(a.status === "pending" || a.status === "confirmed") && (
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-destructive" onClick={() => cancelAppointment(a.id)}>Cancel</Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
