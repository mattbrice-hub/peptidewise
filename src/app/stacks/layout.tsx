import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Personalized Peptide Protocols",
  description:
    "Dr. Patrick Taylor, MD builds personalized peptide protocols tailored to your age, gender, BMI, and health goals. 12 physician-curated combinations with research and safety scores.",
  path: "/stacks",
});

export default function StacksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
