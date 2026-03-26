import Link from "next/link";
import { FlaskConical } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <FlaskConical className="h-7 w-7 text-primary-400" />
              <span className="text-lg font-bold text-white">
                Peptide<span className="text-primary-400">Wise</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500">
              Evidence-based peptide education by Dr. Patrick Taylor, MD. Empowering
              you with knowledge to make informed health decisions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li><Link href="/peptides" className="text-sm hover:text-white transition-colors">Browse Peptides</Link></li>
              <li><Link href="/symptom-checker" className="text-sm hover:text-white transition-colors">Symptom Checker</Link></li>
              <li><Link href="/learn" className="text-sm hover:text-white transition-colors">Articles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Popular Guides
            </h3>
            <ul className="space-y-2">
              <li><Link href="/peptides/bpc-157" className="text-sm hover:text-white transition-colors">BPC-157 Guide</Link></li>
              <li><Link href="/peptides/semaglutide" className="text-sm hover:text-white transition-colors">Semaglutide Guide</Link></li>
              <li><Link href="/peptides/tirzepatide" className="text-sm hover:text-white transition-colors">Tirzepatide Guide</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Dr. Taylor
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.livevital.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                >
                  Live Vital MD
                </a>
              </li>
              <li>
                <a
                  href="https://www.livevital.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                >
                  Book a Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="bg-white/5 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-400">Medical Disclaimer:</strong> The information provided on PeptideWise
              is for educational purposes only and is not intended as medical advice. Peptide therapies should
              only be used under the supervision of a qualified healthcare provider. Always consult with a
              licensed physician before starting any peptide protocol. PeptideWise does not sell medications
              or provide medical services directly. For personalized medical guidance, visit{" "}
              <a href="https://www.livevital.io/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">
                LiveVital.io
              </a>.
            </p>
          </div>
          <p className="text-sm text-gray-600 text-center">
            &copy; {new Date().getFullYear()} PeptideWise by Dr. Patrick Taylor, MD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
