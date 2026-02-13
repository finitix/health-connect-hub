import { TrendingUp, Eye, Users } from "lucide-react";

const planViews = [
  { plan: "Family Health Optima", views: 542, interest: 28 },
  { plan: "Complete Health Insurance", views: 489, interest: 22 },
  { plan: "Optima Secure", views: 356, interest: 18 },
  { plan: "Health Guard", views: 298, interest: 15 },
  { plan: "Health Companion", views: 245, interest: 12 },
  { plan: "Arogya Sanjeevani", views: 198, interest: 8 },
];

export default function InsuranceAnalytics() {
  const maxViews = Math.max(...planViews.map((p) => p.views));

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-card p-4 card-shadow"><p className="text-xs text-muted-foreground">Total Views (30d)</p><p className="font-display text-2xl font-bold mt-1">2,128</p><p className="text-xs text-success flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" /> +8%</p></div>
        <div className="rounded-xl bg-card p-4 card-shadow"><p className="text-xs text-muted-foreground">Total Leads</p><p className="font-display text-2xl font-bold mt-1">103</p></div>
        <div className="rounded-xl bg-card p-4 card-shadow"><p className="text-xs text-muted-foreground">Conversion Rate</p><p className="font-display text-2xl font-bold mt-1">3.2%</p></div>
      </div>

      <div className="rounded-xl bg-card p-5 card-shadow">
        <h2 className="font-display text-sm font-semibold mb-4">Plan Performance</h2>
        <div className="space-y-3">
          {planViews.map((p) => (
            <div key={p.plan} className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{p.plan}</p>
                <div className="mt-1 h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${(p.views / maxViews) * 100}%` }} />
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-medium text-foreground flex items-center gap-1"><Eye className="h-3 w-3" /> {p.views}</p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1"><Users className="h-2.5 w-2.5" /> {p.interest} leads</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
