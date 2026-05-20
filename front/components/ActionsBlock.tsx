import Link from "next/link";

// ─── Strapi Data Interfaces ───────────────────────────────────────────────────

export interface InfoCard {
  id: number;
  Title: string;
  Description: string;
  Link?: string | null;
}

export interface ActionsData {
  SectionTitle: string;
  Cards: InfoCard[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ActionsBlock({ data }: Readonly<{ data: ActionsData }>) {
  const { SectionTitle, Cards } = data;

  return (
    <section className="w-full px-6 py-10">
      <div
        className="mx-auto max-w-300 rounded-3xl px-8 py-12 md:px-14"
        style={{ background: "linear-gradient(135deg, #1A1C4C 0%, #242766 50%, #2E3192 100%)" }}
      >
        {/* Section title */}
        {SectionTitle && (
          <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-10">
            {SectionTitle}
          </h2>
        )}

        {/* 3-col grid */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0 m-0">
          {Cards.map((card) => (
            <li key={card.id} className="flex">
              <div className="relative flex flex-col w-full bg-white rounded-xl p-6 shadow-sm">
                {/* Title */}
                <p className="text-sm font-bold text-gray-900 mb-2">
                  {card.Title}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {card.Description}
                </p>

                {/* Conditional link button — bottom-right circle */}
                {card.Link && (
                  <div className="flex justify-end mt-4">
                    <Link
                      href={card.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`En savoir plus — ${card.Title}`}
                      className="flex items-center justify-center w-8 h-8 rounded-full text-white transition-all duration-300 hover:brightness-110 active:scale-95"
                      style={{ background: "linear-gradient(135deg, #1A1C4C, #2E3192)" }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2.5 7h9M7 2.5l4.5 4.5L7 11.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
