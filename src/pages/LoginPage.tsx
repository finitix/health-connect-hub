import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-hero-gradient items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 mx-auto mb-6">
            <Heart className="h-7 w-7 text-primary-foreground" />
          </div>
          <h2 className="font-display text-2xl font-bold text-primary-foreground">Welcome back to MediConnect</h2>
          <p className="mt-2 text-sm text-primary-foreground/60">Your health, simplified. Access your dashboard, appointments, and more.</p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"><Heart className="h-4 w-4 text-primary-foreground" /></div>
            <span className="font-display text-lg font-bold">MediConnect</span>
          </Link>
          <h1 className="font-display text-xl font-bold text-foreground">Sign in to your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter your credentials to continue</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-xs font-medium text-foreground">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="email" placeholder="you@example.com" className="h-10 w-full rounded-lg border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="h-10 w-full rounded-lg border bg-background pl-9 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input type="checkbox" className="rounded border-border" /> Remember me
              </label>
              <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
            </div>
            <Button className="w-full" asChild><Link to="/dashboard">Sign In</Link></Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Don't have an account? <Link to="/signup" className="text-primary font-medium hover:underline">Sign up</Link>
          </p>

          <div className="mt-6 pt-6 border-t">
            <p className="text-[10px] text-muted-foreground text-center mb-3">Quick access (demo)</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs" asChild><Link to="/hospital-admin">Hospital Admin</Link></Button>
              <Button variant="outline" size="sm" className="text-xs" asChild><Link to="/insurance-admin">Insurance Admin</Link></Button>
              <Button variant="outline" size="sm" className="text-xs col-span-2" asChild><Link to="/super-admin">Super Admin</Link></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
