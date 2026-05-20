"use client";

import Link from "next/link";
import { useScrolled } from "./ScrollContext";

interface HeaderButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "outline";
  isExternal?: boolean;
}

const baseStyle =
  "px-8 py-3 rounded-full font-bold transition-all duration-300 text-sm tracking-wide shadow-sm flex items-center justify-center";

// Styles when the page is scrolled (normal header with white background)
const scrolledVariants: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-[#2E3192] via-[#5271C2] to-[#75AADB] text-white shadow-md hover:brightness-110 active:scale-95",
  outline:
    "border-3 border-gray-900 bg-transparent text-gray-900 hover:bg-gray-900 hover:text-white",
  secondary:
    "bg-gradient-to-r from-[#1A1C4C] via-[#242766] to-[#2E3192] text-white hover:brightness-110 hover:shadow-lg active:scale-95",
};

// Styles when at the very top (transparent header over the dark hero)
const topVariants: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-[#2E3192] via-[#5271C2] to-[#75AADB] text-white shadow-md hover:brightness-110 active:scale-95",
  outline:
    "border-3 border-white bg-white/10 backdrop-blur-md text-white hover:bg-white/20",
  secondary:
    "bg-white/20 text-white border border-white/40 hover:bg-white/30 backdrop-blur-sm",
};

export default function HeaderButton({
  href,
  label,
  variant = "primary",
  isExternal = false,
}: Readonly<HeaderButtonProps>) {
  const scrolled = useScrolled();

  const variantClass = scrolled
    ? scrolledVariants[variant]
    : topVariants[variant];

  const className = `${baseStyle} ${variantClass}`;

  if (isExternal) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

