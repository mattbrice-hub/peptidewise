import Link from "next/link";
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

export const metadata = {
  title: "About Dr. Patrick Taylor, MD - PeptideWise",
  description:
    "Meet Dr. Patrick Taylor — board-eligible family medicine physician, cancer survivor, and founder of Live Vital MD. Learn about his approach to evidence-based peptide therapy.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full gradient-primary text-white text-3xl font-bold mb-6 shadow-md">
          PT
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Dr. Patrick Taylor, MD
        </h1>
        <p className="text-lg text-blue-600 font-medium mb-1">
          Board-Eligible Family Medicine Physician
        </p>
        <p className="text-gray-600 flex items-center justify-center gap-2">
          <MapPin className="h-4 w-4" />
          Salt Lake City, UT
        </p>
        <div className="flex items-center justify-center gap-4 mt-5">
          <a
            href="https://www.instagram.com/drpattaylor/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 text-sm hover:border-pink-300 hover:text-pink-500 transition-all"
          >
            <Instagram className="h-4 w-4" /> @drpattaylor
          </a>
          <a
            href="https://tinyurl.com/drtaylorfreeconsult"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Live Vital MD <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* His Story */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-400" /> His Story
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
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
              className="text-blue-600 hover:text-blue-500"
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
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6 md:p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-blue-600" /> Why Peptides?
        </h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
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
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-600" /> Education & Training
        </h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-3 h-3 rounded-full bg-primary-500 mt-1.5" />
            <div>
              <div className="font-medium text-gray-900">Residency — Family Medicine</div>
              <div className="text-sm text-gray-600">University of Utah, Salt Lake City, UT</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-3 h-3 rounded-full bg-primary-500 mt-1.5" />
            <div>
              <div className="font-medium text-gray-900">Doctor of Medicine (MD)</div>
              <div className="text-sm text-gray-600">University of North Carolina at Chapel Hill, School of Medicine</div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-3 h-3 rounded-full bg-primary-500 mt-1.5" />
            <div>
              <div className="font-medium text-gray-900">Undergraduate Studies</div>
              <div className="text-sm text-gray-600">Brigham Young University — National Championship Rugby Team</div>
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Interests */}
      <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 md:p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-blue-600" /> Clinical Interests
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
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200"
            >
              <interest.icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="text-gray-600 text-sm font-medium">{interest.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl gradient-primary p-8 md:p-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to Optimize Your Health?</h2>
        <p className="text-white/80 mb-6 max-w-lg mx-auto">
          Dr. Taylor offers personalized peptide therapy consultations through Live Vital MD.
          Data-driven protocols tailored to your labs, goals, and health history.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://tinyurl.com/drtaylorfreeconsult"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary-700 font-semibold hover:bg-gray-50 transition-colors shadow-lg"
          >
            Book a Consultation <ArrowRight className="h-5 w-5" />
          </a>
          <Link
            href="/stacks"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-colors"
          >
            Explore Recommended Stacks
          </Link>
        </div>
      </div>
    </div>
  );
}
