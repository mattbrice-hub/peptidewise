# PeptideWise Visual Redesign — Design Spec

**Date:** 2026-04-01
**Direction:** Warm Editorial
**Typography:** Cormorant Garamond + DM Sans
**Palette:** Earthy Amber
**Scope:** Full reskin + layout refresh on key pages

---

## 1. Color System

All colors defined as CSS custom properties in `globals.css`. Tailwind config extended to reference them.

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-base` | `#2c2418` | `44 36 24` | Primary text, navbar bg, footer bg, headings |
| `--color-text` | `#5a4d3a` | `90 77 58` | Body copy, paragraph text |
| `--color-muted` | `#8a7d6b` | `138 125 107` | Secondary text, metadata, timestamps, labels |
| `--color-accent` | `#b4784c` | `180 120 76` | CTAs, links, hover states, active indicators |
| `--color-accent-hover` | `#9a6640` | `154 102 64` | Darkened accent for hover/active states |
| `--color-accent-light` | `#c4a882` | `196 168 130` | Decorative borders, subtle highlights, dividers |
| `--color-surface` | `#faf7f2` | `250 247 242` | Page background |
| `--color-card` | `#f0ebe3` | `240 235 227` | Card backgrounds, alternating section backgrounds |
| `--color-border` | `#e8e0d4` | `232 224 212` | Card borders, section dividers, table borders |
| `--color-white` | `#fffdf9` | `255 253 249` | Bright surface for high-contrast areas |

### Category Badge Colors

Replace current Tailwind defaults with earth-toned badges:

| Category | Background | Text |
|----------|-----------|------|
| Tissue Repair | `#f0e8dc` | `#8b6914` |
| Weight Management | `#e8efe3` | `#4a5e3a` |
| Growth Hormone | `#e8e0d4` | `#6b5a3e` |
| Anti-Aging | `#f5ede4` | `#8b5c2a` |
| Cognitive | `#ede8e0` | `#5a4d3a` |
| Immune | `#e3ebe8` | `#3e5a4a` |
| Sexual Health | `#f0e8e4` | `#7a4a3e` |
| Sleep | `#e8e4f0` | `#4a3e6b` |
| Skin & Hair | `#f0ebe3` | `#6b5a3e` |

---

## 2. Typography

### Fonts

- **Heading font:** Cormorant Garamond (Google Fonts) — weights 400, 600, 700, italic 400
- **Body font:** DM Sans (Google Fonts) — weights 400, 500, 600

Load via `next/font/google` in `layout.tsx` for optimal performance.

### Type Scale

| Element | Font | Size | Weight | Line Height | Tracking |
|---------|------|------|--------|-------------|----------|
| Hero title | Cormorant Garamond | 48px (3xl→5xl responsive) | 600 | 1.1 | -0.02em |
| Page title | Cormorant Garamond | 36px (2xl→4xl responsive) | 600 | 1.2 | -0.01em |
| Section heading | Cormorant Garamond | 24px | 600 | 1.3 | normal |
| Card title | Cormorant Garamond | 20px | 600 | 1.3 | normal |
| Subheading | DM Sans | 18px | 600 | 1.4 | normal |
| Body | DM Sans | 16px | 400 | 1.7 | normal |
| Small / labels | DM Sans | 14px | 500 | 1.5 | normal |
| XS / metadata | DM Sans | 12px | 500 | 1.4 | 0.02em |
| Eyebrow labels | DM Sans | 12px | 600 | 1 | 0.15em (uppercase) |

---

## 3. Component Changes

### Navbar (`src/components/layout/Navbar.tsx`)

