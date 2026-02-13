import { Layout } from "@/components/Layout";

const pages: Record<string, { title: string; content: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    content: [
      "Your privacy matters to us. MediConnect collects only the information necessary to provide our services — helping you find hospitals, compare insurance, and book appointments.",
      "We collect your name, email, and health preferences when you create an account. We never sell your personal data to third parties.",
      "Your health data is encrypted and stored securely. Only you and your chosen healthcare providers can access your medical information.",
      "We use cookies to improve your experience. You can manage cookie preferences in your browser settings.",
      "You can request deletion of your account and all associated data at any time through your profile settings.",
      "We may update this policy periodically. We'll notify you of significant changes via email.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    content: [
      "By using MediConnect, you agree to these terms. Our platform connects patients with hospitals and insurance providers — we are a facilitator, not a healthcare provider.",
      "You must be at least 18 years old to create an account. You are responsible for maintaining the confidentiality of your login credentials.",
      "Appointment bookings made through our platform are subject to hospital availability and confirmation. We facilitate but do not guarantee appointments.",
      "All hospital and insurance information is provided by the respective partners. While we verify accuracy, we recommend confirming details directly.",
      "We reserve the right to suspend accounts that violate our guidelines, including fraudulent activity or misuse of the platform.",
      "MediConnect is not liable for medical outcomes, insurance claim disputes, or issues arising from interactions with our partner hospitals and insurers.",
    ],
  },
  disclaimer: {
    title: "Insurance Disclaimer",
    content: [
      "MediConnect is NOT an insurance company, broker, or agent. We do not sell, underwrite, or administer any insurance policies.",
      "Our platform provides comparison tools to help you understand and evaluate different health insurance plans available in the market.",
      "All insurance plan details — including coverage amounts, premiums, benefits, and exclusions — are provided by the respective insurance companies.",
      "We strongly recommend reading the complete policy document before purchasing any insurance plan. Our summaries are for informational purposes only.",
      "MediConnect does not receive commissions from insurance sales. Our revenue comes from platform services, not insurance transactions.",
      "For insurance claims, policy changes, or grievances, please contact your insurance provider directly. MediConnect cannot intervene in insurer-policyholder relationships.",
      "All insurance partners listed on our platform are verified for valid IRDAI (Insurance Regulatory and Development Authority of India) registration.",
    ],
  },
};

export default function LegalPage({ type }: { type: "privacy" | "terms" | "disclaimer" }) {
  const page = pages[type];
  return (
    <Layout>
      <div className="container py-12 max-w-2xl">
        <h1 className="font-display text-2xl font-bold text-foreground">{page.title}</h1>
        <p className="mt-1 text-xs text-muted-foreground">Last updated: February 2026</p>
        <div className="mt-6 space-y-4">
          {page.content.map((p, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
    </Layout>
  );
}
