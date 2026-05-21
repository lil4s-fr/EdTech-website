interface CardData {
  id: number;
  Image?: { url: string; alternativeText?: string };
  Title?: string;
  Description?: string;
  Link?: string;
}

interface CardGridProps {
  data: {
    __component: "sections.card-grid";
    id: number;
    SectionTitle?: string;
    Description?: string;
    ColumnsNumber?: "two" | "three" | "four";
    Cards?: CardData[];
  };
}

const colsMap: Record<string, string> = {
  two: "grid-cols-1 sm:grid-cols-2",
  three: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  four: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export default function CardGrid({ data }: Readonly<CardGridProps>) {
  const { SectionTitle, Description, ColumnsNumber = "three", Cards = [] } = data;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  return (
    <section className="w-full bg-white px-6 py-10">
      <div className="mx-auto max-w-300">
        {SectionTitle && (
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {SectionTitle}
          </h2>
        )}
        {Description && (
          <p className="text-center text-gray-500 text-sm mb-10 max-w-2xl mx-auto">
            {Description}
          </p>
        )}
        <div className={`grid gap-6 ${colsMap[ColumnsNumber] ?? colsMap.three}`}>
          {Cards.map((card) => {
            const imgUrl = card.Image?.url ? `${strapiUrl}${card.Image.url}` : null;
            return (
              <div
                key={card.id}
                className="h-full bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col"
              >
                {imgUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imgUrl}
                    alt={card.Image?.alternativeText || card.Title || ""}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6 flex flex-col flex-1">
                  {card.Title && (
                    <p className="text-sm font-bold text-gray-900 mb-2">{card.Title}</p>
                  )}
                  {card.Description && (
                    <p className="text-sm text-gray-400 leading-relaxed flex-1">
                      {card.Description}
                    </p>
                  )}
                  {card.Link && (
                    <a
                      href={card.Link}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#2E3192] hover:underline"
                    >
                      En savoir plus →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
