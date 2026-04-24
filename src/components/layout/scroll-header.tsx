"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavDesktop } from "./nav-desktop";
import { NavMobile } from "./nav-mobile";

interface ScrollHeaderProps {
  whatsAppHref: string;
}

export function ScrollHeader({ whatsAppHref }: ScrollHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full bg-crema border-b border-rosa/30 transition-shadow duration-200",
          scrolled && "shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading font-bold text-xl text-gris-text hover:text-rosa transition-colors shrink-0"
            aria-label="BakingArt GDL — Inicio"
          >
            BakingArt GDL
          </Link>

          {/* Nav desktop */}
          <NavDesktop />

          {/* CTA desktop + hamburguesa */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="brand-primary"
              size="brand-md"
              className="hidden lg:inline-flex"
            >
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pedir por WhatsApp"
                {...(whatsAppHref === "#" ? { "aria-disabled": "true" } : {})}
              >
                Pedir por WhatsApp
              </a>
            </Button>

            {/* Hamburguesa — solo mobile */}
            <button
              className="lg:hidden p-2 rounded-md text-gris-text hover:bg-rosa/10 transition-colors"
              aria-label="Abrir menú de navegación"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <NavMobile
        isOpen={mobileOpen}
        onClose={closeMobile}
        whatsAppHref={whatsAppHref}
      />
    </>
  );
}
