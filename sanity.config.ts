import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "./studio/schemas";

export default defineConfig({
  name: "bakingart-gdl",
  title: "BakingArt GDL",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            // Singleton — Karenina can only create one siteConfig
            S.listItem()
              .title("Configuración del sitio")
              .child(
                S.document()
                  .schemaType("siteConfig")
                  .documentId("siteConfig")
              ),
            S.divider(),
            S.documentTypeListItem("pastel").title("Pasteles"),
          ]),
    }),
  ],

  schema: {
    types: schemas,
  },
});
