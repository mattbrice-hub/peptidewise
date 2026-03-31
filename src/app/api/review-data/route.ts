import { NextResponse } from "next/server";
import { peptides } from "@/data/peptides";
import { stacks } from "@/data/stacks";
import { bio } from "@/data/bio";
import { disclaimers } from "@/data/disclaimers";

const categoryDisplayNames: Record<string, string> = {
  "tissue-repair": "Tissue Repair",
  "growth-hormone": "Growth Hormone",
  "weight-management": "Weight Management",
  "sexual-health": "Sexual Health",
  cognitive: "Cognitive / Anxiolytic",
  "anti-aging": "Anti-Aging",
  "skin-hair": "Skin & Hair",
  sleep: "Sleep",
  immune: "Immune",
};

function capitalize(s: string): string {
  return s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("-");
}

function formatRoutes(routes: string[]): string {
  return routes.map((r) => r.charAt(0).toUpperCase() + r.slice(1)).join(", ");
}

const peptideNameMap = new Map(peptides.map((p) => [p.id, p.name]));

export async function GET() {
  const transformedPeptides = peptides.map((p) => ({
    id: p.id,
    name: p.name,
    category: categoryDisplayNames[p.category] || p.category,
    researchStatus: capitalize(p.researchStatus),
    legalStatus: capitalize(p.legalStatus),
    researchScore: p.researchScore,
    safetyScore: p.safetyScore,
    description: p.description,
    detailedDescription: p.detailedDescription,
    benefits: p.benefits,
    dosage: p.typicalDosage,
    cycle: p.cycleLength,
    routes: formatRoutes(p.administrationRoutes),
    sideEffects: p.sideEffects,
    contraindications: p.contraindications,
    drTaylorNote: p.drTaylorNote,
    references: (p.references || []).map((r) => ({
      title: r.title,
      authors: r.authors,
      journal: r.journal,
      year: r.year,
      pmid: r.pmid || "",
      finding: r.finding,
    })),
  }));

  const transformedStacks = stacks.map((s) => ({
    id: s.id,
    name: s.name,
    subtitle: s.subtitle,
    highlight: s.highlight || "",
    peptides: s.peptideIds
      .map((id) => peptideNameMap.get(id) || id)
      .join(", "),
    target: s.targetSymptoms.join(", "),
    age: `${s.ageRange[0]}-${s.ageRange[1]}`,
    gender: s.genders.map((g) => g.charAt(0).toUpperCase() + g.slice(1)).join(", "),
    bmi: s.bmiCategory
      .map((b) => b.charAt(0).toUpperCase() + b.slice(1))
      .join(", "),
    description: s.description,
    drTaylorNote: s.drTaylorNote,
  }));

  return NextResponse.json({
    bio,
    peptides: transformedPeptides,
    stacks: transformedStacks,
    disclaimers,
  });
}
