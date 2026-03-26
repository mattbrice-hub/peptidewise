"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  FlaskConical, ArrowRight, CheckCircle, AlertTriangle
} from "lucide-react";
import { getRecommendations } from "@/lib/recommendation-engine";
import { peptides } from "@/data/peptides";
import { symptomCategories } from "@/data/symptoms";
import { providers } from "@/data/providers";
import { cn, getCategoryLabel, getCategoryColor } from "@/lib/utils";

function ResultsContent() {
  const searchParams = useSearchParams();
  const symptomIds = searchParams.get("symptoms")?.split(",").filter(Boolean) || [];
  const severity = (searchParams.get("severity") as "mild" | "moderate" | "severe") || "moderate";
  const priority = (searchParams.get("priority") as "effectiveness" | "safety" | "value") || "effectiveness";

  const results = getRecommendations(
    { symptomIds, severity, priority },
    peptides,
    symptomCategories,
    providers
  );

  if (results.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <AlertTriangle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">No Results Found</h1>
        <p className="text-gray-400 mb-6">
          We couldn&apos;t find peptide information for your selected symptoms.
          Try selecting different symptoms or broadening your criteria.
        </p>
        <Link
          href="/symptom-checker"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-medium"
        >
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4 border border-green-800/30">
          <CheckCircle className="h-4 w-4" />
          {results.length} Peptide{results.length !== 1 ? "s" : ""} Found
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Peptides Studied for Your Symptoms
        </h1>
        <p className="text-gray-400">
          Based on {symptomIds.length} symptom{symptomIds.length !== 1 ? "s" : ""} &middot;{" "}
          {severity} severity &middot; Prioritizing {priority}
        </p>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {results.map((result, idx) => (
          <div
            key={result.peptide.id}
            className="bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-primary-500/30 transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Match Score */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{result.matchScore}%</div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {idx === 0 && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-400">
                      Top Match
                    </span>
                  )}
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", getCategoryColor(result.peptide.category))}>
                    {getCategoryLabel(result.peptide.category)}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mb-1">
                  {result.peptide.name}
                </h2>
                <p className="text-sm text-gray-400 mb-3">{result.reasoning}</p>

                {/* Matched symptoms */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {result.matchedSymptoms.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary-900/30 text-primary-300 border border-primary-800/30"
                    >
                      <CheckCircle className="h-3 w-3" />
                      {s}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {result.peptide.researchStatus === "well-studied"
                      ? "Well-studied in clinical research"
                      : result.peptide.researchStatus === "emerging"
                      ? "Emerging research"
                      : "Limited research available"}
                  </div>
                  <Link
                    href={`/peptides/${result.peptide.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg gradient-primary text-white hover:opacity-90 transition-opacity"
                  >
                    Learn More <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 rounded-xl bg-amber-900/20 border border-amber-800/30">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-300/80">
            <strong>Disclaimer:</strong> These results are for educational
            purposes only and are not medical advice. Peptide research relevance scores are
            based on published studies and do not constitute treatment recommendations.
            Always consult with a qualified healthcare provider, such as{" "}
            <a href="https://www.livevital.io/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 underline">
              Dr. Taylor at Live Vital MD
            </a>, before starting any protocol.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-8">
        <Link
          href="/symptom-checker"
          className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-300 font-medium hover:bg-white/5 transition-colors"
        >
          Start Over
        </Link>
        <Link
          href="/peptides"
          className="px-5 py-2.5 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
        >
          Browse All Peptides
        </Link>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-white/10 rounded w-48 mx-auto" />
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
