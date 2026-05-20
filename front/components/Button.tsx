import Link from "next/link";

interface ButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "outline";
  isExternal?: boolean;
}

export default function Button({
  href,
  label,
  variant = "primary",
  isExternal = false,
}: ButtonProps) {
  const baseStyle = "px-8 py-3 rounded-full font-bold transition-all duration-300 text-sm tracking-wide shadow-sm flex items-center justify-center";
  const variants = {
    // Dégradé linéaire : Bleu Marine -> Bleu Ciel
    primary: "bg-gradient-to-r from-[#2E3192] via-[#5271C2] to-[#75AADB] text-white shadow-md hover:brightness-110 active:scale-95",

    // L'outline pour le "Petit Guide IA"
    outline: "border-3 border-black bg-black/10 backdrop-blur-md text-black hover:bg-black/20",

    // Nouveau Secondary : Bleu foncé "Deep Night" gradient
    secondary: "bg-gradient-to-r from-[#1A1C4C] via-[#242766] to-[#2E3192] text-white hover:brightness-110 hover:shadow-lg active:scale-95",
  };

  if (isExternal){
    return (
      <a
        href={href}
        className={`${baseStyle} ${variants[variant]}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {label}
    </Link>
  )
}