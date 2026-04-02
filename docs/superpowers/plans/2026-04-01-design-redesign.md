# PeptideWise Visual Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform PeptideWise from generic blue/teal Tailwind defaults to a warm editorial aesthetic — cream surfaces, earthy amber accents, Cormorant Garamond + DM Sans typography.

**Architecture:** Design system changes flow from foundation (CSS vars, Tailwind config, fonts) → shared components (Navbar, Footer, Breadcrumbs) → page-level updates. All changes are visual — no data, routing, API, or functionality changes.

**Tech Stack:** Next.js 14, Tailwind CSS, next/font/google, CSS custom properties, CSS keyframe animations.

**Spec:** `docs/superpowers/specs/2026-04-01-design-redesign.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/app/globals.css` | Modify | CSS variables, animation keyframes, utility classes |
| `tailwind.config.ts` | Modify | Color tokens, font families, custom shadows |
| `src/app/layout.tsx` | Modify | Load Cormorant Garamond + DM Sans via next/font/google |
| `src/components/layout/Navbar.tsx` | Modify | Dark espresso nav, serif logo, warm links, amber CTA |
| `src/components/layout/Footer.tsx` | Modify | Dark espresso footer, warm text, updated disclaimer |
| `src/components/Breadcrumbs.tsx` | Modify | Warm accent colors |
| `src/lib/utils.ts` | Modify | Earth-toned category badge colors |
| `src/app/page.tsx` | Modify | Asymmetric hero, warm cards, editorial sections |
| `src/app/peptides/page.tsx` | Modify | Warm cards, serif titles, earth-toned badges |
| `src/app/peptides/[slug]/page.tsx` | Modify | Editorial detail layout, pull-quote Dr. Taylor notes |
| `src/app/stacks/page.tsx` | Modify | Warm palette, serif headings, updated form styling |
| `src/app/research/page.tsx` | Modify | Journal-style listing, warm cards |
| `src/app/learn/page.tsx` | Modify | Editorial article listing |
| `src/app/learn/[slug]/page.tsx` | Modify | Editorial article detail, pull quotes |
| `src/app/about/page.tsx` | Modify | Editorial bio layout, warm styling |
| `src/app/symptom-checker/page.tsx` | Modify | Warm form styling |
| `src/app/results/page.tsx` | Modify | Warm results display |
| `src/components/LeadCaptureGate.tsx` | Modify | Warm palette for email gate |

---

## Task 1: Foundation — CSS Variables & Animation Keyframes

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace globals.css with new design system**

Replace the entire contents of `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-base: 44 36 24;
  --color-text: 90 77 58;
  --color-muted: 138 125 107;
  --color-accent: 180 120 76;
  --color-accent-hover: 154 102 64;
  --color-accent-light: 196 168 130;
  --color-surface: 250 247 242;
  --color-card: 240 235 227;
  --color-border: 232 224 212;
  --color-white: 255 253 249;
}

body {
  background-color: #faf7f2;
  color: #5a4d3a;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .gradient-primary {
    background: linear-gradient(135deg, #b4784c 0%, #c4a882 100%);
  }
  .gradient-text {
    background: linear-gradient(135deg, #b4784c 0%, #c4a882 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-300 { animation-delay: 300ms; }
```

- [ ] **Step 2: Verify file saved correctly**

Run: `head -50 src/app/globals.css`
Expected: New CSS variables with warm color values, no references to Inter or blue/teal.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: replace CSS variables with warm editorial palette"
```

---

## Task 2: Foundation — Tailwind Config

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace tailwind.config.ts with new design tokens**

Replace the entire contents of `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#2c2418",
        "text-primary": "#5a4d3a",
        muted: "#8a7d6b",
        accent: {
          DEFAULT: "#b4784c",
          hover: "#9a6640",
          light: "#c4a882",
        },
        surface: "#faf7f2",
        card: "#f0ebe3",
        border: "#e8e0d4",
        "warm-white": "#fffdf9",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        warm: "0 1px 3px rgba(44, 36, 24, 0.06)",
        "warm-lg": "0 8px 24px rgba(44, 36, 24, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Verify config**

