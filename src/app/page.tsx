import Link from "next/link";
import {
  ArrowRight,
  Shield,
  FlaskConical,
  Users,
  Star,
  CheckCircle,
  Scale,
  Moon,
  Flame,
  Brain,
  Clock,
  Heart,
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
    desc: "Select your health concerns from our guided symptom checker.",
  },
  {
    num: "2",
    title: "Get Recommendations",
    desc: "Our engine matches your symptoms with the most effective peptides.",
  },
  {
    num: "3",
    title: "Compare Providers",
    desc: "Find trusted providers with transparent pricing and real reviews.",
  },
];

const stats = [
  { value: "15+", label: "Peptides Reviewed" },
  { value: "7", label: "Verified Providers" },
  { value: "500+", label: "Research Articles" },
  { value: "4.6", label: "Avg Provider Rating" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium mb-6">
              <FlaskConical className="h-4 w-4" />
              Evidence-Based Peptide Guidance
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Find the Right Peptides for{" "}
              <span className="gradient-text">Your Health Goals</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Tell us your symptoms and we&apos;ll recommend the best peptide
              combinations. Then compare trusted providers with transparent
              pricing and verified reviews.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="/symptom-checker"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/25 hover:shadow-xl hover:shadow-primary-600/30"
              >
                Start Symptom Checker
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/peptides"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-700 font-semibold border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 text-sm text-gray-600 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 transition-all"
                >
                  <s.icon className="h-3.5 w-3.5" />
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              How PeptideWise Works
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Three simple steps to find the right peptide therapy for you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="relative text-center p-6 rounded-2xl bg-gray-50 border border-gray-100"
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
                <div className="text-3xl font-bold text-primary-600 mb-1">
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
                The most researched and requested peptide therapies.
              </p>
            </div>
            <Link
              href="/peptides"
              className="hidden md:inline-flex items-center gap-1 text-primary-600 font-medium text-sm hover:text-primary-700"
            >
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "BPC-157",
                cat: "Tissue Repair",
                catColor: "bg-orange-100 text-orange-700",
                benefit: "Accelerates healing of gut, tendons, and ligaments",
                slug: "bpc-157",
              },
              {
                name: "Semaglutide",
                cat: "Weight Management",
                catColor: "bg-green-100 text-green-700",
                benefit: "GLP-1 receptor agonist for significant weight loss",
                slug: "semaglutide",
              },
              {
                name: "Sermorelin",
                cat: "Growth Hormone",
                catColor: "bg-blue-100 text-blue-700",
                benefit: "Stimulates natural growth hormone production",
                slug: "sermorelin",
              },
              {
                name: "TB-500",
                cat: "Tissue Repair",
                catColor: "bg-orange-100 text-orange-700",
                benefit: "Enhances tissue regeneration and wound healing",
                slug: "tb-500",
              },
              {
                name: "Tirzepatide",
                cat: "Weight Management",
                catColor: "bg-green-100 text-green-700",
                benefit: "Dual GIP/GLP-1 agonist for weight and blood sugar",
                slug: "tirzepatide",
              },
              {
                name: "GHK-Cu",
                cat: "Skin & Hair",
                catColor: "bg-amber-100 text-amber-700",
                benefit: "Copper peptide for skin rejuvenation and hair growth",
                slug: "ghk-cu",
              },
            ].map((p) => (
              <Link
                key={p.slug}
                href={`/peptides/${p.slug}`}
                className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-600/5 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                    <FlaskConical className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
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
              className="inline-flex items-center gap-1 text-primary-600 font-medium text-sm"
            >
              View All Peptides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / Why PeptideWise */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Trust PeptideWise?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Verified Providers",
                desc: "We vet every provider for licensing, sourcing, and third-party testing.",
              },
              {
                icon: Star,
                title: "Real Reviews",
                desc: "Honest reviews from real patients, not sponsored testimonials.",
              },
              {
                icon: CheckCircle,
                title: "Evidence-Based",
                desc: "Recommendations backed by published research and clinical data.",
              },
              {
                icon: Users,
                title: "No Bias",
                desc: "We don't sell peptides. Our only goal is helping you find the best option.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 mb-4">
                  <item.icon className="h-6 w-6 text-primary-600" />
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
              Ready to Find Your Peptide Match?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Take our free symptom assessment and get personalized peptide
              recommendations in under 2 minutes.
            </p>
            <Link
              href="/symptom-checker"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-700 font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Start Free Assessment
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
