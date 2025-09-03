import { defineType, defineField } from "sanity";

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
      preview: { select: { title: "label", subtitle: "value" } }
    }
  ]
});

const featureField = defineField({
  name: "features",
  title: "Features",
  type: "array",
  of: [{ type: "string" }]
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
        { name: "file", title: "File", type: "file" }
      ],
      preview: { select: { title: "title" } }
    }
  ]
});

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "brand", title: "Brand", type: "reference", to: [{ type: "brand" }] }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }], validation: (Rule) => Rule.required() }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    featureField,
    specField,

    // NEW: dedicated brochure file
    defineField({ name: "brochure", title: "Brochure (PDF)", type: "file" }),

    downloadsField,

    // Future e-commerce fields
    defineField({ name: "sellable", title: "Sellable", type: "boolean", initialValue: false }),
    defineField({ name: "sku", title: "SKU", type: "string", hidden: ({document}) => !document?.sellable }),
    defineField({ name: "price", title: "Price", type: "number", hidden: ({document}) => !document?.sellable }),
    defineField({ name: "currency", title: "Currency", type: "string", options: { list: ["USD", "CAD"] }, initialValue: "USD", hidden: ({document}) => !document?.sellable }),
    defineField({ name: "inStock", title: "In Stock", type: "boolean", hidden: ({document}) => !document?.sellable }),
    defineField({
      name: "variantOptions",
      title: "Variant Options",
      type: "array",
      hidden: ({document}) => !document?.sellable,
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Name (e.g., Size, Color)", type: "string" },
            { name: "values", title: "Values", type: "array", of: [{ type: "string" }] }
          ],
          preview: { select: { title: "name" } }
        }
      ]
    }),
  ],
  preview: {
    select: { title: "title", media: "heroImage", subtitle: "slug.current" }
  }
});
