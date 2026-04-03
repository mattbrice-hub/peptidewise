"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Scale,
  Moon,
  Flame,
  Brain,
  Clock,
  Heart,
  Shield,
  FlaskConical,
} from "lucide-react";

const tabs = ["By Symptom", "By Peptide", "By Goal"] as const;
type Tab = (typeof tabs)[number];

const symptoms = [
  {
    label: "Weight Loss",
    icon: Scale,
    desc: "Peptides studied for metabolism and appetite regulation",
    symptoms: "difficulty-losing-weight,slow-metabolism",
  },
  {
    label: "Better Sleep",
    icon: Moon,
    desc: "Research on sleep quality and circadian support",
    symptoms: "poor-sleep-quality,difficulty-falling-asleep",
  },
  {
    label: "Joint Pain",
    icon: Flame,
    desc: "Tissue repair and anti-inflammatory peptides",
    symptoms: "joint-pain,chronic-inflammation",
  },
  {
    label: "Brain Fog",
    icon: Brain,
    desc: "Cognitive enhancement and neuroprotective research",
    symptoms: "brain-fog,poor-focus",
  },
  {
    label: "Anti-Aging",
    icon: Clock,
    desc: "Longevity, vitality, and cellular health peptides",
    symptoms: "premature-aging,declining-vitality",
  },
  {
    label: "Low Libido",
    icon: Heart,
    desc: "Hormonal balance and sexual health research",
    symptoms: "low-libido",
  },
];

const peptides = [
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
];

const goals = [
  { label: "Recovery", icon: Flame, desc: "Heal faster from injuries and surgery" },
  { label: "Weight", icon: Scale, desc: "Optimize metabolism and body composition" },
  { label: "Sleep", icon: Moon, desc: "Improve sleep quality and recovery" },
  { label: "Cognition", icon: Brain, desc: "Sharpen focus and mental clarity" },
  { label: "Longevity", icon: Clock, desc: "Support cellular health and vitality" },
  { label: "Immune", icon: Shield, desc: "Strengthen immune resilience" },
];

const CONSULT_URL = "https://tinyurl.com/drtaylorfreeconsult";

export default function ExploreTabbed() {
  const [active, setActive] = useState<Tab>("By Symptom");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-8 border-b border-border mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`pb-3 text-sm font-body font-medium transition-colors ${
              active === tab
                ? "border-b-2 border-accent text-accent font-semibold"
                : "text-muted hover:text-text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div
        className="transition-opacity duration-200"
        key={active}
      >
        {active === "By Symptom" && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {symptoms.map((s) => (
                <Link
                  key={s.label}
                  href={`/results?symptoms=${s.symptoms}&severity=moderate`}
                  className="group p-6 rounded-xl bg-warm-white shadow-warm border border-border hover:border-accent-light hover:-translate-y-0.5 hover:shadow-warm-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <s.icon className="h-5 w-5 text-surface" />
                    </div>
                    <h3 className="font-heading font-semibold text-base group-hover:text-accent transition-colors">
                      {s.label}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-muted">{s.desc}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/symptom-checker"
                className="inline-flex items-center gap-1 text-accent font-body font-medium text-sm hover:text-base"
              >
                View All Symptoms <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}

        {active === "By Peptide" && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {peptides.map((p) => (
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
                      <span
                        className={`font-body text-xs font-medium px-2 py-0.5 rounded-full ${p.catColor}`}
                      >
                        {p.cat}
                      </span>
                    </div>
                  </div>
                  <p className="font-body text-sm text-muted">{p.benefit}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/peptides"
                className="inline-flex items-center gap-1 text-accent font-body font-medium text-sm hover:text-base"
              >
                View All Peptides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}

        {active === "By Goal" && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((g) => (
                <Link
                  key={g.label}
                  href="/stacks"
                  className="group p-6 rounded-xl bg-warm-white shadow-warm border border-border hover:border-accent-light hover:-translate-y-0.5 hover:shadow-warm-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <g.icon className="h-5 w-5 text-surface" />
                    </div>
                    <h3 className="font-heading font-semibold text-base group-hover:text-accent transition-colors">
                      {g.label}
                    </h3>
                  </div>
                  <p className="font-body text-sm text-muted">{g.desc}</p>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/stacks"
                className="inline-flex items-center gap-1 text-accent font-body font-medium text-sm hover:text-base"
              >
                View All Protocols <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}

        {/* Inline CTA — appears in every tab */}
        <div className="mt-8 text-center">
          <span className="font-body text-sm text-muted">
            Want personalized guidance?{" "}
          </span>
          <a
            href={CONSULT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent font-body font-medium text-sm hover:text-accent-hover"
          >
            Consult Dr. Taylor <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
