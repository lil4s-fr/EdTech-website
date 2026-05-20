import Button from "./Button";

// ─── Strapi Data Interfaces ───────────────────────────────────────────────────

interface MembershipPlan {
  id: number;
  Title: string;
  Subtitle?: string | null;
  Price: string;
  ButtonLabel: string;
  ButtonLink: string;
}

export interface MembershipsData {
  __component: "sections.memberships";
  id: number;
  MainTitle: string;
  SubTitle?: string | null;
  Plans: MembershipPlan[];
}

// ─── Component ────────────────────────────────────────────────────────────────

interface MembershipsProps {
  data: MembershipsData;
}

export default function Memberships({ data }: Readonly<MembershipsProps>) {
  const { MainTitle, SubTitle, Plans } = data;

  if (!Plans?.length) return null;

  return (
    <section className="w-full bg-white py-16 px-6">
      {/* ── Wrapper — secondary button colour palette ─────────────────────── */}
      <div className="mx-auto max-w-300 rounded-3xl px-8 py-14 md:px-14 bg-linear-to-r from-[#1A1C4C] via-[#242766] to-[#2E3192]">
        {/* ── Header text ───────────────────────────────────────────────── */}
        <div className="text-center mb-12">
          {MainTitle && (
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
              {MainTitle}
            </h2>
          )}
          {SubTitle && (
            <p className="text-base md:text-lg text-white/75 font-normal">
              {SubTitle}
            </p>
          )}
        </div>

        {/* ── Plans grid ────────────────────────────────────────────────── */}
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 list-none p-0 m-0">
          {Plans.map((plan) => (
            <li key={plan.id} className="flex">
              <div className="flex flex-col w-full bg-white rounded-xl shadow-lg p-6">
                {/* Title block — fixed min-height so the divider is always at the same position */}
                <div className="min-h-12">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-900 leading-snug">
                    {plan.Title}
                  </p>
                  {plan.Subtitle && (
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">
                      {plan.Subtitle}
                    </p>
                  )}
                </div>

                {/* Divider */}
                <hr className="border-t border-gray-200 my-4" />

                {/* Price */}
                <p className="text-5xl font-bold text-gray-900 leading-none mb-6">
                  {plan.Price}
                </p>

                {/* CTA — pushed to the bottom with mt-auto */}
                <div className="mt-auto">
                  <Button
                    href={plan.ButtonLink}
                    label={plan.ButtonLabel}
                    variant="primary"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

