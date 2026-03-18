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
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Articles
      </Link>

      <article>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full capitalize",
              article.category === "guide" ? "bg-blue-100 text-blue-700" :
              article.category === "research" ? "bg-green-100 text-green-700" :
              article.category === "safety" ? "bg-amber-100 text-amber-700" :
              "bg-purple-100 text-purple-700"
            )}>
              {article.category}
            </span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {article.readingTime} min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600">{article.excerpt}</p>
        </div>

        <div className="prose prose-gray max-w-none">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </div>
      </article>

      {/* Related Peptides */}
      {relatedPeptides.length > 0 && (
        <div className="mt-10 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Peptides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedPeptides.map((p) => p && (
              <Link
                key={p.id}
                href={`/peptides/${p.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary-200 transition-all"
              >
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <FlaskConical className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{p.name}</div>
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
