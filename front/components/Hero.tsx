import Button from "./Button";

// ─── Strapi Data Interfaces ───────────────────────────────────────────────────

interface StrapiImage {
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

interface CTAButton {
  id: number;
  Label: string;
  URL: string;
  /** Matches the enum values defined in elements/button.json */
  Type: "primary" | "secondary" | "outline" | "white";
  IsExternal: boolean;
}

export interface HeroData {
  __component: "sections.hero";
  id: number;
  Heading: string;
  Description: string;
  BackgroundImage: StrapiImage;
  CTA: CTAButton | null;
  ShowScrollIndicator: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: Readonly<HeroProps>) {
  const { Heading, Description, BackgroundImage, CTA, ShowScrollIndicator } = data;

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const bgImageUrl = BackgroundImage?.url
    ? `${strapiUrl}${BackgroundImage.url}`
    : "";

  return (
    <section
      className="relative w-full h-dvh overflow-hidden"
      style={
        bgImageUrl
          ? {
              backgroundImage: `url('${bgImageUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
      aria-label="Hero section"
    >
      {/* ── Dark gradient overlay ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.18) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Main content block (left-aligned, vertically centred) ─────────── */}
      <div className="relative z-10 flex items-center h-full pl-[9%]">
        <div className="max-w-140 flex flex-col gap-6">
          {/* Heading */}
          {Heading && (
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight">
              {Heading}
            </h1>
          )}

          {/* Description */}
          {Description && (
            <p className="text-base md:text-lg text-white/90 leading-relaxed font-normal">
              {Description}
            </p>
          )}

          {/* CTA Button — uses the shared Button component with the primary variant */}
          {CTA?.Label && (
            <div>
              <Button
                href={CTA.URL}
                label={CTA.Label}
                variant="primary"
                isExternal={CTA.IsExternal}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Scroll indicator (conditional, bottom-centred) ────────────────── */}
      {ShowScrollIndicator && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
          aria-hidden="true"
        >
          <span className="text-white text-[10px] uppercase tracking-[0.25em] font-medium">
            scroll
          </span>

          {/* Bouncing chevron */}
          <div className="animate-bounce mt-1">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 8L11 14L17 8"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
