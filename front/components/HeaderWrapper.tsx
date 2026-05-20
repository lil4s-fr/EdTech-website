"use client";

import Link from "next/link";
import { ScrollProvider, useScrolled } from "./ScrollContext";

interface HeaderWrapperProps {
    children: React.ReactNode;
    logoLightUrl: string;
    logoLightAlt: string;
    logoDarkUrl: string;
    logoDarkAlt: string;
}

// Inner component that can safely call useScrolled() inside the provider
function HeaderInner({ children, logoLightUrl, logoLightAlt, logoDarkUrl, logoDarkAlt }: HeaderWrapperProps) {
    const scrolled = useScrolled();

    return (
        <header
            className={`w-full border-b fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-white border-gray-100 shadow-sm [&_nav_a]:text-gray-600 [&_nav_a]:hover:text-blue-600"
                    : "bg-transparent border-transparent [&_nav_a]:!text-white [&_nav_a]:hover:!text-white/80 [&_nav]:bg-white/10 [&_nav]:backdrop-blur-md [&_nav]:rounded-full [&_nav]:px-10 [&_nav]:py-3 [&_nav_a]:!py-0"
            }`}
        >
            <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                {/* LOGO */}
                <div className="shrink-0">
                    <Link href="/">
                        <img
                            src={scrolled ? logoLightUrl : logoDarkUrl}
                            alt={scrolled ? logoLightAlt : logoDarkAlt}
                            className="h-20 w-auto object-contain hover:opacity-90 transition-opacity"
                        />
                    </Link>
                </div>

                {/* Rest of header content (nav + actions) */}
                {children}
            </div>
        </header>
    );
}

export default function HeaderWrapper(props: HeaderWrapperProps) {
    return (
        <ScrollProvider>
            <HeaderInner {...props} />
        </ScrollProvider>
    );
}