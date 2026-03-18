import { SymptomCategory } from "@/types";

export const symptomCategories: SymptomCategory[] = [
  // 1. Weight & Body Composition
  {
    id: "weight-body",
    name: "Weight & Body Composition",
    icon: "Scale",
    description:
      "Symptoms related to weight management, metabolism, and body composition changes.",
    symptoms: [
      {
        id: "difficulty-losing-weight",
        name: "Difficulty Losing Weight",
        categoryId: "weight-body",
        peptideMatches: [
          { peptideId: "semaglutide", relevanceScore: 95, isPrimary: true },
          { peptideId: "tirzepatide", relevanceScore: 93, isPrimary: true },
          { peptideId: "aod-9604", relevanceScore: 82, isPrimary: false },
          { peptideId: "cjc-1295", relevanceScore: 58, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 52, isPrimary: false },
        ],
      },
      {
        id: "slow-metabolism",
        name: "Slow Metabolism",
        categoryId: "weight-body",
        peptideMatches: [
          { peptideId: "tirzepatide", relevanceScore: 90, isPrimary: true },
          { peptideId: "semaglutide", relevanceScore: 88, isPrimary: true },
          { peptideId: "cjc-1295", relevanceScore: 65, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 60, isPrimary: false },
        ],
      },
      {
        id: "excess-belly-fat",
        name: "Excess Belly Fat",
        categoryId: "weight-body",
        peptideMatches: [
          { peptideId: "semaglutide", relevanceScore: 92, isPrimary: true },
          { peptideId: "tirzepatide", relevanceScore: 91, isPrimary: true },
          { peptideId: "aod-9604", relevanceScore: 85, isPrimary: false },
          { peptideId: "sermorelin", relevanceScore: 55, isPrimary: false },
          { peptideId: "cjc-1295", relevanceScore: 50, isPrimary: false },
        ],
      },
      {
        id: "increased-appetite",
        name: "Increased Appetite / Cravings",
        categoryId: "weight-body",
        peptideMatches: [
          { peptideId: "semaglutide", relevanceScore: 95, isPrimary: true },
          { peptideId: "tirzepatide", relevanceScore: 94, isPrimary: true },
          { peptideId: "aod-9604", relevanceScore: 45, isPrimary: false },
        ],
      },
      {
        id: "low-energy-from-weight",
        name: "Low Energy from Excess Weight",
        categoryId: "weight-body",
        peptideMatches: [
          { peptideId: "semaglutide", relevanceScore: 85, isPrimary: true },
          { peptideId: "tirzepatide", relevanceScore: 83, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 62, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 58, isPrimary: false },
          { peptideId: "cjc-1295", relevanceScore: 55, isPrimary: false },
        ],
      },
    ],
  },

  // 2. Sleep & Recovery
  {
    id: "sleep-recovery",
    name: "Sleep & Recovery",
    icon: "Moon",
    description:
      "Symptoms related to sleep quality, recovery from exercise, and growth hormone function.",
    symptoms: [
      {
        id: "poor-sleep-quality",
        name: "Poor Sleep Quality",
        categoryId: "sleep-recovery",
        peptideMatches: [
          { peptideId: "dsip", relevanceScore: 92, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 75, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 68, isPrimary: false },
          { peptideId: "selank", relevanceScore: 55, isPrimary: false },
        ],
      },
      {
        id: "difficulty-falling-asleep",
        name: "Difficulty Falling Asleep",
        categoryId: "sleep-recovery",
        peptideMatches: [
          { peptideId: "dsip", relevanceScore: 95, isPrimary: true },
          { peptideId: "selank", relevanceScore: 65, isPrimary: false },
          { peptideId: "sermorelin", relevanceScore: 55, isPrimary: false },
        ],
      },
      {
        id: "waking-unrefreshed",
        name: "Waking Up Unrefreshed",
        categoryId: "sleep-recovery",
        peptideMatches: [
          { peptideId: "dsip", relevanceScore: 88, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 72, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 65, isPrimary: false },
          { peptideId: "cjc-1295", relevanceScore: 58, isPrimary: false },
        ],
      },
      {
        id: "slow-muscle-recovery",
        name: "Slow Muscle Recovery",
        categoryId: "sleep-recovery",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 90, isPrimary: true },
          { peptideId: "tb-500", relevanceScore: 88, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 72, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 68, isPrimary: false },
          { peptideId: "cjc-1295", relevanceScore: 62, isPrimary: false },
        ],
      },
      {
        id: "low-hgh-symptoms",
        name: "Low HGH Symptoms",
        categoryId: "sleep-recovery",
        peptideMatches: [
          { peptideId: "sermorelin", relevanceScore: 95, isPrimary: true },
          { peptideId: "ipamorelin", relevanceScore: 92, isPrimary: true },
          { peptideId: "cjc-1295", relevanceScore: 90, isPrimary: true },
          { peptideId: "dsip", relevanceScore: 50, isPrimary: false },
        ],
      },
    ],
  },

  // 3. Pain & Inflammation
  {
    id: "pain-inflammation",
    name: "Pain & Inflammation",
    icon: "Flame",
    description:
      "Symptoms related to chronic pain, inflammation, tissue repair, and healing.",
    symptoms: [
      {
        id: "joint-pain",
        name: "Joint Pain",
        categoryId: "pain-inflammation",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 93, isPrimary: true },
          { peptideId: "tb-500", relevanceScore: 85, isPrimary: true },
          { peptideId: "kpv", relevanceScore: 55, isPrimary: false },
          { peptideId: "ghk-cu", relevanceScore: 48, isPrimary: false },
        ],
      },
      {
        id: "chronic-inflammation",
        name: "Chronic Inflammation",
        categoryId: "pain-inflammation",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 88, isPrimary: true },
          { peptideId: "kpv", relevanceScore: 85, isPrimary: true },
          { peptideId: "ll-37", relevanceScore: 72, isPrimary: false },
          { peptideId: "tb-500", relevanceScore: 70, isPrimary: false },
          { peptideId: "ghk-cu", relevanceScore: 55, isPrimary: false },
        ],
      },
      {
        id: "slow-wound-healing",
        name: "Slow Wound Healing",
        categoryId: "pain-inflammation",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 95, isPrimary: true },
          { peptideId: "tb-500", relevanceScore: 92, isPrimary: true },
          { peptideId: "ghk-cu", relevanceScore: 80, isPrimary: false },
          { peptideId: "ll-37", relevanceScore: 62, isPrimary: false },
        ],
      },
      {
        id: "tendon-ligament-issues",
        name: "Tendon & Ligament Issues",
        categoryId: "pain-inflammation",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 95, isPrimary: true },
          { peptideId: "tb-500", relevanceScore: 90, isPrimary: true },
          { peptideId: "ghk-cu", relevanceScore: 58, isPrimary: false },
        ],
      },
      {
        id: "gut-inflammation",
        name: "Gut Inflammation",
        categoryId: "pain-inflammation",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 95, isPrimary: true },
          { peptideId: "kpv", relevanceScore: 88, isPrimary: true },
          { peptideId: "ll-37", relevanceScore: 72, isPrimary: false },
          { peptideId: "tb-500", relevanceScore: 55, isPrimary: false },
        ],
      },
      {
        id: "post-surgical-pain",
        name: "Post-Surgical Pain & Healing",
        categoryId: "pain-inflammation",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 92, isPrimary: true },
          { peptideId: "tb-500", relevanceScore: 90, isPrimary: true },
          { peptideId: "ghk-cu", relevanceScore: 68, isPrimary: false },
          { peptideId: "kpv", relevanceScore: 55, isPrimary: false },
          { peptideId: "ll-37", relevanceScore: 50, isPrimary: false },
        ],
      },
    ],
  },

  // 4. Cognitive & Mood
  {
    id: "cognitive-mood",
    name: "Cognitive & Mood",
    icon: "Brain",
    description:
      "Symptoms related to mental clarity, focus, mood stability, and cognitive performance.",
    symptoms: [
      {
        id: "brain-fog",
        name: "Brain Fog",
        categoryId: "cognitive-mood",
        peptideMatches: [
          { peptideId: "selank", relevanceScore: 88, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 62, isPrimary: false },
          { peptideId: "epithalon", relevanceScore: 50, isPrimary: false },
          { peptideId: "dsip", relevanceScore: 45, isPrimary: false },
        ],
      },
      {
        id: "anxiety",
        name: "Anxiety & Stress",
        categoryId: "cognitive-mood",
        peptideMatches: [
          { peptideId: "selank", relevanceScore: 93, isPrimary: true },
          { peptideId: "dsip", relevanceScore: 60, isPrimary: false },
        ],
      },
      {
        id: "poor-focus",
        name: "Poor Focus & Concentration",
        categoryId: "cognitive-mood",
        peptideMatches: [
          { peptideId: "selank", relevanceScore: 90, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 55, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 48, isPrimary: false },
        ],
      },
      {
        id: "mood-swings",
        name: "Mood Swings",
        categoryId: "cognitive-mood",
        peptideMatches: [
          { peptideId: "selank", relevanceScore: 85, isPrimary: true },
          { peptideId: "dsip", relevanceScore: 58, isPrimary: false },
          { peptideId: "pt-141", relevanceScore: 35, isPrimary: false },
        ],
      },
      {
        id: "mental-fatigue",
        name: "Mental Fatigue",
        categoryId: "cognitive-mood",
        peptideMatches: [
          { peptideId: "selank", relevanceScore: 85, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 65, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 58, isPrimary: false },
          { peptideId: "cjc-1295", relevanceScore: 52, isPrimary: false },
          { peptideId: "dsip", relevanceScore: 48, isPrimary: false },
        ],
      },
    ],
  },

  // 5. Aging & Longevity
  {
    id: "aging-longevity",
    name: "Aging & Longevity",
    icon: "Clock",
    description:
      "Symptoms related to the aging process, vitality, cellular health, and longevity.",
    symptoms: [
      {
        id: "premature-aging",
        name: "Premature Aging Signs",
        categoryId: "aging-longevity",
        peptideMatches: [
          { peptideId: "epithalon", relevanceScore: 95, isPrimary: true },
          { peptideId: "ghk-cu", relevanceScore: 88, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 65, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 58, isPrimary: false },
        ],
      },
      {
        id: "low-energy-aging",
        name: "Low Energy & Vitality",
        categoryId: "aging-longevity",
        peptideMatches: [
          { peptideId: "sermorelin", relevanceScore: 88, isPrimary: true },
          { peptideId: "ipamorelin", relevanceScore: 85, isPrimary: true },
          { peptideId: "cjc-1295", relevanceScore: 82, isPrimary: false },
          { peptideId: "epithalon", relevanceScore: 62, isPrimary: false },
        ],
      },
      {
        id: "declining-vitality",
        name: "Declining Physical Vitality",
        categoryId: "aging-longevity",
        peptideMatches: [
          { peptideId: "sermorelin", relevanceScore: 90, isPrimary: true },
          { peptideId: "cjc-1295", relevanceScore: 85, isPrimary: true },
          { peptideId: "ipamorelin", relevanceScore: 82, isPrimary: false },
          { peptideId: "epithalon", relevanceScore: 68, isPrimary: false },
          { peptideId: "tb-500", relevanceScore: 45, isPrimary: false },
        ],
      },
      {
        id: "telomere-concerns",
        name: "Telomere & Cellular Aging Concerns",
        categoryId: "aging-longevity",
        peptideMatches: [
          { peptideId: "epithalon", relevanceScore: 95, isPrimary: true },
          { peptideId: "ghk-cu", relevanceScore: 65, isPrimary: false },
        ],
      },
      {
        id: "age-related-decline",
        name: "General Age-Related Decline",
        categoryId: "aging-longevity",
        peptideMatches: [
          { peptideId: "epithalon", relevanceScore: 88, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 82, isPrimary: true },
          { peptideId: "ipamorelin", relevanceScore: 78, isPrimary: false },
          { peptideId: "cjc-1295", relevanceScore: 75, isPrimary: false },
          { peptideId: "ghk-cu", relevanceScore: 62, isPrimary: false },
        ],
      },
    ],
  },

  // 6. Immune Health
  {
    id: "immune-health",
    name: "Immune Health",
    icon: "Shield",
    description:
      "Symptoms related to immune system function, infection resistance, and immune balance.",
    symptoms: [
      {
        id: "frequent-infections",
        name: "Frequent Infections",
        categoryId: "immune-health",
        peptideMatches: [
          { peptideId: "ll-37", relevanceScore: 92, isPrimary: true },
          { peptideId: "selank", relevanceScore: 68, isPrimary: false },
          { peptideId: "kpv", relevanceScore: 58, isPrimary: false },
          { peptideId: "epithalon", relevanceScore: 45, isPrimary: false },
        ],
      },
      {
        id: "slow-immune-healing",
        name: "Slow Healing & Recovery",
        categoryId: "immune-health",
        peptideMatches: [
          { peptideId: "tb-500", relevanceScore: 88, isPrimary: true },
          { peptideId: "bpc-157", relevanceScore: 85, isPrimary: true },
          { peptideId: "ll-37", relevanceScore: 72, isPrimary: false },
          { peptideId: "ghk-cu", relevanceScore: 68, isPrimary: false },
        ],
      },
      {
        id: "autoimmune-concerns",
        name: "Autoimmune Concerns",
        categoryId: "immune-health",
        peptideMatches: [
          { peptideId: "kpv", relevanceScore: 88, isPrimary: true },
          { peptideId: "bpc-157", relevanceScore: 72, isPrimary: false },
          { peptideId: "selank", relevanceScore: 60, isPrimary: false },
          { peptideId: "ll-37", relevanceScore: 55, isPrimary: false },
        ],
      },
      {
        id: "chronic-inflammation-immune",
        name: "Chronic Immune Inflammation",
        categoryId: "immune-health",
        peptideMatches: [
          { peptideId: "kpv", relevanceScore: 90, isPrimary: true },
          { peptideId: "ll-37", relevanceScore: 78, isPrimary: false },
          { peptideId: "bpc-157", relevanceScore: 72, isPrimary: false },
          { peptideId: "selank", relevanceScore: 55, isPrimary: false },
          { peptideId: "ghk-cu", relevanceScore: 45, isPrimary: false },
        ],
      },
      {
        id: "gut-immune-issues",
        name: "Gut Immune Dysfunction",
        categoryId: "immune-health",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 90, isPrimary: true },
          { peptideId: "kpv", relevanceScore: 85, isPrimary: true },
          { peptideId: "ll-37", relevanceScore: 75, isPrimary: false },
        ],
      },
    ],
  },

  // 7. Sexual Health
  {
    id: "sexual-health",
    name: "Sexual Health",
    icon: "Heart",
    description:
      "Symptoms related to sexual function, libido, performance, and hormonal wellness.",
    symptoms: [
      {
        id: "low-libido",
        name: "Low Libido",
        categoryId: "sexual-health",
        peptideMatches: [
          { peptideId: "pt-141", relevanceScore: 95, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 58, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 50, isPrimary: false },
        ],
      },
      {
        id: "erectile-dysfunction",
        name: "Erectile Dysfunction",
        categoryId: "sexual-health",
        peptideMatches: [
          { peptideId: "pt-141", relevanceScore: 93, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 52, isPrimary: false },
          { peptideId: "cjc-1295", relevanceScore: 42, isPrimary: false },
        ],
      },
      {
        id: "sexual-performance",
        name: "Sexual Performance Concerns",
        categoryId: "sexual-health",
        peptideMatches: [
          { peptideId: "pt-141", relevanceScore: 92, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 55, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 48, isPrimary: false },
          { peptideId: "cjc-1295", relevanceScore: 42, isPrimary: false },
        ],
      },
      {
        id: "hormonal-imbalance",
        name: "Hormonal Imbalance",
        categoryId: "sexual-health",
        peptideMatches: [
          { peptideId: "sermorelin", relevanceScore: 82, isPrimary: true },
          { peptideId: "ipamorelin", relevanceScore: 78, isPrimary: true },
          { peptideId: "cjc-1295", relevanceScore: 75, isPrimary: false },
          { peptideId: "pt-141", relevanceScore: 55, isPrimary: false },
          { peptideId: "epithalon", relevanceScore: 40, isPrimary: false },
        ],
      },
    ],
  },

  // 8. Skin & Hair
  {
    id: "skin-hair",
    name: "Skin & Hair",
    icon: "Sparkles",
    description:
      "Symptoms related to skin health, hair quality, wound healing, and appearance.",
    symptoms: [
      {
        id: "wrinkles-fine-lines",
        name: "Wrinkles & Fine Lines",
        categoryId: "skin-hair",
        peptideMatches: [
          { peptideId: "ghk-cu", relevanceScore: 95, isPrimary: true },
          { peptideId: "epithalon", relevanceScore: 68, isPrimary: false },
          { peptideId: "sermorelin", relevanceScore: 55, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 48, isPrimary: false },
        ],
      },
      {
        id: "hair-thinning",
        name: "Hair Thinning & Loss",
        categoryId: "skin-hair",
        peptideMatches: [
          { peptideId: "ghk-cu", relevanceScore: 90, isPrimary: true },
          { peptideId: "sermorelin", relevanceScore: 58, isPrimary: false },
          { peptideId: "ipamorelin", relevanceScore: 52, isPrimary: false },
        ],
      },
      {
        id: "slow-skin-healing",
        name: "Slow Skin Wound Healing",
        categoryId: "skin-hair",
        peptideMatches: [
          { peptideId: "ghk-cu", relevanceScore: 92, isPrimary: true },
          { peptideId: "bpc-157", relevanceScore: 85, isPrimary: true },
          { peptideId: "tb-500", relevanceScore: 78, isPrimary: false },
          { peptideId: "ll-37", relevanceScore: 60, isPrimary: false },
        ],
      },
      {
        id: "dull-skin",
        name: "Dull & Aging Skin",
        categoryId: "skin-hair",
        peptideMatches: [
          { peptideId: "ghk-cu", relevanceScore: 93, isPrimary: true },
          { peptideId: "epithalon", relevanceScore: 65, isPrimary: false },
          { peptideId: "sermorelin", relevanceScore: 52, isPrimary: false },
        ],
      },
      {
        id: "acne-scarring",
        name: "Acne & Scarring",
        categoryId: "skin-hair",
        peptideMatches: [
          { peptideId: "ghk-cu", relevanceScore: 88, isPrimary: true },
          { peptideId: "bpc-157", relevanceScore: 72, isPrimary: false },
          { peptideId: "kpv", relevanceScore: 65, isPrimary: false },
          { peptideId: "ll-37", relevanceScore: 55, isPrimary: false },
          { peptideId: "tb-500", relevanceScore: 48, isPrimary: false },
        ],
      },
    ],
  },

  // 9. Gut Health
  {
    id: "gut-health",
    name: "Gut Health",
    icon: "Apple",
    description:
      "Symptoms related to digestive health, gut lining integrity, and gastrointestinal comfort.",
    symptoms: [
      {
        id: "ibs-symptoms",
        name: "IBS Symptoms",
        categoryId: "gut-health",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 93, isPrimary: true },
          { peptideId: "kpv", relevanceScore: 82, isPrimary: true },
          { peptideId: "ll-37", relevanceScore: 62, isPrimary: false },
        ],
      },
      {
        id: "leaky-gut",
        name: "Leaky Gut / Intestinal Permeability",
        categoryId: "gut-health",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 95, isPrimary: true },
          { peptideId: "kpv", relevanceScore: 80, isPrimary: false },
          { peptideId: "ll-37", relevanceScore: 68, isPrimary: false },
          { peptideId: "tb-500", relevanceScore: 48, isPrimary: false },
        ],
      },
      {
        id: "bloating",
        name: "Bloating & Digestive Discomfort",
        categoryId: "gut-health",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 88, isPrimary: true },
          { peptideId: "kpv", relevanceScore: 72, isPrimary: false },
          { peptideId: "ll-37", relevanceScore: 55, isPrimary: false },
        ],
      },
      {
        id: "gut-inflammation-digestive",
        name: "Gut Inflammation",
        categoryId: "gut-health",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 95, isPrimary: true },
          { peptideId: "kpv", relevanceScore: 90, isPrimary: true },
          { peptideId: "ll-37", relevanceScore: 75, isPrimary: false },
          { peptideId: "tb-500", relevanceScore: 52, isPrimary: false },
          { peptideId: "ghk-cu", relevanceScore: 38, isPrimary: false },
        ],
      },
      {
        id: "food-sensitivities",
        name: "Food Sensitivities & Intolerances",
        categoryId: "gut-health",
        peptideMatches: [
          { peptideId: "bpc-157", relevanceScore: 85, isPrimary: true },
          { peptideId: "kpv", relevanceScore: 78, isPrimary: false },
          { peptideId: "ll-37", relevanceScore: 60, isPrimary: false },
          { peptideId: "selank", relevanceScore: 38, isPrimary: false },
        ],
      },
    ],
  },
];
