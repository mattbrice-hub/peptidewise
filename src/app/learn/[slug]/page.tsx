import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, FlaskConical } from "lucide-react";
import { articles } from "@/data/articles";
import { peptides } from "@/data/peptides";
import { cn } from "@/lib/utils";
import { buildMeta, PRODUCTION_DOMAIN } from "@/lib/seo";
import JsonLd, { articleSchema } from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found" };
  return buildMeta({
    title: article.title,
    description: article.excerpt,
    path: "/learn/" + article.slug,
    ogType: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.modifiedDate,
  });
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const relatedPeptides = article.peptideIds
    .map((id) => peptides.find((p) => p.id === id))
    .filter(Boolean);

  const paragraphs = article.content.split("\n\n").filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Learn", href: "/learn" },
          { label: article.title, href: "/learn/" + article.slug },
        ]}
      />

      <JsonLd
        data={articleSchema({
          headline: article.title,
          description: article.excerpt,
          url: PRODUCTION_DOMAIN + "/learn/" + article.slug,
          datePublished: article.publishedAt,
          dateModified: article.modifiedDate,
        })}
      />

      <article>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full capitalize",
              article.category === "guide" ? "bg-blue-50 text-blue-600" :
              article.category === "research" ? "bg-green-50 text-green-600" :
              article.category === "safety" ? "bg-amber-50 text-amber-700" :
              "bg-purple-50 text-purple-600"
            )}>
              {article.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {article.readingTime} min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600">{article.excerpt}</p>
        </div>

        <div className="prose max-w-none">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>
      </article>

      {/* References */}
      {article.references && article.references.length > 0 && (
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" /> Referenced Studies
          </h2>
          <div className="space-y-4">
            {article.references.map((ref, idx) => (
              <div key={ref.id} className="p-4 rounded-xl bg-white shadow-sm border border-gray-200">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-500 text-xs font-bold flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{ref.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {ref.authors} &middot; <em>{ref.journal}</em> ({ref.year})
                    </p>
                    <p className="text-sm text-gray-700 mt-2 bg-gray-100 rounded-lg px-3 py-2 border border-gray-200">
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
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Peptides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedPeptides.map((p) => p && (
              <Link
                key={p.id}
                href={`/peptides/${p.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-blue-300 transition-all"
              >
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <FlaskConical className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-700 text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.description.slice(0, 60)}...</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Reading */}
      {(() => {
        const otherArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 3);
        if (otherArticles.length === 0) return null;
        return (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">More from PeptideWise</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {otherArticles.map((a) => (
                <Link key={a.id} href={"/learn/" + a.slug} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-blue-300 transition-all">
                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 text-sm">{a.title}</div>
                    <div className="text-xs text-gray-500">{a.readingTime} min read</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
