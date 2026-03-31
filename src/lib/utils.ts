import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    "growth-hormone": "Growth Hormone",
    "weight-management": "Weight Management",
    "tissue-repair": "Tissue Repair",
    "anti-aging": "Anti-Aging",
    cognitive: "Cognitive",
    immune: "Immune Support",
    "sexual-health": "Sexual Health",
    sleep: "Sleep",
    "skin-hair": "Skin & Hair",
  };
  return labels[category] || category;
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    "growth-hormone": "bg-blue-100 text-blue-700",
    "weight-management": "bg-green-100 text-green-700",
    "tissue-repair": "bg-orange-100 text-orange-700",
    "anti-aging": "bg-purple-100 text-purple-700",
    cognitive: "bg-indigo-100 text-indigo-700",
    immune: "bg-red-100 text-red-700",
    "sexual-health": "bg-pink-100 text-pink-700",
    sleep: "bg-violet-100 text-violet-700",
    "skin-hair": "bg-amber-100 text-amber-700",
  };
  return colors[category] || "bg-gray-100 text-gray-600";
}
