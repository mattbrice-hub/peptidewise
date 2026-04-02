"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Scale, Moon, Flame, Brain, Clock, Shield, Heart, Sparkles, Apple,
  ArrowRight, ArrowLeft, Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "weight-body", name: "Weight & Body Composition", icon: Scale, description: "Weight loss, metabolism, body fat", color: "bg-card border-border hover:border-accent" },
  { id: "sleep-recovery", name: "Sleep & Recovery", icon: Moon, description: "Sleep quality, muscle recovery, HGH", color: "bg-card border-border hover:border-accent" },
  { id: "pain-inflammation", name: "Pain & Inflammation", icon: Flame, description: "Joint pain, chronic inflammation, healing", color: "bg-card border-border hover:border-accent" },
  { id: "cognitive-mood", name: "Cognitive & Mood", icon: Brain, description: "Brain fog, anxiety, focus, mood", color: "bg-card border-border hover:border-accent" },
  { id: "aging-longevity", name: "Aging & Longevity", icon: Clock, description: "Anti-aging, vitality, longevity", color: "bg-card border-border hover:border-accent" },
  { id: "immune-health", name: "Immune Health", icon: Shield, description: "Immunity, infections, autoimmune", color: "bg-card border-border hover:border-accent" },
  { id: "sexual-health", name: "Sexual Health", icon: Heart, description: "Libido, performance, hormones", color: "bg-card border-border hover:border-accent" },
  { id: "skin-hair", name: "Skin & Hair", icon: Sparkles, description: "Skin rejuvenation, hair growth, healing", color: "bg-card border-border hover:border-accent" },
  { id: "gut-health", name: "Gut Health", icon: Apple, description: "IBS, leaky gut, digestion, bloating", color: "bg-card border-border hover:border-accent" },
];

const symptomsByCategory: Record<string, { id: string; name: string }[]> = {
  "weight-body": [
    { id: "difficulty-losing-weight", name: "Difficulty losing weight" },
    { id: "slow-metabolism", name: "Slow metabolism" },
    { id: "excess-belly-fat", name: "Excess belly fat" },
    { id: "increased-appetite", name: "Increased appetite / cravings" },
    { id: "low-energy-weight", name: "Low energy related to weight" },
  ],
  "sleep-recovery": [
    { id: "poor-sleep-quality", name: "Poor sleep quality" },
    { id: "difficulty-falling-asleep", name: "Difficulty falling asleep" },
    { id: "waking-unrefreshed", name: "Waking up unrefreshed" },
    { id: "slow-muscle-recovery", name: "Slow muscle recovery" },
    { id: "low-hgh-symptoms", name: "Low growth hormone symptoms" },
  ],
  "pain-inflammation": [
    { id: "joint-pain", name: "Joint pain or stiffness" },
    { id: "chronic-inflammation", name: "Chronic inflammation" },
    { id: "slow-wound-healing", name: "Slow wound healing" },
    { id: "tendon-ligament-issues", name: "Tendon or ligament issues" },
    { id: "gut-inflammation", name: "Gut-related inflammation" },
  ],
  "cognitive-mood": [
    { id: "brain-fog", name: "Brain fog" },
    { id: "anxiety", name: "Anxiety or nervousness" },
    { id: "poor-focus", name: "Poor focus and concentration" },
    { id: "mood-swings", name: "Mood swings" },
    { id: "mental-fatigue", name: "Mental fatigue" },
  ],
  "aging-longevity": [
    { id: "premature-aging", name: "Premature aging signs" },
    { id: "low-energy-aging", name: "Declining energy levels" },
    { id: "declining-vitality", name: "Declining vitality" },
    { id: "telomere-concerns", name: "Telomere / cellular aging concerns" },
    { id: "age-related-decline", name: "General age-related decline" },
  ],
  "immune-health": [
    { id: "frequent-infections", name: "Frequent infections" },
    { id: "slow-immune-healing", name: "Slow healing from illness" },
    { id: "autoimmune-concerns", name: "Autoimmune concerns" },
    { id: "chronic-immune-inflammation", name: "Chronic inflammation" },
    { id: "gut-immune-issues", name: "Gut-related immune issues" },
  ],
  "sexual-health": [
    { id: "low-libido", name: "Low libido" },
    { id: "erectile-dysfunction", name: "Erectile dysfunction" },
    { id: "sexual-performance", name: "Sexual performance concerns" },
    { id: "hormonal-imbalance", name: "Hormonal imbalance" },
  ],
  "skin-hair": [
    { id: "wrinkles-fine-lines", name: "Wrinkles and fine lines" },
    { id: "hair-thinning", name: "Hair thinning or loss" },
    { id: "slow-skin-healing", name: "Slow skin wound healing" },
    { id: "dull-skin", name: "Dull or aging skin" },
    { id: "acne-scarring", name: "Acne scarring" },
  ],
  "gut-health": [
    { id: "ibs-symptoms", name: "IBS symptoms" },
    { id: "leaky-gut", name: "Leaky gut syndrome" },
    { id: "bloating", name: "Frequent bloating" },
    { id: "gut-inflammation-direct", name: "Gut inflammation" },
    { id: "food-sensitivities", name: "Food sensitivities" },
  ],
};