Run: `cat tailwind.config.ts`
Expected: New color tokens (base, accent, surface, card), font families (heading, body), warm shadows.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat: update Tailwind config with warm editorial design tokens"
```

---

## Task 3: Foundation — Font Loading

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx with new font setup**

Replace the entire contents of `src/app/layout.tsx` with:

```typescript
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd, { organizationSchema, webSiteSchema } from "@/components/JsonLd";
import { buildMeta } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = buildMeta({
  title: "PeptideWise — Evidence-Based Peptide Education by Dr. Pat Taylor",
  description:
    "Dr. Patrick Taylor, MD brings evidence-based peptide therapy education to patients. Explore 15+ peptides, 99 PubMed studies, and physician-curated personalized protocols.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface font-body">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify fonts load**

Run: `cd /Users/mattbrice/peptidewise && npx next build 2>&1 | tail -5`
Expected: Build succeeds (or only warns about unrelated issues). No font import errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: load Cormorant Garamond + DM Sans via next/font/google"
```

---

## Task 4: Category Badge Colors

**Files:**
- Modify: `src/lib/utils.ts`

- [ ] **Step 1: Update getCategoryColor function**

In `src/lib/utils.ts`, replace the `getCategoryColor` function (the `colors` object and return):

Old:
```typescript
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "growth-hormone": "bg-blue-100 text-blue-700",
    "weight-management": "bg-green-100 text-green-700",
    "tissue-repair": "bg-orange-100 text-orange-700",
    "anti-aging": "bg-purple-100 text-purple-700",
    cognitive: "bg-indigo-100 text-indigo-700",
    immune: "bg-red-100 text-red-700",
    "sexual-health": "bg-pink-100 text-pink-700",
    sleep: "bg-violet-100 text-violet-700",
    "skin-hair": "bg-amber-100 text-amber-700",
  };
  return colors[category] || "bg-gray-100 text-gray-600";
}
```

New:
```typescript
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "growth-hormone": "bg-[#e8e0d4] text-[#6b5a3e]",
    "weight-management": "bg-[#e8efe3] text-[#4a5e3a]",
    "tissue-repair": "bg-[#f0e8dc] text-[#8b6914]",
    "anti-aging": "bg-[#f5ede4] text-[#8b5c2a]",
    cognitive: "bg-[#ede8e0] text-[#5a4d3a]",
    immune: "bg-[#e3ebe8] text-[#3e5a4a]",
    "sexual-health": "bg-[#f0e8e4] text-[#7a4a3e]",
    sleep: "bg-[#e8e4f0] text-[#4a3e6b]",
    "skin-hair": "bg-[#f0ebe3] text-[#6b5a3e]",
  };
  return colors[category] || "bg-card text-muted";
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/utils.ts
git commit -m "feat: update category badge colors to earth tones"
```

---

## Task 5: Navbar Redesign

**Files:**
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Replace Navbar.tsx with warm editorial design**

Replace the entire contents of `src/components/layout/Navbar.tsx` with:

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/peptides", label: "Peptides" },
  { href: "/stacks", label: "Protocols" },
  { href: "/symptom-checker", label: "Symptom Checker" },
  { href: "/learn", label: "Learn" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About Dr. Taylor" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="font-heading text-xl font-semibold text-surface tracking-wide">
              Peptide<span className="text-accent-light">Wise</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-body font-medium text-[rgba(250,247,242,0.7)] hover:text-surface transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/stacks"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-surface text-sm font-body font-medium hover:bg-accent-hover transition-colors shadow-warm"
            >
              Find Your Protocol
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[rgba(250,247,242,0.7)] hover:text-surface"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[rgba(250,247,242,0.1)] bg-base">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-body font-medium text-[rgba(250,247,242,0.7)] hover:bg-[rgba(250,247,242,0.05)] hover:text-surface"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/stacks"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 mt-2 rounded-lg bg-accent text-surface text-center text-base font-body font-medium"
            >
              Find Your Protocol
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat: redesign navbar with dark espresso background and warm editorial style"
```

---

## Task 6: Footer Redesign

**Files:**
- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Replace Footer.tsx with warm editorial design**

Replace the entire contents of `src/components/layout/Footer.tsx` with:

