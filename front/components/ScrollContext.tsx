"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface ScrollContextValue {
  scrolled: boolean;
}

const ScrollContext = createContext<ScrollContextValue>({ scrolled: false });

export function ScrollProvider({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  const [scrolledByUser, setScrolledByUser] = useState(false);

  useEffect(() => {
    if (!isHomepage) return; // no listener needed on other pages

    const handleScroll = () => setScrolledByUser(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  // On any page other than "/", always behave as if scrolled (white header)
  const scrolled = !isHomepage || scrolledByUser;

  const value = useMemo(() => ({ scrolled }), [scrolled]);

  return (
    <ScrollContext.Provider value={value}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScrolled() {
  return useContext(ScrollContext).scrolled;
}
