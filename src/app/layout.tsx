import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd, { organizationSchema, webSiteSchema } from "@/components/JsonLd";
import { buildMeta } from "@/lib/seo";

export const metadata: Metadata = buildMeta({
  title: "PeptideWise — Evidence-Based Peptide Education by Dr. Pat Taylor",
  description:
    "Dr. Patrick Taylor, MD brings evidence-based peptide therapy education to patients. Explore 15+ peptides, 99 PubMed studies, and physician-curated personalized protocols.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
