import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";
import { getWhatsAppHref } from "@/lib/whatsapp";

const CATEGORIAS = [
  {
    title: "Pasteles Personalizados",
    description:
      "Cada pastel es una historia única. Diseñamos el tuyo con los sabores, colores y detalles que imaginas.",
    emoji: "🎂",
    href: "/pasteles",
    bg: "from-rosa/30 to-rosa/10",
  },
  {
    title: "Pasteles por Ocasión",
    description:
      "Bodas, XV años, baby showers, cumpleaños. Tenemos el tamaño y estilo perfecto para tu celebración.",
    emoji: "💍",
    href: "/pasteles",
    bg: "from-turquesa/30 to-turquesa/10",
  },
  {
    title: "Cupcakes y Petit Fours",
    description:
      "Porciones individuales perfectas para regalos corporativos, mesas de dulces y eventos pequeños.",
    emoji: "🧁",
    href: "/pasteles",
    bg: "from-rosa/20 to-crema",
  },
  {
    title: "Cursos de Repostería",
    description:
      "Aprende las técnicas de decoración y horneado con Karenina. Grupos pequeños, atención personalizada.",
    emoji: "👩‍🍳",
    href: "/cursos",
    bg: "from-turquesa/20 to-crema",
  },
];

const PROCESO = [
  { step: "01", title: "Cotiza", desc: "Escríbenos por WhatsApp con tu idea." },
  { step: "02", title: "Diseñamos", desc: "Creamos una propuesta personalizada para ti." },
  { step: "03", title: "Confirmamos", desc: "Aprobas el diseño y apartamos tu fecha." },
  { step: "04", title: "Entregamos", desc: "Tu pastel listo, fresco y perfecto." },
];

export default function HomePage() {
  const waHref = getWhatsAppHref(
    "Hola! Me gustaría cotizar un pastel personalizado. ¿Pueden ayudarme?"
  );

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center bg-crema overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-rosa/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-turquesa/15 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-rosa/20 text-gris-text text-small font-semibold px-3 py-1 rounded-full mb-6 border border-rosa/40">
              Repostería artesanal · Guadalajara, MX
            </span>

            <h1 className="font-heading font-bold text-display leading-tight text-gris-text mb-6">
              Un pastel,{" "}
              <span className="text-rosa">una historia</span>{" "}
              única
            </h1>

            <Text variant="body" muted className="text-lg mb-8 max-w-xl">
              Pasteles personalizados y cursos de repostería hechos con amor en
              Guadalajara. Cada pieza es irrepetible, como la ocasión que celebras.
            </Text>

            <div className="flex flex-wrap gap-4">
              <Button asChild variant="brand-primary" size="brand-lg">
                <a href={waHref} target="_blank" rel="noopener noreferrer">
                  Cotizar por WhatsApp
                </a>
              </Button>
              <Button asChild variant="brand-outline" size="brand-lg">
                <Link href="/pasteles">Ver catálogo</Link>
              </Button>
            </div>

            <p className="mt-6 text-small text-gris-secondary">
              Sin carrito · Sin pagos en línea · Atención directa con Karenina
            </p>
          </div>
        </div>
      </section>

      {/* ── CATEGORÍAS ──────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="text-center mb-12">
          <Heading as="h2" size="h1">¿Qué estás buscando?</Heading>
          <Text variant="body" muted className="mt-3 max-w-xl mx-auto">
            Desde pasteles de boda hasta cupcakes individuales — todo hecho a mano,
            con ingredientes de calidad y mucho cariño.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIAS.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group rounded-2xl overflow-hidden border border-gris-light hover:shadow-lg transition-shadow duration-200"
            >
              {/* Imagen placeholder con gradiente */}
              <div className={`h-40 bg-gradient-to-br ${cat.bg} flex items-center justify-center`}>
                <span className="text-5xl">{cat.emoji}</span>
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
          ))}
        </div>
      </SectionWrapper>

      {/* ── SOBRE NOSOTROS ──────────────────────────────────── */}
      <SectionWrapper background="crema">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto */}
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

          {/* Imagen placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-rosa/30 via-crema to-turquesa/20 flex items-center justify-center shadow-lg">
              <span className="text-8xl">🎂</span>
            </div>
            {/* Badge flotante */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-5 py-3 border border-rosa/20">
              <p className="font-heading font-bold text-gris-text text-lg">+500</p>
              <p className="text-small text-gris-secondary">pasteles entregados</p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── PROCESO ─────────────────────────────────────────── */}
      <SectionWrapper background="white">
        <div className="text-center mb-12">
          <Heading as="h2" size="h1">¿Cómo funciona?</Heading>
          <Text variant="body" muted className="mt-3 max-w-lg mx-auto">
            Sin complicaciones. Solo escríbenos y nosotros hacemos el resto.
          </Text>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESO.map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-14 h-14 rounded-full bg-rosa/20 border-2 border-rosa/40 flex items-center justify-center mx-auto mb-4">
                <span className="font-heading font-bold text-rosa text-lg">{item.step}</span>
              </div>
              <h3 className="font-heading font-bold text-gris-text text-lg mb-2">{item.title}</h3>
              <Text variant="small" muted>{item.desc}</Text>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── CURSOS TEASER ───────────────────────────────────── */}
      <SectionWrapper background="crema">
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
                Desde decoración con fondant hasta técnicas avanzadas de buttercream.
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
              <div className="w-48 h-48 rounded-full bg-white/60 flex items-center justify-center shadow-md">
                <span className="text-7xl">👩‍🍳</span>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── CTA FINAL ───────────────────────────────────────── */}
      <section className="bg-gris-text py-20">
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
      </section>
    </>
  );
}
