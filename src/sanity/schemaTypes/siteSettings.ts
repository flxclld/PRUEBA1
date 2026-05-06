import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", initialValue: "GranFormato" }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Arte en gran formato para transformar espacios.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
  ],
});
