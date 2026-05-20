"use client";

import { useState, FormEvent } from "react";

interface FooterNewsletterProps {
  title: string;
  placeholder: string;
  buttonText: string;
}

/**
 * Highlights every occurrence of `word` in `text` with an indigo colour span.
 * Case-insensitive, preserves original casing.
 */
function HighlightedTitle({ text }: Readonly<{ text: string }>) {
  const parts = text.split(/(newsletter)/i);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === "newsletter" ? (
          // eslint-disable-next-line react/no-array-index-key
          <span key={`hl-${i}`} style={{ color: "#313968" }}>
            {part}
          </span>
        ) : (
          // eslint-disable-next-line react/no-array-index-key
          <span key={`tx-${i}`}>{part}</span>
        )
      )}
    </>
  );
}

export default function FooterNewsletter({
  title,
  placeholder,
  buttonText,
}: Readonly<FooterNewsletterProps>) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    // Newsletter subscription — API integration pending
    setSubmitted(true);
  };

  return (
    <div className="bg-[#EBEBEB] rounded-3xl px-8 py-10 md:px-14 md:py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

        {/* ── Left: title ─────────────────────────────────────────────────── */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug max-w-xs">
          <HighlightedTitle text={title} />
        </h2>

        {/* ── Right: form ─────────────────────────────────────────────────── */}
        {submitted ? (
          <p className="text-gray-700 font-semibold md:text-lg">
            ✅ Merci, vous êtes inscrit·e !
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-full shadow-sm overflow-hidden pl-6 pr-1.5 py-1.5 w-full md:max-w-sm"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-gray-700 text-sm font-medium placeholder:text-gray-400 placeholder:text-xs placeholder:tracking-widest outline-none min-w-0"
            />
            <button
              type="submit"
              className="shrink-0 px-5 py-2.5 rounded-full text-xs font-bold text-white tracking-widest transition-all duration-300 hover:brightness-110 active:scale-95"
              style={{
                background: "linear-gradient(to right, #1A1C4C, #2E3192, #5271C2)",
              }}
            >
              {buttonText}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}


