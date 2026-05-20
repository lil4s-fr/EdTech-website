import { fetchStrapi } from "../lib/strapi";
import FooterNewsletter from "./FooterNewsletter";

// ─── Strapi Data Interfaces ───────────────────────────────────────────────────

type SocialPlatform = "X" | "LinkedIn" | "Facebook";

interface SocialItem {
  id: number;
  Platform: SocialPlatform;
  Link: string;
}

interface FooterData {
  NewsletterTitle: string;
  NewsletterPlaceholder: string;
  NewsletterButtonText: string;
  ContactEmail: string;
  ContactPhone: string;
  Socials: SocialItem[];
}

// ─── Inline social SVGs ───────────────────────────────────────────────────────

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const socialIcons: Record<SocialPlatform, React.ReactNode> = {
  X: <XIcon />,
  LinkedIn: <LinkedInIcon />,
  Facebook: <FacebookIcon />,
};

const socialLabels: Record<SocialPlatform, string> = {
  X: "X (Twitter)",
  LinkedIn: "LinkedIn",
  Facebook: "Facebook",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default async function Footer() {
  const endpoint = "/api/footer?populate[Socials]=*";

  let data: FooterData | null = null;
  try {
    const response = await fetchStrapi(endpoint);
    data = response?.data as FooterData;
  } catch (error) {
    console.error("Error fetching footer data:", error);
  }

  if (!data) return null;

  const {
    NewsletterTitle,
    NewsletterPlaceholder,
    NewsletterButtonText,
    ContactEmail,
    ContactPhone,
    Socials,
  } = data;

  return (
    <footer className="w-full bg-white pt-6 pb-10 px-6">
      <div className="mx-auto max-w-300 flex flex-col gap-8">

        {/* ── Newsletter card ──────────────────────────────────────────────── */}
        <FooterNewsletter
          title={NewsletterTitle}
          placeholder={NewsletterPlaceholder}
          buttonText={NewsletterButtonText}
        />

        {/* ── Socials + contact ────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-5">

          {/* Social icons row */}
          {Socials?.length > 0 && (
            <ul className="flex items-center gap-4 list-none p-0 m-0">
              {Socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLabels[social.Platform]}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#EBEBEB] text-[#2E3192] hover:bg-[#2E3192] hover:text-white transition-all duration-300"
                  >
                    {socialIcons[social.Platform]}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Contact line */}
          <p className="text-sm text-gray-500 text-center">
            <a
              href={`mailto:${ContactEmail}`}
              className="text-[#2E3192] underline underline-offset-2 hover:text-[#5271C2] transition-colors duration-200 font-medium"
            >
              {ContactEmail}
            </a>
            {ContactPhone && (
              <span> &mdash; {ContactPhone}</span>
            )}
          </p>

        </div>
      </div>
    </footer>
  );
}