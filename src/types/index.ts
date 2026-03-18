export type PeptideCategory =
  | "growth-hormone"
  | "weight-management"
  | "tissue-repair"
  | "anti-aging"
  | "cognitive"
  | "immune"
  | "sexual-health"
  | "sleep"
  | "skin-hair";

export interface Peptide {
  id: string;
  slug: string;
  name: string;
  aliases: string[];
  category: PeptideCategory;
  description: string;
  detailedDescription: string;
  benefits: string[];
  commonUses: string[];
  administrationRoutes: ("subcutaneous" | "oral" | "nasal" | "topical")[];
  typicalDosage: string;
  cycleLength: string;
  sideEffects: string[];
  contraindications: string[];
  researchStatus: "well-studied" | "emerging" | "limited";
  legalStatus: "prescription" | "research-only" | "supplement";
  symptomTags: string[];
  relatedPeptideIds: string[];
  fdaSearchTerms: string[];
  pubmedKeywords: string[];
  imageUrl: string;
}

export interface SymptomCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  symptoms: Symptom[];
}

export interface Symptom {
  id: string;
  name: string;
  categoryId: string;
  peptideMatches: PeptideMatch[];
}

export interface PeptideMatch {
  peptideId: string;
  relevanceScore: number;
  isPrimary: boolean;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  logo: string;
  website: string;
  description: string;
  established: number;
  location: string;
  isVerified: boolean;
  verificationDetails: string;
  requiresPrescription: boolean;
  offersTelehealth: boolean;
  shippingInfo: string;
  peptidePricing: PeptidePricing[];
  overallRating: number;
  totalReviews: number;
  highlights: string[];
  certifications: string[];
  tags: string[];
}

export interface PeptidePricing {
  peptideId: string;
  peptideName: string;
  price: number;
  unit: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  providerId: string;
  rating: number;
  title: string;
  body: string;
  author: string;
  date: string;
  peptidesPurchased: string[];
  verified: boolean;
  helpful: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "guide" | "research" | "safety" | "comparison";
  peptideIds: string[];
  publishedAt: string;
  readingTime: number;
  imageUrl: string;
}

export interface RecommendationResult {
  peptide: Peptide;
  matchScore: number;
  matchedSymptoms: string[];
  reasoning: string;
  providers: Provider[];
  bestPrice: number | null;
}

export interface SymptomCheckerState {
  step: number;
  selectedCategory: string | null;
  selectedSymptoms: string[];
  severity: "mild" | "moderate" | "severe";
  preferences: {
    administrationRoute: string | null;
    budgetRange: "budget" | "mid" | "premium" | null;
    prioritize: "effectiveness" | "safety" | "value" | null;
  };
}