```typescript
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base text-[rgba(250,247,242,0.6)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent" />

        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-heading text-lg font-semibold text-surface tracking-wide">
                Peptide<span className="text-accent-light">Wise</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Evidence-based peptide education by Dr. Patrick Taylor, MD. Empowering
              you with knowledge to make informed health decisions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-body font-semibold text-surface uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li><Link href="/peptides" className="text-sm hover:text-accent transition-colors">Browse Peptides</Link></li>
              <li><Link href="/stacks" className="text-sm hover:text-accent transition-colors">Personalized Protocols</Link></li>
              <li><Link href="/symptom-checker" className="text-sm hover:text-accent transition-colors">Symptom Checker</Link></li>
              <li><Link href="/learn" className="text-sm hover:text-accent transition-colors">Articles</Link></li>
              <li><Link href="/research" className="text-sm hover:text-accent transition-colors">Research</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-body font-semibold text-surface uppercase tracking-wider mb-4">
              Popular Guides
            </h3>
            <ul className="space-y-2">
              <li><Link href="/peptides/bpc-157" className="text-sm hover:text-accent transition-colors">BPC-157 Guide</Link></li>
              <li><Link href="/peptides/semaglutide" className="text-sm hover:text-accent transition-colors">Semaglutide Guide</Link></li>
              <li><Link href="/peptides/tirzepatide" className="text-sm hover:text-accent transition-colors">Tirzepatide Guide</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-body font-semibold text-surface uppercase tracking-wider mb-4">
              Dr. Taylor
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="https://tinyurl.com/drtaylorfreeconsult" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">
                  Live Vital MD
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/drpattaylor/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">
                  Instagram @drpattaylor
                </a>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-accent transition-colors">
                  About Dr. Taylor
                </Link>
              </li>
              <li>
                <a href="https://tinyurl.com/drtaylorfreeconsult" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">
                  Book a Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(250,247,242,0.1)] pt-8 pb-8">
          <div className="bg-[rgba(250,247,242,0.05)] rounded-lg p-4 mb-6 border border-[rgba(250,247,242,0.1)]">
            <p className="text-xs leading-relaxed">
              <strong className="text-surface">Medical Disclaimer:</strong> The information provided on PeptideWise
              is for educational purposes only and is not intended as medical advice. Peptide therapies should
              only be used under the supervision of a qualified healthcare provider. Always consult with a
              licensed physician before starting any peptide protocol. PeptideWise does not sell medications
              or provide medical services directly. For personalized medical guidance, visit{" "}
              <a href="https://tinyurl.com/drtaylorfreeconsult" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light">
                LiveVital.io
              </a>.
            </p>
          </div>
          <p className="text-sm text-[rgba(250,247,242,0.4)] text-center">
            &copy; {new Date().getFullYear()} PeptideWise by Dr. Patrick Taylor, MD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat: redesign footer with dark espresso background and warm editorial style"
```

---

## Task 7: Breadcrumbs Update

**Files:**
- Modify: `src/components/Breadcrumbs.tsx`

- [ ] **Step 1: Update Breadcrumbs with warm colors**

Replace the entire contents of `src/components/Breadcrumbs.tsx` with:

```typescript
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { PRODUCTION_DOMAIN } from "@/lib/seo";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: `${PRODUCTION_DOMAIN}${item.href}`,
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted" />}
                {isLast ? (
                  <span className="text-base font-medium truncate max-w-[200px]">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Breadcrumbs.tsx
git commit -m "feat: update breadcrumbs with warm editorial colors"
```

---

## Task 8: Build Verification Checkpoint

- [ ] **Step 1: Run build to verify foundation changes compile**

Run: `cd /Users/mattbrice/peptidewise && npx next build 2>&1 | tail -20`
Expected: Build succeeds. Pages compile. No TypeScript errors from font/color changes.

- [ ] **Step 2: Fix any build errors**

