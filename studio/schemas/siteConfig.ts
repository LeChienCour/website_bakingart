import { defineType, defineField } from "sanity";

export const siteConfigType = defineType({
  name: "siteConfig",
  title: "Configuración del sitio",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nombre del negocio",
      type: "string",
      initialValue: "BakingArt GDL",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción / tagline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "whatsappNumber",
      title: "Número de WhatsApp (formato internacional sin +, ej. 5213312345678)",
      type: "string",
      validation: (r) =>
        r.required().regex(/^\d{10,15}$/, { name: "número internacional" }),
    }),
    defineField({
      name: "instagramUrl",
      title: "URL de Instagram",
      type: "url",
      initialValue: "https://instagram.com/bakingartgdl",
    }),
    defineField({
      name: "direccion",
      title: "Dirección",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email de contacto",
      type: "string",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Configuración del sitio" }),
  },
});
