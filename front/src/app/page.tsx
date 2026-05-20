import { fetchStrapi } from "../../lib/strapi";
import Hero, { HeroData } from "../../components/Hero";
import MultiplePartners, { MultiplePartnersData } from "../../components/MultiplePartners";
import Highlights, { HighlightsData } from "../../components/Highlights";
import Memberships, { MembershipsData } from "../../components/Memberships";

type Block = HeroData | MultiplePartnersData | HighlightsData | MembershipsData;

export default async function HomePage() {
  // Populate every registered block type in the Dynamic Zone
  const endpoint =
    "/api/homepage" +
    "?populate[Blocks][on][sections.hero][populate]=*" +
    "&populate[Blocks][on][sections.multiple-partners][populate][Partner][populate]=*" +
    "&populate[Blocks][on][sections.highlights][populate][Highlights][populate]=*" +
    "&populate[Blocks][on][sections.memberships][populate][Plans]=*";

  let blocks: Block[] = [];
  try {
    const response = await fetchStrapi(endpoint);
    blocks = (response?.data?.Blocks ?? []) as Block[];
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <main>
      {blocks.map((block) => {
        if (block.__component === "sections.hero") {
          return <Hero key={block.id} data={block} />;
        }
        if (block.__component === "sections.multiple-partners") {
          return <MultiplePartners key={block.id} data={block} />;
        }
        if (block.__component === "sections.highlights") {
          return <Highlights key={block.id} data={block} />;
        }
        if (block.__component === "sections.memberships") {
          return <Memberships key={block.id} data={block} />;
        }
        return null;
      })}
    </main>
  );
}