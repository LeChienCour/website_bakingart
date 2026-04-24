import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { getWhatsAppHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Cursos de Repostería",
  description: "Aprende repostería artesanal con Karenina en Guadalajara. Cursos presenciales, grupos pequeños.",
};

const CURSOS = [
  {
    nombre: "Decoración con Fondant",
    nivel: "Principiante",
    duracion: "6 horas",
    desc: "Aprende a cubrir y decorar pasteles con fondant desde cero. Técnicas de modelado y figuras básicas.",
    emoji: "🎨",
    precio: "Consultar",
  },
  {
    nombre: "Buttercream Profesional",
    nivel: "Intermedio",
    duracion: "8 horas",
    desc: "Flores, texturas, degradados y acabados de alta pastelería con buttercream suizo e italiano.",
    emoji: "🌸",
    precio: "Consultar",
  },
  {
    nombre: "Pasteles de Boda",
    nivel: "Avanzado",
    duracion: "12 horas",
    desc: "Pisos, estructura interna, transporte y presentación. El curso completo para pasteles nupciales.",
    emoji: "💍",
    precio: "Consultar",
  },
  {
    nombre: "Repostería Básica",
    nivel: "Principiante",
    duracion: "4 horas",
    desc: "Bizcochos, rellenos, almíbares y ensamble. La base perfecta para empezar en la repostería.",
    emoji: "🍰",
    precio: "Consultar",
  },
];

const nivelColor: Record<string, string> = {
  Principiante: "bg-turquesa/20 text-gris-text border border-turquesa/40",
  Intermedio:   "bg-rosa/20 text-gris-text border border-rosa/40",
  Avanzado:     "bg-amber-100 text-amber-800 border border-amber-200",
};

export default function CursosPage() {
  const waHref = getWhatsAppHref("Hola! Me gustaría información sobre los cursos de repostería disponibles.");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-turquesa/20 via-crema to-crema py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heading as="h1" size="display">Cursos de <span className="text-turquesa">Repostería</span></Heading>
          <Text variant="body" muted className="mt-4 max-w-xl mx-auto">
            Aprende con Karenina en grupos pequeños, con atención personalizada y técnicas profesionales.
          </Text>
          <div className="mt-8">
            <Button asChild variant="brand-secondary" size="brand-lg">
              <a href={waHref} target="_blank" rel="noopener noreferrer">Ver disponibilidad</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Grid cursos */}
      <SectionWrapper background="white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CURSOS.map((c) => (
            <div key={c.nombre} className="rounded-2xl border border-gris-light overflow-hidden hover:shadow-lg transition-shadow duration-200 group flex flex-col">
              <div className="h-36 bg-gradient-to-br from-turquesa/20 to-rosa/10 flex items-center justify-center">
                <span className="text-5xl">{c.emoji}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <h3 className="font-heading font-bold text-gris-text text-xl group-hover:text-turquesa transition-colors">{c.nombre}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${nivelColor[c.nivel]}`}>{c.nivel}</span>
                </div>
                <Text variant="small" muted className="mb-4 flex-1">{c.desc}</Text>
                <div className="flex items-center justify-between text-small text-gris-secondary mb-4">
                  <span>⏱ {c.duracion}</span>
                  <span className="font-semibold text-gris-text">{c.precio}</span>
                </div>
                <Button asChild variant="brand-secondary" size="brand-sm" className="w-full">
                  <a href={waHref} target="_blank" rel="noopener noreferrer">Preguntar disponibilidad</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Info adicional */}
      <SectionWrapper background="crema">
        <div className="max-w-2xl mx-auto text-center">
          <Heading as="h2" size="h2" className="mb-4">¿Cómo funciona?</Heading>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-center">
            {[
              { icon: "💬", title: "Pregunta", desc: "Escríbenos y te decimos las fechas disponibles" },
              { icon: "📅", title: "Aparta", desc: "Reserva tu lugar con un anticipo" },
              { icon: "👩‍🍳", title: "Aprende", desc: "Asiste, practica y llévate tu creación" },
            ].map((item) => (
              <div key={item.title}>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-heading font-bold text-gris-text mb-1">{item.title}</h3>
                <Text variant="small" muted>{item.desc}</Text>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="brand-primary" size="brand-lg">
              <a href={waHref} target="_blank" rel="noopener noreferrer">Reservar mi lugar</a>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
