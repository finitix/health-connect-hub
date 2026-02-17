import { Link } from "react-router-dom";
import { Heart, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Find Hospitals", to: "/search" },
  { label: "Insurance Plans", to: "/insurance" },
  { label: "For Hospitals", to: "/for-hospitals" },
  { label: "About", to: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, roles, signOut, profile } = useAuth();

  const getDashboardLink = () => {
    if (roles.includes("super_admin")) return "/super-admin";
    if (roles.includes("hospital_admin")) return "/hospital-admin";
    if (roles.includes("insurance_admin")) return "/insurance-admin";
    return "/dashboard";
  };

  return (
    <header className="sticky top-0 z-50 glass-surface border-b">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold text-foreground">MediConnect</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to={getDashboardLink()}>
                  <User className="h-3.5 w-3.5 mr-1" />
                  {profile?.full_name || "Dashboard"}
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-3.5 w-3.5 mr-1" /> Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild><Link to="/login">Log in</Link></Button>
              <Button size="sm" asChild><Link to="/signup">Get Started</Link></Button>
            </>
          )}
        </div>

        <button className="md:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-card px-4 pb-4 md:hidden animate-fade-in">
          <nav className="flex flex-col gap-0.5 pt-2">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary">
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            {user ? (
              <>
                <Button variant="outline" size="sm" asChild><Link to={getDashboardLink()} onClick={() => setMobileOpen(false)}>Dashboard</Link></Button>
                <Button size="sm" onClick={() => { signOut(); setMobileOpen(false); }}>Sign out</Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild><Link to="/login">Log in</Link></Button>
                <Button size="sm" asChild><Link to="/signup">Get Started</Link></Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
