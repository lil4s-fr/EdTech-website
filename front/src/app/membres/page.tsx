import { fetchStrapi } from "../../../lib/strapi";
import MembresPageClient, {
  Organisation,
  DirectoryBlock,
} from "../../../components/MembresPageClient";

export default async function MembresPage() {
  // Fetch the page header block and all organisations in parallel
  const [headerRes, orgsRes] = await Promise.allSettled([
    fetchStrapi("/api/organisations-page?populate=*"),
    fetchStrapi("/api/organisations?populate=*&pagination[limit]=200&sort=Name:asc"),
  ]);

  const header: DirectoryBlock =
    headerRes.status === "fulfilled"
      ? (headerRes.value?.data as DirectoryBlock)
      : { Title: "Nos Membres et Nos partenaires.", Description: "" };

  const organisations: Organisation[] =
    orgsRes.status === "fulfilled"
      ? ((orgsRes.value?.data as Organisation[]) ?? [])
      : [];

  return <MembresPageClient header={header} organisations={organisations} />;
}
