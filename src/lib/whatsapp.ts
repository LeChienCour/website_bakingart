export function getWhatsAppHref(message?: string): string {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  if (!number) return "#";
  const encoded = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${encoded}`;
}

export function buildWhatsAppLink({
  numero,
  template,
  contexto,
}: {
  numero: string;
  template: "pastel" | "curso" | "general";
  contexto?: { nombre?: string; variante?: string };
}): string {
  const mensaje = getTemplate(template, contexto);
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

function getTemplate(
  template: "pastel" | "curso" | "general",
  ctx?: { nombre?: string; variante?: string }
): string {
  switch (template) {
    case "pastel":
      return ctx?.nombre
        ? `Hola! Me interesa cotizar el pastel "${ctx.nombre}"${ctx.variante ? ` (${ctx.variante})` : ""}. ¿Podrían darme más información?`
        : "Hola! Me gustaría cotizar un pastel personalizado. ¿Pueden ayudarme?";
    case "curso":
      return ctx?.nombre
        ? `Hola! Estoy interesada/o en el curso "${ctx.nombre}". ¿Hay lugares disponibles?`
        : "Hola! Me gustaría información sobre los cursos de repostería disponibles.";
    default:
      return "Hola! Vi su página y me gustaría más información sobre sus productos.";
  }
}
