// sanity/sanity.config.ts
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// 🔒 BYPASS the index barrel: import each schema directly
import brand from "./schemaTypes/brand";
import category from "./schemaTypes/category";
import faq from "./schemaTypes/faq";
import formSubmission from "./schemaTypes/formSubmission";
import page from "./schemaTypes/page";
import product from "./schemaTypes/product";
import resource from "./schemaTypes/resource";
import siteSettings from "./schemaTypes/siteSettings";

// (Optional: keep your custom desk; if you’re unsure, use deskTool() without structure first)
export default defineConfig({
  name: "default",
  title: "LaPurity Water Tech",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "znbgi3bm",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/studio",
  plugins: [
    deskTool(), // simple desk while we verify types appear; you can re-enable custom structure after
  ],
  schema: {
    // ✅ Explicit list so the bundle 100% includes them
    types: [
      brand,
      category,
      faq,
      formSubmission,
      page,
      product,
      resource,
      siteSettings,
    ],
  },
});
