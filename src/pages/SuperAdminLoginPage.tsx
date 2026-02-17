import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, Eye, EyeOff, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function SuperAdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    setLoading(true);
    const { data: authData, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setLoading(false); toast.error(error.message); return; }

    // Verify super_admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", authData.user.id);
    const userRoles = roles?.map((r: any) => r.role) || [];

    if (!userRoles.includes("super_admin")) {
      await supabase.auth.signOut();
      setLoading(false);
      toast.error("Access denied. This login is for super admins only.");
      return;
    }

    setLoading(false);
    toast.success("Welcome, Super Admin!");
    navigate("/super-admin");
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 mx-auto mb-6">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Super Admin Panel</h2>
          <p className="mt-2 text-sm text-white/60">Secure access to the MediConnect administration dashboard. Authorized personnel only.</p>
          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/50">🔒 This area is restricted to authorized super administrators. Unauthorized access attempts are logged.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"><Heart className="h-4 w-4 text-primary-foreground" /></div>
            <span className="font-display text-lg font-bold">MediConnect</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive mb-4">
            <Shield className="h-3 w-3" /> Super Admin Access
          </div>
          <h1 className="font-display text-xl font-bold text-foreground">Admin Sign In</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter your admin credentials to continue</p>

          <form className="space-y-4 mt-6" onSubmit={handleLogin}>
            <div>
              <label className="text-xs font-medium text-foreground">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@mediconnect.com" className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-10 w-full rounded-lg border bg-background pl-9 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Sign In as Admin"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Not an admin? <Link to="/login" className="text-primary font-medium hover:underline">Regular sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
