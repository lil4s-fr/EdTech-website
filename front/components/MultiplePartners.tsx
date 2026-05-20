// ─── Strapi Data Interfaces ───────────────────────────────────────────────────

interface StrapiImage {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

interface PartnerItem {
  id: number;
  Name: string;
  Logo: StrapiImage;
  Link: string;
}

export interface MultiplePartnersData {
  __component: "sections.multiple-partners";
  id: number;
  Partner: PartnerItem[];
}

// ─── Component ────────────────────────────────────────────────────────────────

interface MultiplePartnersProps {
  data: MultiplePartnersData;
}

export default function MultiplePartners({
  data,
}: Readonly<MultiplePartnersProps>) {
  const { Partner: partners } = data;
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  if (!partners?.length) return null;

  return (
    <section className="w-full bg-white py-12 px-6">
      <ul className="flex flex-wrap items-center justify-center gap-10 md:gap-16 list-none m-0 p-0">
        {partners.map((partner) => {
          const logoUrl = partner.Logo?.url
            ? `${strapiUrl}${partner.Logo.url}`
            : null;

          return (
            <li key={partner.id}>
              <a
                href={partner.Link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.Name}
                className="block transition-all duration-300 ease-in-out opacity-70 hover:opacity-100 hover:scale-105"
              >
                {logoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt={partner.Logo.alternativeText || partner.Name}
                    style={{
                      maxWidth: "300px",
                      maxHeight: "110px",
                      width: "auto",
                      height: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
