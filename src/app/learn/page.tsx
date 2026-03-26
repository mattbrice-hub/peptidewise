import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Learn About Peptides - PeptideWise",
  description: "Educational articles about peptide therapy, safety guides, and research insights by Dr. Patrick Taylor.",
};

const categoryStyles: Record<string, string> = {
  guide: "bg-blue-900/30 text-blue-400",
  research: "bg-green-900/30 text-green-400",
  safety: "bg-amber-900/30 text-amber-400",
  comparison: "bg-purple-900/30 text-purple-400",
};

export default function LearnPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Learn</h1>
        <p className="text-gray-400">
          Educational articles to help you understand peptide therapy, the latest research, and safety considerations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/learn/${article.slug}`}
            className="group bg-white/5 rounded-2xl border border-white/10 p-6 hover:border-primary-500/30 hover:bg-white/[0.07] transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full capitalize", categoryStyles[article.category])}>
                {article.category}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="h-3 w-3" /> {article.readingTime} min read
              </span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-gray-400 mb-4">{article.excerpt}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-primary-400">
              Read Article <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
