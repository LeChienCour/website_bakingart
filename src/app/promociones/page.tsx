import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { getWhatsAppHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Promociones",
  description: "Ofertas especiales y promociones de temporada en BakingArt GDL.",
};

const PROMOS = [
  {
    titulo: "Paquete Cumpleaños",
    desc: "Pastel de 20 porciones + 12 cupcakes coordinados. Diseño unificado.",
    vigencia: "Disponible todo el año",
    tag: "popular" as const,
    emoji: "🎁",
  },
  {
    titulo: "Boda Todo Incluido",
    desc: "Pastel principal + mesa de dulces + cupcakes de corte. Consultar detalles.",
    vigencia: "Reserva con 2 meses de anticipación",
    tag: "new" as const,
    emoji: "💍",
  },
  {
    titulo: "Curso + Pastel",
    desc: "Inscríbete a cualquier curso y recibe 15% de descuento en tu primer encargo.",
    vigencia: "Vigente 30 días después del curso",
    tag: "temporada" as const,
    emoji: "👩‍🍳",
  },
];

export default function PromocionesPage() {
  const waHref = getWhatsAppHref("Hola! Vi las promociones en su página. ¿Me pueden dar más información?");

  return (
    <>
      <section className="bg-gradient-to-br from-rosa/20 via-turquesa/10 to-crema py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heading as="h1" size="display"><span className="text-rosa">Promociones</span></Heading>
          <Text variant="body" muted className="mt-4 max-w-xl mx-auto">
            Paquetes especiales para que tu celebración sea perfecta sin complicaciones.
          </Text>
        </div>
      </section>

      <SectionWrapper background="white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROMOS.map((p) => (
            <div key={p.titulo} className="rounded-2xl border border-gris-light p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col">
              <div className="text-5xl mb-4">{p.emoji}</div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading font-bold text-gris-text text-xl">{p.titulo}</h3>
                <Badge variant={p.tag} className="ml-2 shrink-0">{p.tag}</Badge>
              </div>
              <Text variant="small" muted className="flex-1 mb-4">{p.desc}</Text>
              <p className="text-xs text-gris-secondary mb-5">📅 {p.vigencia}</p>
              <Button asChild variant="brand-primary" size="brand-sm" className="w-full">
                <a href={waHref} target="_blank" rel="noopener noreferrer">Preguntar por esta promo</a>
              </Button>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <section className="bg-gris-text py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading font-bold text-h2 text-crema mb-3">¿Buscas algo diferente?</h2>
          <Text variant="body" className="text-crema/70 mb-6">Armamos paquetes personalizados según tu presupuesto y necesidades.</Text>
          <Button asChild variant="brand-primary" size="brand-lg">
            <a href={waHref} target="_blank" rel="noopener noreferrer">Platícanos tu idea</a>
          </Button>
        </div>
      </section>
    </>
  );
}
