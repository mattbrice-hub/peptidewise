import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Star, CheckCircle, Shield, Truck, Phone, ExternalLink,
  ThumbsUp, Clock
} from "lucide-react";
import { providers } from "@/data/providers";
import { reviews as allReviews } from "@/data/reviews";
import { formatPrice, cn } from "@/lib/utils";

export function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const provider = providers.find((p) => p.slug === params.slug);
  if (!provider) return { title: "Provider Not Found" };
  return {
    title: `${provider.name} Review: Pricing & Ratings - PeptideWise`,
    description: provider.description,
  };
}

export default function ProviderDetailPage({ params }: { params: { slug: string } }) {
  const provider = providers.find((p) => p.slug === params.slug);
  if (!provider) notFound();

  const providerReviews = allReviews.filter((r) => r.providerId === provider.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <Link
        href="/providers"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Providers
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl font-bold text-gray-600">{provider.name.charAt(0)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{provider.name}</h1>
              {provider.isVerified && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  <CheckCircle className="h-3 w-3" /> Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                <span className="font-semibold">{provider.overallRating}</span>
                <span className="text-gray-500">({provider.totalReviews} reviews)</span>
              </div>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">Est. {provider.established}</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{provider.location}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{provider.description}</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {provider.highlights.map((h) => (
            <span key={h} className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary-50 text-primary-700">
              {h}
            </span>
          ))}
        </div>

        {/* Quick info grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-gray-50 text-center">
            <Phone className="h-4 w-4 mx-auto text-gray-400 mb-1" />
            <div className="text-xs text-gray-500">Telehealth</div>
            <div className="text-sm font-medium">{provider.offersTelehealth ? "Yes" : "No"}</div>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 text-center">
            <Shield className="h-4 w-4 mx-auto text-gray-400 mb-1" />
            <div className="text-xs text-gray-500">Rx Required</div>
            <div className="text-sm font-medium">{provider.requiresPrescription ? "Yes" : "Varies"}</div>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 text-center">
            <Truck className="h-4 w-4 mx-auto text-gray-400 mb-1" />
            <div className="text-xs text-gray-500">Shipping</div>
            <div className="text-sm font-medium">{provider.shippingInfo}</div>
          </div>
          <div className="p-3 rounded-xl bg-gray-50 text-center">
            <Clock className="h-4 w-4 mx-auto text-gray-400 mb-1" />
            <div className="text-xs text-gray-500">Since</div>
            <div className="text-sm font-medium">{provider.established}</div>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Peptide Pricing</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-3 pr-4 text-sm font-medium text-gray-500">Peptide</th>
                <th className="py-3 pr-4 text-sm font-medium text-gray-500">Price</th>
                <th className="py-3 pr-4 text-sm font-medium text-gray-500">Unit</th>
                <th className="py-3 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {provider.peptidePricing.map((pp) => (
                <tr key={pp.peptideId} className="hover:bg-gray-50">
                  <td className="py-3 pr-4">
                    <Link
                      href={`/peptides/${pp.peptideId}`}
                      className="font-medium text-gray-900 hover:text-primary-600"
                    >
                      {pp.peptideName}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 font-semibold text-gray-900">
                    {formatPrice(pp.price)}
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-500">{pp.unit}</td>
                  <td className="py-3">
                    {pp.inStock ? (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">In Stock</span>
                    ) : (
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Out of Stock</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Reviews ({providerReviews.length})
        </h2>
        <div className="space-y-4">
          {providerReviews.map((review) => (
            <div key={review.id} className="p-4 rounded-xl bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          "h-4 w-4",
                          s <= review.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-sm text-gray-900">{review.author}</span>
                  {review.verified && (
                    <span className="text-xs text-green-600 flex items-center gap-0.5">
                      <CheckCircle className="h-3 w-3" /> Verified
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">{review.title}</h3>
              <p className="text-sm text-gray-600">{review.body}</p>
              {review.helpful > 0 && (
                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                  <ThumbsUp className="h-3 w-3" /> {review.helpful} found this helpful
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
