"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/peptides", label: "Peptides" },
  { href: "/stacks", label: "Protocols" },
  { href: "/symptom-checker", label: "Symptom Checker" },
  { href: "/learn", label: "Learn" },
  { href: "/research", label: "Research" },
  { href: "/about", label: "About Dr. Taylor" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="font-heading text-xl font-semibold text-surface tracking-wide">
              Peptide<span className="text-accent-light">Wise</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-body font-medium text-[rgba(250,247,242,0.7)] hover:text-surface transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-accent after:transition-all after:duration-200 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/stacks"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-surface text-sm font-body font-medium hover:bg-accent-hover transition-colors shadow-warm"
            >
              Find Your Protocol
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-[rgba(250,247,242,0.7)] hover:text-surface"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-[rgba(250,247,242,0.1)] bg-base">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-body font-medium text-[rgba(250,247,242,0.7)] hover:bg-[rgba(250,247,242,0.05)] hover:text-surface"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/stacks"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 mt-2 rounded-lg bg-accent text-surface text-center text-base font-body font-medium"
            >
              Find Your Protocol
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
