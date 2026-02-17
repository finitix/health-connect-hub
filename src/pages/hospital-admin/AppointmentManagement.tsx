import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface Appointment {
  id: string;
  patient_name: string;
  patient_phone: string | null;
  appointment_date: string;
  appointment_time: string | null;
  assigned_time: string | null;
  status: string;
  symptoms: string | null;
  notes: string | null;
  doctor_id: string | null;
  doctors?: { name: string; specialization: string } | null;
}

export default function AppointmentManagement() {
  const { hospitalId } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    if (!hospitalId) return;
    const { data, error } = await supabase
      .from("appointments")
      .select("*, doctors(name, specialization)")
      .eq("hospital_id", hospitalId)
      .order("appointment_date", { ascending: false });
    if (!error) setAppointments(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAppointments(); }, [hospitalId]);

  const updateStatus = async (id: string, status: string, assignedTime?: string) => {
    const updateData: any = { status };
    if (assignedTime) updateData.assigned_time = assignedTime;
    const { error } = await supabase.from("appointments").update(updateData).eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success(`Appointment ${status}`);
    fetchAppointments();
  };

  const statusIcons: Record<string, React.ReactNode> = {
    confirmed: <CheckCircle2 className="h-3 w-3 text-accent" />,
    pending: <Clock className="h-3 w-3 text-warning" />,
    rejected: <XCircle className="h-3 w-3 text-destructive" />,
    completed: <CheckCircle2 className="h-3 w-3 text-primary" />,
    cancelled: <XCircle className="h-3 w-3 text-muted-foreground" />,
  };

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>;

  return (
    <div className="animate-fade-up">
      <div className="rounded-xl bg-card card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-secondary/50">
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Patient</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Doctor</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground hidden sm:table-cell">Date</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Time</th>
              <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
              <th className="text-right px-4 py-2.5 text-xs font-medium text-muted-foreground">Actions</th>
            </tr></thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No appointments yet</td></tr>
              ) : appointments.map((a) => (
                <tr key={a.id} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{a.patient_name}</p>
                    {a.patient_phone && <p className="text-[10px] text-muted-foreground">{a.patient_phone}</p>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{a.doctors?.name || "Unassigned"}</td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{a.appointment_date}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.assigned_time || a.appointment_time || "-"}</td>
                  <td className="px-4 py-3"><span className="flex items-center gap-1 text-xs font-medium capitalize">{statusIcons[a.status]} {a.status}</span></td>
                  <td className="px-4 py-3 text-right">
                    {a.status === "pending" && (
                      <div className="flex gap-1 justify-end">
                        <Button size="sm" className="h-7 text-xs bg-accent hover:bg-accent/90 text-accent-foreground" onClick={() => updateStatus(a.id, "confirmed")}>Accept</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => updateStatus(a.id, "rejected")}>Reject</Button>
                      </div>
                    )}
                    {a.status === "confirmed" && (
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => updateStatus(a.id, "completed")}>Complete</Button>
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
