"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { BookOpen, ExternalLink, Search, Filter, FlaskConical, ArrowRight } from "lucide-react";
import { researchStudies } from "@/data/research";
import { cn } from "@/lib/utils";

const peptideFilters = [
  { id: "all", label: "All Peptides" },
  { id: "bpc-157", label: "BPC-157" },
  { id: "tb-500", label: "TB-500" },
  { id: "sermorelin", label: "Sermorelin" },
  { id: "ipamorelin", label: "Ipamorelin" },
  { id: "cjc-1295", label: "CJC-1295" },
  { id: "semaglutide", label: "Semaglutide" },
  { id: "tirzepatide", label: "Tirzepatide" },
  { id: "pt-141", label: "PT-141" },
  { id: "selank", label: "Selank" },
  { id: "epithalon", label: "Epithalon" },
  { id: "ghk-cu", label: "GHK-Cu" },
  { id: "dsip", label: "DSIP" },
  { id: "aod-9604", label: "AOD-9604" },
  { id: "kpv", label: "KPV" },
  { id: "ll-37", label: "LL-37" },
];

const peptideColors: Record<string, string> = {
  "bpc-157": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "tb-500": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "sermorelin": "bg-blue-50 text-blue-700 border-blue-200",
  "ipamorelin": "bg-blue-50 text-blue-700 border-blue-200",
  "cjc-1295": "bg-blue-50 text-blue-700 border-blue-200",
  "semaglutide": "bg-orange-50 text-orange-700 border-orange-200",
  "tirzepatide": "bg-orange-50 text-orange-700 border-orange-200",
  "pt-141": "bg-pink-50 text-pink-700 border-pink-200",
  "selank": "bg-violet-50 text-violet-700 border-violet-200",
  "epithalon": "bg-amber-50 text-amber-700 border-amber-200",
  "ghk-cu": "bg-rose-50 text-rose-700 border-rose-200",
  "dsip": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "aod-9604": "bg-orange-50 text-orange-700 border-orange-200",
  "kpv": "bg-teal-50 text-teal-700 border-teal-200",
  "ll-37": "bg-teal-50 text-teal-700 border-teal-200",
};

export default function ResearchPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  const studyCount = activeFilter === "all"
    ? researchStudies.length
    : researchStudies.filter((s) => s.peptideId === activeFilter).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <FlaskConical className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Research</h1>
        </div>
        <p className="text-gray-600 max-w-2xl">
          The latest published studies on peptides featured on PeptideWise. All studies are sourced from
          PubMed and linked directly to their original publications.
        </p>
        <p className="text-sm text-gray-400 mt-2">
          {researchStudies.length} studies across {peptideFilters.length - 1} peptides
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search studies by title, author, journal, or finding..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
        {peptideFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border",
              activeFilter === filter.id
                ? "gradient-primary text-white border-transparent shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
            )}
          >
            {filter.label}
            {filter.id !== "all" && (
              <span className="ml-1 opacity-70">
                ({researchStudies.filter((s) => s.peptideId === filter.id).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredStudies.length} {filteredStudies.length === 1 ? "study" : "studies"}
        {activeFilter !== "all" && ` for ${peptideFilters.find((f) => f.id === activeFilter)?.label}`}
        {searchQuery && ` matching "${searchQuery}"`}
      </p>

      {/* Study Cards */}
      <div className="space-y-4">
        {filteredStudies.map((study) => (
          <div
            key={study.pmid}
            className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <Link href={`/research/${study.pmid}`} className="block">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Peptide tag + date */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full border",
                        peptideColors[study.peptideId] || "bg-gray-50 text-gray-600 border-gray-200"
                      )}
                    >
                      {study.peptideName}
                    </span>
                    <span className="text-xs text-gray-400">{study.pubDate}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors leading-snug">
                    {study.title}
                  </h2>

                  {/* Authors + Journal */}
                  <p className="text-xs text-gray-500 mb-3">
                    {study.authors} &mdash; <em>{study.journal}</em>
                  </p>

                  {/* Key Finding */}
                  <div className="bg-blue-50 rounded-lg px-3 py-2 border border-blue-100">
                    <p className="text-sm text-blue-800 leading-relaxed">
                      <span className="font-semibold">Key finding:</span> {study.keyFinding}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 mt-3">
                    Read breakdown <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
            <div className="flex justify-end mt-2 pt-2 border-t border-gray-100">
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-blue-500 transition-colors"
              >
                PubMed <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredStudies.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No studies found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-12 bg-gray-50 rounded-xl border border-gray-200 p-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-600">Note:</strong> Studies listed here are sourced from PubMed
          and represent published research. Inclusion does not constitute endorsement or a treatment
          recommendation. Always consult with a qualified healthcare provider before making medical
          decisions. For personalized guidance, consult{" "}
          <a
            href="https://tinyurl.com/drtaylorfreeconsult"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-500"
          >
            Dr. Taylor at Live Vital MD
          </a>
          .
        </p>
      </div>
    </div>
  );
}
