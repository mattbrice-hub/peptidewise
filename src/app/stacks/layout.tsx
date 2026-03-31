import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Peptide Stack Recommendations",
  description:
    "Dr. Patrick Taylor, MD recommends peptide stacks tailored to your age, gender, BMI, and health goals. 12 curated combinations with research and safety scores.",
  path: "/stacks",
});

export default function StacksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
