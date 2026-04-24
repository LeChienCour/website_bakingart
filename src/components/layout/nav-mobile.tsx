"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/nav-links";
import { Button } from "@/components/ui/button";

interface NavMobileProps {
  isOpen: boolean;
  onClose: () => void;
  whatsAppHref: string;
}

export function NavMobile({ isOpen, onClose, whatsAppHref }: NavMobileProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Cerrar al cambiar de ruta
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Cerrar al resize a desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => { if (e.matches) onClose(); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [onClose]);

  // Focus trap + Escape
  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]'
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gris-text/40 z-[55] lg:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={cn(
          "fixed inset-y-0 right-0 w-72 bg-crema z-[60] flex flex-col shadow-xl",
          "transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header del drawer */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-rosa/30">
          <span className="font-heading font-bold text-gris-text text-lg">BakingArt GDL</span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-2 rounded-md text-gris-text hover:bg-rosa/10 transition-colors"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Navegación móvil" className="flex flex-col gap-1 p-4 flex-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-3 rounded-md font-body font-medium transition-colors",
                  isActive
                    ? "bg-rosa/20 text-rosa font-semibold"
                    : "text-gris-text hover:bg-rosa/10 hover:text-rosa"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA WhatsApp */}
        <div className="p-4 border-t border-rosa/30">
          <Button
            asChild
            variant="brand-primary"
            size="brand-lg"
            className="w-full"
          >
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pedir por WhatsApp"
            >
              Pedir por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
