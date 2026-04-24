import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BakingArt GDL",
    template: "%s | BakingArt GDL",
  },
  description: "Repostería artesanal en Guadalajara. Pasteles personalizados y cursos de repostería.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bakingart-gdl.vercel.app"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfairDisplay.variable}`}
    >
      <body className="min-h-screen antialiased bg-crema text-gris-text font-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-crema focus:px-4 focus:py-2 focus:rounded-md focus:text-gris-text focus:font-semibold focus:shadow-md"
        >
          Ir al contenido principal
        </a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
