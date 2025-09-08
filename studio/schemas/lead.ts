// studio/schemas/lead.ts
export default {
  name: "lead",
  title: "Leads",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "city", title: "City", type: "string" },
    { name: "subject", title: "Subject", type: "string" },
    { name: "message", title: "Message", type: "text" },
    { name: "createdAt", title: "Created At", type: "datetime" },
  ],
  preview: {
    select: { title: "name", subtitle: "email" },
  },
};
