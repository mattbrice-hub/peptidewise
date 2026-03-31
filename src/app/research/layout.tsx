import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Peptide Research — Published Studies",
  description:
    "Browse 100+ published PubMed studies on therapeutic peptides. Evidence-based research summaries curated by Dr. Patrick Taylor, MD.",
  path: "/research",
});

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
