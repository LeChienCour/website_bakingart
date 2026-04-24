"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/nav-links";

export function NavDesktop() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "px-3 py-2 text-small font-medium rounded-md transition-colors",
              isActive
                ? "text-rosa font-semibold border-b-2 border-rosa rounded-none"
                : "text-gris-text hover:text-rosa hover:bg-rosa/10"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
