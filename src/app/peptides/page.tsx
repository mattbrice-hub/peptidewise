import Link from "next/link";
import {
  TrendingUp,
  Scale,
  Activity,
  Hourglass,
  Brain,
  Shield,
  Heart,
  Moon,
  Sparkles,
  FlaskConical,
  ArrowRight,
  Star,
  Apple,
} from "lucide-react";
import { peptides } from "@/data/peptides";
import { stacks } from "@/data/stacks";
import { getCategoryLabel, getCategoryColor } from "@/lib/utils";

const categoryIcons: Record<string, React.ElementType> = {
  "growth-hormone": TrendingUp,
  "weight-management": Scale,
  "tissue-repair": Activity,
  "anti-aging": Hourglass,
  cognitive: Brain,
  immune: Shield,
  "sexual-health": Heart,
  sleep: Moon,
  "skin-hair": Sparkles,
};

const categoryDescriptions: Record<string, string> = {
  "growth-hormone":
    "Peptides that stimulate natural growth hormone production and optimize GH levels",
  "weight-management":
    "GLP-1 agonists and metabolic peptides for weight loss and body composition",
  "tissue-repair":
    "Healing peptides that accelerate repair of tendons, muscles, and gut tissue",
  "anti-aging":
    "Longevity peptides targeting cellular aging, telomeres, and age-related decline",
  cognitive:
    "Nootropic and anxiolytic peptides for brain function, mood, and mental clarity",
  immune: "Antimicrobial and immunomodulatory peptides for immune defense",
  "sexual-health":
    "Peptides targeting sexual desire and function through central nervous system pathways",
  sleep: "Neuromodulatory peptides that promote restorative deep sleep",
  "skin-hair":
    "Copper peptides and tissue remodeling peptides for skin and hair health",
};

const categoryOrder = [
  "tissue-repair",
  "weight-management",
  "growth-hormone",
  "anti-aging",
  "cognitive",
  "sleep",
  "immune",
  "sexual-health",
  "skin-hair",
];

// Full static class strings so Tailwind scanner can detect them
const categoryGradients: Record<string, string> = {
  "growth-hormone": "bg-gradient-to-br from-blue-600 to-blue-400",
  "weight-management": "bg-gradient-to-br from-green-600 to-green-400",
  "tissue-repair": "bg-gradient-to-br from-orange-600 to-orange-400",
  "anti-aging": "bg-gradient-to-br from-purple-600 to-purple-400",
  cognitive: "bg-gradient-to-br from-indigo-600 to-indigo-400",
  immune: "bg-gradient-to-br from-red-600 to-red-400",
  "sexual-health": "bg-gradient-to-br from-pink-600 to-pink-400",
  sleep: "bg-gradient-to-br from-violet-600 to-violet-400",
  "skin-hair": "bg-gradient-to-br from-amber-600 to-amber-400",
};

const stackIcons: Record<string, React.ElementType> = {
  flame: Activity,
  scale: Scale,
  clock: Hourglass,
  moon: Moon,
  brain: Brain,
  shield: Shield,
  heart: Heart,
  sparkles: Sparkles,
  apple: Apple,
};

function getStackScores(peptideIds: string[]) {
  const stackPeptides = peptideIds
    .map((id) => peptides.find((p) => p.id === id))
    .filter(Boolean);
  if (stackPeptides.length === 0) return { avgResearch: 0, avgSafety: 0 };
  const avgResearch = Math.round(
    stackPeptides.reduce((sum, p) => sum + (p?.researchScore || 0), 0) / stackPeptides.length * 10
  ) / 10;
  const avgSafety = Math.round(
    stackPeptides.reduce((sum, p) => sum + (p?.safetyScore || 0), 0) / stackPeptides.length * 10
  ) / 10;
  return { avgResearch, avgSafety };
}

function getScoreColor(score: number): string {
  if (score >= 8) return "bg-green-500";
  if (score >= 6) return "bg-blue-500";
  return "bg-amber-500";
}

function getScoreTextColor(score: number): string {
  if (score >= 8) return "text-green-600";
  if (score >= 6) return "text-blue-600";
  return "text-amber-700";
}

export const metadata = {
  title: "Browse Peptides - PeptideWise",
  description:
    "Explore 15+ therapeutic peptides with evidence-based information on benefits, dosage, safety, and published research.",
};

