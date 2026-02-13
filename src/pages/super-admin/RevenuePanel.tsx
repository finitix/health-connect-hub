import { TrendingUp, DollarSign, CreditCard, Star } from "lucide-react";

const revenue = [
  { month: "Jan", amount: 185000 }, { month: "Feb", amount: 210000 },
  { month: "Mar", amount: 242000 }, { month: "Apr", amount: 198000 },
  { month: "May", amount: 265000 }, { month: "Jun", amount: 290000 },
];

const revenueStreams = [
  { source: "Hospital Commissions", amount: "₹1.2L", pct: 42 },
  { source: "Featured Listings", amount: "₹78K", pct: 27 },
  { source: "Premium Subscriptions", amount: "₹55K", pct: 19 },
  { source: "Insurance Referrals", amount: "₹35K", pct: 12 },
];

export default function RevenuePanel() {
  const maxAmount = Math.max(...revenue.map((r) => r.amount));

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-card p-4 card-shadow"><p className="text-xs text-muted-foreground">Monthly Revenue</p><p className="font-display text-2xl font-bold mt-1">₹2.9L</p><p className="text-xs text-success flex items-center gap-1 mt-1"><TrendingUp className="h-3 w-3" /> +9.5%</p></div>
        <div className="rounded-xl bg-card p-4 card-shadow"><p className="text-xs text-muted-foreground">Total Revenue (YTD)</p><p className="font-display text-2xl font-bold mt-1">₹13.9L</p></div>
        <div className="rounded-xl bg-card p-4 card-shadow"><p className="text-xs text-muted-foreground">Active Subscriptions</p><p className="font-display text-2xl font-bold mt-1">18</p></div>
      </div>

      <div className="rounded-xl bg-card p-5 card-shadow">
        <h2 className="font-display text-sm font-semibold mb-4">Revenue Trend</h2>
        <div className="flex items-end gap-3 h-32">
          {revenue.map((r) => (
            <div key={r.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-foreground">₹{(r.amount / 1000).toFixed(0)}k</span>
              <div className="w-full bg-accent/80 rounded-t" style={{ height: `${(r.amount / maxAmount) * 100}%` }} />
              <span className="text-[10px] text-muted-foreground">{r.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-card p-5 card-shadow">
        <h2 className="font-display text-sm font-semibold mb-4">Revenue Streams</h2>
        <div className="space-y-3">
          {revenueStreams.map((s) => (
            <div key={s.source} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-sm"><span className="text-foreground">{s.source}</span><span className="font-medium">{s.amount}</span></div>
                <div className="mt-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
              <span className="text-xs text-muted-foreground w-8 text-right">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
