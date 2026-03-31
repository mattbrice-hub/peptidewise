import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FlaskConical, ArrowLeft, CheckCircle, AlertTriangle, BookOpen,
  Pill, Clock, ShieldCheck, Beaker, TrendingUp, Scale, Activity,
  Hourglass, Brain, Shield, Heart, Moon, Sparkles, Quote
} from "lucide-react";
import { peptides } from "@/data/peptides";
import { cn, getCategoryLabel, getCategoryColor } from "@/lib/utils";

export function generateStaticParams() {
  return peptides.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const peptide = peptides.find((p) => p.slug === params.slug);
  if (!peptide) return { title: "Peptide Not Found" };
  return {
    title: `${peptide.name}: Benefits, Dosage & Research - PeptideWise`,
    description: peptide.description,
  };
}

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

export default function PeptideDetailPage({ params }: { params: { slug: string } }) {
  const peptide = peptides.find((p) => p.slug === params.slug);
  if (!peptide) notFound();

  const relatedPeptides = peptide.relatedPeptideIds
    .map((id) => peptides.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <Link
        href="/peptides"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Peptides
      </Link>

      {/* Header */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
            {(() => { const Icon = categoryIcons[peptide.category] || FlaskConical; return <Icon className="h-7 w-7 text-white" />; })()}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", getCategoryColor(peptide.category))}>
                {getCategoryLabel(peptide.category)}
              </span>
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full",
                peptide.researchStatus === "well-studied" ? "bg-green-50 text-green-600" :
                peptide.researchStatus === "emerging" ? "bg-blue-50 text-blue-600" :
                "bg-gray-100 text-gray-600"
              )}>
                {peptide.researchStatus === "well-studied" ? "Well Studied" :
                 peptide.researchStatus === "emerging" ? "Emerging Research" : "Limited Research"}
              </span>
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full",
                peptide.legalStatus === "prescription" ? "bg-purple-50 text-purple-600" :
                peptide.legalStatus === "research-only" ? "bg-amber-50 text-amber-700" :
                "bg-gray-100 text-gray-600"
              )}>
                {peptide.legalStatus === "prescription" ? "Prescription" :
                 peptide.legalStatus === "research-only" ? "Research Only" : "Supplement"}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{peptide.name}</h1>
            {peptide.aliases.length > 0 && (
              <p className="text-sm text-gray-500">Also known as: {peptide.aliases.join(", ")}</p>
            )}
          </div>
        </div>
        <p className="text-gray-600 mt-4 leading-relaxed">{peptide.detailedDescription}</p>
      </div>

      {/* Research & Safety Scores */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              Research Score
            </span>
            <span className="text-sm font-bold text-gray-900">{peptide.researchScore}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={cn("h-2.5 rounded-full",
                peptide.researchScore >= 8 ? "bg-green-500" :
                peptide.researchScore >= 6 ? "bg-blue-500" : "bg-amber-500"
              )}
              style={{ width: `${peptide.researchScore * 10}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {peptide.researchScore >= 8 ? "Extensive clinical evidence" :
             peptide.researchScore >= 6 ? "Growing body of research" : "Limited clinical data"}
          </p>
        </div>
        <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Safety Score
            </span>
            <span className="text-sm font-bold text-gray-900">{peptide.safetyScore}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={cn("h-2.5 rounded-full",
                peptide.safetyScore >= 8 ? "bg-green-500" :
                peptide.safetyScore >= 6 ? "bg-blue-500" : "bg-amber-500"
              )}
              style={{ width: `${peptide.safetyScore * 10}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {peptide.safetyScore >= 8 ? "Well-tolerated with minimal side effects" :
             peptide.safetyScore >= 6 ? "Generally safe with some considerations" : "Requires careful monitoring"}
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" /> Key Benefits
        </h2>
        <ul className="space-y-2">
          {peptide.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dosage & Administration */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Pill className="h-5 w-5 text-blue-600" /> Dosage & Administration
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Typical Dosage</div>
            <div className="font-medium text-gray-700">{peptide.typicalDosage}</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Cycle Length</div>
            <div className="font-medium text-gray-700">{peptide.cycleLength}</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 sm:col-span-2">
            <div className="text-sm text-gray-500 mb-1">Administration Routes</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {peptide.administrationRoutes.map((route) => (
                <span key={route} className="px-2 py-1 text-sm rounded-lg bg-white border border-gray-200 text-gray-700 capitalize">
                  {route}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Safety */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-amber-700" /> Safety Information
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Possible Side Effects</h3>
            <div className="flex flex-wrap gap-2">
              {peptide.sideEffects.map((se) => (
                <span key={se} className="text-sm px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                  {se}
                </span>
              ))}
            </div>
          </div>
          {peptide.contraindications.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Contraindications</h3>
              <div className="flex flex-wrap gap-2">
                {peptide.contraindications.map((ci) => (
                  <span key={ci} className="text-sm px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200">
                    {ci}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dr. Taylor's 2 Cents */}
      <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
            PT
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Dr. Taylor&apos;s 2 Cents</h2>
              <Quote className="h-4 w-4 text-blue-600" />
            </div>
            <p className="text-gray-700 leading-relaxed italic">&ldquo;{peptide.drTaylorNote}&rdquo;</p>
            <a
              href="https://tinyurl.com/drtaylorfreeconsult"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-500 font-medium mt-3"
            >
              Discuss with Dr. Taylor &rarr;
            </a>
          </div>
        </div>
      </div>

      {/* Research References */}
      {peptide.references && peptide.references.length > 0 && (
        <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" /> Published Research
          </h2>
          <div className="space-y-4">
            {peptide.references.map((ref, idx) => (
              <div key={ref.id} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{ref.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {ref.authors} &middot; <em>{ref.journal}</em> ({ref.year})
                    </p>
                    <p className="text-sm text-gray-700 mt-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                      <span className="font-medium text-blue-600">Key Finding:</span> {ref.finding}
                    </p>
                    <div className="flex gap-3 mt-2">
                      {ref.pmid && (
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-500 font-medium"
                        >
                          PubMed &rarr;
                        </a>
                      )}
                      {ref.doi && (
                        <a
                          href={`https://doi.org/${ref.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-500 font-medium"
                        >
                          DOI &rarr;
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Peptides */}
      {relatedPeptides.length > 0 && (
        <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Peptides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedPeptides.map((rp) => rp && (
              <Link
                key={rp.id}
                href={`/peptides/${rp.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-blue-300 transition-all"
              >
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <FlaskConical className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 text-sm">{rp.name}</div>
                  <div className={cn("text-xs", getCategoryColor(rp.category).split(" ")[1])}>
                    {getCategoryLabel(rp.category)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Consult CTA */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 mb-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Want personalized guidance?</h3>
        <p className="text-sm text-gray-600 mb-4">
          Consult with Dr. Patrick Taylor for a comprehensive evaluation and personalized protocol.
        </p>
        <a
          href="https://tinyurl.com/drtaylorfreeconsult"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
        >
          Book a Consultation
        </a>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes
            only and is not medical advice. Consult a healthcare provider before starting any
            peptide protocol.
          </p>
        </div>
      </div>
    </div>
  );
}
