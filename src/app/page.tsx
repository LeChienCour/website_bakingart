// SSG — no fetch, no revalidate. This page is statically generated at build time.
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1
          className="text-5xl font-bold"
          style={{ fontFamily: "var(--font-family-heading)" }}
        >
          BakingArt GDL
        </h1>
        <p className="mt-3 text-lg" style={{ color: "var(--color-gris-secondary)" }}>
          Repostería artesanal en Guadalajara
        </p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Bienvenido</CardTitle>
          <CardDescription>
            Pasteles, cupcakes y delicias hechas con amor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            style={{
              backgroundColor: "var(--color-rosa)",
              color: "var(--color-gris-text)",
            }}
          >
            Ver catálogo
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
