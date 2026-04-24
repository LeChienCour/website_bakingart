import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "@/components/layout/section-wrapper";
import { Heading } from "@/components/typography/heading";
import { Text } from "@/components/typography/text";

export default function HomePage() {
  return (
    <main>
      <SectionWrapper background="crema" className="min-h-screen flex items-center">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <Heading as="h1" size="display">BakingArt GDL</Heading>
          <Text variant="body" muted>Repostería artesanal en Guadalajara</Text>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="new">Nuevo</Badge>
            <Badge variant="popular">Popular</Badge>
            <Badge variant="temporada">Temporada</Badge>
            <Badge variant="agotado">Agotado</Badge>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="brand-primary" size="brand-lg">Cotizar por WhatsApp</Button>
            <Button variant="brand-secondary" size="brand-lg">Ver catálogo</Button>
            <Button variant="brand-outline" size="brand-lg">Nuestros cursos</Button>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}
