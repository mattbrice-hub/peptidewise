import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { articles } from "@/data/articles";
import { cn } from "@/lib/utils";
import { buildMeta } from "@/lib/seo";

export const metadata = buildMeta({
  title: "Learn About Peptides — Educational Articles",
  description:
    "Dr. Patrick Taylor, MD writes in-depth guides on peptide therapy — from beginner basics to GLP-1 weight loss peptides, BPC-157, and choosing a provider.",
  path: "/learn",
});

const categoryStyles: Record<string, string> = {
  guide: "bg-blue-50 text-blue-600",
  research: "bg-green-50 text-green-600",
  safety: "bg-amber-50 text-amber-700",
  comparison: "bg-purple-50 text-purple-600",
};

export default function LearnPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learn</h1>
        <p className="text-gray-600">
          Educational articles to help you understand peptide therapy, the latest research, and safety considerations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/learn/${article.slug}`}
            className="group bg-white shadow-sm rounded-2xl border border-gray-200 p-6 hover:border-blue-300 hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full capitalize", categoryStyles[article.category])}>
                {article.category}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="h-3 w-3" /> {article.readingTime} min read
              </span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-500 transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{article.excerpt}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
              Read Article <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
