"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Star, CheckCircle, Shield, Truck, Phone, ExternalLink } from "lucide-react";
import { providers } from "@/data/providers";
import { peptides } from "@/data/peptides";
import { formatPrice } from "@/lib/utils";

function ProvidersContent() {
  const searchParams = useSearchParams();
  const peptideFilter = searchParams.get("peptide");

  let filtered = providers;
  if (peptideFilter) {
    filtered = providers.filter((prov) =>
      prov.peptidePricing.some((pp) => pp.peptideId === peptideFilter && pp.inStock)
    );
  }

  const filteredPeptide = peptideFilter ? peptides.find((p) => p.id === peptideFilter) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {filteredPeptide ? `Providers for ${filteredPeptide.name}` : "Find a Provider"}
        </h1>
        <p className="text-gray-600">
          Compare verified peptide providers with transparent pricing and real reviews.
        </p>
        {filteredPeptide && (
          <Link href="/providers" className="text-sm text-primary-600 hover:text-primary-700 mt-1 inline-block">
            View all providers &rarr;
          </Link>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((provider) => {
          const peptidePriceForFilter = peptideFilter
            ? provider.peptidePricing.find((pp) => pp.peptideId === peptideFilter)
            : null;
          return (
            <Link
              key={provider.id}
              href={`/providers/${provider.slug}`}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-primary-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">{provider.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {provider.name}
                      </h2>
                      {provider.isVerified && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium text-gray-900">{provider.overallRating}</span>
                      <span className="text-gray-500">({provider.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>
                {peptidePriceForFilter && (
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary-600">
                      {formatPrice(peptidePriceForFilter.price)}
                    </div>
                    <div className="text-xs text-gray-500">{peptidePriceForFilter.unit}</div>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{provider.description}</p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-4">
                {provider.highlights.slice(0, 4).map((h) => (
                  <span key={h} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                    {h}
                  </span>
                ))}
              </div>

              {/* Quick info */}
              <div className="flex items-center gap-4 text-xs text-gray-500">
                {provider.offersTelehealth && (
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> Telehealth</span>
                )}
                {provider.isVerified && (
                  <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> Verified</span>
                )}
                <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> {provider.shippingInfo}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function ProvidersPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center"><div className="animate-pulse"><div className="h-8 bg-gray-200 rounded w-48 mx-auto" /></div></div>}>
      <ProvidersContent />
    </Suspense>
  );
}
