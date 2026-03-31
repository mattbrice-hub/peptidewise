import Link from "next/link";
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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-[0.05] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-6 border border-blue-200">
              <FlaskConical className="h-4 w-4" />
              Evidence-Based Peptide Education
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Understand Peptides with{" "}
              <span className="gradient-text">Science, Not Hype</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Dr. Patrick Taylor, MD brings you physician-curated, research-backed
              education on peptide therapy. Explore the science, understand the
              evidence, and make informed decisions about your health.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="/symptom-checker"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-all shadow-md"
              >
                Explore by Symptoms
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/peptides"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-600 font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                Browse All Peptides
              </Link>
            </div>

            {/* Quick symptom chips */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-gray-500 mr-1">Quick start:</span>
              {quickSymptoms.map((s) => (
                <Link
                  key={s.label}
                  href={`/results?symptoms=${s.symptoms}&severity=moderate`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Dr. Taylor */}
      <section className="py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-6">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Led by Dr. Patrick Taylor, MD
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Board-eligible family medicine physician
              specializing in obesity and lifestyle medicine, chronic disease management,
              and sports medicine. A cancer and Cushing&apos;s syndrome survivor who lost over 100 lbs,
              Dr. Taylor founded{" "}
              <a href="https://tinyurl.com/drtaylorfreeconsult" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                Live Vital MD
              </a>{" "}
              to deliver proactive, optimization-focused healthcare.
            </p>
            <p className="text-gray-500 text-sm">
              UNC Chapel Hill School of Medicine &middot; University of Utah Family Medicine Residency
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How PeptideWise Works
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Three simple steps to learn about peptide therapy options.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative text-center p-6 rounded-2xl bg-white shadow-sm border border-gray-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full gradient-primary text-white font-bold text-lg mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Peptides Preview */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Popular Peptides
              </h2>
              <p className="text-gray-600">
                The most researched therapeutic peptides in current literature.
              </p>
            </div>
            <Link
              href="/peptides"
              className="hidden md:inline-flex items-center gap-1 text-blue-600 font-medium text-sm hover:text-blue-500"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "BPC-157",
                cat: "Tissue Repair",
                catColor: "bg-orange-50 text-orange-600",
                benefit: "Accelerates healing of gut, tendons, and ligaments",
                slug: "bpc-157",
              },
              {
                name: "Semaglutide",
                cat: "Weight Management",
                catColor: "bg-green-50 text-green-600",
                benefit: "GLP-1 receptor agonist for significant weight loss",
                slug: "semaglutide",
              },
              {
                name: "Sermorelin",
                cat: "Growth Hormone",
                catColor: "bg-blue-50 text-blue-600",
                benefit: "Stimulates natural growth hormone production",
                slug: "sermorelin",
              },
              {
                name: "TB-500",
                cat: "Tissue Repair",
                catColor: "bg-orange-50 text-orange-600",
                benefit: "Enhances tissue regeneration and wound healing",
                slug: "tb-500",
              },
              {
                name: "Tirzepatide",
                cat: "Weight Management",
                catColor: "bg-green-50 text-green-600",
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
                className="group p-6 rounded-2xl bg-white shadow-sm border border-gray-200 hover:border-blue-300 hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <FlaskConical className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.catColor}`}>
                      {p.cat}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{p.benefit}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link
              href="/peptides"
              className="inline-flex items-center gap-1 text-blue-600 font-medium text-sm"
            >
              View All Peptides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended Stacks CTA */}
      <section className="py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white shadow-sm border border-gray-200 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-4 border border-amber-200">
                <Stethoscope className="h-4 w-4" />
                Physician-Curated
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Dr. Taylor&apos;s Recommended Stacks
              </h2>
              <p className="text-gray-600 mb-6">
                Enter your age, gender, height, weight, and symptoms to see
                which peptide combinations Dr. Taylor recommends for your
                profile. Personalized, evidence-based stack suggestions.
              </p>
              <Link
                href="/stacks"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity shadow-md"
              >
                Find Your Stack <ArrowRight className="h-5 w-5" />
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
                  className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-center gap-1"
                >
                  <item.icon className="h-5 w-5 text-blue-600" />
                  <span className="text-[10px] text-gray-500 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Why PeptideWise */}
      <section className="py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 mb-4">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl gradient-primary p-10 md:p-16 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Learn About Peptide Therapy?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Use our educational symptom explorer to discover which peptides
              researchers are studying for your health concerns.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/symptom-checker"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-700 font-semibold hover:bg-gray-50 transition-colors shadow-lg"
              >
                Start Learning
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://tinyurl.com/drtaylorfreeconsult"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors border border-white/20"
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
