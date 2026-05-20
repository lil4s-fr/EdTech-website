// ─── Strapi Data Interfaces ───────────────────────────────────────────────────

interface StrapiImage {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

interface HighlightCard {
  id: number;
  Image: StrapiImage;
  AltText: string;
  Link?: string | null;
}

export interface HighlightsData {
  __component: "sections.highlights";
  id: number;
  Title: string;
  Highlights: HighlightCard[];
}

// ─── Component ────────────────────────────────────────────────────────────────

interface HighlightsProps {
  data: HighlightsData;
}

export default function Highlights({ data }: Readonly<HighlightsProps>) {
  const { Title, Highlights: cards } = data;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  if (!cards?.length) return null;

  return (
    <section className="w-full bg-white py-16 px-6">
        <div className="mx-auto max-w-300">

        {/* ── Section title ─────────────────────────────────────────────────── */}
        {Title && (
          <p className="uppercase text-gray-900 font-semibold text-lg md:text-xl tracking-wider mb-12">
            {Title}
          </p>
        )}

        {/* ── Grid ──────────────────────────────────────────────────────────── */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0 m-0">
          {cards.map((card) => {
            const imageUrl = card.Image?.url
              ? `${strapiUrl}${card.Image.url}`
              : null;
            const alt = card.AltText || card.Image?.alternativeText || "";
            const hasLink = Boolean(card.Link);

            const imageBlock = imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={alt}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : null;

            return (
              <li key={card.id}>
                {hasLink ? (
                  <a
                    href={card.Link!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out"
                    aria-label={alt}
                  >
                    <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                      {imageBlock}
                    </div>
                  </a>
                ) : (
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                      {imageBlock}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}