If build fails, read the error output and fix the specific issue. Common issues:
- Tailwind class names that reference old color tokens (e.g., `text-blue-600`) will still work as Tailwind defaults — they just won't match the new palette. These get updated in subsequent tasks.
- Font variable issues: ensure `--font-cormorant` and `--font-dm-sans` are set on the `<html>` element.

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix: resolve build issues from foundation changes"
```

---

## Task 9: Homepage Redesign

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update homepage with warm editorial design**

This is the largest single file change. Replace the entire contents of `src/app/page.tsx`. The new homepage should:

1. **Hero section:** Asymmetric two-column layout with subtle warm background gradient. Left: eyebrow label + large Cormorant heading + subtitle + dual CTAs. Right: Dr. Taylor photo with warm border. Uses `animate-fade-in-up` classes with stagger delays.
2. **How It Works section:** Same 3-step structure but with warm cards (`bg-card`), Cormorant section headings, accent-colored step numbers.
3. **Popular Peptides section:** Eyebrow label + Cormorant heading. Cards use `bg-card border-border` with `hover:-translate-y-0.5 hover:shadow-warm-lg transition-all duration-300`. Titles in `font-heading`. Category badges use `getCategoryColor()`.
4. **Protocol Categories section:** Same grid but with warm card styling and Cormorant headings.
5. **Trust/Dr. Taylor section:** Editorial layout with photo, warm border treatment, Cormorant heading.
6. **Final CTA section:** Warm background (`bg-card`), Cormorant heading, accent button.

**Key class replacements throughout the file:**
- `bg-white` → `bg-warm-white` or `bg-card`
- `bg-slate-50` → `bg-surface`
- `border-gray-200` → `border-border`
- `text-gray-900` → `text-base`
- `text-gray-700` → `text-text-primary`
- `text-gray-600` → `text-muted`
- `text-gray-500` → `text-muted`
- `text-gray-400` → `text-muted`
- `text-blue-600` → `text-accent`
- `hover:text-gray-900` → `hover:text-base`
- `bg-blue-50` → `bg-card`
- `border-blue-200` → `border-border`
- `gradient-primary` (on buttons) → `bg-accent hover:bg-accent-hover`
- `shadow-sm` → `shadow-warm`
- `rounded-2xl` → `rounded-xl`
- Any heading `font-bold` → add `font-heading` and adjust to `font-semibold`
- Body text → add `font-body` where needed

**Hero-specific changes:**
- Replace the centered hero with a two-column grid: `grid md:grid-cols-2 gap-12 items-center`
- Left column: eyebrow (`text-xs font-body font-semibold uppercase tracking-[0.15em] text-accent`), title (`font-heading text-4xl md:text-5xl font-semibold text-base leading-[1.1] tracking-tight`), subtitle, buttons
- Right column: Dr. Taylor photo in a warm-bordered container
- Background: `bg-gradient-to-br from-card/50 to-surface`
- Add `animate-fade-in-up` to hero children with stagger delays

**Section dividers:** Between major sections, add:
```html
<div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent max-w-4xl mx-auto" />
```

- [ ] **Step 2: Verify homepage renders**

Run: `cd /Users/mattbrice/peptidewise && npx next build 2>&1 | tail -10`
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: redesign homepage with warm editorial layout and asymmetric hero"
```

---

## Task 10: Peptides Listing Page

**Files:**
- Modify: `src/app/peptides/page.tsx`

- [ ] **Step 1: Update peptides listing with warm editorial styling**

Apply the same class replacement map from Task 9 throughout the file. Additionally:

- Page title: `font-heading text-3xl md:text-4xl font-semibold text-base`
- Subtitle: `font-body text-lg text-muted`
- Category quick-nav pills: Replace blue/teal colors with `bg-card text-muted hover:bg-accent hover:text-surface border border-border` and active state `bg-accent text-surface`
- Peptide cards: `bg-card border border-border rounded-xl shadow-warm hover:-translate-y-0.5 hover:shadow-warm-lg transition-all duration-300`
- Card titles: `font-heading text-xl font-semibold text-base`
- Research/safety score bars: Replace blue fills with `bg-accent`
- Status badges: `bg-card text-muted border border-border`

- [ ] **Step 2: Commit**

```bash
git add src/app/peptides/page.tsx
git commit -m "feat: update peptides listing with warm editorial styling"
```

---

## Task 11: Peptide Detail Page

**Files:**
- Modify: `src/app/peptides/[slug]/page.tsx`

- [ ] **Step 1: Update peptide detail with editorial styling**

Apply the class replacement map throughout. Additionally:

