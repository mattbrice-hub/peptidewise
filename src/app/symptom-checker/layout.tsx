import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Symptom Checker — Explore Peptide Options",
  description:
    "Dr. Patrick Taylor, MD guides you through a symptom-based peptide explorer. Select your health concerns to discover which peptides researchers are studying for each condition.",
  path: "/symptom-checker",
});

export default function SymptomCheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
