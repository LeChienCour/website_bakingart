import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AnimateIn } from "@/components/ui/animate-in";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { getWhatsAppHref } from "@/lib/whatsapp";

const CATEGORIAS = [
  {
    title: "Pasteles Personalizados",
    description: "Diseñamos el tuyo con los sabores, colores y detalles que imaginas.",
    emoji: "🎂",
    href: "/pasteles",
    bg: "from-rosa/30 to-rosa/10",
  },
  {
    title: "Pasteles por Ocasión",
    description: "Bodas, XV años, baby showers, cumpleaños. Tamaño y estilo perfecto.",
    emoji: "💍",
    href: "/pasteles",
    bg: "from-turquesa/30 to-turquesa/10",
  },
  {
    title: "Cupcakes y Petit Fours",
    description: "Porciones individuales para regalos, mesas de dulces y eventos.",
    emoji: "🧁",
    href: "/pasteles",
    bg: "from-rosa/20 to-crema",
  },
  {
    title: "Cursos de Repostería",
    description: "Aprende con Karenina. Grupos pequeños, atención personalizada.",
    emoji: "👩‍🍳",
    href: "/cursos",
    bg: "from-turquesa/20 to-crema",
  },
];

const PROCESO = [
  { step: "01", title: "Cotiza",      desc: "Escríbenos por WhatsApp con tu idea." },
  { step: "02", title: "Diseñamos",   desc: "Creamos una propuesta personalizada." },
  { step: "03", title: "Confirmamos", desc: "Aprobas el diseño y apartamos tu fecha." },
  { step: "04", title: "Entregamos",  desc: "Tu pastel listo, fresco y perfecto." },
];

