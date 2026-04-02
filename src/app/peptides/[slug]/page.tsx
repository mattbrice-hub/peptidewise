import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FlaskConical, CheckCircle, AlertTriangle, BookOpen,
  Pill, Clock, ShieldCheck, Beaker, TrendingUp, Scale, Activity,
  Hourglass, Brain, Shield, Heart, Moon, Sparkles, Quote,
  ChevronDown
} from "lucide-react";
import { peptides } from "@/data/peptides";
import { articles } from "@/data/articles";
import { stacks } from "@/data/stacks";
import { cn, getCategoryLabel, getCategoryColor } from "@/lib/utils";
import { buildMeta, PRODUCTION_DOMAIN } from "@/lib/seo";
import JsonLd, { medicalWebPageSchema, faqSchema } from "@/components/JsonLd";
import Breadcrumbs from "@/components/Breadcrumbs";

export function generateStaticParams() {
  return peptides.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const peptide = peptides.find((p) => p.slug === params.slug);
  if (!peptide) return { title: "Peptide Not Found" };
  return buildMeta({
    title: `${peptide.name}: Benefits, Dosage & Research`,
    description: `Dr. Patrick Taylor, MD reviews ${peptide.name} — ${peptide.description} Evidence-based dosage, safety profile, and published research.`,
    path: `/peptides/${peptide.slug}`,
    modifiedTime: peptide.lastUpdated,
  });
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

  const relatedStacks = stacks.filter((s) =>
    s.peptideIds.includes(peptide.id)
  );

  const relatedArticles = articles.filter(
    (a) =>
      a.content.toLowerCase().includes(peptide.name.toLowerCase()) ||
      a.title.toLowerCase().includes(peptide.name.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* JSON-LD */}
      <JsonLd
        data={medicalWebPageSchema({
          name: `${peptide.name}: Benefits, Dosage & Research`,
          description: peptide.description,
          url: `${PRODUCTION_DOMAIN}/peptides/${peptide.slug}`,
          lastReviewed: peptide.lastUpdated,
        })}
      />
      {peptide.faqs && peptide.faqs.length > 0 && (
        <JsonLd data={faqSchema(peptide.faqs)} />
      )}

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Peptides", href: "/peptides" },
          { label: peptide.name, href: `/peptides/${peptide.slug}` },
        ]}
      />

      {/* Header */}
      <div className="bg-card shadow-warm rounded-xl border border-border p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
            {(() => { const Icon = categoryIcons[peptide.category] || FlaskConical; return <Icon className="h-7 w-7 text-surface" />; })()}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", getCategoryColor(peptide.category))}>
                {getCategoryLabel(peptide.category)}
              </span>
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full",
                peptide.researchStatus === "well-studied" ? "bg-[#e8efe3] text-[#4a5e3a]" :
                peptide.researchStatus === "emerging" ? "bg-card text-accent" :
                "bg-card text-muted"
              )}>
                {peptide.researchStatus === "well-studied" ? "Well Studied" :
                 peptide.researchStatus === "emerging" ? "Emerging Research" : "Limited Research"}
              </span>
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full",
                peptide.legalStatus === "prescription" ? "bg-purple-50 text-purple-600" :
                peptide.legalStatus === "research-only" ? "bg-card text-accent" :
                "bg-card text-muted"
              )}>
                {peptide.legalStatus === "prescription" ? "Prescription" :
                 peptide.legalStatus === "research-only" ? "Research Only" : "Supplement"}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-base mb-1">{peptide.name}</h1>
            {peptide.aliases.length > 0 && (
              <p className="text-sm text-muted">Also known as: {peptide.aliases.join(", ")}</p>
            )}
          </div>
        </div>
        <p className="text-text-primary font-body mt-4 leading-relaxed">{peptide.detailedDescription}</p>
      </div>

      {/* Research & Safety Scores */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-card shadow-warm rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent" />
              Research Score
            </span>
            <span className="text-sm font-bold text-base">{peptide.researchScore}/10</span>
          </div>
          <div className="w-full bg-border rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full bg-accent"
              style={{ width: `${peptide.researchScore * 10}%` }}
            />
          </div>
          <p className="text-xs text-muted mt-2">
            {peptide.researchScore >= 8 ? "Extensive clinical evidence" :
             peptide.researchScore >= 6 ? "Growing body of research" : "Limited clinical data"}
          </p>
        </div>
        <div className="bg-card shadow-warm rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Safety Score
            </span>
            <span className="text-sm font-bold text-base">{peptide.safetyScore}/10</span>
          </div>
          <div className="w-full bg-border rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full bg-accent"
              style={{ width: `${peptide.safetyScore * 10}%` }}
            />
          </div>
          <p className="text-xs text-muted mt-2">
            {peptide.safetyScore >= 8 ? "Well-tolerated with minimal side effects" :
             peptide.safetyScore >= 6 ? "Generally safe with some considerations" : "Requires careful monitoring"}
          </p>
        </div>
      </div>

      {/* Mechanism of Action */}
      {peptide.mechanismOfAction && (
        <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6">
          <h2 className="font-heading text-2xl font-semibold text-base mb-1 flex items-center gap-2">
            <Beaker className="h-5 w-5 text-accent" /> How It Works
          </h2>
          <div className="h-px bg-gradient-to-r from-accent-light/40 to-transparent mt-2 mb-4" />
          <p className="text-text-primary font-body leading-relaxed">{peptide.mechanismOfAction}</p>
        </div>
      )}

      {/* Benefits */}
      <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6">
        <h2 className="font-heading text-2xl font-semibold text-base mb-1 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-accent" /> Key Benefits
        </h2>
        <div className="h-px bg-gradient-to-r from-accent-light/40 to-transparent mt-2 mb-4" />
        <ul className="space-y-2">
          {peptide.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-text-primary font-body">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Who May Benefit */}
      {peptide.whoMayBenefit && peptide.whoMayBenefit.length > 0 && (
        <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6">
          <h2 className="font-heading text-2xl font-semibold text-base mb-1 flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent" /> Who May Benefit
          </h2>
          <div className="h-px bg-gradient-to-r from-accent-light/40 to-transparent mt-2 mb-4" />
          <ul className="space-y-2">
            {peptide.whoMayBenefit.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-text-primary font-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dosage & Administration */}
      <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6">
        <h2 className="font-heading text-2xl font-semibold text-base mb-1 flex items-center gap-2">
          <Pill className="h-5 w-5 text-accent" /> Dosage & Administration
        </h2>
        <div className="h-px bg-gradient-to-r from-accent-light/40 to-transparent mt-2 mb-4" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface border border-border">
            <div className="text-sm text-muted mb-1">Typical Dosage</div>
            <div className="font-medium text-text-primary">{peptide.typicalDosage}</div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border">
            <div className="text-sm text-muted mb-1">Cycle Length</div>
            <div className="font-medium text-text-primary">{peptide.cycleLength}</div>
          </div>
          <div className="p-4 rounded-xl bg-surface border border-border sm:col-span-2">
            <div className="text-sm text-muted mb-1">Administration Routes</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {peptide.administrationRoutes.map((route) => (
                <span key={route} className="px-2 py-1 text-sm rounded-lg bg-warm-white border border-border text-text-primary capitalize">
                  {route}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {peptide.timeline && (
        <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6">
          <h2 className="font-heading text-2xl font-semibold text-base mb-1 flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" /> Expected Timeline
          </h2>
          <div className="h-px bg-gradient-to-r from-accent-light/40 to-transparent mt-2 mb-4" />
          <p className="text-text-primary font-body leading-relaxed">{peptide.timeline}</p>
        </div>
      )}

      {/* Safety */}
      <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6">
        <h2 className="font-heading text-2xl font-semibold text-base mb-1 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-accent" /> Safety Information
        </h2>
        <div className="h-px bg-gradient-to-r from-accent-light/40 to-transparent mt-2 mb-4" />
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">Possible Side Effects</h3>
            <div className="flex flex-wrap gap-2">
              {peptide.sideEffects.map((se) => (
                <span key={se} className="text-sm px-2.5 py-1 rounded-lg bg-card text-accent border border-border">
                  {se}
                </span>
              ))}
            </div>
          </div>
          {peptide.contraindications.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-text-primary mb-2">Contraindications</h3>
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

      {/* Dr. Taylor's 2 Cents — pull-quote style */}
      <div className="border-l-4 border-accent pl-6 py-4 my-8 bg-card/50 rounded-r-lg">
        <div className="flex items-center gap-3 mb-3">
          <Image
            src="/images/dr-taylor.jpg"
            alt="Dr. Patrick Taylor, MD"
            width={40}
            height={40}
            className="flex-shrink-0 rounded-full object-cover"
          />
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg font-semibold text-base">Dr. Taylor&apos;s 2 Cents</h2>
            <Quote className="h-4 w-4 text-accent" />
          </div>
        </div>
        <p className="font-heading text-lg italic text-text-primary leading-relaxed">&ldquo;{peptide.drTaylorNote}&rdquo;</p>
        <p className="font-body text-sm text-muted mt-3">— Dr. Patrick Taylor, MD</p>
        <a
          href="https://tinyurl.com/drtaylorfreeconsult"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-accent hover:text-base font-medium mt-3"
        >
          Discuss with Dr. Taylor &rarr;
        </a>
      </div>

      {/* FAQ Accordion */}
      {peptide.faqs && peptide.faqs.length > 0 && (
        <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6">
          <h2 className="font-heading text-2xl font-semibold text-base mb-1 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" /> Frequently Asked Questions
          </h2>
          <div className="h-px bg-gradient-to-r from-accent-light/40 to-transparent mt-2 mb-4" />
          <div className="space-y-2">
            {peptide.faqs.map((faq, idx) => (
              <details key={idx} className="group bg-card rounded-xl border border-border overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-surface transition-colors">
                  <span className="text-sm font-medium text-base pr-4">{faq.question}</span>
                  <ChevronDown className="h-4 w-4 text-muted flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-4 pb-4 text-sm text-text-primary font-body leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Research References */}
      {peptide.references && peptide.references.length > 0 && (
        <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6">
          <h2 className="font-heading text-2xl font-semibold text-base mb-1 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-accent" /> Published Research
          </h2>
          <div className="h-px bg-gradient-to-r from-accent-light/40 to-transparent mt-2 mb-4" />
          <div className="space-y-4">
            {peptide.references.map((ref, idx) => (
              <div key={ref.id} className="p-4 rounded-xl bg-surface border border-border">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-card text-accent text-xs font-bold flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{ref.title}</p>
                    <p className="text-xs text-muted mt-1">
                      {ref.authors} &middot; <em>{ref.journal}</em> ({ref.year})
                    </p>
                    <p className="text-sm text-text-primary mt-2 bg-warm-white rounded-lg px-3 py-2 border border-border">
                      <span className="font-medium text-accent">Key Finding:</span> {ref.finding}
                    </p>
                    <div className="flex gap-3 mt-2">
                      {ref.pmid && (
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${ref.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:text-base font-medium"
                        >
                          PubMed &rarr;
                        </a>
                      )}
                      {ref.doi && (
                        <a
                          href={`https://doi.org/${ref.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-accent hover:text-base font-medium"
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

      {/* Related Protocols */}
      {relatedStacks.length > 0 && (
        <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6">
          <h2 className="font-heading text-2xl font-semibold text-base mb-4">Protocols Featuring {peptide.name}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedStacks.map((stack) => (
              <Link
                key={stack.id}
                href="/stacks"
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent-light transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <FlaskConical className="h-4 w-4 text-surface" />
                </div>
                <div>
                  <div className="font-medium text-text-primary text-sm">{stack.name}</div>
                  <div className="text-xs text-muted">{stack.subtitle}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Peptides */}
      {relatedPeptides.length > 0 && (
        <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6">
          <h2 className="font-heading text-2xl font-semibold text-base mb-4">Related Peptides</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {relatedPeptides.map((rp) => rp && (
              <Link
                key={rp.id}
                href={`/peptides/${rp.slug}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-accent-light transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <FlaskConical className="h-4 w-4 text-surface" />
                </div>
                <div>
                  <div className="font-medium text-text-primary text-sm">{rp.name}</div>
                  <div className={cn("text-xs", getCategoryColor(rp.category).split(" ")[1])}>
                    {getCategoryLabel(rp.category)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Reading */}
      {relatedArticles.length > 0 && (
        <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6">
          <h2 className="font-heading text-2xl font-semibold text-base mb-4">Related Reading</h2>
          <div className="space-y-3">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/learn/${article.slug}`}
                className="block p-3 rounded-xl border border-border hover:border-accent-light transition-all"
              >
                <div className="font-medium text-text-primary text-sm">{article.title}</div>
                <div className="text-xs text-muted mt-1">{article.excerpt}</div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Consult CTA */}
      <div className="bg-card shadow-warm rounded-xl border border-border p-6 mb-6 text-center">
        <h2 className="font-heading text-2xl font-semibold text-base mb-2">Want personalized guidance?</h2>
        <p className="text-sm text-muted font-body mb-4">
          Consult with Dr. Patrick Taylor for a comprehensive evaluation and personalized protocol.
        </p>
        <a
          href="https://tinyurl.com/drtaylorfreeconsult"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-surface font-medium transition-colors"
        >
          Book a Consultation
        </a>
      </div>

      {/* Disclaimer */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-text-primary">
            <strong>Medical Disclaimer:</strong> This information is for educational purposes
            only and is not medical advice. Consult a healthcare provider before starting any
            peptide protocol.
          </p>
        </div>
      </div>
    </div>
  );
}
