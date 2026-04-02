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
    description: `Dr. Patrick Taylor, MD explains: ${article.excerpt}`,
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
              article.category === "guide" ? "bg-card text-accent" :
              article.category === "research" ? "bg-[#e8efe3] text-[#4a5e3a]" :
              article.category === "safety" ? "bg-amber-50 text-amber-700" :
              "bg-purple-50 text-purple-600"
            )}>
              {article.category}
            </span>
            <span className="text-sm text-muted flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {article.readingTime} min read
            </span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-base mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-muted">{article.excerpt}</p>
        </div>

        <div className="prose max-w-none">
          {paragraphs.map((para, idx) => {
            if (para.startsWith("## ")) {
              return <h2 key={idx} className="font-heading text-2xl font-semibold text-base mt-10 mb-4">{para.slice(3)}</h2>;
            }
            if (para.startsWith("### ")) {
              return <h3 key={idx} className="font-heading text-xl font-semibold text-base mt-8 mb-3">{para.slice(4)}</h3>;
            }
            if (para.startsWith("- ")) {
              const items = para.split("\n").filter(Boolean);
              return (
                <ul key={idx} className="list-disc pl-6 mb-4 space-y-1">
                  {items.map((item, i) => (
                    <li key={i} className="font-body text-text-primary leading-[1.7]">{item.replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            }
            return <p key={idx} className="font-body text-text-primary leading-[1.7] mb-4">{para}</p>;
          })}
        </div>
      </article>

      {/* References */}
      {article.references && article.references.length > 0 && (
        <div className="mt-10 pt-8 border-t border-border">
          <h2 className="font-heading text-lg font-semibold text-base mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" /> Referenced Studies
          </h2>
          <div className="space-y-4">
            {article.references.map((ref, idx) => (
              <div key={ref.id} className="p-4 rounded-xl bg-card shadow-warm border border-border">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-card text-accent text-xs font-bold flex items-center justify-center mt-0.5 border border-border">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{ref.title}</p>
                    <p className="text-xs text-muted mt-1">
                      {ref.authors} &middot; <em>{ref.journal}</em> ({ref.year})
                    </p>
                    <p className="text-sm text-text-primary mt-2 bg-surface rounded-lg px-3 py-2 border border-border">
                      <span className="font-medium text-accent">Key Finding:</span> {ref.finding}
                    </p>
                    <div className="flex gap-3 mt-2">
                      {ref.pmid && (
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:text-accent-hover font-medium"
                        >
                          PubMed &rarr;
                        </a>
                      )}
                      {ref.doi && (
                        <a
                          href={`https://doi.org/${ref.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:text-accent-hover font-medium"
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
        <div className="mt-10 pt-8 border-t border-border">
          <h2 className="font-heading text-lg font-semibold text-base mb-4">Related Peptides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedPeptides.map((p) => p && (
              <Link
                key={p.id}
                href={`/peptides/${p.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <FlaskConical className="h-4 w-4 text-surface" />
                </div>
                <div>
                  <div className="font-medium text-text-primary text-sm">{p.name}</div>
                  <div className="text-xs text-muted">{p.description.slice(0, 60)}...</div>
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
          <div className="mt-10 pt-8 border-t border-border">
            <h2 className="font-heading text-lg font-semibold text-base mb-4">More from PeptideWise</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {otherArticles.map((a) => (
                <Link key={a.id} href={"/learn/" + a.slug} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent transition-all">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-surface" />
                  </div>
                  <div>
                    <div className="font-medium text-text-primary text-sm">{a.title}</div>
                    <div className="text-xs text-muted">{a.readingTime} min read</div>
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
