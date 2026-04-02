import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base text-[rgba(250,247,242,0.6)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-light/30 to-transparent" />

        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-heading text-lg font-semibold text-surface tracking-wide">
                Peptide<span className="text-accent-light">Wise</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Evidence-based peptide education by Dr. Patrick Taylor, MD. Empowering
              you with knowledge to make informed health decisions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-body font-semibold text-surface uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li><Link href="/peptides" className="text-sm hover:text-accent transition-colors">Browse Peptides</Link></li>
              <li><Link href="/stacks" className="text-sm hover:text-accent transition-colors">Personalized Protocols</Link></li>
              <li><Link href="/symptom-checker" className="text-sm hover:text-accent transition-colors">Symptom Checker</Link></li>
              <li><Link href="/learn" className="text-sm hover:text-accent transition-colors">Articles</Link></li>
              <li><Link href="/research" className="text-sm hover:text-accent transition-colors">Research</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-body font-semibold text-surface uppercase tracking-wider mb-4">
              Popular Guides
            </h3>
            <ul className="space-y-2">
              <li><Link href="/peptides/bpc-157" className="text-sm hover:text-accent transition-colors">BPC-157 Guide</Link></li>
              <li><Link href="/peptides/semaglutide" className="text-sm hover:text-accent transition-colors">Semaglutide Guide</Link></li>
              <li><Link href="/peptides/tirzepatide" className="text-sm hover:text-accent transition-colors">Tirzepatide Guide</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-body font-semibold text-surface uppercase tracking-wider mb-4">
              Dr. Taylor
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="https://tinyurl.com/drtaylorfreeconsult" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">
                  Live Vital MD
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/drpattaylor/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">
                  Instagram @drpattaylor
                </a>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-accent transition-colors">
                  About Dr. Taylor
                </Link>
              </li>
              <li>
                <a href="https://tinyurl.com/drtaylorfreeconsult" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-accent transition-colors">
                  Book a Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[rgba(250,247,242,0.1)] pt-8 pb-8">
          <div className="bg-[rgba(250,247,242,0.05)] rounded-lg p-4 mb-6 border border-[rgba(250,247,242,0.1)]">
            <p className="text-xs leading-relaxed">
              <strong className="text-surface">Medical Disclaimer:</strong> The information provided on PeptideWise
              is for educational purposes only and is not intended as medical advice. Peptide therapies should
              only be used under the supervision of a qualified healthcare provider. Always consult with a
              licensed physician before starting any peptide protocol. PeptideWise does not sell medications
              or provide medical services directly. For personalized medical guidance, visit{" "}
              <a href="https://tinyurl.com/drtaylorfreeconsult" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light">
                LiveVital.io
              </a>.
            </p>
          </div>
          <p className="text-sm text-[rgba(250,247,242,0.4)] text-center">
            &copy; {new Date().getFullYear()} PeptideWise by Dr. Patrick Taylor, MD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
