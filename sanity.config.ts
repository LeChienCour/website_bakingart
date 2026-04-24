import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemas } from "./studio/schemas";

export default defineConfig({
  name: "bakingart-gdl",
  title: "BakingArt GDL",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemas,
  },
});
