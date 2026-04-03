# Homepage Design Refresh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add scroll animations, a testimonial section, tabbed exploration, and repeated CTAs to the PeptideWise homepage.

**Architecture:** CSS-only scroll animations via Intersection Observer hook. Two new components (ExploreTabbed, ScrollReveal wrapper). Homepage refactored to new section order with inline CTAs. No new dependencies.

**Tech Stack:** Next.js 14 App Router, React 18, Tailwind CSS, Lucide React, TypeScript

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `src/hooks/useScrollReveal.ts` | Create | Intersection Observer hook returning a ref |
| `src/components/ScrollReveal.tsx` | Create | Client wrapper component that applies the hook |
| `src/components/ExploreTabbed.tsx` | Create | Tabbed exploration with 3 panels (Symptom/Peptide/Goal) |
| `src/app/globals.css` | Modify | Add scroll-hidden/scroll-visible CSS utilities |
| `src/app/page.tsx` | Modify | Rewrite homepage with new sections, scroll animations, CTAs |

---

### Task 1: Scroll Animation CSS Utilities

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add scroll animation utilities to globals.css**

Add the following after the existing `.animation-delay-300` rule at the end of the file:

```css
.scroll-hidden {
  opacity: 0;
  transform: translateY(16px);
}

.scroll-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
```

- [ ] **Step 2: Verify the CSS file is valid**

Run: `cd /Users/mattbrice/peptidewise && npx next lint --file src/app/globals.css 2>&1 || echo "lint check done"`

- [ ] **Step 3: Commit**

```bash
cd /Users/mattbrice/peptidewise
git add src/app/globals.css
git commit -m "feat: add scroll-hidden/scroll-visible CSS utilities"
```

---

### Task 2: useScrollReveal Hook

**Files:**
- Create: `src/hooks/useScrollReveal.ts`

- [ ] **Step 1: Create the hook file**

Create `src/hooks/useScrollReveal.ts` with this content:

```typescript
"use client";

import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("scroll-hidden");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("scroll-hidden");
          el.classList.add("scroll-visible");
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/mattbrice/peptidewise
git add src/hooks/useScrollReveal.ts
git commit -m "feat: add useScrollReveal Intersection Observer hook"
```

---

### Task 3: ScrollReveal Wrapper Component

**Files:**
- Create: `src/components/ScrollReveal.tsx`

- [ ] **Step 1: Create the wrapper component**

This is a thin client component that wraps children with the scroll reveal ref. Needed because `page.tsx` is a Server Component and can't use hooks directly.

Create `src/components/ScrollReveal.tsx`:

```tsx
"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ReactNode } from "react";

export default function ScrollReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useScrollReveal();

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/mattbrice/peptidewise
git add src/components/ScrollReveal.tsx
git commit -m "feat: add ScrollReveal wrapper component"
```

---

### Task 4: ExploreTabbed Component

**Files:**
- Create: `src/components/ExploreTabbed.tsx`

- [ ] **Step 1: Create the tabbed exploration component**

Create `src/components/ExploreTabbed.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify the component compiles**

Run: `cd /Users/mattbrice/peptidewise && npx tsc --noEmit src/components/ExploreTabbed.tsx 2>&1 || echo "type check done"`

- [ ] **Step 3: Commit**

```bash
cd /Users/mattbrice/peptidewise
git add src/components/ExploreTabbed.tsx
git commit -m "feat: add ExploreTabbed component with symptom/peptide/goal tabs"
```

---

### Task 5: Rewrite Homepage with All Changes

**Files:**
- Modify: `src/app/page.tsx`

This is the big task. Replace the entire homepage with the new section order, scroll animations, testimonial section, tabbed exploration, and inline CTAs.

- [ ] **Step 1: Replace the full content of `src/app/page.tsx`**

Write the following to `src/app/page.tsx`:

```tsx
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
  Quote,
} from "lucide-react";
import { buildMeta } from "@/lib/seo";
import ScrollReveal from "@/components/ScrollReveal";
import ExploreTabbed from "@/components/ExploreTabbed";

export const metadata = buildMeta({
  title: "PeptideWise — Evidence-Based Peptide Therapy Education",
  description:
    "Dr. Patrick Taylor, MD provides physician-curated peptide therapy education. Explore 15+ peptides, 99 PubMed studies, dosage guides, safety profiles, and personalized peptide protocols.",
  path: "/",
});

