"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  FlaskConical,
  Scale,
  Moon,
  Flame,
  Brain,
  Clock,
  Shield,
  Heart,
  Sparkles,
  Apple,
  Stethoscope,
  AlertTriangle,
  User,
  Ruler,
  Weight,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { stacks, type PeptideProtocol } from "@/data/stacks";
import { peptides } from "@/data/peptides";
import LeadCaptureGate from "@/components/LeadCaptureGate";

const iconMap: Record<string, React.ElementType> = {
  flame: Flame,
  scale: Scale,
  clock: Clock,
  moon: Moon,
  brain: Brain,
  shield: Shield,
  heart: Heart,
  sparkles: Sparkles,
  apple: Apple,
};

const symptomCategories = [
  {
    id: "weight-body",
    name: "Weight & Body Composition",
    icon: Scale,
    description: "Weight loss, metabolism, body fat",
    color: "bg-card border-border hover:bg-surface",
    symptoms: [
      { id: "difficulty-losing-weight", name: "Stubborn weight gain" },
      { id: "slow-metabolism", name: "Slow metabolism" },
      { id: "increased-appetite", name: "Cravings or overeating" },
    ],
  },
  {
    id: "sleep-recovery",
    name: "Sleep & Recovery",
    icon: Moon,
    description: "Sleep quality, muscle recovery, HGH",
    color: "bg-card border-border hover:bg-surface",
    symptoms: [
      { id: "poor-sleep-quality", name: "Poor or light sleep" },
      { id: "waking-unrefreshed", name: "Waking up tired" },
      { id: "slow-muscle-recovery", name: "Slow recovery" },
    ],
  },
  {
    id: "pain-inflammation",
    name: "Pain & Inflammation",
    icon: Flame,
    description: "Joint pain, injuries, healing",
    color: "bg-card border-border hover:bg-surface",
    symptoms: [
      { id: "joint-pain", name: "Joint pain or stiffness" },
      { id: "tendon-ligament-issues", name: "Tendon or ligament injury" },
      { id: "slow-wound-healing", name: "Slow wound healing" },
      { id: "chronic-inflammation", name: "Chronic inflammation" },
    ],
  },
  {
    id: "cognitive-mood",
    name: "Cognitive & Mood",
    icon: Brain,
    description: "Brain fog, anxiety, focus",
    color: "bg-card border-border hover:bg-surface",
    symptoms: [
      { id: "brain-fog", name: "Brain fog" },
      { id: "anxiety", name: "Anxiety" },
      { id: "poor-focus", name: "Poor focus" },
      { id: "mood-swings", name: "Mood swings" },
    ],
  },
  {
    id: "aging-longevity",
    name: "Aging & Longevity",
    icon: Clock,
    description: "Anti-aging, energy, vitality",
    color: "bg-card border-border hover:bg-surface",
    symptoms: [
      { id: "premature-aging", name: "Feeling older than your age" },
      { id: "declining-vitality", name: "Low energy or vitality" },
      { id: "telomere-concerns", name: "Cellular aging concerns" },
    ],
  },
  {
    id: "immune-health",
    name: "Immune Health",
    icon: Shield,
    description: "Immunity, infections, autoimmune",
    color: "bg-card border-border hover:bg-surface",
    symptoms: [
      { id: "frequent-infections", name: "Getting sick often" },
      { id: "slow-immune-healing", name: "Slow recovery from illness" },
      { id: "autoimmune-concerns", name: "Autoimmune issues" },
    ],
  },
  {
    id: "sexual-health",
    name: "Sexual Health",
    icon: Heart,
    description: "Libido, performance, hormones",
    color: "bg-card border-border hover:bg-surface",
    symptoms: [
      { id: "low-libido", name: "Low sex drive" },
      { id: "erectile-dysfunction", name: "Erectile dysfunction" },
      { id: "hormonal-imbalance", name: "Hormonal imbalance" },
    ],
  },
  {
    id: "skin-hair",
    name: "Skin & Hair",
    icon: Sparkles,
    description: "Wrinkles, hair loss, skin quality",
    color: "bg-card border-border hover:bg-surface",
    symptoms: [
      { id: "wrinkles-fine-lines", name: "Wrinkles or fine lines" },
      { id: "hair-thinning", name: "Hair thinning or loss" },
      { id: "dull-skin", name: "Dull or aging skin" },
    ],
  },
  {
    id: "gut-health",
    name: "Gut Health",
    icon: Apple,
    description: "IBS, bloating, digestion",
    color: "bg-card border-border hover:bg-surface",
    symptoms: [
      { id: "ibs-symptoms", name: "IBS or digestive issues" },
      { id: "bloating", name: "Bloating" },
      { id: "leaky-gut", name: "Leaky gut" },
      { id: "food-sensitivities", name: "Food sensitivities" },
    ],
  },
];

