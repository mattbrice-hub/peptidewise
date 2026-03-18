import { Peptide, SymptomCategory, Provider, RecommendationResult } from "@/types";

interface RecommendationParams {
  symptomIds: string[];
  severity: "mild" | "moderate" | "severe";
  priority: "effectiveness" | "safety" | "value";
  category?: string;
}

export function getRecommendations(
  params: RecommendationParams,
  peptides: Peptide[],
  symptomCategories: SymptomCategory[],
  providers: Provider[]
): RecommendationResult[] {
  const { symptomIds, severity, priority } = params;

  // Build peptide score map
  const scoreMap = new Map<string, { total: number; matched: string[]; count: number }>();

  // Find all matching symptoms across categories
  for (const category of symptomCategories) {
    for (const symptom of category.symptoms) {
      if (symptomIds.includes(symptom.id)) {
        for (const match of symptom.peptideMatches) {
          const existing = scoreMap.get(match.peptideId) || {
            total: 0,
            matched: [],
            count: 0,
          };
          existing.total += match.relevanceScore;
          existing.matched.push(symptom.name);
          existing.count += 1;
          scoreMap.set(match.peptideId, existing);
        }
      }
    }
  }

  // Convert to results with multipliers
  const results: RecommendationResult[] = [];

  for (const [peptideId, data] of scoreMap.entries()) {
    const peptide = peptides.find((p) => p.id === peptideId);
    if (!peptide) continue;

    let score = data.total / data.count; // Average relevance

    // Apply priority multipliers
    if (priority === "safety" && peptide.researchStatus === "well-studied") {
      score *= 1.3;
    } else if (priority === "safety" && peptide.researchStatus === "limited") {
      score *= 0.7;
    }

    // Severity modifier
    if (severity === "severe" && peptide.researchStatus === "well-studied") {
      score *= 1.15;
    } else if (severity === "mild" && peptide.researchStatus === "limited") {
      score *= 1.1; // Mild cases can try emerging options
    }

    // Multi-symptom bonus (addresses more symptoms = better)
    score *= 1 + (data.count - 1) * 0.1;

    // Find providers carrying this peptide
    const matchingProviders = providers.filter((prov) =>
      prov.peptidePricing.some((pp) => pp.peptideId === peptideId && pp.inStock)
    );

    // Best price
    const prices = matchingProviders
      .flatMap((prov) => prov.peptidePricing)
      .filter((pp) => pp.peptideId === peptideId && pp.inStock)
      .map((pp) => pp.price);
    const bestPrice = prices.length > 0 ? Math.min(...prices) : null;

    // Value priority boost for cheaper peptides
    if (priority === "value" && bestPrice) {
      if (bestPrice < 100) score *= 1.2;
      else if (bestPrice < 200) score *= 1.1;
    }

    // Generate reasoning
    const reasoning = generateReasoning(peptide, data.matched, severity, priority);

    results.push({
      peptide,
      matchScore: Math.min(Math.round(score), 99),
      matchedSymptoms: data.matched,
      reasoning,
      providers: matchingProviders,
      bestPrice,
    });
  }

  // Sort by score descending
  results.sort((a, b) => b.matchScore - a.matchScore);

  return results.slice(0, 8);
}

function generateReasoning(
  peptide: Peptide,
  matchedSymptoms: string[],
  severity: string,
  priority: string
): string {
  const sympCount = matchedSymptoms.length;
  const sympText = sympCount === 1
    ? `your symptom of ${matchedSymptoms[0].toLowerCase()}`
    : `${sympCount} of your symptoms`;

  let base = `${peptide.name} addresses ${sympText}`;

  if (peptide.researchStatus === "well-studied") {
    base += " and has strong clinical evidence supporting its use";
  } else if (peptide.researchStatus === "emerging") {
    base += " with growing research support";
  } else {
    base += ", though research is still early-stage";
  }

  if (priority === "safety") {
    base += ". Prioritized for its safety profile";
  } else if (priority === "value") {
    base += ". Selected for best value";
  }

  return base + ".";
}
