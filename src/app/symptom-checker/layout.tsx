import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Symptom Checker — Explore Peptide Options",
  description:
    "Use our educational symptom explorer to discover which peptides researchers are studying for your health concerns. Guided by Dr. Patrick Taylor, MD.",
  path: "/symptom-checker",
});

export default function SymptomCheckerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
