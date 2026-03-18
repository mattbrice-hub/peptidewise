import Link from "next/link";
import { FlaskConical } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <FlaskConical className="h-7 w-7 text-primary-400" />
              <span className="text-lg font-bold text-white">
                Peptide<span className="text-primary-400">Wise</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Your trusted guide to peptide therapy. Compare providers, understand
              your options, and make informed decisions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li><Link href="/symptom-checker" className="text-sm hover:text-white transition-colors">Symptom Checker</Link></li>
              <li><Link href="/peptides" className="text-sm hover:text-white transition-colors">Browse Peptides</Link></li>
              <li><Link href="/providers" className="text-sm hover:text-white transition-colors">Find Providers</Link></li>
              <li><Link href="/compare" className="text-sm hover:text-white transition-colors">Compare Providers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Learn
            </h3>
            <ul className="space-y-2">
              <li><Link href="/learn" className="text-sm hover:text-white transition-colors">All Articles</Link></li>
              <li><Link href="/peptides/bpc-157" className="text-sm hover:text-white transition-colors">BPC-157 Guide</Link></li>
              <li><Link href="/peptides/semaglutide" className="text-sm hover:text-white transition-colors">Semaglutide Guide</Link></li>
              <li><Link href="/peptides/sermorelin" className="text-sm hover:text-white transition-colors">Sermorelin Guide</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li><span className="text-sm">Privacy Policy</span></li>
              <li><span className="text-sm">Terms of Service</span></li>
              <li><span className="text-sm">Medical Disclaimer</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Medical Disclaimer:</strong> The information provided on PeptideWise
              is for educational purposes only and is not intended as medical advice. Peptide therapies should
              only be used under the supervision of a qualified healthcare provider. Always consult with a
              licensed physician before starting any peptide protocol. PeptideWise does not sell medications
              or provide medical services directly.
            </p>
          </div>
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} PeptideWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
