import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { peptides } from "@/data/peptides";
import { getCategoryLabel, getCategoryColor } from "@/lib/utils";

export const metadata = {
  title: "Browse Peptides - PeptideWise",
  description: "Explore 15+ therapeutic peptides with evidence-based information on benefits, dosage, safety, and published research.",
};

export default function PeptidesPage() {
  const categories = [...new Set(peptides.map((p) => p.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Browse Peptides</h1>
        <p className="text-gray-400">
          Explore our database of therapeutic peptides with evidence-based information on benefits,
          dosage, and safety.
        </p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <span
            key={cat}
            className={`text-xs font-medium px-3 py-1.5 rounded-full ${getCategoryColor(cat)}`}
          >
            {getCategoryLabel(cat)}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {peptides.map((peptide) => (
          <Link
            key={peptide.id}
            href={`/peptides/${peptide.slug}`}
            className="group bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-primary-500/30 hover:bg-white/[0.07] transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <FlaskConical className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-white group-hover:text-primary-300 transition-colors">
                  {peptide.name}
                </h2>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(peptide.category)}`}>
                  {getCategoryLabel(peptide.category)}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-3 line-clamp-2">{peptide.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {peptide.benefits.slice(0, 2).map((b) => (
                <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">
                  {b.length > 35 ? b.slice(0, 35) + "..." : b}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className={`px-2 py-0.5 rounded-full ${
                peptide.researchStatus === "well-studied"
                  ? "bg-green-900/30 text-green-400"
                  : peptide.researchStatus === "emerging"
                  ? "bg-blue-900/30 text-blue-400"
                  : "bg-gray-800 text-gray-400"
              }`}>
                {peptide.researchStatus === "well-studied"
                  ? "Well Studied"
                  : peptide.researchStatus === "emerging"
                  ? "Emerging"
                  : "Limited Research"}
              </span>
              <span>{peptide.administrationRoutes.join(", ")}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
