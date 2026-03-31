import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Peptide Research — Published Studies",
  description:
    "Dr. Patrick Taylor, MD curates 99 published PubMed studies on therapeutic peptides. Plain-English summaries, key findings, and clinical takeaways for each study.",
  path: "/research",
});

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
