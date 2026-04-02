import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Shield,
  FlaskConical,
  BookOpen,
  CheckCircle,
  Scale,
  Moon,
  Flame,
  Brain,
  Clock,
  Heart,
  GraduationCap,
  Stethoscope,
} from "lucide-react";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "PeptideWise — Evidence-Based Peptide Therapy Education",
  description:
    "Dr. Patrick Taylor, MD provides physician-curated peptide therapy education. Explore 15+ peptides, 99 PubMed studies, dosage guides, safety profiles, and personalized peptide protocols.",
  path: "/",
});

const quickSymptoms = [
  { label: "Weight Loss", icon: Scale, symptoms: "difficulty-losing-weight,slow-metabolism" },
  { label: "Better Sleep", icon: Moon, symptoms: "poor-sleep-quality,difficulty-falling-asleep" },
  { label: "Joint Pain", icon: Flame, symptoms: "joint-pain,chronic-inflammation" },
  { label: "Brain Fog", icon: Brain, symptoms: "brain-fog,poor-focus" },
  { label: "Anti-Aging", icon: Clock, symptoms: "premature-aging,declining-vitality" },
  { label: "Low Libido", icon: Heart, symptoms: "low-libido" },
];

const steps = [
  {
    num: "1",
    title: "Describe Your Symptoms",
    desc: "Select your health concerns from our guided symptom explorer.",
  },
  {
    num: "2",
    title: "Learn What Matches",
    desc: "Our engine identifies peptides that research suggests may help.",
  },
  {
    num: "3",
    title: "Read the Science",
    desc: "Dive into published research, dosing info, and safety profiles.",
  },
];

