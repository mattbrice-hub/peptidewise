export interface PeptideProtocol {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  peptideIds: string[];
  targetSymptoms: string[];
  ageRange: [number, number]; // [min, max]
  genders: ("male" | "female" | "all")[];
  bmiCategory: ("underweight" | "normal" | "overweight" | "obese" | "all")[];
  icon: string;
  highlight?: string;
  drTaylorNote: string;
}

/** @deprecated Use PeptideProtocol instead */
export type PeptideStack = PeptideProtocol;

export const stacks: PeptideProtocol[] = [
  {
    id: "tissue-repair",
    name: "Recovery & Repair Protocol",
    subtitle: "Accelerate healing from injuries and surgery",
    description:
      "Dr. Taylor's go-to combination for patients dealing with tendon, ligament, or muscle injuries. BPC-157 and TB-500 work synergistically — BPC-157 promotes angiogenesis and gut healing while TB-500 upregulates actin for cellular repair. Adding GHK-Cu supports tissue remodeling at the skin and connective tissue level.",
    peptideIds: ["bpc-157", "tb-500", "ghk-cu"],
    targetSymptoms: [
      "joint-pain",
      "chronic-inflammation",
      "slow-wound-healing",
      "tendon-ligament-issues",
      "gut-inflammation",
    ],
    ageRange: [25, 80],
    genders: ["all"],
    bmiCategory: ["all"],
    icon: "flame",
    highlight: "Most Popular",
    drTaylorNote: "This is my most-prescribed stack. BPC-157 and TB-500 are synergistic \u2014 they hit different repair pathways and the results together are greater than the sum of their parts. I add GHK-Cu for patients over 40 or those with connective tissue damage. Start BPC-157 and TB-500 together, then layer in GHK-Cu after 2 weeks.",
  },
  {
    id: "weight-loss-male",
    name: "Body Recomposition Protocol",
    subtitle: "Metabolic optimization for weight loss",
    description:
      "A research-supported approach combining GLP-1 receptor agonism with growth hormone optimization. Tirzepatide (or semaglutide) addresses appetite regulation and insulin sensitivity, while Ipamorelin + CJC-1295 stimulate natural GH release to support lean mass preservation during caloric deficit.",
    peptideIds: ["tirzepatide", "ipamorelin", "cjc-1295"],
    targetSymptoms: [
      "difficulty-losing-weight",
      "slow-metabolism",
      "excess-belly-fat",
      "increased-appetite",
      "low-energy-weight",
    ],
    ageRange: [25, 65],
    genders: ["all"],
    bmiCategory: ["overweight", "obese"],
    icon: "scale",
    highlight: "Dr. Taylor's Pick",
    drTaylorNote: "This is my comprehensive approach for patients who want to lose fat while preserving or building lean mass. The tirzepatide handles appetite and insulin sensitivity, while the Ipa/CJC combo maintains the GH pulsatility that protects muscle during a caloric deficit. I monitor labs closely on this protocol \u2014 especially IGF-1 and metabolic panels every 6-8 weeks.",
  },
  {
    id: "weight-loss-basic",
    name: "GLP-1 Weight Management Protocol",
    subtitle: "Evidence-based metabolic support",
    description:
      "For patients whose primary goal is weight loss, a GLP-1 agonist forms the foundation. Semaglutide is the most well-studied option with robust clinical trial data. Adding AOD-9604 may provide additional fat-specific metabolic support without affecting blood sugar or growth hormone levels.",
    peptideIds: ["semaglutide", "aod-9604"],
    targetSymptoms: [
      "difficulty-losing-weight",
      "slow-metabolism",
      "excess-belly-fat",
      "increased-appetite",
    ],
    ageRange: [18, 75],
    genders: ["all"],
    bmiCategory: ["overweight", "obese"],
    icon: "scale",
    drTaylorNote: "For patients whose primary goal is weight loss, I start here. Semaglutide is the most proven option with the best long-term data. AOD-9604 adds fat-specific support without complicating the metabolic picture. This is a great entry point before considering the full recomposition stack.",
  },
  {
    id: "longevity-male",
    name: "Men's Longevity & Vitality Protocol",
    subtitle: "Anti-aging and cellular optimization",
    description:
      "Dr. Taylor's longevity protocol for men focuses on growth hormone optimization, telomere support, and tissue maintenance. Epithalon activates telomerase for cellular longevity, while Ipamorelin + CJC-1295 restore youthful GH pulsatility. GHK-Cu rounds out the stack with broad anti-aging effects on skin, joints, and DNA repair.",
    peptideIds: ["epithalon", "ipamorelin", "cjc-1295", "ghk-cu"],
    targetSymptoms: [
      "premature-aging",
      "low-energy-aging",
      "declining-vitality",
      "telomere-concerns",
      "age-related-decline",
    ],
    ageRange: [35, 80],
    genders: ["male"],
    bmiCategory: ["all"],
    icon: "clock",
    drTaylorNote: "This is my premium longevity protocol for men over 35. The Ipa/CJC foundation restores youthful GH levels, Epithalon addresses cellular aging at the telomere level, and GHK-Cu provides broad tissue maintenance. I cycle Epithalon 10-20 days every 4-6 months, while the other peptides run continuously.",
  },
  {
    id: "longevity-female",
    name: "Women's Longevity & Vitality Protocol",
    subtitle: "Anti-aging and hormonal balance",
    description:
      "A tailored longevity approach for women emphasizing cellular protection, skin health, and gentle GH optimization. Epithalon supports telomere maintenance, GHK-Cu promotes collagen synthesis and skin rejuvenation, and Sermorelin provides a well-studied path to GH optimization with a strong safety profile.",
    peptideIds: ["epithalon", "sermorelin", "ghk-cu"],
    targetSymptoms: [
      "premature-aging",
      "low-energy-aging",
      "declining-vitality",
      "wrinkles-fine-lines",
      "dull-skin",
    ],
    ageRange: [35, 80],
    genders: ["female"],
    bmiCategory: ["all"],
    icon: "clock",
    drTaylorNote: "I designed this with the female hormonal landscape in mind. Sermorelin is gentler than Ipamorelin for GH stimulation and has the best safety data. GHK-Cu is a standout for the skin and hair concerns that women often prioritize. Epithalon rounds it out with cellular-level anti-aging. This stack is particularly popular with my perimenopausal patients.",
  },
  {
    id: "sleep-recovery",
    name: "Deep Sleep & Recovery Protocol",
    subtitle: "Optimize sleep architecture and recovery",
    description:
      "Poor sleep undermines every aspect of health. DSIP directly promotes delta wave sleep architecture, while Ipamorelin stimulates the natural nighttime GH pulse that drives tissue repair. For patients with injury or inflammation, BPC-157 supports overnight healing processes.",
    peptideIds: ["dsip", "ipamorelin", "bpc-157"],
    targetSymptoms: [
      "poor-sleep-quality",
      "difficulty-falling-asleep",
      "waking-unrefreshed",
      "slow-muscle-recovery",
      "low-hgh-symptoms",
    ],
    ageRange: [25, 75],
    genders: ["all"],
    bmiCategory: ["all"],
    icon: "moon",
    drTaylorNote: "Sleep is the foundation of health \u2014 fix sleep first, and everything else improves. DSIP promotes delta-wave sleep architecture, Ipamorelin amplifies the natural nighttime GH surge, and BPC-157 ensures your body can actually repair while you sleep. I see patients report better sleep within the first week of starting this protocol.",
  },
  {
    id: "cognitive-performance",
    name: "Cognitive Clarity Protocol",
    subtitle: "Mental sharpness and mood support",
    description:
      "Selank is an anxiolytic nootropic that modulates GABA and serotonin systems without sedation. Combined with Epithalon for neuroprotective effects and Sermorelin for GH-mediated brain health, this stack addresses brain fog, anxiety, and cognitive decline from multiple angles.",
    peptideIds: ["selank", "epithalon", "sermorelin"],
    targetSymptoms: [
      "brain-fog",
      "anxiety",
      "poor-focus",
      "mood-swings",
      "mental-fatigue",
    ],
    ageRange: [25, 75],
    genders: ["all"],
    bmiCategory: ["all"],
    icon: "brain",
    drTaylorNote: "Brain fog is one of the most common complaints I hear. Selank addresses the anxiety and stress component, Epithalon provides neuroprotection, and Sermorelin supports brain health through GH optimization. This stack is particularly effective for professionals experiencing cognitive decline from chronic stress or aging.",
  },
  {
    id: "gut-healing",
    name: "Gut Restoration Protocol",
    subtitle: "Heal the gut lining and reduce inflammation",
    description:
      "BPC-157 is the cornerstone of gut healing — it was originally isolated from gastric juice and has extensive research on GI repair. KPV is a potent anti-inflammatory tripeptide that calms mucosal inflammation. LL-37 provides antimicrobial support to help rebalance the gut microbiome.",
    peptideIds: ["bpc-157", "kpv", "ll-37"],
    targetSymptoms: [
      "ibs-symptoms",
      "leaky-gut",
      "bloating",
      "gut-inflammation-direct",
      "food-sensitivities",
    ],
    ageRange: [18, 75],
    genders: ["all"],
    bmiCategory: ["all"],
    icon: "apple",
    drTaylorNote: "I\u2019m passionate about gut health \u2014 it\u2019s connected to everything. BPC-157 was literally discovered in gastric juice, so it\u2019s designed for this job. KPV calms the inflammatory cascade at the mucosal level, and LL-37 helps rebalance the microbiome through antimicrobial activity. I typically run this for 8-12 weeks with dietary modifications.",
  },
  {
    id: "immune-support",
    name: "Immune Optimization Protocol",
    subtitle: "Strengthen immune defenses",
    description:
      "LL-37 is a naturally occurring antimicrobial peptide that modulates innate and adaptive immunity. KPV reduces chronic inflammatory signaling that can suppress immune function. Epithalon supports thymic function and T-cell maturation, which decline significantly with age.",
    peptideIds: ["ll-37", "kpv", "epithalon"],
    targetSymptoms: [
      "frequent-infections",
      "slow-immune-healing",
      "autoimmune-concerns",
      "chronic-immune-inflammation",
      "gut-immune-issues",
    ],
    ageRange: [30, 80],
    genders: ["all"],
    bmiCategory: ["all"],
    icon: "shield",
    drTaylorNote: "For patients who seem to catch every bug or have chronic low-grade infections, this stack addresses immune function from multiple angles. LL-37 provides direct antimicrobial support, KPV reduces the chronic inflammation that suppresses immune function, and Epithalon supports thymic health \u2014 which is critical for T-cell production as we age.",
  },
  {
    id: "skin-rejuvenation",
    name: "Skin & Hair Renewal Protocol",
    subtitle: "Collagen, elastin, and follicle support",
    description:
      "GHK-Cu is one of the most well-studied peptides for skin health — it stimulates collagen, elastin, and glycosaminoglycan synthesis while also promoting hair follicle growth. Combined with BPC-157 for wound healing and Epithalon for cellular renewal, this stack targets visible aging from multiple pathways.",
    peptideIds: ["ghk-cu", "bpc-157", "epithalon"],
    targetSymptoms: [
      "wrinkles-fine-lines",
      "hair-thinning",
      "slow-skin-healing",
      "dull-skin",
      "acne-scarring",
    ],
    ageRange: [25, 75],
    genders: ["all"],
    bmiCategory: ["all"],
    icon: "sparkles",
    drTaylorNote: "GHK-Cu is the star here \u2014 the gene expression data on tissue remodeling is remarkable. I combine it with BPC-157 for wound healing support (great post-procedure) and Epithalon for cellular renewal. Patients typically notice skin texture improvements within 4-6 weeks. For hair concerns, I recommend at least 3 months on this protocol.",
  },
  {
    id: "sexual-health-male",
    name: "Men's Sexual Health Protocol",
    subtitle: "Libido and performance support",
    description:
      "PT-141 (bremelanotide) acts on melanocortin receptors in the brain to enhance sexual desire — it's the only FDA-approved peptide for hypoactive sexual desire. Combined with Ipamorelin for GH optimization (which supports testosterone and overall vitality) and BPC-157 for vascular health.",
    peptideIds: ["pt-141", "ipamorelin", "bpc-157"],
    targetSymptoms: [
      "low-libido",
      "erectile-dysfunction",
      "sexual-performance",
      "hormonal-imbalance",
    ],
    ageRange: [30, 70],
    genders: ["male"],
    bmiCategory: ["all"],
    icon: "heart",
    drTaylorNote: "Sexual health is a quality-of-life issue that many men are reluctant to discuss. PT-141 works on desire at the brain level \u2014 it\u2019s not just about blood flow like Viagra. Ipamorelin supports testosterone and overall vitality through GH optimization, and BPC-157 supports vascular health. I always do a comprehensive hormone panel before starting this protocol.",
  },
  {
    id: "sexual-health-female",
    name: "Women's Sexual Wellness Protocol",
    subtitle: "Desire and hormonal balance",
    description:
      "PT-141 is FDA-approved for hypoactive sexual desire disorder in premenopausal women and works centrally to enhance arousal. Sermorelin supports hormonal balance through GH optimization, and Selank can address the anxiety component that often underlies low libido.",
    peptideIds: ["pt-141", "sermorelin", "selank"],
    targetSymptoms: [
      "low-libido",
      "sexual-performance",
      "hormonal-imbalance",
    ],
    ageRange: [25, 65],
    genders: ["female"],
    bmiCategory: ["all"],
    icon: "heart",
    drTaylorNote: "PT-141 is FDA-approved specifically for women with HSDD, and it\u2019s a game-changer for those who qualify. Sermorelin provides gentle hormonal support, and Selank addresses the anxiety component that so often underlies low desire in women. I approach female sexual wellness holistically \u2014 this stack is one piece of a broader conversation about hormones, stress, and relationship factors.",
  },
];
