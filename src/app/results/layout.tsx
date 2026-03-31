import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Your Peptide Matches",
  description:
    "View your personalized peptide matches based on your symptoms and health goals. Evidence-based results curated by Dr. Patrick Taylor, MD.",
  path: "/results",
  noIndex: true,
});

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