export default function SymptomCheckerPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState<"mild" | "moderate" | "severe">("moderate");
  const [priority, setPriority] = useState<string>("effectiveness");

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const params = new URLSearchParams({
      symptoms: selectedSymptoms.join(","),
      severity,
      priority,
      category: selectedCategory || "",
    });
    router.push(`/results?${params.toString()}`);
  };

  return (
    <div className="min-h-[80vh] py-8 md:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
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
                <div className={cn("w-12 h-0.5", step > s ? "bg-accent" : "bg-border")} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Category */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-base mb-2">
                What area concerns you most?
              </h1>
              <p className="text-muted">
                Select a health category to explore which peptides researchers are studying.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSymptoms([]);
                    setStep(2);
                  }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
                    cat.color,
                    selectedCategory === cat.id && "border-accent ring-2 ring-accent/20"
                  )}
                >
                  <cat.icon className="h-6 w-6 text-accent flex-shrink-0" />
                  <div>
                    <div className="font-medium text-base">{cat.name}</div>
                    <div className="text-sm text-muted">{cat.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Symptoms */}
        {step === 2 && selectedCategory && (
          <div>
            <div className="text-center mb-8">
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-base mb-2">
                Select your symptoms
              </h1>
              <p className="text-muted">
                Choose all that apply. Select at least one to continue.
              </p>
            </div>
            <div className="space-y-3">
              {symptomsByCategory[selectedCategory]?.map((symptom) => (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                    selectedSymptoms.includes(symptom.id)
                      ? "border-accent bg-accent/5"
                      : "border-border bg-card hover:border-accent"
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
                  <span className="font-medium text-text-primary">{symptom.name}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-text-primary font-medium hover:bg-card transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={selectedSymptoms.length === 0}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-surface font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <div>
            <div className="text-center mb-8">
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-base mb-2">
                Your preferences
              </h1>
              <p className="text-muted">
                Help us refine your educational results.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-base mb-3">
                  How severe are your symptoms?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(["mild", "moderate", "severe"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeverity(s)}
                      className={cn(
                        "p-3 rounded-xl border-2 text-center font-medium capitalize transition-all",
                        severity === s
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border text-muted hover:border-accent"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-base mb-3">
                  What matters most to you?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "effectiveness", label: "Effectiveness" },
                    { id: "safety", label: "Safety Profile" },
                    { id: "value", label: "Research Depth" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPriority(p.id)}
                      className={cn(
                        "p-3 rounded-xl border-2 text-center font-medium transition-all",
                        priority === p.id
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-border text-muted hover:border-accent"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-text-primary font-medium hover:bg-card transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-surface font-semibold hover:bg-accent-hover transition-colors shadow-warm"
              >
                See Research Results <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
