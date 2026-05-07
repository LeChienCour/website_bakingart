import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { getWhatsAppHref } from "@/lib/whatsapp";
import { getPasteles, type Pastel } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

export const metadata: Metadata = {
  title: "Catálogo de Pasteles",
  description: "Pasteles personalizados artesanales en Guadalajara. Bodas, XV años, cumpleaños y más.",
};

// Fallback data shown when Sanity has no products yet
const FALLBACK_PASTELES = [
  { nombre: "Pastel de Boda", desc: "Elegancia y tradición para tu gran día. Desde 2 pisos.", tag: "popular" as const, emoji: "💍", porciones: "30–100" },
  { nombre: "Pastel de XV Años", desc: "Tu quinceañero merece algo único y espectacular.", tag: "new" as const, emoji: "👑", porciones: "50–150" },
  { nombre: "Pastel de Cumpleaños", desc: "Para todas las edades, con el diseño que imagines.", tag: "popular" as const, emoji: "🎂", porciones: "10–60" },
  { nombre: "Baby Shower", desc: "Dulce bienvenida al nuevo integrante de la familia.", tag: "new" as const, emoji: "🍼", porciones: "20–50" },
  { nombre: "Corporativo", desc: "Pasteles con logotipo para eventos de empresa.", tag: "temporada" as const, emoji: "🏢", porciones: "20–200" },
  { nombre: "Pastel Temático", desc: "Personajes, películas, series — lo que quieras.", tag: "popular" as const, emoji: "🎨", porciones: "10–40" },
];

function PastelCard({ pastel }: { pastel: Pastel }) {
  const waMsg = `Hola! Me gustaría cotizar: ${pastel.nombre}. ¿Pueden ayudarme?`;
  const cardWaHref = getWhatsAppHref(waMsg);

  return (
    <div className="rounded-2xl border border-gris-light overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
      <div className="relative h-48 bg-gradient-to-br from-rosa/20 to-turquesa/10">
        <Image
          src={urlFor(pastel.imagen).width(600).height(400).fit("crop").url()}
          alt={pastel.imagen.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 bg-white">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-bold text-gris-text text-lg group-hover:text-rosa transition-colors">
            {pastel.nombre}
          </h3>
          {pastel.tag && (
            <Badge variant={pastel.tag} className="ml-2 shrink-0">{pastel.tag}</Badge>
          )}
        </div>
        <Text variant="small" muted className="mb-3">{pastel.descripcion}</Text>
        {pastel.porciones && (
          <p className="text-xs text-gris-secondary mb-4">🍽 {pastel.porciones} porciones</p>
        )}
        <Button asChild variant="brand-outline" size="brand-sm" className="w-full">
          <a href={cardWaHref} target="_blank" rel="noopener noreferrer">
            Cotizar este pastel
          </a>
        </Button>
      </div>
    </div>
  );
}

function FallbackCard({
  p,
  waHref,
}: {
  p: (typeof FALLBACK_PASTELES)[number];
  waHref: string;
}) {
  return (
    <div className="rounded-2xl border border-gris-light overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
      <div className="h-48 bg-gradient-to-br from-rosa/20 to-turquesa/10 flex items-center justify-center">
        <span className="text-6xl">{p.emoji}</span>
      </div>
      <div className="p-5 bg-white">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-heading font-bold text-gris-text text-lg group-hover:text-rosa transition-colors">
            {p.nombre}
          </h3>
          <Badge variant={p.tag} className="ml-2 shrink-0">{p.tag}</Badge>
        </div>
        <Text variant="small" muted className="mb-3">{p.desc}</Text>
        <p className="text-xs text-gris-secondary mb-4">🍽 {p.porciones} porciones</p>
        <Button asChild variant="brand-outline" size="brand-sm" className="w-full">
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            Cotizar este pastel
          </a>
        </Button>
      </div>
    </div>
  );
}

export default async function PastelesPage() {
  const waHref = getWhatsAppHref("Hola! Me gustaría cotizar un pastel. ¿Pueden ayudarme?");
  const pasteles = await getPasteles();
  const hasSanityData = pasteles.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-rosa/20 via-crema to-crema py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heading as="h1" size="display">
            Catálogo de <span className="text-rosa">Pasteles</span>
          </Heading>
          <Text variant="body" muted className="mt-4 max-w-xl mx-auto">
            Cada pastel es una obra única. Cuéntanos tu idea y la hacemos realidad.
          </Text>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Button asChild variant="brand-primary" size="brand-lg">
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                Cotizar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <SectionWrapper background="white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hasSanityData
            ? pasteles.map((p) => (
                <PastelCard key={p._id} pastel={p} />
              ))
            : FALLBACK_PASTELES.map((p) => (
                <FallbackCard key={p.nombre} p={p} waHref={waHref} />
              ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="bg-gris-text py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading font-bold text-h2 text-crema mb-3">
            ¿No encuentras lo que buscas?
          </h2>
          <Text variant="body" className="text-crema/70 mb-6">
            Hacemos cualquier diseño. Escríbenos y lo platicamos.
          </Text>
          <Button asChild variant="brand-primary" size="brand-lg">
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              Hablar con Karenina
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
