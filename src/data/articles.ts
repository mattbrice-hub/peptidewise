import { Article, StudyReference } from "@/types";

export const articles: Article[] = [
  {
    id: "beginner-guide-peptides",
    slug: "beginners-guide-to-peptide-therapy",
    title: "A Beginner's Guide to Peptide Therapy",
    excerpt: "Everything you need to know about therapeutic peptides, how they work, and what to expect when starting peptide therapy.",
    content: `Peptide therapy is an emerging field that uses short chains of amino acids to target specific biological functions in the body. Unlike traditional medications that often cast a wide net, peptides act as precise signaling molecules that bind to specific cell receptors.

The human body naturally produces over 7,000 peptides that regulate everything from hormones and immune function to tissue repair and sleep. Therapeutic peptides are either synthetic versions of these natural compounds or modified variants designed for enhanced stability and effectiveness.

Common categories include growth hormone secretagogues (like Sermorelin and Ipamorelin), tissue repair peptides (BPC-157 and TB-500), weight management peptides (Semaglutide and Tirzepatide), and immune-modulating peptides (LL-37 and KPV).

Most peptides are administered via subcutaneous injection, though oral and nasal options are becoming more available. Treatment cycles typically range from 4 to 12 weeks, depending on the peptide and your health goals.

Always work with a qualified healthcare provider who can assess your needs, monitor your progress, and adjust your protocol as needed. Self-administration without medical supervision is not recommended.`,
    category: "guide",
    peptideIds: ["bpc-157", "sermorelin", "semaglutide"],
    publishedAt: "2025-12-15",
    modifiedDate: "2026-02-20",
    readingTime: 8,
    imageUrl: "/images/articles/beginner-guide.svg",
    references: [
      {
        id: "art1-ref1",
        title: "Sermorelin: A Review of Its Use in the Diagnosis and Treatment of Children with Idiopathic Growth Hormone Deficiency",
        authors: "Prakash A, Goa KL",
        journal: "BioDrugs",
        year: 1999,
        doi: "10.2165/00063030-199912020-00007",
        pmid: "18031173",
        finding: "Sermorelin produced significant increases in height velocity sustained over 12 months in GH-deficient children, demonstrating the clinical utility of peptide therapies.",
      },
      {
        id: "art1-ref2",
        title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        authors: "Wilding JPH, Batterham RL, Calanna S, et al.",
        journal: "New England Journal of Medicine",
        year: 2021,
        doi: "10.1056/NEJMoa2032183",
        pmid: "33567185",
        finding: "The STEP 1 trial demonstrated semaglutide's 14.9% mean weight loss over 68 weeks, showcasing peptide therapy's potential for transformative health outcomes.",
      },
    ],
  },
  {
    id: "bpc-157-complete-guide",
    slug: "bpc-157-complete-guide",
    title: "BPC-157: The Complete Evidence-Based Guide",
    excerpt: "An in-depth look at BPC-157, one of the most versatile healing peptides, including benefits, dosage protocols, and current research.",
    content: `BPC-157, or Body Protection Compound-157, is a synthetic peptide derived from a protein naturally found in human gastric juice. It has gained significant attention for its potential healing properties across multiple body systems.

Research suggests BPC-157 may accelerate the healing of muscles, tendons, and ligaments by promoting angiogenesis (new blood vessel formation) and increasing growth factor expression. It has also shown promise in supporting gut health, particularly in cases of inflammatory bowel conditions.

The typical dosage ranges from 250 to 500 micrograms per day, administered subcutaneously near the site of injury or orally for gut-related issues. Treatment cycles usually last 4 to 12 weeks.

While animal studies have been extensive and promising, human clinical trials remain limited. Three published human studies have shown favorable results, but more large-scale research is needed to fully establish its efficacy and long-term safety profile.

Side effects are generally considered rare and mild, potentially including nausea and injection site irritation. Contraindications include active cancer and pregnancy.

BPC-157 is often combined with TB-500 for synergistic healing effects, particularly for musculoskeletal injuries. This combination targets different but complementary pathways in the tissue repair process.`,
    category: "research",
    peptideIds: ["bpc-157", "tb-500"],
    publishedAt: "2025-11-20",
    modifiedDate: "2026-01-15",
    readingTime: 10,
    imageUrl: "/images/articles/bpc-157-guide.svg",
    references: [
      {
        id: "art2-ref1",
        title: "Gastric pentadecapeptide body protection compound BPC 157 and its role in accelerating musculoskeletal soft tissue healing",
        authors: "Gwyer D, Wragg NM, Wilson SL",
        journal: "Cell and Tissue Research",
        year: 2019,
        pmid: "30915550",
        finding: "All studies reviewed demonstrated consistently positive and prompt healing effects for BPC-157 across multiple soft tissues including tendon, ligament, and skeletal muscle.",
      },
      {
        id: "art2-ref2",
        title: "The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration",
        authors: "Chang CH, Tsai WC, Lin MS, Hsu YH, Pang JHS",
        journal: "Journal of Applied Physiology",
        year: 2011,
        pmid: "21030672",
        finding: "BPC-157 significantly accelerated tendon explant outgrowth, increased fibroblast survival under oxidative stress, and enhanced cell migration via FAK-paxillin signaling.",
      },
      {
        id: "art2-ref3",
        title: "Impact of pentadecapeptide BPC 157 on muscle healing impaired by systemic corticosteroid application",
        authors: "Pevec D, Novinscak T, Brcic L, et al.",
        journal: "Medical Science Monitor",
        year: 2010,
        pmid: "20190676",
        finding: "BPC-157 induced faster muscle healing and completely reversed corticosteroid-impaired healing, demonstrated functionally, macroscopically, and histologically.",
      },
    ],
  },
  {
    id: "glp1-weight-loss-guide",
    slug: "glp1-peptides-weight-loss",
    title: "GLP-1 Peptides for Weight Loss: Semaglutide vs Tirzepatide",
    excerpt: "Comparing the two leading weight loss peptides, their mechanisms, effectiveness, and how to choose the right one for you.",
    content: `GLP-1 (Glucagon-Like Peptide-1) receptor agonists have revolutionized weight management. Semaglutide and Tirzepatide are the two most prominent options, each with distinct mechanisms and benefits.

Semaglutide mimics the GLP-1 hormone, slowing gastric emptying, reducing appetite, and improving insulin sensitivity. Clinical trials have demonstrated average weight loss of 15-17% of body weight over 68 weeks.

Tirzepatide takes a dual approach, activating both GLP-1 and GIP (Glucose-dependent Insulinotropic Polypeptide) receptors. This dual mechanism has shown even more impressive results, with average weight loss of 20-25% of body weight in clinical trials.

Both peptides are FDA-approved prescription medications. They are typically administered as weekly subcutaneous injections with gradual dose escalation over several weeks to minimize gastrointestinal side effects.

Common side effects include nausea, vomiting, diarrhea, and constipation, which typically improve as the body adjusts. More serious but rare risks include pancreatitis and gallbladder issues.

The choice between them often comes down to individual response, insurance coverage, and provider recommendations. Some patients who plateau on one may benefit from switching to the other.`,
    category: "comparison",
    peptideIds: ["semaglutide", "tirzepatide"],
    publishedAt: "2026-01-10",
    modifiedDate: "2026-03-01",
    readingTime: 7,
    imageUrl: "/images/articles/glp1-guide.svg",
    references: [
      {
        id: "art3-ref1",
        title: "Once-Weekly Semaglutide in Adults with Overweight or Obesity",
        authors: "Wilding JPH, Batterham RL, Calanna S, et al.",
        journal: "New England Journal of Medicine",
        year: 2021,
        doi: "10.1056/NEJMoa2032183",
        pmid: "33567185",
        finding: "Semaglutide 2.4 mg produced mean 14.9% body weight loss over 68 weeks vs 2.4% with placebo; 86% of participants achieved at least 5% weight loss.",
      },
      {
        id: "art3-ref2",
        title: "Tirzepatide Once Weekly for the Treatment of Obesity",
        authors: "Jastreboff AM, Aronne LJ, Ahmad NN, et al.",
        journal: "New England Journal of Medicine",
        year: 2022,
        doi: "10.1056/NEJMoa2206038",
        pmid: "35658024",
        finding: "Tirzepatide produced mean weight reductions of up to 20.9% at 72 weeks; up to 96% of participants on higher doses achieved at least 5% body weight reduction.",
      },
      {
        id: "art3-ref3",
        title: "Efficacy and safety of a novel dual GIP and GLP-1 receptor agonist tirzepatide in patients with type 2 diabetes (SURPASS-1)",
        authors: "Rosenstock J, Wysham C, Frías JP, et al.",
        journal: "The Lancet",
        year: 2021,
        doi: "10.1016/S0140-6736(21)01324-6",
        pmid: "34186022",
        finding: "Tirzepatide reduced HbA1c by up to 2.07% and body weight by up to 9.5 kg; up to 52% of participants achieved HbA1c below 5.7%.",
      },
    ],
  },
  {
    id: "choosing-peptide-provider",
    slug: "how-to-choose-peptide-provider",
    title: "How to Choose a Safe Peptide Provider",
    excerpt: "A practical checklist for evaluating peptide providers, avoiding red flags, and ensuring you receive quality products.",
    content: `Choosing the right peptide provider is critical for both safety and effectiveness. The market includes legitimate clinical providers alongside less reputable sources, making due diligence essential.

Start with credentials. Legitimate providers should employ licensed prescribers (MDs, DOs, NPs, or PAs) who conduct proper medical evaluations before prescribing. Avoid any provider that sells peptides without a medical consultation.

Sourcing matters. Ask where their peptides are compounded. Reputable providers use FDA-registered 503A or 503B compounding pharmacies that follow Current Good Manufacturing Practices (cGMP). Third-party testing certificates of analysis (COAs) should be available upon request.

Pricing transparency is another indicator. While peptide therapy involves real costs, extremely low prices may indicate compromised quality. Similarly, dramatically high prices do not guarantee better products. Compare across multiple providers to understand fair market rates.

Red flags include providers who make outlandish health claims, sell without any medical oversight, refuse to disclose their compounding pharmacy, or pressure you into large upfront purchases.

Look for providers that offer ongoing medical support, including follow-up consultations and the ability to adjust your protocol based on your response.`,
    category: "safety",
    peptideIds: [],
    publishedAt: "2026-02-05",
    modifiedDate: "2026-03-10",
    readingTime: 6,
    imageUrl: "/images/articles/choosing-provider.svg",
  },
  {
    id: "growth-hormone-peptides",
    slug: "growth-hormone-peptides-guide",
    title: "Growth Hormone Peptides: Sermorelin, Ipamorelin & CJC-1295",
    excerpt: "Understanding growth hormone secretagogues, how they stimulate natural HGH production, and their benefits for aging and recovery.",
    content: `Growth hormone secretagogues (GHS) are peptides that stimulate the pituitary gland to produce and release more human growth hormone (HGH). Unlike synthetic HGH injections, these peptides work with your body's natural feedback mechanisms.

Sermorelin is a synthetic version of Growth Hormone-Releasing Hormone (GHRH). It mimics the first 29 amino acids of natural GHRH and is well-studied with decades of clinical use. It is particularly effective for improving sleep quality and supporting overall recovery.

Ipamorelin is a selective growth hormone secretagogue that stimulates GH release without significantly affecting cortisol or prolactin levels. This selectivity makes it one of the safest GHS options, with fewer side effects than alternatives.

CJC-1295 is a modified GHRH analog that provides sustained GH elevation due to its longer half-life. It is often paired with Ipamorelin for synergistic effects, creating a combination that is frequently referred to as the gold standard for GH optimization.

Benefits of GH peptides include improved body composition, enhanced recovery from exercise, better sleep quality, healthier skin and hair, and improved cognitive function. Most users notice improvements within 4-8 weeks of consistent use.

These peptides are typically administered via subcutaneous injection before bedtime to align with the body's natural GH release patterns. Cycles of 8-12 weeks are common, with periodic breaks to maintain pituitary sensitivity.`,
    category: "guide",
    peptideIds: ["sermorelin", "ipamorelin", "cjc-1295"],
    publishedAt: "2025-10-28",
    modifiedDate: "2026-02-01",
    readingTime: 9,
    imageUrl: "/images/articles/gh-peptides.svg",
    references: [
      {
        id: "art5-ref1",
        title: "Endocrine and Metabolic Effects of Long-Term Administration of [Nle27]Growth Hormone-Releasing Hormone-(1-29)-NH2 in Age-Advanced Men and Women",
        authors: "Khorram O, Laughlin GA, Yen SSC",
        journal: "Journal of Clinical Endocrinology & Metabolism",
        year: 1997,
        doi: "10.1210/jcem.82.5.3943",
        pmid: "9141536",
        finding: "Sermorelin analog significantly increased nocturnal GH levels in both women and men, with improvements in lean body mass and insulin sensitivity.",
      },
      {
        id: "art5-ref2",
        title: "Ipamorelin, the First Selective Growth Hormone Secretagogue",
        authors: "Raun K, Hansen BS, Johansen NL, et al.",
        journal: "European Journal of Endocrinology",
        year: 1998,
        doi: "10.1530/eje.0.1390552",
        pmid: "9849822",
        finding: "Ipamorelin did not increase ACTH or cortisol even at doses 200-fold above the ED50 for GH release, making it the first truly selective GH secretagogue.",
      },
      {
        id: "art5-ref3",
        title: "Prolonged Stimulation of Growth Hormone (GH) and Insulin-Like Growth Factor I Secretion by CJC-1295, a Long-Acting Analog of GH-Releasing Hormone, in Healthy Adults",
        authors: "Teichman SL, Neale A, Lawrence B, Gagnon C, Castaigne JP, Frohman LA",
        journal: "Journal of Clinical Endocrinology & Metabolism",
        year: 2006,
        doi: "10.1210/jc.2005-1536",
        pmid: "16352683",
        finding: "A single CJC-1295 injection produced dose-dependent GH increases of 2- to 10-fold lasting 6+ days, and IGF-I increases of 1.5- to 3-fold for 9-11 days.",
      },
    ],
  },
];
