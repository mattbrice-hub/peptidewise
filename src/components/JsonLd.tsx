interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── Pre-built schema helpers ── */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PeptideWise",
    url: "https://peptidewise.vercel.app",
    logo: "https://peptidewise.vercel.app/images/dr-taylor.jpg",
    description:
      "Evidence-based peptide therapy education by Dr. Patrick Taylor, MD.",
    founder: {
      "@type": "Person",
      name: "Dr. Patrick Taylor",
      jobTitle: "Family Medicine Physician",
    },
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PeptideWise",
    url: "https://peptidewise.vercel.app",
    description:
      "Evidence-based peptide therapy education by Dr. Patrick Taylor, MD.",
    publisher: {
      "@type": "Organization",
      name: "PeptideWise",
    },
  };
}

export function physicianSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: "Dr. Patrick Taylor, MD",
    jobTitle: "Family Medicine Physician",
    description:
      "Cancer survivor and founder of Live Vital MD. Specializes in obesity medicine, peptide therapy, and lifestyle optimization.",
    url: "https://peptidewise.vercel.app/about",
    image: "https://peptidewise.vercel.app/images/dr-taylor.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Salt Lake City",
      addressRegion: "UT",
      addressCountry: "US",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "University of North Carolina at Chapel Hill School of Medicine",
      },
      {
        "@type": "EducationalOrganization",
        name: "University of Utah Family Medicine Residency",
      },
    ],
    medicalSpecialty: "Family Medicine",
    knowsAbout: [
      "Peptide Therapy",
      "Obesity Medicine",
      "Lifestyle Medicine",
      "Sports Medicine",
    ],
  };
}

export function medicalWebPageSchema({
  name,
  description,
  url,
  lastReviewed,
}: {
  name: string;
  description: string;
  url: string;
  lastReviewed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name,
    description,
    url,
    ...(lastReviewed && { lastReviewed }),
    author: {
      "@type": "Physician",
      name: "Dr. Patrick Taylor, MD",
    },
    publisher: {
      "@type": "Organization",
      name: "PeptideWise",
    },
    medicalAudience: {
      "@type": "Patient",
    },
  };
}

export function articleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
}: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    datePublished,
    ...(dateModified && { dateModified }),
    author: {
      "@type": "Physician",
      name: "Dr. Patrick Taylor, MD",
    },
    publisher: {
      "@type": "Organization",
      name: "PeptideWise",
      logo: {
        "@type": "ImageObject",
        url: "https://peptidewise.vercel.app/images/dr-taylor.jpg",
      },
    },
    image: "https://peptidewise.vercel.app/images/dr-taylor.jpg",
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
