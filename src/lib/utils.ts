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
    "growth-hormone": "bg-blue-900/30 text-blue-400",
    "weight-management": "bg-green-900/30 text-green-400",
    "tissue-repair": "bg-orange-900/30 text-orange-400",
    "anti-aging": "bg-purple-900/30 text-purple-400",
    cognitive: "bg-indigo-900/30 text-indigo-400",
    immune: "bg-red-900/30 text-red-400",
    "sexual-health": "bg-pink-900/30 text-pink-400",
    sleep: "bg-violet-900/30 text-violet-400",
    "skin-hair": "bg-amber-900/30 text-amber-400",
  };
  return colors[category] || "bg-gray-800 text-gray-400";
}
