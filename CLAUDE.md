# PeptideWise — Claude Code Reference

## Project Overview

PeptideWise is an educational peptide therapy website by **Dr. Patrick Taylor, MD**. It is purely educational — no selling, no pricing, no direct product sales. The site serves as a knowledge resource for Dr. Taylor's patients and audience.

- **Live site:** https://peptidewise.vercel.app
- **GitHub:** https://github.com/nanugill-belle/peptidewise
- **Deploys:** Vercel auto-deploys on push to `main`

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database:** Supabase (lead capture only)
- **Hosting:** Vercel (connected to GitHub, auto-deploy on push)
- **Static data** in `src/data/` files (peptides, research, articles, protocols)

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Homepage
│   ├── about/                  # Dr. Taylor's bio
│   ├── peptides/               # Peptide listing + [slug] detail pages (15 peptides)
│   ├── stacks/                 # Peptide protocol recommendation tool (12 protocols)
│   ├── research/               # Research listing + [pmid] detail pages (99 studies)
│   ├── learn/                  # Articles listing + [slug] detail pages (8 articles)
│   ├── symptom-checker/        # Educational symptom exploration tool
│   ├── results/                # Symptom checker results (gated by lead capture)
│   ├── api/capture-lead/       # POST endpoint for lead capture → Supabase
│   ├── api/review-data/        # GET endpoint serving live data to review.html
│   ├── sitemap.ts              # Dynamic sitemap generation
│   ├── robots.ts               # Robots.txt generation
│   ├── providers/              # Provider pages (legacy)
│   └── compare/                # Comparison page (legacy)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav with navLinks array
│   │   └── Footer.tsx          # Footer with links + medical disclaimer
│   ├── Breadcrumbs.tsx         # Breadcrumb navigation for detail pages
│   ├── JsonLd.tsx              # Structured data (physician, medical page, FAQ schemas)
│   └── LeadCaptureGate.tsx     # Email gate for results/protocols (→ Supabase)
├── data/                       # All static content
│   ├── peptides.ts             # 15 peptides with profiles, references, FAQs, mechanism of action
│   ├── research.ts             # 99 PubMed studies with breakdowns, takeaways, key findings
│   ├── stacks.ts               # 12 curated peptide protocols (PeptideProtocol type)
│   ├── articles.ts             # 8 educational articles (2,000+ words each)
│   ├── bio.ts                  # Centralized Dr. Taylor bio content
│   ├── disclaimers.ts          # Centralized medical disclaimers
│   ├── symptoms.ts             # Symptom categories and tags
│   ├── providers.ts            # Provider data (legacy)
│   └── reviews.ts              # Review data (legacy)
├── lib/
│   ├── seo.ts                  # buildMeta() helper, PRODUCTION_DOMAIN constant
│   ├── supabase-server.ts      # Supabase client (lazy-initialized)
│   └── utils.ts                # cn helper, getCategoryLabel, getCategoryColor
├── types/index.ts              # TypeScript interfaces
public/
├── images/dr-taylor.jpg        # Dr. Taylor's headshot
├── review.html                 # Content review tool (pulls live data from /api/review-data)
└── research-review.html        # Research review tool for Dr. Taylor
```

## Key Data Models

### Peptide (`src/data/peptides.ts`)
15 peptides with: name, category, description, detailedDescription, benefits, commonUses, dosage, cycleLength, sideEffects, contraindications, researchStatus, legalStatus, researchScore (1-10), safetyScore (1-10), drTaylorNote, references, mechanismOfAction, whoMayBenefit, timeline, faqs, lastUpdated.

### ResearchStudy (`src/data/research.ts`)
99 PubMed studies with: pmid, title, authors, journal, pubDate, peptideId, peptideName, keyFinding, takeaways (1-3 plain English points), content (3-5 paragraph breakdown).

### PeptideProtocol (`src/data/stacks.ts`)
12 protocols (formerly "stacks") with: name, subtitle, peptideIds, targetSymptoms, ageRange, genders, bmiCategory, drTaylorNote. Type alias `PeptideStack` is deprecated.

### Article (`src/data/articles.ts`)
8 articles (2,000+ words each) with references. Includes guides for specific protocols.

## Important Terminology

- **"Protocols" NOT "Stacks"** — The site was rebranded from "stacks" to "protocols" for personalized language. The data file is still `stacks.ts` but the type is `PeptideProtocol`. All UI text says "Protocol" not "Stack".
- **"Find Your Protocol"** — The CTA button text (was "Find Your Stack")

## SEO Architecture

- All pages use `buildMeta()` from `src/lib/seo.ts` — meta descriptions lead with "Dr. Patrick Taylor, MD"
- JSON-LD structured data on peptide detail pages, about page (physician schema, FAQ schema, medical page schema)
- Breadcrumbs on all detail pages
- Dynamic `sitemap.ts` and `robots.ts`
- Each of the 99 research pages has unique title/meta for independent ranking

## Lead Capture

- `LeadCaptureGate` component gates Symptom Checker results and Protocol results
- Users see a splash ("We found X protocols for you") then must enter email
- Emails stored in Supabase via `/api/capture-lead`
- Unlock state persisted to `localStorage` key `peptidewise_unlocked`

## Important Conventions

### Dr. Taylor's Identity
- **Name:** Dr. Patrick Taylor, MD
- **Title:** Board-Eligible Family Medicine Physician
- **Location:** Salt Lake City, UT
- **Education:** UNC Chapel Hill School of Medicine, University of Utah Family Medicine Residency
- He did his residency at University of Utah — do NOT say he currently works there
- His photo is at `/images/dr-taylor.jpg` — used on about, home, peptide detail, and protocol pages (NOT in navbar)
- Bio content centralized in `src/data/bio.ts`

### Links
- **All booking/consult links:** `https://tinyurl.com/drtaylorfreeconsult`
- **Instagram:** `https://www.instagram.com/drpattaylor/`
- Do NOT link to `livevital.io` directly — use the tinyurl for all CTAs
- Text references to "Live Vital MD" as the practice name are fine

