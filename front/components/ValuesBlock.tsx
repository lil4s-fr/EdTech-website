import type { InfoCard } from "./ActionsBlock";

// ─── Strapi Data Interface ────────────────────────────────────────────────────

export interface ValuesData {
  Title: string;   // Note: "Title", not "SectionTitle" — matches sections/values.json
  Cards: InfoCard[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ValuesBlock({ data }: Readonly<{ data: ValuesData }>) {
  const { Title, Cards } = data;

  return (
    <section className="w-full bg-white px-6 py-10">
      <div className="mx-auto max-w-300">

        {/* Section title */}
        {Title && (
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-10">
            {Title}
          </h2>
        )}

        {/*
          Flex-wrap centred layout:
          - Desktop: 2 cards per row (each ~45% wide), 5th card auto-centres
          - Mobile: 1 card full-width
        */}
        <ul
          className="flex flex-wrap justify-center gap-6 list-none p-0 m-0"
        >
          {Cards.map((card) => (
            <li
              key={card.id}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(50%-12px)] max-w-xl"
            >
              <div className="h-full bg-white border border-gray-200 rounded-xl shadow-sm p-6">
                {/* Title */}
                <p className="text-sm font-bold text-gray-900 mb-3">
                  {card.Title}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {card.Description}
                </p>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}

