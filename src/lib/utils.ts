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
    "growth-hormone": "bg-[#ede5d8] text-[#6b5a3e]",
    "weight-management": "bg-[#e8e2d6] text-[#5a4d3a]",
    "tissue-repair": "bg-[#f0e8dc] text-[#7a5c2a]",
    "anti-aging": "bg-[#f0e6da] text-[#7a5c2a]",
    cognitive: "bg-[#ede8e0] text-[#5a4d3a]",
    immune: "bg-[#ebe6de] text-[#5a4d3a]",
    "sexual-health": "bg-[#f0e8e2] text-[#6b5a3e]",
    sleep: "bg-[#ede8e0] text-[#5a4d3a]",
    "skin-hair": "bg-[#f0ebe3] text-[#6b5a3e]",
  };
  return colors[category] || "bg-card text-muted";
}