const stats = [
  { value: "15+", label: "Peptides Covered" },
  { value: "500+", label: "Research Citations" },
  { value: "9", label: "Symptom Categories" },
  { value: "MD", label: "Physician-Led" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-card/50 to-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left column */}
            <div className="animate-fade-in-up">
              <p className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-accent mb-4 animation-delay-100">
                Evidence-Based Peptide Education
              </p>
              <h1 className="font-heading text-4xl md:text-5xl font-semibold text-base leading-[1.1] tracking-tight mb-6 animation-delay-200">
                Understand Peptides with{" "}
                <span className="gradient-text">Science, Not Hype</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-muted mb-8 leading-relaxed animation-delay-300">
                Dr. Patrick Taylor, MD brings you physician-curated, research-backed
                education on peptide therapy. Explore the science, understand the
                evidence, and make informed decisions about your health.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-10 animation-delay-300">
                <Link
                  href="/symptom-checker"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-surface font-semibold transition-all shadow-warm"
                >
                  Explore by Symptoms
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/peptides"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-warm-white text-text-primary font-semibold border border-border hover:border-accent-light hover:bg-card transition-all"
                >
                  Browse All Peptides
                </Link>
              </div>

              {/* Quick symptom chips */}
              <div className="flex flex-wrap items-center gap-2 animation-delay-300">
                <span className="text-sm font-body text-muted mr-1">Quick start:</span>
                {quickSymptoms.map((s) => (
                  <Link
                    key={s.label}
                    href={`/results?symptoms=${s.symptoms}&severity=moderate`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-sm text-text-primary hover:border-accent hover:text-accent hover:bg-card transition-all"
                  >
                    <s.icon className="h-3.5 w-3.5" />
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right column — Dr. Taylor photo */}
            <div className="flex justify-center md:justify-end animate-fade-in-up animation-delay-200">
              <div className="relative">
                <Image
                  src="/images/dr-taylor.jpg"
                  alt="Dr. Patrick Taylor, MD — Family Medicine Physician"
                  width={420}
                  height={520}
                  className="rounded-xl border-4 border-card shadow-warm-lg object-cover w-full max-w-sm md:max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* About Dr. Taylor */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Image src="/images/dr-taylor.jpg" alt="Dr. Patrick Taylor, MD — Family Medicine Physician" width={112} height={112} className="w-28 h-28 rounded-full object-cover mb-6 shadow-warm-lg mx-auto border-4 border-card" />
            <h2 className="font-heading text-3xl font-semibold text-base mb-4">
              Led by Dr. Patrick Taylor, MD
            </h2>
            <p className="font-body text-text-primary leading-relaxed mb-4">
              Family medicine physician
              specializing in obesity and lifestyle medicine, chronic disease management,
              and sports medicine. A cancer and Cushing&apos;s syndrome survivor who lost over 100 lbs,
              Dr. Taylor founded{" "}
              <a href="https://tinyurl.com/drtaylorfreeconsult" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">
                Live Vital MD
              </a>{" "}
              to deliver proactive, optimization-focused healthcare.
            </p>
            <p className="font-body text-muted text-sm">
              UNC Chapel Hill School of Medicine &middot; University of Utah Family Medicine Residency
            </p>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold text-base mb-3">
              How PeptideWise Works
            </h2>
            <p className="font-body text-muted max-w-xl mx-auto">
              Three simple steps to learn about peptide therapy options.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative text-center p-6 rounded-xl bg-warm-white shadow-warm border border-border hover:-translate-y-0.5 hover:shadow-warm-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-surface font-bold text-lg mb-4">
                  {step.num}
                </div>
                <h3 className="font-heading text-lg font-semibold text-base mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-muted text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-3xl font-semibold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* Popular Peptides Preview */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-3xl font-semibold text-base mb-2">
                Popular Peptides
              </h2>
              <p className="font-body text-muted">
                The most researched therapeutic peptides in current literature.
              </p>
            </div>
            <Link
              href="/peptides"
              className="hidden md:inline-flex items-center gap-1 text-accent font-body font-medium text-sm hover:text-base"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "BPC-157",
                cat: "Tissue Repair",
                catColor: "bg-amber-50 text-amber-700",
                benefit: "Accelerates healing of gut, tendons, and ligaments",
                slug: "bpc-157",
              },
              {
                name: "Semaglutide",
                cat: "Weight Management",
                catColor: "bg-card text-text-primary",
                benefit: "GLP-1 receptor agonist for significant weight loss",
                slug: "semaglutide",
              },
              {
                name: "Sermorelin",
                cat: "Growth Hormone",
                catColor: "bg-card text-accent",
                benefit: "Stimulates natural growth hormone production",
                slug: "sermorelin",
              },
              {
                name: "TB-500",
                cat: "Tissue Repair",
                catColor: "bg-amber-50 text-amber-700",
                benefit: "Enhances tissue regeneration and wound healing",
                slug: "tb-500",
              },
              {
                name: "Tirzepatide",
                cat: "Weight Management",
                catColor: "bg-card text-text-primary",
                benefit: "Dual GIP/GLP-1 agonist for weight and blood sugar",
                slug: "tirzepatide",
              },
              {
                name: "GHK-Cu",
                cat: "Skin & Hair",
                catColor: "bg-amber-50 text-amber-700",
                benefit: "Copper peptide for skin rejuvenation and hair growth",
                slug: "ghk-cu",
              },
            ].map((p) => (
              <Link
                key={p.slug}
                href={`/peptides/${p.slug}`}
                className="group p-6 rounded-xl bg-warm-white shadow-warm border border-border hover:border-accent-light hover:-translate-y-0.5 hover:shadow-warm-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <FlaskConical className="h-5 w-5 text-surface" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-base group-hover:text-accent transition-colors">
                      {p.name}
                    </h3>
                    <span className={`font-body text-xs font-medium px-2 py-0.5 rounded-full ${p.catColor}`}>
                      {p.cat}
                    </span>
                  </div>
                </div>
                <p className="font-body text-sm text-muted">{p.benefit}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/peptides"
              className="inline-flex items-center gap-1 text-accent font-body font-medium text-sm"
            >
              View All Peptides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* Personalized Protocols CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-warm-white shadow-warm border border-border p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card text-accent-light text-sm font-body font-medium mb-4 border border-border">
                <Stethoscope className="h-4 w-4 text-accent" />
                Physician-Curated
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-base mb-3">
                Get a Personalized Protocol
              </h2>
              <p className="font-body text-text-primary mb-6">
                Answer a few questions about your body and health goals, and
                Dr. Taylor will match you with a personalized peptide protocol
                designed specifically for your profile.
              </p>
              <Link
                href="/stacks"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-surface font-semibold transition-all shadow-warm"
              >
                Find Your Protocol <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="flex-shrink-0 grid grid-cols-3 gap-3">
              {[
                { label: "Recovery", icon: Flame },
                { label: "Weight", icon: Scale },
                { label: "Sleep", icon: Moon },
                { label: "Cognition", icon: Brain },
                { label: "Longevity", icon: Clock },
                { label: "Immune", icon: Shield },
              ].map((item) => (
                <div
                  key={item.label}
                  className="w-20 h-20 rounded-xl bg-surface border border-border flex flex-col items-center justify-center gap-1"
                >
                  <item.icon className="h-5 w-5 text-accent" />
                  <span className="font-body text-[10px] text-muted font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* Trust / Why PeptideWise */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold text-base mb-3">
              Why Trust PeptideWise?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Stethoscope,
                title: "Physician-Led",
                desc: "Content created and reviewed by Dr. Patrick Taylor, a practicing MD.",
              },
              {
                icon: BookOpen,
                title: "Research-Backed",
                desc: "Every peptide profile includes published studies with PubMed citations.",
              },
              {
                icon: CheckCircle,
                title: "Evidence-Based",
                desc: "Clear distinction between well-studied peptides and emerging research.",
              },
              {
                icon: GraduationCap,
                title: "Purely Educational",
                desc: "We don't sell peptides. Our only goal is helping you learn and understand.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-card mb-4">
                  <item.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-base mb-2">{item.title}</h3>
                <p className="font-body text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-base p-10 md:p-16 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-surface mb-4">
              Ready to Learn About Peptide Therapy?
            </h2>
            <p className="font-body text-lg text-surface/70 mb-8 max-w-2xl mx-auto">
              Use our educational symptom explorer to discover which peptides
              researchers are studying for your health concerns.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/symptom-checker"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-warm-white text-base font-semibold hover:bg-card transition-colors shadow-warm"
              >
                Start Learning
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://tinyurl.com/drtaylorfreeconsult"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-surface font-semibold hover:bg-white/20 transition-colors border border-surface/20"
              >
                Consult Dr. Taylor
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
