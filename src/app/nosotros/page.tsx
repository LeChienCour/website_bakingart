import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { getWhatsAppHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce la historia de BakingArt GDL y a Karenina, la repostera artesanal detrás de cada pastel.",
};

const VALORES = [
  { emoji: "🌿", title: "Ingredientes frescos", desc: "Solo usamos ingredientes de la más alta calidad, sin conservadores ni artificiales." },
  { emoji: "🎨", title: "Arte personalizado", desc: "Cada pastel es diseñado desde cero para tu ocasión específica." },
  { emoji: "❤️", title: "Hecho con amor", desc: "Más de 10 años de pasión por la repostería en cada pieza." },
  { emoji: "🤝", title: "Atención directa", desc: "Hablas directamente con Karenina — sin intermediarios, sin bots." },
];

export default function NosotrosPage() {
  const waHref = getWhatsAppHref("Hola! Me gustaría conocer más sobre BakingArt GDL.");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-rosa/20 via-crema to-turquesa/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-rosa font-semibold text-small uppercase tracking-widest">Nuestra historia</span>
              <Heading as="h1" size="display" className="mt-2 mb-6">
                Detrás de cada<br /><span className="text-rosa">pastel, Karenina</span>
              </Heading>
              <Text variant="body" muted className="mb-4">
                Soy Karenina, repostera apasionada con más de 10 años creando momentos
                dulces para familias tapatías. Lo que empezó como un hobby en mi cocina
                se convirtió en BakingArt GDL.
              </Text>
              <Text variant="body" muted className="mb-6">
                Cada pastel que creo lleva ingredientes frescos, técnicas artesanales
                aprendidas en cursos nacionales e internacionales, y sobre todo,
                mucha atención al detalle para que tu celebración sea perfecta.
              </Text>
              <div className="flex gap-3 flex-wrap">
                <Button asChild variant="brand-primary" size="brand-lg">
                  <a href={waHref} target="_blank" rel="noopener noreferrer">Escríbeme</a>
                </Button>
                <Button asChild variant="brand-outline" size="brand-lg">
                  <Link href="/pasteles">Ver mi trabajo</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 rounded-full bg-gradient-to-br from-rosa/40 via-crema to-turquesa/20 flex items-center justify-center shadow-xl">
                  <span className="text-8xl">👩‍🍳</span>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-lg px-5 py-3 border border-rosa/20">
                  <p className="font-heading font-bold text-gris-text text-lg">+10 años</p>
                  <p className="text-small text-gris-secondary">de experiencia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <SectionWrapper background="white">
        <div className="text-center mb-12">
          <Heading as="h2" size="h1">Lo que nos define</Heading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALORES.map((v) => (
            <div key={v.title} className="text-center p-6 rounded-2xl border border-gris-light hover:border-rosa/40 hover:shadow-md transition-all duration-200">
              <div className="text-4xl mb-4">{v.emoji}</div>
              <h3 className="font-heading font-bold text-gris-text text-lg mb-2">{v.title}</h3>
              <Text variant="small" muted>{v.desc}</Text>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Stats */}
      <SectionWrapper background="crema">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { num: "+500", label: "Pasteles entregados" },
            { num: "+200", label: "Clientes felices" },
            { num: "10+", label: "Años de experiencia" },
            { num: "100%", label: "Hecho a mano" },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-heading font-bold text-display text-rosa">{s.num}</p>
              <Text variant="small" muted className="mt-1">{s.label}</Text>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="bg-gris-text py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-heading font-bold text-h2 text-crema mb-3">¿Hablamos?</h2>
          <Text variant="body" className="text-crema/70 mb-6">
            Cuéntame de tu ocasión especial. Con gusto te ayudo a crear algo único.
          </Text>
          <Button asChild variant="brand-primary" size="brand-lg">
            <a href={waHref} target="_blank" rel="noopener noreferrer">Escribir a Karenina</a>
          </Button>
        </div>
      </section>
    </>
  );
}
