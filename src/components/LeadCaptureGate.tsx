"use client";

import { useState } from "react";
import { Lock, ArrowRight, Loader2 } from "lucide-react";

interface LeadCaptureGateProps {
  source: "symptom-checker" | "protocols";
  onUnlocked: () => void;
}

const subtextMap = {
  "symptom-checker":
    "See research scores, safety profiles, and Dr. Taylor's detailed reasoning for each peptide recommendation.",
  protocols:
    "See the specific peptides in each protocol and Dr. Taylor's personalized clinical notes.",
};

export default function LeadCaptureGate({ source, onUnlocked }: LeadCaptureGateProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/capture-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim(), source }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      localStorage.setItem("peptidewise_unlocked", "true");
      onUnlocked();
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6 rounded-xl border border-border bg-card p-6 md:p-8">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center mb-4">
          <Lock className="h-5 w-5 text-accent" />
        </div>
        <h3 className="font-heading text-2xl font-semibold text-base mb-1">
          Unlock Dr. Taylor&apos;s Full Analysis
        </h3>
        <p className="font-body text-sm text-muted mb-6 max-w-md">
          {subtextMap[source]}
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-3">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-warm-white border border-border text-base placeholder-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-warm-white border border-border text-base placeholder-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-colors font-body"
          />
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-surface font-body font-medium hover:bg-accent-hover transition-colors shadow-warm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                See My Results <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-muted mt-4">
          We respect your privacy. No spam, unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
