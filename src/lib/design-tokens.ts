export const colors = {
  rosa:          "#F4B6C2",
  rosaDark:      "#E8929F",
  turquesa:      "#4DD0E1",
  turquesaDark:  "#26C6DA",
  crema:         "#FFF8F0",
  cremaDark:     "#F5EDE0",
  grisText:      "#2D2D2D",
  grisSecondary: "#6B7280",
  grisLight:     "#E5E7EB",
} as const;

export const fontSizes = {
  display: "3rem",
  h1:      "2.25rem",
  h2:      "1.75rem",
  body:    "1rem",
  small:   "0.875rem",
} as const;

export const fontFamilies = {
  heading: "var(--font-playfair)",
  body:    "var(--font-inter)",
} as const;

export type ColorToken    = keyof typeof colors;
export type FontSizeToken = keyof typeof fontSizes;

export const colorClasses = {
  rosa:          { bg: "bg-rosa",           text: "text-rosa",           border: "border-rosa" },
  rosaDark:      { bg: "bg-rosa-dark",      text: "text-rosa-dark",      border: "border-rosa-dark" },
  turquesa:      { bg: "bg-turquesa",       text: "text-turquesa",       border: "border-turquesa" },
  turquesaDark:  { bg: "bg-turquesa-dark",  text: "text-turquesa-dark",  border: "border-turquesa-dark" },
  crema:         { bg: "bg-crema",          text: "text-crema",          border: "border-crema" },
  cremaDark:     { bg: "bg-crema-dark",     text: "text-crema-dark",     border: "border-crema-dark" },
  grisText:      { bg: "bg-gris-text",      text: "text-gris-text",      border: "border-gris-text" },
  grisSecondary: { bg: "bg-gris-secondary", text: "text-gris-secondary", border: "border-gris-secondary" },
  grisLight:     { bg: "bg-gris-light",     text: "text-gris-light",     border: "border-gris-light" },
} as const satisfies Record<ColorToken, { bg: string; text: string; border: string }>;
