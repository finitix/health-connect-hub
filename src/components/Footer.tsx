import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Find Hospitals", to: "/search" },
    { label: "Compare Insurance", to: "/insurance" },
    { label: "How It Works", to: "/#how-it-works" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Careers", to: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Insurance Disclaimer", to: "/disclaimer" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold text-foreground">
                Medi<span className="text-primary">Connect</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Simplifying healthcare decisions. Find hospitals, compare insurance, and book appointments — all in one place.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display text-sm font-semibold text-foreground mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MediConnect. All rights reserved. We do not sell insurance. We help you compare & connect.
        </div>
      </div>
    </footer>
  );
}