function getBmiCategory(heightInches: number, weightLbs: number): string {
  const heightM = heightInches * 0.0254;
  const weightKg = weightLbs * 0.453592;
  const bmi = weightKg / (heightM * heightM);
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

// Map concise UI symptoms to also match related stack targetSymptoms
const symptomExpansions: Record<string, string[]> = {
  "difficulty-losing-weight": ["excess-belly-fat", "low-energy-weight"],
  "poor-sleep-quality": ["difficulty-falling-asleep", "low-hgh-symptoms"],
  "chronic-inflammation": ["gut-inflammation", "chronic-immune-inflammation"],
  "poor-focus": ["mental-fatigue"],
  "declining-vitality": ["low-energy-aging", "age-related-decline"],
  "slow-immune-healing": ["gut-immune-issues"],
  "low-libido": ["sexual-performance"],
  "dull-skin": ["slow-skin-healing", "acne-scarring"],
  "ibs-symptoms": ["gut-inflammation-direct"],
};

function expandSymptoms(selected: string[]): string[] {
  const expanded = new Set(selected);
  for (const id of selected) {
    if (symptomExpansions[id]) {
      symptomExpansions[id].forEach((s) => expanded.add(s));
    }
  }
  return Array.from(expanded);
}

function matchStacks(
  age: number,
  gender: "male" | "female",
  heightInches: number,
  weightLbs: number,
  selectedSymptoms: string[]
): { stack: PeptideProtocol; relevance: number; matchedSymptoms: string[] }[] {
  const bmi = getBmiCategory(heightInches, weightLbs);
  const expanded = expandSymptoms(selectedSymptoms);

  return stacks
    .filter((stack) => {
      if (age < stack.ageRange[0] || age > stack.ageRange[1]) return false;
      if (!stack.genders.includes("all") && !stack.genders.includes(gender)) return false;
      if (!stack.bmiCategory.includes("all") && !stack.bmiCategory.includes(bmi as any)) return false;
      return true;
    })
    .map((stack) => {
      const matchedSymptoms = expanded.filter((s) =>
        stack.targetSymptoms.includes(s)
      );
      const relevance =
        selectedSymptoms.length > 0
          ? Math.round((matchedSymptoms.length / selectedSymptoms.length) * 100)
          : 0;
      return { stack, relevance, matchedSymptoms };
    })
    .filter((r) => r.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);
}

export default function StacksPage() {
  const [step, setStep] = useState(1);
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("peptidewise_unlocked") === "true") setUnlocked(true);
  }, []);

  const age = birthYear ? String(new Date().getFullYear() - parseInt(birthYear)) : "";

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const totalHeightInches =
    (parseInt(heightFeet) || 0) * 12 + (parseInt(heightInches) || 0);

  const canProceedStep1 = birthYear !== "" && gender !== "";

  const canProceedStep2 =
    heightFeet !== "" &&
    totalHeightInches >= 48 &&
    totalHeightInches <= 96 &&
    weight !== "" &&
    parseInt(weight) >= 80 &&
    parseInt(weight) <= 500;

  const canProceedStep3 = selectedSymptoms.length > 0;

  const results = showResults
    ? matchStacks(
        parseInt(age),
        gender as "male" | "female",
        totalHeightInches,
        parseInt(weight),
        selectedSymptoms
      )
    : [];

  const bmiValue =
    totalHeightInches > 0 && parseInt(weight) > 0
      ? (
          (parseInt(weight) * 703) /
          (totalHeightInches * totalHeightInches)
        ).toFixed(1)
      : null;

  if (showResults) {
    // Gate: show splash + form before any results
    if (!unlocked) {
      return (
        <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e8efe3] text-[#4a5e3a] text-sm font-medium mb-6 border border-border">
            <Check className="h-4 w-4" />
            Analysis Complete
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-base mb-3">
            {results.length > 0
              ? `We have ${results.length} protocol${results.length !== 1 ? "s" : ""} that fit your needs`
              : "Dr. Taylor can build a custom protocol for you"}
          </h1>
          <p className="text-muted mb-8">
            {results.length > 0
              ? `Matched for a ${age}-year-old ${gender}, BMI ${bmiValue}`
              : "Your profile may benefit from a physician-designed protocol tailored to your specific needs."}
          </p>
          <LeadCaptureGate source="protocols" onUnlocked={() => setUnlocked(true)} />
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-accent mb-4">
            <Stethoscope className="h-8 w-8 text-surface" />
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-base mb-2">
            Your Personalized Protocols
          </h1>
          <p className="text-muted">
            {results.length > 0
              ? `Dr. Taylor selected ${results.length} protocol${results.length !== 1 ? "s" : ""} for a ${age}-year-old ${gender}, BMI ${bmiValue}`
              : `Personalized recommendation for a ${age}-year-old ${gender}, BMI ${bmiValue}`}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12 bg-warm-white shadow-warm rounded-xl border border-border">
            <Image src="/images/dr-taylor.jpg" alt="Dr. Patrick Taylor, MD" width={80} height={80} className="w-20 h-20 rounded-full object-cover mx-auto mb-5 border-4 border-card shadow-warm" />
            <h2 className="font-heading text-xl font-semibold text-base mb-2">Your Goals Deserve a Custom Protocol</h2>
            <p className="text-muted mb-2 max-w-md mx-auto">
              Based on your profile, Dr. Taylor recommends a personalized consultation
              to design a protocol tailored specifically to your body, labs, and health goals.
            </p>
            <p className="text-sm text-muted mb-6 max-w-md mx-auto">
              Every patient is different &mdash; a one-on-one evaluation ensures the safest
              and most effective approach for your situation.
            </p>
            <a
              href="https://tinyurl.com/drtaylorfreeconsult"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-surface font-semibold transition-colors shadow-warm mb-4"
            >
              Book a Free Consultation <ArrowRight className="h-4 w-4" />
            </a>
            <div>
              <button
                onClick={() => {
                  setShowResults(false);
                  setStep(3);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-muted hover:text-base transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Or adjust your symptoms
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {results.map(({ stack, relevance, matchedSymptoms }) => {
              const Icon = iconMap[stack.icon] || FlaskConical;
              const stackPeptides = stack.peptideIds
                .map((id) => peptides.find((p) => p.id === id))
                .filter(Boolean);

              return (
                <div
                  key={stack.id}
                  className="bg-card shadow-warm rounded-xl border border-border overflow-hidden"
                >
                  {/* Protocol header */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent flex items-center justify-center">
                        <Icon className="h-7 w-7 text-surface" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {stack.highlight && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#e8efe3] text-[#4a5e3a] border border-border">
                              {stack.highlight}
                            </span>
                          )}
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-card text-accent border border-border">
                            {relevance}% symptom match
                          </span>
                        </div>
                        <h2 className="font-heading text-xl font-semibold text-base mb-1">
                          {stack.name}
                        </h2>
                        <p className="text-sm text-muted mb-3">
                          {stack.subtitle}
                        </p>
                        <p className="text-sm text-text-primary leading-relaxed">
                          {stack.description}
                        </p>

                        {/* Matched symptoms */}
                        {matchedSymptoms.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {matchedSymptoms.map((symptomId) => {
                              const symptom = symptomCategories
                                .flatMap((c) => c.symptoms)
                                .find((s) => s.id === symptomId);
                              return (
                                <span
                                  key={symptomId}
                                  className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-[#e8efe3] text-[#4a5e3a] border border-border"
                                >
                                  <Check className="h-3 w-3" />
                                  {symptom?.name || symptomId}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Gated: Peptides + Dr. Taylor's notes */}
                  {unlocked && (
                    <>
                      <div className="border-t border-border bg-warm-white px-6 md:px-8 py-4">
                        <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                          Peptides in your protocol
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {stackPeptides.map(
                            (p) =>
                              p && (
                                <Link
                                  key={p.id}
                                  href={`/peptides/${p.slug}`}
                                  className="flex items-center gap-3 p-3 rounded-xl bg-warm-white border border-border hover:border-accent transition-all group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                                    <FlaskConical className="h-4 w-4 text-surface" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-medium text-text-primary text-sm group-hover:text-accent transition-colors">
                                      {p.name}
                                    </div>
                                    <div className="text-xs text-muted truncate">
                                      {p.typicalDosage}
                                    </div>
                                  </div>
                                </Link>
                              )
                          )}
                        </div>
                      </div>

                      <div className="border-t border-border bg-card px-6 md:px-8 py-4">
                        <div className="flex items-start gap-3">
                          <Image src="/images/dr-taylor.jpg" alt="Dr. Patrick Taylor, MD" width={24} height={24} className="flex-shrink-0 w-8 h-8 rounded-full object-cover mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-accent mb-1">Dr. Taylor&apos;s 2 Cents</div>
                            <p className="text-sm text-text-primary italic leading-relaxed">
                              &ldquo;{stack.drTaylorNote}&rdquo;
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">
              <strong>Disclaimer:</strong> These protocols are for educational purposes only
              and are not prescriptions or medical advice. Peptide protocols must be
              individualized by a qualified physician based on lab work, medical history,
              and clinical evaluation. To discuss a personalized protocol, consult{" "}
              <a
                href="https://tinyurl.com/drtaylorfreeconsult"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent underline"
              >
                Dr. Taylor at Live Vital MD
              </a>
              .
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => {
              setShowResults(false);
              setStep(1);
              setSelectedSymptoms([]);
            }}
            className="px-5 py-2.5 rounded-xl border border-border text-text-primary font-medium hover:bg-surface transition-colors"
          >
            Start Over
          </button>
          <a
            href="https://tinyurl.com/drtaylorfreeconsult"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-surface font-medium transition-colors"
          >
            Consult Dr. Taylor
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] py-8 md:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent mb-4">
            <Stethoscope className="h-7 w-7 text-surface" />
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-base mb-2">
            Build Your Personalized Protocol
          </h1>
          <p className="text-muted">
            Tell us about yourself and Dr. Taylor will match you with a
            personalized peptide protocol tailored to your body and goals.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                  step >= s
                    ? "bg-accent text-surface"
                    : "bg-card text-muted border border-border"
                )}
              >
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "w-12 h-0.5",
                    step > s ? "bg-accent" : "bg-card"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Age & Gender */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="font-heading text-xl font-semibold text-base mb-1">
                Basic Information
              </h2>
              <p className="text-muted text-sm">
                Age and gender help us personalize the right protocol for you.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-base mb-3">
                  <Calendar className="h-4 w-4 inline mr-2 text-muted" />
                  Birth Year
                </label>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-warm-white border border-border text-base focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors appearance-none font-body"
                >
                  <option value="">Select your birth year</option>
                  {Array.from({ length: 83 }, (_, i) => new Date().getFullYear() - 18 - i).map((year) => (
                    <option key={year} value={String(year)}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-base mb-3">
                  <User className="h-4 w-4 inline mr-2 text-muted" />
                  Biological Sex
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["male", "female"] as const).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-center font-medium capitalize transition-all",
                        gender === g
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border text-muted hover:border-accent"
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-surface font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Height & Weight */}
        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="font-heading text-xl font-semibold text-base mb-1">
                Body Metrics
              </h2>
              <p className="text-muted text-sm">
                Height and weight help us fine-tune your personalized protocol.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-base mb-3">
                  <Ruler className="h-4 w-4 inline mr-2 text-muted" />
                  Height
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <select
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-warm-white border border-border text-base focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors appearance-none font-body"
                    >
                      <option value="">Feet</option>
                      {[4, 5, 6, 7].map((ft) => (
                        <option key={ft} value={String(ft)}>{ft} ft</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-warm-white border border-border text-base focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors appearance-none font-body"
                    >
                      <option value="">Inches</option>
                      {Array.from({ length: 12 }, (_, i) => i).map((inch) => (
                        <option key={inch} value={String(inch)}>{inch} in</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-base mb-3">
                  <Weight className="h-4 w-4 inline mr-2 text-muted" />
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  min="80"
                  max="500"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight in pounds"
                  className="w-full px-4 py-3 rounded-lg bg-warm-white border border-border text-base placeholder-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body"
                />
              </div>

              {bmiValue && (
                <div className="p-4 rounded-xl bg-warm-white shadow-warm border border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">Calculated BMI</span>
                    <span
                      className={cn(
                        "text-lg font-bold",
                        parseFloat(bmiValue) < 18.5
                          ? "text-accent"
                          : parseFloat(bmiValue) < 25
                          ? "text-accent"
                          : parseFloat(bmiValue) < 30
                          ? "text-amber-700"
                          : "text-red-600"
                      )}
                    >
                      {bmiValue}
                    </span>
                  </div>
                  <div className="text-xs text-muted mt-1">
                    {parseFloat(bmiValue) < 18.5
                      ? "Underweight"
                      : parseFloat(bmiValue) < 25
                      ? "Normal weight"
                      : parseFloat(bmiValue) < 30
                      ? "Overweight"
                      : "Obese"}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-text-primary font-medium hover:bg-surface transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-surface font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Symptoms */}
        {step === 3 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="font-heading text-xl font-semibold text-base mb-1">
                Select Your Symptoms
              </h2>
              <p className="text-muted text-sm">
                Choose all symptoms that apply. Tap a category to expand it.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {symptomCategories.map((cat) => {
                const isExpanded = expandedCategories.includes(cat.id);
                const selectedInCategory = cat.symptoms.filter((s) =>
                  selectedSymptoms.includes(s.id)
                ).length;
                const CatIcon = cat.icon;

                return (
                  <div
                    key={cat.id}
                    className={cn(
                      "rounded-xl border-2 overflow-hidden transition-all",
                      isExpanded ? "sm:col-span-2 border-accent bg-warm-white" : "border-border bg-card"
                    )}
                  >
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 text-left transition-all",
                        !isExpanded && "bg-card"
                      )}
                    >
                      <CatIcon className="h-6 w-6 text-text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-base">{cat.name}</div>
                        <div className="text-sm text-muted">{cat.description}</div>
                      </div>
                      {selectedInCategory > 0 && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-card text-accent border border-border">
                          {selectedInCategory}
                        </span>
                      )}
                    </button>

                    {isExpanded && (
                      <div className="border-t border-border bg-warm-white px-4 py-3 space-y-2">
                        {cat.symptoms.map((symptom) => (
                          <button
                            key={symptom.id}
                            onClick={() => toggleSymptom(symptom.id)}
                            className={cn(
                              "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                              selectedSymptoms.includes(symptom.id)
                                ? "border-accent bg-accent/5"
                                : "border-border bg-warm-white hover:border-accent"
                            )}
                          >
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                                selectedSymptoms.includes(symptom.id)
                                  ? "border-accent bg-accent"
                                  : "border-border"
                              )}
                            >
                              {selectedSymptoms.includes(symptom.id) && (
                                <Check className="h-3 w-3 text-surface" />
                              )}
                            </div>
                            <span
                              className={cn(
                                "font-medium",
                                selectedSymptoms.includes(symptom.id)
                                  ? "text-base"
                                  : "text-text-primary"
                              )}
                            >
                              {symptom.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {selectedSymptoms.length > 0 && (
              <div className="mt-4 p-3 rounded-xl bg-warm-white shadow-warm border border-border">
                <div className="text-xs text-muted mb-2">
                  {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? "s" : ""} selected
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSymptoms.map((id) => {
                    const symptom = symptomCategories
                      .flatMap((c) => c.symptoms)
                      .find((s) => s.id === id);
                    return (
                      <button
                        key={id}
                        onClick={() => toggleSymptom(id)}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-card text-accent border border-border hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                      >
                        {symptom?.name || id}
                        <span className="ml-0.5">&times;</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-text-primary font-medium hover:bg-surface transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={() => setShowResults(true)}
                disabled={!canProceedStep3}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-surface font-semibold transition-colors shadow-warm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Build My Protocol <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
