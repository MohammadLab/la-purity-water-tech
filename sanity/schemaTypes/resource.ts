import { defineType, defineField } from "sanity";

export default defineType({
  name: "resource",
  title: "Resource (Download)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "file", title: "File", type: "file", options: { storeOriginalFilename: true }, validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "category", title: "Category", type: "reference", to: [{ type: "category" }] }),
  ]
});