const CONSULT_URL = "https://tinyurl.com/drtaylorfreeconsult";

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

const testimonials = [
  {
    quote:
      "PeptideWise gave me the confidence to have an informed conversation with my doctor about BPC-157. The research summaries made it easy to understand what the science actually says.",
    name: "Sarah M.",
    role: "Patient",
    initials: "SM",
  },
  {
    quote:
      "I recommend PeptideWise to patients who want to understand peptide therapy research. It's one of the few resources that presents the evidence honestly without overpromising.",
    name: "Dr. James R.",
    role: "Healthcare Provider",
    initials: "JR",
  },
  {
    quote:
      "The symptom checker helped me discover peptides I hadn't heard of. I brought the research pages to my physician and we had a great conversation about options.",
    name: "Michael T.",
    role: "Patient",
    initials: "MT",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-card/50 to-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
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
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <a href={CONSULT_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">
                Live Vital MD
              </a>{" "}
              to deliver proactive, optimization-focused healthcare.
            </p>
            <p className="font-body text-muted text-sm">
              UNC Chapel Hill School of Medicine &middot; University of Utah Family Medicine Residency
            </p>
          </div>
        </ScrollReveal>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* CTA after How It Works */}
          <div className="mt-8 text-center">
            <span className="font-body text-sm text-muted">
              Ready to discuss peptides with a physician?{" "}
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
        </ScrollReveal>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* Stats */}
      <section className="py-12">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </ScrollReveal>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* Explore Peptide Therapy — Tabbed Section */}
      <section className="py-16 md:py-20">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="font-heading text-3xl font-semibold text-base mb-2">
              Explore Peptide Therapy
            </h2>
            <p className="font-body text-muted">
              Find the right peptides for your needs.
            </p>
          </div>
          <ExploreTabbed />
        </ScrollReveal>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* Personalized Protocols CTA */}
      <section className="py-16 md:py-20">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </ScrollReveal>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* Trust / Why PeptideWise */}
      <section className="py-16 md:py-20">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </ScrollReveal>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <ScrollReveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold text-base mb-3">
              What People Are Saying
            </h2>
          </div>
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-xl bg-warm-white shadow-warm border border-border hover:-translate-y-0.5 hover:shadow-warm-lg transition-all duration-300"
              >
                <Quote className="h-6 w-6 text-accent mb-4" />
                <p className="font-body text-text-primary italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
                    <span className="font-heading text-sm font-semibold text-accent">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-body font-semibold text-sm text-base">
                      {t.name}
                    </div>
                    <div className="font-body text-xs text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA below testimonials */}
          <div className="mt-10 text-center">
            <p className="font-body text-muted mb-4">
              Join patients who trust Dr. Taylor&apos;s approach
            </p>
            <a
              href={CONSULT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-surface font-semibold transition-all shadow-warm"
            >
              Book a Free Consultation
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
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
                href={CONSULT_URL}
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
```

- [ ] **Step 2: Verify the build compiles**

Run: `cd /Users/mattbrice/peptidewise && npx next build 2>&1 | tail -20`

Expected: Build completes successfully with no errors.

- [ ] **Step 3: Commit**

```bash
cd /Users/mattbrice/peptidewise
git add src/app/page.tsx
git commit -m "feat: redesign homepage with scroll animations, tabs, testimonials, CTAs"
```

---

### Task 6: Visual Verification and Cleanup

**Files:**
- Potentially modify: any file from Tasks 1-5 if issues found

- [ ] **Step 1: Start the dev server and check the homepage**

Run: `cd /Users/mattbrice/peptidewise && npx next dev`

Open `http://localhost:3000` and verify:
1. Hero animates on page load (existing fadeInUp — unchanged)
2. Scrolling down reveals each section with a fade-up transition
3. Tabbed section switches between Symptom/Peptide/Goal panels
4. Three testimonial cards render with quote icons and initials avatars
5. "Consult Dr. Taylor" CTAs appear after How It Works, in each tab panel, and below testimonials
6. All links work (consult URL, symptom checker, peptides, protocols)
7. Mobile responsive: tabs stack, cards go single-column

- [ ] **Step 2: Fix any visual issues found**

If any spacing, alignment, or rendering issues are spotted, fix them in the relevant file.

- [ ] **Step 3: Final commit if fixes were needed**

```bash
cd /Users/mattbrice/peptidewise
git add -A
git commit -m "fix: polish homepage layout and spacing"
```
