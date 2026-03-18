import Link from "next/link";
import { FlaskConical, Filter } from "lucide-react";
import { peptides } from "@/data/peptides";
import { getCategoryLabel, getCategoryColor } from "@/lib/utils";

export const metadata = {
  title: "Browse Peptides - PeptideWise",
  description: "Explore 15+ therapeutic peptides with detailed information on benefits, dosage, safety, and available providers.",
};

export default function PeptidesPage() {
  const categories = [...new Set(peptides.map((p) => p.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Peptides</h1>
        <p className="text-gray-600">
          Explore our database of therapeutic peptides with detailed information on benefits,
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
            className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-600/5 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                <FlaskConical className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {peptide.name}
                </h2>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(peptide.category)}`}>
                  {getCategoryLabel(peptide.category)}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{peptide.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {peptide.benefits.slice(0, 2).map((b) => (
                <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {b.length > 35 ? b.slice(0, 35) + "..." : b}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className={`px-2 py-0.5 rounded-full ${
                peptide.researchStatus === "well-studied"
                  ? "bg-green-100 text-green-700"
                  : peptide.researchStatus === "emerging"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-600"
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
