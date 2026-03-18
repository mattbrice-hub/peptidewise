import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FlaskConical, ArrowLeft, CheckCircle, AlertTriangle, BookOpen,
  Pill, Clock, ShieldCheck, ExternalLink, ArrowRight, Beaker
} from "lucide-react";
import { peptides } from "@/data/peptides";
import { providers } from "@/data/providers";
import { cn, formatPrice, getCategoryLabel, getCategoryColor } from "@/lib/utils";

export function generateStaticParams() {
  return peptides.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const peptide = peptides.find((p) => p.slug === params.slug);
  if (!peptide) return { title: "Peptide Not Found" };
  return {
    title: `${peptide.name}: Benefits, Dosage & Providers - PeptideWise`,
    description: peptide.description,
  };
}

export default function PeptideDetailPage({ params }: { params: { slug: string } }) {
  const peptide = peptides.find((p) => p.slug === params.slug);
  if (!peptide) notFound();

  const relatedPeptides = peptide.relatedPeptideIds
    .map((id) => peptides.find((p) => p.id === id))
    .filter(Boolean);

  const carryingProviders = providers.filter((prov) =>
    prov.peptidePricing.some((pp) => pp.peptideId === peptide.id && pp.inStock)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <Link
        href="/peptides"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Peptides
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
            <FlaskConical className="h-7 w-7 text-white" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", getCategoryColor(peptide.category))}>
                {getCategoryLabel(peptide.category)}
              </span>
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full",
                peptide.researchStatus === "well-studied" ? "bg-green-100 text-green-700" :
                peptide.researchStatus === "emerging" ? "bg-blue-100 text-blue-700" :
                "bg-gray-100 text-gray-600"
              )}>
                {peptide.researchStatus === "well-studied" ? "Well Studied" :
                 peptide.researchStatus === "emerging" ? "Emerging Research" : "Limited Research"}
              </span>
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full",
                peptide.legalStatus === "prescription" ? "bg-purple-100 text-purple-700" :
                peptide.legalStatus === "research-only" ? "bg-amber-100 text-amber-700" :
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

      {/* Benefits */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" /> Key Benefits
        </h2>
        <ul className="space-y-2">
          {peptide.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dosage & Administration */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Pill className="h-5 w-5 text-primary-600" /> Dosage & Administration
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gray-50">
            <div className="text-sm text-gray-500 mb-1">Typical Dosage</div>
            <div className="font-medium text-gray-900">{peptide.typicalDosage}</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50">
            <div className="text-sm text-gray-500 mb-1">Cycle Length</div>
            <div className="font-medium text-gray-900">{peptide.cycleLength}</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 sm:col-span-2">
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
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-amber-600" /> Safety Information
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
                  <span key={ci} className="text-sm px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200">
                    {ci}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Providers carrying this peptide */}
      {carryingProviders.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Beaker className="h-5 w-5 text-primary-600" /> Available From {carryingProviders.length} Provider{carryingProviders.length !== 1 ? "s" : ""}
          </h2>
          <div className="space-y-3">
            {carryingProviders.map((prov) => {
              const pricing = prov.peptidePricing.find((pp) => pp.peptideId === peptide.id);
              return (
                <Link
                  key={prov.id}
                  href={`/providers/${prov.slug}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-600">{prov.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{prov.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="flex items-center gap-0.5">★ {prov.overallRating}</span>
                        {prov.isVerified && <span className="text-green-600">Verified</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {pricing && (
                      <>
                        <div className="font-semibold text-gray-900">{formatPrice(pricing.price)}</div>
                        <div className="text-xs text-gray-500">{pricing.unit}</div>
                      </>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Related Peptides */}
      {relatedPeptides.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Peptides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedPeptides.map((rp) => rp && (
              <Link
                key={rp.id}
                href={`/peptides/${rp.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary-200 transition-all"
              >
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <FlaskConical className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{rp.name}</div>
                  <div className={cn("text-xs", getCategoryColor(rp.category).split(" ")[1])}>
                    {getCategoryLabel(rp.category)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes
            only and is not medical advice. Consult a healthcare provider before starting any
            peptide protocol.
          </p>
        </div>
      </div>
    </div>
  );
}