export default function PeptidesPage() {
  // Group peptides by category
  const peptidesByCategory = categoryOrder.reduce(
    (acc, category) => {
      const items = peptides.filter((p) => p.category === category);
      if (items.length > 0) {
        acc[category] = items;
      }
      return acc;
    },
    {} as Record<string, typeof peptides>,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Peptides</h1>
        <p className="text-gray-600">
          Explore our database of therapeutic peptides with evidence-based
          information on benefits, dosage, and safety.
        </p>
      </div>

      {/* Category quick nav pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {Object.keys(peptidesByCategory).map((cat) => (
          <a
            key={cat}
            href={`#category-${cat}`}
            className={`text-xs font-medium px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity ${getCategoryColor(cat)}`}
          >
            {getCategoryLabel(cat)}
          </a>
        ))}
        <a
          href="#common-stacks"
          className="text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 hover:opacity-80 transition-opacity"
        >
          Rated Stacks
        </a>
      </div>

      {/* Category sections */}
      <div className="space-y-14">
        {Object.entries(peptidesByCategory).map(([category, items]) => {
          const Icon = categoryIcons[category] || Activity;
          const gradient = categoryGradients[category] || "from-gray-600 to-gray-400";
          const description = categoryDescriptions[category] || "";

          return (
            <section key={category} id={`category-${category}`} style={{ scrollMarginTop: "5rem" }}>
              {/* Category header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {getCategoryLabel(category)}
                  </h2>
                  <p className="text-sm text-gray-600 mt-0.5">{description}</p>
                </div>
              </div>

              {/* Peptide cards grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((peptide) => {
                  const CardIcon = categoryIcons[peptide.category] || Activity;
                  const cardGradient =
                    categoryGradients[peptide.category] || "from-gray-600 to-gray-400";

                  return (
                    <Link
                      key={peptide.id}
                      href={`/peptides/${peptide.slug}`}
                      className="group bg-white shadow-sm rounded-2xl border border-gray-200 p-6 hover:border-blue-300 hover:bg-gray-50 transition-all"
                    >
                      {/* Header: icon + name + badge */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg ${cardGradient} flex items-center justify-center flex-shrink-0`}
                        >
                          <CardIcon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {peptide.name}
                          </h3>
                          <span
                            className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(peptide.category)}`}
                          >
                            {getCategoryLabel(peptide.category)}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {peptide.description}
                      </p>

                      {/* Score bars */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-20 flex-shrink-0">
                            Research
                          </span>
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getScoreColor(peptide.researchScore)}`}
                              style={{
                                width: `${(peptide.researchScore / 10) * 100}%`,
                              }}
                            />
                          </div>
                          <span
                            className={`text-xs font-medium w-6 text-right ${getScoreTextColor(peptide.researchScore)}`}
                          >
                            {peptide.researchScore}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 w-20 flex-shrink-0">
                            Safety
                          </span>
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getScoreColor(peptide.safetyScore)}`}
                              style={{
                                width: `${(peptide.safetyScore / 10) * 100}%`,
                              }}
                            />
                          </div>
                          <span
                            className={`text-xs font-medium w-6 text-right ${getScoreTextColor(peptide.safetyScore)}`}
                          >
                            {peptide.safetyScore}
                          </span>
                        </div>
                      </div>

                      {/* Research status + routes */}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span
                          className={`px-2 py-0.5 rounded-full ${
                            peptide.researchStatus === "well-studied"
                              ? "bg-green-50 text-green-600"
                              : peptide.researchStatus === "emerging"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {peptide.researchStatus === "well-studied"
                            ? "Well Studied"
                            : peptide.researchStatus === "emerging"
                              ? "Emerging"
                              : "Limited Research"}
                        </span>
                        <span>
                          {peptide.administrationRoutes.join(", ")}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Common Stacks — Rated */}
      <section className="mt-16 pt-12 border-t border-gray-200" id="common-stacks" style={{ scrollMarginTop: "5rem" }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Dr. Taylor&apos;s Rated Stacks
            </h2>
            <p className="text-gray-600 text-sm">
              Common peptide combinations scored by average research evidence and safety profile.
            </p>
          </div>
          <Link
            href="/stacks"
            className="hidden md:inline-flex items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-500"
          >
            Personalize Stacks <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stacks.map((stack) => {
            const { avgResearch, avgSafety } = getStackScores(stack.peptideIds);
            const Icon = stackIcons[stack.icon] || FlaskConical;
            const stackPeptides = stack.peptideIds
              .map((id) => peptides.find((p) => p.id === id))
              .filter(Boolean);

            return (
              <div
                key={stack.id}
                className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden"
              >
                {/* Stack header */}
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        {stack.highlight && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            {stack.highlight}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {stack.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{stack.subtitle}</p>
                    </div>
                  </div>

                  {/* Peptides in stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {stackPeptides.map(
                      (p) =>
                        p && (
                          <Link
                            key={p.id}
                            href={`/peptides/${p.slug}`}
                            className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 hover:border-blue-300 transition-colors"
                          >
                            {p.name}
                          </Link>
                        )
                    )}
                  </div>

                  {/* Average scores */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-20 flex-shrink-0">
                        Research
                      </span>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getScoreColor(avgResearch)}`}
                          style={{ width: `${(avgResearch / 10) * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium w-8 text-right ${getScoreTextColor(avgResearch)}`}>
                        {avgResearch}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-20 flex-shrink-0">
                        Safety
                      </span>
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${getScoreColor(avgSafety)}`}
                          style={{ width: `${(avgSafety / 10) * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs font-medium w-8 text-right ${getScoreTextColor(avgSafety)}`}>
                        {avgSafety}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dr. Taylor's note */}
                <div className="border-t border-gray-100 bg-blue-50/50 px-5 py-3">
                  <div className="flex items-start gap-2">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-[9px] font-bold mt-0.5">
                      PT
                    </div>
                    <p className="text-xs text-gray-600 italic leading-relaxed line-clamp-3">
                      &ldquo;{stack.drTaylorNote}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/stacks"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-medium text-sm hover:opacity-90 transition-opacity shadow-md"
          >
            <Star className="h-4 w-4" />
            Get Personalized Stack Recommendations
          </Link>
        </div>
      </section>
    </div>
  );
}
