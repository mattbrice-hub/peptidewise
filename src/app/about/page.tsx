import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Award,
  Stethoscope,
  Heart,
  MapPin,
  BookOpen,
  Instagram,
  Dumbbell,
  FlaskConical,
} from "lucide-react";
import JsonLd, { physicianSchema } from "@/components/JsonLd";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "About Dr. Patrick Taylor, MD",
  description:
    "Dr. Patrick Taylor, MD is a family medicine physician, cancer survivor, and founder of Live Vital MD. UNC Chapel Hill trained. Specializes in peptide therapy, obesity medicine, and lifestyle optimization.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      <JsonLd data={physicianSchema()} />
      {/* Hero */}
      <div className="text-center mb-12">
        <Image src="/images/dr-taylor.jpg" alt="Dr. Patrick Taylor, MD — Family Medicine Physician specializing in peptide therapy" width={144} height={144} className="w-36 h-36 rounded-xl object-cover mb-6 shadow-warm-lg mx-auto border-4 border-card" />
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-base mb-2">
          Dr. Patrick Taylor, MD
        </h1>
        <p className="font-body text-lg text-accent font-medium mb-1">
          Family Medicine Physician
        </p>
        <p className="font-body text-muted flex items-center justify-center gap-2">
          <MapPin className="h-4 w-4" />
          Salt Lake City, UT
        </p>
        <div className="flex items-center justify-center gap-4 mt-5">
          <a
            href="https://www.instagram.com/drpattaylor/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-warm-white border border-border text-muted text-sm hover:border-pink-300 hover:text-pink-500 transition-all"
          >
            <Instagram className="h-4 w-4" /> @drpattaylor
          </a>
          <a
            href="https://tinyurl.com/drtaylorfreeconsult"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-surface text-sm font-medium transition-colors"
          >
            Live Vital MD <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* His Story */}
      <div className="bg-card shadow-warm rounded-xl border border-border p-6 md:p-8 mb-6">
        <h2 className="font-heading text-xl font-semibold text-base mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-400" /> His Story
        </h2>
        <div className="space-y-4 font-body text-text-primary leading-[1.7]">
          <p>
            Dr. Patrick Taylor&apos;s path to medicine was shaped by personal adversity. After
            surviving cancer treatment and subsequently developing Cushing&apos;s syndrome — a
            condition that caused dramatic weight gain — he found himself over 100 lbs heavier
            and struggling with the metabolic consequences.
          </p>
          <p>
            Through a combination of evidence-based medicine, lifestyle optimization, and
            peptide therapy, Dr. Taylor lost the weight and reclaimed his health. This
            transformative experience gave him a deeply personal understanding of metabolic
            disease and the power of proactive medicine — something he now brings to every
            patient interaction.
          </p>
          <p>
            A former championship rugby player at BYU, Dr. Taylor understands the demands
            athletes place on their bodies and the importance of recovery, performance
            optimization, and longevity. He founded{" "}
            <a
              href="https://tinyurl.com/drtaylorfreeconsult"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover"
            >
              Live Vital MD
            </a>{" "}
            to provide data-driven, proactive healthcare that goes beyond just managing
            sickness — focusing instead on optimizing health, extending healthspan, and
            helping patients thrive.
          </p>
        </div>
      </div>

      {/* Why Peptides */}
      <div className="bg-card rounded-xl border border-border p-6 md:p-8 mb-6">
        <h2 className="font-heading text-xl font-semibold text-base mb-4 flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-accent" /> Why Peptides?
        </h2>
        <div className="space-y-4 font-body text-text-primary leading-[1.7]">
          <p>
            &ldquo;Peptides represent one of the most exciting frontiers in medicine today. These
            are molecules that your body already makes — we&apos;re not introducing foreign
            substances, we&apos;re supplementing and optimizing natural biological pathways.&rdquo;
          </p>
          <p>
            &ldquo;After my own health crisis, I dove deep into the peptide research literature.
            I was struck by how much solid science existed for compounds like BPC-157,
            semaglutide, and GHK-Cu — yet how little of that information was reaching patients
            in an accessible, honest format. That&apos;s why I created PeptideWise: to bridge
            the gap between the research and the people who can benefit from understanding it.&rdquo;
          </p>
          <p>
            &ldquo;My commitment is to education, not sales. I want you to understand the
            evidence — what&apos;s proven, what&apos;s promising, and what&apos;s still unknown. Peptide
            therapy should always be supervised by a qualified physician who can evaluate
            your individual needs, monitor your labs, and adjust protocols based on your
            response.&rdquo;
          </p>
        </div>
      </div>

      {/* Education & Training */}
      <div className="bg-card shadow-warm rounded-xl border border-border p-6 md:p-8 mb-6">
        <h2 className="font-heading text-xl font-semibold text-base mb-6 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-accent" /> Education & Training
        </h2>
        <div className="border-l-2 border-accent-light pl-6 space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-3 h-3 rounded-full bg-accent mt-1.5 -ml-[1.875rem]" />
            <div>
              <div className="font-medium text-base">Residency — Family Medicine</div>
              <div className="text-sm text-muted">University of Utah, Salt Lake City, UT</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-3 h-3 rounded-full bg-accent mt-1.5 -ml-[1.875rem]" />
            <div>
              <div className="font-medium text-base">Doctor of Medicine (MD)</div>
              <div className="text-sm text-muted">University of North Carolina at Chapel Hill, School of Medicine</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-3 h-3 rounded-full bg-accent mt-1.5 -ml-[1.875rem]" />
            <div>
              <div className="font-medium text-base">Undergraduate Studies</div>
              <div className="text-sm text-muted">Brigham Young University — National Championship Rugby Team</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Interests */}
      <div className="bg-card shadow-warm rounded-xl border border-border p-6 md:p-8 mb-6">
        <h2 className="font-heading text-xl font-semibold text-base mb-4 flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-accent" /> Clinical Interests
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: Dumbbell, name: "Obesity & Lifestyle Medicine" },
            { icon: FlaskConical, name: "Peptide Therapy" },
            { icon: Heart, name: "Chronic Disease Management" },
            { icon: Award, name: "Sports Medicine" },
            { icon: BookOpen, name: "Longevity & Anti-Aging" },
            { icon: Stethoscope, name: "Affordable Primary Care" },
          ].map((interest) => (
            <div
              key={interest.name}
              className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border"
            >
              <interest.icon className="h-5 w-5 text-accent flex-shrink-0" />
              <span className="text-text-primary text-sm font-medium">{interest.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-xl bg-accent p-8 md:p-10 text-center">
        <h2 className="font-heading text-2xl font-semibold mb-3 text-surface">Ready to Optimize Your Health?</h2>
        <p className="text-surface/80 mb-6 max-w-lg mx-auto font-body">
          Dr. Taylor offers personalized peptide therapy consultations through Live Vital MD.
          Data-driven protocols tailored to your labs, goals, and health history.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://tinyurl.com/drtaylorfreeconsult"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-warm-white text-text-primary font-semibold hover:bg-surface transition-colors shadow-warm"
          >
            Book a Consultation <ArrowRight className="h-5 w-5" />
          </a>
          <Link
            href="/stacks"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-surface font-semibold border border-white/20 hover:bg-white/20 transition-colors"
          >
            Find Your Protocol
          </Link>
        </div>
      </div>
    </div>
  );
}
