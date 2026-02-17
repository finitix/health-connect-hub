import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Find Hospitals", to: "/search" },
    { label: "Compare Insurance", to: "/insurance" },
    { label: "For Hospitals", to: "/for-hospitals" },
    { label: "Register Hospital", to: "/hospital-registration" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "How It Works", to: "/#how-it-works" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Disclaimer", to: "/disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <span className="font-display text-base font-bold text-foreground">MediConnect</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Simplifying healthcare decisions. Find hospitals, compare insurance, and book appointments — all in one place.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-foreground/70 hover:text-primary transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MediConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
