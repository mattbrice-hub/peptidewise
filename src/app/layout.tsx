import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "PeptideWise - Evidence-Based Peptide Education by Dr. Pat Taylor",
  description:
    "Learn about peptide therapy from Dr. Patrick Taylor, MD. Evidence-based educational resources on BPC-157, semaglutide, tirzepatide, and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#0a0a0a]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
