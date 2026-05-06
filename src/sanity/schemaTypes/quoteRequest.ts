import { defineField, defineType } from "sanity";

export const quoteRequestType = defineType({
  name: "quoteRequest",
  title: "Quote request",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Phone / WhatsApp", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({
      name: "artwork",
      title: "Artwork selected",
      type: "reference",
      to: [{ type: "artwork" }],
    }),
    defineField({ name: "preferredSize", title: "Preferred size", type: "string" }),
    defineField({
      name: "roomPhoto",
      title: "Room photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "message", title: "Message", type: "text", rows: 5 }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "new",
      options: { list: ["new", "contacted", "quoted", "closed"] },
    }),
  ],
});
