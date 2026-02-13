import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Shield, Bell, Database } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-2xl animate-fade-up space-y-6">
      <div className="rounded-xl bg-card p-5 card-shadow">
        <h2 className="font-display text-sm font-semibold mb-4 flex items-center gap-2"><User className="h-4 w-4" /> Personal Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="text-xs font-medium text-muted-foreground">Full Name</label><input type="text" defaultValue="John Doe" className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
          <div><label className="text-xs font-medium text-muted-foreground">Email</label><div className="relative mt-1"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" /><input type="email" defaultValue="john@example.com" className="h-9 w-full rounded-lg border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div></div>
          <div><label className="text-xs font-medium text-muted-foreground">Phone</label><div className="relative mt-1"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" /><input type="tel" defaultValue="+91 98765 43210" className="h-9 w-full rounded-lg border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div></div>
          <div><label className="text-xs font-medium text-muted-foreground">Date of Birth</label><input type="date" defaultValue="1990-05-15" className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
        </div>
        <Button size="sm" className="mt-4">Save Changes</Button>
      </div>

      <div className="rounded-xl bg-card p-5 card-shadow">
        <h2 className="font-display text-sm font-semibold mb-4 flex items-center gap-2"><Shield className="h-4 w-4" /> Insurance Info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className="text-xs font-medium text-muted-foreground">Provider</label><input type="text" defaultValue="Star Health" className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
          <div><label className="text-xs font-medium text-muted-foreground">Policy Number</label><input type="text" defaultValue="SH-2026-XXXXXX" className="mt-1 h-9 w-full rounded-lg border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" /></div>
        </div>
        <Button size="sm" className="mt-4">Update</Button>
      </div>

      <div className="rounded-xl bg-card p-5 card-shadow">
        <h2 className="font-display text-sm font-semibold mb-4 flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</h2>
        <div className="space-y-3">
          {["Appointment reminders", "Health tips", "Insurance updates"].map((n) => (
            <label key={n} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{n}</span>
              <input type="checkbox" defaultChecked className="rounded border-border" />
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-card p-5 card-shadow">
        <h2 className="font-display text-sm font-semibold mb-3 flex items-center gap-2"><Database className="h-4 w-4" /> Data & Consent</h2>
        <p className="text-xs text-muted-foreground mb-3">Control how your data is used and shared.</p>
        <div className="space-y-2">
          {["Share health data with insurance partners", "Allow anonymized data for research"].map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" className="rounded border-border" /> {c}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