### Content Tone
- Educational, not promotional
- Evidence-based — cite PubMed studies where possible
- Dr. Taylor's clinical notes are first-person, conversational, and practical
- Key takeaways should be plain English, no jargon
- Positive but honest about research limitations (e.g., "animal data is extensive, human trials pending")

### Navigation
- Nav links defined in `navLinks` array in `Navbar.tsx` — add new pages there
- Footer links manually structured in `Footer.tsx`
- Current nav: Peptides, Protocols, Symptom Checker, Learn, Research, About Dr. Taylor

### Deployment
- Push to `main` branch auto-deploys to Vercel
- No need for `npx vercel --prod` anymore
- Build command: `next build`
- Node version: default

### Review Tools
- `review.html` — Dr. Taylor reviews bio, peptides, protocols, disclaimers (pulls live data from `/api/review-data`)
- `research-review.html` — Dr. Taylor reviews all 99 research studies (hardcoded data)
- Both auto-save to localStorage, export markdown of changes

## Common Tasks

### Add a new peptide
1. Add entry to `src/data/peptides.ts` — include mechanismOfAction, whoMayBenefit, timeline, faqs, lastUpdated
2. It auto-generates a page at `/peptides/[slug]`
3. Update protocols in `src/data/stacks.ts` if it should appear in any

### Add a new research study
1. Add entry to `src/data/research.ts` with all fields including content and takeaways
2. It auto-generates a page at `/research/[pmid]`

### Add a new article
1. Add entry to `src/data/articles.ts` (aim for 2,000+ words)
2. It auto-generates a page at `/learn/[slug]`

### Add a new protocol
1. Add entry to `src/data/stacks.ts` using `PeptideProtocol` type
2. Reference existing peptide IDs from `peptides.ts`

### Update Dr. Taylor's info
- Bio: `src/data/bio.ts` (centralized) and `src/app/about/page.tsx`
- Photo: replace `public/images/dr-taylor.jpg`
- Clinical notes: `drTaylorNote` field in each peptide/protocol entry
- Disclaimers: `src/data/disclaimers.ts`
