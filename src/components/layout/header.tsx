import { getWhatsAppHref } from "@/lib/whatsapp";
import { ScrollHeader } from "./scroll-header";

export function Header() {
  const whatsAppHref = getWhatsAppHref(
    "Hola! Vi su página y me gustaría más información sobre sus productos."
  );
  return <ScrollHeader whatsAppHref={whatsAppHref} />;
}
