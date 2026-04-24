import { getWhatsAppHref } from "@/lib/whatsapp";

export function Footer() {
  const whatsAppHref = getWhatsAppHref();

  return (
    <footer className="bg-gris-text text-crema">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Marca */}
          <div>
            <p className="font-heading font-bold text-xl text-crema">BakingArt GDL</p>
            <p className="text-small text-crema/70 mt-1">Repostería artesanal en Guadalajara</p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4 text-small">
            <a
              href="https://instagram.com/bakingartgdl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BakingArt GDL en Instagram"
              className="text-crema/80 hover:text-rosa transition-colors"
            >
              Instagram @bakingartgdl
            </a>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
              className="text-crema/80 hover:text-turquesa transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-crema/20 text-center text-xs text-crema/50">
          © {new Date().getFullYear()} BakingArt GDL. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
