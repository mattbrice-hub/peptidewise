"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen,
  ExternalLink,
  Search,
  Filter,
  FlaskConical,
  ArrowRight,
  TrendingUp,
  Scale,
  Activity,
  Hourglass,
  Brain,
  Shield,
  Heart,
  Moon,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { researchStudies } from "@/data/research";
import { peptides } from "@/data/peptides";
import { cn, getCategoryLabel, getCategoryColor } from "@/lib/utils";

// Category display order — matches peptides page
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

// Full static class strings so Tailwind scanner detects them
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

const categoryBorderColors: Record<string, string> = {
  "growth-hormone": "border-l-blue-500",
  "weight-management": "border-l-green-500",
  "tissue-repair": "border-l-orange-500",
  "anti-aging": "border-l-purple-500",
  cognitive: "border-l-indigo-500",
  immune: "border-l-red-500",
  "sexual-health": "border-l-pink-500",
  sleep: "border-l-violet-500",
  "skin-hair": "border-l-amber-500",
};

// Build lookup: peptideId → category
const peptideCategoryMap: Record<string, string> = {};
for (const p of peptides) {
  peptideCategoryMap[p.id] = p.category;
}

// Group peptides by category for filter panel
const peptidesByCategory: Record<string, { id: string; name: string }[]> = {};
for (const cat of categoryOrder) {
  peptidesByCategory[cat] = peptides
    .filter((p) => p.category === cat)
    .map((p) => ({ id: p.id, name: p.name }));
}

// Study counts per peptide (static)
const studyCountByPeptide: Record<string, number> = {};
for (const study of researchStudies) {
  studyCountByPeptide[study.peptideId] = (studyCountByPeptide[study.peptideId] || 0) + 1;
}

function extractYear(pubDate: string): string {
  const match = pubDate.match(/\d{4}/);
  return match ? match[0] : "";
}

