import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Your Peptide Matches",
  description:
    "Dr. Patrick Taylor, MD matches peptides to your symptoms and health goals. Personalized, evidence-based recommendations with research scores and safety profiles.",
  path: "/results",
  noIndex: true,
});

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
