import { defineType, defineField } from "sanity";

export const pastelType = defineType({
  name: "pastel",
  title: "Pastel",
  type: "document",
  fields: [
    defineField({
      name: "nombre",
      title: "Nombre",
      type: "string",
      validation: (r) => r.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "nombre", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción corta",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "imagen",
      title: "Imagen principal",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo (accesibilidad)",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Boda", value: "boda" },
          { title: "XV Años", value: "xv" },
          { title: "Cumpleaños", value: "cumpleanos" },
          { title: "Baby Shower", value: "babyShower" },
          { title: "Corporativo", value: "corporativo" },
          { title: "Temático", value: "tematico" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "porciones",
      title: "Rango de porciones (ej. 20–50)",
      type: "string",
    }),
    defineField({
      name: "tag",
      title: "Etiqueta destacada",
      type: "string",
      options: {
        list: [
          { title: "Popular", value: "popular" },
          { title: "Nuevo", value: "new" },
          { title: "Temporada", value: "temporada" },
        ],
      },
    }),
    defineField({
      name: "destacado",
      title: "Mostrar en página principal",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "orden",
      title: "Orden de aparición (menor = primero)",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "nombre", subtitle: "categoria", media: "imagen" },
  },
});
