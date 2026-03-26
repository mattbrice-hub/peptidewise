import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, FlaskConical } from "lucide-react";
import { articles } from "@/data/articles";
import { peptides } from "@/data/peptides";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: `${article.title} - PeptideWise`,
    description: article.excerpt,
  };
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
      <Link
        href="/learn"
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-400 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Articles
      </Link>

      <article>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full capitalize",
              article.category === "guide" ? "bg-blue-900/30 text-blue-400" :
              article.category === "research" ? "bg-green-900/30 text-green-400" :
              article.category === "safety" ? "bg-amber-900/30 text-amber-400" :
              "bg-purple-900/30 text-purple-400"
            )}>
              {article.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {article.readingTime} min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-400">{article.excerpt}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-gray-300 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>
      </article>

      {/* References */}
      {article.references && article.references.length > 0 && (
        <div className="mt-10 pt-8 border-t border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary-400" /> Referenced Studies
          </h2>
          <div className="space-y-4">
            {article.references.map((ref, idx) => (
              <div key={ref.id} className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-900/50 text-primary-300 text-xs font-bold flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-200">{ref.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {ref.authors} &middot; <em>{ref.journal}</em> ({ref.year})
                    </p>
                    <p className="text-sm text-gray-300 mt-2 bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                      <span className="font-medium text-primary-400">Key Finding:</span> {ref.finding}
                    </p>
                    <div className="flex gap-3 mt-2">
                      {ref.pmid && (
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary-400 hover:text-primary-300 font-medium"
                        >
                          PubMed &rarr;
                        </a>
                      )}
                      {ref.doi && (
                        <a
                          href={`https://doi.org/${ref.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary-400 hover:text-primary-300 font-medium"
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
        <div className="mt-10 pt-8 border-t border-white/10">
          <h2 className="text-lg font-semibold text-white mb-4">Related Peptides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedPeptides.map((p) => p && (
              <Link
                key={p.id}
                href={`/peptides/${p.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-primary-500/30 transition-all"
              >
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <FlaskConical className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-200 text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.description.slice(0, 60)}...</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
