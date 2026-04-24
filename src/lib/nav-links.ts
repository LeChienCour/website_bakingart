export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio",      href: "/" },
  { label: "Pasteles",    href: "/pasteles" },
  { label: "Cursos",      href: "/cursos" },
  { label: "Promociones", href: "/promociones" },
  { label: "Nosotros",    href: "/nosotros" },
];