- Page title: `font-heading text-3xl md:text-4xl font-semibold text-base`
- **Dr. Taylor's notes (pull-quote style):** Find the `drTaylorNote` rendering section and style it as:
  ```html
  <div className="border-l-4 border-accent pl-6 py-4 my-8 bg-card/50 rounded-r-lg">
    <p className="font-heading text-lg italic text-text-primary leading-relaxed">"{peptide.drTaylorNote}"</p>
    <p className="font-body text-sm text-muted mt-3">— Dr. Patrick Taylor, MD</p>
  </div>
  ```
- Section headings: `font-heading text-2xl font-semibold text-base` with a thin underline: `<div className="h-px bg-gradient-to-r from-accent-light/40 to-transparent mt-2 mb-4" />`
- Benefits/uses lists: Keep checkmark icons but change from green to `text-accent`
- FAQ accordion: `bg-card border border-border rounded-xl`
- Related content cards: Same warm card treatment

- [ ] **Step 2: Commit**

```bash
git add "src/app/peptides/[slug]/page.tsx"
git commit -m "feat: update peptide detail with editorial layout and pull-quote styling"
```

---

## Task 12: Protocols (Stacks) Page

**Files:**
- Modify: `src/app/stacks/page.tsx`

- [ ] **Step 1: Update protocols page with warm editorial styling**

This is the largest page (879 lines). Apply the class replacement map throughout. Key changes:

- Step indicator: Replace blue active state with `bg-accent text-surface`, inactive with `bg-card text-muted border border-border`
- Form inputs: `bg-warm-white border border-border rounded-lg focus:border-accent focus:ring-1 focus:ring-accent text-base font-body`
- Symptom tag pills: `bg-card text-muted border border-border` inactive, `bg-accent text-surface border-accent` selected
- Gender/BMI selection cards: `bg-card border border-border hover:border-accent` and selected `border-accent bg-accent/5`
- Protocol result cards: `bg-card border border-border rounded-xl shadow-warm`
- Protocol names: `font-heading font-semibold`
- Progress bar fills: `bg-accent` instead of blue
- All headings: Add `font-heading`
- All body text: Ensure `font-body`

- [ ] **Step 2: Commit**

```bash
git add src/app/stacks/page.tsx
git commit -m "feat: update protocols page with warm editorial styling"
```

---

## Task 13: Research Listing Page

**Files:**
- Modify: `src/app/research/page.tsx`

- [ ] **Step 1: Update research listing with journal-style warm editorial**

Apply the class replacement map. Additionally:

- Page title: `font-heading text-3xl md:text-4xl font-semibold text-base`
- Search input: `bg-warm-white border border-border rounded-lg focus:border-accent focus:ring-1 focus:ring-accent font-body`
- Category filter pills: Same treatment as peptides listing
- Study cards: `bg-card border border-border rounded-xl shadow-warm hover:-translate-y-0.5 hover:shadow-warm-lg transition-all duration-300`
- Study titles: `font-heading text-lg font-semibold text-base`
- Journal/date metadata: `font-body text-sm text-muted`
- Peptide tag links: `text-accent hover:text-accent-hover`
- Colored left borders on study cards: Replace with `border-l-4 border-accent`
- PubMed links: `text-accent hover:text-accent-hover`

- [ ] **Step 2: Commit**

```bash
git add src/app/research/page.tsx
git commit -m "feat: update research listing with journal-style warm editorial"
```

---

## Task 14: Learn Pages (Listing + Detail)

**Files:**
- Modify: `src/app/learn/page.tsx`
- Modify: `src/app/learn/[slug]/page.tsx`

- [ ] **Step 1: Update articles listing**

Apply the class replacement map to `src/app/learn/page.tsx`:
- Page title: `font-heading`
- Article cards: `bg-card border border-border rounded-xl shadow-warm`
- Article titles: `font-heading font-semibold`
- Category/reading time: `font-body text-sm text-muted`

- [ ] **Step 2: Update article detail**

Apply the class replacement map to `src/app/learn/[slug]/page.tsx`. Additionally:
- Article title: `font-heading text-3xl md:text-4xl font-semibold text-base`
- Body paragraphs: `font-body text-text-primary leading-[1.7]`
- `##` headings: `font-heading text-2xl font-semibold text-base mt-10 mb-4`
- `###` headings: `font-heading text-xl font-semibold text-base mt-8 mb-3`
- Related content cards: warm card treatment

- [ ] **Step 3: Commit**