- **Background:** `--color-base` (#2c2418) solid, no blur/transparency
- **Logo:** "Peptide" + "Wise" in Cormorant Garamond 600, color `--color-surface`
- **Nav links:** DM Sans 14px 500, color `rgba(250,247,242,0.7)`, hover → `--color-surface`
- **Hover effect:** Warm underline that slides in from left (2px tall, `--color-accent`)
- **CTA button:** Background `--color-accent`, color `--color-surface`, rounded-md, hover darkens to `--color-accent-hover`
- **Mobile menu:** Dark background matching navbar, same warm color scheme
- **Remove:** FlaskConical icon from logo (text-only logo for editorial feel)

### Footer (`src/components/layout/Footer.tsx`)

- **Background:** `--color-base` (#2c2418) matching navbar
- **Text colors:** Headings in `--color-surface`, body in `rgba(250,247,242,0.6)`
- **Links:** Hover → `--color-accent`
- **Disclaimer box:** `rgba(250,247,242,0.05)` background with `rgba(250,247,242,0.1)` border
- **Decorative divider:** Thin line using `--color-accent-light` at 30% opacity above footer

### Cards (used across peptides, research, learn, protocols)

- **Background:** `--color-card` (#f0ebe3)
- **Border:** 1px `--color-border`
- **Border radius:** rounded-xl (12px)
- **Shadow:** `0 1px 3px rgba(44, 36, 24, 0.06)` (warm shadow, not gray)
- **Hover:** `translateY(-2px)` + shadow expands to `0 8px 24px rgba(44, 36, 24, 0.1)`, transition 0.3s ease
- **Title:** Cormorant Garamond 600
- **Body text:** DM Sans 400 in `--color-text`
- **Metadata/labels:** DM Sans 500 in `--color-muted`

### Buttons

- **Primary:** Background `--color-accent`, text `--color-surface`, DM Sans 500, rounded-md, hover → `--color-accent-hover`, subtle shadow
- **Secondary:** Background transparent, border 1px `--color-accent-light`, text `--color-base`, hover → background `--color-card`
- **Ghost:** No border, text `--color-accent`, hover → underline

### Breadcrumbs (`src/components/Breadcrumbs.tsx`)

- Separator: thin "/" in `--color-muted`
- Link color: `--color-accent`, hover underline
- Current page: `--color-base`, no link

---

## 4. Page-Specific Layout Changes

### Homepage (`src/app/page.tsx`)

**Hero section:**
- Remove centered blue gradient overlay
- Asymmetric two-column layout: left column has eyebrow label ("Evidence-Based Peptide Education") + large Cormorant headline + subtitle + dual CTAs; right column has a warm decorative element or Dr. Taylor's photo with subtle border treatment
- Background: subtle radial gradient from `--color-card` at top-left to `--color-surface`
- Decorative thin line divider below hero (gradient: transparent → `--color-accent-light` → transparent)

**Featured peptides section:**
- Section title in Cormorant Garamond with eyebrow label above
- Cards in warm `--color-card` with hover lift
- 3-column grid on desktop, 1 on mobile

**Trust/credentials section:**
- Dr. Taylor photo with warm border treatment
- Credentials in editorial layout — Cormorant heading, DM Sans body

### Peptides Listing (`src/app/peptides/page.tsx`)

- Page title in Cormorant Garamond
- Category filter pills: warm earth tones per category table above
- Cards: cream background, serif title, sans-serif description

### Peptide Detail (`src/app/peptides/[slug]/page.tsx`)

- Title: large Cormorant Garamond
- Dr. Taylor's notes: styled as editorial pull-quote — left border in `--color-accent`, italic Cormorant, slightly indented
- Section headings: Cormorant with thin decorative underline
- Dosage/side effects/etc: clean DM Sans in structured layout

### Protocols / Stacks (`src/app/stacks/page.tsx`)

- Same card treatment as peptides
- Protocol names in Cormorant Garamond

### Research Listing (`src/app/research/page.tsx`)

- Journal-style listing — study title in Cormorant, metadata in DM Sans muted
- Cards with warm background

### Learn / Articles (`src/app/learn/`)

- Article titles: large Cormorant Garamond
- Body content: DM Sans with generous line height (1.7)
- Pull quotes and highlights using accent border treatment

---

## 5. Motion & Interaction

All animations use CSS transitions/keyframes. No additional libraries needed.

### Page Load
- Hero content fades in with stagger: eyebrow (0ms) → title (100ms) → subtitle (200ms) → CTAs (300ms)
- `@keyframes fadeInUp`: opacity 0 → 1, translateY(12px) → 0, duration 0.5s, ease-out

### Cards
- Hover: `transform: translateY(-2px)`, `box-shadow` expands, transition 0.3s ease
- No animation on initial load (avoid excessive motion)

### Navigation
- Link hover: 2px underline slides in from left, `--color-accent`, transition 0.2s ease
- Mobile menu: slides down with opacity transition

### Decorative
- Thin horizontal line dividers between major sections: gradient `transparent → --color-accent-light → transparent`

---

## 6. Files to Modify

| File | Changes |
|------|---------|
| `src/app/layout.tsx` | Replace Inter with Cormorant Garamond + DM Sans via next/font/google |
| `src/app/globals.css` | Replace all CSS variables, add animation keyframes, update gradient utilities |
| `tailwind.config.ts` | Extend theme with new color tokens, font families, custom shadows |
| `src/components/layout/Navbar.tsx` | Dark background, serif logo, warm link styles, amber CTA |
| `src/components/layout/Footer.tsx` | Dark background, warm text colors, updated disclaimer styling |
| `src/app/page.tsx` | Asymmetric hero, updated section styling, warm cards |
| `src/app/peptides/page.tsx` | Updated cards, category badges, typography |
| `src/app/peptides/[slug]/page.tsx` | Editorial detail layout, pull-quote Dr. Taylor notes |
| `src/app/stacks/page.tsx` | Updated cards and typography |
| `src/app/research/page.tsx` | Journal-style listing, warm cards |
| `src/app/learn/page.tsx` | Article listing with editorial typography |
| `src/app/learn/[slug]/page.tsx` | Article detail with generous spacing and pull quotes |
| `src/app/about/page.tsx` | Updated with editorial typography and warm styling |
| `src/app/symptom-checker/page.tsx` | Updated form styling with warm palette |
| `src/app/results/page.tsx` | Updated results display |
| `src/components/Breadcrumbs.tsx` | Warm colors |
| `src/components/LeadCaptureGate.tsx` | Updated to match warm palette |
| `src/components/JsonLd.tsx` | No visual changes needed |
| `src/lib/utils.ts` | Update getCategoryColor to return earth-toned badge colors |

---

## 7. What Does NOT Change

- All data files (`src/data/*`) — content stays the same
- TypeScript types (`src/types/index.ts`)
- API routes (`src/app/api/*`)
- SEO utilities (`src/lib/seo.ts`)
- Sitemap and robots files
- Supabase integration
- Lead capture functionality and localStorage behavior
- Navigation structure and page routing
- JSON-LD structured data
