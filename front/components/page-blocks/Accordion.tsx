"use client";

import { useState } from "react";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import { ChevronDown } from "lucide-react";

interface AccordionElement {
  id: number;
  Title?: string;
  Content?: BlocksContent;
}

interface AccordionProps {
  data: {
    __component: "sections.accordion";
    id: number;
    Title?: string;
    AccordionElements?: AccordionElement[];
  };
}

function AccordionItem({ item }: Readonly<{ item: AccordionElement }>) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full flex justify-between items-center py-5 text-left text-sm font-bold text-gray-900 hover:text-[#2E3192] transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{item.Title}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 text-[#2E3192] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && item.Content && (
        <div className="pb-5 prose prose-sm max-w-none">
          <BlocksRenderer content={item.Content} />
        </div>
      )}
    </li>
  );
}

export default function Accordion({ data }: Readonly<AccordionProps>) {
  const { Title, AccordionElements = [] } = data;

  return (
    <section className="w-full bg-white px-6 py-10">
      <div className="mx-auto max-w-300">
        {Title && (
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-900 mb-10">
            {Title}
          </h2>
        )}
        <ul className="border-t border-gray-200 list-none p-0 m-0">
          {AccordionElements.map((item) => (
            <AccordionItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}

