import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Peptide Stack Recommendations",
  description:
    "Get personalized peptide stack recommendations from Dr. Patrick Taylor, MD. Enter your profile to find evidence-based peptide combinations for your health goals.",
  path: "/stacks",
});

export default function StacksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