export default function HomePage() {
  const waHref = getWhatsAppHref(
    "Hola! Me gustaría cotizar un pastel personalizado. ¿Pueden ayudarme?"
  );

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-crema overflow-hidden">
        {/* Blobs decorativos */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="animate-pulse-soft absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-rosa/20 blur-3xl" />
          <div className="animate-pulse-soft absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-turquesa/15 blur-3xl" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            <div className="animate-hero-title">
              <span className="inline-block bg-rosa/20 text-gris-text text-small font-semibold px-3 py-1 rounded-full mb-6 border border-rosa/40">
                Repostería artesanal · Guadalajara, MX
              </span>
            </div>

            <h1 className="animate-hero-title font-heading font-bold text-display leading-tight text-gris-text mb-6">
              Un pastel,{" "}
              <span className="text-rosa">una historia</span>{" "}
              única
            </h1>

            <p className="animate-hero-sub text-body text-gris-secondary mb-8 max-w-xl leading-relaxed">
              Pasteles personalizados y cursos de repostería hechos con amor en
              Guadalajara. Cada pieza es irrepetible, como la ocasión que celebras.
            </p>

            <div className="animate-hero-cta flex flex-wrap gap-4">
              <Button asChild variant="brand-primary" size="brand-lg">
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  Cotizar por WhatsApp
                </a>
              </Button>
              <Button asChild variant="brand-outline" size="brand-lg">
                <Link href="/pasteles">Ver catálogo</Link>
              </Button>
            </div>

            <p className="animate-hero-note mt-6 text-small text-gris-secondary">
              Sin carrito · Sin pagos en línea · Atención directa con Karenina
            </p>
          </div>

          {/* Emoji flotante decorativo */}
          <div className="animate-float absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center w-80 h-80 rounded-full bg-gradient-to-br from-rosa/20 via-crema to-turquesa/20 shadow-xl">
            <span className="text-[8rem]">🎂</span>
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS ──────────────────────────────────────── */}
      <SectionWrapper background="white">
        <AnimateIn variant="fade-up">
          <div className="text-center mb-12">
            <Heading as="h2" size="h1">¿Qué estás buscando?</Heading>
            <Text variant="body" muted className="mt-3 max-w-xl mx-auto">
              Desde pasteles de boda hasta cupcakes individuales — todo hecho a mano.
            </Text>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIAS.map((cat, i) => (
            <AnimateIn key={cat.title} variant="fade-up" delay={i * 100}>
              <Link
                href={cat.href}
                className="group rounded-2xl overflow-hidden border border-gris-light hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block h-full"
              >
                <div className={`h-40 bg-gradient-to-br ${cat.bg} flex items-center justify-center`}>
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
                </div>
                <div className="p-5 bg-white">
                  <h3 className="font-heading font-bold text-gris-text text-lg mb-2 group-hover:text-rosa transition-colors">
                    {cat.title}
                  </h3>
                  <Text variant="small" muted>{cat.description}</Text>
                  <span className="inline-block mt-3 text-small font-semibold text-turquesa group-hover:underline">
                    Ver más →
                  </span>
                </div>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </SectionWrapper>

      {/* ── SOBRE NOSOTROS ──────────────────────────────────── */}
      <SectionWrapper background="crema">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimateIn variant="fade-right">
            <div>
              <span className="text-rosa font-semibold text-small uppercase tracking-widest">
                Nuestra historia
              </span>
              <Heading as="h2" size="h1" className="mt-2 mb-4">
                Hecha con amor<br />
                <span className="text-rosa">en Guadalajara</span>
              </Heading>
              <Text variant="body" muted className="mb-4">
                Soy Karenina, repostera apasionada con más de 10 años creando momentos
                dulces para familias tapatías. Cada pastel que sale de mi cocina lleva
                ingredientes frescos, técnicas artesanales y mucha atención al detalle.
              </Text>
              <Text variant="body" muted className="mb-6">
                Más que un pastel, entrego una experiencia: desde la primera consulta
                por WhatsApp hasta el momento en que tu familia da el primer mordisco.
              </Text>
              <Button asChild variant="brand-secondary" size="brand-md">
                <Link href="/nosotros">Conoce más</Link>
              </Button>
            </div>
          </AnimateIn>

          <AnimateIn variant="fade-left">
            <div className="relative flex justify-center">
              <div className="animate-float aspect-square w-72 rounded-3xl bg-gradient-to-br from-rosa/30 via-crema to-turquesa/20 flex items-center justify-center shadow-lg">
                <span className="text-8xl">🎂</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-5 py-3 border border-rosa/20">
                <p className="font-heading font-bold text-gris-text text-lg">+500</p>
                <p className="text-small text-gris-secondary">pasteles entregados</p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </SectionWrapper>

      {/* ── PROCESO ─────────────────────────────────────────── */}
      <SectionWrapper background="white">
        <AnimateIn variant="fade-up">
          <div className="text-center mb-12">
            <Heading as="h2" size="h1">¿Cómo funciona?</Heading>
            <Text variant="body" muted className="mt-3 max-w-lg mx-auto">
              Sin complicaciones. Solo escríbenos y nosotros hacemos el resto.
            </Text>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESO.map((item, i) => (
            <AnimateIn key={item.step} variant="scale-up" delay={i * 120}>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-rosa/20 border-2 border-rosa/40 flex items-center justify-center mx-auto mb-4 hover:bg-rosa/40 transition-colors duration-200">
                  <span className="font-heading font-bold text-rosa text-lg">{item.step}</span>
                </div>
                <h3 className="font-heading font-bold text-gris-text text-lg mb-2">{item.title}</h3>
                <Text variant="small" muted>{item.desc}</Text>
              </div>
            </AnimateIn>
          ))}
        </div>
      </SectionWrapper>

      {/* ── CURSOS TEASER ───────────────────────────────────── */}
      <SectionWrapper background="crema">
        <AnimateIn variant="fade-up">
          <div className="rounded-3xl bg-gradient-to-r from-turquesa/20 to-rosa/20 border border-turquesa/30 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-turquesa font-semibold text-small uppercase tracking-widest">
                  Aprende con Karenina
                </span>
                <Heading as="h2" size="h1" className="mt-2 mb-4">
                  Cursos de repostería
                </Heading>
                <Text variant="body" muted className="mb-6">
                  Desde decoración con fondant hasta buttercream profesional.
                  Grupos pequeños, ambiente cálido, resultados profesionales.
                </Text>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="brand-secondary" size="brand-lg">
                    <Link href="/cursos">Ver cursos disponibles</Link>
                  </Button>
                  <Button asChild variant="brand-ghost" size="brand-lg">
                    <a href={waHref} target="_blank" rel="noopener noreferrer">
                      Preguntar por WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="animate-float w-48 h-48 rounded-full bg-white/60 flex items-center justify-center shadow-md">
                  <span className="text-7xl">👩‍🍳</span>
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </SectionWrapper>

      {/* ── CTA FINAL ───────────────────────────────────────── */}
      <section className="bg-gris-text py-20">
        <AnimateIn variant="fade-up">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="font-heading font-bold text-h1 text-crema mb-4">
              ¿Lista para ordenar tu pastel?
            </h2>
            <p className="text-crema/70 text-body mb-8 max-w-xl mx-auto">
              Escríbenos por WhatsApp y con gusto te asesoramos. Respondemos en minutos.
            </p>
            <Button asChild variant="brand-primary" size="brand-lg">
              <a href={waHref} target="_blank" rel="noopener noreferrer">
                Cotizar ahora por WhatsApp
              </a>
            </Button>
            <p className="mt-4 text-crema/40 text-small">
              También en Instagram{" "}
              <a
                href="https://instagram.com/bakingartgdl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rosa hover:underline"
              >
                @bakingartgdl
              </a>
            </p>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
