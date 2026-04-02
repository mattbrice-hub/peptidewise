import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd, { organizationSchema, webSiteSchema } from "@/components/JsonLd";
import { buildMeta } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

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
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface font-body">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
