import { defineType, defineField } from "sanity";

// Reusable fields
const specField = defineField({
  name: "specs",
  title: "Specifications",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "value", title: "Value", type: "string" },
      ],
      preview: { select: { title: "label", subtitle: "value" } },
    },
  ],
});

const featureField = defineField({
  name: "features",
  title: "Key Features",
  type: "array",
  of: [{ type: "string" }],
});

const imageGalleryField = defineField({
  name: "gallery",
  title: "Gallery",
  type: "array",
  of: [{ type: "image", options: { hotspot: true } }],
});

const downloadsField = defineField({
  name: "downloads",
  title: "Downloads",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        { name: "title", title: "Title", type: "string" },
        { name: "file", title: "File", type: "file" },
      ],
      preview: { select: { title: "title" } },
    },
  ],
});

const optionsField = defineField({
  name: "options",
  title: "Options (Variants)",
  type: "array",
  of: [
    {
      type: "object",
      fields: [
        { name: "name", title: "Name (e.g., Size, Flow Rate)", type: "string" },
        { name: "values", title: "Values", type: "array", of: [{ type: "string" }] },
      ],
      preview: { select: { title: "name" } },
    },
  ],
});

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      title: "Brand",
      type: "reference",
      to: [{ type: "brand" }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    imageGalleryField,
    featureField,
    specField,

    // ✅ New field: Plain-text description (rows: 8)
    defineField({
      name: "description",
      title: "Long Description",
      type: "text",
      rows: 8,
      description:
        "Benefit-focused overview shown on product pages. Keep it concise and customer-friendly.",
    }),

    // Collateral
    defineField({
      name: "brochure",
      title: "Brochure (PDF)",
      type: "file",
    }),
    downloadsField,

    // Commerce (optional)
    defineField({ name: "sellable", title: "Sellable", type: "boolean", initialValue: false }),
    defineField({ name: "sku", title: "SKU", type: "string" }),
    defineField({ name: "price", title: "Price", type: "number" }),
    defineField({ name: "currency", title: "Currency", type: "string", initialValue: "USD" }),
    optionsField,
  ],
  preview: {
    select: { title: "title", media: "heroImage", subtitle: "slug.current" },
  },
});
