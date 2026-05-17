import { fetchStrapi } from "../../lib/strapi";
import Hero, { HeroData } from "../../components/Hero";

export default async function HomePage() {
  // Populate the Hero block from the Dynamic Zone — field name must match schema casing ("Blocks")
  const endpoint = "/api/homepage?populate[Blocks][on][sections.hero][populate]=*";

  let blocks: any[] = [];
  try {
    const response = await fetchStrapi(endpoint);
    blocks = response?.data?.Blocks || [];
  } catch (error) {
    console.error("Error fetching homepage data:", error);
  }

  return (
    <main>
      {blocks.map((block: any) => {
        switch (block.__component) {
          case "sections.hero":
            return <Hero key={block.id} data={block as HeroData} />;

          // Future blocks (e.g. sections.features, sections.testimonials …)
          // can be added here as additional `case` branches.

          default:
            return null;
        }
      })}
    </main>
  );
}