export default function ResearchPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredStudies = useMemo(() => {
    return researchStudies.filter((study) => {
      const matchesPeptide = activeFilter === "all" || study.peptideId === activeFilter;
      const matchesSearch =
        !searchQuery ||
        study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.journal.toLowerCase().includes(searchQuery.toLowerCase()) ||
        study.keyFinding.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesPeptide && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Group filtered studies by category (only used when activeFilter === "all")
  const groupedStudies = useMemo(() => {
    if (activeFilter !== "all") return null;
    const groups: Record<string, typeof filteredStudies> = {};
    for (const study of filteredStudies) {
      const cat = peptideCategoryMap[study.peptideId] || "other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(study);
    }
    return groups;
  }, [filteredStudies, activeFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <FlaskConical className="h-5 w-5 text-surface" />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-base">Research</h1>
        </div>
        <p className="text-muted max-w-2xl">
          The latest published studies on peptides featured on PeptideWise. All studies are sourced from
          PubMed and linked directly to their original publications.
        </p>
        <p className="text-sm text-muted mt-2">
          {researchStudies.length} studies across {categoryOrder.length} categories
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          type="text"
          placeholder="Search studies by title, author, journal, or finding..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-warm-white text-sm focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent font-body"
        />
      </div>

      {/* Filter Panel */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-sm font-medium text-muted hover:text-base transition-colors mb-3"
        >
          <Filter className="h-4 w-4" />
          Filter by Peptide
          <ChevronDown
            className={cn("h-4 w-4 transition-transform", showFilters && "rotate-180")}
          />
        </button>

        {showFilters && (
          <div className="bg-surface rounded-xl border border-border p-4 space-y-4">
            {/* All Studies pill */}
            <button
              onClick={() => setActiveFilter("all")}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                activeFilter === "all"
                  ? "bg-accent text-surface border-transparent shadow-warm"
                  : "bg-warm-white text-muted border-border hover:border-accent hover:text-accent"
              )}
            >
              All Studies ({researchStudies.length})
            </button>

            {/* Category-grouped pills */}
            {categoryOrder.map((cat) => {
              const catPeptides = peptidesByCategory[cat];
              if (!catPeptides || catPeptides.length === 0) return null;
              const catStudyCount = catPeptides.reduce(
                (sum, p) => sum + (studyCountByPeptide[p.id] || 0),
                0
              );
              if (catStudyCount === 0) return null;

              return (
                <div key={cat}>
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                    {getCategoryLabel(cat)} ({catStudyCount})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {catPeptides
                      .filter((p) => (studyCountByPeptide[p.id] || 0) > 0)
                      .map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActiveFilter(p.id)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                            activeFilter === p.id
                              ? "bg-accent text-surface border-transparent shadow-warm"
                              : "bg-warm-white text-muted border-border hover:border-accent hover:text-accent"
                          )}
                        >
                          {p.name}
                          <span className="ml-1 opacity-70">
                            ({studyCountByPeptide[p.id] || 0})
                          </span>
                        </button>
                      ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Jump-to-Category Nav (only when grouped) */}
      {activeFilter === "all" && groupedStudies && (
        <div className="flex flex-wrap gap-2 mb-6">
          {categoryOrder.map((cat) => {
            const studies = groupedStudies[cat];
            if (!studies || studies.length === 0) return null;
            return (
              <a
                key={cat}
                href={`#research-${cat}`}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                  getCategoryColor(cat)
                )}
              >
                {getCategoryLabel(cat)} ({studies.length})
              </a>
            );
          })}
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-muted mb-4">
        Showing {filteredStudies.length} {filteredStudies.length === 1 ? "study" : "studies"}
        {activeFilter !== "all" &&
          ` for ${peptides.find((p) => p.id === activeFilter)?.name || activeFilter}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </p>

      {/* Study Cards — Grouped or Flat */}
      {activeFilter === "all" && groupedStudies ? (
        // Grouped by category
        <div className="space-y-10">
          {categoryOrder.map((cat) => {
            const studies = groupedStudies[cat];
            if (!studies || studies.length === 0) return null;
            const Icon = categoryIcons[cat] || FlaskConical;

            return (
              <section key={cat} id={`research-${cat}`}>
                {/* Section header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center",
                      categoryGradients[cat]
                    )}
                  >
                    <Icon className="h-4.5 w-4.5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg font-semibold text-base">
                      {getCategoryLabel(cat)}
                    </h2>
                    <p className="text-xs text-muted">
                      {studies.length} {studies.length === 1 ? "study" : "studies"}
                    </p>
                  </div>
                </div>

                {/* Cards */}
                <div className="space-y-3">
                  {studies.map((study) => (
                    <StudyCard key={study.pmid} study={study} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        // Flat list for specific peptide
        <div className="space-y-3">
          {filteredStudies.map((study) => (
            <StudyCard key={study.pmid} study={study} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredStudies.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="h-12 w-12 text-muted mx-auto mb-4" />
          <p className="text-muted font-medium">No studies found</p>
          <p className="text-sm text-muted mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-12 bg-surface rounded-xl border border-border p-4">
        <p className="text-xs text-muted leading-relaxed">
          <strong className="text-text-primary">Note:</strong> Studies listed here are sourced from PubMed
          and represent published research. Inclusion does not constitute endorsement or a treatment
          recommendation. Always consult with a qualified healthcare provider before making medical
          decisions. For personalized guidance, consult{" "}
          <a
            href="https://tinyurl.com/drtaylorfreeconsult"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-hover"
          >
            Dr. Taylor at Live Vital MD
          </a>
          .
        </p>
      </div>
    </div>
  );
}

// Extracted card component for reuse in both grouped and flat modes
function StudyCard({ study }: { study: (typeof researchStudies)[number] }) {
  const cat = peptideCategoryMap[study.peptideId] || "other";
  const year = extractYear(study.pubDate);

  return (
    <div
      className={cn(
        "group bg-card rounded-xl border border-border border-l-4 p-4 hover:-translate-y-0.5 hover:shadow-warm-lg transition-all duration-300",
        categoryBorderColors[cat] || "border-l-border"
      )}
    >
      <Link href={`/research/${study.pmid}`} className="block">
        {/* Top row: peptide pill + year + PubMed */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              getCategoryColor(cat)
            )}
          >
            {study.peptideName}
          </span>
          {year && (
            <span className="text-xs text-muted bg-surface px-2 py-0.5 rounded-full">
              {year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading text-sm font-semibold text-base mb-1 group-hover:text-accent transition-colors leading-snug">
          {study.title}
        </h3>

        {/* Authors + Journal */}
        <p className="font-body text-xs text-muted mb-2 truncate">
          {study.authors} &mdash; <em>{study.journal}</em>
        </p>

        {/* Key Finding — compact */}
        <p className="text-sm text-text-primary leading-relaxed line-clamp-2">
          <span className="font-medium text-text-primary">Key finding:</span> {study.keyFinding}
        </p>
      </Link>

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
        <Link
          href={`/research/${study.pmid}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent-hover"
        >
          Read breakdown <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <a
          href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
        >
          PubMed <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
