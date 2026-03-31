"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  FlaskConical, ArrowRight, CheckCircle, AlertTriangle, BookOpen, ShieldCheck
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
        <AlertTriangle className="h-12 w-12 text-amber-700 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">No Results Found</h1>
        <p className="text-gray-600 mb-6">
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-medium mb-4 border border-green-200">
          <CheckCircle className="h-4 w-4" />
          {results.length} Peptide{results.length !== 1 ? "s" : ""} Found
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Peptides Studied for Your Symptoms
        </h1>
        <p className="text-gray-600">
          Based on {symptomIds.length} symptom{symptomIds.length !== 1 ? "s" : ""} &middot;{" "}
          {severity} severity &middot; Prioritizing {priority}
        </p>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {results.map((result, idx) => (
          <div
            key={result.peptide.id}
            className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 hover:border-blue-300 transition-all"
          >
            <div className="flex items-start gap-4">
              {/* Match Score */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{result.matchScore}%</div>
                  <div className="text-[10px] text-white/70 -mt-0.5">Match</div>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {idx === 0 && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                      Top Match
                    </span>
                  )}
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", getCategoryColor(result.peptide.category))}>
                    {getCategoryLabel(result.peptide.category)}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {result.peptide.name}
                </h2>
                <p className="text-sm text-gray-600 mb-3">{result.reasoning}</p>

                {/* Matched symptoms */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {result.matchedSymptoms.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200"
                    >
                      <CheckCircle className="h-3 w-3" />
                      {s}
                    </span>
                  ))}
                </div>

                {/* Research & Safety Scores */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Research</span>
                        <span className={cn("text-xs font-bold",
                          result.peptide.researchScore >= 8 ? "text-green-600" :
                          result.peptide.researchScore >= 6 ? "text-blue-400" : "text-amber-700"
                        )}>{result.peptide.researchScore}/10</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full",
                            result.peptide.researchScore >= 8 ? "bg-green-500" :
                            result.peptide.researchScore >= 6 ? "bg-blue-500" : "bg-amber-500"
                          )}
                          style={{ width: `${result.peptide.researchScore * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Safety</span>
                        <span className={cn("text-xs font-bold",
                          result.peptide.safetyScore >= 8 ? "text-green-600" :
                          result.peptide.safetyScore >= 6 ? "text-blue-400" : "text-amber-700"
                        )}>{result.peptide.safetyScore}/10</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full",
                            result.peptide.safetyScore >= 8 ? "bg-green-500" :
                            result.peptide.safetyScore >= 6 ? "bg-blue-500" : "bg-amber-500"
                          )}
                          style={{ width: `${result.peptide.safetyScore * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end">
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
      <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">
            <strong>Disclaimer:</strong> These results are for educational
            purposes only and are not medical advice. Peptide research relevance scores are
            based on published studies and do not constitute treatment recommendations.
            Always consult with a qualified healthcare provider, such as{" "}
            <a href="https://tinyurl.com/drtaylorfreeconsult" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-600 underline">
              Dr. Taylor at Live Vital MD
            </a>, before starting any protocol.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-8">
        <Link
          href="/symptom-checker"
          className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
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
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto" />
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
