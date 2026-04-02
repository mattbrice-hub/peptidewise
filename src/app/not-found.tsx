import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-heading font-semibold text-border mb-4">404</div>
        <h1 className="text-2xl font-heading font-semibold text-base mb-2">Page Not Found</h1>
        <p className="text-muted mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-surface font-medium hover:bg-accent-hover transition-colors"
        >
          <Home className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
