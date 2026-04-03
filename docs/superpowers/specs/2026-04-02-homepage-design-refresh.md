# PeptideWise Homepage Design Refresh

**Date:** 2026-04-02
**Status:** Approved
**Approach:** Lightweight (CSS-only animations, no new dependencies)

## Overview

Four improvements to the PeptideWise homepage inspired by design patterns observed on withgauge.com, adapted to PeptideWise's warm/medical aesthetic and lightweight architecture.

1. Scroll-triggered animations
2. Testimonial section (placeholder structure)
3. Tabbed exploration section
4. Stronger CTA repetition for "Consult Dr. Taylor"

## 1. Scroll-Triggered Animations

### New Hook: `src/hooks/useScrollReveal.ts`

A client-side hook using the Intersection Observer API. Returns a ref to attach to any element. When the element enters the viewport, it transitions from hidden to visible.

- **Threshold:** 0.15 (triggers when 15% of element is visible)
- **Trigger once:** true (does not re-animate on scroll back up)
- **No dependencies:** Pure browser API, zero bundle cost

### New CSS Utilities in `globals.css`

```
.scroll-hidden  → opacity: 0; transform: translateY(16px)
.scroll-visible → opacity: 1; transform: translateY(0); transition: opacity 0.6s ease-out, transform 0.6s ease-out
```

### Application

Wrap each homepage section's inner content with a div using the scroll reveal ref. Sections that get the animation:

- About Dr. Taylor
- How It Works cards
- Stats bar
- Explore Peptide Therapy (new tabbed section)
- Personalized Protocol CTA
- Why Trust PeptideWise?
- What People Are Saying (new testimonial section)

The hero section keeps its existing CSS `animate-fade-in-up` on page load (not scroll-triggered).

## 2. Testimonial Section: "What People Are Saying"

### Placement

Between "Why Trust PeptideWise?" and the final dark CTA banner.

### Structure

- Section heading: "What People Are Saying"
- 3-card responsive grid: 1 column on mobile, 3 columns on desktop
- Each card contains:
  - A copper-colored quote icon (Quote lucide icon or a styled `"` character) at top
  - Quote text (italic, `text-text-primary`)
  - Attribution: name in `font-semibold`, descriptor below in `text-muted text-sm`
  - Circular initials avatar (styled div with `bg-card` background, accent text)

### Card Styling

Uses existing design tokens:
- `bg-warm-white`
- `border border-border`
- `rounded-xl`
- `shadow-warm`
- Hover: `hover:-translate-y-0.5 hover:shadow-warm-lg` (matches existing card pattern)

### Placeholder Content

Three quotes to be replaced with real testimonials later:

1. **"Sarah M." / Patient** — About researching peptides on PeptideWise before discussing with her doctor, feeling more confident and informed.
2. **"Dr. James R." / Healthcare Provider** — About recommending PeptideWise as a resource for patients who want to understand peptide therapy research.
3. **"Michael T." / Patient** — About using the symptom checker to discover peptides he hadn't heard of, then bringing the research to his physician.

### CTA Below Cards

Centered text: "Join patients who trust Dr. Taylor's approach" with a button-style link to `https://tinyurl.com/drtaylorfreeconsult`.

## 3. Tabbed Exploration: "Explore Peptide Therapy"

### Replaces

The current "Popular Peptides" section (the 6-card grid with "View All" link).

### New Component: `src/components/ExploreTabbed.tsx`

Client component (`"use client"`) using `useState` for active tab.

### Tab Bar

Three tabs: **By Symptom** | **By Peptide** | **By Goal**

Styling:
- Active tab: `border-b-2 border-accent text-accent font-semibold`
- Inactive tabs: `text-muted hover:text-text-primary`
- Tab bar has a bottom border: `border-b border-border`

### Tab Content

**By Symptom:**
- Reuses the `quickSymptoms` data (Weight Loss, Better Sleep, Joint Pain, Brain Fog, Anti-Aging, Low Libido) but displayed as larger, more browseable cards instead of small chips.
- Each card: icon + label + brief description, links to `/results?symptoms=...&severity=moderate`
- Grid: 2 columns mobile, 3 columns desktop
- "View All" link to `/symptom-checker`

**By Peptide:**
- The existing 6 popular peptide cards, same data and markup as current implementation.
- Grid: 2 columns mobile, 3 columns desktop
- "View All" link to `/peptides`

**By Goal:**
- 6 protocol category cards (Recovery, Weight, Sleep, Cognition, Longevity, Immune) using the same icons from the existing protocol CTA section.
- Each card: icon + goal label + 1-line description, links to `/stacks`
- Grid: 2 columns mobile, 3 columns desktop
- "View All" link to `/stacks`

### Content Transition

Simple CSS opacity transition (0.2s) when switching tabs. No slide or complex animation.

### Section Heading

"Explore Peptide Therapy" with subtitle "Find the right peptides for your needs."

### Inline CTA

At the bottom of each tab panel: "Want personalized guidance? [Consult Dr. Taylor →]" as a text link with arrow icon, linking to the tinyurl consult link.

## 4. Stronger CTA Repetition

Three new lightweight CTAs distributed through the page:

### A. After "How It Works" Steps

Below the 3 step cards, centered:
- Text: "Ready to discuss peptides with a physician?"
- Link: "Consult Dr. Taylor →" styled as a text link (`text-accent hover:text-accent-hover`) with ArrowRight icon
- Links to `https://tinyurl.com/drtaylorfreeconsult`

### B. Inside Each Tab Panel

At the bottom of each tab in the Explore section:
- Text: "Want personalized guidance?"
- Link: "Consult Dr. Taylor →" same text link style
- Links to `https://tinyurl.com/drtaylorfreeconsult`

### C. Below Testimonial Cards

Centered below the 3 testimonial cards:
- Text: "Join patients who trust Dr. Taylor's approach"
- Button: "Book a Free Consultation" styled as primary CTA (`bg-accent text-surface rounded-xl`)
- Links to `https://tinyurl.com/drtaylorfreeconsult`

## Updated Homepage Section Order

1. **Hero** (existing, keeps CSS load animation)
2. **About Dr. Taylor** (existing + scroll animation)
3. **How It Works** (existing + scroll animation + new inline CTA)
4. **Stats** (existing + scroll animation)
5. **Explore Peptide Therapy** (NEW — tabbed section replacing Popular Peptides)
6. **Personalized Protocol CTA** (existing + scroll animation)
7. **Why Trust PeptideWise?** (existing + scroll animation)
8. **What People Are Saying** (NEW — testimonial section with CTA)
9. **Final CTA Banner** (existing dark banner, unchanged)

Gradient divider lines remain between each section.

## Files Changed

| File | Change |
|---|---|
| `src/hooks/useScrollReveal.ts` | New — Intersection Observer hook |
| `src/app/globals.css` | Add scroll-hidden/scroll-visible utilities |
| `src/components/ExploreTabbed.tsx` | New — tabbed exploration component |
| `src/app/page.tsx` | Refactor homepage to use new sections, scroll animations, and CTAs |

## Design Tokens

All new elements use existing tokens from `tailwind.config.ts`. No new colors, fonts, or shadows introduced.

## Dependencies

None added. Pure CSS + browser APIs only.
