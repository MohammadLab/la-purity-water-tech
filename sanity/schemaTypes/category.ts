// category.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    // NEW — thumbnail image for category cards
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional category thumbnail (ideal: 1200×300). Falls back to gradient if not set.",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
      media: "thumbnail",
    },
  },
});
