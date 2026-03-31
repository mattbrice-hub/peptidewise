"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, FlaskConical } from "lucide-react";

const navLinks = [
  { href: "/peptides", label: "Peptides" },
  { href: "/stacks", label: "Stacks" },
  { href: "/symptom-checker", label: "Symptom Checker" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About Dr. Taylor" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <FlaskConical className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Peptide<span className="text-blue-600">Wise</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/about"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <span className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">PT</span>
            </Link>
            <Link
              href="/stacks"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              Find Your Stack
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/stacks"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 mt-2 rounded-lg gradient-primary text-white text-center text-base font-medium"
            >
              Find Your Stack
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
