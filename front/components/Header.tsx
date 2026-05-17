import { fetchStrapi } from "../lib/strapi";
import HeaderButton from "./HeaderButton";
import Link from "next/link";
import HeaderWrapper from "./HeaderWrapper";

export default async function Header() {
    const endpoint = "/api/global-header?populate[Navigation][populate]=*&populate[LogoForLightBg][fields]=url,alternativeText&populate[LogoForDarkBg][fields]=url,alternativeText&populate[HeaderActions]=*";

    let response;
    try {
        response = await fetchStrapi(endpoint);
    } catch (error) {
        console.error("Error fetching header data:", error);
        return null;
    }

    const { LogoForLightBg, LogoForDarkBg, Navigation, HeaderActions } = response.data;
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    const logoLightUrl = `${strapiUrl}${LogoForLightBg.url}`;
    const logoDarkUrl = `${strapiUrl}${LogoForDarkBg.url}`;

    return (
        <HeaderWrapper
            logoLightUrl={logoLightUrl}
            logoLightAlt={LogoForLightBg.alternativeText || "Logo"}
            logoDarkUrl={logoDarkUrl}
            logoDarkAlt={LogoForDarkBg.alternativeText || "Logo"}
        >
            {/* FLAT NAVIGATION */}
            <nav className="hidden md:block">
                <ul className="flex items-center gap-8">
                    {Navigation.map((item: any) => (
                        <li key={item.id}>
                            <Link
                                href={item.URL}
                                className="text-[15px] font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200 py-2"
                            >
                                {item.Label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* ACTIONS / BUTTONS */}
            <div className="flex items-center gap-3">
                {HeaderActions.map((action: any) => (
                    <HeaderButton
                        key={action.id}
                        href={action.URL}
                        label={action.Label}
                        variant={
                            action.Type === "outline" ? "outline" :
                                action.Type === "primary" ? "primary" :
                                    "secondary"
                        }
                    />
                ))}
            </div>
        </HeaderWrapper>
    );
}