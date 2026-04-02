import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd, { breadcrumbSchema } from "@/components/JsonLd";
import { PRODUCTION_DOMAIN } from "@/lib/seo";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: `${PRODUCTION_DOMAIN}${item.href}`,
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted" />}
                {isLast ? (
                  <span className="text-base font-medium truncate max-w-[200px]">{item.label}</span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
