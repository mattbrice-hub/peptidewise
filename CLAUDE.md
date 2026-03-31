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
- **Hosting:** Vercel (connected to GitHub, auto-deploy on push)
- **No database** — all data is static in `src/data/` files

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── about/              # Dr. Taylor's bio
│   ├── peptides/           # Peptide listing + [slug] detail pages (15 peptides)
│   ├── stacks/             # Peptide stack recommendation tool (12 stacks)
│   ├── research/           # Research listing + [pmid] detail pages (99 studies)
│   ├── learn/              # Articles listing + [slug] detail pages (5 articles)
│   ├── symptom-checker/    # Educational symptom exploration tool
│   ├── results/            # Symptom checker results
│   ├── providers/          # Provider pages (legacy, may redirect)
│   └── compare/            # Comparison page (legacy)
├── components/layout/
│   ├── Navbar.tsx           # Sticky nav with links array
│   └── Footer.tsx           # Footer with links + medical disclaimer
├── data/                    # All static content
│   ├── peptides.ts          # 15 peptides with full profiles, references, Dr. Taylor notes
│   ├── research.ts          # 99 PubMed studies with breakdowns, takeaways, key findings
│   ├── stacks.ts            # 12 curated peptide stacks
│   ├── articles.ts          # 5 educational articles
│   ├── symptoms.ts          # Symptom categories and tags
│   ├── providers.ts         # Provider data (legacy)
│   └── reviews.ts           # Review data (legacy)
├── types/index.ts           # TypeScript interfaces
└── lib/utils.ts             # Utility functions (cn helper)
public/
├── images/dr-taylor.jpg     # Dr. Taylor's headshot
├── review.html              # Content review tool for Dr. Taylor
└── research-review.html     # Research review tool for Dr. Taylor
```

## Key Data Models

### Peptide (`src/data/peptides.ts`)
15 peptides with: name, category, description, detailedDescription, benefits, commonUses, dosage, cycleLength, sideEffects, contraindications, researchStatus, legalStatus, researchScore (1-10), safetyScore (1-10), drTaylorNote, references (PubMed citations).

### ResearchStudy (`src/data/research.ts`)
99 PubMed studies with: pmid, title, authors, journal, pubDate, peptideId, peptideName, keyFinding, takeaways (1-3 plain English points), content (3-5 paragraph breakdown).

### PeptideStack (`src/data/stacks.ts`)
12 stacks with: name, subtitle, peptideIds, targetSymptoms, ageRange, genders, bmiCategory, drTaylorNote.

## Pages & Static Generation

The site generates **133 static pages** at build time:
- 99 research detail pages (`/research/[pmid]`)
- 15 peptide detail pages (`/peptides/[slug]`)
- 5 article pages (`/learn/[slug]`)
- 14 standalone pages

## Important Conventions

### Dr. Taylor's Identity
- **Name:** Dr. Patrick Taylor, MD
- **Title:** Board-Eligible Family Medicine Physician
- **Location:** Salt Lake City, UT
- **Education:** UNC Chapel Hill School of Medicine, University of Utah Family Medicine Residency
- He did his residency at University of Utah — do NOT say he currently works there
- His photo is at `/images/dr-taylor.jpg` — used on about, home, peptide detail, and stacks pages (NOT in navbar)

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
- Current nav: Peptides, Stacks, Symptom Checker, Learn, Research, About Dr. Taylor

### Deployment
- Push to `main` branch auto-deploys to Vercel
- No need for `npx vercel --prod` anymore
- Build command: `next build`
- Node version: default

### Review Tools
- `review.html` — Dr. Taylor reviews bio, peptides, stacks, disclaimers
- `research-review.html` — Dr. Taylor reviews all 99 research studies
- Both auto-save to localStorage, export markdown of changes
- These are static HTML files in `/public/`, not part of the Next.js app

## Common Tasks

### Add a new peptide
1. Add entry to `src/data/peptides.ts` following existing pattern
2. It auto-generates a page at `/peptides/[slug]`
3. Update stacks in `src/data/stacks.ts` if it should appear in any

### Add a new research study
1. Add entry to `src/data/research.ts` with all fields including content and takeaways
2. It auto-generates a page at `/research/[pmid]`

### Add a new article
1. Add entry to `src/data/articles.ts`
2. It auto-generates a page at `/learn/[slug]`

### Add a new stack
1. Add entry to `src/data/stacks.ts`
2. Reference existing peptide IDs from `peptides.ts`

### Update Dr. Taylor's info
- Bio: `src/app/about/page.tsx` and `src/app/page.tsx`
- Photo: replace `public/images/dr-taylor.jpg`
- Clinical notes: `drTaylorNote` field in each peptide/stack entry
