import { fetchStrapi } from "../../../lib/strapi";
import ActionsBlock, { ActionsData } from "../../../components/ActionsBlock";
import ValuesBlock, { ValuesData } from "../../../components/ValuesBlock";

// ─── Strapi Page Data Interface ───────────────────────────────────────────────

interface ActivitesPageData {
  Actions: ActionsData;
  Valeurs: ValuesData;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ActivitesPage() {
  const endpoint =
    "/api/activites" +
    "?populate[Actions][populate][Cards]=*" +
    "&populate[Valeurs][populate][Cards]=*";

  let data: ActivitesPageData | null = null;
  try {
    const response = await fetchStrapi(endpoint);
    data = response?.data as ActivitesPageData;
  } catch (error) {
    console.error("Error fetching activites page data:", error);
  }

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-400">
        Contenu indisponible.
      </main>
    );
  }

  return (
    <main className="pt-20">
      {data.Actions && <ActionsBlock data={data.Actions} />}
      {data.Valeurs && <ValuesBlock data={data.Valeurs} />}
    </main>
  );
}

