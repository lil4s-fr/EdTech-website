import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchStrapi } from "../../../lib/strapi";
import Hero from "../../../components/Hero";
import TextMedia from "../../../components/page-blocks/TextMedia";
import CardGrid from "../../../components/page-blocks/CardGrid";
import CallToAction from "../../../components/page-blocks/CallToAction";
import Accordion from "../../../components/page-blocks/Accordion";
import type { HeroData } from "../../../components/Hero";

// ─── Types ────────────────────────────────────────────────────────────────────

type Block =
  | HeroData
  | { __component: "sections.text-media"; id: number; [key: string]: unknown }
  | { __component: "sections.card-grid"; id: number; [key: string]: unknown }
  | { __component: "sections.call-to-action"; id: number; [key: string]: unknown }
  | { __component: "sections.accordion"; id: number; [key: string]: unknown };

interface PageData {
  Titre?: string;
  Slug: string;
  Blocks?: Block[];
}

// ─── Static params (optional, for SSG) ───────────────────────────────────────

export async function generateStaticParams() {
  try {
    const res = await fetchStrapi("/api/pages?fields=Slug");
    return (res?.data ?? []).map((p: { Slug: string }) => ({ slug: p.Slug }));
  } catch {
    return [];
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await fetchStrapi(
      `/api/pages?filters[Slug][$eq]=${slug}&fields=Titre`
    );
    const page: PageData | undefined = res?.data?.[0];
    return { title: page?.Titre ?? slug };
  } catch {
    return { title: slug };
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function GenericPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;

  const endpoint =
    `/api/pages?filters[Slug][$eq]=${slug}` +
    `&populate[Blocks][on][sections.hero][populate]=*` +
    `&populate[Blocks][on][sections.text-media][populate]=*` +
    `&populate[Blocks][on][sections.card-grid][populate][Cards][populate]=*` +
    `&populate[Blocks][on][sections.call-to-action][populate][Button]=*` +
    `&populate[Blocks][on][sections.accordion][populate][AccordionElements]=*`;

  let page: PageData | null = null;
  try {
    const res = await fetchStrapi(endpoint);
    page = res?.data?.[0] ?? null;
  } catch (err) {
    console.error("Error fetching page:", err);
  }

  if (!page) notFound();

  const blocks: Block[] = page.Blocks ?? [];

  return (
    <main className="pt-20 divide-y divide-gray-100">
      {page.Titre && (
        <div className="w-full px-6 py-10 bg-white">
          <div className="mx-auto max-w-300">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{page.Titre}</h1>
          </div>
        </div>
      )}
      {blocks.map((block) => {
        switch (block.__component) {
          case "sections.hero":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <Hero key={block.id} data={block as any} />;
          case "sections.text-media":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <TextMedia key={block.id} data={block as any} />;
          case "sections.card-grid":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <CardGrid key={block.id} data={block as any} />;
          case "sections.call-to-action":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <CallToAction key={block.id} data={block as any} />;
          case "sections.accordion":
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return <Accordion key={block.id} data={block as any} />;
          default:
            return null;
        }
      })}
    </main>
  );
}