```bash
git add src/app/learn/page.tsx "src/app/learn/[slug]/page.tsx"
git commit -m "feat: update learn pages with editorial typography and warm styling"
```

---

## Task 15: About Page

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Update about page with editorial styling**

Apply the class replacement map. Additionally:
- Dr. Taylor's name: `font-heading text-3xl md:text-4xl font-semibold text-base`
- Title/location: `font-body text-lg text-muted`
- Bio paragraphs: `font-body text-text-primary leading-[1.7]`
- Education timeline: `border-l-2 border-accent-light` with warm dot indicators
- Clinical interests grid: `bg-card border border-border rounded-xl`
- Photo: Add warm border treatment `border-4 border-card shadow-warm-lg rounded-xl`

- [ ] **Step 2: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: update about page with editorial styling"
```

---

## Task 16: Symptom Checker + Results + LeadCaptureGate

**Files:**
- Modify: `src/app/symptom-checker/page.tsx`
- Modify: `src/app/results/page.tsx`
- Modify: `src/components/LeadCaptureGate.tsx`

- [ ] **Step 1: Update symptom checker**

Apply the class replacement map to `src/app/symptom-checker/page.tsx`:
- Step indicators: `bg-accent text-surface` active, `bg-card text-muted` inactive
- Category cards: `bg-card border border-border rounded-xl hover:border-accent`
- Selected state: `border-accent bg-accent/5`
- Symptom pills: Same as protocols page
- Continue button: `bg-accent text-surface hover:bg-accent-hover`
- All headings: `font-heading`

- [ ] **Step 2: Update results page**

Apply the class replacement map to `src/app/results/page.tsx`:
- Results heading: `font-heading`
- Match score cards: `bg-card border border-border rounded-xl shadow-warm`
- Score bars: `bg-accent` fills
- Peptide names: `font-heading font-semibold`
- "Learn More" links: `text-accent hover:text-accent-hover`

- [ ] **Step 3: Update LeadCaptureGate**

Apply the class replacement map to `src/components/LeadCaptureGate.tsx`:
- Gate container: `bg-surface` or `bg-card`
- Heading: `font-heading text-2xl font-semibold text-base`
- Subtitle: `font-body text-muted`
- Email/name inputs: `bg-warm-white border border-border rounded-lg focus:border-accent focus:ring-1 focus:ring-accent font-body`
- Submit button: `bg-accent text-surface hover:bg-accent-hover font-body font-medium`
- Replace any blue/teal references

- [ ] **Step 4: Commit**

```bash
git add src/app/symptom-checker/page.tsx src/app/results/page.tsx src/components/LeadCaptureGate.tsx
git commit -m "feat: update symptom checker, results, and lead capture with warm palette"
```

---

## Task 17: Final Build Verification

- [ ] **Step 1: Run full build**

Run: `cd /Users/mattbrice/peptidewise && npx next build 2>&1`
Expected: Build succeeds with no errors. All pages compile.

- [ ] **Step 2: Start dev server and visually verify**

Run: `cd /Users/mattbrice/peptidewise && npx next dev`
Check in browser:
- Homepage: Warm cream background, dark navbar, serif headings, amber CTAs
- Peptides listing: Earth-toned badges, warm cards
- A peptide detail page: Pull-quote Dr. Taylor notes, editorial headings
- Footer: Dark espresso with warm text

- [ ] **Step 3: Fix any remaining issues**

Look for:
- Any leftover blue/teal colors (search for `blue-`, `teal-`, `#2563eb`, `#0d9488`)
- Missing font-heading/font-body classes on key elements
- Contrast issues (text too light on backgrounds)

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "fix: resolve any remaining styling issues from redesign"
```

---

## Task 18: Cleanup Old References

- [ ] **Step 1: Search for remaining old color references**

Run: `grep -rn "blue-600\|blue-500\|teal-600\|teal-500\|#2563eb\|#0d9488\|text-gray-900\|bg-white\b" src/ --include="*.tsx" --include="*.ts" | grep -v node_modules`

Fix any remaining references in page files (some may be in files not yet updated like compare/ or providers/ legacy pages — these can be left as-is since they're marked legacy in the CLAUDE.md).

- [ ] **Step 2: Commit if changes made**

```bash
git add -A
git commit -m "chore: clean up remaining old color references"
```
