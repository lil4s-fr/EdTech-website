"use client";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";

interface TextMediaProps {
  data: {
    __component: "sections.text-media";
    id: number;
    Text?: BlocksContent;
    Media?: { url: string; alternativeText?: string; mime?: string };
    MediaPosition?: "left" | "right";
    BackgroundColor?: "primary" | "secondary" | "none";
  };
}

const bgMap: Record<string, string> = {
  primary: "text-white",
  secondary: "text-white",
  none: "bg-white text-gray-900",
};

const bgStyle: Record<string, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #2E3192 0%, #5271C2 50%, #75AADB 100%)",
  },
  secondary: {
    background: "linear-gradient(135deg, #1A1C4C 0%, #242766 50%, #2E3192 100%)",
  },
  none: {},
};

export default function TextMedia({ data }: Readonly<TextMediaProps>) {
  const { Text, Media, MediaPosition = "right", BackgroundColor = "none" } = data;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
  const mediaUrl = Media?.url ? `${strapiUrl}${Media.url}` : null;
  const isVideo = Media?.mime?.startsWith("video");
  const isLeft = MediaPosition === "left";
  const isDark = BackgroundColor === "primary" || BackgroundColor === "secondary";

  return (
    <section
      className={`w-full px-6 py-10 ${bgMap[BackgroundColor] ?? bgMap.none}`}
      style={bgStyle[BackgroundColor] ?? bgStyle.none}
    >
      <div className="mx-auto max-w-300">
        <div className={`flex flex-col md:flex-row items-center gap-10 ${isLeft ? "md:flex-row-reverse" : ""}`}>
          {/* Text — fills remaining space */}
          {Text && (
            <div className={`flex-1 min-w-0 prose prose-sm max-w-none ${isDark ? "prose-invert" : ""}`}>
              <BlocksRenderer content={Text} />
            </div>
          )}

          {/* Media — naturally sized, capped at 35% of the row width */}
          {mediaUrl && (
            <div className="shrink-0 w-auto max-w-[35%]">
              {isVideo ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video
                  src={mediaUrl}
                  controls
                  className="rounded-xl shadow max-w-full"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mediaUrl}
                  alt={Media?.alternativeText || ""}
                  className="rounded-xl shadow max-w-full h-auto object-contain"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}



