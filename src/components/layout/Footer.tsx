import Link from "next/link";
import { FlaskConical } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-500 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <FlaskConical className="h-7 w-7 text-blue-600" />
              <span className="text-lg font-bold text-gray-900">
                Peptide<span className="text-blue-600">Wise</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500">
              Evidence-based peptide education by Dr. Patrick Taylor, MD. Empowering
              you with knowledge to make informed health decisions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li><Link href="/peptides" className="text-sm hover:text-gray-900 transition-colors">Browse Peptides</Link></li>
              <li><Link href="/stacks" className="text-sm hover:text-gray-900 transition-colors">Personalized Protocols</Link></li>
              <li><Link href="/symptom-checker" className="text-sm hover:text-gray-900 transition-colors">Symptom Checker</Link></li>
              <li><Link href="/learn" className="text-sm hover:text-gray-900 transition-colors">Articles</Link></li>
              <li><Link href="/research" className="text-sm hover:text-gray-900 transition-colors">Research</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Popular Guides
            </h3>
            <ul className="space-y-2">
              <li><Link href="/peptides/bpc-157" className="text-sm hover:text-gray-900 transition-colors">BPC-157 Guide</Link></li>
              <li><Link href="/peptides/semaglutide" className="text-sm hover:text-gray-900 transition-colors">Semaglutide Guide</Link></li>
              <li><Link href="/peptides/tirzepatide" className="text-sm hover:text-gray-900 transition-colors">Tirzepatide Guide</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Dr. Taylor
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://tinyurl.com/drtaylorfreeconsult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-gray-900 transition-colors"
                >
                  Live Vital MD
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/drpattaylor/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-gray-900 transition-colors"
                >
                  Instagram @drpattaylor
                </a>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-gray-900 transition-colors">
                  About Dr. Taylor
                </Link>
              </li>
              <li>
                <a
                  href="https://tinyurl.com/drtaylorfreeconsult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-gray-900 transition-colors"
                >
                  Book a Consultation
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong className="text-gray-700">Medical Disclaimer:</strong> The information provided on PeptideWise
              is for educational purposes only and is not intended as medical advice. Peptide therapies should
              only be used under the supervision of a qualified healthcare provider. Always consult with a
              licensed physician before starting any peptide protocol. PeptideWise does not sell medications
              or provide medical services directly. For personalized medical guidance, visit{" "}
              <a href="https://tinyurl.com/drtaylorfreeconsult" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                LiveVital.io
              </a>.
            </p>
          </div>
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} PeptideWise by Dr. Patrick Taylor, MD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
