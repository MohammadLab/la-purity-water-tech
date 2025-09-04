import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemaTypes"; // use the named export

export default defineConfig({
  name: "default",
  title: "LaPurity Water Tech",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "znbgi3bm",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    deskTool(), // TEMP: use default desk to avoid structure issues while we verify
  ],
  schema: { types: schemaTypes },
});
