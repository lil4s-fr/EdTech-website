"use client";

import { useState } from "react";

// ─── TypeScript Interfaces ─────────────────────────────────────────────────────

export interface Organisation {
  id: number;
  Name: string;
  Logo: {
    url: string;
    alternativeText?: string | null;
  } | null;
  Link?: string | null;
  Category: "partner" | "member";
}

export interface DirectoryBlock {
  Title: string;
  Description: string;
}

type ActiveFilter = "partner" | "member";

interface MembresPageClientProps {
  header: DirectoryBlock;
  organisations: Organisation[];
}

// ─── Title renderer ───────────────────────────────────────────────────────────
// Bolds "Membres" and "partenaires" while keeping "nos" / "et" normal weight.

function StyledTitle({ text }: Readonly<{ text: string }>) {
  const boldWords = new Set(["membres", "partenaires"]);
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const clean = word.replaceAll(/[^a-zA-ZÀ-ÿ]/g, "").toLowerCase();
        const isBold = boldWords.has(clean);
        return (
          <span key={`w-${word}-${i}`} className={isBold ? "font-bold" : "font-normal"}>
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MembresPageClient({
  header,
  organisations,
}: Readonly<MembresPageClientProps>) {
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("partner");

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  const filtered = organisations.filter(
    (org) => org.Category === activeFilter
  );

  const filters: { key: ActiveFilter; label: string }[] = [
    { key: "partner", label: "Nos partenaires" },
    { key: "member",  label: "Nos membres" },
  ];

  return (
    <main className="pt-20">

      {/* ── Header section ──────────────────────────────────────────────────── */}
      <section className="w-full bg-[#F9F9F9] px-6 py-16">
        <div className="mx-auto max-w-300 flex flex-col items-center gap-6 text-center">

          {/* Title */}
          <h1 className="text-3xl md:text-4xl text-gray-900 leading-tight">
            <StyledTitle text={header.Title} />
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
            {header.Description}
          </p>

          {/* Filter pills */}
          <div className="flex items-center gap-3 mt-2">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-6 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer ${
                  activeFilter === key
                    ? "border-2 border-gray-900 font-bold text-gray-900 bg-white"
                    : "border-2 border-gray-300 font-normal text-gray-500 bg-white hover:border-gray-500 hover:text-gray-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ── Logo grid ───────────────────────────────────────────────────────── */}
      <section className="w-full bg-white px-6 py-14">
        <div className="mx-auto max-w-300">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-20">Aucune organisation trouvée.</p>
          ) : (
            /*
             * Flex-wrap + justify-center so incomplete rows (e.g. 13th card)
             * are centred automatically.
             * Card widths: 2 col mobile → 3 col tablet → 4 col desktop.
             */
            <ul className="flex flex-wrap justify-center gap-4 list-none p-0 m-0">
              {filtered.map((org) => {
                const logoUrl = org.Logo?.url
                  ? `${strapiUrl}${org.Logo.url}`
                  : null;

                const cardInner = (
                  <div className="group aspect-square w-full bg-white border border-gray-200 rounded-xl flex items-center justify-center p-6 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                    {logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logoUrl}
                        alt={org.Logo?.alternativeText || org.Name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 text-center">
                        {org.Name}
                      </span>
                    )}
                  </div>
                );

                return (
                  <li
                    key={org.id}
                    /* 2 cols mobile, 3 cols tablet, 4 cols desktop */
                    className="w-[calc(50%-8px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
                  >
                    {org.Link ? (
                      <a
                        href={org.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={org.Name}
                      >
                        {cardInner}
                      </a>
                    ) : (
                      cardInner
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

    </main>
  );
}

