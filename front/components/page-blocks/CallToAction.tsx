import Link from "next/link";

interface CTAProps {
  data: {
    __component: "sections.call-to-action";
    id: number;
    Title?: string;
    Alignment?: "left" | "right" | "center";
    BackgroundColor?: "primary" | "secondary" | "none";
    Button?: {
      Label?: string;
      URL?: string;
      Type?: "primary" | "secondary" | "outline" | "white";
      IsExternal?: boolean;
    };
  };
}

const bgStyle: Record<string, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #2E3192 0%, #5271C2 50%, #75AADB 100%)",
  },
  secondary: {
    background: "linear-gradient(135deg, #1A1C4C 0%, #242766 50%, #2E3192 100%)",
  },
  none: {},
};

const textColor: Record<string, string> = {
  primary: "text-white",
  secondary: "text-white",
  none: "text-gray-900",
};

const alignMap: Record<string, string> = {
  left: "text-left items-start",
  right: "text-right items-end",
  center: "text-center items-center",
};

const btnVariants: Record<string, string> = {
  primary: "text-white hover:brightness-110",
  secondary: "text-white hover:brightness-110",
  outline: "ring-2 ring-inset ring-current bg-transparent hover:bg-white/10",
  white: "bg-white text-[#2E3192] hover:bg-white/90",
};

const btnBgStyle: Record<string, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #2E3192, #75AADB)",
  },
  secondary: {
    background: "linear-gradient(135deg, #1A1C4C, #2E3192)",
  },
  outline: {},
  white: {},
};

export default function CallToAction({ data }: Readonly<CTAProps>) {
  const { Title, Alignment = "center", BackgroundColor = "none", Button: btn } = data;
  const align = alignMap[Alignment] ?? alignMap.center;
  const color = textColor[BackgroundColor] ?? textColor.none;

  const btnType = btn?.Type ?? "primary";
  const btnClass = `inline-flex px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 shadow ${btnVariants[btnType]}`;

  return (
    <section
      className={`w-full px-6 py-14 ${color}`}
      style={bgStyle[BackgroundColor] ?? bgStyle.none}
    >
      <div className={`mx-auto max-w-300 flex flex-col gap-6 ${align}`}>
        {Title && (
          <h2 className="text-2xl md:text-3xl font-bold max-w-3xl">{Title}</h2>
        )}
        {btn?.Label && btn?.URL && (
          btn.IsExternal ? (
            <a
              href={btn.URL}
              target="_blank"
              rel="noopener noreferrer"
              className={btnClass}
              style={btnBgStyle[btnType]}
            >
              {btn.Label}
            </a>
          ) : (
            <Link
              href={btn.URL}
              className={btnClass}
              style={btnBgStyle[btnType]}
            >
              {btn.Label}
            </Link>
          )
        )}
      </div>
    </section>
  );
}
