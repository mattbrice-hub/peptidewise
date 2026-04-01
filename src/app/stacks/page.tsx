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
    color: "bg-green-50 border-green-200 hover:bg-green-100",
    symptoms: [
      { id: "difficulty-losing-weight", name: "Difficulty losing weight" },
      { id: "slow-metabolism", name: "Slow metabolism" },
      { id: "excess-belly-fat", name: "Excess belly fat" },
      { id: "increased-appetite", name: "Increased appetite / cravings" },
      { id: "low-energy-weight", name: "Low energy related to weight" },
    ],
  },
  {
    id: "sleep-recovery",
    name: "Sleep & Recovery",
    icon: Moon,
    description: "Sleep quality, muscle recovery, HGH",
    color: "bg-violet-50 border-violet-200 hover:bg-violet-100",
    symptoms: [
      { id: "poor-sleep-quality", name: "Poor sleep quality" },
      { id: "difficulty-falling-asleep", name: "Difficulty falling asleep" },
      { id: "waking-unrefreshed", name: "Waking up unrefreshed" },
      { id: "slow-muscle-recovery", name: "Slow muscle recovery" },
      { id: "low-hgh-symptoms", name: "Low growth hormone symptoms" },
    ],
  },
  {
    id: "pain-inflammation",
    name: "Pain & Inflammation",
    icon: Flame,
    description: "Joint pain, chronic inflammation, healing",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    symptoms: [
      { id: "joint-pain", name: "Joint pain or stiffness" },
      { id: "chronic-inflammation", name: "Chronic inflammation" },
      { id: "slow-wound-healing", name: "Slow wound healing" },
      { id: "tendon-ligament-issues", name: "Tendon or ligament issues" },
      { id: "gut-inflammation", name: "Gut-related inflammation" },
    ],
  },
  {
    id: "cognitive-mood",
    name: "Cognitive & Mood",
    icon: Brain,
    description: "Brain fog, anxiety, focus, mood",
    color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
    symptoms: [
      { id: "brain-fog", name: "Brain fog" },
      { id: "anxiety", name: "Anxiety or nervousness" },
      { id: "poor-focus", name: "Poor focus and concentration" },
      { id: "mood-swings", name: "Mood swings" },
      { id: "mental-fatigue", name: "Mental fatigue" },
    ],
  },
  {
    id: "aging-longevity",
    name: "Aging & Longevity",
    icon: Clock,
    description: "Anti-aging, vitality, longevity",
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    symptoms: [
      { id: "premature-aging", name: "Premature aging signs" },
      { id: "low-energy-aging", name: "Declining energy levels" },
      { id: "declining-vitality", name: "Declining vitality" },
      { id: "telomere-concerns", name: "Telomere / cellular aging concerns" },
      { id: "age-related-decline", name: "General age-related decline" },
    ],
  },
  {
    id: "immune-health",
    name: "Immune Health",
    icon: Shield,
    description: "Immunity, infections, autoimmune",
    color: "bg-red-50 border-red-200 hover:bg-red-100",
    symptoms: [
      { id: "frequent-infections", name: "Frequent infections" },
      { id: "slow-immune-healing", name: "Slow healing from illness" },
      { id: "autoimmune-concerns", name: "Autoimmune concerns" },
      { id: "chronic-immune-inflammation", name: "Chronic inflammation" },
      { id: "gut-immune-issues", name: "Gut-related immune issues" },
    ],
  },
  {
    id: "sexual-health",
    name: "Sexual Health",
    icon: Heart,
    description: "Libido, performance, hormones",
    color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
    symptoms: [
      { id: "low-libido", name: "Low libido" },
      { id: "erectile-dysfunction", name: "Erectile dysfunction" },
      { id: "sexual-performance", name: "Sexual performance concerns" },
      { id: "hormonal-imbalance", name: "Hormonal imbalance" },
    ],
  },
  {
    id: "skin-hair",
    name: "Skin & Hair",
    icon: Sparkles,
    description: "Skin rejuvenation, hair growth, healing",
    color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
    symptoms: [
      { id: "wrinkles-fine-lines", name: "Wrinkles and fine lines" },
      { id: "hair-thinning", name: "Hair thinning or loss" },
      { id: "slow-skin-healing", name: "Slow skin wound healing" },
      { id: "dull-skin", name: "Dull or aging skin" },
      { id: "acne-scarring", name: "Acne scarring" },
    ],
  },
  {
    id: "gut-health",
    name: "Gut Health",
    icon: Apple,
    description: "IBS, leaky gut, digestion, bloating",
    color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
    symptoms: [
      { id: "ibs-symptoms", name: "IBS symptoms" },
      { id: "leaky-gut", name: "Leaky gut syndrome" },
      { id: "bloating", name: "Frequent bloating" },
      { id: "gut-inflammation-direct", name: "Gut inflammation" },
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

function matchStacks(
  age: number,
  gender: "male" | "female",
  heightInches: number,
  weightLbs: number,
  selectedSymptoms: string[]
): { stack: PeptideProtocol; relevance: number; matchedSymptoms: string[] }[] {
  const bmi = getBmiCategory(heightInches, weightLbs);

  return stacks
    .filter((stack) => {
      // Age filter
      if (age < stack.ageRange[0] || age > stack.ageRange[1]) return false;
      // Gender filter
      if (!stack.genders.includes("all") && !stack.genders.includes(gender)) return false;
      // BMI filter
      if (!stack.bmiCategory.includes("all") && !stack.bmiCategory.includes(bmi as any)) return false;
      return true;
    })
    .map((stack) => {
      const matchedSymptoms = selectedSymptoms.filter((s) =>
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 text-sm font-medium mb-6 border border-green-200">
            <Check className="h-4 w-4" />
            Analysis Complete
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            We have {results.length} protocol{results.length !== 1 ? "s" : ""} that fit your needs
          </h1>
          <p className="text-gray-500 mb-8">
            Matched for a {age}-year-old {gender}, BMI {bmiValue}
          </p>
          <LeadCaptureGate source="protocols" onUnlocked={() => setUnlocked(true)} />
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary mb-4">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Your Personalized Protocols
          </h1>
          <p className="text-gray-600">
            {results.length > 0
              ? `Dr. Taylor selected ${results.length} protocol${results.length !== 1 ? "s" : ""} for a ${age}-year-old ${gender}, BMI ${bmiValue}`
              : "No protocols matched your profile"}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-16 bg-white shadow-sm rounded-2xl border border-gray-200">
            <AlertTriangle className="h-12 w-12 text-amber-700 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">No Matching Protocols</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn&apos;t find protocols matching your specific profile. Try selecting
              different symptoms or adjusting your inputs.
            </p>
            <button
              onClick={() => {
                setShowResults(false);
                setStep(3);
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-medium"
            >
              <ArrowLeft className="h-4 w-4" /> Adjust Symptoms
            </button>
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
                  className="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden"
                >
                  {/* Protocol header */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          {stack.highlight && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                              {stack.highlight}
                            </span>
                          )}
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                            {relevance}% symptom match
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                          {stack.name}
                        </h2>
                        <p className="text-sm text-gray-500 mb-3">
                          {stack.subtitle}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
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
                                  className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 border border-green-200"
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
                      <div className="border-t border-gray-200 bg-white px-6 md:px-8 py-4">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          Peptides in your protocol
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {stackPeptides.map(
                            (p) =>
                              p && (
                                <Link
                                  key={p.id}
                                  href={`/peptides/${p.slug}`}
                                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:border-blue-300 transition-all group"
                                >
                                  <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                                    <FlaskConical className="h-4 w-4 text-white" />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="font-medium text-gray-800 text-sm group-hover:text-blue-600 transition-colors">
                                      {p.name}
                                    </div>
                                    <div className="text-xs text-gray-500 truncate">
                                      {p.typicalDosage}
                                    </div>
                                  </div>
                                </Link>
                              )
                          )}
                        </div>
                      </div>

                      <div className="border-t border-blue-200 bg-blue-50 px-6 md:px-8 py-4">
                        <div className="flex items-start gap-3">
                          <Image src="/images/dr-taylor.jpg" alt="Dr. Patrick Taylor, MD" width={24} height={24} className="flex-shrink-0 w-8 h-8 rounded-full object-cover mt-0.5" />
                          <div>
                            <div className="text-xs font-semibold text-blue-600 mb-1">Dr. Taylor&apos;s 2 Cents</div>
                            <p className="text-sm text-gray-600 italic leading-relaxed">
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
                className="text-blue-600 hover:text-blue-600 underline"
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
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Start Over
          </button>
          <a
            href="https://tinyurl.com/drtaylorfreeconsult"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
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
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary mb-4">
            <Stethoscope className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Build Your Personalized Protocol
          </h1>
          <p className="text-gray-600">
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
                    ? "gradient-primary text-white"
                    : "bg-gray-200 text-gray-400"
                )}
              >
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
              {s < 3 && (
                <div
                  className={cn(
                    "w-12 h-0.5",
                    step > s ? "gradient-primary" : "bg-gray-200"
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
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Basic Information
              </h2>
              <p className="text-gray-500 text-sm">
                Age and gender help us personalize the right protocol for you.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <Calendar className="h-4 w-4 inline mr-2 text-gray-600" />
                  Birth Year
                </label>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:border-blue-500 focus:outline-none transition-colors appearance-none"
                >
                  <option value="">Select your birth year</option>
                  {Array.from({ length: 83 }, (_, i) => new Date().getFullYear() - 18 - i).map((year) => (
                    <option key={year} value={String(year)}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <User className="h-4 w-4 inline mr-2 text-gray-600" />
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
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
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
                className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Body Metrics
              </h2>
              <p className="text-gray-500 text-sm">
                Height and weight help us fine-tune your personalized protocol.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <Ruler className="h-4 w-4 inline mr-2 text-gray-600" />
                  Height
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <select
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:border-blue-500 focus:outline-none transition-colors appearance-none"
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
                      className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 focus:border-blue-500 focus:outline-none transition-colors appearance-none"
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
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <Weight className="h-4 w-4 inline mr-2 text-gray-600" />
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  min="80"
                  max="500"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight in pounds"
                  className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>

              {bmiValue && (
                <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Calculated BMI</span>
                    <span
                      className={cn(
                        "text-lg font-bold",
                        parseFloat(bmiValue) < 18.5
                          ? "text-blue-400"
                          : parseFloat(bmiValue) < 25
                          ? "text-green-600"
                          : parseFloat(bmiValue) < 30
                          ? "text-amber-700"
                          : "text-red-600"
                      )}
                    >
                      {bmiValue}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
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
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                Select Your Symptoms
              </h2>
              <p className="text-gray-500 text-sm">
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
                      isExpanded ? "sm:col-span-2 border-blue-300 bg-white" : cat.color
                    )}
                  >
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 text-left transition-all",
                        !isExpanded && cat.color
                      )}
                    >
                      <CatIcon className="h-6 w-6 text-gray-700 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{cat.name}</div>
                        <div className="text-sm text-gray-500">{cat.description}</div>
                      </div>
                      {selectedInCategory > 0 && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                          {selectedInCategory}
                        </span>
                      )}
                    </button>

                    {isExpanded && (
                      <div className="border-t border-gray-200 bg-white px-4 py-3 space-y-2">
                        {cat.symptoms.map((symptom) => (
                          <button
                            key={symptom.id}
                            onClick={() => toggleSymptom(symptom.id)}
                            className={cn(
                              "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                              selectedSymptoms.includes(symptom.id)
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                            )}
                          >
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                                selectedSymptoms.includes(symptom.id)
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300"
                              )}
                            >
                              {selectedSymptoms.includes(symptom.id) && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <span
                              className={cn(
                                "font-medium",
                                selectedSymptoms.includes(symptom.id)
                                  ? "text-gray-900"
                                  : "text-gray-600"
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
              <div className="mt-4 p-3 rounded-xl bg-white shadow-sm border border-gray-200">
                <div className="text-xs text-gray-500 mb-2">
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
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
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
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={() => setShowResults(true)}
                disabled={!canProceedStep3}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition-opacity shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
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
