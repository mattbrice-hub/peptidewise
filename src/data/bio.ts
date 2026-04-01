export interface BioData {
  id: string;
  title: string;
  fields: Record<string, { label: string; value: string }>;
}

export const bio: BioData = {
  id: "bio",
  title: "About Dr. Taylor \u2014 Bio & Background",
  fields: {
    homepage_bio: {
      label: "Homepage Bio",
      value:
        "Family medicine physician specializing in obesity and lifestyle medicine, chronic disease management, and sports medicine. A cancer and Cushing\u2019s syndrome survivor who lost over 100 lbs, Dr. Taylor founded Live Vital MD to deliver proactive, optimization-focused healthcare.",
    },
    credentials_line: {
      label: "Credentials Line",
      value:
        "UNC Chapel Hill School of Medicine \u00b7 University of Utah Family Medicine Residency",
    },
    header_title: {
      label: "Header Title",
      value: "Dr. Patrick Taylor, MD",
    },
    header_subtitle: {
      label: "Header Subtitle",
      value: "Family Medicine Physician",
    },
    header_location: {
      label: "Location",
      value: "Salt Lake City, UT",
    },
    his_story: {
      label: "His Story (About Page)",
      value:
        "Dr. Patrick Taylor\u2019s path to medicine was shaped by personal adversity. After surviving cancer treatment and subsequently developing Cushing\u2019s syndrome \u2014 a condition that caused dramatic weight gain \u2014 he found himself over 100 lbs heavier and struggling with the metabolic consequences.\n\nThrough a combination of evidence-based medicine, lifestyle optimization, and peptide therapy, Dr. Taylor lost the weight and reclaimed his health. This transformative experience gave him a deeply personal understanding of metabolic disease and the power of proactive medicine \u2014 something he now brings to every patient interaction.\n\nA former championship rugby player at BYU, Dr. Taylor understands the demands athletes place on their bodies and the importance of recovery, performance optimization, and longevity. He founded Live Vital MD to provide data-driven, proactive healthcare that goes beyond just managing sickness \u2014 focusing instead on optimizing health, extending healthspan, and helping patients thrive.",
    },
    why_peptides: {
      label: "Why Peptides? (Quotes attributed to you)",
      value:
        '"Peptides represent one of the most exciting frontiers in medicine today. These are molecules that your body already makes \u2014 we\'re not introducing foreign substances, we\'re supplementing and optimizing natural biological pathways."\n\n"After my own health crisis, I dove deep into the peptide research literature. I was struck by how much solid science existed for compounds like BPC-157, semaglutide, and GHK-Cu \u2014 yet how little of that information was reaching patients in an accessible, honest format. That\'s why I created PeptideWise: to bridge the gap between the research and the people who can benefit from understanding it."\n\n"My commitment is to education, not sales. I want you to understand the evidence \u2014 what\'s proven, what\'s promising, and what\'s still unknown. Peptide therapy should always be supervised by a qualified physician who can evaluate your individual needs, monitor your labs, and adjust protocols based on your response."',
    },
    education: {
      label: "Education & Training",
      value:
        "Residency: Family Medicine \u2014 University of Utah, Salt Lake City, UT\nMedical Degree: Doctor of Medicine (MD) \u2014 University of North Carolina at Chapel Hill, School of Medicine",
    },
    clinical_interests: {
      label: "Clinical Interests",
      value:
        "Obesity & Lifestyle Medicine\nPeptide Therapy Protocols\nChronic Disease Management\nSports Medicine & Athletic Recovery\nPreventive & Longevity Medicine",
    },
  },
};
