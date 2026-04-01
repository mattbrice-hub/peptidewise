import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, ExternalLink, FlaskConical, BookOpen, Calendar, Users, Lightbulb, CheckCircle2 } from "lucide-react";
import { researchStudies } from "@/data/research";
import { peptides } from "@/data/peptides";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { buildMeta, PRODUCTION_DOMAIN } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  "semax": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "5-amino-1mq": "bg-orange-50 text-orange-700 border-orange-200",
  "mots-c": "bg-amber-50 text-amber-700 border-amber-200",
  "kisspeptin": "bg-pink-50 text-pink-700 border-pink-200",
};

export function generateStaticParams() {
  return researchStudies.map((study) => ({
    pmid: study.pmid,
  }));
}

export function generateMetadata({ params }: { params: { pmid: string } }): Metadata {
  const study = researchStudies.find((s) => s.pmid === params.pmid);
  if (!study) return { title: "Study Not Found" };
  return buildMeta({
    title: study.title + " — Research",
    description: `Dr. Patrick Taylor, MD breaks down this ${study.peptideName} study: ${study.keyFinding}`,
    path: "/research/" + study.pmid,
  });
}

export default function StudyDetailPage({ params }: { params: { pmid: string } }) {
  const study = researchStudies.find((s) => s.pmid === params.pmid);
  if (!study) notFound();

  const peptide = peptides.find((p) => p.id === study.peptideId);
  const relatedStudies = researchStudies
    .filter((s) => s.peptideId === study.peptideId && s.pmid !== study.pmid)
    .slice(0, 5);

  const paragraphs = study.content
    ? study.content.split("\n\n").filter((p) => p.trim())
    : [study.keyFinding];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Research", href: "/research" },
          { label: study.peptideName + " Study", href: "/research/" + study.pmid },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Link
            href={`/peptides/${study.peptideId}`}
            className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full border hover:opacity-80 transition-opacity",
              peptideColors[study.peptideId] || "bg-gray-50 text-gray-600 border-gray-200"
            )}
          >
            {study.peptideName}
          </Link>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {study.pubDate}
          </span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
          {study.title}
        </h1>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users className="h-4 w-4" />
          <span>{study.authors}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
          <BookOpen className="h-4 w-4" />
          <em>{study.journal}</em>
        </div>
      </div>

      {/* Key Finding Highlight */}
      <div className="bg-blue-50 rounded-xl border border-blue-100 p-5 mb-8">
        <p className="text-sm font-semibold text-blue-600 mb-1">Key Finding</p>
        <p className="text-blue-800 leading-relaxed">{study.keyFinding}</p>
      </div>

      {/* Key Takeaways */}
      {study.takeaways && study.takeaways.length > 0 && (
        <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-6 md:p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-emerald-600" />
            Key Takeaways
          </h2>
          <ul className="space-y-3">
            {study.takeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Study Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-blue-600" />
          Study Breakdown
        </h2>
        <div className="prose prose-gray max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-600 leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* View on PubMed CTA */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 mb-8 text-center">
        <p className="text-sm text-gray-600 mb-3">
          Read the full study on PubMed for complete methodology, data, and citations.
        </p>
        <a
          href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity shadow-sm"
        >
          View Full Study on PubMed
          <ExternalLink className="h-4 w-4" />
        </a>
        <p className="text-xs text-gray-400 mt-2">PMID: {study.pmid}</p>
      </div>

      {/* Related Peptide */}
      {peptide && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">About {peptide.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{peptide.description}</p>
          <Link
            href={`/peptides/${peptide.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Learn more about {peptide.name} &rarr;
          </Link>
        </div>
      )}

      {/* Related Studies */}
      {relatedStudies.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            More {study.peptideName} Research
          </h3>
          <div className="space-y-3">
            {relatedStudies.map((related) => (
              <Link
                key={related.pmid}
                href={`/research/${related.pmid}`}
                className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                  {related.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {related.authors} &mdash; <em>{related.journal}</em> &middot; {related.pubDate}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Consult CTA */}
      <div className="gradient-primary rounded-2xl p-6 text-center">
        <p className="text-white/90 text-sm mb-3">
          Interested in how this research applies to your health goals?
        </p>
        <a
          href="https://tinyurl.com/drtaylorfreeconsult"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-gray-50 transition-colors shadow-lg"
        >
          Consult Dr. Taylor
        </a>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 bg-gray-50 rounded-xl border border-gray-200 p-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-600">Disclaimer:</strong> This summary is for educational
          purposes only and is not medical advice. The study breakdown is a simplified overview
          of the published research. For complete methodology and data, refer to the original
          publication on PubMed. Always consult with a qualified healthcare provider before
          making medical decisions.
        </p>
      </div>
    </div>
  );
}
