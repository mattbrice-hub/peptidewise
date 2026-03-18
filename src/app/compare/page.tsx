"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Star, CheckCircle, X, ArrowRight } from "lucide-react";
import { providers } from "@/data/providers";
import { formatPrice, cn } from "@/lib/utils";

function CompareContent() {
  const searchParams = useSearchParams();
  const providerParam = searchParams.get("providers");
  const initialIds = providerParam?.split(",").filter(Boolean) || [];

  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);

  const selectedProviders = selectedIds
    .map((id) => providers.find((p) => p.id === id))
    .filter(Boolean);

  // Get all unique peptides across selected providers
  const allPeptides = [...new Set(
    selectedProviders.flatMap((p) => p!.peptidePricing.map((pp) => pp.peptideName))
  )].sort();

  const toggleProvider = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Compare Providers</h1>
      <p className="text-gray-600 mb-8">Select up to 3 providers to compare side-by-side.</p>

      {/* Provider selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {providers.map((prov) => (
          <button
            key={prov.id}
            onClick={() => toggleProvider(prov.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-medium transition-all",
              selectedIds.includes(prov.id)
                ? "border-primary-600 bg-primary-50 text-primary-700"
                : "border-gray-200 text-gray-600 hover:border-gray-300",
              !selectedIds.includes(prov.id) && selectedIds.length >= 3 && "opacity-50 cursor-not-allowed"
            )}
            disabled={!selectedIds.includes(prov.id) && selectedIds.length >= 3}
          >
            {selectedIds.includes(prov.id) && <CheckCircle className="h-4 w-4" />}
            {prov.name}
          </button>
        ))}
      </div>

      {selectedProviders.length < 2 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">Select at least 2 providers to compare.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="p-4 text-left text-sm font-medium text-gray-500 min-w-[160px]">Feature</th>
                {selectedProviders.map((prov) => (
                  <th key={prov!.id} className="p-4 text-center min-w-[180px]">
                    <div className="font-semibold text-gray-900">{prov!.name}</div>
                    <div className="flex items-center justify-center gap-1 text-sm mt-1">
                      <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                      <span>{prov!.overallRating}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <tr>
                <td className="p-4 text-sm font-medium text-gray-700">Verified</td>
                {selectedProviders.map((prov) => (
                  <td key={prov!.id} className="p-4 text-center">
                    {prov!.isVerified ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-sm font-medium text-gray-700">Telehealth</td>
                {selectedProviders.map((prov) => (
                  <td key={prov!.id} className="p-4 text-center">
                    {prov!.offersTelehealth ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                    ) : (
                      <X className="h-5 w-5 text-gray-300 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-sm font-medium text-gray-700">Shipping</td>
                {selectedProviders.map((prov) => (
                  <td key={prov!.id} className="p-4 text-center text-sm text-gray-600">{prov!.shippingInfo}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 text-sm font-medium text-gray-700">Reviews</td>
                {selectedProviders.map((prov) => (
                  <td key={prov!.id} className="p-4 text-center text-sm text-gray-600">{prov!.totalReviews}</td>
                ))}
              </tr>
              {/* Peptide pricing rows */}
              <tr><td colSpan={selectedProviders.length + 1} className="p-4 bg-gray-50 text-sm font-semibold text-gray-700">Peptide Pricing</td></tr>
              {allPeptides.map((peptideName) => {
                const prices = selectedProviders.map((prov) => {
                  const pp = prov!.peptidePricing.find((p) => p.peptideName === peptideName);
                  return pp ? { price: pp.price, inStock: pp.inStock } : null;
                });
                const minPrice = Math.min(...prices.filter((p) => p?.inStock).map((p) => p!.price));
                return (
                  <tr key={peptideName}>
                    <td className="p-4 text-sm font-medium text-gray-700">{peptideName}</td>
                    {prices.map((priceInfo, i) => (
                      <td key={i} className="p-4 text-center">
                        {priceInfo ? (
                          <span className={cn(
                            "text-sm font-medium",
                            priceInfo.inStock && priceInfo.price === minPrice
                              ? "text-green-600 font-semibold"
                              : priceInfo.inStock ? "text-gray-900" : "text-gray-400 line-through"
                          )}>
                            {formatPrice(priceInfo.price)}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-300">N/A</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center"><div className="animate-pulse"><div className="h-8 bg-gray-200 rounded w-48 mx-auto" /></div></div>}>
      <CompareContent />
    </Suspense>
  );
}
